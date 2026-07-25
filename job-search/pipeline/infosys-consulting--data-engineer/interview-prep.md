# Infosys Consulting — Interview Prep (Data Engineer)

> **Technical-first interview. Mon 4:00 PM.** No formal JD — so the whole game is: (1) **master your resume** (explain every line, name the tool, know the number), and (2) **connect every one of the recruiter's 5 points to a real example**. Nothing invented. This doc + `concepts-glossary.md` are all you need.

---

## 0. Your one-line positioning (say this early)
> "I'm a data engineer who owns client pipelines end to end — around **6 million** invoice rows refreshed weekly, **20+ automated ETL pipelines** across five enterprise clients. My core is Python and advanced SQL, everything version-controlled in Git, and every pipeline ships with automated validation and a Power BI / Tableau layer on top."

That single sentence already hits 4 of their 5 points (SQL, Python pipelines, Git, BI). Then let them pull threads.

---

## 1. The 5 recruiter points → your example (memorise one strong example each)

| # | They want | Your headline proof | Say it like this |
|---|-----------|---------------------|------------------|
| 1 | **Advanced SQL scripting** | 6M-row weekly pipeline on SQL Server; ~11–12k-rule categorisation; rolling 4-week windows | "Advanced SQL on SQL Server — window functions, CTEs, rolling time windows, and an ~11–12k-rule categorisation engine over ~6M invoice rows a week." |
| 2 | **Python pipelines (ideally in Databricks)** | 20+ ETL pipelines; the 26-client one-click refresh app; ingestion→validation→transform→delivery; **Databricks/PySpark at VCDI** | "I build ingestion-to-delivery pipelines in Python — pandas, batch automation. My distributed pipeline work in **Databricks + PySpark** was at VCDI; day-to-day now is Python + SQL scale." |
| 3 | **DevOps CI/CD, GitHub** | Whole refresh app in **Git** (branching, change history); personal Cloud Platform with **Docker + Terraform + dev/staging/prod** | "Everything's in Git with branching and change history. On my personal cloud build I used Docker and Terraform across dev/staging/prod — so I work the DevOps concepts; formal GitHub Actions CI/CD is where I'm growing." |
| 4 | **MLOps / LLMOps** (bonus) | A$12B ML classifier **productionised + reused across clients**; LLM report generator company-wide; **hackathon-winning** LLM transcript analyzer; multi-agent QA | "I've productionised an ML classifier as a documented, reused pipeline, and deployed LLM/agent workflows in production — one won our internal AI hackathon. I haven't run a formal MLOps serving/monitoring stack, but I understand the pieces." |
| 5 | **BI reporting tool (Power BI)** | 16+ Tableau dashboards used weekly; **Power BI** solution adopted by senior Dept of Transport stakeholders | "16+ Tableau dashboards in weekly use, and a Power BI solution that senior Department of Transport stakeholders adopted." |

**Drill:** cover the right column, read a "they want", say your mapping out loud. Do it until all 5 are automatic.

---

## 2. Resume mastery — every block, what to say, tools to name

Go line by line down `resume-tailored.md`. For each item you must be able to say: **the problem → what you built → the tools → the number.** Interviewers probe depth, so know one level deeper than the bullet.

### Current role — Data Engineer, PI Data Analytics (Comprara), Jun 2024–now
Frame: "A data & analytics consultancy for enterprise clients across AU/NZ. I own pipelines end to end — ingestion, transformation, validation, delivery — 20+ of them, cutting manual reporting ~40% and turnaround ~50%."

**(a) Self-service refresh app — one-click pipelines across 26 client accounts (current)**
- What: pipeline automation behind a company-wide app; each refresh becomes a button press — separate controls for ingestion, validation, downstream processing, and full runs (full **and incremental** refresh), plus auto-archiving.
- Tools: **Python, SQL, Git** (version control, branching, change history); keep DB clean + docs current.
- Number: targeting ~10 hrs saved per person across a 6-person team, ~60 hrs/month.
- **Honesty flag:** this is *current, in-progress*; the 60 hrs/month is a **design target, not yet measured**. Say so.
- Likely probe → *"How do you handle incremental vs full refresh?"* → Full = reload everything (simple, safe, slow). Incremental = only new/changed rows since a watermark (a last-loaded timestamp / high-water mark), much faster on 6M rows; you handle late-arriving data and dedupe. See glossary.

**(b) Automated ingestion + validation pipeline — largest client (6M rows, 5 regions / 13 sub-regions)**
- Was: manual KNIME upload-and-check, ~4–5 hrs/week.
- Built: automated email ingestion (**Microsoft Graph API → remote SQL Server via batch scripts**); automated **validation** (row + hour counts, data-type + column-consistency checks) that drops stray columns, logs discrepancies, emails client + internal teams. Downstream: vendor/spend lookups, multi-language cleaning, ~11–12k-rule categorisation, rolling 4-week spend windows → dashboards.
- Tools: **Python, advanced SQL (SQL Server), batch automation, Azure**.
- Number: ~4–5 hrs → **~75-min automated run** (~3–3.5 hrs saved/week); 13 regions → one consistent pipeline.
- Likely probe → *"What checks make a validation layer trustworthy?"* → counts (row/column), schema/type checks, referential/uniqueness checks, range/null checks, reconciliation vs source totals, and **alerting** so failures surface before they hit a report. This is your data-quality story.

**(c) Categorisation pipeline — ~A$12B enterprise spend**
- Was: manual categorisation, 1–1.5 months per cycle.
- Built: documented, repeatable **Python** pipeline — **scikit-learn, TF-IDF, one-vs-all classifier**, feature engineering on spend value + line count; productionised for reuse.
- Number: cycle → **a single day's run**, rolled out across other accounts.
- This is your bridge into **#4 MLOps** — a real model, productionised and reused. (Deeper ML details live in the 7-Eleven `concepts-glossary.md`; skim if they go deep on the model.)

**(d) Reporting & BI** → 16+ **Tableau** dashboards + a **Power BI** solution for procurement/finance stakeholders. (Point #5.)

### VCDI internship — Data Engineer Intern, Aug–Nov 2023
- **Databricks + PySpark** distributed anomaly-detection pipeline; scalable transformation layers; delivered via **Power BI**; **+~20%** detection accuracy; adopted by senior DoT stakeholders.
- This is your **only real Databricks/PySpark proof** — know it cold (point #2's "ideally Databricks"). Be ready for the glossary's PySpark questions.

### Projects
- **Cloud Data Platform (personal):** **Terraform (IaC)** provisioning AWS (S3, IAM, EC2, networking); automated ingestion from external APIs → **Snowflake**; **Docker** for modular, version-controlled **dev/staging/prod**. → This is your best **DevOps/#3** evidence beyond Git. Multi-environment + IaC + containers = the DevOps mindset.
- **Facit (personal):** pipeline unifying POS, wages, 14 suppliers' invoices → one model behind a weekly analytics product; live with a St Kilda café.

### Education: MDS Monash (2022–23), BE Thapar (2017–21).

---

## 3. The two honest gaps — bridge, don't bluff

**Gap A — DevOps CI/CD / GitHub Actions (point #3).**
- **What's real:** Git version control, branching, change history on production work; Docker + Terraform + dev/staging/prod on the personal build.
- **The honest line:** *"I use Git daily for version control and branching, and I've worked containers and infrastructure-as-code across multiple environments. I haven't owned a full GitHub Actions CI/CD pipeline in production, but I understand the shape — on every push, run linting and tests, build the artifact/image, then deploy through environments with approvals — and I'm keen to own that."*
- **Then prove you get it:** be able to explain a CI/CD pipeline's stages (glossary §CI/CD). If they ask "how would you add CI/CD to your refresh app?" → "Trigger on push/PR: run unit tests on the transform functions + a lint step; on merge to main, build and deploy the pipeline to the scheduled runner; gate prod behind a manual approval; keep secrets in the CI secret store, not code."

**Gap B — MLOps / LLMOps (point #4, bonus).**
- **What's real:** productionised ML classifier (documented, retrained, reused across clients); TF-IDF→embeddings improvement; hyperparameter tuning (GridSearchCV); LLM report generator company-wide (~25–30 accounts); **hackathon-winning** LLM transcript analyzer (agent scores engagements on quality/expectations/tone → notifies stakeholders); multi-agent data-QA workflow; deliberate about **evaluating LLM outputs before they ship**.
- **The honest boundary:** *"I've deployed models and LLM workflows as productionised pipelines teams rely on. I haven't run a formal MLOps stack — model registry, feature store, real-time serving, automated drift monitoring — but I understand the lifecycle: versioning, retraining triggers, monitoring for drift, and evaluation. For LLMs I'm careful about eval and a human-in-the-loop QA step."*
- This is "highly appreciated," not required — so lean in with the real AI work, be crisp about the boundary, and don't oversell.

---

## 4. Technical Q&A you should expect (it's a technical round)

**SQL — expect a live question.** Know cold (drill in glossary):
- Window functions: `ROW_NUMBER / RANK / DENSE_RANK`, `LAG / LEAD`, running totals `SUM() OVER (... ORDER BY ...)`.
- CTEs (incl. recursive), joins (incl. self/anti-join), `GROUP BY` + `HAVING`, `QUALIFY`.
- Classic prompts: *"2nd highest salary per department"* (`DENSE_RANK`), *"month-over-month growth"* (`LAG`), *"top-N per group"* (`ROW_NUMBER`), *"remove duplicates keeping latest"* (`ROW_NUMBER` + filter), *"running total"*.
- **Optimisation:** indexing, avoiding `SELECT *`, filtering early, partition pruning, why a query is slow (full scan vs index seek), `EXPLAIN`/query plan.

**Python pipelines.**
- pandas: groupby-agg, merge/join, pivot, null handling, vectorisation over loops, chunking large files.
- Pipeline design: idempotency (re-running doesn't double-load), error handling + retries, logging, config-driven, watermark for incremental loads, schema validation on ingest.
- *"How do you make a pipeline reliable?"* → idempotent writes, validation gates, alerting on failure, retries with backoff, checkpointing, version control.

**Databricks / PySpark.** (glossary §PySpark)
- Spark = distributed compute across a cluster for data too big for one machine; DataFrame API; **lazy evaluation** (transformations build a plan, actions trigger it); partitions; shuffles are expensive; `cache()` for reuse; Delta Lake (ACID on the lake, time travel).
- *"pandas vs PySpark — when?"* → pandas: fits in memory, single node, fast to write. Spark: data exceeds one machine, need distributed/parallel. Be honest: recent work is pandas/SQL scale; Spark work was VCDI.

**DevOps / CI/CD.** (glossary §CI/CD) — see Gap A. Know: what CI vs CD is, pipeline stages (lint→test→build→deploy), GitHub Actions basics (workflow triggers on push/PR, jobs, runners, secrets), branching strategy (feature branches → PR → main), why you'd want automated tests before deploy.

**MLOps / LLMOps.** (glossary §MLOps/§LLMOps) — see Gap B. Know: model versioning, training vs serving, batch vs real-time inference, **drift** (data drift vs concept drift) and how you'd monitor it, retraining triggers, model registry, and for LLMs: prompt/versioning, RAG, evaluation, hallucination guardrails, human-in-the-loop.

**BI / Power BI.** (glossary §BI) — data model (star schema, fact/dimension), Power Query (ETL), DAX measures (e.g. a `SUM`/`CALCULATE` measure), relationships, import vs DirectQuery, refresh scheduling. Tie to your DoT Power BI + 16+ Tableau dashboards.

---

## 5. "Tell me about yourself" (60–90 sec, technical-round version)
> "I'm a data engineer at a data & analytics consultancy in Melbourne — my actual title is Data Engineer. I own client data pipelines end to end: I ingest, transform, validate and deliver. My biggest is a ~6-million-row weekly pipeline for our largest client that I took from a 4–5 hour manual process to a ~75-minute automated run, all in Python and advanced SQL on SQL Server, version-controlled in Git. I've built 20+ ETL pipelines, an ML classifier over ~A$12B of spend that cut a month of manual work to a day, and I ship a Power BI or Tableau layer on top. Before this I did distributed pipeline work in Databricks and PySpark at the Victorian Centre for Data Insights. I'm most excited about consulting delivery — solving a different data problem for a different client each time."

---

## 6. Smart questions to ask (pick 3–4)
- "For this role, how much is Databricks-first vs SQL-Server / cloud-native pipelines? What does the delivery stack look like?"
- "How mature is the CI/CD and MLOps tooling on client engagements — is that something the data engineers own, or a separate platform team?"
- "What does a typical client engagement look like — greenfield builds, or modernising existing pipelines?"
- "Where does the team want to grow its LLM/AI-ops capability?"
- "What would a strong first 90 days look like in this role?"

---

## 7. Night-before / same-day checklist
- Re-read §1 (the 5-point table) and §2 (resume mastery) — say each mapping aloud.
- Have the two gap lines (§3) word-perfect. They're your composure under pressure.
- One SQL warm-up: write a `LAG` MoM query and a `ROW_NUMBER` top-N query from scratch.
- Logistics: confirm link/location + time (4:00 PM Mon), resume copy open, water, quiet space. No written confirmation yet — **chase the recruiter Sat/Sun for the confirmation + joining details.**
- Mindset: it's a technical round, so **think out loud, start simple, name your tools, and be honest about the two gaps** — a clear "here's what I've done, here's what I'd learn" beats a bluff every time.
