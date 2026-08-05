# 7-Eleven - Rigorous Q&A + MCQ Bank (close-call questions)

> A hard self-test across the whole surface: scenario questions with model answers, then MCQs designed so the wrong options are **plausible, not obvious**. Do the MCQs first with the answer key hidden, then check Part C, every answer explains why the tempting distractors fail. Sections: A) scenarios, B) MCQs (stats/metrics, ML, forecasting, SQL, Python, Databricks/PySpark, experimentation), C) answer key.

---

# PART A - SCENARIO QUESTIONS (model answers inline)

**A1. Pricing.** A site is losing volume to a competitor 3c cheaper across the road. Do you match, and how do you decide?
> Don't guess, and don't look at fuel alone. Fuel demand is inelastic but station choice is very elastic, so I'd estimate this site's elasticity versus that competitor, model the volume I'd win back at various price gaps, and weigh the extra volume (and its shop basket) against the margin per litre I'd give up. Optimise **total profit = fuel margin x volume + basket**. Then I wouldn't roll it out blind, I'd confirm with a geo test and difference-in-differences, guardrailed on margin.

**A2. Experiment.** You ran a promo at 30 sites, no control group, and volume rose 8%. Leadership wants to scale it. Your reaction?
> 8% versus what? With no control I can't separate the promo from what would have happened anyway (weather, price cycle, seasonality). Before scaling I'd want a proper read: ideally re-run it as a matched-control geo test with difference-in-differences, or at minimum compare against similar untreated sites over the same window. A number with no counterfactual isn't evidence.

**A3. Forecasting.** Your demand model has 6% MAPE in backtest but is badly off in production. First hypotheses?
> Three usual suspects: (1) a broken or non-time-based split that leaked the future in backtest, so 6% was never real; (2) drift, the world changed since training (a new competitor, a price regime shift); (3) a feature that isn't available at prediction time in production but was in backtest. I'd check the validation method first, then compare feature distributions train versus live.

**A4. Model diagnosis.** A churn model shows 94% accuracy. The business says it's useless. Explain and fix.
> 94% accuracy on rare churn is a red flag, not a win, predicting "nobody churns" already scores high. I'd look at recall and precision on the churn class and the confusion matrix; almost certainly recall is low. Fixes in order: right metric (precision/recall/F1/PR-AUC), tune the threshold, class weights for imbalance, then features. And if the action is a discount, the real target is uplift, not churn.

**A5. Causal.** Two dashboards show fuel volume and ice-cream sales both rising together. A stakeholder says fuel drives ice cream. Your response?
> That's a correlation, and there's an obvious confounder: hot weather lifts both driving and ice cream. I wouldn't claim causation from co-movement. To test whether fuel traffic actually drives shop sales, I'd need a controlled comparison, for example variation in fuel traffic that isn't caused by weather, or an experiment.

**A6. Data quality.** You're handed a new client's transaction file to model. What's your first hour?
> Profiling before modelling: row and null counts per column, data types, duplicates, date ranges (gaps, future dates), obvious outliers, and whether categories/units are consistent. I'd reconcile totals against something known. Most of the value and most of the traps are here, not in the model.

**A7. LLM eval.** How would you check an LLM report generator is accurate before it reaches a client?
> The numbers come from queries, not the model, and an independent QA agent with no context of the generation re-derives them and checks they match, with a human sign-off. To measure quality over time I'd keep a golden set and track the QA pass rate and human-correction rate, plus groundedness and format validity, not vibes.

**A8. Segmentation to action.** You cluster customers into 4 groups. Marketing asks "so what?" How do you make it useful?
> A segmentation is only useful if it changes an action. I'd profile each cluster on the drivers (frequency, basket, recency, shop ratio), name them (Champions, fuel-only, shop-led, lapsing), and attach a distinct play to each: protect Champions, cross-sell the fuel-only group, target the lapsing group with a retention offer, ideally chosen by uplift. Clusters without actions are just colours on a chart.

---

# PART B - MCQs (pick one; answers in Part C)

## B1. Stats & metrics

**Q1.** A fraud model has AUC 0.94 but precision 0.20 at its operating threshold. Which is the best interpretation?
- A) The model is broken; AUC and precision contradict each other.
- B) The ranking is strong, but at that threshold most flags are false positives, expected when fraud is rare.
- C) You should switch from AUC to accuracy to get a clearer picture.
- D) Precision of 0.20 means the model is worse than random.

**Q2.** You increase a classifier's decision threshold from 0.5 to 0.8. Which is guaranteed?
- A) Precision goes up and recall goes down.
- B) Precision goes up, recall stays the same.
- C) Recall goes up, precision goes down.
- D) Precision cannot decrease and recall cannot increase.

**Q3.** A p-value of 0.03 means:
- A) There's a 3% chance the null hypothesis is true.
- B) There's a 97% chance the effect is real.
- C) If the null were true, data this extreme would occur about 3% of the time.
- D) The effect size is large.

**Q4.** Your A/B test on 2 million users finds a 0.05% lift, p < 0.001. Best call?
- A) Ship it; it's highly significant.
- B) It's statistically significant but likely not practically meaningful; weigh against cost.
- C) Reject it; the lift is negative in practice.
- D) Re-run because p < 0.001 is suspicious.

**Q5.** For a heavily imbalanced positive class (1%), which metric is most informative?
- A) ROC-AUC
- B) Accuracy
- C) PR-AUC
- D) Specificity

**Q6.** Mean daily basket is 18 dollars, median is 12. What does this tell you?
- A) The data is left-skewed.
- B) A few large baskets pull the mean up; distribution is right-skewed.
- C) There's a data error; mean should equal median.
- D) Most customers spend 18 dollars.

## B2. ML concepts

**Q7.** Training accuracy 0.98, validation accuracy 0.71. The single best first move?
- A) Collect more features.
- B) Increase model complexity.
- C) Add regularisation / reduce complexity.
- D) Lower the decision threshold.

**Q8.** L1 (Lasso) vs L2 (Ridge). Which is true?
- A) L1 shrinks all weights smoothly toward zero but never to exactly zero.
- B) L2 can set some weights to exactly zero, doing feature selection.
- C) L1 can set some weights to exactly zero; L2 shrinks all weights but keeps them non-zero.
- D) They are identical except for computation speed.

**Q9.** You use SMOTE on an imbalanced dataset then evaluate with cross-validation. The subtle trap is:
- A) SMOTE always overfits.
- B) If you SMOTE before splitting, synthetic points leak between train and validation folds, inflating scores.
- C) SMOTE only works for regression.
- D) SMOTE removes the need for class weights.

**Q10.** Which best describes a random forest vs gradient boosting?
- A) Both build trees sequentially, each correcting the last.
- B) Random forest builds independent trees in parallel and averages; boosting builds trees sequentially, each correcting the previous errors.
- C) Boosting builds independent trees; random forest builds them sequentially.
- D) They are the same, just different libraries.

**Q11.** "Parameters" vs "hyperparameters":
- A) Parameters are set before training; hyperparameters are learned.
- B) Parameters are learned from data; hyperparameters are chosen before training and tuned.
- C) Both are learned from data.
- D) Hyperparameters are the model's weights.

**Q12.** A logistic regression coefficient for a scaled feature is 0.69. The odds ratio is closest to:
- A) 0.69
- B) 1.0
- C) 2.0
- D) 0.5

## B3. Forecasting

**Q13.** Why is a random train/test split wrong for time-series forecasting?
- A) It's fine, random splits always work.
- B) It leaks future information into training and inflates the score.
- C) It makes the model underfit.
- D) It changes the seasonality.

**Q14.** A series is "stationary" when:
- A) It has a strong upward trend.
- B) Its statistical properties (mean, variance) are roughly constant over time, no trend or drifting seasonality.
- C) It has no seasonality but can trend.
- D) It has been log-transformed.

**Q15.** In ARIMA(p, d, q), the "d" is:
- A) The number of past values (autoregression) used.
- B) The number of past errors (moving average) used.
- C) The number of times the series is differenced to make it stationary.
- D) The seasonal period.

**Q16.** You add sea-freight price as a Prophet regressor to forecast 3 months ahead. The catch is:
- A) Prophet can't take regressors.
- B) You need the regressor's future values over the forecast horizon, which you may not have.
- C) Regressors always cause overfitting.
- D) It only works with daily data.

## B4. SQL

**Q17.** You LEFT JOIN orders to customers and add `WHERE customers.region = 'VIC'`. The effect:
- A) Keeps all orders, NULL region where no customer.
- B) Silently behaves like an INNER JOIN, dropping orders with no matching customer.
- C) Syntax error.
- D) Keeps only orders with no customer.

**Q18.** To get exactly one row per customer (their latest order), the safest is:
- A) `RANK() OVER (PARTITION BY customer ORDER BY date DESC) = 1`
- B) `DENSE_RANK() ... = 1`
- C) `ROW_NUMBER() OVER (PARTITION BY customer ORDER BY date DESC) = 1`
- D) `GROUP BY customer` with `MAX(date)`

**Q19.** Which WHERE clause is sargable (can use an index on order_date)?
- A) `WHERE YEAR(order_date) = 2026`
- B) `WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01'`
- C) `WHERE CAST(order_date AS DATE) = '2026-01-01'`
- D) `WHERE DATEDIFF(day, order_date, GETDATE()) < 30`

**Q20.** `COUNT(*)` vs `COUNT(column)`:
- A) Identical always.
- B) `COUNT(*)` counts all rows; `COUNT(column)` counts non-NULL values of that column.
- C) `COUNT(column)` counts all rows including NULLs.
- D) `COUNT(*)` ignores NULLs.

**Q21.** Logical execution order, so you can't reference a SELECT alias in WHERE:
- A) SELECT runs before WHERE.
- B) WHERE runs before SELECT, so the alias doesn't exist yet.
- C) They run simultaneously.
- D) You actually can reference it in WHERE.

## B5. Python / pandas

**Q22.** `df.groupby('k')['v'].transform('mean')` vs `df.groupby('k')['v'].mean()`:
- A) Identical output.
- B) `transform` returns a Series aligned to the original rows (same length); `mean` returns one value per group.
- C) `mean` returns the original length; `transform` aggregates.
- D) Neither works on grouped data.

**Q23.** Why can chained indexing like `df[df.a > 0]['b'] = 1` fail silently?
- A) It always raises an error.
- B) It may assign to a temporary copy, not the original; use `.loc[df.a > 0, 'b'] = 1`.
- C) pandas doesn't support boolean masks.
- D) It only fails on integer columns.

**Q24.** Fastest for a row-wise arithmetic on a big DataFrame:
- A) A Python `for` loop over rows.
- B) `df.apply(func, axis=1)`
- C) Vectorised column operations (`df['a'] * df['b']`).
- D) `iterrows()`

## B6. Databricks / PySpark / Delta

**Q25.** In PySpark, when does `df.filter(...).select(...)` actually execute?
- A) Immediately when the line runs.
- B) Only when an action like `.show()`, `.count()`, or `.write` is called.
- C) After 60 seconds.
- D) When you call `.cache()`.

**Q26.** Which pair are both wide transformations (cause a shuffle)?
- A) `filter`, `select`
- B) `withColumn`, `filter`
- C) `groupBy`, `join`
- D) `select`, `drop`

**Q27.** You join a 2-billion-row table to a 5,000-row lookup. Best move:
- A) `df.join(lookup, "key")` and hope.
- B) `df.join(F.broadcast(lookup), "key")` to avoid shuffling the big table.
- C) Broadcast the big table.
- D) `repartition(2000)` the big table first.

**Q28.** What does Delta's `MERGE` give you that a plain insert doesn't?
- A) Faster reads only.
- B) Atomic upsert (update matched, insert new), enabling idempotent incremental loads.
- C) Automatic feature scaling.
- D) It deletes the table first.

**Q29.** Delta = Parquet plus:
- A) A compression codec.
- B) A transaction log, giving ACID, time travel, and MERGE.
- C) An index only.
- D) A different file format entirely.

**Q30.** One key has 90% of the rows; a groupBy is very slow with one straggler task. This is:
- A) The small-files problem; run OPTIMIZE.
- B) Data skew; fix with salting or AQE skew handling.
- C) A broadcast failure.
- D) Underfitting.

**Q31.** `df.collect()` on a 500 GB dataframe will:
- A) Efficiently stream to disk.
- B) Pull all data to the driver and likely crash it with OOM.
- C) Distribute across executors.
- D) Trigger a lazy plan only.

**Q32.** `repartition(10)` vs `coalesce(10)`:
- A) Identical.
- B) `repartition` does a full shuffle and can increase or decrease partitions; `coalesce` avoids a full shuffle and only reduces them.
- C) `coalesce` always shuffles more.
- D) `repartition` can only reduce partitions.

## B7. Experimentation / causal

**Q33.** Difference-in-differences works because:
- A) It randomises customers.
- B) The control group cancels out what would have happened anyway, isolating the treatment effect, assuming parallel trends.
- C) It only needs the treated group.
- D) It requires no assumptions.

**Q34.** You want to test a personalised in-app discount. The best experimental unit:
- A) Geo/store-level test.
- B) Randomise customers into treatment and a held-back control, since the discount is delivered per person.
- C) Before/after on all customers.
- D) A pre/post at one store.

**Q35.** Choosing control stores for a geo pricing test, the biggest risk to avoid:
- A) Picking stores far away.
- B) Picking stores so close they share customers (contamination), polluting the control.
- C) Matching on pre-period trend.
- D) Using too many controls.

**Q36.** You rank customers by predicted churn to allocate a discount budget. The flaw:
- A) None, churn ranking is optimal.
- B) You want uplift (who the discount changes), not churn; the highest-churn customers may be unsavable.
- C) You should rank by recall.
- D) Churn models can't produce probabilities.

---

# PART C - ANSWER KEY (with why the close ones fail)

**Q1: B.** AUC measures ranking across all thresholds; precision is at one operating point. With rare fraud, many flags are false positives even with great ranking, no contradiction. (A wrong: they measure different things. C wrong: accuracy is worse under imbalance. D wrong: 0.20 precision can still be far above the ~1% base rate.)

**Q2: A.** Raising the threshold makes the model more conservative: fewer positives predicted, so precision tends up and recall down. (D is too absolute, "cannot" is wrong at edge cases, but A is the intended and generally-true direction.)

**Q3: C.** A p-value is P(data this extreme | null true). (A and B are the classic misinterpretations, the p-value is not the probability the null is true. D wrong: significance is not effect size.)

**Q4: B.** Significant thanks to huge n, but 0.05% is likely too small to matter commercially. Separate statistical from practical significance. (A ignores practical size; C invents a negative; D misreads p.)

**Q5: C.** PR-AUC focuses on the rare positive class; ROC-AUC can look flatteringly high under heavy imbalance. (B accuracy is useless here; A is the tempting-but-worse choice; D alone isn't enough.)

**Q6: B.** Mean above median means a right tail (a few big spenders). (A is backwards; C is false; D confuses mean with typical.)

**Q7: C.** Big train-vs-validation gap is overfitting; reduce complexity or regularise. (A and B would make overfitting worse; D doesn't address generalisation.)

**Q8: C.** L1 can zero out weights (selection); L2 shrinks all but keeps them non-zero. (A and B swap them.)

**Q9: B.** SMOTE before the split leaks synthetic neighbours across folds, inflating validation scores. SMOTE only inside the training fold. (A too absolute; C false; D false.)

**Q10: B.** RF = parallel independent trees, averaged (bagging); boosting = sequential, each correcting prior errors. (A, C swap; D false.)

**Q11: B.** Parameters learned; hyperparameters chosen and tuned. (A swaps; C, D false.)

**Q12: C.** Odds ratio = exp(coef) = exp(0.69) is about 2.0. (A confuses coef with odds ratio; B is exp(0); D is exp(-0.69).)

**Q13: B.** Random split lets the model see the future during training, inflating the score. Use time-based splits. (A false; C, D irrelevant.)

**Q14: B.** Stationary = constant statistical properties over time. (A, C describe non-stationary; D is unrelated.)

**Q15: C.** d = differencing order. (A is p, B is q, D is the seasonal period s.)

**Q16: B.** A future-dated regressor needs future values you may not have; use forward views or lag it. (A false, Prophet takes regressors; C, D false.)

**Q17: B.** A filter on the right table in WHERE turns a LEFT JOIN into an effective INNER JOIN; put it in the ON clause to preserve outer rows. (A is what people expect but it's wrong here.)

**Q18: C.** ROW_NUMBER gives exactly one row even on ties; RANK/DENSE_RANK can return multiple on a tie; MAX(date) with GROUP BY can duplicate if two orders share the max timestamp and you also select other columns. (A, B, D can all return more than one.)

**Q19: B.** A plain range on the raw column is sargable; wrapping the column in YEAR/CAST/DATEDIFF blocks the index. (A, C, D all wrap the column.)

**Q20: B.** `COUNT(*)` counts rows; `COUNT(col)` counts non-NULLs. (A, C, D false.)

**Q21: B.** WHERE executes before SELECT, so SELECT aliases don't exist yet (you can use them in ORDER BY, which runs after SELECT). (A backwards; C, D false.)

**Q22: B.** `transform` broadcasts the group value back to every original row (same length); `mean` returns one row per group. (A, C, D false.)

**Q23: B.** Chained indexing may write to a temporary copy (SettingWithCopy); use `.loc`. (A too absolute; C, D false.)

**Q24: C.** Vectorised column ops run in fast C; loops/apply/iterrows are far slower. (A, B, D are the slow options.)

**Q25: B.** Transformations are lazy; only an action triggers execution. (A false, that's eager; C, D false.)

**Q26: C.** groupBy and join need data reshuffled across the cluster; filter/select/withColumn/drop are narrow. (A, B, D are narrow.)

**Q27: B.** Broadcast the small lookup so the big table isn't shuffled. (A leaves a big shuffle; C is nonsense, you can't broadcast 2B rows; D doesn't fix the join.)

**Q28: B.** MERGE = atomic upsert, the basis of idempotent incremental loads. (A, C, D false.)

**Q29: B.** Delta = Parquet + a transaction log = ACID, time travel, MERGE. (A, C, D miss the log.)

**Q30: B.** One dominant key overloading one task is data skew; salt the key or use AQE skew handling. (A is a different problem; C, D unrelated.)

**Q31: B.** collect() pulls everything to the driver, OOM on 500 GB. Write to a table instead. (A, C, D false.)

**Q32: B.** repartition = full shuffle, up or down; coalesce = no full shuffle, reduce only. (A, C, D false.)

**Q33: B.** The control captures the counterfactual (what would have happened anyway), assuming parallel pre-trends. (A is a different design; C, D false, it does need parallel trends.)

**Q34: B.** The lever is per-customer (app), so randomise customers; geo is for board-price changes everyone sees. (A, C, D are weaker or biased designs.)

**Q35: B.** Controls that share customers get contaminated by the treatment, biasing DiD toward zero. (A is fine if matched; C is good practice; D isn't the main risk.)

**Q36: B.** Discount decisions need uplift, not churn; the surest churners may be unsavable, wasting budget. (A false; C, D false.)

---

## Score yourself
- **30+/36:** interview-ready on fundamentals; focus on delivery and cases.
- **24-29:** solid; drill the ones you missed, especially the SQL join trap, threshold-vs-AUC, and PySpark laziness/shuffle.
- **Below 24:** re-read the stats-ML revision and the two deep-prep sheets, then retake.

The five people miss most: **Q1 (AUC vs precision), Q9 (SMOTE leakage), Q17 (LEFT JOIN filter trap), Q25/26 (lazy + wide transformations), Q36 (uplift vs churn).** Nail those.
