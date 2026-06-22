---
description: Research and rank dream companies worth building relationships at (Track B), regardless of whether they have an open role. Proposes a list; the owner confirms which to pursue.
argument-hint: "[optional focus, e.g. 'fintech' or 'remote-friendly']"
allowed-tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---

# /scout-accounts — build the dream-company list (Track B)

Goal: find companies worth knowing people at **before** a role exists, so when one posts you apply warm. This is the proactive counterpart to `/find-targets` (which needs a live posting).

## Steps

1. **Read** `job-search/profile/preferences.md` and `job-search/profile/base-resume.json` for fit. Apply any extra focus from `$ARGUMENTS`. Read `job-search/network/target-accounts.md` so you don't duplicate existing rows.

2. **Research with `WebSearch` / `WebFetch`.** Find companies matching the owner's target roles, domains, seniority, and location that they'd genuinely take a role at (honor the salary floor — AUD 95,000 — for the kind of role they'd want, even if nothing's posted now). For each capture: why it's a fit, and whether it currently has a relevant open role (`yes/no`). Aim for 8–12 candidates.

3. **Rank** by fit (role/domain match, location, growth, how much the owner would want to work there). Highest first.

4. **Append to `job-search/network/target-accounts.md`** — fill Company, Why it's a fit, Warmth (`cold` to start), Open role now?, and Added (today via `date +%F`). Leave `Pursue?` **blank** — these are candidates, not confirmed.

5. **Commit + push.** Then **notify the owner** with the list (company · why · open role now? · fit) and ask which to pursue. **Build no outreach.** The owner confirms by setting `Pursue? = yes`; only then does `/connect <company>` build relationships.

## Rules
- Don't fabricate. If you can't verify a company is a real fit, say so or drop it.
- This command does not contact anyone or draft messages — it only proposes accounts. Confirm-first, same as the scout.
- If a candidate **already has a relevant open role**, flag it: the owner may prefer `/apply` (Track A) directly.
