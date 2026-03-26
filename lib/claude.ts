import Anthropic from "@anthropic-ai/sdk"
import fs from "fs"
import path from "path"

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export function loadAgentPrompt(agentName: string): string {
  const agentPath = path.join(
    process.cwd(),
    ".claude",
    "agents",
    `${agentName}.md`
  )
  try {
    return fs.readFileSync(agentPath, "utf-8")
  } catch {
    return `You are an AI assistant specialized in ${agentName}.`
  }
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens = 8000
): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  })

  const content = message.content[0]
  if (content.type === "text") return content.text
  return ""
}
