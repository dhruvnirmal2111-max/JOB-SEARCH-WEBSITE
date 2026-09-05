# Infosys DE Mock — Questions, Ideal Answers & Debrief

> From the full technical panel sim (Anand = senior data engineer; Meera = engagement manager). Model answers below; debrief at the end. Pattern: **claim → one concrete detail → number or trade-off.**

---

### Q1. Your DE experience, stack, and scale
> "I'm a data engineer at a data & analytics consultancy in Melbourne, two-plus years. I own the **end-to-end pipelines for five enterprise clients** — ingestion, validation, transformation, load — 20+ automated ETL pipelines in total, mostly **Python and advanced SQL** on SQL Server, all in **Git**. My biggest single pipeline runs our largest client — ~**6 million invoice rows weekly** — where I took a **4–5 hour manual process to a ~75-minute automated run**. Right now I'm leading a **company-wide app** that turns every client's refresh into one click — ingestion, validation, downstream, full or incremental — across all **26 accounts**, on track to **save ~60 hours a month**, with a Power BI/Tableau layer on top. I've leaned on AI to scaffold the repetitive parts, which cut build time from ~25 hours on the first pipeline to ~10–12 on the next."

### Q2. Most recent order per customer (one row) + make it efficient at scale
```sql
WITH ranked AS (
  SELECT customer_id, order_id, order_date, amount,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
  FROM orders
)
SELECT customer_id, order_id, order_date, amount
FROM ranked
WHERE rn = 1;
```
> "CTE with `ROW_NUMBER`, partition by customer, order by date descending, keep `rn = 1`. ROW_NUMBER not RANK/DENSE_RANK — I want exactly one row even on a tie. **For efficiency:** select only needed columns, a **composite index on `(customer_id, order_date)`** since that's what I partition and order by, filter early, and if the table's partitioned by date, filtering the date prunes partitions. General rule: do less work, on fewer rows, and keep predicates sargable so indexes are used."

### Q3. Spark level + pandas vs PySpark rule + what's a shuffle
> "My Spark is from the VCDI internship — a PySpark anomaly-detection pipeline flagging unusual supplier payments — and I keep it warm; my recent work is pandas/SQL scale, but I ramp fast. **The rule is memory:** pandas when the data fits on one machine and I want quick results with no cluster overhead; PySpark once it outgrows a single machine and I need to distribute across a cluster. **A shuffle** is when Spark has to move data across the cluster to complete an operation — e.g. a group-by on a customer whose rows are spread across partitions; Spark shuffles those rows together. It's the expensive operation, so I minimise wide ops and shuffle-heavy joins."

### Q4. Git day-to-day + what CI/CD you've built vs understand (honest)
> "Git's core to how I work — branches, PRs, reviews, merge conflicts, rebasing, on both work pipelines and personal projects. Where I've got **hands-on CI/CD** is on my SaaS, MyFacit: a **GitHub Actions** workflow with an **end-to-end test runner that fires on every push/merge** — nothing ships unless the suite passes. I scaffolded the workflow with AI tooling and understand the flow — triggers on push/PR, jobs on a runner, a failure blocks the merge, config in a YAML file — even if I haven't hand-written every line. At work the new app follows the same pattern. So I've got real exposure to the CI loop and the concepts; a mature multi-environment CD pipeline is where I want to go deeper."
*(Honest boundary — do NOT claim hand-built work CI/CD you can't walk through.)*

### Q5. Duplicate file / crash re-run — idempotency
> "My pipelines are **idempotent**. For a duplicate file: I key on a **date cutoff** — I replace all data on/after the minimum date in the incoming file, so re-running the same file lands the exact same state, no double-counting. For a crash halfway: I'm **alerted at each step** via Microsoft Graph API (a missing file, a failed validation, a load error), and every run's success/failure is **logged to a table**. Because the load is idempotent, I just re-run safely from the start — no partial-state corruption."

### Q6. BI + getting a client to trust/use it
> "I've used **Tableau and Power BI**. To get a non-technical client to trust it, I anchor on an example they know — on the hospitality account I walked them through **mozzarella cheese**: raw invoice, quantity, unit price, then step by step how I calculated the unit-price creep, adjusted for pack size, and how the dashboard shows that same number moving across venues and suppliers. Walking one familiar example end to end is what makes them trust the numbers enough to act."

### Q7. Juggling competing deadlines (behavioural)
> "I weigh complexity, effort, urgency, client flexibility, and impact. Rule of thumb: knock out the small, urgent things first for momentum, protect the big deliverable. One week I had a product-catalogue build (big), a bill-of-materials analysis (small), a tender evaluation (small but urgent), and an internal teammate deliverable. I did the **tender evaluation first** (urgent + short), then the BOM, **delegated the teammate task**, and finished the big catalogue in the final stretch. Everything landed."

### Good questions to ask THEM
- "Is the pipeline work Databricks-first, or a mix of client stacks?"
- "How mature is the CI/CD and MLOps tooling on engagements — do DEs own it, or a platform team?"
- "What does a typical engagement look like — greenfield builds or modernising existing pipelines?"
- "What separates a great data engineer on your team from a good one?"

---

## Debrief (score ~8/10 — confident pass)

**Strengths:** SQL (windows + efficiency), **pipeline reliability/idempotency** (your wheelhouse — you nailed the date-cutoff idempotency you'd missed before), and **perfectly-pitched honest bridges** on Databricks and CI/CD (no overclaiming, showed concepts + fast-learner). Strong consulting fit (prioritisation + delegation).

**Fix before Monday:**
1. **Delivery** — the only weak spot. Slow the **first 20 seconds**, clean sentences, don't push through a garbled one. Rehearse the intro aloud 3×.
2. **Quantify the flagship** in the intro (4–5h → 75-min run; ~60 hrs/month).
3. **Composite index** `(customer_id, order_date)` — say it right if indexing comes up.
4. **Hold the honest line** on Databricks + CI/CD under nerves — don't inflate.

**Bottom line:** content and instincts are hire-level. Highest-leverage fix = **slow down and tighten delivery**. Do that and you're impressive, not just passing.
