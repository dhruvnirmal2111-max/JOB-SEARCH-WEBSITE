---
description: Proactive networking (Track B) rhythm. One-time, sets up a weekly recurring "networking hour" reminder on Google Calendar; every run, surfaces this hour's networking to-dos (accounts to confirm, people due for a touch, drafts ready to send).
argument-hint: "(none) — or 'setup' to just (re)create the weekly calendar reminder"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch
---

# /networking-hour — the weekly Track B rhythm

Proactive networking runs on a **weekly cadence**, not per-application. This command is that rhythm: a standing calendar block plus the checklist of what to do in it. It never sends anything — every message stays a draft the owner sends manually.

## Setup (once — also safe to re-run)

Ensure a **weekly recurring "Networking hour" event** exists on Google Calendar (owner-authorized, like outreach reminders). Via the `calendar-sync` skill:
- Title: **"Networking hour (Track B)"**, ~60 min, default **Friday 15:00 Australia/Melbourne** (adjustable; shift to India timezone after relocation), recurrence = **weekly**.
- Notes: "Run /networking-hour. Confirm scouted dream companies, run /connect on confirmed ones, send today's due connection requests + touches (all drafts). Remote + India/Dubai/Singapore data & AI focus."
- Record it in `job-search/calendar/pending-events.json` as a single `kind:"networking"` recurring entry (id `networking-hour-weekly`) so it isn't duplicated. If the connector isn't reachable, leave it `status:"pending"` and tell the owner to run `/review-calendar` (or connect the calendar). Skip creation if id `networking-hour-weekly` is already `status:"created"`.

If `$ARGUMENTS` is `setup`, do only this and stop.

## Every run — surface this hour's work

Read `job-search/profile/goals.md`, `job-search/network/target-accounts.md`, `job-search/network/relationships.md`, and `job-search/calendar/pending-events.json`. Then present, as a short checklist:

1. **Accounts to confirm** — rows in `target-accounts.md` with `Pursue?` blank. Remind the owner to set `Pursue? = yes` on the ones they want, then run `/connect <company>`.
2. **Companies confirmed but not yet connected** — `Pursue? = yes` with no people in `relationships.md` yet → suggest running `/connect <company>` now.
3. **Touches due** — people in `relationships.md` whose **Next touch** date is today or overdue → list person · company · stage · which drafted message to send (from `people/<slug>.md`). The owner sends manually.
4. **Pipeline thin?** — if there are fewer than ~5 `Pursue?`-blank candidates, offer to run `/scout-accounts` (remote + India/Dubai/Singapore, data & AI/tech) to refill the top of the funnel.

End with the single highest-value action for this hour and, if the owner acts, bump stages/next-touch dates in `relationships.md`.

## Rules
- Drafts only — never contact anyone or auto-send. Verify each person still works at the company before reaching out.
- The weekly recurring block and any per-person touch reminders are `kind:"networking"` (owner-authorized, created directly). No other event kinds.
- Confirm-first: only `Pursue? = yes` accounts get `/connect` work.
