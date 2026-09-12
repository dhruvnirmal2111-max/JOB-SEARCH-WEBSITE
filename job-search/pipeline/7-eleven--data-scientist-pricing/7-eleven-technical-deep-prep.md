# 7-Eleven - Technical Deep Prep (Hiring Team Edition)

> Written as if we (the 7-Eleven analytics hiring team) are walking you through the exact problems you'll face in the technical round, in **full runnable code**, with the **real output tables you'd see** (coefficients, standard errors, p-values, confusion matrices, metrics) and **how to read every number out loud**. Six complete worked cases: elasticity regression, a difference-in-differences price test, demand forecasting, a discount-targeting classifier, a SQL analytics battery, and customer segmentation. Golden rule you'll hear us repeat: **code it simply, narrate it, then interpret the numbers into a decision.**

Setup used across all cases:
```python
import pandas as pd, numpy as np
import statsmodels.formula.api as smf
import statsmodels.api as sm
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import (confusion_matrix, classification_report,
                             roc_auc_score, precision_recall_curve, roc_curve)
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
```

---

# CASE 1 - Fuel price elasticity (regression with a coefficient table)

**We ask:** "Here's daily volume and price data for a set of sites. How sensitive is our volume to price, and to the competitor's price? Model it and tell us what it means."

**The approach (say this first):** "Elasticity is a percentage-to-percentage relationship, so I'll model it in logs: log(volume) against log(our price) and log(competitor price). The coefficient on log(price) IS the elasticity, the percent change in volume for a 1 percent change in price. I'll control for day-of-week and holidays so I'm not picking up demand swings."

**Pull the data (SQL):**
```sql
SELECT s.site_id, s.date, s.litres,
       p.our_price, c.comp_price,
       DAYOFWEEK(s.date) AS dow,
       CASE WHEN h.date IS NOT NULL THEN 1 ELSE 0 END AS is_holiday
FROM sales s
JOIN prices p       ON s.site_id = p.site_id AND s.date = p.date
JOIN competitor c   ON s.site_id = c.site_id AND s.date = c.date
LEFT JOIN holidays h ON s.date = h.date;
```

**Full model code:**
```python
df = pd.read_sql(query, conn)                       # or spark.sql(...).toPandas()
df = df[(df.litres > 0) & (df.our_price > 0) & (df.comp_price > 0)]   # logs need positives

df['log_litres']     = np.log(df['litres'])
df['log_our_price']  = np.log(df['our_price'])
df['log_comp_price'] = np.log(df['comp_price'])

model = smf.ols(
    'log_litres ~ log_our_price + log_comp_price + C(dow) + is_holiday',
    data=df
).fit(cov_type='cluster', cov_kwds={'groups': df['site_id']})  # cluster SE by site
print(model.summary())
```

**The output you'd see (the key rows):**

| term | coef | std err | t | P>|t| | [0.025 | 0.975] |
|---|---|---|---|---|---|---|
| Intercept | 6.41 | 0.20 | 32.1 | 0.000 | 6.02 | 6.80 |
| **log_our_price** | **-1.83** | 0.21 | -8.7 | 0.000 | -2.24 | -1.42 |
| **log_comp_price** | **1.24** | 0.19 | 6.5 | 0.000 | 0.87 | 1.61 |
| is_holiday | 0.18 | 0.04 | 4.5 | 0.000 | 0.10 | 0.26 |

R-squared: 0.71

**How to read it out loud (the four beats):**
1. **What I see:** "Own-price elasticity is **-1.83**. A 1% price rise is linked to about a 1.8% drop in volume at that site. Cross-price elasticity is **+1.24**, so a 1% rise in the competitor's price lifts our volume ~1.2%."
2. **Is it real:** "Both are highly significant, p < 0.001, and the confidence intervals are well away from zero, so this isn't noise."
3. **So what:** "Volume is **elastic** (bigger than 1 in size), which fits fuel, station choice is very price-sensitive. And we're clearly competing head-to-head with that site: their price moves our volume almost as much as our own does."
4. **What I'd check next:** "This is observational, so the exact number could be confounded. I'd confirm the elasticity with a controlled geo test before pricing off it, and I'd optimise on **total profit = margin x volume + shop basket**, not volume alone."

**Panel follow-ups and your answers:**
- *"Why logs?"* to "So the coefficients read directly as elasticities, percent-for-percent, which is the natural language of pricing."
- *"Why cluster the standard errors by site?"* to "Days within a site are correlated, so plain standard errors would look falsely precise. Clustering by site gives honest confidence intervals."
- *"Elasticity of -1.8, do we raise or cut price?"* to "Elastic means a price cut can grow revenue, but revenue isn't the goal, profit is. I'd weigh margin per litre against volume plus the shop basket we lose when a fill-up walks. Then test it."

---

# CASE 2 - Did the price change actually work? (Difference-in-Differences)

**We ask:** "We cut price at 40 sites for a month and held 40 similar sites unchanged. Here's the data. Did the cut cause more volume, and by how much?"

**Approach:** "This is a causal question, so I'll use **difference-in-differences**. I compare the before-to-after change at the treated sites to the change at the control sites; the control cancels out anything that would have happened anyway, like weather or the price cycle. The number I care about is the **treated-x-after interaction** coefficient."

**Full code:**
```python
# df has: site_id, date, litres, treated (1/0), post (1/0 after the cut)
df['log_litres'] = np.log(df['litres'])

did = smf.ols(
    'log_litres ~ treated + post + treated:post + C(dow) + is_holiday',
    data=df
).fit(cov_type='cluster', cov_kwds={'groups': df['site_id']})
print(did.summary())
```

**Output (key rows):**

| term | coef | std err | t | P>|t| | [0.025 | 0.975] |
|---|---|---|---|---|---|---|
| treated | -0.02 | 0.03 | -0.7 | 0.48 | -0.08 | 0.04 |
| post | 0.04 | 0.02 | 2.0 | 0.05 | 0.00 | 0.08 |
| **treated:post** | **0.061** | 0.018 | 3.4 | 0.001 | 0.026 | 0.096 |

**Read it out loud:**
1. **What I see:** "The interaction, treated-x-after, is **0.061**. Because we're in logs, that's about a **6.3% lift in volume** caused by the price cut (`exp(0.061) - 1`), over and above what the control sites did."
2. **Is it real:** "p = 0.001, confidence interval 2.6% to 9.6%, so it's significant and doesn't cross zero. The `treated` coefficient is near zero and not significant, which is reassuring, the two groups were similar before the cut."
3. **So what:** "The cut genuinely drove volume. But the decision is about **profit**, so I'd combine this +6.3% volume with the lower margin per litre and the extra shop basket, and check the net."
4. **What I'd check:** "I'd verify the **parallel-trends** assumption, the two groups moved together before the cut, and confirm no spillover, the control sites weren't close enough for customers to cross over. And I'd run it long enough to rule out a novelty spike."

**Panel follow-up:** *"What's the key assumption?"* to "Parallel trends: absent the cut, treated and control would have moved together. I check it by plotting the pre-period, they should track."

---

# CASE 3 - Forecast demand per site (full pipeline + metrics table)

**We ask:** "Forecast daily litres per site a week ahead so we can plan deliveries and staffing. Build it and prove it's good."

**Approach:** "Forecasting problem. I'll build features from the drivers, use a time-based backtest (never random, that leaks the future), and it only counts as good if it beats a **seasonal-naive baseline**, measured with WMAPE."

**Full code (LightGBM on lag features, the modern tabular approach):**
```python
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error

df = df.sort_values(['site_id','date'])
# feature engineering
df['dow']   = df['date'].dt.dayofweek
df['month'] = df['date'].dt.month
for lag in [1, 7, 14]:                                  # yesterday, last week, two weeks
    df[f'lag_{lag}'] = df.groupby('site_id')['litres'].shift(lag)
df['roll7'] = df.groupby('site_id')['litres'].shift(1).rolling(7).mean()  # last-7 avg, no leak
df = df.dropna()

features = ['dow','month','is_holiday','our_price','comp_price','lag_1','lag_7','lag_14','roll7']
# time-based split: train on the past, test on the most recent 4 weeks
cutoff = df['date'].max() - pd.Timedelta(days=28)
train, test = df[df.date <= cutoff], df[df.date > cutoff]

m = lgb.LGBMRegressor(n_estimators=500, learning_rate=0.05, num_leaves=31)
m.fit(train[features], train['litres'])
test = test.copy()
test['pred'] = m.predict(test[features])

# seasonal-naive baseline = same day last week
test['naive'] = test['lag_7']

def wmape(y, yhat):                                     # volume-weighted % error
    return np.sum(np.abs(y - yhat)) / np.sum(np.abs(y))

print("Model  WMAPE:", round(wmape(test.litres, test.pred ), 3))
print("Naive  WMAPE:", round(wmape(test.litres, test.naive), 3))
print("Model  MAE  :", round(mean_absolute_error(test.litres, test.pred), 1))
```

**Output / metrics table:**

| model | WMAPE | MAE (litres) | RMSE |
|---|---|---|---|
| Seasonal-naive (last week) | 14.8% | 640 | 910 |
| **LightGBM (lags + drivers)** | **8.2%** | 355 | 520 |

Top feature importances: `lag_7`, `roll7`, `lag_1`, `dow`, `our_price`.

**Read it out loud:**
1. **What I see:** "The model gets **8.2% WMAPE** versus **14.8%** for a seasonal-naive baseline, so it roughly halves the error. MAE of ~355 litres a day per site."
2. **Is it good:** "Good is defined by two things, beating the naive baseline, which it clearly does, and being inside operational tolerance for staffing and deliveries. 8% is usually workable."
3. **So what:** "The strongest signals are last-week volume and the 7-day average, so demand is highly habitual, plus day-of-week and our price. That's a usable, explainable forecast."
4. **What I'd check:** "Test set is the real future (time-based), so no leakage. I'd watch error by site (small rural sites are noisier), handle new sites with a similar-site average (cold start), and monitor WMAPE each week to catch drift."

**Panel follow-up:** *"Why not a random train/test split?"* to "It leaks the future into training and inflates the score. For time series you must train on the past and test on the future, and roll forward."

---

# CASE 4 - Who to target with a discount (classifier + coefficient / odds table)

**We ask:** "We want to send retention offers to lapsing customers. Build a model that scores who's likely to lapse, show us the metrics, and tell us how you'd actually use it."

**Approach:** "I'll build a baseline logistic regression for interpretable probabilities, evaluate with precision/recall and AUC (not accuracy, churn is imbalanced), and tune the threshold to the business cost. One important caveat I'll flag: if the action is a discount, the truly correct target is **uplift**, who a discount changes, not raw churn, but a churn model is a defensible first version."

**Full pipeline:**
```python
# df: recency (days since last visit), frequency (visits/wk), avg_basket,
#     fuel_freq, tenure_months, comp_within_2km (1/0), churned (1/0 target)
X = df[['recency','frequency','avg_basket','fuel_freq','tenure_months','comp_within_2km']]
y = df['churned']

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25,
                                          stratify=y, random_state=42)

pipe = Pipeline([
    ('scale', StandardScaler()),
    ('clf', LogisticRegression(class_weight='balanced', max_iter=1000))
])

# stratified CV so each fold keeps the churn ratio
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
print("CV AUC:", cross_val_score(pipe, X_tr, y_tr, cv=cv, scoring='roc_auc').mean().round(3))

pipe.fit(X_tr, y_tr)
proba = pipe.predict_proba(X_te)[:, 1]
pred  = (proba >= 0.5).astype(int)
```

**Metrics output:**
```python
print(confusion_matrix(y_te, pred))
print(classification_report(y_te, pred))
print("ROC-AUC:", round(roc_auc_score(y_te, proba), 3))
```

Confusion matrix (rows = actual, cols = predicted), churn base rate ~12%:

|  | pred stay | pred churn |
|---|---|---|
| **actual stay** | 6120 (TN) | 1380 (FP) |
| **actual churn** | 210 (FN) | 810 (TP) |

Classification report:

| class | precision | recall | f1 | support |
|---|---|---|---|---|
| stay (0) | 0.97 | 0.82 | 0.89 | 7500 |
| **churn (1)** | **0.37** | **0.79** | **0.50** | 1020 |
| accuracy | | | 0.81 | 8520 |

ROC-AUC: 0.86

**Coefficients as odds ratios (the interpretable table):**
```python
coefs = pipe.named_steps['clf'].coef_[0]
odds = pd.DataFrame({'feature': X.columns,
                     'coef': coefs.round(3),
                     'odds_ratio': np.exp(coefs).round(2)}
                   ).sort_values('odds_ratio', ascending=False)
print(odds)
```

| feature | coef | odds_ratio | reading |
|---|---|---|---|
| recency | 0.92 | 2.51 | each extra SD of days-since-visit multiplies churn odds by ~2.5 (biggest driver) |
| comp_within_2km | 0.34 | 1.40 | a competitor nearby raises churn odds ~40% |
| avg_basket | -0.28 | 0.76 | bigger baskets to lower churn odds |
| frequency | -0.61 | 0.54 | more frequent visitors churn far less |
| fuel_freq | -0.40 | 0.67 | regular fuel buyers stick |
| tenure_months | -0.22 | 0.80 | longer-tenured stick more |

**Read it out loud:**
1. **What I see:** "AUC 0.86, so the ranking is strong. Accuracy is 81%, but I'd ignore that, the number that matters is **churn recall 0.79** (we catch ~79% of real churners) at **precision 0.37** (of those we flag, ~37% truly churn). The odds ratios say **recency** is the dominant signal, then nearby competition; frequent, high-basket, regular-fuel customers churn least."
2. **The trade-off:** "At the 0.5 threshold we catch most churners but with a lot of false alarms. Whether that's right depends on cost: a retention offer is cheap, so **high recall is fine, we'd rather contact a few extra than miss a real churner.** If the offer were expensive I'd raise the threshold for precision."
3. **Threshold tuning (show it):**
```python
prec, rec, thr = precision_recall_curve(y_te, proba)
# pick the threshold that hits a target precision, say 0.5, to spend the budget better
import numpy as np
idx = np.argmax(prec >= 0.50)
print("threshold for ~50% precision:", round(thr[idx], 2))
```
4. **The senior caveat:** "For a **discount** decision, churn probability isn't quite the right target, I'd move to **uplift modelling** (who a discount actually changes) built off a randomised holdout, and rank by that. Churn scoring is a solid v1; uplift spends the budget optimally."
5. **What I'd check:** "Time-based validation to avoid leakage, watch for a feature that leaks the outcome, and monitor precision and incremental profit in production, not just AUC."

**Panel follow-ups:**
- *"Why class_weight balanced?"* to "Churn is ~12%, so without it the model just predicts 'stay'. Balancing penalises missing the minority."
- *"Odds ratio of 2.5 on recency means?"* to "Holding others fixed, a one-standard-deviation increase in days-since-last-visit multiplies the odds of churning by 2.5. It's the strongest driver."
- *"AUC is 0.86 but precision is only 0.37, contradiction?"* to "No. AUC says the ranking is good. Precision is low because churn is rare and I set a recall-friendly threshold. Different questions, ranking vs the operating point."

---

# CASE 5 - SQL analytics battery (queries + result tables)

**We ask:** rapid data questions. Write the query, then read the result.

**Q: Top 3 products by revenue per site.**
```sql
SELECT site_id, product, revenue FROM (
  SELECT site_id, product, SUM(amount) AS revenue,
         ROW_NUMBER() OVER (PARTITION BY site_id ORDER BY SUM(amount) DESC) AS rn
  FROM sales GROUP BY site_id, product
) t WHERE rn <= 3;
```

**Q: Week-over-week fuel volume growth per site.**
```sql
SELECT site_id, week, litres,
  (litres - LAG(litres) OVER (PARTITION BY site_id ORDER BY week)) * 1.0
   / LAG(litres) OVER (PARTITION BY site_id ORDER BY week) AS wow_growth
FROM weekly_volume;
```
Sample result:

| site_id | week | litres | wow_growth |
|---|---|---|---|
| 12 | 2026-07-06 | 41000 | null |
| 12 | 2026-07-13 | 43500 | 0.061 |
| 12 | 2026-07-20 | 42000 | -0.034 |

Read: "Site 12 grew 6.1% then dipped 3.4%. I'd check whether the dip lines up with a competitor price move before reading anything into it."

**Q: 30-day repeat-purchase rate (a cohort/retention style query).**
```sql
SELECT COUNT(DISTINCT CASE WHEN visits >= 2 THEN customer_id END) * 1.0
     / COUNT(DISTINCT customer_id) AS repeat_rate
FROM (
  SELECT customer_id, COUNT(*) AS visits
  FROM transactions
  WHERE date >= DATEADD(day, -30, CURRENT_DATE)
  GROUP BY customer_id
) t;
```

**Q: Average basket by fuel vs non-fuel visit.**
```sql
SELECT CASE WHEN bought_fuel = 1 THEN 'fuel' ELSE 'shop only' END AS visit_type,
       AVG(basket_value) AS avg_basket, COUNT(*) AS n
FROM visits GROUP BY bought_fuel;
```
Read: "If fuel visits have a bigger basket, that's the fuel-drives-shop story, and it's why we can't judge a fuel price move on fuel margin alone."

---

# CASE 6 - Customer segmentation (k-means, full code + interpretation)

**We ask:** "Segment our loyalty customers so marketing can target. Show your working."

**Approach:** "Unsupervised, so k-means. I'll **standardise first** (clustering is distance-based, so an unscaled dollar feature would dominate), pick k with the elbow and silhouette, then read the segments."

```python
feat = df[['fuel_freq','avg_basket','recency','shop_ratio']]
Xs = StandardScaler().fit_transform(feat)

# choose k
for k in range(2, 7):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(Xs)
    print(k, 'inertia', round(km.inertia_), 'silhouette', round(silhouette_score(Xs, km.labels_),3))

km = KMeans(n_clusters=4, n_init=10, random_state=42).fit(Xs)
df['segment'] = km.labels_
print(df.groupby('segment')[['fuel_freq','avg_basket','recency','shop_ratio']].mean().round(1))
```

Segment profile output:

| segment | fuel_freq | avg_basket | recency | shop_ratio | label |
|---|---|---|---|---|---|
| 0 | 3.2 | 48 | 4 | 0.7 | **Champions** (frequent, big basket, recent) |
| 1 | 2.8 | 22 | 6 | 0.2 | Fuel-only regulars |
| 2 | 0.6 | 35 | 9 | 0.8 | Shop-led, light fuel |
| 3 | 1.1 | 18 | 41 | 0.3 | **Lapsing** (haven't visited in weeks) |

**Read it out loud:**
1. **What I see:** "Four clean segments. Champions (frequent, high basket, recent), fuel-only regulars, shop-led customers, and a lapsing group at 41 days recency."
2. **So what:** "Each gets a different play: protect Champions, cross-sell shop to the fuel-only group, and the **lapsing** segment is exactly who a retention offer (and the uplift model in Case 4) should target."
3. **What I'd check:** "I picked k=4 from the elbow and the best silhouette. I'd sanity-check the segments make business sense, they do here, and re-run periodically as behaviour shifts."

---

# The through-line (say this in the room)
Every one of these is the same shape: **clarify the goal, write clean code, then turn the output into a decision and name the test.** Read coefficients as "size, direction, significance, so-what." Never stop at the number, always land on what we'd do and how we'd prove it. That's what we're hiring for.
