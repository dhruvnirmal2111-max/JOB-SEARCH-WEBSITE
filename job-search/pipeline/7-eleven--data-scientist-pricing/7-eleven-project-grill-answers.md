# 7-Eleven - Project Grill: Model Answers

> Model answers to the 10-per-project technical grilling on the 7-Eleven resume. Grounded in your real work, truthful, with the honest boundaries kept straight. Where a detail is marked **[confirm]**, slot in your real specifics before the interview. Pattern in every answer: **claim, one concrete detail, then a number or a trade-off, and stop.**

---

## Project 1 - Pricing & cost analytics, restaurant group (A$2M)

**1. How did you categorise ~3,000-3,500 items?**
A mix of Pareto and ML. I manually verified the high-value head (the ~20% of items that make up ~80% of spend) into clean categories as a trusted base, then clustered the long tail into buckets and labelled them. So the money-heavy items were hand-checked and the tail was grouped programmatically.

**2. How did you compute price movement without pack-size fooling you?**
I worked at **unit price, like-for-like at SKU level**, normalising to a common unit (per kg, per litre, per each), so a supplier moving from a 2kg to a 2.5kg pack didn't read as a price change. Then I compared the same SKU's unit price year over year.

**3. How did you separate a real cost rise from a bad deal?**
I **benchmarked the move against the market**, against a commodity or category input-cost trend. If a supplier's unit price rose well above the market move, that's a renegotiation target; if it tracked the market, it's a genuine pass-through. The gap is the signal.

**4. How was the A$2M / ~30% attributed to your work?**
It was **realised, not modelled**: the client took my analysis (the flagged over-market suppliers in their largest category) straight into a renegotiation and captured close to A$2M that year. Validated by the business outcome, not just my dashboard.

**5. What was your unit of comparison, and the same item across venues?**
SKU-level unit price, rolled up by category, venue and supplier. The same item bought at different venues or prices was compared on unit price, so I could show one product costing more at a given venue or from a given supplier.

**6. What did the dashboard run on?**
Data prep and the price-movement logic in **Python (pandas, numpy) and SQL**, surfaced through a **[confirm: Tableau / Power BI]** dashboard sliced by product, venue and supplier so category managers could self-serve.

**7. Concrete SQL, YoY unit price per SKU?**
A window function: `LAG(unit_price) OVER (PARTITION BY sku ORDER BY year)` to pull the prior year's unit price onto the same row, then `(unit_price - prev) / prev` for the movement. Filter to SKUs present in both years for a true like-for-like.

**8. Messy invoice data, names, units, currencies?**
A cleaning layer: normalised item names, converted everything to a **common unit** for the like-for-like, standardised currency, and dropped or flagged rows that failed validation. This is most of the work before any analysis.

**9. Statistically validated or descriptive? (be honest)**
Mostly **descriptive and commercial analytics** (price movement, benchmarking, category rollups) plus ML for the categorisation. I won't dress it up as causal inference; the value was surfacing where cost had crept above market, and the proof was the realised saving.

**10. What did you lead with to the CFO?**
One number they knew: their largest category's cost had crept ~30% above market with one supplier. I anchored it on a familiar item (for example mozzarella), walked the unit-price creep step by step, then showed the category total. A familiar example first is what earns trust.

---

## Project 2 - ML spend classifier (~A$12B)

**1. Why one-vs-all logistic regression?**
With ~100 categories, a single multi-class model degrades and is hard to tune per class. **One-vs-all** (a yes/no model per category) handles many categories and heavy imbalance better and lets me tune each category's threshold independently.

**2. Explain TF-IDF from scratch.**
Term Frequency times Inverse Document Frequency turns text into numbers by weighting each word by how often it appears in a description (TF) against how rare it is across all descriptions (IDF). Common words get low weight, distinctive words high, so "mozzarella" carries more signal than "the".

**3. Why move to embeddings?**
TF-IDF matches on exact words and misses meaning. **Embeddings** are dense vectors that capture semantics, so "taxi" and "cab", or two differently-worded descriptions of the same thing, sit close in vector space. Better for messy, inconsistent invoice text.

**4. How did you set the threshold? (careful with AUC)**
From the **precision-recall trade-off**, not AUC. AUC is threshold-independent: it tells me the ranking is good, not where to cut. I set the cutoff (~0.75) at the precision the client needed for auto-labelling, and routed everything below it to manual review.

**5. Class weights vs resampling?**
**Class weights** (`class_weight='balanced'`): it uses all the data, penalises minority-class errors more, and avoids the synthetic-noise and leakage risks of SMOTE or the information loss of undersampling. Simpler and robust for this text problem.

**6. How did you cross-validate with imbalance?**
**Stratified k-fold**, so each fold preserves the class proportions; a plain random k-fold could hand a rare category zero positives in a fold. Tuned with GridSearchCV inside that.

**7. Precision/recall/F1 over accuracy, the failure mode of accuracy?**
With ~100 imbalanced categories, a model that just predicts the majority class scores high accuracy and is useless. Precision (of what I auto-labelled, how much was right) and recall (of a category, how much I caught), summarised by F1, actually reflect performance.

**8. A category with only a handful of examples?**
Keep it on **manual review** rather than trust a model trained on almost nothing; fold its examples into a broader parent category; or lean on embeddings' semantic similarity. Don't pretend to predict a class you can't learn.

**9. Feature engineering beyond text?**
**Spend value and line count** alongside the text features: a category's typical transaction size and frequency are genuinely discriminative (for example utilities vs consumables), and they help where the description alone is ambiguous.

**10. In production, how do you know it's still accurate, and when retrain?**
Log **precision each refresh cycle**; if it dips or the category mix drifts, retrain. Testing showed a **3-month cadence** was the sweet spot, and the documented pipeline is reused across clients. Monitor, detect drift, retrain on a trigger, not ship-and-forget.

---

## Project 3 - Demand forecasting, fresh produce (Prophet)

**1. Why Prophet over ARIMA or LightGBM?**
Prophet handles **trend, seasonality and holidays out of the box, takes external regressors, and is robust to missing data**, so it got to a strong result fast on a clearly seasonal series. I'd benchmark LightGBM-on-lags if there were strong non-linear interactions, but Prophet fit the problem and was interpretable for the client.

**2. How does Prophet decompose a series?**
An additive model: **trend + seasonality + holidays + regressors + noise**. It fits a piecewise-linear (or logistic) trend with automatic changepoints and models seasonality with Fourier terms, so you can read each component.

**3. The trap: a 3-month horizon needs future regressor values, how did you get them?**
Fair, that's the real challenge. Options I used or considered: **forward or futures curves** for freight and commodity input prices, the **client's own procurement projections**, or **lagged regressors** so the model only needs values known at forecast time. **[confirm which you actually used].** The honest point: you can't use a future-dated regressor you don't have, so you either source a forward view or lag it.

**4. How did you backtest, and why not a random split?**
A **rolling-origin (time-based) backtest**: train on the past, predict the next window, roll forward. A random split leaks future information into training and inflates the score, which is meaningless for a forecast.

**5. What error metric, and is 12.5-14% good, versus what baseline?**
**MAPE / WMAPE** for a business-readable percentage error, plus RMSE. 12.5-14% is only "good" relative to a **seasonal-naive baseline** and the client's planning tolerance; it beat both, which is what made it usable for 3-month inventory planning.

**6. Did you beat seasonal-naive, by how much?**
Yes; seasonal-naive (last year's same period) is the bar I measured against, and the Prophet model with regressors came in materially under it and inside tolerance. **[confirm the exact delta if asked].**

**7. Changepoints, did you tune flexibility?**
Prophet auto-detects trend changepoints; the lever is `changepoint_prior_scale`: too high overfits wiggles, too low underfits real shifts. I tuned it via the backtest rather than eyeballing.

**8. Data prep, missing weeks, outliers, holidays?**
pandas prep: reindexed to a regular frequency, handled gaps, capped or flagged obvious outliers, and passed holidays to Prophet's holiday component so seasonal spikes weren't misread as trend.

**9. Overfitting risk with many regressors?**
A real risk. I kept regressors to ones with a **causal story** (freight, input prices), watched the backtest gap, and dropped any that helped in-sample but not out-of-sample. Fewer, meaningful regressors over a kitchen sink.

**10. If they wanted a prediction interval?**
Prophet gives **uncertainty intervals** natively (from trend and observation noise). I'd report the interval alongside the point forecast so planners can size safety stock to the upper bound, not just the mean.

---

## Project 4 - Reporting automation (LLM workflow)

**1. Architecture, steps from output to report?**
Analytics outputs (numbers from client databases) feed a generation step that drafts the report, then an **independent QA step** that re-checks the numbers, then a **human sign-off**, then send. Structured, staged, with a gate before anything goes out.

**2. The QA step, what does it check, how independent?**
A **separate QA agent with no context of the generation pipeline** re-derives the key numbers from source and checks they match the drafted report. Independence is the point: it can't inherit the generator's mistakes.

**3. How do you verify numbers aren't hallucinated?**
The numbers are **pulled from the client database**, not invented by the model, and the QA agent **re-derives and cross-checks** them before sign-off. The LLM writes the narrative; the data comes from queries.

**4. How do you evaluate quality, gold set or vibes?**
**Gold and eval checks**: known-good outputs the pipeline is tested against, plus structured checks so outputs are testable rather than judged by feel. Not vibes.

**5. What model, and how do you get structured output?**
**[confirm model]** with **structured tool calls / schema-constrained output**, so the report fields come back in a fixed, machine-checkable shape rather than free text.

**6. Human-in-the-loop, where does it sit?**
A final **sign-off before send**: a person reviews the QA-passed draft and approves. The automation drafts and checks; a human still authorises.

**7. What happens when the LLM gets a number wrong?**
The **QA agent catches the mismatch** against source before the human step, so it's flagged and corrected before a client ever sees it. That's the whole reason for an independent checker.

**8. How is it deployed and run?**
**[confirm: scheduled / on-demand, where it runs].** It runs across the analyst team's accounts and produces the draft for review each cycle.

**9. Biggest failure mode, and mitigation?**
**Confident-but-wrong numbers.** Mitigation: numbers come from queries not the model, an independent QA re-derivation, and a human gate; defence in depth, not trust in one model call.

**10. How would you know it degraded across 25-30 accounts?**
Track **QA pass/fail rate and human-correction rate** over time; a rise in either flags degradation. Same monitor-and-alert discipline as a production model.

---

## Project 5 - VCDI distributed anomaly detection (Databricks/PySpark)

**1. What method, and why?**
**Statistical anomaly detection** on supplier-payment patterns: flagging payments far outside the normal distribution for a supplier or category (z-score / IQR style), which is interpretable for auditors. **[confirm if you used isolation forest instead].**

**2. What defines an anomaly in procurement data?**
An **unusual supplier payment**: a value, frequency or pattern well outside that supplier or category's historical norm (a sudden spike, a duplicate-looking payment, an off-trend amount).

**3. Why distributed / PySpark?**
The dataset was **too large to screen on a single machine**, so I distributed the compute across a Databricks cluster with PySpark to process it in parallel.

**4. "20% improvement" over what, measured how without labels? (the catch)**
Honest framing: it was measured against the **prior rule-based screening approach**, on an **analyst-reviewed sample**. Of the items flagged, a ~20% higher share were confirmed genuine anomalies by the reviewing analysts (precision of flags) versus the old method. **[confirm your real baseline and number].** Don't claim a labelled ground truth you didn't have.

**5. If no labels, how did anyone validate flags?**
**Analyst and domain-expert review** of a sample of flagged items: they confirmed true vs false positives, which is how the precision comparison was made. Human-in-the-loop validation stands in for labels.

**6. Expensive operations / shuffles?**
The **group-bys and joins** to build per-supplier baselines were the shuffle-heavy steps. I minimised them by filtering early and aggregating thoughtfully, since shuffles move data across the cluster and dominate cost.

**7. "Scalable transformation layers" concretely?**
Staged PySpark transformations: raw ingest, then cleaned and normalised, then per-supplier aggregate features, then scoring. Each layer was built to run distributed over the full dataset, not a sample.

**8. Keeping false positives manageable?**
Tune the anomaly threshold to the review capacity: too sensitive and you drown analysts. I set it so the flagged volume was reviewable and prioritised by severity.

**9. Features to make anomalies detectable?**
Per-supplier and per-category baselines: payment value vs historical mean, frequency, deviation from trend, and simple ratios that make an off-pattern payment stand out.

**10. How did results flow into Power BI, and what did stakeholders do?**
Scored and flagged records fed a **Power BI solution** that senior Department of Transport stakeholders used to review and act on the anomalies; it was adopted at that level.

---

## Project 6 - MyFacit SaaS

**1. Architecture, data flow?**
Multi-source ingestion into a unified data model, then an analytics and forecasting layer, then dashboards. Sources (POS, wages, supplier invoices) are pulled in, reconciled into one schema, then served as dashboards, short-term forecasts and pricing / product-mix insights.

**2. 8+ sources, how do you reconcile them?**
Map each source to a **common data model** with shared keys (date, venue, item), normalise units and item names, and validate on load. The hard part is entity resolution: matching the same product or supplier across POS and 14 suppliers' invoice formats.

**3. Short-term forecasting, what and how accurate?**
**[confirm method: Prophet / moving-average]** for near-term demand or sales, evaluated against a naive baseline. **[confirm accuracy]**, held to the tolerance the café needs for ordering.

**4. Pricing / product-mix method?**
**Menu-engineering logic**: classify items by **margin and volume** (stars / plough-horses / puzzles / dogs) so the operator sees what to promote, reprice or cut. Margin times volume, not price alone.

**5. Tech stack?**
**[confirm: frontend / backend / database / hosting].** Be specific and truthful about what you actually built.

**6. Data quality with messy café uploads?**
Validation and cleaning on ingest: schema checks, unit normalisation, dedupe, anomaly flags, so a messy POS export or invoice doesn't corrupt the model. The same validation discipline as my client pipelines.

**7. GitHub Actions runner, what you built vs scaffolded (honesty)?**
A **GitHub Actions workflow with an end-to-end test runner that fires on every push**, so nothing ships unless the suite passes. I **scaffolded it with AI tooling** and understand the flow (triggers, jobs on a runner, a failed suite blocks the merge, config in YAML), even though I didn't hand-write every line. Don't overclaim a mature multi-environment CD.

**8. New customer cold start in forecasts?**
Back off to **segment or "similar venue" behaviour** and lean on the individual café's own history as it accumulates (shrinkage), rather than pretend to forecast from no data.

**9. How is it deployed, updates pushed safely?**
**[confirm hosting]**, with the CI test gate above: changes run the E2E suite before they ship, which is the safety net.

**10. Hardest data-engineering problem, and how you solved it?**
**Unifying 14 suppliers' invoices plus POS and wages into one model**: inconsistent formats, item names and units. Solved with a normalisation and entity-resolution layer plus validation on ingest, so downstream analytics could trust the data. **[make this your real war story].**

---

## The five that catch people (rehearse these hardest)
- **3.3 future regressor values**: forward curves / client projections / lagged regressors; you can't use data you won't have.
- **5.4 "20% better" without labels**: measured vs the prior rule-based method on an analyst-reviewed sample (precision of flags); don't claim ground-truth labels.
- **2.4 threshold is not AUC**: threshold from the precision-recall curve at the precision the client needs.
- **4.3 verifying LLM numbers**: numbers come from queries, an independent QA agent re-derives them, a human signs off.
- **6.7 CI/CD honesty**: a real GitHub Actions test gate on MyFacit, AI-scaffolded, understood; not a hand-built enterprise CD pipeline.
