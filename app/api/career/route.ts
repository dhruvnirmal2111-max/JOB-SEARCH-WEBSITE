import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { callClaude, loadAgentPrompt } from "@/lib/claude"
import { prisma } from "@/lib/prisma"

function parseJSON(raw: string) {
  // Strip markdown code fences
  let cleaned = raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim()

  // Try direct parse first
  try { return JSON.parse(cleaned) } catch { /* continue to repair */ }

  // Extract outermost {} block
  const start = cleaned.indexOf("{")
  const end = cleaned.lastIndexOf("}")
  if (start !== -1 && end !== -1) {
    cleaned = cleaned.slice(start, end + 1)
  }

  // Try again after extraction
  try { return JSON.parse(cleaned) } catch { /* continue to repair */ }

  // Repair: replace unescaped control characters that break JSON
  const repaired = cleaned
    .replace(/\r\n/g, " ")                          // Windows newlines
    .replace(/[\r\n]/g, " ")                        // Unix/Mac newlines
    .replace(/\t/g, " ")                            // literal tabs
    .replace(/\\(?!["\\/bfnrtu])/g, "\\\\")        // lone backslashes

  try { return JSON.parse(repaired) } catch { /* continue */ }

  // Last resort: strip trailing commas before ] or }
  const noTrailingCommas = repaired.replace(/,\s*([}\]])/g, "$1")
  try { return JSON.parse(noTrailingCommas) } catch { /* continue */ }

  throw new Error("Could not parse JSON response")
}

const LEVELS = ["none", "beginner", "intermediate", "advanced", "expert"]

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get("jobId")
  if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 })

  const result = await prisma.careerAnalysis.findUnique({ where: { jobId } })
  if (!result) return NextResponse.json(null)
  return NextResponse.json(JSON.parse(result.fullData))
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

  // Check cache
  if (jobId) {
    const cached = await prisma.careerAnalysis.findUnique({ where: { jobId } })
    if (cached) return NextResponse.json({ ...JSON.parse(cached.fullData), cached: true })
  }

  const systemPrompt = loadAgentPrompt("career-coach")

  const userMessage = `
You are the Career Coach Agent. Analyze this resume against the job description and return a comprehensive coaching report.

Skill levels MUST use exactly: "none" | "beginner" | "intermediate" | "advanced" | "expert"
Importance MUST use exactly: "critical" | "high" | "medium"
Resource types MUST use exactly: "book" | "course" | "practice" | "project" | "reading"

Return ONLY valid JSON — be careful with special characters inside string values (use only simple quotes inside strings):

{
  "company": "<company name from JD>",
  "role": "<role title from JD>",
  "overallReadiness": <0-100>,
  "summary": "<2-3 sentence honest assessment of fit, main strengths, main gaps>",
  "totalPrepTime": "<e.g. 6-8 weeks>",
  "skillGaps": [
    {
      "skill": "<skill name>",
      "importance": "critical",
      "category": "technical",
      "yourLevel": "beginner",
      "requiredLevel": "intermediate",
      "gap": "<one sentence: what specifically needs improvement>"
    }
  ],
  "learningPlan": [
    {
      "skill": "<skill>",
      "priority": 1,
      "timeframe": "<e.g. 2-3 weeks>",
      "resources": [
        {
          "title": "<REAL resource name — use well-known courses, books, or YouTube channels>",
          "type": "course",
          "duration": "<e.g. 10 hours>",
          "why": "<one sentence why this resource fits>",
          "url": "<YouTube search URL — ALWAYS include this. Format exactly: https://www.youtube.com/results?search_query=TITLE+tutorial where TITLE is the resource name with spaces replaced by +. Example: for 'Pandas for Data Science' use https://www.youtube.com/results?search_query=Pandas+for+Data+Science+tutorial>"
        }
      ]
    }
  ],
  "interviewQuestions": {
    "technical": [
      { "question": "<specific technical question for this exact role>", "tips": "<answer guidance using candidate's actual experience>" }
    ],
    "domain": [
      { "question": "<domain knowledge question>", "tips": "<key concepts to cover>" }
    ],
    "systemDesign": [
      { "question": "<system design question relevant to this role>", "tips": "<patterns and approaches to discuss>" }
    ],
    "behavioral": [
      { "question": "<STAR format behavioral question based on company values>", "tips": "<STAR structure guidance>", "suggestedExperience": "<specific project/role from their resume to reference>" }
    ]
  }
}

Provide exactly 4 questions per category (16 total).
skillGaps: only include skills where requiredLevel > yourLevel. Maximum 8 gaps.
learningPlan: only the top 5-6 priority gaps, ordered by priority.
Questions must reference specifics from THIS job description and THIS resume.
IMPORTANT: Every resource MUST include a url field with a YouTube search URL in the format: https://www.youtube.com/results?search_query=<resource+title+encoded>+tutorial

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}
`

  try {
    const raw = await callClaude(systemPrompt, userMessage)
    const result = parseJSON(raw)

    // Normalize skill levels
    if (result.skillGaps) {
      result.skillGaps = result.skillGaps.map((g: { yourLevel: string; requiredLevel: string; [k: string]: unknown }) => ({
        ...g,
        yourLevel: LEVELS.includes(g.yourLevel) ? g.yourLevel : "beginner",
        requiredLevel: LEVELS.includes(g.requiredLevel) ? g.requiredLevel : "intermediate",
      }))
    }

    // Update job
    if (jobId && result.company && result.role) {
      await prisma.job.update({ where: { id: jobId }, data: { company: result.company, role: result.role } })
        .catch(() => {})
    }

    // Save to DB
    if (jobId) {
      await prisma.careerAnalysis.upsert({
        where: { jobId },
        create: { userId: session.user.id, jobId, fullData: JSON.stringify(result) },
        update: { fullData: JSON.stringify(result) },
      })
    }

    return NextResponse.json(result)
  } catch (e) {
    console.error("Career API error:", e)
    return NextResponse.json(
      { error: `Failed to analyze profile: ${e instanceof Error ? e.message : "Unknown error"}` },
      { status: 500 }
    )
  }
}
