---
description: On-demand skill-gap analysis + interview prep for one target. Run this only when you want it (it's deliberately kept out of the auto-apply volume path).
argument-hint: "<company or company--role>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Task
---

# /career-coach — gap analysis + interview prep (on demand)

Use when an application is progressing (e.g. you got a screen) and you want the prep.

## Steps
1. Resolve the target from `$ARGUMENTS` → `job-search/pipeline/<company--role>/`. If ambiguous, list pipeline folders and ask.
2. Invoke the `career-coach` agent via the Task tool, passing the JD (`<folder>/jd.md`) and `job-search/profile/base-resume.json`, and tell it to write `<folder>/analysis.md` — readiness score, skill-gap table, learning plan (real resources + YouTube links), and the 4-category interview prep.
3. Summarize the top gaps and the highest-leverage prep, and point to `analysis.md`.

## Note
This is intentionally separate from `/apply` and `/batch-apply` (which now produce resume + cover letter + outreach only, for speed/volume). Run this per role when you actually need to prep — not for every application.
