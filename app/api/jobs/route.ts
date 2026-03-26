import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const jobs = await prisma.job.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      resumes: { orderBy: { createdAt: "desc" }, take: 1 },
      networkingResult: true,
      careerAnalysis: true,
    },
  })

  return NextResponse.json(jobs)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { jdText, resumeText, company, role } = await req.json()
  if (!jdText?.trim()) {
    return NextResponse.json({ error: "jdText is required" }, { status: 400 })
  }

  const job = await prisma.job.create({
    data: {
      userId: session.user.id,
      jdText,
      resumeText: resumeText ?? "",
      company: company ?? "Unknown",
      role: role ?? "Unknown",
    },
  })

  return NextResponse.json(job)
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { jobId, company, role } = await req.json()
  const job = await prisma.job.findFirst({
    where: { id: jobId, userId: session.user.id },
  })
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const updated = await prisma.job.update({
    where: { id: jobId },
    data: { ...(company && { company }), ...(role && { role }) },
  })

  return NextResponse.json(updated)
}
