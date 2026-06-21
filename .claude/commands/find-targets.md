---
description: Research and rank target roles/companies that fit the owner's preferences; write a ranked shortlist for the owner to choose from.
argument-hint: "[optional extra focus, e.g. 'remote only' or 'fintech']"
allowed-tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---

# /find-targets — build the shortlist

Goal: the owner has a resume but no fixed targets. Research real, currently-open-ish roles that fit and rank them.

## Steps

1. **Read** `job-search/profile/preferences.md` and `job-search/profile/base-resume.json` to understand fit. Apply any extra focus from `$ARGUMENTS`.

2. **Research with `WebSearch` / `WebFetch`.** Find roles/companies matching the target roles, seniority, location, and domains. Prefer real, currently-advertised openings. For each, capture a **source URL** and the **date posted** (or best estimate, e.g. "~Jun 2026" / "this week"). **Apply the salary filter** from `preferences.md` — drop anything advertised below the minimum (AUD 95,000). Aim for 10–15 candidates.

3. **Score each** for fit (role match, location, seniority, domain interest). Rank highest first.

4. **Append to `job-search/targets/shortlist.md`** filling the table including the **Posted** column. Leave `Pursue?` **blank** — these are candidates, not confirmed.

5. **Notify the owner with the list** (company, role, posted date, fit, source) and ask which to pursue. **Do NOT build or apply to anything.** The owner confirms by setting `Pursue? = yes` (here or via the Claude app / GitHub); the engine then builds only those.

## Rules
- Don't fabricate job postings. If you can't verify a specific opening, mark the row as "company target (no specific posting verified)".
- This command does not start applications; the owner chooses, then `/apply` runs.
