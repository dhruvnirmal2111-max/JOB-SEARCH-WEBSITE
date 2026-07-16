---
description: Weekly full Data Science mock interview — stats, ML, model eval, SQL, Python, experimentation/product, plus a case and a behavioural, with model answers. Not just Python. Tracks your weak areas.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, WebFetch, WebSearch
---

# /ds-interview — weekly DS mock interview

Delegate to the `ds-learning-coach` agent in **weekly DS mock interview** mode.

1. The agent reads `job-search/learning/progress.md` + `roadmap.md` and builds a **full DS interview** (not just Python): a mix across statistics/probability, ML concepts + model evaluation, SQL (applied), Python for DS, experimentation/product DS, plus one **case** and one **behavioural** (STAR from a real project). Weight toward topics studied that week and known weak areas.
2. Provide **model answers** to self-check.
3. **Interactive session:** ask one question at a time, grade the owner's answers, explain.
4. **Headless/scheduled:** write the mock to `job-search/learning/tests/week-N.md`, record the score + weak areas in `progress.md`, commit + push to `main`, and finish with a **push notification** (score + biggest weak area to revisit).

Args (optional): a theme to focus (e.g. `/ds-interview experimentation`).
