---
description: Run the full application pipeline for one target — gap analysis, tailored resume, cover letter, outreach contacts + messages — all as drafts, and stage calendar events.
argument-hint: "<company> [role] — or paste/point to a JD"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Task
---

# /apply — build one application (drafts only)

Goal: produce everything needed to apply to one target, as reviewable drafts. Nothing is sent; calendar events are staged, not created.

## Steps

1. **Resolve the target** from `$ARGUMENTS`. Get the JD: from a path/URL given, from the shortlist, or by searching. Save it to `job-search/pipeline/<company--role>/jd.md` (folder name: lowercase, spaces→`-`, `company--role`).

2. **Create the pipeline folder** and an initial `log.md` (created date, status = Applying, empty follow-up schedule).

3. **Delegate to specialists via the Task tool** (pass them the JD path, `base-resume.json`, and the target folder to write into):
   - `career-coach` → `analysis.md` (readiness + skill gaps + interview prep + learning plan).
   - `resume-intelligence` → `resume-tailored.md` + `cover-letter.md`.
   - `outreach` → `outreach.md` (5 contacts: 2 peer/1 manager/1 recruiter/1 senior + 3 messages each).

4. **Stage calendar events** into `job-search/calendar/pending-events.json` (all `status: "pending"`): application deadline (if known), interview-prep blocks, learning blocks from the plan, and week-1 outreach reminders. Use the event format from the commander agent.

5. **Update `pipeline.md`**: add a row for this target (Status = Applying, Next action = "owner: submit application + review outreach").

6. **Summarize**: list the drafts created and tell the owner to review the resume/cover letter, run `/review-outreach`, and `/review-calendar`. Do NOT mark it "Applied" — only the owner confirms that.

## Rules
- Truthful resume only; never auto-send outreach; never create calendar events directly.
