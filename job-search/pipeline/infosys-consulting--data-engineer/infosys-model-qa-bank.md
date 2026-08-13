# Infosys DE — Model Q&A Bank (the full interview surface)

> A broad bank of likely questions with tight, ready model answers **in your voice**, grounded in your real work and honest about what's hands-on vs conceptual. Companion to `infosys-mock-qa-and-debrief.md` (the 7-question sim) — this is the fuller coverage. Pattern in every answer: **claim → one concrete detail → a number or a trade-off, then stop.**
>
> Ground truths to keep straight all interview: current role = **SQL Server + Python + Azure ingestion**, ~6M invoice rows/week, idempotent via **date-cutoff replace**; **Databricks/PySpark = VCDI internship** (not current); **Snowflake/Terraform/AWS = personal build**; the **26-client app** is current, in-progress, ~60 hrs/month is a *projected* target.

---

## §1 — INTRO & MOTIVATION

**Q. Tell me about yourself.**
> "I'm a data engineer at a data and analytics consultancy in Melbourne, two-plus years. I own end-to-end pipelines for five enterprise clients — ingestion, validation, transformation, delivery — 20+ automated ETL pipelines, mostly Python and advanced SQL on SQL Server, all in Git. My flagship is our largest client: ~6 million invoice rows weekly across 5 regions, where I took a 4-to-5-hour manual KNIME process down to a ~75-minute automated run. Right now I'm leading a company-wide app that turns every client's refresh into one click across all 26 accounts, on track to save ~60 hours a month. Before this I did a distributed PySpark pipeline on Databricks in an internship. I want to go deeper on modern data platforms in a consulting setting, which is exactly this role."

**Q. Why Infosys / why consulting?**
> "I already work in consulting, so I know the rhythm — multiple clients, ambiguous briefs, owning delivery end to end and presenting to senior stakeholders. Infosys gives me that at much bigger scale and on a modern platform stack — Databricks, cloud-native pipelines — which is where I want my engineering to grow. I like that the work is varied and outcome-driven rather than one product forever."

**Q. Where do you want to grow / what's your gap?**
> "My daily scale is SQL Server and Python; my distributed-compute hands-on is the internship. So the honest growth edge is production Databricks and mature CI/CD and MLOps. I've done the homework on the concepts and I ramp fast — I stood up a Terraform/AWS/Snowflake stack solo on a personal build — so I'm looking for a team where I apply that at scale."

---

## §2 — SQL (expect several — this is your strength, be crisp)

**Q. Most recent order per customer, one row.**
```sql
WITH ranked AS (
  SELECT customer_id, order_id, order_date, amount,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
  FROM orders
)
SELECT customer_id, order_id, order_date, amount FROM ranked WHERE rn = 1;
```
> "CTE with `ROW_NUMBER`, partition by customer, order by date descending, keep `rn = 1`. ROW_NUMBER not RANK, because I want exactly one row even on a tie."

**Q. ROW_NUMBER vs RANK vs DENSE_RANK?**
> "All number rows within a partition. ROW_NUMBER is always unique — ties broken arbitrarily. RANK gives ties the same number then skips (1,1,3). DENSE_RANK gives ties the same number and doesn't skip (1,1,2). ROW_NUMBER for dedupe/top-1; RANK/DENSE_RANK when ties should share a position."

**Q. WHERE vs HAVING?**
> "WHERE filters rows before aggregation; HAVING filters groups after. You can't put an aggregate in WHERE — `HAVING SUM(x) > 100` is the one that filters on the aggregate."

**Q. Make a slow query fast — what do you check?**
> "Do less work on fewer rows. Select only needed columns; filter early; keep predicates **sargable** so indexes are usable — no functions wrapped around the indexed column. Add the right index — often a **composite index** on the columns I filter and join on, in that order. Check the execution plan for scans that should be seeks. And if the table's partitioned by date, filtering the date prunes partitions."

**Q. What's a sargable predicate?**
> "One the engine can satisfy with an index seek. `WHERE order_date >= '2026-01-01'` is sargable; `WHERE YEAR(order_date) = 2026` isn't — wrapping the column in a function forces a scan. I rewrite to a range instead."

**Q. INNER vs LEFT join, and a gotcha?**
> "INNER keeps only matching rows; LEFT keeps all left rows, NULLs where no match. The classic gotcha: put a filter on the right table in the WHERE clause of a LEFT join and it silently becomes an INNER join — the filter has to go in the ON clause to preserve the outer rows."

**Q. Month-over-month growth in SQL?**
```sql
SELECT month, sales,
  (sales - LAG(sales) OVER (PARTITION BY store ORDER BY month))
   / LAG(sales) OVER (PARTITION BY store ORDER BY month) AS mom_growth
FROM monthly_sales;
```
> "`LAG` to get the previous month's value in the same row, then the growth formula. LEAD is the same forward."

**Q. Logical order of SQL execution?**
> "FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. It's why you can't reference a SELECT alias in WHERE — WHERE runs before SELECT — but you can in ORDER BY."

---

## §3 — PYTHON / PANDAS

**Q. When pandas vs PySpark?**
> "Memory. Pandas when the data fits on one machine and I want fast iteration with no cluster overhead — that's my ~6M-row weekly loads today. PySpark once it outgrows a single machine and I need to distribute — that was my VCDI pipeline."

**Q. A common pandas performance mistake?**
> "Looping row by row with `iterrows` or `apply` when a **vectorised** operation would do it. Pandas/numpy push loops into fast C under the hood, so `df['a'] * df['b']` beats a Python loop by a lot. Also chained indexing that triggers the SettingWithCopy warning — I use `.loc` to assign cleanly."

**Q. How do you make Python data code reliable/reproducible?**
> "Version everything in Git; pin dependencies; parameterise instead of hardcoding; log each step and its row counts; and make the whole thing idempotent so a re-run is safe. On my pipelines every run's success/failure is logged to a table and alerts fire on failure via Graph API."

---

## §4 — PIPELINE & ETL DESIGN (your core — sell it)

**Q. Walk me through a pipeline you built end to end.**
> "My largest client ran on a manual KNIME upload-and-check, ~4–5 hours weekly over ~6 million invoice rows across 5 regions and 13 sub-regions. I replaced it: automated email-based ingestion via Microsoft Graph API into a remote SQL Server through batch scripts; then automated validation — row and hour counts, data-type and column-consistency checks — that drops stray columns, logs discrepancies and emails both client and internal teams. Downstream: vendor and spend lookups, multi-language cleaning, an ~11–12k-rule categorisation, and rolling 4-week spend windows into dashboards. Result: ~75-minute automated run, ~3–3.5 hours saved every week, and one consistent intake across all 13 regions."

**Q. ETL vs ELT?**
> "ETL transforms before loading into the target; ELT loads raw first and transforms inside the warehouse/lakehouse, which suits cloud-scale compute. My SQL Server work is closer to ETL; the Databricks/Snowflake pattern is ELT — land raw in bronze, transform in-platform."

**Q. Full refresh vs incremental — when and how?**
> "Full refresh reloads everything — simple, but wasteful at scale. Incremental only processes new/changed data — faster and cheaper, but you must handle late-arriving and updated records. My app does both; incremental keys on a watermark. In Delta the incremental version is a `MERGE` on the business key."

**Q. How do you make a pipeline idempotent? (they WILL ask)**
> "So re-running produces the same state, never duplicates. I key on a **date cutoff** — I delete everything on or after the minimum date in the incoming file, then load, so re-running the same file lands identical data. In Delta that's a `MERGE` on the key or `replaceWhere` on the partition. Idempotency is what makes crash-recovery safe — I just re-run from the start."

**Q. A pipeline crashes halfway — what happens?**
> "I'm alerted at each step via Graph API — a missing file, a failed validation, a load error — and every run's outcome is logged to a table. Because the load is idempotent, I re-run safely from the start with no partial-state corruption. On Delta I'd get that atomicity for free from the transaction log."

**Q. A duplicate / re-delivered file arrives?**
> "No problem — the load is idempotent. The date-cutoff replace (or a Delta MERGE) means the second delivery lands the exact same state, no double-counting."

**Q. How do you handle schema changes from a source?**
> "Detect first — my validation checks column consistency and data types and flags a mismatch instead of silently loading it. Then decide: reject and alert if it's an error, or evolve the schema deliberately if it's an intended new field. Delta formalises this — schema enforcement rejects surprises, `mergeSchema` lets me add columns on purpose."

---

## §5 — DATABRICKS / SPARK / DELTA (the graded section — see the deep-dive & grill docs)

**Q. How much Databricks have you actually done? (opener — be honest)**
> "Hands-on is my VCDI internship: a distributed anomaly-detection pipeline on Databricks with PySpark over government procurement data too big for one machine, delivered through Power BI, ~20% better detection. My current role is SQL Server and Python at ~6M rows/week, not Spark. So I know the distributed model and the Delta levers, and everything I do daily maps straight onto them — I'd ramp fast."

**Q. What's a shuffle?**
> "Spark moving data across the cluster between executors to complete a wide operation — a join, groupBy, distinct. It's network and disk heavy, so it's usually the bottleneck. I minimise it: filter early, and broadcast the small side of a join so the big table isn't shuffled."

**Q. Transformations vs actions?**
> "Transformations — filter, select, join — are lazy: they build a plan and run nothing. An action — count, write, show — triggers execution. Lazy evaluation lets Spark optimise the whole plan before running, pushing filters down and pruning columns."

**Q. What is Delta Lake and why not plain Parquet?**
> "Delta is Parquet plus a transaction log. Parquet is just files — no transactions, no upserts, no schema enforcement, no history. The log gives Delta ACID transactions, `MERGE` upserts, time travel, and schema enforcement. So you get warehouse reliability on cheap lake storage."

**Q. How would you do incremental loading in Delta?**
> "`MERGE` on the business key — update matched rows, insert new ones, atomically and idempotently, so re-running a batch is safe. For whole-partition replacement I'd use `replaceWhere` instead."

**Q. A Spark job is suddenly slow — how do you debug it?**
> "Spark UI, find the slow stage. One long task among short ones is usually data **skew** — one key dominates; I'd salt it or lean on AQE. A huge shuffle read means an un-broadcast join or a filter applied too late. Lots of tiny tasks means the small-files problem — fix with OPTIMIZE. I work down from the shuffles."

**Q. What's the medallion architecture?**
> "Bronze/Silver/Gold. Bronze is raw ingested data kept for audit. Silver is cleaned, validated, deduplicated. Gold is business-level aggregates ready for BI. My current pipeline already follows that shape without the label — raw intake, a validated middle, gold aggregates into Power BI."

---

## §6 — DATA QUALITY, GOVERNANCE & LINEAGE

**Q. How do you ensure data quality in a pipeline?**
> "Validate at the boundary, early. On mine: row and hour counts against expectations, data-type checks, column-consistency checks that drop stray columns, and discrepancy logging that emails client and internal teams. Bad data gets caught and flagged, not shipped. On Databricks that same layer becomes Delta constraints or DLT expectations."

**Q. What is data governance?**
> "The rules, roles and processes for managing data — access control, quality, compliance and cataloguing — so the organisation can trust and safely use its data. In a consultancy it's critical because we hold many clients' data and each must be fully isolated. Today I do it manually — permissioned databases, current documentation, clean data; Unity Catalog is the platform that automates it: central permissions, audit logs, and discovery via the catalog.schema.table namespace."

**Q. What is data lineage and why does it matter?**
> "The traced flow of data from source through every transformation to the final report. Two uses: **backward** for root-cause when a dashboard number looks wrong — I trace it to the exact transformation; and **forward** for impact analysis before I change or retire a source, so I know what breaks downstream. It's also the audit answer — proving where a figure came from. Unity Catalog captures table- and column-level lineage automatically."

**Q. How do you keep 26 clients' data isolated?**
> "Access control and separation — each client's data permissioned so no client can see another's, service accounts scoped to their own datasets, and clean naming so there's no accidental cross-join. On Unity Catalog that's per-catalog permissions plus row filters; on my current stack it's database-level permissions and disciplined structure."

---

## §7 — CLOUD & ORCHESTRATION

**Q. What cloud have you used?**
> "At work, Azure — Microsoft Graph API for the email-based ingestion into SQL Server. On a personal build I stood up a full stack solo: Terraform to provision AWS (S3, IAM, EC2, networking), an ingestion pipeline from external APIs into Snowflake, and Docker for a multi-environment dev/staging/prod setup. So the work cloud is Azure ingestion; the deeper hands-on infra is AWS/Snowflake from the personal project — I'm clear about which is which."

**Q. How do you schedule/orchestrate your pipelines?**
> "Today it's batch scripts on Windows Task Scheduler with logging and failure alerts. The managed equivalent I'd move to is Databricks Workflows or Airflow — task dependencies, retries, alerts, all observable in one place. The 26-client app is the step toward self-service orchestration."

**Q. Do you have CI/CD experience? (be honest — this is a known probe)**
> "Git is core to how I work — branches, PRs, reviews, merge conflicts. My hands-on CI/CD is on my SaaS, MyFacit: a GitHub Actions workflow with an end-to-end test runner that fires on every push, so nothing ships unless the suite passes. I scaffolded it with AI tooling and understand the flow — triggers, jobs on a runner, a failure blocks the merge, config in YAML — even if I haven't hand-written every line. A mature multi-environment CD pipeline is where I want to go deeper."
*(Honest boundary — do NOT claim hand-built work CI/CD you can't walk through.)*

**Q. What's Docker / why containers?**
> "A container packages an app with its dependencies so it runs the same everywhere — kills 'works on my machine.' I used Docker on the personal build for a consistent multi-environment setup. In data engineering it's how you ship a pipeline or model as a reproducible, deployable service."

---

## §8 — BEHAVIOURAL / SITUATIONAL (STAR — keep them tight)

**Q. Juggling competing deadlines.**
> "I weigh complexity, urgency, client flexibility and impact — knock out the small urgent things first for momentum, protect the big deliverable. One week I had a big product-catalogue build, a small BOM analysis, an urgent tender evaluation, and a teammate deliverable. I did the tender first (urgent, short), then the BOM, delegated the teammate task, and finished the catalogue in the final stretch. Everything landed."

**Q. Most challenging project.**
> "We nearly lost a five-year government client — before their end-of-financial-year panel they said our ~A$12B, ~20-million-row spend categorisation wasn't good enough. I was brought in to fix it fast: Pareto to manually verify the high-value head as a training set, then a one-vs-all text classifier over ~100 categories for the tail, cleaned messy invoice text hard, aimed for high precision with a 0.75 threshold and manual review below it. The panel signed off and they re-signed the contract."

**Q. A time you got something wrong / handled failure.**
> "Early on I shipped a refresh where a source had quietly changed a column and my validation wasn't catching that case, so a downstream number was off. I caught it, fixed the immediate report, then hardened the validation to check column consistency and alert on mismatch — which is now standard across my pipelines. It's why my validation layer is as strict as it is."

**Q. Explaining something technical to a non-technical stakeholder.**
> "I anchor on an example they know. On the hospitality account I walked a client through **mozzarella cheese** — raw invoice, quantity, unit price, then step by step how I calculated the unit-price creep, adjusted for pack size, and how the dashboard shows that same number moving across venues and suppliers. Walking one familiar example end to end is what makes them trust the numbers enough to act."

**Q. Working with an ambiguous brief.**
> "That's most consulting work. The A$2M-savings project started as 'we know there's savings, we don't know where.' I structured it myself: built the spend catalogue first, then tracked unit price like-for-like at SKU level year over year, benchmarked against market to separate a bad deal from a real cost rise, and surfaced it by category/venue/supplier. Turning a vague ask into a structured deliverable is the skill."

---

## §9 — QUESTIONS TO ASK THEM (ask 2–3; shows seniority)

- "Is the pipeline work Databricks-first, or a mix of client stacks?"
- "How mature is the CI/CD and MLOps tooling on engagements — do DEs own it, or a platform team?"
- "Are engagements mostly greenfield builds or modernising existing pipelines?"
- "How is data governance handled across client engagements — Unity Catalog, or client-specific?"
- "What separates a great data engineer on your team from a good one?"
- "What would a strong first six months in this role look like?"

---

### The three things that decide this interview
1. **Be crisp and honest on Databricks** — real VCDI proof + "maps onto my daily work" + fast learner. Never claim the current role runs on Databricks.
2. **Lead with reliability** — idempotency, validation, incremental refresh. It's your genuine edge and every answer can bend back to it.
3. **Delivery** — slow the first 20 seconds of each answer, one clean sentence per beat, land the last line and stop. Content is hire-level; pace is the only risk.
