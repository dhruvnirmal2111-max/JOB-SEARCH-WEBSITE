# Infosys DE — Databricks Deep-Dive Study Doc

> Read this to actually *understand* Databricks, not just memorise lines. It builds from the engine up: **Spark → PySpark code → Delta Lake → ingestion → orchestration → tuning → governance**, then a full worked build of *your* 6-million-row invoice pipeline on Databricks so every concept lands on real work. Use the companion `infosys-databricks-grill.md` for the compressed interview answers; use this to build the mental model underneath them.
>
> How to study it: read §1–§4 for the model, §5 for the code fluency, §6 for the worked pipeline (this is the one that makes it click), skim §7–§9. Then ask me to grill.

---

## §1 — WHAT DATABRICKS ACTUALLY IS (the 2-minute mental model)

Databricks is a **managed platform built on Apache Spark**, plus a storage format (**Delta Lake**) and a governance layer (**Unity Catalog**). Think of it as three stacked ideas:

```
┌─────────────────────────────────────────────────────────┐
│  DATABRICKS PLATFORM                                      │
│  notebooks · Workflows(jobs) · Unity Catalog · Repos(Git) │  ← the managed workspace
├─────────────────────────────────────────────────────────┤
│  DELTA LAKE                                               │
│  ACID · MERGE · time travel · schema · OPTIMIZE/Z-ORDER   │  ← the table format (on Parquet)
├─────────────────────────────────────────────────────────┤
│  APACHE SPARK                                             │
│  distributed compute: driver + executors over partitions  │  ← the engine
├─────────────────────────────────────────────────────────┤
│  CLOUD STORAGE (S3 / ADLS / GCS)  —  cheap object storage │  ← where files actually live
└─────────────────────────────────────────────────────────┘
```

- **Spark** is the engine that does distributed computation.
- **Delta Lake** is the table format that makes a pile of files behave like a reliable database (transactions, upserts, history).
- **Databricks** is the managed product around both: notebooks to write code, clusters to run it, jobs to schedule it, a catalog to govern it, Git to version it.
- **The "lakehouse" pitch:** you get warehouse guarantees (ACID, schema, SQL) directly on cheap lake storage — one system instead of "a data lake plus a separate data warehouse."

**Why companies use it:** one platform for data engineering, SQL analytics, and ML; scales from gigabytes to petabytes; separates cheap storage from elastic compute so you pay for compute only while a job runs.

---

## §2 — SPARK: THE EXECUTION MODEL (the core of any grilling)

### 2.1 The cast
```
   ┌──────────────────────────────────────────────┐
   │  DRIVER  — the brain                          │
   │  • runs your code / main program              │
   │  • builds the logical plan (DAG)              │
   │  • asks the CLUSTER MANAGER for resources     │
   │  • schedules tasks onto executors             │
   └───────────────┬──────────────────────────────┘
                   │  distributes tasks
   ┌───────────────┼───────────────┬───────────────┐
   ▼               ▼               ▼
┌────────┐     ┌────────┐     ┌────────┐
│EXECUTOR│     │EXECUTOR│     │EXECUTOR│   — the muscle
│ cores  │     │ cores  │     │ cores  │   each core runs one TASK on one PARTITION
│ memory │     │ memory │     │ memory │
└────────┘     └────────┘     └────────┘
```
- **Driver:** runs your program, plans the work, coordinates. One per application.
- **Executors:** JVM processes on worker nodes that actually process data. Each executor has **cores** (parallelism) and **memory**.
- **Cluster manager:** hands out worker resources (on Databricks this is managed for you).
- **Gotcha they love:** `df.collect()` / `toPandas()` pulls all data back to the **driver's** memory → if the data is big, the driver **OOMs and the job dies**. Rule: never collect big data to the driver; write it to a table instead.

### 2.2 Partitions — the unit of parallelism
Data is split into **partitions** (chunks). Each **task** processes **one partition** on **one core**. So 200 partitions across 20 cores = 10 waves of parallel work. Too few partitions = idle cores; too many tiny ones = scheduling overhead. This is the knob behind most tuning.

### 2.3 Lazy evaluation, transformations vs actions
Spark does **nothing** until you force it.

- **Transformations** build a recipe (a DAG), lazily: `select`, `filter`, `withColumn`, `join`, `groupBy`, `orderBy`. Return a new DataFrame, run nothing.
- **Actions** trigger execution: `count`, `show`, `write`, `collect`, `take`.

Why lazy is good: Spark sees the **whole plan** before running and optimises it via the **Catalyst optimizer** — pushes filters down to the read, prunes unused columns, reorders joins. You write readable code; Catalyst makes it efficient.

```
your code (transformations)  →  LOGICAL PLAN  →  Catalyst optimises  →  PHYSICAL PLAN
                                                                          │  (action triggers)
                                                              JOB → STAGES → TASKS run on executors
```
- A **job** = one action. A job splits into **stages** at every **shuffle boundary**. Each stage = a set of **tasks** (one per partition).

### 2.4 Narrow vs wide — and the SHUFFLE
- **Narrow transformation:** each output partition depends on **one** input partition. No data moves. (`filter`, `select`, `withColumn`, `map`.) Cheap.
- **Wide transformation:** an output partition needs data from **many** input partitions → Spark must **redistribute data across the network** = a **SHUFFLE**. (`groupBy`, `join`, `distinct`, `orderBy`, `repartition`.)

```
NARROW (no movement):          WIDE / SHUFFLE (data moves across the cluster):
[p1]→[p1']                      [p1]─┐        ┌→[out A rows]
[p2]→[p2']                      [p2]─┼─shuffle┼→[out B rows]
[p3]→[p3']                      [p3]─┘        └→[out C rows]
```
**The shuffle is the single most expensive thing in Spark** — network + disk I/O + serialisation. Every performance discussion reduces to "avoid, shrink, or balance the shuffles." Memorise that framing.

---

## §3 — PYSPARK CODE FLUENCY (be able to read/write this)

You won't be asked to write flawless PySpark, but you should read it comfortably and sketch the common ops.

```python
from pyspark.sql import functions as F, Window

# READ
df = spark.read.format("delta").load("/mnt/bronze/invoices")   # or spark.table("bronze.invoices")

# NARROW: filter + select early (pushdown → reads less)
df = (df.filter(F.col("invoice_date") >= "2026-07-01")
        .select("invoice_id", "supplier_id", "amount", "invoice_date"))

# DERIVE a column
df = df.withColumn("amount_aud", F.col("amount") * F.lit(1.0))

# AGGREGATE (WIDE — shuffles)
by_supplier = (df.groupBy("supplier_id")
                 .agg(F.sum("amount").alias("total"),
                      F.count("*").alias("n_lines")))

# JOIN — broadcast the small side to avoid shuffling the big one
suppliers = spark.table("dim.suppliers")            # small
enriched = df.join(F.broadcast(suppliers), "supplier_id", "left")

# WINDOW: latest line per invoice (dedupe / top-N-per-group)
w = Window.partitionBy("invoice_id").orderBy(F.col("updated_at").desc())
latest = (df.withColumn("rn", F.row_number().over(w))
            .filter(F.col("rn") == 1)
            .drop("rn"))

# WRITE (Delta), partitioned
(latest.write.format("delta")
       .mode("overwrite")
       .partitionBy("invoice_date")
       .saveAsTable("silver.invoices"))
```
Key parallels to your world: `groupBy/agg` = SQL `GROUP BY`; `Window` = SQL window functions (**identical logic to your `ROW_NUMBER()` dedupe**); `broadcast` = the join optimisation you'd get from a good query plan on SQL Server.

**Spark SQL is equivalent** — you can do all of this in pure SQL in a Databricks notebook (`%sql`), which plays straight to your advanced-SQL strength:
```sql
CREATE OR REPLACE TABLE silver.invoices AS
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY invoice_id ORDER BY updated_at DESC) rn
  FROM bronze.invoices WHERE invoice_date >= '2026-07-01'
) WHERE rn = 1;
```
**Interview move:** "I'd lean on Spark SQL where I can — it's the same window/aggregation logic I write daily on SQL Server, just distributed — and drop to the DataFrame API for the programmatic bits."

---

## §4 — DELTA LAKE, DEEP (this is the heart — spend time here)

### 4.1 Why Delta exists
Raw Parquet in a lake is just files. Problems: no transactions (a failed write leaves half-written data), no updates/deletes (you can't upsert), no schema safety, no history, and concurrent writers corrupt each other. Delta fixes all of this with **one idea: a transaction log**.

### 4.2 The transaction log (`_delta_log`) — how ACID works
Every Delta table has a `_delta_log/` folder of ordered JSON commits. Each write creates a new commit that records "these files were added, these were removed." Readers read the log to know the **current set of valid files** and see a **consistent snapshot**.

```
/invoices/
  part-0001.parquet   part-0002.parquet   part-0003.parquet   ...
  _delta_log/
    00000.json   ← commit 0: added part-0001, part-0002
    00001.json   ← commit 1: added part-0003, removed part-0001 (an update)
    00002.json   ← commit 2: ...
```
- **Atomicity:** a write only "counts" once its commit lands in the log. A crash mid-write = no commit = readers never see partial data.
- **Time travel:** older commits still point at older files → you can query any past version.
- **Concurrency:** optimistic concurrency control via the log — conflicting writes are detected and retried/failed cleanly.

This is the rigorous version of the reliability you hand-build today with idempotent date-cutoff loads.

### 4.3 The operations that matter

**MERGE (upsert) — the DE workhorse.** Incremental refresh + idempotency in one atomic statement:
```sql
MERGE INTO silver.invoices AS t
USING staged_updates AS s
ON  t.invoice_id = s.invoice_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
```
Re-running the same batch lands the same state → **idempotent**, exactly your date-cutoff guarantee.

**replaceWhere — atomic partition overwrite** (your delete-and-replace, safely):
```python
(new_data.write.format("delta").mode("overwrite")
    .option("replaceWhere", "invoice_date >= '2026-07-01'")
    .saveAsTable("silver.invoices"))
```

**Time travel:**
```sql
SELECT * FROM silver.invoices VERSION AS OF 12;
SELECT * FROM silver.invoices TIMESTAMP AS OF '2026-07-01 00:00:00';
```
Use for audit, rollback, and reproducing a prior report. (= your "automatic archiving," free.)

**Schema enforcement & evolution:** a write with a mismatched schema is **rejected** by default (no silent bad data). To intentionally add columns: `.option("mergeSchema", "true")`.

**Maintenance:**
- `OPTIMIZE silver.invoices` — compacts many small files into few big ones (the **small-files problem** is a top Spark killer).
- `OPTIMIZE ... ZORDER BY (supplier_id)` — co-locates rows by a column you filter/join on → queries skip more files (**data skipping**). Use on high-cardinality frequently-filtered columns.
- `VACUUM silver.invoices RETAIN 168 HOURS` — physically deletes unreferenced old files (default 7-day retention). **Trade-off:** vacuum aggressively and you lose time-travel history.

### 4.4 Delta vs Parquet vs a warehouse (a common probe)
| | Plain Parquet | Delta Lake | Traditional warehouse |
|---|---|---|---|
| Columnar/compressed | ✅ | ✅ (on Parquet) | ✅ |
| ACID transactions | ❌ | ✅ | ✅ |
| Updates / upserts (MERGE) | ❌ | ✅ | ✅ |
| Time travel / history | ❌ | ✅ | rarely |
| Schema enforcement | ❌ | ✅ | ✅ |
| Cheap object storage | ✅ | ✅ | ❌ (proprietary) |
> "Delta = Parquet + a transaction log, so you get warehouse reliability on lake-cheap storage."

---

## §5 — INGESTION & ORCHESTRATION (know what each is)

**Batch (what you do today):** files land, a scheduled job reads and loads them. On Databricks: a notebook/job reading from cloud storage into Bronze.

**Auto Loader** — incremental file ingestion: it **tracks which files it has already processed** (in a checkpoint) and only picks up new arrivals, efficiently, at scale. This is *literally your email-drop invoice ingestion problem*, solved natively:
```python
df = (spark.readStream.format("cloudFiles")
        .option("cloudFiles.format", "csv")
        .option("cloudFiles.schemaLocation", "/chk/invoices")
        .load("/mnt/landing/invoices"))
```

**Structured Streaming** — the same DataFrame API but over an unbounded, continuously-arriving stream, processed in **micro-batches**, with **checkpointing** for exactly-once, fault-tolerant processing. You don't need depth here — know it exists and that Auto Loader runs on it.

**Delta Live Tables (DLT)** — declarative pipelines: you *declare* the tables and their transformations plus **data-quality expectations**, and DLT manages orchestration, dependencies, retries, and quality enforcement:
```python
@dlt.table
@dlt.expect_or_drop("valid_amount", "amount > 0")   # a quality rule
def silver_invoices():
    return dlt.read("bronze_invoices").dropDuplicates(["invoice_id"])
```
This is your hand-coded row/type/amount validation, **declared** instead of scripted.

**Databricks Workflows (Jobs)** — the scheduler/orchestrator: chain tasks with dependencies, retries, alerts, on job clusters that spin up and tear down. = your Windows Task Scheduler + batch, managed and observable.

---

## §6 — THE WORKED BUILD: YOUR 6M-INVOICE PIPELINE ON DATABRICKS

This is the section that makes it click — your actual current pipeline, re-expressed on Databricks. If you can walk this, you can hold any grilling.

**Today (SQL Server):** email drop → Graph API ingest → validate (row/hour counts, types, drop stray cols, log/alert) → vendor & spend lookups → multi-language clean → ~11–12k-rule categorisation → rolling 4-week windows → dashboards. Idempotent via date-cutoff replace. ~4–5h manual → ~75-min automated run, 6M rows/week, 5 regions/13 sub-regions.

**On Databricks (medallion):**
```
LANDING (cloud storage)  ──Auto Loader──▶  🥉 BRONZE          ──▶  🥈 SILVER            ──▶  🥇 GOLD          ──▶ Power BI/
raw invoice files                          raw, appended            cleaned+validated         4-week spend         Databricks SQL
                                           (audit/replay)           +categorised              windows, KPIs
```

1. **Ingest → Bronze.** Auto Loader picks up each new invoice file, writes raw to `bronze.invoices` (append-only, keeps everything for audit/replay). *Replaces your Graph-API email ingestion.*
2. **Validate + clean → Silver.** Read Bronze; apply your checks as **DLT expectations** or explicit filters (row counts, data types, drop stray columns, log discrepancies); dedupe with a `ROW_NUMBER` window; multi-language cleaning; join the ~11–12k-rule categorisation (or the ML classifier) — broadcast the small rule/dim tables. Write to `silver.invoices` with a **`MERGE`** so re-delivered files are idempotent. *This is your validation + categorisation layer.*
3. **Aggregate → Gold.** Rolling 4-week spend windows per supplier/region as `gold.spend_windows`, partitioned by date, `OPTIMIZE ... ZORDER BY (supplier_id)` for fast dashboard filters. *Your dashboard feed.*
4. **Serve.** Power BI / Databricks SQL reads Gold.
5. **Orchestrate.** A **Workflow** chains Bronze→Silver→Gold on a schedule, with retries and alerts. *Your Task Scheduler, managed.*
6. **Idempotency & recovery.** `MERGE`/`replaceWhere` means a crash-then-rerun lands identical state; Delta's transaction log means no half-written partitions; time travel lets you roll back a bad run. *Your date-cutoff guarantee, formalised.*

**Say this in the room:** "I'd lift my current pipeline onto Databricks almost one-to-one — Auto Loader for the intake, Bronze/Silver/Gold Delta tables for raw/clean/serve, MERGE for the idempotent incremental refresh, DLT expectations for the validation I hand-code today, and a Workflow for orchestration. The engineering is identical; Spark just distributes it and Delta makes the reliability built-in."

---

## §7 — PERFORMANCE TUNING, DEEP (the grill favourites)

The whole game: **do less work, on fewer rows, with fewer/balanced shuffles.**

1. **Filter & select early** → predicate/column **pushdown**, Spark reads less off disk. (Same instinct as sargable SQL.)
2. **Broadcast joins** — ship a small table to every executor so the big table isn't shuffled: `df.join(F.broadcast(small), "key")`. Highest-leverage join trick; only for genuinely small tables (it copies to every node). AQE can auto-broadcast.
3. **Data skew** — one key dominates (e.g. one huge supplier) → one task runs forever while others idle. Fixes: **salting** (append a random 0–N suffix to the hot key to spread it across tasks, then aggregate in two passes), or **AQE skew-join handling** (auto-splits skewed partitions).
4. **AQE (Adaptive Query Execution)** — Spark re-optimises **at runtime** with real stats: coalesces too-many small shuffle partitions, flips joins to broadcast, splits skew. On by default in modern Databricks — name it.
5. **Partitioning strategy** — partition big Delta tables by a **low-cardinality** column you filter on (`date`, `region`) for pruning. Partition by something high-cardinality (`invoice_id`) and you create the **small-files problem** (thousands of tiny files). Aim for ~100MB–1GB files.
6. **OPTIMIZE + ZORDER** — compact small files; Z-order by frequently-filtered columns for data-skipping.
7. **Caching** — `df.cache()` a DataFrame reused across multiple actions. Trade-off: consumes executor memory; only cache genuine reuse.
8. **Reading the Spark UI** — the debugging skill: find the slow **stage**; one long task among short ones = **skew**; a giant shuffle read = un-broadcast join or late filter; lots of tiny tasks = too many small files.

**The pattern to recite:** "Minimise shuffles first — filter early, broadcast the small side; handle skew with salting or AQE; keep Delta healthy with OPTIMIZE and Z-ORDER; and size partitions so I'm not reading a million small files."

---

## §8 — GOVERNANCE, CLUSTERS & COST (one line each)

- **Unity Catalog** — central governance across workspaces: permissions, lineage, discovery, three-level namespace `catalog.schema.table`. The answer to "how do you manage access and data governance."
- **Cluster types:** **all-purpose** (interactive dev, stays up, shared) vs **job cluster** (spun up per scheduled job, torn down after — cheaper for production). **Autoscaling** adds/removes workers with load.
- **Photon** — Databricks' vectorised C++ engine; a drop-in speed-up for SQL/Delta. Just know the name.
- **Databricks Repos** — Git-backed notebooks (branch/PR/review) — ties to your Git strength.
- **Cost mental model:** storage (cheap object storage) is decoupled from compute (you pay per second a cluster runs). So the cost levers are: right-size clusters, use job clusters for production, autoscale, and don't leave interactive clusters idle. Good to mention — shows production awareness.

---

## §9 — GLOSSARY (fast recall)

| Term | One-liner |
|---|---|
| **Spark** | Distributed compute engine — partitions data across a cluster. |
| **Driver / Executor** | Driver plans & coordinates; executors process partitions in parallel. |
| **Partition** | A chunk of data one task processes on one core. |
| **Transformation / Action** | Transformations are lazy (build the plan); actions trigger execution. |
| **Narrow / Wide** | Narrow = no data movement; wide = a shuffle. |
| **Shuffle** | Redistributing data across the cluster (joins, groupBy) — the expensive op. |
| **DAG / stage / task** | Plan → split at shuffles into stages → one task per partition. |
| **Catalyst / AQE** | Query optimiser (compile-time) / adaptive re-optimiser (runtime). |
| **Delta Lake** | Parquet + a transaction log → ACID, MERGE, time travel, schema. |
| **`_delta_log`** | The ordered commit log that makes Delta transactional. |
| **MERGE** | Atomic upsert — the idempotent incremental-load workhorse. |
| **replaceWhere** | Atomic overwrite of one partition/predicate. |
| **Time travel** | Query a past version (`VERSION/TIMESTAMP AS OF`). |
| **OPTIMIZE / ZORDER / VACUUM** | Compact files / co-locate by column / delete old files. |
| **Small-files problem** | Too many tiny files → slow reads; fix with OPTIMIZE / partition sanely. |
| **Broadcast join** | Ship the small table everywhere → no shuffle of the big one. |
| **Skew / salting** | One hot key overloads one task; salting spreads it. |
| **Medallion** | Bronze (raw) → Silver (clean) → Gold (serve). |
| **Auto Loader** | Incremental new-file ingestion with checkpointing. |
| **DLT** | Declarative pipelines with data-quality expectations. |
| **Workflows / Jobs** | Databricks' scheduler/orchestrator. |
| **Unity Catalog** | Central governance: permissions, lineage, `catalog.schema.table`. |
| **Lakehouse** | Warehouse guarantees on lake storage — one system. |
| **Photon** | Vectorised C++ engine — faster SQL/Delta. |

---

### The honest line to keep straight (from the survival sheet, repeated because it matters)
Your **hands-on** Databricks is the **VCDI internship** (distributed PySpark anomaly detection, +20%). Your **current role is SQL Server + Python**, not Databricks — never blur that. Everything else here is "concepts I know and can apply, and I ramp fast." That honesty is a feature: it's what makes the "I lift my pipeline onto Databricks one-to-one" story credible.
