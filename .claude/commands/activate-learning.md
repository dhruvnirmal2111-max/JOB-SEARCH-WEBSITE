---
description: One-time — turn on the recurring learning routines (daily DS lesson + weekly DS mock interview) as cloud Routines. Mirrors /activate-schedules.
allowed-tools: Read, Bash
---

# /activate-learning — turn on the learning routines

One-time setup. Create two recurring cloud Routines (via the `schedule` / `create_trigger` mechanism, which needs the owner's approval), each of which runs its command, writes its dated log, commits + pushes to `main`, and finishes with a **push notification**:

1. **Daily DS lesson** — default **07:30 Australia/Melbourne** (adjustable; shift to India timezone after relocation). Prompt: run `/learn` for today's topic, write `job-search/learning/lessons/<date>.md`, commit + push, then send a push notification with the topic + takeaway.
2. **Weekly DS mock interview** — default **Sunday 10:00 Australia/Melbourne**. Prompt: run `/ds-interview`, write `job-search/learning/tests/week-N.md`, commit + push, then push-notify the score + weak area.

Before creating: confirm the times with the owner. After creating: list the new Routine IDs and remind the owner they can pause/edit/delete them via the `schedule` skill (or ask here).

Note: this replaces the retired job-hunt auto-routines (Daily Scout, Application Engine, Standup, Weekly Review). The manual commands (`/apply`, `/quick-apply`, `/add-project`, `/revise-resume`) remain available on demand.
