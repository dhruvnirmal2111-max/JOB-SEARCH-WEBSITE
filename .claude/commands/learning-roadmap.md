---
description: Build or refresh the DS learning roadmap + progress tracker by diffing a strong-Data-Scientist target against your resume/projects, and fill the growth-goals in goals.md. Run once to set up, or again to re-plan.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, WebFetch, WebSearch
---

# /learning-roadmap — build/refresh the DS curriculum

Delegate to the `ds-learning-coach` agent in **roadmap** mode.

1. Diff a synthesised "strong Data Scientist" target profile against `job-search/profile/base-resume.json` + `projects.md` (reuse `identify-skill-gap` logic): what the owner is solid on vs. the real DS gaps.
2. Update `job-search/learning/roadmap.md` sequencing and `job-search/learning/progress.md` (mark existing strengths 🟡/🟢 "formalise", real gaps 🔴).
3. Fill the `## Skills / growth goals` section of `job-search/profile/goals.md` with concrete DS growth targets (reuse `generate-learning-plan` framing).
4. Commit + push to `main`. Report the top 3 gaps and the next two weeks of focus.
