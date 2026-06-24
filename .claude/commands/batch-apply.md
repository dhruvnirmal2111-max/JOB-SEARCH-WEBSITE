---
description: Autonomously build full application packages for the next N targets — heavy lifting, end to end, as reviewable drafts. The engine that saves you time.
argument-hint: "[N targets, default 2] [optional focus]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Task
---

# /batch-apply — autonomous application engine

Goal: produce complete, reviewable application packages for several targets without the owner doing the heavy lifting. Drafts only — nothing is submitted, sent, or added to a calendar.

## Setup
At the start, ensure tooling: `pip install -q reportlab pdfplumber` (no-op if present).

## Select targets (CONFIRMED ONLY)
1. Read `job-search/targets/shortlist.md` and `job-search/pipeline/pipeline.md`.
2. The work queue = rows marked **`Pursue? = yes`** that do **not** already have a `job-search/pipeline/<company--role>/` folder. **Never** auto-pick unconfirmed rows.
3. If there are **no** such confirmed-and-unbuilt rows: build nothing. Report "No confirmed targets — set `Pursue? = yes` on shortlist.md rows you want, then re-run." Stop.
4. Take up to N (default 2) from the queue. Honor the salary filter in `preferences.md` (skip roles advertised below the minimum).

## For EACH selected target (loop)
Run the full `/apply` pipeline:
1. Get the JD (from the shortlist's Source URL via WebFetch, or a search). Save to `job-search/pipeline/<company--role>/jd.md`; create `log.md` (status = Applying).
2. Delegate via Task, passing JD path + `job-search/profile/base-resume.json` + `job-search/profile/projects.md` + `job-search/profile/resume-style.md` + the target folder:
   - `resume-intelligence` → `resume-tailored.md` + `cover-letter.md` + **2-page PDF** (`Dhruv_Nirmal_<Company>_<Role>.pdf`)
   - `outreach` → `outreach.md`
   - **Do NOT run career-coach here** — gap analysis / interview prep is on-demand only (`/career-coach <company>`), kept out of the volume path for speed.
3. Stage calendar events — **outreach reminders ONLY** (one per target: "Send outreach: <Company> <Role>") into `job-search/calendar/pending-events.json` with `kind:"outreach"` and `status:"pending"`. **Do NOT stage prep, submit, or setup events** — the owner handles prep/submission themselves.
4. Update `pipeline.md` (add the row, Status = Applying, Next action = "owner: review + submit").
5. **Commit + push immediately after each target** (`git add -A && git commit -m "batch-apply <company>" && git push origin main`) so progress survives even if the session is cut short.

## Finish
- Summarize: which packages are ready, the PDF paths, and any honest gaps flagged per role.
- Tell the owner to review each resume PDF, run `/review-outreach` and `/review-calendar`, then submit. Offer `/revise-resume <company> "<feedback>"` for changes.
- Never mark anything "Applied"/"Sent" — only the owner confirms after they actually submit.

## Rules
- Truthful resumes only; ≤2 pages; honest role bridging (e.g. Data Engineering → Data Scientist), never invent titles/experience.
- Never auto-send outreach, never create calendar events directly. Prepare → stage → owner reviews.
