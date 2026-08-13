# 7-Eleven - Databricks Notebook Bridge (if they make you work in Databricks)

> You were honest in round one that Databricks is not your daily stack, and they advanced you anyway, so it is not a dealbreaker. This sheet is purely the practical safety net: if round two puts you in a **Databricks notebook**, how to do the work using what you already know. Golden rule: **a Databricks notebook is just a wrapper; the real work is SQL and Python, which you have.**

---

## PART 0 - The honest framing (say it once, calmly, if it comes up)
> "Just to be upfront, as I mentioned last round, my hands-on Databricks is from my VCDI internship, a distributed PySpark anomaly-detection pipeline, and my day-to-day is SQL and Python, not Spark. I know the model and the Delta levers well and I ramp fast. Happy to work it through, and I'll lean on Spark SQL where I can since the logic is the same."

That is not a weakness to hide, it is a boundary you state once and then get on with it.

---

## PART 1 - The escape hatch: just write SQL
In a Databricks notebook you can run plain SQL. This turns a "Databricks exercise" into a "SQL exercise", which is your strength.
```python
# Option A: the %sql magic at the top of a cell
%sql
SELECT store_id, SUM(revenue) AS total
FROM sales
GROUP BY store_id
ORDER BY total DESC
```
```python
# Option B: spark.sql from Python, returns a dataframe
df = spark.sql("""
  SELECT store_id, product_id, revenue,
         ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY revenue DESC) AS rn
  FROM sales
""")
df.filter("rn <= 3").show()
```
**Every SQL pattern from the live-coding survival kit works here unchanged.** If you get flustered by PySpark syntax, fall back to SQL and say so: "I'll write this in Spark SQL, same logic, cleaner for me."

---

## PART 2 - PySpark versions of the common patterns (if they want the DataFrame API)
PySpark reads a lot like pandas with different verbs. `from pyspark.sql import functions as F, Window`.

**Read a table**
```python
df = spark.table("sales")            # or spark.read.format("delta").load(path)
```

**Filter and select**
```python
df.filter(F.col("revenue") > 100).select("store_id", "product_id", "revenue")
```

**Group by and aggregate**
```python
df.groupBy("store_id").agg(F.sum("revenue").alias("total"),
                           F.count("*").alias("n"))
```

**New column**
```python
df = df.withColumn("margin", F.col("price") - F.col("cost"))
```

**Top-N per group (the classic, window function)**
```python
w = Window.partitionBy("store_id").orderBy(F.col("revenue").desc())
df.withColumn("rn", F.row_number().over(w)).filter(F.col("rn") <= 3)
```

**Join (broadcast the small table to avoid a shuffle)**
```python
df.join(F.broadcast(stores), "store_id", "left")
```

**Sort / order**
```python
df.orderBy(F.col("revenue").desc())
```

**Distinct count**
```python
df.select(F.countDistinct("customer_id")).show()
```

**Dedupe, keep latest**
```python
w = Window.partitionBy("customer_id").orderBy(F.col("updated_at").desc())
df.withColumn("rn", F.row_number().over(w)).filter(F.col("rn") == 1).drop("rn")
```

**Write to a Delta table**
```python
df.write.format("delta").mode("overwrite").saveAsTable("gold.sales_summary")
```

**Nothing happens until an action:** `.show()`, `.count()`, `.write`, `.collect()`. Transformations (filter, select, join, groupBy) are lazy and build a plan first. Say that out loud, it sounds fluent.

---

## PART 3 - pandas to PySpark quick map (say "it maps like this")
| pandas | PySpark |
|---|---|
| `df[df.x > 100]` | `df.filter(F.col("x") > 100)` |
| `df[['a','b']]` | `df.select("a","b")` |
| `df.groupby('k')['v'].sum()` | `df.groupBy("k").agg(F.sum("v"))` |
| `df['c'] = ...` | `df.withColumn("c", ...)` |
| `df.merge(o, on='k')` | `df.join(o, "k")` |
| `df.sort_values('v')` | `df.orderBy("v")` |
| `df.nunique()` | `df.select(F.countDistinct(...))` |
| `df.head()` | `df.show()` |

Same operations, different verbs. The thinking is identical.

---

## PART 4 - The two Delta lines worth knowing (if the case is data-engineering-flavoured)
- **Incremental / idempotent load** = a `MERGE` on the key (update matched, insert new), atomic and safe to re-run.
- **Delta = Parquet + a transaction log**, which is what gives ACID, time travel and MERGE. (Full detail in the Databricks deep-dive sheet.)

---

## PART 5 - The mindset
- If they hand you a notebook: **reach for Spark SQL first**, it is your strength and it is fully valid in Databricks.
- If they want the DataFrame API: it is pandas with different verbs, narrate the plan and it comes.
- If you blank: state the approach, write the SQL version, say "I'd double-check the exact PySpark method name." Honest and moving beats frozen.
- Hold the boundary once (internship hands-on, concepts strong, fast learner), then just do the work. You already cleared this bar in round one by being straight about it.
