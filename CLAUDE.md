# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

A **personal Job Hunt OS** — a single-user, file-based system that runs natively on Claude Code (no website, no database, no paid API keys). It drives a focused **"land a job in 30 days"** campaign: research target roles, tailor CVs, write cover letters, find people to reach out to + draft messages, produce daily/weekly reports, and push the resulting to-dos to Google Calendar.

It is for **one person (the owner)**. There is no UI for anyone else.

### Hard rules

1. **No paid API keys.** All reasoning runs on the Claude Code subscription via agents and skills. Never reintroduce `lib/claude.ts`, Anthropic/Gemini/Tavily SDK calls, or any `*_API_KEY`. Web research uses the built-in `WebSearch` / `WebFetch`.
2. **Review gate — generate → stage → human review → act.** Every CV, cover letter, message, and calendar event is produced as a **draft/staged** artifact. Nothing is sent, and nothing hits Google Calendar, until the owner approves it via a `/review-*` command. The system **never sends a message on the owner's behalf** — it drafts; the owner sends manually.
3. **Never fabricate experience.** Resumes and bullets are tailored from real history only; add JD keywords only where they truthfully fit.
4. **Truth in reporting.** Pipeline status reflects reality. Don't mark things "applied"/"sent" unless they were.

## Architecture

Four layers, all Claude-Code-native:

- **Agents** (`.claude/agents/`) — the reasoning. One orchestrator + three specialists.
- **Commands** (`.claude/commands/`) — thin workflows the owner triggers (from laptop or the Claude mobile/web app).
- **Skills** (`.claude/skills/`) — atomic reusable units the agents/commands chain.
- **Workspace** (`job-search/`) — plain files that *are* the database (replaces the old Postgres/Prisma model).

### Agents (`.claude/agents/`)

| Agent | Role |
|-------|------|
| `job-hunt-commander` | Orchestrator. Reads `pipeline.md` + `preferences.md`, decides the next best action across the whole hunt, delegates to specialists, assembles reports, stages calendar events. This is what scheduled runs and most commands invoke. |
| `resume-intelligence` | Tailors a resume to one JD: keyword alignment, rewritten bullets, summary, cover letter. ATS-friendly, truthful. |
| `outreach` | Networking. Finds 5 contacts (2 peer / 1 manager / 1 recruiter / 1 senior), ranks them, drafts 3 messages each. Templates only — never auto-sends. |
| `career-coach` | Skill-gap analysis, learning plan with real resources, role-specific interview prep. |

### Commands (`.claude/commands/`)

| Command | Does | Gate |
|---------|------|------|
| `/intake` | One-time: parse master resume → `base-resume.json`, build `preferences.md` | Owner confirms preferences |
| `/find-targets` | Research + rank roles/companies → `targets/shortlist.md` | Owner picks which to pursue |
| `/apply <company>` | Full pipeline for one target: gap analysis → tailored resume + **2-page PDF** → cover letter → outreach → **stage** calendar events | Drafts only |
| `/quick-apply <JD>` | Office fast-flow: paste a JD → tailored 2-page resume **PDF** + cover letter only (resume as template + projects library). Skips coaching/outreach | Drafts only |
| `/revise-resume <company> "<feedback>"` | Apply your feedback to a tailored resume and regenerate the PDF (the iterate loop) | Drafts only |
| `/standup` | Daily: today's actions, follow-ups due, calendar, blockers → `reports/daily/` | Report only |
| `/weekly-review` | Weekly metrics + plan adjustment → `reports/weekly/` | Report only |
| `/review-calendar` | Show `calendar/pending-events.json`; push approved events to Google Calendar | **Calendar approval** |
| `/review-outreach` | Show drafted messages; mark approved ones ready (owner still sends) | **Send approval** |

### Workspace (`job-search/` — the data model)

```
job-search/
  profile/
    resume.pdf | resume.md     — master resume (source of truth / template)
    base-resume.json           — parsed structured resume (cached, regenerable)
    projects.md                — master projects library: every project + skills + delivery/impact (resume agent draws from this)
    preferences.md             — target roles, locations, salary, must-haves, dealbreakers
  targets/
    shortlist.md               — researched + ranked companies/roles
  pipeline/
    pipeline.md                — the board: every application + status + next action
    <company--role>/           — one folder per pursued target
      jd.md                    — job description
      analysis.md              — readiness + skill gaps (career-coach)
      resume-tailored.md       — ATS-tailored resume in markdown (resume-intelligence)
      Dhruv_Nirmal_<Co>_<Role>.pdf — the 2-page PDF deliverable (built from resume-tailored.md)
      cover-letter.md
      outreach.md              — 5 contacts + drafted messages (outreach)
      log.md                   — dates, status, follow-up schedule
  reports/
    daily/YYYY-MM-DD.md
    weekly/week-N.md
  calendar/
    pending-events.json        — events staged for review BEFORE Google Calendar
plan/
  30-day-playbook.md           — the day-by-day plan
```

Mapping from the old DB: Job → a `pipeline/<company--role>/` folder; Resume → `resume-tailored.md`; Contact/NetworkingResult → `outreach.md`; CareerAnalysis → `analysis.md`. Folder naming: lowercase, spaces→`-`, company and role joined by `--` (e.g. `quantium-telstra--data-scientist-fraud`).

### Skills (`.claude/skills/<name>/SKILL.md`)

Reused job-search skills: `parse-resume`, `parse-jd`, `extract-skills`, `extract-requirements`, `identify-skill-gap`, `generate-learning-plan`, `generate-resume`, `find-people`, `generate-messages`, `generate-outreach`, `career-coach`. Plus `calendar-sync` (turns approved staged events into Google Calendar events via the calendar MCP). PDF parsing uses Python `pdfplumber`; resume PDFs are built by `scripts/build_resume_pdf.py` (reportlab, single-column, auto-fits ≤2 pages). No Node/npm stack — Python only, via Bash.

## Scheduled cloud routines

Run automatically (created via the `schedule` skill); each invokes `job-hunt-commander` and ends with a push notification. Output still respects the review gate.

- **Daily standup** — morning: writes `reports/daily/`, notifies today's actions.
- **Weekly review** — weekly: writes `reports/weekly/`, notifies.
- **Follow-up checker** — daily: scans `pipeline/*/log.md`, **stages** reminder events (does not push to calendar).

## Networking constraints

- Always exactly 5 targets: 2 peers, 1 manager, 1 recruiter, 1 senior.
- Tone by persona: Peer → advice-seeking · Recruiter → express interest · Manager → value proposition · Senior → respectful curiosity.
- Connection requests ≤ 300 characters. Verify named people currently work at the company.
- **Never automate messaging.** Draft templates only.

## 30-day campaign (see `plan/30-day-playbook.md`)

- Days 1–3: `/intake` + `/find-targets` → shortlist locked.
- Days 4–10: `/apply` first batch (3–5), start outreach, begin top skill-gap learning.
- Days 11–20: scale applications + follow-ups, interview prep, mid-point `/weekly-review`.
- Days 21–30: interview loops, thank-yous, negotiation prep, close.

Daily loop: `/standup` (auto) → do the work → `/review-calendar` + `/review-outreach` when prompted.

## Owner context

- Currently: Data Engineer at PI Data Analytics (Comprara Group), Melbourne, since June 2024.
- Master resume: `Dhruv_Nirmal_Resume.pdf` (repo root → migrated to `job-search/profile/` by `/intake`).
