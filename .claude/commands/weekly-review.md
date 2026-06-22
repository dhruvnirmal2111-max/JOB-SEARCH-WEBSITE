---
description: Weekly review — metrics for the week, pace vs the 30-day plan, and next week's focus. Writes a weekly report.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# /weekly-review — weekly retrospective

Invoke the `job-hunt-commander` agent in **weekly review** mode.

It should:
0. Re-read `job-search/profile/goals.md` and judge whether the week moved the owner toward their goals/north star; flag drift and any unfilled `[TELL ME]` goal items.
1. Aggregate the week from the pipeline + logs: applications sent, responses, interviews, outreach sent.
2. Compare against the pace implied by `plan/30-day-playbook.md`; flag risks (too few applications, stalled outreach, no interviews by mid-point).
3. Recommend next week's focus and adjust the plan if needed.
4. Write `job-search/reports/weekly/week-<N>.md` (compute N from the campaign start date in `preferences.md`).
5. End with a decision summary.

Report-only: do not change application statuses.
