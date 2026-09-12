# 7-Eleven - Databricks Deep Prep (full hands-on code)

> The hands-on companion to the Databricks concept sheets. If round two puts you in a Databricks notebook, this is the actual code you'd write, end to end: reading Delta, PySpark transformations, the Spark SQL escape hatch, Delta operations (MERGE, time travel, OPTIMIZE), feature engineering at scale, a full ML pipeline two ways (MLlib and the pandas+sklearn fallback), MLflow tracking, and tuning. Golden rule: **reach for Spark SQL when you can, narrate the plan, and remember PySpark is pandas with different verbs.**

Honest framing to state once: "My hands-on Databricks is the VCDI internship; my day-to-day is SQL and Python. I lean on Spark SQL where I can and ramp fast." Then just work.

---

## PART 0 - How a Databricks notebook works (30-second orientation)
- Cells run Python by default. `spark` (the SparkSession) already exists, no setup.
- **Magic commands** switch a cell's language: `%sql`, `%python`, `%md`, `%sh`.
- `display(df)` renders a dataframe as a nice table and lets you chart it in the UI.
- Tables live in Unity Catalog as `catalog.schema.table`; most are **Delta** tables.
- Nothing runs until an **action** (`.show()`, `.count()`, `.write`, `display()`); transformations are lazy.

---

## PART 1 - Read and explore (full code)
```python
df = spark.table("retail.sales")                 # or spark.read.format("delta").load("/mnt/.../sales")
df.printSchema()                                  # column names + types
print("rows:", df.count())
display(df.limit(20))                             # preview in the UI
df.describe(["litres", "our_price"]).show()       # summary stats
df.groupBy("site_id").count().orderBy("count", ascending=False).show(5)
```
Spark SQL equivalent (the escape hatch, use your SQL strength):
```python
%sql
SELECT site_id, COUNT(*) AS n, AVG(litres) AS avg_litres
FROM retail.sales
GROUP BY site_id
ORDER BY n DESC
LIMIT 5
```

---

## PART 2 - Core PySpark transformations (worked, with a 7-Eleven task)

**Task: top 3 products by revenue per site.**
```python
from pyspark.sql import functions as F, Window

rev = (df.groupBy("site_id", "product")
         .agg(F.sum("amount").alias("revenue")))

w = Window.partitionBy("site_id").orderBy(F.col("revenue").desc())
top3 = (rev.withColumn("rn", F.row_number().over(w))
           .filter(F.col("rn") <= 3)
           .drop("rn"))
display(top3)
```
Narrate: "Group and sum to get revenue per product per site, then a window ranked within each site, keep rows 1 to 3. ROW_NUMBER, not RANK, so I get exactly three even on ties."

**The building blocks (say the pandas equivalent as you go):**
```python
df.filter(F.col("revenue") > 100)                          # pandas: df[df.revenue>100]
df.select("site_id", "product", "revenue")                 # df[[...]]
df.withColumn("margin", F.col("price") - F.col("cost"))    # df['margin'] = ...
df.groupBy("site_id").agg(F.sum("amount").alias("rev"),
                          F.countDistinct("customer_id").alias("cust"))
df.join(F.broadcast(sites), "site_id", "left")             # broadcast the small table, no shuffle
df.orderBy(F.col("rev").desc())
df.withColumn("dow", F.dayofweek("date"))                  # date parts
df.na.fill({"litres": 0}).na.drop(subset=["our_price"])    # missing values
```

**Week-over-week growth (LAG window):**
```python
w = Window.partitionBy("site_id").orderBy("week")
wow = (weekly
   .withColumn("prev", F.lag("litres").over(w))
   .withColumn("wow_growth", (F.col("litres") - F.col("prev")) / F.col("prev")))
display(wow)
```

---

## PART 3 - Delta operations (the data-engineering flavour, worked)

**Idempotent incremental load = MERGE (the workhorse):**
```python
from delta.tables import DeltaTable

target = DeltaTable.forName(spark, "gold.customer_daily")
(target.alias("t")
   .merge(updates.alias("s"), "t.customer_id = s.customer_id AND t.date = s.date")
   .whenMatchedUpdateAll()
   .whenNotMatchedInsertAll()
   .execute())
```
Narrate: "MERGE upserts, update matched rows, insert new ones, atomically. Re-running the same batch lands the same state, so it's idempotent and safe after a crash."

Or in SQL:
```python
%sql
MERGE INTO gold.customer_daily t
USING updates s ON t.customer_id = s.customer_id AND t.date = s.date
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

**Overwrite just one partition safely:**
```python
(new_day.write.format("delta").mode("overwrite")
   .option("replaceWhere", "date = '2026-07-30'")
   .saveAsTable("gold.customer_daily"))
```

**Time travel (audit / rollback):**
```python
%sql
SELECT * FROM gold.customer_daily VERSION AS OF 12;
SELECT * FROM gold.customer_daily TIMESTAMP AS OF '2026-07-01';
```

**Keep the table healthy:**
```python
%sql
OPTIMIZE gold.customer_daily ZORDER BY (customer_id);   -- compact small files + co-locate
VACUUM gold.customer_daily RETAIN 168 HOURS;            -- delete old files (keeps 7 days history)
```
One-liner: "Delta is Parquet plus a transaction log, which is what gives ACID, MERGE and time travel."

---

## PART 4 - Feature engineering at scale (full code)
```python
from pyspark.sql import functions as F, Window

w = Window.partitionBy("site_id").orderBy("date")
feats = (df
  .withColumn("dow", F.dayofweek("date"))
  .withColumn("month", F.month("date"))
  .withColumn("lag_1",  F.lag("litres", 1).over(w))
  .withColumn("lag_7",  F.lag("litres", 7).over(w))
  # 7-day rolling average, shifted by 1 so it never sees today (no leakage)
  .withColumn("roll7",
      F.avg("litres").over(w.rowsBetween(-7, -1)))
  .dropna())
display(feats)
```
Narrate: "Windows give me lags and rolling averages per site. I shift the rolling window to end yesterday so it can't leak today's value into the feature."

---

## PART 5 - Full ML pipeline, way A: Spark MLlib (scales to big data)

**Task: churn classifier in the Databricks-native way.**
```python
from pyspark.ml import Pipeline
from pyspark.ml.feature import StringIndexer, OneHotEncoder, VectorAssembler, StandardScaler
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.evaluation import BinaryClassificationEvaluator

data = spark.table("retail.customer_features")     # recency, frequency, avg_basket, region, churned...

# 1. encode a categorical
idx = StringIndexer(inputCol="region", outputCol="region_idx", handleInvalid="keep")
ohe = OneHotEncoder(inputCols=["region_idx"], outputCols=["region_oh"])

# 2. assemble all features into one vector column (MLlib needs this)
num = ["recency", "frequency", "avg_basket", "fuel_freq", "tenure_months"]
asm = VectorAssembler(inputCols=num + ["region_oh"], outputCol="features_raw")
scl = StandardScaler(inputCol="features_raw", outputCol="features")

# 3. the model
lr = LogisticRegression(featuresCol="features", labelCol="churned", weightCol=None)

pipe = Pipeline(stages=[idx, ohe, asm, scl, lr])

train, test = data.randomSplit([0.75, 0.25], seed=42)
model = pipe.fit(train)
pred = model.transform(test)

auc = BinaryClassificationEvaluator(labelCol="churned",
        rawPredictionCol="rawPrediction", metricName="areaUnderROC").evaluate(pred)
print("Test AUC:", round(auc, 3))
```

**Read the coefficients:**
```python
lr_model = model.stages[-1]
coefs = list(zip(num + ["region_oh"], lr_model.coefficients.toArray().round(3)))
print("intercept:", round(lr_model.intercept, 3))
for name, c in coefs:
    print(name, c)
```
Example output:

| feature | coefficient | reading |
|---|---|---|
| recency | 0.91 | biggest positive driver of churn |
| frequency | -0.60 | frequent visitors churn far less |
| avg_basket | -0.27 | bigger baskets, lower churn |
| fuel_freq | -0.39 | regular fuel buyers stick |
| tenure_months | -0.21 | longer-tenured stick |

Test AUC: 0.86

Narrate: "Same story as a sklearn logistic regression, positive coefficient means it pushes churn up. Recency dominates. AUC 0.86, strong ranking. MLlib needs the features rolled into one vector column, that's the VectorAssembler step, which is the main difference from sklearn."

---

## PART 6 - Full ML pipeline, way B: pandas + sklearn (the fallback for smaller data)
If the data fits in memory (very often true), pull it to pandas and use the sklearn you already know:
```python
pdf = spark.table("retail.customer_features").toPandas()   # Spark to pandas

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report

X = pdf[["recency","frequency","avg_basket","fuel_freq","tenure_months"]]
y = pdf["churned"]
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)

clf = Pipeline([("scale", StandardScaler()),
                ("lr", LogisticRegression(class_weight="balanced", max_iter=1000))]).fit(Xtr, ytr)

proba = clf.predict_proba(Xte)[:,1]
print("AUC:", round(roc_auc_score(yte, proba), 3))
print(classification_report(yte, (proba>=0.5).astype(int)))
```
Narrate the judgment call: "If it fits on the driver, pandas plus sklearn is faster to iterate and I keep the full sklearn toolkit. I move to MLlib only when the data outgrows a single machine. Deciding that, memory, is the real skill, not the syntax."

---

## PART 7 - MLflow (Databricks-native experiment tracking, worth a mention)
```python
import mlflow
mlflow.pyspark.ml.autolog()      # or mlflow.sklearn.autolog()

with mlflow.start_run(run_name="churn_lr_v1"):
    model = pipe.fit(train)
    auc = BinaryClassificationEvaluator(labelCol="churned",
            metricName="areaUnderROC").evaluate(model.transform(test))
    mlflow.log_metric("test_auc", auc)
```
One-liner: "MLflow logs each run's params, metrics and the model artefact automatically, so experiments are comparable and the model is versioned in the registry. That's how you track and promote models on Databricks."

---

## PART 8 - Performance and correctness (say these, they sound fluent)
```python
big.join(F.broadcast(small), "key")     # broadcast the small side to avoid shuffling the big one
df.repartition("site_id")               # control parallelism / partitioning
df.cache()                              # keep a reused dataframe in memory across actions
df.explain()                            # see the physical plan; look for shuffles/exchanges
```
- **Shuffle** = data moving across the cluster for a join or groupBy; the expensive op. Minimise by filtering early and broadcasting small tables.
- **Skew** = one key with far more rows overloads one task; fix with salting or AQE.
- **Small-files problem** = too many tiny files slow reads; fix with OPTIMIZE.
- **Lazy**: transformations build a plan, only an action runs it, so Spark optimises the whole thing first.

---

## PART 9 - Likely panel questions (tight answers)
- *"pandas or PySpark for this?"* to "Memory. Fits on one machine to pandas, faster to iterate. Outgrows it to PySpark to distribute. My current scale is the pandas world; my VCDI pipeline was over that line."
- *"What's a shuffle?"* to "Data moving across the cluster for a join or groupBy; the costly step. I filter early and broadcast small tables to cut it."
- *"How do you do an incremental load?"* to "MERGE on the business key, atomic and idempotent, so re-runs are safe. replaceWhere for whole-partition overwrites."
- *"Why Delta over Parquet?"* to "Parquet is just files. Delta adds a transaction log, so you get ACID, upserts, schema enforcement and time travel."
- *"How do you deploy a model here?"* to "Track it with MLflow, register it, and serve or batch-score from the registry; monitor the metric and retrain on drift."
- *"Feature engineering at scale?"* to "Window functions for lags and rolling averages, careful to shift the window so I don't leak the target."

---

## PART 10 - The mindset
1. **Spark SQL first** if you can, it's your strength and fully valid in a notebook.
2. **PySpark is pandas with different verbs**, narrate the plan and it flows.
3. **For ML, decide pandas-plus-sklearn vs MLlib on memory**, and say why.
4. **Hold the honest line once** (internship hands-on, concepts strong, fast learner), then just do the work. You already cleared this bar by being straight in round one.
