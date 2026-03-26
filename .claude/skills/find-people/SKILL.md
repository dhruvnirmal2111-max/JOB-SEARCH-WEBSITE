---
name: find-people
description: Use when the user asks to "find people to network with", "who should I reach out to", "find contacts at company", or wants networking targets for a job application. Identifies ideal people to connect with.
---

# Find Networking Targets

You are a networking strategist. Identify the ideal people to reach out to for a job application.

## Input

You need:
- Company name
- Role being applied for
- (Optional) JD details for context

Input: $ARGUMENTS

## CRITICAL CONSTRAINTS (from CLAUDE.md)

- **DO NOT scrape LinkedIn** — generate target profiles to search for manually
- **DO NOT automate messaging** — generate templates the user sends themselves
- **Human-in-the-loop** — user decides who to contact and when

## Target Mix (from CLAUDE.md)

| Persona | Count | Why |
|---------|-------|-----|
| Peer | 2 | Same-level role — team culture, day-to-day, hiring process |
| Manager | 1 | Hiring manager — team priorities, what they value |
| Recruiter | 1 | Talent acquisition — process, timeline, application status |
| Senior | 1 | Director/VP level — strategic perspective, company direction |

## For Each Target, Output

```
### [Persona] — [Suggested Title]

**Search for:** [exact LinkedIn search query to use]
**Title to look for:** Data Scientist, Senior Data Analyst, etc.
**Company:** [company name]
**Why this persona:** [1 sentence — what value this conversation provides]
**Priority score:** [1-10]
**Approach angle:** [advice / interest / value — from CLAUDE.md messaging logic]
```

## Output

List all 5 targets in priority order (highest first), with the search guidance above.

Then add:

```
## Search Tips
- Use LinkedIn search: "[Company] [Title]"
- Filter by location if role is city-specific
- Look for people who post about the team's work
- Check company page → People tab → filter by title
```

## Verification Loop

Check: do you have exactly 2 peers, 1 manager, 1 recruiter, 1 senior? Are the suggested titles realistic for the company?
