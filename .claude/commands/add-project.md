---
description: Log a new project (or flesh out an existing one) into the master projects library and push to GitHub. Just describe the project — works great from the phone app.
argument-hint: "<describe the project: what you built, tools, and the impact/result>"
allowed-tools: Read, Write, Edit, Bash
---

# /add-project — grow the master projects library

The owner will describe projects over time (often from the phone). Capture each into `job-search/profile/projects.md` so every future tailored resume can draw on it.

## Steps
1. Read `job-search/profile/projects.md`.
2. From `$ARGUMENTS`, extract: project name, the skills/tech used, what they did, and the delivery/impact (numbers if given). If something key is missing (especially **impact/result**), ask one quick follow-up — otherwise proceed.
3. **If it's a new project**, append a new entry under the most fitting section (or "Selected AI & analytics solutions") in this format, with hashtags so the resume agent can match it to JDs:
   ```
   ### P<next-number>. <Name> `#tags`
   - **Skills/tech:** ...
   - **What I did:** ...
   - **Delivery/impact:** ...
   ```
   **If it extends an existing project**, edit that entry instead of duplicating.
4. Update the **Skills index** at the bottom if the project introduces new skills/tools.
5. Commit + push: `git add job-search/profile/projects.md && git commit -m "projects: add <name>" && git push origin main`.
6. Confirm what was added in one line.

## Rules
- **Truthful only** — record what the owner actually did; never inflate metrics. If no metric is given, describe the outcome qualitatively rather than inventing a number.
- Keep entries tight (3 bullets). This is ammunition for resumes, not a diary.
