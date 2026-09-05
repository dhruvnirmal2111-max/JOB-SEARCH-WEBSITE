# Live Coding & "Explain This Code" — both roles

> Your main worry: writing code on the spot, and explaining what a piece of code does if they show you one. This doc gives you a **method** for both, plus **worked examples with solutions** for SQL, pandas, PySpark and scikit-learn. Read Part 0 + Part A (both roles), then the DE or DS part.

---

## PART 0 — The method (this matters more than any single answer)

### If they ask you to WRITE code
1. **Clarify first (10 seconds).** Restate the problem and ask about edge cases: "So I want the top 3 per category by sales — if there's a tie, keep both? And ignore nulls?" This alone signals seniority.
2. **Say your plan before typing.** "I'll use a window function to rank within each category, then filter to rank ≤ 3." Interviewers score your *approach*, not just the final code.
3. **Write it, narrating.** Talk as you go.
4. **Test with a tiny example.** "If category A has 5 products, this keeps the top 3 — good." Walk one row through.
5. **Mention trade-offs.** "On a big table I'd want an index on category, sales."

**Golden rule:** a clear, correct, simple answer with reasoning out loud beats a clever one in silence. If you blank, start with the brute-force version and say "I'd then optimise this."

### If they SHOW you code and ask "what does this do?"
Use this 4-step narration every time:
1. **Inputs & output (one line):** "It takes a sales table and returns each store's month-over-month growth."
2. **Walk it in plain English, block by block:** name each step's job, not the syntax. "This window partitions by store and orders by month; LAG grabs last month's value; then it computes the percentage change."
3. **Call out edge cases / bugs:** "One thing — the first month has no previous value, so LAG returns null; division there would error or give null." Spotting this scores big.
4. **Suggest an improvement:** "I'd wrap the division to avoid divide-by-zero, and add an ORDER BY to make output deterministic."

Even if you don't recognise a function, reason from names and structure: "`groupBy` then `agg` — so it's aggregating; `withColumn` adds a column."

---

## PART A — SQL (BOTH roles — most likely live test)

### A1. Second-highest value
```sql
-- Clean, handles ties with DENSE_RANK
SELECT DISTINCT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk = 2;
```
*Explain:* "Rank salaries high-to-low; DENSE_RANK so equal salaries share a rank; take rank 2."

### A2. Month-over-month growth (LAG)
```sql
SELECT
  month,
  sales,
  sales - LAG(sales) OVER (ORDER BY month)               AS mom_change,
  ROUND(100.0 * (sales - LAG(sales) OVER (ORDER BY month))
        / NULLIF(LAG(sales) OVER (ORDER BY month), 0), 1) AS mom_pct
FROM monthly_sales
ORDER BY month;
```
*Explain:* "LAG pulls the previous month's sales onto the current row; then change and % change. `NULLIF(...,0)` guards divide-by-zero." (Mentioning NULLIF is a senior touch.)

### A3. Top-N per group (ROW_NUMBER)
```sql
SELECT category, product, sales
FROM (
  SELECT category, product, sales,
         ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM product_sales
) t
WHERE rn <= 3;
```
*Explain:* "Number rows within each category by sales descending, keep the top 3. ROW_NUMBER breaks ties arbitrarily; RANK/DENSE_RANK would keep tied rows."

### A4. Running total (window frame)
```sql
SELECT
  txn_date, amount,
  SUM(amount) OVER (ORDER BY txn_date
                    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM transactions;
```

### A5. Deduplicate, keep the latest
```sql
WITH ranked AS (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC) AS rn
  FROM records
)
SELECT * FROM ranked WHERE rn = 1;
```
*Explain:* "One row per id, keeping the most recently updated."

### A6. Join + aggregate + filter groups
```sql
SELECT c.region, COUNT(*) AS orders, SUM(o.amount) AS revenue
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'complete'
GROUP BY c.region
HAVING SUM(o.amount) > 100000
ORDER BY revenue DESC;
```
*Explain:* "`WHERE` filters rows before grouping; `HAVING` filters the groups after aggregation." (Classic question: know that difference cold.)

**SQL quick-fire facts to have ready:** `WHERE` vs `HAVING` (before/after grouping) · `INNER` vs `LEFT` join · `RANK` (gaps) vs `DENSE_RANK` (no gaps) vs `ROW_NUMBER` (unique) · `UNION` (dedupes) vs `UNION ALL` (keeps dupes) · why `SELECT *` is bad · what an index does (speeds lookups, costs writes).

---

## PART B — Python / pandas (BOTH roles)

### B1. Group and aggregate
```python
import pandas as pd
df = pd.read_csv("sales.csv")

# total sales per store per month
summary = (df.groupby(["store", "month"], as_index=False)["amount"].sum())

# join store metadata
summary = summary.merge(stores, on="store", how="left")
```

### B2. Month-over-month per store
```python
df = df.sort_values(["store", "month"])
df["mom_pct"] = df.groupby("store")["amount"].pct_change()   # % change vs previous row within store
```

### B3. Clean data
```python
df["amount"] = df["amount"].fillna(0)          # nulls -> 0
df = df.drop_duplicates(subset=["id"])          # dedupe
df["category"] = df["category"].str.strip().str.lower()   # normalise text
```

### B4. A small function they might ask for
```python
def top_n_per_group(df, group_col, value_col, n=3):
    """Return the top-n rows of value_col within each group."""
    return (df.sort_values(value_col, ascending=False)
              .groupby(group_col)
              .head(n))
```
*Explain:* "Sort by value descending, then within each group take the first n — that's the top-n per group."

**pandas facts:** `groupby().agg()` · `merge` (= SQL join, set `how`) · `pivot_table` · `apply` vs vectorised (prefer vectorised — faster) · `loc`/`iloc` (label vs position) · why chunk big CSVs (`chunksize`).

---

## PART C — Data Engineer (Infosys): PySpark + pipeline code

### C1. PySpark equivalents (know the DataFrame API)
```python
from pyspark.sql import functions as F, Window

# group + aggregate
agg = df.groupBy("store").agg(F.sum("amount").alias("total_sales"))

# top-3 per category (window)
w = Window.partitionBy("category").orderBy(F.col("sales").desc())
top3 = (df.withColumn("rn", F.row_number().over(w))
          .filter(F.col("rn") <= 3)
          .drop("rn"))

# join + filter
res = (orders.join(customers, orders.customer_id == customers.id, "inner")
             .filter(F.col("status") == "complete")
             .groupBy("region").agg(F.sum("amount").alias("revenue")))
```
*Explain the mental model:* "Same logic as SQL/pandas, but distributed. `groupBy().agg()`, `withColumn` adds a column, window functions work like SQL. Spark is **lazy** — these build a plan and only run on an **action** like `.show()`, `.count()`, or `.write`."

### C2. Reliable pipeline skeleton (what "production-grade" looks like in code)
```python
def run_pipeline(source_path, target_table):
    df = extract(source_path)              # 1. ingest
    validate(df)                           # 2. quality gate — raise if bad
    clean = transform(df)                  # 3. transform
    load(clean, target_table, mode="merge")# 4. idempotent upsert (no dupes on re-run)

def validate(df):
    assert df.count() > 0, "empty input"
    assert df.filter(F.col("id").isNull()).count() == 0, "null ids"
    # row counts, schema, ranges, uniqueness -> fail loudly, log, alert
```
*Talk to:* idempotent load (re-run safe), a validation gate that fails loudly, logging + alerting. This is your Part-B best-practices in code.

**PySpark facts:** transformation (lazy: `select`, `filter`, `join`) vs action (triggers: `count`, `collect`, `write`) · a **shuffle** (wide op like join/groupBy) is the expensive bit · `cache()` a reused DataFrame · partitions = parallel chunks · Delta Lake = ACID + time travel on the lake.

---

## PART D — Data Scientist (7-Eleven): scikit-learn + modelling code

### D1. Train / evaluate a classifier the right way
```python
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)   # stratify keeps class balance

model = LogisticRegression(class_weight="balanced", max_iter=1000)  # balanced = handle imbalance
model.fit(X_train, y_train)

preds = model.predict(X_test)
print(classification_report(y_test, preds))             # precision / recall / f1 per class

cv = cross_val_score(model, X, y, cv=5, scoring="f1_macro")   # 5-fold CV, F1 not accuracy
print(cv.mean())
```
*Explain every choice (they'll ask "why"):* `stratify` keeps class proportions in the split; `class_weight="balanced"` up-weights rare classes; `classification_report` gives precision/recall/F1 (not accuracy, because imbalance); `cross_val_score` checks it's not a fluke of one split; `random_state` makes it reproducible.

### D2. A quick forecast eval (backtest idea)
```python
# time series: never random split — train on past, test on future
train = df[df.date < "2026-01-01"]
test  = df[df.date >= "2026-01-01"]
# fit model on train, predict test, then:
wmape = (abs(test.actual - test.pred).sum()) / test.actual.sum()   # weighted MAPE
```
*Explain:* "For time series I split by time, never randomly, or I'd leak the future. WMAPE weights the error by volume so big sellers count more."

**sklearn facts:** `fit`/`predict`/`predict_proba` · `train_test_split` (+ `stratify`) · `cross_val_score` / `GridSearchCV` (tune hyperparameters via CV) · `Pipeline` (chain preprocessing + model, avoids leakage) · metrics: `classification_report`, `roc_auc_score`, `mean_absolute_error`.

---

## Two "explain this code" drills (practice out loud)

**Drill 1 — SQL:**
```sql
SELECT user_id
FROM logins
GROUP BY user_id
HAVING COUNT(*) > 5 AND MAX(login_date) < '2026-01-01';
```
> *Good answer:* "Group logins by user; keep users who logged in more than 5 times total but whose most recent login was before 2026 — so frequent-but-now-inactive users. Edge case: it counts all-time logins, not a window; if they wanted 'active last year' I'd add a date filter in WHERE."

**Drill 2 — pandas:**
```python
df["rank"] = df.groupby("store")["sales"].rank(ascending=False)
top = df[df["rank"] <= 3]
```
> *Good answer:* "Within each store, rank products by sales high-to-low, then keep the top 3 per store. Note `rank` gives ties the average rank and can produce fractional ranks, so if exact top-3 matters I'd use a method='first' or a different approach."

**The habit to build:** input → output in one line, walk the blocks in plain English, name one edge case, suggest one improvement. Do that and you'll sound senior even on code you've never seen.
