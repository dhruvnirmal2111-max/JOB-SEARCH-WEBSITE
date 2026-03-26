import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let text = ""
    const name = file.name.toLowerCase()

    if (name.endsWith(".pdf")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse")
      const data = await pdfParse(buffer)
      text = data.text
    } else {
      // txt, doc — read as UTF-8
      text = buffer.toString("utf-8")
    }

    // Clean up whitespace but preserve structure
    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    return NextResponse.json({ text, filename: file.name })
  } catch (e) {
    console.error("Upload error:", e)
    return NextResponse.json({ error: "Failed to extract text from file" }, { status: 500 })
  }
}
