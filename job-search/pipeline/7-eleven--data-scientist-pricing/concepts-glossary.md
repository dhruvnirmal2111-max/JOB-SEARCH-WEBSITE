# 7-Eleven Interview — Concepts Glossary (every model, metric & term, explained in levels)

> For each term:
> - **ELI5** — plain English, no jargon.
> - **Say** — the one-liner you use in the room.
> - **Deeper** — the detail for follow-ups (only where it helps).
> - **Use / link** — when you'd use it, and your real project if relevant.
>
> Sections: 1) Foundations · 2) Models & algorithms · 3) Metrics · 4) Statistics & experimentation · 5) Pricing & retail concepts · 6) Data handling. Skim the bold terms; read the ones you're shaky on.

---

# 1. FOUNDATIONS (the mental model)

**Supervised learning** — ELI5: learn from labelled examples (you're shown the answers). *Say:* "Data with known outcomes; the model learns input→output." Split into **classification** (predict a category) and **regression** (predict a number).

**Unsupervised learning** — ELI5: find structure with no answer key. *Say:* "No labels; the model groups or compresses data." e.g. **clustering** customers into segments.

**Feature** — ELI5: an input column the model learns from (price, day of week, store size). **Target/label** — the thing you're predicting.

**Feature engineering** — ELI5: creating better inputs from raw data. *Use/link:* you added **spend value and line count** on top of text features in the A$12B classifier.

**Model / algorithm** — ELI5: the maths that maps inputs to a prediction. **Training** = fitting it to data. **Inference** = using it on new data.

**Parameters vs hyperparameters** — ELI5: **parameters** are what the model *learns* (the weights). **Hyperparameters** are settings *you choose before training* (e.g. how deep a tree, how strong the regularisation). *Link:* GridSearchCV tunes hyperparameters.

**Loss / cost function** — ELI5: a score of how wrong the model is; training tries to make it as small as possible. e.g. squared error for regression, log-loss for classification.

**Gradient descent** — ELI5: how models "learn" — take small steps downhill on the loss until you reach the bottom (the best fit). *Say:* "Iteratively adjust weights in the direction that reduces the loss."

**Overfitting** — ELI5: memorising the training data instead of learning the pattern; great on practice, bad on the real exam. **Underfitting** = too simple, misses the pattern even on training. *Say:* "High train score but low test score = overfit."

**Bias–variance trade-off** — ELI5: too-simple models miss the truth (**bias**); too-complex models chase noise (**variance**). Good models balance the two. *Say:* "Underfit = high bias; overfit = high variance; I tune for the sweet spot."

**Regularisation** — ELI5: penalise complexity so the model stays simple and general. **L1 / Lasso** can zero-out useless features (feature selection). **L2 / Ridge** shrinks all weights smoothly. **Elastic net** = both. *Link:* you used class weights + regularised LogisticRegression.

**Train / validation / test split** — ELI5: teach on one chunk, tune on a second, grade once on a third you never touched. For **time-series, split by time** (train on past, test on future) — never randomly, or you leak the future.

**Cross-validation (CV)** — ELI5: rotate which chunk is the test set so your score isn't a fluke of one split. **k-fold** = 5–10 rotations. **Stratified** = keep class balance in each fold (for imbalance). **Rolling-origin / time-series CV** = for forecasts, always train-past→test-future. *Link:* you used CV in GridSearchCV.

**Data leakage** — ELI5: accidentally letting the model see information it wouldn't have in real life (e.g. a future value, or the answer hidden in a feature). Causes fake-great scores that collapse in production. *Say:* "I guard against leakage by splitting by time and checking no feature encodes the target."

**Correlation vs causation** — ELI5: two things moving together doesn't mean one causes the other (ice cream sales and drownings both rise in summer). *Say:* "Correlation is a pattern; causation needs an experiment or a causal design." **Confounder** = a hidden third thing driving both (here, summer).

---

# 2. MODELS & ALGORITHMS

## Regression family
**Linear regression** — ELI5: draw the best straight line through the points to predict a number. *Deeper:* fits `y = b0 + b1·x1 + ...`; coefficients = "how much y moves per unit of x," which makes it **interpretable** (good for pricing). Assumes roughly linear relationships, independent errors, constant error spread.

**Logistic regression** — ELI5: like linear regression but outputs a **probability** between 0 and 1 for a yes/no question. *Say:* "Predicts the probability of a class; I used it for the spend classifier." *Deeper:* fits a straight line in **log-odds** space, squashed through the sigmoid function; coefficients are interpretable as odds changes; supports class weights for imbalance. *Link:* the A$12B one-vs-all classifier.

**Log-log regression (for elasticity)** — ELI5: regress log(quantity) on log(price); the slope **is** the price elasticity. *Use:* estimating how demand responds to price.

## Tree family
**Decision tree** — ELI5: a flowchart of yes/no questions that splits data toward a prediction ("is price > $2? is it a weekend?"). Easy to read; overfits alone.

**Random forest** — ELI5: hundreds of decision trees voting; averaging cancels their individual mistakes. *Say:* "An ensemble of trees; robust, little tuning, handles non-linearity."

**Gradient boosting (XGBoost / LightGBM)** — ELI5: build trees one after another, each fixing the previous one's errors. *Say:* "Often the best off-the-shelf model for tabular data like sales; LightGBM is fast on big data." *Use:* a strong choice for store-level demand/sales forecasting with lots of features. **Know this name** — it's the go-to for retail tabular ML.

## Other classifiers (know the name + one line)
**k-Nearest Neighbours (kNN)** — predict by looking at the most similar past examples. **Naive Bayes** — probabilistic classifier assuming features are independent; fast for text. **Support Vector Machine (SVM)** — finds the widest boundary between classes. **Neural network / deep learning** — stacked layers that learn complex non-linear patterns; needs lots of data; overkill for most tabular pricing work.

## Clustering (unsupervised)
**k-means** — ELI5: group data into k clusters by similarity. *Use:* **customer/store segmentation** (which stores behave alike for pricing). *Deeper:* you pick k, it assigns points to nearest centre, repeats; evaluate with the elbow method or silhouette score.

## Time-series / forecasting models
**Naive / seasonal-naive baseline** — ELI5: "tomorrow = today" or "this week = same week last year." *Say:* "Always benchmark against this; if my model can't beat it, it isn't earning its place."

**Moving average / exponential smoothing (Holt-Winters)** — ELI5: average recent values, weighting recent points more; Holt-Winters adds trend + seasonality. Simple, strong baselines.

**ARIMA / SARIMA** — ELI5: classic statistical forecaster using past values and past errors; **SARIMA** adds seasonality. *Deeper:* AR = autoregressive (past values), I = differencing to remove trend, MA = moving average of past errors. Needs a **stationary** series.

**Prophet** — ELI5: Facebook's forecaster that adds up three pieces — **trend + seasonality + holidays** — and lets you bolt on extra drivers. *Say:* "Additive model, robust to missing data and outliers, interpretable, great with clear seasonal structure." *Deeper:* decomposable `y = trend + seasonality + holidays + regressors`; you add **external regressors** (I used sea-freight trends). *Link:* your produce forecast (12.5–14% error).

**Stationarity** — ELI5: the series' behaviour (mean, variance) doesn't drift over time. Many classic models need it; you get it by **differencing** (modelling change instead of level). **Autocorrelation** = a series correlating with its own past values.

**Lag features** — ELI5: use "sales 1 week ago, 1 year ago" as inputs; lets tree models (LightGBM) forecast.

## Text / NLP (for your classifier follow-ups)
**TF-IDF** — ELI5: turn text into numbers by weighting each word by how *distinctive* it is. Common words ("the") get low weight; rare, informative words get high weight. *Deeper:* TF = term frequency (how often in this doc), IDF = inverse document frequency (rare across all docs = higher). *Link:* your classifier's original text features.

**Embeddings** — ELI5: a smarter text-to-numbers that captures **meaning**, so "taxi" and "cab fare" land near each other even with different words. *Say:* "I'm moving the classifier from TF-IDF to embeddings for better semantic matching." *Deeper:* dense vectors learned so similar meanings are close in space (word2vec, or modern transformer embeddings).

**One-vs-all (one-vs-rest)** — ELI5: for many categories, train one yes/no model per category, then pick the most confident. *Say:* "Simple, robust, easy to debug per category." *Link:* your classifier's structure.

---

# 3. METRICS

## The confusion matrix (the root of classification metrics)
ELI5: a 2×2 tally of right/wrong for a yes/no model:
- **TP** true positive (said yes, was yes), **TN** true negative (said no, was no)
- **FP** false positive (said yes, was no — a false alarm), **FN** false negative (said no, was yes — a miss)

**Accuracy** — ELI5: % of all predictions that were right. *Trap:* useless under **imbalance** (99% "no" → always-say-no scores 99% and is worthless). = (TP+TN)/all.

**Precision** — ELI5: of the ones I flagged as yes, how many really were? = TP/(TP+FP). High precision = few false alarms.

**Recall (sensitivity)** — ELI5: of all the real yeses, how many did I catch? = TP/(TP+FN). High recall = few misses.

**Precision vs recall trade-off** — ELI5: catch more real cases and you also raise false alarms; you tune the threshold to the business cost. *Say:* "For the classifier I chose the threshold on the cost of a false category vs a miss."

**F1 score** — ELI5: the balance (harmonic mean) of precision and recall into one number. Use when classes are imbalanced. *Link:* how you evaluated the classifier (not accuracy).

**ROC curve & AUC** — ELI5: a plot of catching real yeses vs raising false alarms across all thresholds; **AUC** = the area under it, 0.5 = coin-flip, 1.0 = perfect. *Say:* "Threshold-independent measure of how well the model separates classes."

**Log loss** — ELI5: punishes confident wrong probabilities harshly; lower is better. Used when you care about calibrated probabilities.

## Regression / forecast metrics
**MAE (mean absolute error)** — ELI5: average size of the miss, in real units (e.g. "off by 12 units on average"). Easy to explain.

**MSE / RMSE (root mean squared error)** — ELI5: like MAE but squares errors first, so **big misses hurt more**; RMSE is back in real units. *Say:* "Use RMSE when large errors are especially costly."

**MAPE / WMAPE** — ELI5: average error as a **percentage**, so it's comparable across products of different sizes. **WMAPE** weights by volume so big sellers count more (better for retail). *Link:* you reported error margin (12.5–14%) on the forecast. *Trap:* plain MAPE explodes when actuals are near zero — that's why WMAPE.

**R² (R-squared)** — ELI5: what fraction of the ups-and-downs your model explains, 0 to 1 (1 = perfect). *Say:* "Proportion of variance explained."

**Bias (forecast)** — ELI5: does the model consistently over- or under-predict? A forecast can have low error but be biased (always 5% low), which matters for stock planning.

---

# 4. STATISTICS & EXPERIMENTATION (your biggest gap — master this)

**Distribution** — ELI5: the shape of how values spread out. **Normal (bell curve)** — most values near the average, symmetric tails. **Mean/median/mode** — average / middle / most-common. **Standard deviation** — typical distance from the mean (spread).

**Central Limit Theorem** — ELI5: averages of enough samples look bell-shaped even if the raw data isn't. *Why it matters:* it's what lets us do A/B tests on averages.

**Hypothesis testing** — ELI5: a courtroom for data. **Null hypothesis (H0)** = "nothing changed / no effect" (the default, presumed innocent). **Alternative (H1)** = "there's a real effect." You look for enough evidence to reject H0.

**p-value** — ELI5: the chance of seeing a result this extreme **if nothing actually changed**. Small p (< 0.05) = "unlikely to be luck," so you reject H0. *Trap (say it right):* it is **not** the probability the change worked, and not the probability H0 is true.

**Significance level (α)** — ELI5: your bar for "unlikely enough," usually 0.05 (5%). It's also your accepted **false-positive rate**.

**Type I error (false positive)** — ELI5: crying wolf — you say the change worked when it didn't. Rate = α.

**Type II error (false negative)** — ELI5: missing a real wolf — you say nothing happened when it did. Rate = β.

**Power (1 − β)** — ELI5: the chance you **detect a real effect** when there is one. Aim for 80%. Bigger sample → more power.

**Confidence interval (CI)** — ELI5: the plausible range for the true value. A 95% CI means "if we repeated the test many times, 95% of such intervals would contain the truth." *Use:* if the 95% CI for "extra margin" excludes 0, the effect is significant.

**Effect size & MDE (minimum detectable effect)** — ELI5: how big a change you care about. **MDE** = the smallest effect your test can reliably catch; wanting to detect a tiny effect needs a big sample.

**Sample size** — ELI5: how many observations you need. Driven by MDE (smaller → more), variability (more → more), power (higher → more), α. *Say:* "I'd size the test up front from MDE, power and significance, not eyeball it."

**Statistical tests (pick by data type):**
- **t-test** — compare the **average** of two groups (test vs control margin).
- **z-test / two-proportion test** — compare two **rates/percentages** (conversion, redemption).
- **chi-square test** — compare **counts across categories** (did the mix of products bought change?).
- **ANOVA** — compare averages across **3+ groups**.

**A/B test** — ELI5: randomly split into test (gets the change) and control (doesn't); compare. Because groups are otherwise similar, the difference is *caused* by the change. Steps: hypothesis → primary + guardrail metrics → randomisation unit → sample size → run → analyse.

**Guardrail metric** — ELI5: a "do no harm" check. A price change that lifts margin but tanks volume or spikes complaints failed. Always watch guardrails, not just the primary metric.

**Peeking problem** — ELI5: repeatedly checking and stopping the moment it looks good inflates false positives. *Fix:* fix the sample size/duration up front, or use sequential-testing corrections.

**Novelty effect** — ELI5: a change looks great at first just because it's new, then fades. *Fix:* run long enough.

**Pricing-specific designs (say these — they separate you):**
- **Geo / matched-market test** — you usually can't fairly randomise price per customer, so you change price in some stores/regions and compare to matched ones.
- **Switchback test** — flip the *same* stores between price A and B on alternating days/weeks and compare; handles the fact that stores differ.
- **Difference-in-differences** — compare the *change* in test vs the *change* in control over the same period; cancels out shared trends (like a general demand rise).

---

# 5. PRICING & RETAIL CONCEPTS

**Price elasticity of demand** — ELI5: how much sales drop when you raise price. = %Δquantity / %Δprice. **Elastic** (>1) = sensitive (raise price → lose lots of volume). **Inelastic** (<1) = insensitive. *Fuel:* overall demand inelastic, but **station choice** highly elastic.

**Cross-price elasticity** — ELI5: how one product's price affects another's sales. **Substitutes** (Coke vs Pepsi — raise one, the other's sales rise). **Complements** (fuel + car wash — bundle logic).

**Cannibalisation** — ELI5: a new/cheaper item steals sales from your own other items rather than growing the pie (a $5 meal deal eating à-la-carte sales).

**Halo / basket effect** — ELI5: a cheap traffic-driver (coffee, fuel) brings people in who then buy high-margin extras; judge the **whole basket**, not the one item.

**Loss leader** — ELI5: sell something at thin/no margin to pull customers in. Coffee and fuel often play this role.

**Demand curve** — ELI5: the line showing how much sells at each price; pricing = picking the point on it that maximises your objective.

**Margin / COGS / GP%** — ELI5: **COGS** = what the item costs you; **gross profit** = price − COGS; **GP%** = gross profit ÷ price. The core commercial maths (your daily bread).

**KPI** — key performance indicator; the headline numbers a business tracks (sales, margin, basket size).

**Customer analytics terms (loyalty/retail):**
- **RFM** — segment customers by **Recency, Frequency, Monetary** value.
- **LTV (lifetime value)** — total profit expected from a customer over time.
- **Churn** — customers who stop buying; predicting it is a classic classification task.
- **Cohort analysis** — track a group who joined at the same time to see behaviour over their lifetime.
- **Market-basket analysis (association rules / Apriori)** — "people who buy X also buy Y"; drives bundling and promotions.

---

# 6. DATA HANDLING

**Missing data / imputation** — ELI5: fill gaps sensibly (mean/median, forward-fill for time series) or drop them; note that *why* it's missing matters.

**Outliers** — ELI5: extreme values that can distort models; investigate (real spike vs error), then cap, remove, or use robust methods. **Anomaly detection** = finding them systematically. *Link:* your VCDI distributed anomaly-detection pipeline.

**Feature scaling** — ELI5: put features on a comparable range so one big-numbered column doesn't dominate. **Normalisation** = squash to 0–1. **Standardisation** = centre at 0, scale by std dev. Needed for distance/gradient models (kNN, SVM, neural nets), not for trees.

**Encoding categoricals** — ELI5: turn labels into numbers. **One-hot encoding** = a 0/1 column per category. **Label encoding** = integer per category (fine for trees).

**Class imbalance fixes** — ELI5: when one label is rare. **Class weights** (rare mistakes cost more), **oversampling / SMOTE** (synthesise more minority examples), **undersampling**, or **move the decision threshold**. *Link:* you used class weights.

**Multicollinearity** — ELI5: two inputs carrying the same information (price and cost that move together); confuses coefficient interpretation in regression. Check correlations / VIF, drop or combine.

---

## Final priority (don't try to memorise all of it)
You **already know from real work:** logistic regression, TF-IDF/embeddings, one-vs-all, class weights, CV/GridSearch, precision/recall/F1, Prophet + regressors, MAPE, anomaly detection, elasticity/margin/COGS.
**Drill these because they're gaps or high-probability:** the **experimentation block (§4)** end to end, **RMSE vs MAE vs WMAPE**, **gradient boosting/LightGBM** (name + why for retail tabular), **k-means** (segmentation), **geo/switchback/diff-in-diff** pricing tests, and **SQL window functions** (separate drill). Everything else, be able to give the ELI5 + one line.
