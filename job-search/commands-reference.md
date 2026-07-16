# Job Hunt OS - Command Reference

Your personal, file-based job-hunt and learning system. Type any command below in Claude Code (laptop, or the Claude mobile/web app on this repo). Two ideas run through everything:

- **Review gate:** resumes, cover letters, and outreach messages are always produced as **drafts**. Nothing is ever sent for you - you send manually. The only things written straight to your calendar are **reminders** (they tell you to act, they never act for you).
- **Two networking tracks:** **Track A** is reactive (a live posting -> tailor + apply + outreach). **Track B** is proactive (build relationships at dream companies before a role exists). Track B feeds Track A: when a target posts, you apply warm.

## Setup (one-time)

### /intake
- **Does:** Parses your master resume into `base-resume.json` and builds `preferences.md` from a short Q&A.
- **When to use:** Once, at the very start (or after a major resume overhaul).
- **Gate:** You confirm the preferences.
- **Invoke:** `/intake`

## Applications - Track A (a live posting)

### /apply <company or JD>
- **Does:** The full package for one target - tailored resume + 2-page PDF, cover letter, and 5 outreach contacts with drafted messages. Creates one outreach reminder straight on your Google Calendar.
- **When to use:** You found a role you want and are ready to build the whole application.
- **Gate:** Drafts only (you submit + send). The single calendar reminder is auto-created.
- **Invoke:** `/apply Quantium` or paste/point to a JD URL.

### /quick-apply <JD>
- **Does:** Fast lane - paste a JD, get a tailored 2-page resume PDF plus cover letter. No outreach or coaching unless you ask.
- **When to use:** You just want the CV + letter quickly, no full package.
- **Gate:** Drafts only.
- **Invoke:** `/quick-apply <paste the JD>`

### /batch-apply [N]
- **Does:** Autonomous engine - builds resume + cover letter + outreach for the next N targets, committing after each.
- **When to use:** You want to process several targets in one go.
- **Gate:** Drafts only.
- **Invoke:** `/batch-apply 3`

### /revise-resume <company> "<feedback>"
- **Does:** Applies your feedback to a tailored resume and regenerates the 2-page PDF. The iterate loop.
- **When to use:** After reading a draft resume and wanting changes.
- **Gate:** Drafts only.
- **Invoke:** `/revise-resume 7-eleven "split projects by client, name the tools"`

### /career-coach <company>
- **Does:** On-demand skill-gap analysis + role-specific interview prep for one target. Kept out of the volume path on purpose.
- **When to use:** You have an interview coming up, or want a readiness check for a specific role.
- **Gate:** None (analysis only).
- **Invoke:** `/career-coach AGL`

## Projects library

### /add-project <description>
- **Does:** Logs a new project (or fleshes out an existing one) into `profile/projects.md` and pushes. This is the ammunition your resumes draw from - grow it over time.
- **When to use:** Any time you finish or remember a project. Great from the phone.
- **Gate:** None.
- **Invoke:** `/add-project built a Prophet forecast for fresh-produce demand...`

## Targeting

### /find-targets
- **Does:** Researches and ranks live roles/companies that fit your preferences into a shortlist you choose from (Track A funnel).
- **When to use:** You want a fresh set of postings to consider.
- **Gate:** You pick which to pursue.
- **Invoke:** `/find-targets`

## Networking - Track B (proactive, relationship-first)

### /scout-accounts [focus]
- **Does:** Researches + ranks dream companies worth knowing people at, whether or not they're hiring. Biased to remote-first data & AI/tech companies hiring in India, Dubai, or Singapore (the geos that survive your move), plus strong AU-remote employers.
- **When to use:** To fill the top of your networking funnel.
- **Gate:** You confirm which to pursue (set `Pursue? = yes` in `network/target-accounts.md`).
- **Invoke:** `/scout-accounts` or `/scout-accounts fintech`

### /connect <company>
- **Does:** For a confirmed account, finds 5 people (2 peers / 1 manager / 1 recruiter / 1 senior), drafts the Day-0 -> value-touch -> soft-ask nurture cadence, logs them in the relationship CRM, and drops "reach out / touch due" reminders on your calendar.
- **When to use:** After you set `Pursue? = yes` on a company.
- **Gate:** Drafts only (you send). Networking reminders are auto-created.
- **Invoke:** `/connect Canva`

### /networking-hour
- **Does:** The weekly rhythm. One-time it sets up a recurring "Networking hour" calendar block; every run it surfaces this hour's to-dos - accounts to confirm, people whose touch is due, drafts ready to send.
- **When to use:** During your weekly networking block (default Fri 3pm). Run `setup` once to place the recurring reminder.
- **Gate:** Drafts only.
- **Invoke:** `/networking-hour` (or `/networking-hour setup`)

## Learning - close the Data Science gap

### /learning-roadmap
- **Does:** Builds/refreshes the DS curriculum (`learning/roadmap.md` + `progress.md`) by diffing a strong-DS profile against your resume/projects, and fills the growth goals in `goals.md`.
- **When to use:** Once to set up the learning system, or again to re-plan.
- **Gate:** None.
- **Invoke:** `/learning-roadmap`

### /learn
- **Does:** A daily bite-sized DS lesson - a concept, a worked example, the interview angle, and self-check Q&A. Quizzes you interactively in-session, or writes a lesson log when scheduled.
- **When to use:** Daily, to steadily close the DS gap.
- **Gate:** Learning (no external action).
- **Invoke:** `/learn`

### /ds-interview
- **Does:** A weekly full DS mock interview across stats, ML, model evaluation, SQL, Python, experimentation/product, plus a case and a behavioural - with model answers. Tracks your weak areas.
- **When to use:** Weekly, to pressure-test and find weak spots.
- **Gate:** Learning.
- **Invoke:** `/ds-interview`

### /activate-learning
- **Does:** One-time - turns on the recurring learning routines (daily lesson + weekly mock) as cloud routines.
- **When to use:** Once, after you're happy with the roadmap.
- **Gate:** You confirm the times.
- **Invoke:** `/activate-learning`

## Reports and review gates

### /standup
- **Does:** Daily rundown - today's top actions, follow-ups due, calendar blocks, blockers. Writes a daily report.
- **When to use:** Start of day.
- **Gate:** Report only.
- **Invoke:** `/standup`

### /weekly-review
- **Does:** Weekly metrics, pace vs the 30-day plan, and next week's focus. Writes a weekly report.
- **When to use:** End of week.
- **Gate:** Report only.
- **Invoke:** `/weekly-review`

### /review-calendar
- **Does:** Shows staged calendar events and pushes the ones you approve to Google Calendar. This is the calendar approval gate (outreach + networking reminders skip it; anything else waits here).
- **When to use:** When there are non-reminder events staged, or the connector was offline when something was created.
- **Gate:** Calendar approval.
- **Invoke:** `/review-calendar`

### /review-outreach
- **Does:** Shows the drafted outreach messages (both tracks) and marks approved ones ready. You still send them manually.
- **When to use:** Before sending any outreach.
- **Gate:** Send approval.
- **Invoke:** `/review-outreach`

## Schedules

### /activate-schedules
- **Does:** Turns on the recurring cloud routines (retained standup / weekly review) after intake. The auto job-hunt routines are retired; learning routines live under /activate-learning.
- **When to use:** Once, if you want the report routines running.
- **Gate:** You confirm.
- **Invoke:** `/activate-schedules`

## The everyday loops

- **Apply to a role:** `/apply <company>` -> review the PDF + cover letter -> `/review-outreach` -> send -> the outreach reminder is already on your calendar.
- **Build relationships:** `/scout-accounts` -> set `Pursue? = yes` -> `/connect <company>` -> send Day-0 requests -> nurture during your weekly `/networking-hour`.
- **Close the DS gap:** `/learn` daily -> `/ds-interview` weekly -> weak areas resurface automatically.
- **Grow your ammunition:** `/add-project` whenever you finish something worth remembering.
