---
description: Run the full application pipeline for one target — gap analysis, tailored resume, cover letter, outreach contacts + messages — all as drafts, and stage calendar events.
argument-hint: "<company> [role] — or paste/point to a JD"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Task
---

# /apply — build one application (drafts only)

Goal: produce everything needed to apply to one target, as reviewable drafts. Nothing is sent. The one calendar event this creates — an outreach reminder — is owner-authorized and written straight to Google Calendar.

## Steps

1. **Resolve the target** from `$ARGUMENTS`. Get the JD: from a path/URL given, from the shortlist, or by searching. Save it to `job-search/pipeline/<company--role>/jd.md` (folder name: lowercase, spaces→`-`, `company--role`).

2. **Create the pipeline folder** and an initial `log.md` (created date, status = Applying, empty follow-up schedule).

3. **Delegate to specialists via the Task tool** (pass them the JD path, `base-resume.json`, `job-search/profile/projects.md`, `job-search/profile/resume-style.md` (owner's voice/summary/title preferences), and the target folder to write into):
   - `resume-intelligence` → `resume-tailored.md` + `cover-letter.md` + the **2-page PDF** (`Dhruv_Nirmal_<Company>_<Role>.pdf`). It pulls relevant projects from `projects.md`, bridges role differences (e.g. Data Engineering → Data Scientist) honestly, and runs `scripts/build_resume_pdf.py`.
   - `outreach` → `outreach.md` (5 contacts: 2 peer/1 manager/1 recruiter/1 senior + 3 messages each).
   - **career-coach is NOT run by default** (gap analysis/interview prep) — run `/career-coach <company>` on demand when you want it.

4. **Create the outreach reminder directly in Google Calendar** (owner-authorized — no approval needed for outreach reminders). Add one entry to `job-search/calendar/pending-events.json` (`kind:"outreach"`), then push it straight to Google Calendar via the `calendar-sync` skill:
   - Title: "Send outreach: <Company> <Role>"; a ~20-min block a few days out; notes = the path to this target's `outreach.md` + "verify each person is current; you send manually".
   - If the Google Calendar connector is connected, create the event immediately and record `status:"created"` + `gcal_event_id` + `gcal_link` back into the JSON.
   - If the connector is NOT reachable, leave it `status:"pending"` and tell the owner to run `/review-calendar` (or connect the calendar) — never fail the whole `/apply` over calendar.
   - Do NOT create prep/submit/setup events — only the single outreach reminder.

5. **Update `pipeline.md`**: add a row for this target (Status = Applying, Next action = "owner: submit application + review outreach").

6. **Summarize**: list the drafts created — including the **PDF path** — and tell the owner to review the resume PDF + cover letter, run `/review-outreach`, and `/review-calendar`. Invite feedback: they can reply with changes (or run `/revise-resume <company> "<feedback>"`) and the resume + PDF get regenerated. Do NOT mark it "Applied" — only the owner confirms that.

## Rules
- Truthful resume only; never auto-send outreach messages.
- The only calendar event created is the single outreach reminder (owner-authorized). Never create prep/submit/setup events.
