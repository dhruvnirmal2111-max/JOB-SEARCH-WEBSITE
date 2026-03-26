# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This System Is

A **Claude Code-native AI Job Search Operating System** — no traditional application code. The entire system is LLM-driven workflows defined in `.claude/agents/` and `.claude/skills/`. There is no build step, no server, and no test runner.

## How to Use

Invoke agents via the Agents panel or slash commands. Core workflows:

| Workflow | Command |
|----------|---------|
| Optimize a resume for a JD | `/generate-resume` |
| Find people to network with + draft messages | `/generate-outreach` (or full `/outreach` agent) |
| Skill gap analysis + interview prep | `/career-coach` |

Inputs are always file paths to PDFs or plain text (resume, JD).

## Architecture

### Three Core Agents (`.claude/agents/`)
Each agent orchestrates a sequence of skills and runs a **mandatory 2-pass verification loop** before returning output.

- **`resume-intelligence`** — Parse resume → keyword alignment → rewrite bullets → tailored summary → cover letter
- **`outreach`** — Parse JD → find 5 targets → rank → generate 3 messages per target → outreach timeline
- **`career-coach`** — Parse resume + JD → identify skill gaps → learning plan → interview prep (4 question categories)

### Skills (`.claude/skills/<name>/SKILL.md`)
Atomic, reusable units. Agents chain them; they can also be called standalone.

**Resume:** `parse-resume`, `extract-skills`, `rewrite-bullets`, `generate-resume`
**JD:** `parse-jd`, `extract-requirements`
**Networking:** `find-people`, `rank-people`, `generate-messages`, `generate-outreach`
**Career:** `identify-skill-gap`, `generate-learning-plan`, `career-coach`

### Verification Loop (Critical)
Every agent and skill must loop and self-check outputs for consistency before returning. This is the system's substitute for unit tests. Examples:
- Resume agent: verify summary accuracy, cover letter company name, bullet truthfulness
- Outreach agent: verify exactly 5 targets (2 peer, 1 manager, 1 recruiter, 1 senior)

## Constraints

- **DO NOT** automate messaging — generate templates the user sends manually
- Networking output must always follow: 2 peers, 1 manager, 1 recruiter, 1 senior
- Messaging tone by persona: Peer → advice-seeking, Recruiter → interest, Manager → value proposition

## Data Model

```
User:       id, name, email, skills, experience
Job:        id, company, role, jd_text, status
Person:     name, role, company, linkedin_url, persona, score
Interaction: job_id, person_id, status, followup
```

## Design Principles

- **Few agents, many reusable skills** — prefer adding a skill over extending an agent
- **LLM = reasoning layer, NOT business logic** — structured outputs, not free-form prose
- **Human-in-the-loop** — suggest and template; never execute on behalf of the user
- **Cost awareness** — minimize redundant LLM calls; cache parsed resume/JD within a session

## MVP Phases

- Phase 1 (current): Resume optimization
- Phase 2: Networking
- Phase 3: Career coaching
