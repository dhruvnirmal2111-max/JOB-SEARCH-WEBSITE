import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(projects.map(p => ({
    ...p,
    techStack: JSON.parse(p.techStack || "[]"),
    highlights: p.highlights ? JSON.parse(p.highlights) : [],
  })))
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { title, description, techStack, status, githubUrl, liveUrl, highlights, startDate, endDate } = body

  if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 })

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      title: title.trim(),
      description: description?.trim() ?? "",
      techStack: JSON.stringify(Array.isArray(techStack) ? techStack : []),
      status: status ?? "in-progress",
      githubUrl: githubUrl?.trim() || null,
      liveUrl: liveUrl?.trim() || null,
      highlights: highlights ? JSON.stringify(highlights) : null,
      startDate: startDate || null,
      endDate: endDate || null,
    },
  })

  return NextResponse.json({
    ...project,
    techStack: JSON.parse(project.techStack),
    highlights: project.highlights ? JSON.parse(project.highlights) : [],
  })
}
