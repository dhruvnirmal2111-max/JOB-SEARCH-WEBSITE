---
description: Daily standup — today's top actions, follow-ups due, calendar blocks, blockers. Writes a daily report.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# /standup — daily plan

Invoke the `job-hunt-commander` agent in **standup** mode.

It should:
1. Read `preferences.md`, `pipeline.md`, every `pipeline/*/log.md`, and today's date.
2. Work out where the campaign is vs `plan/30-day-playbook.md`.
3. Produce today's top 3–5 highest-leverage actions, list follow-ups due, and note blockers.
4. Stage any time-bound events (prep, follow-up, deadline) into `calendar/pending-events.json`.
5. Write `job-search/reports/daily/<YYYY-MM-DD>.md`.
6. End with a decision summary and remind the owner to `/review-calendar` if anything was staged.

Report-only: do not change application statuses.
