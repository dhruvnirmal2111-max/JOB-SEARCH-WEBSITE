---
description: Autonomously build full application packages for the next N targets — heavy lifting, end to end, as reviewable drafts. The engine that saves you time.
argument-hint: "[N targets, default 2] [optional focus]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Task
---

# /batch-apply — autonomous application engine

Goal: produce complete, reviewable application packages for several targets without the owner doing the heavy lifting. Drafts only — nothing is submitted, sent, or added to a calendar.

## Setup
At the start, ensure tooling: `pip install -q reportlab pdfplumber` (no-op if present).

## Select targets (N defaults to 2)
1. Read `job-search/targets/shortlist.md` and `job-search/pipeline/pipeline.md`.
2. Build the work queue = targets that do **not** already have a `job-search/pipeline/<company--role>/` folder, chosen in this priority:
   - First, rows marked `Pursue? = yes`.
   - If fewer than N such rows, **top up from the highest-ranked remaining rows** (specific postings before company targets). The owner reviews everything before submitting, so preparing top picks autonomously is safe.
3. If the shortlist has fewer than N unbuilt rows total, first run a quick `/find-targets` pass to refresh it, then continue.
4. Take the first N from the queue.

## For EACH selected target (loop)
Run the full `/apply` pipeline:
1. Get the JD (from the shortlist's Source URL via WebFetch, or a search). Save to `job-search/pipeline/<company--role>/jd.md`; create `log.md` (status = Applying).
2. Delegate via Task, passing JD path + `job-search/profile/base-resume.json` + `job-search/profile/projects.md` + the target folder:
   - `career-coach` → `analysis.md`
   - `resume-intelligence` → `resume-tailored.md` + `cover-letter.md` + **2-page PDF** (`Dhruv_Nirmal_<Company>_<Role>.pdf`)
   - `outreach` → `outreach.md`
3. Stage calendar events (submit reminder, week-1 outreach, prep blocks) into `job-search/calendar/pending-events.json` (all `status:"pending"`).
4. Update `pipeline.md` (add the row, Status = Applying, Next action = "owner: review + submit").
5. **Commit + push immediately after each target** (`git add -A && git commit -m "batch-apply <company>" && git push origin main`) so progress survives even if the session is cut short.

## Finish
- Summarize: which packages are ready, the PDF paths, and any honest gaps flagged per role.
- Tell the owner to review each resume PDF, run `/review-outreach` and `/review-calendar`, then submit. Offer `/revise-resume <company> "<feedback>"` for changes.
- Never mark anything "Applied"/"Sent" — only the owner confirms after they actually submit.

## Rules
- Truthful resumes only; ≤2 pages; honest role bridging (e.g. Data Engineering → Data Scientist), never invent titles/experience.
- Never auto-send outreach, never create calendar events directly. Prepare → stage → owner reviews.
