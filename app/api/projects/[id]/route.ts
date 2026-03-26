import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const project = await prisma.project.findFirst({ where: { id: params.id, userId: session.user.id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const body = await req.json()
  const { title, description, techStack, status, githubUrl, liveUrl, highlights, startDate, endDate } = body

  const updated = await prisma.project.update({
    where: { id: params.id },
    data: {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(techStack !== undefined && { techStack: JSON.stringify(Array.isArray(techStack) ? techStack : []) }),
      ...(status !== undefined && { status }),
      ...(githubUrl !== undefined && { githubUrl: githubUrl?.trim() || null }),
      ...(liveUrl !== undefined && { liveUrl: liveUrl?.trim() || null }),
      ...(highlights !== undefined && { highlights: JSON.stringify(highlights) }),
      ...(startDate !== undefined && { startDate: startDate || null }),
      ...(endDate !== undefined && { endDate: endDate || null }),
    },
  })

  return NextResponse.json({
    ...updated,
    techStack: JSON.parse(updated.techStack),
    highlights: updated.highlights ? JSON.parse(updated.highlights) : [],
  })
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const project = await prisma.project.findFirst({ where: { id: params.id, userId: session.user.id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.project.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
