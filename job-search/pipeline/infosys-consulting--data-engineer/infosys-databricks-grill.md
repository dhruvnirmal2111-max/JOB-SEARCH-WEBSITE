# Infosys DE — Databricks Grilling Survival Sheet

> The one topic that's real on your resume but not your daily driver, so a DE panel will lean on it. This sheet does three things: (1) the **honest opener** so you never bluff, (2) the **translation trick** — your SQL Server pipeline IS a Databricks pipeline, so you answer from real experience, (3) enough **depth on Delta Lake + tuning** to hold a real conversation. Pattern to copy everywhere: **claim to real work → translate to the Databricks term → one trade-off or number.**

---

## §0 — THE HONEST OPENER (memorise, say it once, then move with confidence)

If they ask "how much Databricks have you done?" — do NOT inflate, and do NOT apologise into a hole. Say:

> "My hands-on Databricks and PySpark is from my VCDI internship: a distributed anomaly-detection pipeline over government procurement data that was too big for one machine, delivered through Power BI, and it lifted detection accuracy about 20%. My current role is pipeline-heavy but on SQL Server and Python at roughly 6-million-row weekly scale, not Spark. So I know the distributed model and the Delta/Spark levers, and everything I do daily maps straight onto them: I'd ramp fast."

That's it. Real proof + honest boundary + fast-learner. **Then you spend the rest of the interview showing the mapping is true** — which is what the next section is for.

---

## §1 — THE TRANSLATION TRICK (your strongest move — use it constantly)

Everything hard about Databricks DE, you already do on SQL Server. When they ask a Databricks question, answer from your real pipeline, then name the Databricks equivalent.

| What you do daily (SQL Server) | The Databricks / Delta equivalent | Your line |
|---|---|---|
| Full refresh vs incremental refresh | `OVERWRITE` vs Delta **`MERGE`** / `replaceWhere` | "I run both full and incremental refresh today; in Delta that's an overwrite vs a `MERGE`." |
| Idempotent re-run: delete-and-replace from a date cutoff | Delta **`replaceWhere`** or **`MERGE`** on a key | "My loads are idempotent — I replace everything on/after the min date in the file. In Delta I'd do that with `replaceWhere` on the partition, or a `MERGE` on the business key." |
| Row/hour counts, type & column checks, log discrepancies | **Delta constraints** / DLT **expectations** | "My validation layer — row counts, type checks, drop stray columns — is exactly what Delta `CHECK` constraints and DLT expectations formalise." |
| Automatic archiving of old runs | Delta **time travel** (`VERSION AS OF`) + `VACUUM` | "I archive prior runs manually; Delta gives you that free with time travel — every version is queryable until you `VACUUM`." |
| Partition-by-date so queries scan less | Delta **partitioning** + **partition pruning** | "I already lean on partition pruning in SQL; it's the same file-level idea in Delta." |
| Batch scripts on Windows Task Scheduler | **Databricks Workflows / Jobs** | "My orchestration is Task Scheduler + batch; the managed version is Databricks Workflows." |
| 20+ pipelines, all in Git | Databricks Repos (Git-backed notebooks) | "Everything I build is in Git; Databricks Repos is the same discipline inside the platform." |

**The meta-point to land:** "The engine changes, the engineering doesn't — ingestion, idempotency, validation, incremental logic, orchestration are the same problems; Spark just distributes the compute."

---

## §2 — SPARK MENTAL MODEL (say this cold)

```
        DRIVER  (the brain: plans the job, holds the DAG)
          |
   ┌──────┼──────┐        Cluster
   ▼      ▼      ▼
EXECUTOR EXECUTOR EXECUTOR   (the muscle: each works on PARTITIONS in parallel)
  |        |        |
[part1]  [part2]  [part3]    data split into partitions
```

- **Why Spark exists:** data too big for one machine → split into **partitions**, spread across a **cluster**, process in **parallel**. (Your VCDI line: "too large to screen on a single machine.")
- **Driver vs executors:** driver plans and coordinates; executors do the work on partitions. Driver collecting too much (`.collect()` on a huge df) = OOM crash — a classic gotcha.
- **Lazy evaluation:** transformations (`filter`, `select`, `join`, `groupBy`) build a plan (a DAG) but run **nothing**. Only an **action** (`count`, `write`, `show`, `collect`) triggers execution. Why it matters: Spark optimises the whole plan (via the **Catalyst optimizer**) before running — pushes filters down, prunes columns.
- **Narrow vs wide transformations:**
  - **Narrow** (`filter`, `select`, `withColumn`) — each output partition depends on one input partition. Cheap, no data movement.
  - **Wide** (`groupBy`, `join`, `distinct`, `orderBy`) — output partition needs data from many input partitions → a **SHUFFLE**.
- **SHUFFLE = the expensive thing.** Data moves across the network between executors. Every performance conversation is really "how do I avoid or shrink shuffles." (You already have this line in the fundamentals sheet — keep it.)

---

## §3 — DELTA LAKE (the heart of Databricks DE — know this cold)

Delta Lake = a storage layer that puts a **transaction log** on top of Parquet files in the lake. That log is what buys you everything below.

**What it gives you (and why each matters):**
- **ACID transactions** — concurrent reads/writes don't corrupt the table; a failed write doesn't leave half-written data. (This is the answer to "how do you avoid partial-state corruption on a crash" — the same reliability you get today from your idempotent date-cutoff, but built in.)
- **Time travel** — query any prior version: `SELECT * FROM t VERSION AS OF 12` or `TIMESTAMP AS OF '2026-07-01'`. Great for audit, rollback, reproducing a report. (= your "automatic archiving," for free.)
- **Schema enforcement** — rejects a write whose schema doesn't match (no silent bad data). **Schema evolution** — `mergeSchema` lets you *intentionally* add columns.
- **`MERGE` (upsert)** — the DE workhorse. Insert new rows, update changed ones, in one atomic statement:
```sql
MERGE INTO target t
USING updates u  ON t.id = u.id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
```
This is **how you do incremental refresh + idempotency in Delta.** Re-running the same file lands the same state — exactly your date-cutoff guarantee, expressed as a MERGE.

**The maintenance commands they may probe:**
- **`OPTIMIZE`** — compacts many small files into fewer big ones (the "small files problem" kills Spark performance). 
- **`ZORDER BY (col)`** — co-locates related data in the same files so queries on that column skip more files (data-skipping). Use on high-cardinality columns you filter/join on a lot.
- **`VACUUM`** — physically deletes old files no longer referenced (default retention 7 days). Trade-off: `VACUUM` too aggressively and you lose time-travel history.
- **`replaceWhere`** — overwrite just one partition/predicate atomically (`.option("replaceWhere", "date >= '2026-07-01'")`). This is your delete-and-replace, done safely.

**One-liner if asked "what is a lakehouse?":** "A lakehouse puts warehouse features — ACID, schema, transactions — on top of cheap data-lake storage, so you get one system instead of a lake plus a separate warehouse. Delta Lake is what makes it work."

---

## §4 — THE DATABRICKS PLATFORM (know what each thing is, one line each)

You don't need hands-on for all of these — you need to know what they ARE so a name-drop doesn't stump you.

- **Notebooks** — where you write PySpark/SQL, cell by cell; attach to a cluster to run.
- **Clusters** — the compute. **All-purpose cluster** = interactive/dev (shared, stays up). **Job cluster** = spun up for one scheduled job then torn down (cheaper for production). **Autoscaling** adds/removes workers with load.
- **Databricks Workflows (Jobs)** — the orchestrator: schedule notebooks/scripts, chain tasks with dependencies, retries, alerts. (= your Task Scheduler + batch, managed.)
- **Unity Catalog** — governance layer: one place for permissions, lineage, and discovery across workspaces (`catalog.schema.table`). The answer to "how do you manage access/governance."
- **Auto Loader** — incrementally and efficiently ingests **new files as they land** in cloud storage (tracks what's already been processed). The modern answer to "how do you ingest continuously arriving files" — which is literally your email-drop ingestion problem, done natively.
- **Delta Live Tables (DLT)** — declarative pipelines: you define the transformations + data-quality **expectations**, and DLT manages the orchestration, retries, and quality enforcement. (= your validation layer, declared instead of hand-coded.)
- **Photon** — Databricks' faster (C++) query engine; a drop-in speed-up for SQL/Delta workloads. Just know the name.
- **Databricks Repos** — Git-backed notebooks (branches, PRs) — ties to your Git strength.

---

## §5 — PERFORMANCE TUNING (the grilling favourites — have an answer for each)

The whole topic is: **do less work, on fewer rows, with fewer shuffles.**

1. **Filter & select early** — predicate & column **pushdown** so Spark reads less off disk. (Same instinct as your sargable-SQL answer.)
2. **Broadcast join** — if one table is small, `F.broadcast(small_df)` ships it to every executor so the join needs **no shuffle** of the big table. The single highest-leverage join trick. Trade-off: only for genuinely small tables (it copies to every node).
3. **Data skew** — one key has way more rows than others → one executor does all the work while others idle. Fixes: **salting** (add a random suffix to the hot key to spread it), or enable **AQE skew join handling**.
4. **AQE (Adaptive Query Execution)** — Spark re-optimises at runtime using actual data sizes: coalesces shuffle partitions, switches to broadcast joins, splits skewed partitions. Modern Databricks has it on by default — good to name.
5. **Partitioning** — partition a big Delta table by a **low-cardinality** column you filter on (e.g. `date`, `region`) → partition pruning. Trade-off: partition by something high-cardinality (like `customer_id`) and you get the **small-files problem** — thousands of tiny files, slow.
6. **`OPTIMIZE` + `ZORDER`** — compact small files, co-locate by frequently-filtered columns.
7. **`cache()` / `persist()`** — keep a reused DataFrame in memory across actions. Trade-off: uses cluster memory; only cache what you reuse.
8. **Avoid `collect()` on big data** — pulls everything to the driver → OOM. Write to a table instead.

**The pattern to say:** "First I minimise shuffles — filter early, broadcast the small side; then I handle skew with salting or AQE; then I keep Delta healthy with OPTIMIZE and Z-ORDER so I'm not reading a million small files."

---

## §6 — MEDALLION ARCHITECTURE (name it, you'll sound native)

```
 RAW files ─▶ 🥉 BRONZE ─▶ 🥈 SILVER ─▶ 🥇 GOLD ─▶ BI / dashboards
             (raw,        (cleaned,      (business
              as-ingested) validated,     aggregates,
                           deduped)       ready to serve)
```

- **Bronze** — raw ingested data, kept as-is (audit/replay). = your raw email-dropped invoice load.
- **Silver** — cleaned, validated, deduplicated, typed. = your validation + multi-language cleaning + categorisation layer.
- **Gold** — business-level aggregates ready for BI. = your rolling 4-week spend windows feeding dashboards.

**Say:** "My current pipeline already follows medallion thinking without the label — raw intake, a cleaned/validated middle, and gold aggregates into Power BI. On Databricks I'd formalise those as Bronze/Silver/Gold Delta tables."

---

## §7 — RAPID-FIRE GRILL (likely questions → tight model answers)

**"What's a shuffle and why is it bad?"**
> "Moving data across the cluster between executors, triggered by wide ops — join, groupBy, distinct. It's network + disk heavy, so it's usually the bottleneck. I minimise it by filtering early and broadcasting small tables."

**"Difference between a partition and a Delta table partition?"**
> "A Spark partition is a chunk of data an executor processes in memory — parallelism. A Delta table partition is how the files are laid out on storage by a column value, so queries prune to relevant files. Related idea, different level: compute vs storage."

**"How do you do an incremental load in Delta?"**
> "`MERGE` on the business key — update matched rows, insert new ones, atomically. It's idempotent, so re-running the same batch is safe. If it's whole-partition replacement I'd use `replaceWhere` instead."

**"How does Delta give you ACID on files?"**
> "A transaction log — the `_delta_log` — records every commit atomically. Readers see a consistent snapshot; a failed write never commits, so no half-written state."

**"Why not just use Parquet?"**
> "Parquet is a great columnar file format, but it's just files — no transactions, no upserts, no schema enforcement, no time travel. Delta adds the transaction log on top of Parquet to get all that."

**"pandas or PySpark for this job?"**
> "Memory. If it fits on one machine, pandas — no cluster overhead, faster to iterate. Once it outgrows a single machine I move to PySpark to distribute. My VCDI pipeline was over that line; my current 6-million-row weekly loads still fit comfortably in the SQL/pandas world."

**"You have a job that's suddenly slow — how do you debug it?"**
> "Check the **Spark UI** for the stage that's spilling or skewed — usually one long-running task means data skew, or a shuffle blew up. Then: is a big join un-broadcast? Am I reading a pile of small files (needs OPTIMIZE)? Am I filtering late? I work down from the shuffle."

**"How would you handle a duplicate or re-delivered file?"**
> "Idempotent load — `MERGE` on the key or `replaceWhere` on the partition, so re-processing the same file lands identical state. That's exactly how my current pipeline handles re-runs, via a date-cutoff replace." *(Your real, tested answer.)*

**"What's Z-ORDER?"**
> "A Delta data-layout optimisation — it co-locates rows with similar values in the columns you Z-order by, so queries filtering on those columns skip more files. You pair it with OPTIMIZE."

---

## §8 — THE HONEST BOUNDARIES (do NOT bluff past these)

You will get respect for a clean "I haven't used that hands-on, here's what I know it does." You will get caught bluffing depth. If pushed past your real line, say:

> "I haven't run that in production myself — my Databricks depth is the VCDI pipeline plus the Delta and tuning concepts. What I can tell you is what it's *for* and how I'd approach it, and I ramp on tooling fast — I stood up a Terraform/AWS/Snowflake stack solo on a personal build."

**Things that are safe to claim as hands-on:** PySpark transformations, distributed processing, partitions, the Spark model, a delivered result (VCDI +20%).
**Things to frame as "concepts I know, not daily":** Delta MERGE/OPTIMIZE/Z-ORDER in production, Unity Catalog, DLT, Auto Loader, Photon, cluster tuning at scale.
**Never claim:** that your current role runs on Databricks (it's SQL Server) — keep that line straight all interview.

---

### The 60-second close if they ask "why should we trust you on the data platform without daily Databricks?"
> "Because the engineering is the same and I've proven it on two engines. I've built idempotent, validated, incrementally-refreshed pipelines at millions of rows a week, and I've run distributed PySpark on data too big for one machine. Spark and Delta are where I'd apply that, and I've done the homework on the levers — MERGE for upserts, partition pruning and Z-order for speed, broadcast joins and salting for shuffles and skew. Give me the platform and I'm productive in days, not months."
