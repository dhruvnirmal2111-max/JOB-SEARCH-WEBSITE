# Infosys Fundamentals Sheet — SQL efficiency, Python, pipeline trade-offs

> Technical-first DE round (Mon 4 PM, video). This is the **instant-recall + worked-examples** sheet. Heaviest on **SQL efficiency** (their #1 "advanced SQL scripting") and **Python**, with the pipeline trade-offs underneath. Format: rule → **slow vs fast example** → why.

---

# PART 1 — Making SQL efficient (the core of "advanced SQL")

**The mental model (say this):** a query is slow when it *reads too much data* or *can't use an index*. Every optimisation is one of: **do less work, on fewer rows, and keep indexes usable.**

### 1. Select only the columns you need (never `SELECT *`)
```sql
-- slow: reads every column, more I/O, can't use a covering index
SELECT * FROM transactions WHERE store_id = 42;
-- fast: only what you need
SELECT txn_id, amount, txn_date FROM transactions WHERE store_id = 42;
```
*Why:* less data off disk/network; a narrow index can satisfy the whole query.

### 2. Keep predicates "sargable" — don't wrap an indexed column in a function
```sql
-- slow: function on the column disables the index -> full table scan
SELECT * FROM sales WHERE YEAR(sale_date) = 2026;
-- fast: a range keeps the index usable
SELECT * FROM sales WHERE sale_date >= '2026-01-01' AND sale_date < '2027-01-01';
```
*Why:* the database can only "seek" an index if the column is bare. `YEAR(col)`, `UPPER(col)`, `col + 0` all force a scan. **This is the single most common SQL-efficiency question.**

### 3. Filter early — push `WHERE` before joins/aggregation
```sql
-- slow: join everything, then aggregate
SELECT c.region, SUM(o.amount)
FROM orders o JOIN customers c ON c.id = o.customer_id
GROUP BY c.region;
-- fast: cut rows before the heavy work
SELECT c.region, SUM(o.amount)
FROM orders o JOIN customers c ON c.id = o.customer_id
WHERE o.order_date >= '2026-01-01'
GROUP BY c.region;
```

### 4. Aggregate first, then join (shrink before you combine)
```sql
-- fast: pre-aggregate the big fact table, then join the small result
WITH store_totals AS (
  SELECT store_id, SUM(amount) AS total
  FROM transactions
  GROUP BY store_id
)
SELECT s.store_name, t.total
FROM store_totals t
JOIN stores s ON s.id = t.store_id;
```
*Why:* joining a 6M-row table to another big table is expensive; aggregating first turns it into a few thousand rows before the join.

### 5. Indexes — the biggest lever
- An **index** is like a book's index: it lets the DB jump straight to rows instead of scanning all of them.
- **Index the columns you filter, join, and sort on** (`WHERE`, `JOIN`, `ORDER BY`).
- **Trade-off:** indexes speed up reads but **slow down writes** (every insert/update maintains them) and use storage. So index for your query patterns, don't index everything.
- *Say:* "If that query ran often, I'd add an index on `(store_id, txn_date)`."

### 6. `EXISTS` vs `IN` — and the `NOT IN` null trap
```sql
-- existence check: EXISTS can stop at the first match
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```
*Trap to know:* **`NOT IN` returns zero rows if the subquery contains a single NULL.** Use `NOT EXISTS` for "customers with no orders" — it's null-safe and usually faster.

### 7. Use a window function instead of a self-join
```sql
-- slow: self-join to fetch the previous row
-- fast: LAG does it in one pass
SELECT day, sales, LAG(sales) OVER (PARTITION BY store ORDER BY day) AS prev_sales
FROM daily_sales;
```

### 8. Don't paper over a bad join with `DISTINCT`
If you added `SELECT DISTINCT` to remove duplicates, you probably have a **fan-out join** (wrong grain). Fix the join key/grain instead — `DISTINCT` forces an expensive sort over the whole result.

### 9. `UNION ALL` vs `UNION`
`UNION` removes duplicates (a sort/hash — costly). If you know rows are already distinct, use **`UNION ALL`** — no dedupe work.

### 10. Read the execution plan
`EXPLAIN` (or "Display Estimated Execution Plan" in SQL Server) shows what the DB will do. **Look for:** a **full/clustered index scan** where you expected a **seek**, expensive **sorts**, and **nested loops** over big tables. *Say:* "I'd check the plan for scans and add an index or rewrite the predicate."

### 11. Partition pruning (big tables / Databricks / warehouses)
If a table is **partitioned by date**, filtering on that key scans only the relevant partitions:
```sql
SELECT ... FROM events WHERE event_date = '2026-07-25';  -- reads one partition, not the whole table
```
*Same idea as an index, at file level — huge on Spark/Delta/Snowflake.*

**SQL efficiency one-liner for the room:** *"I'd select only needed columns, keep predicates sargable so indexes are used, filter and aggregate before joining, index the filter/join/sort columns, and check the execution plan for scans."*

---

# PART 1b — Advanced SQL patterns (quick recall)
- **Top-N per group:** `ROW_NUMBER() OVER (PARTITION BY g ORDER BY x DESC)` → filter ≤ N.
- **Dedupe keep latest:** `ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC)` → keep rn=1.
- **Running total:** `SUM(x) OVER (ORDER BY d ROWS UNBOUNDED PRECEDING)`.
- **Period-over-period:** `LAG/LEAD`.
- `RANK` (gaps) vs `DENSE_RANK` (no gaps) vs `ROW_NUMBER` (unique) · `WHERE` (pre-group) vs `HAVING` (post-group) · INNER vs LEFT join.

---

# PART 2 — Python / pandas (efficiency + examples)

### 1. Vectorise — never loop row-by-row
```python
# slowest: iterrows (avoid)
for i, row in df.iterrows():
    df.at[i, "margin"] = row["price"] - row["cost"]
# slow: list comprehension
df["margin"] = [p - c for p, c in zip(df.price, df.cost)]
# fast: vectorised (whole-column arithmetic, C-speed)
df["margin"] = df["price"] - df["cost"]
```
*Why:* pandas/numpy run vectorised ops in C over the whole array — often 100×+ faster than Python loops.

### 2. Conditionals without a loop (`np.where` / `np.select`)
```python
import numpy as np
df["band"] = np.where(df["margin"] > 0, "profit", "loss")
```

### 3. Cut memory with dtypes (matters on big data)
```python
df["store_id"] = df["store_id"].astype("int32")      # smaller than int64
df["category"] = df["category"].astype("category")   # huge saving for repeated strings
```

### 4. Read big files efficiently
```python
df = pd.read_csv("big.csv",
                 usecols=["id", "amount", "date"],     # only needed columns
                 dtype={"id": "int32"},
                 parse_dates=["date"])
# too big for memory? stream in chunks
for chunk in pd.read_csv("big.csv", chunksize=500_000):
    process(chunk)
```

### 5. Bread-and-butter transforms
```python
# group + aggregate (= SQL GROUP BY)
summary = df.groupby("store", as_index=False)["amount"].sum()
# join (= SQL JOIN)
merged = summary.merge(stores, on="store", how="left")
# month-over-month within group
df = df.sort_values(["store", "month"])
df["mom"] = df.groupby("store")["amount"].pct_change()
```

### 6. A reliable pipeline skeleton (what "production-grade" looks like)
```python
def run_pipeline(source, target):
    df = extract(source)                 # 1. ingest
    validate(df)                         # 2. quality gate -> raise on bad data
    clean = transform(df)                # 3. transform
    load(clean, target, mode="merge")    # 4. idempotent upsert (re-run safe, no dupes)

def validate(df):
    assert len(df) > 0, "empty input"
    assert df["id"].notna().all(), "null ids"
    assert df["id"].is_unique, "duplicate ids"
    # + type/range/reconciliation checks -> fail loudly, log, alert
```
*Talk to:* idempotent load, a validation gate that fails loudly, logging + alerting.

**pandas efficiency one-liner:** *"Vectorise instead of looping, use smaller dtypes and `category` for repeated strings, read only the columns I need, and chunk when it won't fit in memory."*

---

# PART 3 — PySpark efficiency (if they push on Databricks)
- **Filter and select early** so Spark reads less (**predicate/column pushdown**).
- **Broadcast small tables** in a join: `df.join(F.broadcast(small_df), "key")` — avoids a big shuffle.
- **Shuffles are the expensive bit** (wide ops: join, groupBy, distinct). Minimise them; `repartition` thoughtfully.
- **`cache()`** a DataFrame you reuse several times.
- **Avoid `collect()`** on big data (pulls everything to the driver — OOM). Write out instead.
- **Delta Lake** for ACID + time travel + file compaction.
*Honest:* "My Spark work was VCDI; my recent scale is pandas/SQL — but I know the efficiency levers."

---

# PART 4 — Pipeline & DE fundamentals (trade-offs)

**ETL vs ELT.** ETL = transform before load; ELT = load raw, transform in the warehouse. **Trade-off:** ELT is flexible and leverages cheap warehouse compute; ETL controls what lands. Cloud favours ELT.

**Full vs incremental refresh.** Full = reload everything (simple, safe, **slow/expensive** at scale). Incremental = only changed rows since a **watermark** (fast, but you must handle late/duplicate data). *You do both in the refresh app.*

**Idempotency.** Re-running yields the same result (no dupes) — via upsert/merge on a key. Non-negotiable for reliable pipelines.

**Batch vs streaming.** Batch = scheduled chunks (simple, cheaper — your world). Streaming = event-by-event, real-time (Kafka), more complex. **Trade-off:** only pay the streaming complexity if the business truly needs real-time.

**Validation / data quality.** Schema, counts, nulls, ranges, uniqueness, reconciliation vs source — fail loudly, quarantine, alert. The thing that makes output *trustworthy*.

**Normalisation vs denormalisation.** Normalised (split tables) avoids duplication, good for writes/OLTP; denormalised/**star schema** (fact + dimensions) is faster for reads/analytics/BI. **Trade-off:** storage & consistency vs query speed.

---

# The 6 things to have PERFECT (SQL-heavy, because they are)
1. **Sargability** — `WHERE sale_date >= '2026-01-01'`, never `WHERE YEAR(sale_date)=2026`.
2. **Select needed columns + filter/aggregate before joining.**
3. **Indexes** speed reads, cost writes — index filter/join/sort columns.
4. **`NOT EXISTS` over `NOT IN`** (null trap) + **window function over self-join**.
5. **Read the execution plan** — scan vs seek.
6. **Vectorise pandas; idempotent, validated pipelines.**

Say these without hesitating and you cover the bulk of an advanced-SQL / Python DE screen.
