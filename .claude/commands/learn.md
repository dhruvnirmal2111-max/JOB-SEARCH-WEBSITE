---
description: Daily Data Science lesson — a bite-sized concept (theory + worked example + interview angle + self-check Q&A) that closes the DS gap. Interactive quiz if you're in a session; writes a lesson log if scheduled.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, WebFetch, WebSearch
---

# /learn — daily DS lesson

Delegate to the `ds-learning-coach` agent in **daily lesson** mode.

1. The agent reads `job-search/learning/roadmap.md` + `job-search/learning/progress.md` + `job-search/profile/goals.md` (and `base-resume.json` / `projects.md` for grounding), then picks the next topic (next in sequence, or a weak area due for spaced review).
2. It teaches a bite-sized lesson: **Concept → Worked example → Interview angle → (optional Trend of the day) → Self-check Q&A (answers at the bottom)**.
3. **If this is an interactive session with the owner:** teach, then quiz live (ask → owner answers → grade + explain). Update `progress.md`.
4. **If run headless/scheduled:** write the lesson to `job-search/learning/lessons/YYYY-MM-DD.md`, update `progress.md`, `git add` + commit + push to `main`, and finish with a **push notification** (topic + one-line takeaway).

Args (optional): a specific topic or module to focus today (e.g. `/learn A/B testing`) overrides the auto-pick.
