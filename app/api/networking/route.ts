import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { callClaude, loadAgentPrompt } from "@/lib/claude"
import { prisma } from "@/lib/prisma"

function parseJSON(raw: string) {
  let cleaned = raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim()

  try { return JSON.parse(cleaned) } catch { /* continue */ }

  const start = cleaned.indexOf("{")
  const end = cleaned.lastIndexOf("}")
  if (start !== -1 && end !== -1) cleaned = cleaned.slice(start, end + 1)

  try { return JSON.parse(cleaned) } catch { /* continue */ }

  const repaired = cleaned
    .replace(/\r\n/g, " ")
    .replace(/[\r\n]/g, " ")
    .replace(/\t/g, " ")
    .replace(/\\(?!["\\/bfnrtu])/g, "\\\\")

  try { return JSON.parse(repaired) } catch { /* continue */ }

  const noTrailingCommas = repaired.replace(/,\s*([}\]])/g, "$1")
  try { return JSON.parse(noTrailingCommas) } catch { /* continue */ }

  throw new Error("Could not parse JSON response")
}

function normalizeKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .filter(w => !["the", "a", "an", "and", "or", "of", "at", "in", "for"].includes(w))
    .slice(0, 4)
    .join("-")
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get("jobId")
  if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 })

  const result = await prisma.networkingResult.findUnique({ where: { jobId } })
  if (!result) return NextResponse.json(null)

  // Load contact statuses from Contact records
  const contacts = await prisma.contact.findMany({
    where: { jobId, userId: session.user.id },
    orderBy: { createdAt: "asc" },
  })
  const contactStatuses = Object.fromEntries(contacts.map((c, i) => [i, c.status]))
  const contactIds = contacts.map(c => c.id)

  return NextResponse.json({
    ...JSON.parse(result.fullData),
    contactStatuses,
    contactIds,
  })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { jdText, userContext, jobId } = await req.json()
  if (!jdText) {
    return NextResponse.json({ error: "jdText is required" }, { status: 400 })
  }

  // Check per-job cache first
  if (jobId) {
    const cached = await prisma.networkingResult.findUnique({ where: { jobId } })
    if (cached) {
      const contacts = await prisma.contact.findMany({
        where: { jobId, userId: session.user.id },
        orderBy: { createdAt: "asc" },
      })
      const contactStatuses = Object.fromEntries(contacts.map((c, i) => [i, c.status]))
      const contactIds = contacts.map(c => c.id)
      return NextResponse.json({ ...JSON.parse(cached.fullData), cached: true, contactStatuses, contactIds })
    }
  }

  const systemPrompt = loadAgentPrompt("outreach")

  // Quick company/role extraction to check SharedContact DB
  let companyKey = ""
  let roleKey = ""
  let sharedContacts: Array<{
    name: string; jobTitle: string; persona: string; score: number | null;
    searchQuery: string | null; linkedinTip: string | null; id: string
  }> = []

  // Extract company/role from first 500 chars using a simple heuristic (or reuse from jobId)
  if (jobId) {
    const job = await prisma.job.findUnique({ where: { id: jobId } })
    if (job && job.company !== "Unknown" && job.role !== "Unknown") {
      companyKey = normalizeKey(job.company)
      roleKey = normalizeKey(job.role)
    }
  }

  // If we have keys, check shared contacts DB
  if (companyKey && roleKey) {
    sharedContacts = await prisma.sharedContact.findMany({
      where: { companyKey, roleKey },
      orderBy: { useCount: "desc" },
    })
  }

  let result: Record<string, unknown>

  if (sharedContacts.length >= 5) {
    // Reuse shared contact identities, generate personalized messages only
    const identities = sharedContacts.slice(0, 5)
    const messagesPrompt = `
Generate personalized outreach messages for each of these 5 people at ${companyKey.replace(/-/g, " ")} for a ${roleKey.replace(/-/g, " ")} role.

For each person, return ONLY a JSON array (no markdown) of message objects in this exact order:
${identities.map((c, i) => `${i + 1}. ${c.name} (${c.persona}) — ${c.jobTitle}`).join("\n")}

Return:
[
  {
    "connection": "<LinkedIn connection request MAX 300 CHARS — ${userContext ? "personalized for: " + userContext : "professional and specific"}. Peer=advice-seeking, Recruiter=express interest, Manager=value prop, Senior=respectful curiosity>",
    "followup": "<4-6 sentence follow-up after connecting. Mention specifics about their role. Clear small ask.>",
    "thankyou": "<2-3 sentence thank you after a conversation.>"
  }
]

JOB DESCRIPTION:
${jdText}

${userContext ? `APPLICANT CONTEXT:\n${userContext}` : ""}
`
    const messagesRaw = await callClaude(systemPrompt, messagesPrompt)
    let messages: Array<{ connection: string; followup: string; thankyou: string }> = []
    try {
      const cleaned = messagesRaw.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim()
      messages = JSON.parse(cleaned)
    } catch {
      const match = messagesRaw.match(/\[[\s\S]*\]/)
      if (match) messages = JSON.parse(match[0])
    }

    // Merge identities + messages
    const contacts = identities.map((c, i) => ({
      id: i + 1,
      name: c.name,
      role: c.jobTitle,
      company: companyKey.replace(/-/g, " "),
      persona: c.persona as "peer" | "manager" | "recruiter" | "senior",
      score: c.score ?? 8.0,
      week: i < 2 ? 1 : i < 4 ? 2 : 3,
      searchQuery: c.searchQuery ?? `${c.jobTitle} ${companyKey.replace(/-/g, " ")} LinkedIn`,
      linkedinTip: c.linkedinTip ?? "Search on LinkedIn using their name and company",
      messages: messages[i] ?? { connection: "", followup: "", thankyou: "" },
    }))

    // Extract company/role from JD for display (quick parse)
    const job = jobId ? await prisma.job.findUnique({ where: { id: jobId } }) : null

    result = {
      company: job?.company ?? companyKey.replace(/-/g, " "),
      role: job?.role ?? roleKey.replace(/-/g, " "),
      contacts,
      weeklyPlan: [
        { week: 1, dateRange: "Week 1", connects: contacts.filter(c => c.week === 1).map(c => `${c.name} (${c.persona})`), followups: [], focus: "Make initial connections with recruiter and first peer" },
        { week: 2, dateRange: "Week 2", connects: contacts.filter(c => c.week === 2).map(c => `${c.name} (${c.persona})`), followups: contacts.filter(c => c.week === 1).map(c => `${c.name} — follow up if no reply`), focus: "Connect with manager and second peer, follow up week 1" },
        { week: 3, dateRange: "Week 3", connects: contacts.filter(c => c.week === 3).map(c => `${c.name} (${c.persona})`), followups: contacts.filter(c => c.week === 2).map(c => `${c.name} — follow up if no reply`), focus: "Connect with senior IC, follow up week 2 contacts" },
      ],
      outreachRules: [
        "Follow up once after 5-7 business days if no response",
        "Send thank-you within 24 hours of any conversation",
        "Never ask for a referral in the first message",
        "Personalize each message with a specific detail about their role or company posts",
      ],
      fromSharedDB: true,
    }

    // Increment useCount for used contacts
    await Promise.all(identities.map(c =>
      prisma.sharedContact.update({ where: { id: c.id }, data: { useCount: { increment: 1 } } }).catch(() => {})
    ))

  } else {
    // Generate everything fresh from Claude
    const userMessage = `
You are the Outreach Agent. Extract the company and role from the job description, then generate exactly 5 networking contacts.

REQUIRED: exactly 2 peer, 1 manager, 1 recruiter, 1 senior

NAME GENERATION RULES — CRITICAL:
- Generate REAL-SOUNDING professional names. Vary cultural backgrounds to reflect realistic diversity at modern tech/professional companies.
- Examples of good names: Alex Chen, Priya Sharma, Marcus Johnson, Sophie Williams, David Park, Nina Patel, James O'Brien, Aisha Rahman, Liam Nguyen, Elena Vasquez, Omar Al-Farsi, Mei-Ling Wu, Tobias Eriksson, Camila Torres.
- NEVER use generic placeholder names: no John Smith, Jane Doe, John Doe, Bob, Alice, or any obviously fake-sounding names.
- Match names to the company's likely geography: Australian company → mix Anglo-Australian, Indian-Australian, East Asian names. US tech company → diverse American names. UK company → British + South Asian + European mix.
- Each name must be a unique full name (first + last).

Return ONLY valid JSON (no markdown, no extra text):

{
  "company": "<exact company name from JD>",
  "role": "<exact role title from JD>",
  "contacts": [
    {
      "id": 1,
      "name": "<realistic diverse full name — see rules above>",
      "role": "<their specific job title at this company>",
      "company": "<company name>",
      "persona": "peer",
      "score": 8.5,
      "week": 1,
      "searchQuery": "<specific LinkedIn search string: 'Data Scientist Atlassian Sydney'>",
      "linkedinTip": "<1 sentence on how to identify the right person>",
      "messages": {
        "connection": "<LinkedIn connection request MAX 300 CHARACTERS. Peer=advice-seeking, Recruiter=express interest, Manager=value prop, Senior=respectful curiosity. Be specific to the role/company.>",
        "followup": "<4-6 sentence follow-up after connecting. Reference something specific about their role or company. End with a clear small ask.>",
        "thankyou": "<2-3 sentence thank you after a conversation.>"
      }
    }
  ],
  "weeklyPlan": [
    {
      "week": 1,
      "dateRange": "Week 1",
      "connects": ["<Name> (<persona>)"],
      "followups": [],
      "focus": "<what to accomplish this week>"
    },
    {
      "week": 2,
      "dateRange": "Week 2",
      "connects": ["<Name> (<persona>)"],
      "followups": ["<Name> — check in after connecting"],
      "focus": "<what to accomplish>"
    },
    {
      "week": 3,
      "dateRange": "Week 3",
      "connects": ["<Name> (<persona>)"],
      "followups": ["<Name> — follow up if no reply"],
      "focus": "<what to accomplish>"
    }
  ],
  "outreachRules": [
    "Follow up once after 5-7 business days if no response",
    "Send thank-you within 24 hours of any conversation",
    "Never ask for a referral in the first message",
    "Personalize each message with a specific detail about their role or company posts"
  ]
}

Week assignments: Week 1 = Recruiter + Peer 1, Week 2 = Manager + Peer 2, Week 3 = Senior
Rank contacts highest score first.
VERIFY: exactly 5 contacts? 2 peer + 1 manager + 1 recruiter + 1 senior? All connection requests ≤300 chars? Names sound like real professionals?

JOB DESCRIPTION:
${jdText}

${userContext ? `APPLICANT CONTEXT:\n${userContext}` : ""}
`

    const raw = await callClaude(systemPrompt, userMessage)
    result = parseJSON(raw)

    // Save to SharedContact DB for future reuse
    if (result.contacts && Array.isArray(result.contacts) && result.company && result.role) {
      const cKey = normalizeKey(result.company as string)
      const rKey = normalizeKey(result.role as string)
      companyKey = cKey
      roleKey = rKey

      // Only save if we don't already have enough (race condition guard)
      const existing = await prisma.sharedContact.count({ where: { companyKey: cKey, roleKey: rKey } })
      if (existing < 5) {
        await prisma.sharedContact.deleteMany({ where: { companyKey: cKey, roleKey: rKey } })
        await prisma.sharedContact.createMany({
          data: (result.contacts as Array<{
            name: string; role: string; persona: string; score?: number;
            searchQuery?: string; linkedinTip?: string
          }>).map(c => ({
            companyKey: cKey,
            roleKey: rKey,
            name: c.name,
            jobTitle: c.role,
            persona: c.persona,
            score: c.score ?? null,
            searchQuery: c.searchQuery ?? null,
            linkedinTip: c.linkedinTip ?? null,
          })),
        }).catch(() => {})
      }
    }
  }

  // Update job with company/role
  if (jobId && result.company && result.role) {
    await prisma.job.update({ where: { id: jobId }, data: { company: result.company as string, role: result.role as string } })
      .catch(() => {})
  }

  // Save contacts individually with status
  if (jobId && result.contacts && Array.isArray(result.contacts)) {
    await prisma.contact.deleteMany({ where: { jobId, userId: session.user.id } })
    await prisma.contact.createMany({
      data: (result.contacts as Array<{
        name: string; role: string; company: string; persona: string;
        score?: number; searchQuery?: string; messages?: unknown
      }>).map(c => ({
        userId: session.user.id,
        jobId,
        name: c.name,
        role: c.role,
        company: c.company,
        persona: c.persona,
        score: c.score,
        searchQuery: c.searchQuery,
        messages: JSON.stringify(c.messages),
        status: "pending",
      })),
    })
  }

  // Save full result
  if (jobId) {
    await prisma.networkingResult.upsert({
      where: { jobId },
      create: { userId: session.user.id, jobId, fullData: JSON.stringify(result) },
      update: { fullData: JSON.stringify(result) },
    })
  }

  // Return with contact statuses (all pending for new generation)
  const contacts = jobId ? await prisma.contact.findMany({
    where: { jobId, userId: session.user.id },
    orderBy: { createdAt: "asc" },
  }) : []
  const contactStatuses = Object.fromEntries(contacts.map((c, i) => [i, c.status]))
  const contactIds = contacts.map(c => c.id)

  return NextResponse.json({ ...result, contactStatuses, contactIds })
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { contactId, status } = await req.json()
  const contact = await prisma.contact.findFirst({ where: { id: contactId, userId: session.user.id } })
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const updated = await prisma.contact.update({ where: { id: contactId }, data: { status } })
  return NextResponse.json(updated)
}
