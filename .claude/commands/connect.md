---
description: For a confirmed target account (Track B), find 5 people and draft the full relationship nurture sequence — all as drafts, added to the relationship CRM. Never sends anything.
argument-hint: "<company> — must be Pursue? = yes in target-accounts.md"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Task
---

# /connect <company> — build relationships at a dream company (drafts only)

Goal: for one confirmed dream company, find 5 people and draft the Day-0→soft-ask nurture sequence, then track them in the relationship CRM. Nothing is sent; this is proactive networking (Track B), decoupled from any open role.

## Steps

1. **Resolve the company** from `$ARGUMENTS`. Confirm it's a row in `job-search/network/target-accounts.md` with **`Pursue? = yes`**. If it isn't confirmed (or isn't listed), stop and tell the owner to run `/scout-accounts` and/or set `Pursue? = yes` first — confirm-first rule.

2. **Delegate to the `outreach` agent via the Task tool in Track B mode.** Pass it: the company name, its `target-accounts.md` row (the "why it's a fit"), `job-search/profile/base-resume.json` for personalization, and the output paths (`job-search/network/people/` for dossiers, `job-search/network/relationships.md` for the board). It will:
   - find 5 people (2 peers / 1 manager / 1 recruiter / 1 senior), verify each currently works there,
   - draft the nurture cadence per person (Day 0 connection request ≤300 chars with **no ask** → Day 3–5 value touch → Day 10–14 soft ask),
   - write one `people/<slug>.md` dossier each and append rows to `relationships.md` with stage + next-touch dates,
   - bump the company's `Warmth` to `warm` in `target-accounts.md`.

3. **Commit + push.**

4. **Summarize**: the 5 people, that Day-0 requests are drafted and ready, and when the next touches fall due. Tell the owner to review via `/review-outreach` and that `/standup` will surface follow-ups when next-touch dates arrive.

## Rules
- Drafts only — never contact anyone, never auto-send. The owner sends manually.
- No job ask in the Day-0 / value-touch messages — this is relationship-building, not an application.
- Verify every named person currently works at the company.
- If the company already has a relevant open role the owner wants, point them to `/apply` (Track A) — `/connect` is for building relationships ahead of a role.
