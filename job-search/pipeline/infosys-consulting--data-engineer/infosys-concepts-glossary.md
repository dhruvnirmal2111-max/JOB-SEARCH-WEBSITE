# Infosys — Concepts Glossary (be able to *explain* each in 2–3 sentences)

> For a technical round you must not just name a tool — you must explain it and connect it to what you did. This covers the 5 recruiter points. Read it, then say each definition out loud in your own words.

---

## §SQL — advanced scripting (point #1, MUST be strong)

**Window function** — computes across a set of rows *related to the current row* without collapsing them (unlike `GROUP BY`). `func() OVER (PARTITION BY ... ORDER BY ...)`.
- `ROW_NUMBER()` — unique sequential number per partition (ties broken arbitrarily). Use for top-N-per-group and dedupe.
- `RANK()` / `DENSE_RANK()` — ranking with ties; RANK skips numbers after a tie, DENSE_RANK doesn't. "2nd highest salary" → `DENSE_RANK`.
- `LAG(col, n)` / `LEAD(col, n)` — value from n rows before/after. **Month-over-month growth** = `(sales - LAG(sales) OVER (PARTITION BY store ORDER BY month)) / LAG(...)`.
- Running total — `SUM(x) OVER (PARTITION BY k ORDER BY d ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.

**CTE (`WITH`)** — a named temporary result set that makes queries readable and lets you chain steps; recursive CTEs walk hierarchies.

**Patterns to be able to write cold:**
- Top-N per group → `ROW_NUMBER() OVER (PARTITION BY grp ORDER BY metric DESC)` then `WHERE rn <= N`.
- Dedupe keep-latest → same, `ORDER BY updated_at DESC`, keep `rn = 1`.
- Anti-join (rows in A not in B) → `LEFT JOIN ... WHERE b.key IS NULL` or `NOT EXISTS`.
- `GROUP BY` + `HAVING` (filter on aggregates, e.g. `HAVING COUNT(*) > 1` to find dupes).

**Performance:** index the columns you filter/join on; avoid `SELECT *`; filter as early as possible; beware full table scans; read the query plan (`EXPLAIN`). **Full vs incremental load:** full = reload all; incremental = only rows newer than a stored **watermark** (high-water-mark timestamp) — far faster on 6M rows; handle late-arriving rows + dedupe. ← your refresh app.

---

## §Python pipelines (point #2, MUST be strong)

**A good pipeline is:** idempotent (re-run = same result, no double-loads), validated (schema + row/type checks on ingest), observable (logging + alerting on failure), resilient (retries with backoff, checkpointing), and config-driven (no hard-coded paths/secrets).

**pandas essentials:** `groupby().agg()`, `merge`, `pivot_table`, `fillna`/`dropna`, vectorised ops (avoid `iterrows`), `read_csv(chunksize=...)` for big files.

**ETL vs ELT:** ETL transforms *before* loading into the warehouse; ELT loads raw then transforms *inside* the warehouse (modern, cloud-scale). Your SQL-Server work is closer to ETL; Snowflake/Databricks patterns are ELT.

---

## §Databricks / PySpark (point #2 "ideally Databricks")

**Spark** — a distributed compute engine: splits data into **partitions** across a **cluster** so you can process data too big for one machine. You have real proof: VCDI distributed anomaly detection, +~20%.
- **DataFrame API** — like pandas but distributed; you write transformations, Spark runs them in parallel.
- **Lazy evaluation** — *transformations* (`select`, `filter`, `join`, `groupBy`) just build a plan (a DAG); nothing runs until an **action** (`count`, `collect`, `write`, `show`) triggers it. Lets Spark optimise the whole plan.
- **Shuffle** — moving data across the cluster (joins, wide groupBys); expensive, minimise it.
- **`cache()` / `persist()`** — keep a reused DataFrame in memory.
- **Databricks** — managed Spark platform: notebooks, jobs, clusters, and **Delta Lake** = ACID transactions, schema enforcement, and **time travel** (query old versions) on top of files in the lake.
- **pandas vs PySpark:** pandas = fits in memory, one node, quick. PySpark = data exceeds one machine / need distribution. Be honest: recent work is pandas + SQL scale; Spark was VCDI.

---

## §CI/CD + DevOps + GitHub (point #3 — the gap to bridge)

**Version control / Git** — tracks every change; **branching** = isolate work on a feature branch, then merge via a **pull request (PR)** after review. You do this daily. ← real.

**CI — Continuous Integration** — on every push/PR, automatically **build + run tests + lint** so broken code is caught before merge.

**CD — Continuous Delivery/Deployment** — automatically ship the built artifact through environments (dev → staging → prod), often with a manual approval gate before prod.

**A typical pipeline (stages):** `checkout → install deps → lint → unit tests → build (artifact / Docker image) → deploy to staging → (approve) → deploy to prod`.

**GitHub Actions** — GitHub's CI/CD: a **workflow** (YAML in `.github/workflows/`) triggered on events (`push`, `pull_request`, schedule); runs **jobs** made of **steps** on **runners**; secrets live in the repo secret store, never in code.

**How you'd add CI/CD to your refresh app (say this):** "Trigger on PR — lint + unit-test the transform functions; on merge to main, build and deploy to the scheduled runner; gate prod behind a manual approval; keep DB creds in the CI secret store."

**Your real DevOps evidence:** Docker (containerisation — package app + deps so it runs the same anywhere), Terraform (**Infrastructure as Code** — define cloud infra in version-controlled files, reproducible across dev/staging/prod), on the personal Cloud Data Platform.

---

## §MLOps / LLMOps (point #4 — "highly appreciated" bonus)

**MLOps** = DevOps for ML — the lifecycle *after* a model works in a notebook:
- **Model versioning + registry** — track model versions, data, and params (e.g. MLflow) so you can reproduce and roll back.
- **Training vs serving** — train offline; **serve** predictions either **batch** (scheduled scoring — what you do: the classifier runs as a pipeline) or **real-time** (an API endpoint).
- **Drift** — the world changes and the model decays. **Data drift** = input distribution shifts; **concept drift** = the input→output relationship changes. You **monitor** metrics/inputs and **retrain** on a trigger (schedule or performance drop).
- **Reproducibility + CI/CD for models** — automated retrain/test/deploy; feature stores for consistent features.
- **Your honest framing:** "I productionise models as documented, reused batch pipelines and I understand versioning, retraining and drift monitoring; I haven't run a full serving/monitoring stack."

**LLMOps** = the same discipline for LLM apps:
- **Prompt versioning + evaluation** — treat prompts like code; measure output quality (eval sets, LLM-as-judge, human review).
- **RAG (Retrieval-Augmented Generation)** — retrieve relevant documents (vector search over embeddings) and feed them into the prompt so the model answers from your data, reducing hallucination.
- **Embeddings** — text → vectors capturing meaning; power semantic search + RAG. (You're moving your classifier TF-IDF → embeddings — connect it.)
- **Guardrails + human-in-the-loop** — validate/QA outputs before they ship. ← literally what you do (the QA step, the hackathon transcript-analyzer, multi-agent QA).
- **Your strength line:** "I've deployed LLM + multi-agent workflows in production — one won our internal AI hackathon — and I'm deliberate about evaluating outputs before they go out."

---

## §BI / Power BI (point #5, MUST be comfortable)

**Star schema** — a central **fact** table (measures: sales, spend) joined to **dimension** tables (date, product, store); the standard analytics model.

**Power BI pieces:**
- **Power Query** — the ETL/data-prep layer (import, clean, shape) before modelling.
- **Data model** — tables + **relationships** (usually one-to-many dimension→fact).
- **DAX** — the formula language for **measures**, e.g. `Total Spend = SUM(Fact[Amount])`, `YoY = CALCULATE([Total Spend], SAMEPERIODLASTYEAR(Date[Date]))`. Measures compute in the current filter context.
- **Import vs DirectQuery** — Import = data cached in the model (fast, needs refresh); DirectQuery = queries the source live (fresh, slower).
- **Refresh** — scheduled dataset refresh keeps reports current.
- **Tie to you:** 16+ Tableau dashboards in weekly use + a Power BI solution adopted by senior DoT stakeholders. Tableau concepts map 1:1 (calculated fields ≈ DAX, extracts ≈ import, live ≈ DirectQuery).

---

## Fast recall — cover the answers, quiz yourself
1. Difference between `RANK` and `DENSE_RANK`? → tie handling; RANK skips, DENSE_RANK doesn't.
2. Full vs incremental load? → reload all vs only rows past a watermark.
3. What's lazy evaluation in Spark? → transformations build a plan; actions trigger execution.
4. CI vs CD? → CI = auto build+test on push; CD = auto deploy through environments.
5. Data drift vs concept drift? → input distribution shifts vs input→output relationship changes.
6. What is RAG? → retrieve relevant docs via embeddings, feed into the prompt, answer from your data.
7. Fact vs dimension table? → measures vs descriptive attributes to slice by.
8. pandas vs PySpark — when Spark? → data too big for one machine / need distribution.
