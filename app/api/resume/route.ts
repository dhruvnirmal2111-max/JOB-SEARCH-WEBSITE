import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { callClaude, loadAgentPrompt } from "@/lib/claude"
import { prisma } from "@/lib/prisma"

/**
 * Parse Claude's delimited response:
 *   ===JSON===
 *   {...}
 *   ===RESUME===
 *   full resume text
 *   ===COVER===
 *   full cover letter
 */
function parseDelimitedResponse(raw: string) {
  const DELIMITERS = ["JSON", "RESUME", "COVER"]
  const sections: Record<string, string> = {}

  for (const key of DELIMITERS) {
    const start = raw.indexOf(`====${key}====`)
    if (start === -1) continue
    const contentStart = start + `====${key}====`.length
    // Find next delimiter or end
    let contentEnd = raw.length
    for (const other of DELIMITERS) {
      if (other === key) continue
      const idx = raw.indexOf(`====${other}====`, contentStart)
      if (idx !== -1 && idx < contentEnd) contentEnd = idx
    }
    sections[key] = raw.slice(contentStart, contentEnd).trim()
  }

  if (!sections.JSON) throw new Error("No JSON section found in response")

  const data = JSON.parse(sections.JSON)
  data.optimizedResume = sections.RESUME ?? ""
  data.coverLetter = sections.COVER ?? ""
  return data
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get("jobId")
  if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 })

  const resume = await prisma.resume.findFirst({
    where: { userId: session.user.id, jobId },
    orderBy: { createdAt: "desc" },
  })

  if (!resume) return NextResponse.json(null)

  // Return cached full data
  const base = {
    matchRate: resume.matchRate,
    optimizedResume: resume.optimizedText ?? "",
    coverLetter: resume.coverLetter ?? "",
    keywords: resume.keywordData ? JSON.parse(resume.keywordData) : { matched: [], missing: [], added: [] },
  }

  if (resume.fullData) {
    return NextResponse.json({ ...JSON.parse(resume.fullData), ...base })
  }
  return NextResponse.json(base)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { resumeText, jdText, jobId } = await req.json()
  if (!resumeText || !jdText) {
    return NextResponse.json({ error: "resumeText and jdText are required" }, { status: 400 })
  }

  // Check cache for this job
  if (jobId) {
    const cached = await prisma.resume.findFirst({
      where: { userId: session.user.id, jobId },
      orderBy: { createdAt: "desc" },
    })
    if (cached?.fullData) {
      const base = {
        matchRate: cached.matchRate,
        optimizedResume: cached.optimizedText ?? "",
        coverLetter: cached.coverLetter ?? "",
        keywords: cached.keywordData ? JSON.parse(cached.keywordData) : {},
      }
      return NextResponse.json({ ...JSON.parse(cached.fullData), ...base, cached: true })
    }
  }

  const systemPrompt = loadAgentPrompt("resume-intelligence")

  const userMessage = `
You are the Resume Intelligence Agent. Analyze this resume against the job description.

Return your response in EXACTLY this format with the exact 4-equal-sign delimiters. No preamble, no markdown.

====JSON====
{
  "company": "<company name from JD>",
  "role": "<role title from JD>",
  "matchRate": <number 0-100>,
  "keywords": {
    "matched": ["keyword1", "keyword2"],
    "missing": ["keyword1", "keyword2"],
    "added": ["keyword1"]
  },
  "summary": "<3-4 sentence tailored professional summary naming the role and company>",
  "bulletRewrites": [
    {
      "section": "<company or project name this bullet is from>",
      "original": "<exact original bullet text>",
      "rewritten": "<rewritten with strong action verb, quantified impact, JD keywords>",
      "relevanceScore": <0-10>,
      "keywords": ["kw1", "kw2"]
    }
  ],
  "recommendations": ["<rec 1>", "<rec 2>", "<rec 3>"]
}
====RESUME====
<Write the COMPLETE optimized resume here. Keep ALL original sections in the same order. Replace the summary section with the tailored one. Replace all experience bullets with the rewritten versions. Plain text, no JSON escaping needed.>
====COVER====
<Write the COMPLETE cover letter here. 4 paragraphs: express interest (name role + company) | current role + key experience with metrics | 3-4 bullet highlights matching JD | why this company | closing with name. Plain text, no JSON escaping needed.>

VERIFICATION (run twice before returning):
1. JSON section is valid JSON with no unescaped quotes in string values?
2. RESUME section includes ALL original sections?
3. Cover letter names the correct company and role?
4. Every rewritten bullet starts with a strong action verb?

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}
`

  try {
    const raw = await callClaude(systemPrompt, userMessage)
    const result = parseDelimitedResponse(raw)

    // Update job company/role if we have a jobId
    if (jobId && result.company && result.role) {
      await prisma.job.update({
        where: { id: jobId },
        data: { company: result.company, role: result.role },
      }).catch(() => {/* ignore if job doesn't exist */})
    }

    const fullDataForStorage = {
      company: result.company,
      role: result.role,
      summary: result.summary,
      bulletRewrites: result.bulletRewrites,
      recommendations: result.recommendations,
    }

    await prisma.resume.create({
      data: {
        userId: session.user.id,
        jobId: jobId ?? undefined,
        originalText: resumeText,
        optimizedText: result.optimizedResume,
        coverLetter: result.coverLetter,
        matchRate: result.matchRate,
        keywordData: JSON.stringify(result.keywords),
        fullData: JSON.stringify(fullDataForStorage),
      },
    })

    return NextResponse.json(result)
  } catch (e) {
    console.error("Resume API error:", e)
    return NextResponse.json(
      { error: `Failed to optimize resume: ${e instanceof Error ? e.message : "Unknown error"}` },
      { status: 500 }
    )
  }
}
