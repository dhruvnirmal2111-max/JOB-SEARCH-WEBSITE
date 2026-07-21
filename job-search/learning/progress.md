# Learning Progress Tracker

> The board for the learning loop. Each topic + status + last-touched date. **Weak areas resurface** (spaced repetition). Updated by `/learn` (daily) and `/ds-interview` (weekly).
> Status: `not-started → learning → tested → mastered`. Confidence: 🔴 shaky · 🟡 okay · 🟢 solid.
> Direction (updated 2026-07-21): primary long-term = **AI Engineer (applied LLM / agentic AI)**; DS foundations kept for interview-readiness + the near-term DA/DS bridge. See `roadmap.md` Parts 1-3 and `goals.md`.

## Snapshot
- Current module: **M1 — Statistics & Probability** (finishing Part 1 foundation before weaving in the AI-engineering core)
- Direction note: roadmap re-sequenced 2026-07-21 toward **AI Engineering**. Modules renumbered — see mapping notes below.
- Streak: 3 days · Lessons completed: 4 · Mock interviews: 0
- Weak areas to revisit: _(none yet)_
- Next up: **M1.5 — Bayes' theorem & Bayesian vs frequentist thinking** (last stats pillar), then start weaving in **M9 — Modern NLP & LLM Foundations** (Part 2, the AI-engineering core).
- Last lesson: 2026-07-21 — Common tests: t-test, chi-square & ANOVA (`lessons/2026-07-21-m1.4-common-tests.md`)

## Topic status

| Module | Topic | Status | Confidence | Last touched | Notes |
|--------|-------|--------|-----------|--------------|-------|
| **Part 1 — Foundations** | | | | | |
| M1 | Stats & probability | learning | 🟡 | 2026-07-21 | done: distributions+CLT, sampling/SE/CI, hypothesis testing, common tests (t/chi-sq/ANOVA + when to use); next: Bayes, then correlation/causation |
| M2 | ML fundamentals | not-started | 🔴 | — | real gap; classical ML used at work is narrow (logistic regression, P6) — needs the fuller toolkit |
| M3 | Model evaluation & validation | not-started | 🟡 | — | strong from real work (P6: CV, class imbalance, hyperparameter tuning) — formalise the theory |
| M4 | Feature engineering | not-started | 🟡 | — | done in practice (P6, P7); theory pass, esp. TF-IDF→embeddings bridge into Part 2 |
| M5 | SQL for analytics/DS | not-started | 🟢 | — | strong; polish window fns/cohorts only |
| M6 | Python for DS/engineering | not-started | 🟡 | — | pandas/sklearn strong from daily use; internals/gotchas + packaging depth needed for Part 3 |
| M7 | Experimentation & product DS *(optional)* | not-started | 🔴 | — | real gap (EA/Linktree/AGL-style roles) but deprioritised — AI Engineer track, revisit opportunistically |
| M8 | Time-series & forecasting *(optional)* | not-started | 🟡 | — | Prophet done in practice (P7); ARIMA/theory — deprioritised, revisit opportunistically |
| **Part 2 — AI Engineering core (the destination)** | | | | | |
| M9 | Modern NLP & LLM foundations | not-started | 🟡 | — | TF-IDF/embeddings used in practice (P6, P4/P5); transformers/attention theory + tokenization/context-window depth needed — formalise, not from-zero |
| M10 | RAG & semantic search | not-started | 🔴 | — | true gap — no hands-on vector-DB/RAG build yet; high priority |
| M11 | Agents & orchestration | not-started | 🟡 | — | **real practical experience already** — Job Hunt OS (P15), multi-agent QA (P4), agentic report gen (P5, P8) — formalise theory (ReAct, memory, MCP, frameworks), don't start from scratch |
| M12 | LLM evaluation, observability & guardrails | not-started | 🔴 | — | true gap — has done informal AI-output QA (P17) but no formal evals/tracing/LLM-as-judge exposure |
| M13 | Prompt & context engineering + structured outputs | not-started | 🟡 | — | prompt/agent design used daily at work (P2, P4, P5, P8, P9) — formalise structured-output patterns (JSON schema, Pydantic/Instructor) |
| **Part 3 — Engineering & production (true gap)** | | | | | |
| M14 | Software engineering for AI (APIs, CI/CD, testing, Docker) | not-started | 🔴 | — | the real gap vs pure software engineers — no FastAPI/CI-CD/Docker/test-suite experience yet |
| M15 | MLOps & deployment | not-started | 🔴 | — | true gap — no MLflow/monitoring/cloud-deploy experience yet; some Terraform/Docker exposure (P13) to build from |
| **Rolling** | | | | | |
| M16 | Current trends | rolling | — | — | weekly touch — bias toward agentic/RAG/LLM-tooling news now |
| M17 | Interview & global readiness | not-started | 🟡 | — | reinforced weekly; reframe toward AI-system-design + coding + case + behavioural |

## Weekly mock-interview log
| Week | Date | Topics covered | Score / weak areas |
|------|------|----------------|--------------------|
| — | — | — | — |

## How this file drives the loop
- `/learn` reads this, picks the next `not-started` topic in the roadmap order (or a weak area due for review), teaches it, then flips its status to `learning` and stamps the date.
- `/ds-interview` tests across studied topics, records the score + weak areas here, and flips solid topics to `tested`/`mastered`.
