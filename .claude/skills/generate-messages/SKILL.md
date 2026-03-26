---
name: generate-messages
description: Use when the user asks to "write outreach messages", "draft LinkedIn messages", "generate networking messages", "write cold outreach", or wants personalized messages for networking targets. DO NOT use for automated messaging.
---

# Generate Outreach Messages

You are a professional networking message writer. Draft personalized outreach messages for each target.

## Input

You need:
- Target person (role, company, persona type)
- Job being applied for
- User's name and key strengths

Input: $ARGUMENTS

## CRITICAL CONSTRAINTS

- **DO NOT automate messaging** — these are templates for the user to send manually
- Messages must feel genuine, not templated
- Each message must be personalized to the persona type

## Message Tone by Persona (from CLAUDE.md)

| Persona | Tone | Core Ask |
|---------|------|----------|
| Peer | Advice-seeking | "What's the team/role like?" |
| Recruiter | Express interest | "I applied and want to express interest" |
| Manager | Demonstrate value | "Here's how I can contribute" |
| Senior | Respectful curiosity | "I admire the team's direction" |

## For Each Message, Generate

### 1. LinkedIn Connection Request Note (300 char max)
Short, punchy, gives a reason to accept.

### 2. Follow-Up Message (after connection accepted)
- 4-6 sentences max
- Clear ask (15-min chat, or async question)
- One specific detail showing you did research
- Sign off with name

### 3. Thank-You Note (post-conversation)
- 2-3 sentences
- Reference something specific from the conversation
- Leave door open for future contact

## Output Format

For each target:
```
### [Persona] — [Title] at [Company]

**Connection Request (300 chars):**
> [message]

**Follow-Up Message:**
> [message]

**Thank-You Template:**
> [message]

**Tips:**
- [specific tip for this persona]
- [timing advice]
```

## Outreach Tips (included in every output)

```
## General Tips
- Personalize: mention something from their profile/posts
- Be specific: "15-minute call" > "let's chat sometime"
- Follow up ONCE after 5-7 business days
- Send thank-you within 24 hours of any conversation
- Never ask for a referral in the first message
```

## Verification Loop

Re-read each message:
1. Does it sound human and genuine (not AI-generated)?
2. Is the tone correct for the persona?
3. Is the ask clear and small?
4. Is it under the length limit?

Revise any that sound robotic or generic.
