---
description: One-time setup — parse the master resume into base-resume.json and build preferences.md from a short Q&A.
argument-hint: "[optional path to resume PDF]"
allowed-tools: Read, Write, Edit, Bash, Glob
---

# /intake — initialize the Job Hunt OS

Goal: turn the owner's raw resume into structured data and capture their preferences. This is the first thing run in the campaign.

## Steps

1. **Locate the resume.** Use `$ARGUMENTS` if a path was given; otherwise look for `job-search/profile/resume.pdf`, then any `*Resume*.pdf` in the repo root. If found in root, copy it to `job-search/profile/resume.pdf`.

2. **Parse it.** Use Python + `pdfplumber` via Bash to extract text. If `pdfplumber` is missing, tell the owner to `pip install pdfplumber`. Extract into structured JSON: name, email, phone, linkedin, location, summary, skills (categorized), experience (company, title, dates, bullets), education, projects. Write to `job-search/profile/base-resume.json`.

3. **Preferences Q&A.** Ask the owner (use AskUserQuestion where it helps) for: target roles, seniority, locations + remote/hybrid/onsite, comp target + floor, must-haves, dealbreakers, industries of interest / to avoid. Pre-fill sensible defaults from the resume (current role, location) and let them correct.

4. **Write `job-search/profile/preferences.md`** with their answers, and set the campaign start date to today (`date +%F`) and the 30-day target end date.

5. **Confirm** the parsed summary back to the owner (don't dump the whole JSON) and tell them the next step is `/find-targets`.

## Rules
- Never invent resume content — extract only what's there.
- This command writes profile files only; it does not start applications.
