---
description: Research and rank target roles/companies that fit the owner's preferences; write a ranked shortlist for the owner to choose from.
argument-hint: "[optional extra focus, e.g. 'remote only' or 'fintech']"
allowed-tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---

# /find-targets — build the shortlist

Goal: the owner has a resume but no fixed targets. Research real, currently-open-ish roles that fit and rank them.

## Steps

1. **Read** `job-search/profile/preferences.md` and `job-search/profile/base-resume.json` to understand fit. Apply any extra focus from `$ARGUMENTS`.

2. **Research with `WebSearch` / `WebFetch`.** Find roles/companies matching the target roles, seniority, location, and domains. Prefer real companies and real-sounding openings; capture a source URL for each. Aim for 12–20 candidates.

3. **Score each** for fit (role match, location, seniority, domain interest, and rough chance of response/fit). Rank highest first.

4. **Write `job-search/targets/shortlist.md`** filling the table (Company, Role, Location, Why it fits, Fit score, Source, Pursue?). Leave `Pursue?` blank.

5. **Present the top ~10** to the owner and ask which to pursue. Set `Pursue? = yes` on their picks. Tell them to run `/apply <company>` for each — or offer to kick those off.

## Rules
- Don't fabricate job postings. If you can't verify a specific opening, mark the row as "company target (no specific posting verified)".
- This command does not start applications; the owner chooses, then `/apply` runs.
