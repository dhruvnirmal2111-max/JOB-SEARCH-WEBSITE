---
description: Turn on the recurring cloud routines (daily standup + weekly review) after intake is complete. Run once.
allowed-tools: Read, Bash, Skill
---

# /activate-schedules — start the cloud routines

Run this **after `/intake` and `/find-targets`** so the routines have something to act on. It creates recurring cloud agents via the `schedule` skill. Confirm with the owner before creating, then create both.

Timezone: **Australia/Melbourne (AEST/AEDT)**.

## Routines to create

1. **Daily standup** — every day at **07:00** Melbourne time.
   - Action: run the `/standup` command (invokes `job-hunt-commander` in standup mode). This also runs the follow-up check and stages any due reminder/prep events.
   - Finish by sending a **push notification** with today's top actions and a note to `/review-calendar` if anything was staged.

2. **Weekly review** — every **Sunday at 18:00** Melbourne time.
   - Action: run the `/weekly-review` command (invokes `job-hunt-commander` in weekly-review mode).
   - Finish by sending a **push notification** with the week's metrics + next week's focus.

## Steps
1. Verify `job-search/profile/preferences.md` is filled (campaign started). If not, tell the owner to run `/intake` first and stop.
2. Use the `schedule` skill to create the two routines above with the exact times and the push-notification finish step.
3. List the created schedules (their ids) and tell the owner they can pause/edit/delete them via the `schedule` skill, or trigger any workflow on demand from the Claude mobile/web app.

## Notes
- Output from scheduled runs still respects the review gate: nothing is sent and nothing reaches Google Calendar without `/review-outreach` / `/review-calendar`.
- To change times later, re-run the `schedule` skill or edit the routine.
