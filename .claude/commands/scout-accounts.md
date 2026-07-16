---
description: Research and rank dream companies worth building relationships at (Track B), regardless of whether they have an open role. Proposes a list; the owner confirms which to pursue.
argument-hint: "[optional focus, e.g. 'fintech' or 'remote-friendly']"
allowed-tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---

# /scout-accounts — build the dream-company list (Track B)

Goal: find companies worth knowing people at **before** a role exists, so when one posts you apply warm. This is the proactive counterpart to `/find-targets` (which needs a live posting).

## Steps

1. **Read** `job-search/profile/goals.md` (north star: remote-first, relocating to India), `job-search/profile/preferences.md`, and `job-search/profile/base-resume.json` for fit. Apply any extra focus from `$ARGUMENTS`. Read `job-search/network/target-accounts.md` so you don't duplicate existing rows.

2. **Research with `WebSearch` / `WebFetch`.** Default focus (per `goals.md`): **remote-first data & AI/tech companies that hire in India, Dubai, or Singapore** — the geographies that survive the move out of Australia. Include strong AU-remote employers too, but lead with roles the owner could keep after relocating. Find companies matching the owner's target roles (Data Analyst / Data Scientist / AI-focused), domains, and seniority that they'd genuinely take a role at, even if nothing's posted now. For each capture: why it's a fit, its remote posture + hiring geos, and whether it currently has a relevant open role (`yes/no`). Aim for 8–12 candidates.

3. **Rank** by fit (role/domain match, **remote posture + India/Dubai/Singapore reach**, growth, how much the owner would want to work there). Roles that survive the move to India rank highest.

4. **Append to `job-search/network/target-accounts.md`** — fill Company, Why it's a fit (note remote posture + hiring geos), Warmth (`cold` to start), Open role now?, and Added (today via `date +%F`). Leave `Pursue?` **blank** — these are candidates, not confirmed.

5. **Commit + push.** Then **notify the owner** with the list (company · why · remote/geo · open role now? · fit) and ask which to pursue. **Build no outreach.** The owner confirms by setting `Pursue? = yes`; only then does `/connect <company>` build relationships. If `/networking-hour` isn't set up yet, remind the owner they can run it once to get the weekly networking-hour reminder on their calendar.

## Rules
- Don't fabricate. If you can't verify a company is a real fit, say so or drop it.
- This command does not contact anyone or draft messages — it only proposes accounts. Confirm-first, same as the scout.
- If a candidate **already has a relevant open role**, flag it: the owner may prefer `/apply` (Track A) directly.
