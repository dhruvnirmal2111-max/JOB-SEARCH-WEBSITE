# 7-Eleven Fundamentals Sheet — instant recall, trade-offs, fuel context

> Your interviewer is **Head of Fuel Pricing & Analytics**. That means: commercial + pricing reasoning matters as much as ML mechanics. Lock these to **instant recall** (say them without pausing). Format for each: **what it is → the trade-off → the fuel / 7-Eleven angle.**
>
> **Order of importance for this interviewer:** Part 4 (Pricing & fuel) ≥ Part 2 (Experimentation) ≥ Part 1 (ML metrics) ≥ Part 3 (Forecasting) ≥ Part 5 (SQL). Spend your time top-down.

---

# PART 1 — ML metrics (must be reflex)

**Classification vs regression.** Classification predicts a category/probability (will this customer fill up? y/n). Regression predicts a number (how many litres will this site sell?). *Fuel:* offer-targeting = classification; demand/volume = regression.

**Confusion matrix** = the 2×2 of right/wrong for a yes/no model: **TP** (said yes, was yes), **FP** (said yes, was no — false alarm), **FN** (said no, was yes — miss), **TN**. Every metric below comes from these four.

**Accuracy** = (TP+TN)/all. **Trade-off / trap:** useless under **imbalance** — if only 3% of app-opens convert, "always predict no" is 97% accurate and worthless. *Never lead with accuracy on a rare event.*

**Precision** = TP/(TP+FP) — of the ones I flagged, how many were right. **Recall** = TP/(TP+FN) — of all the real cases, how many I caught.
- **The trade-off (know this cold):** raise the decision threshold → **precision up, recall down** (you flag fewer, but you're surer). Lower it → recall up, precision down. You can't max both; you pick based on the **cost of a false positive vs a false negative.**
- *Fuel example:* targeting customers for a **discount** (a false positive = wasted margin on someone who'd fill up anyway) → favour **precision**. Flagging **pump fraud** or a **churning high-value customer** (a miss is costly) → favour **recall**.

**F1** = harmonic mean of precision & recall — one number when classes are imbalanced and you care about both. **Trade-off:** hides *which* of precision/recall is weak, so quote the pair when it matters.

**ROC-AUC** = probability the model ranks a random positive above a random negative; 0.5 = random, 1.0 = perfect. **Threshold-independent** (judges ranking across all cutoffs). **Trade-off:** it says nothing about your actual operating point or business costs, and it's **over-optimistic under heavy imbalance** → use **PR-AUC** (precision-recall) when positives are rare, which fuel-offer conversion usually is.

**Threshold** = the cutoff that turns the probability into an action. **You** choose it, not the model, from **economics**: show the offer when `expected incremental margin > discount cost`. *Fuel:* the threshold is a business lever, tune it to margin, not to 0.5 by default.

**Baseline first.** Always compare a model to a dumb baseline (fuel: "same volume as last week", "match the cheapest competitor"). **Trade-off:** a fancy model that can't beat the baseline is pure risk with no reward — don't ship it.

---

# PART 1b — ML training concepts (reflex)

**Train / validation / test split.** Train = learn; validation = tune; test = final honest grade (touched once). **Fuel/critical:** anything time-based (demand, price) **must split by time** — train on the past, test on the future. Random splitting **leaks the future** and inflates your score.

**Cross-validation.** Rotate which slice is the test set so the score isn't a fluke. **Trade-off:** more folds = more reliable but more compute; for time series use **rolling-origin** CV, not random.

**Data leakage** = the model sees info it wouldn't have at prediction time (a future value, or the answer hidden in a feature). **Trade-off:** produces amazing offline scores that collapse live — the single most common way models fail. *Fuel:* using end-of-day volume to predict that same day = leakage.

**Overfitting vs underfitting.** Overfit = memorises training noise, great on train / bad on test (**high variance**). Underfit = too simple, bad on both (**high bias**). **The bias–variance trade-off:** more complexity cuts bias but adds variance; you tune for the sweet spot. *Say:* "big train-vs-test gap = overfit."

**Regularisation** = penalise complexity to reduce overfitting. **L1/Lasso** can zero-out useless features (selection); **L2/Ridge** shrinks all weights smoothly. **Trade-off:** too much → underfit; too little → overfit.

**Class imbalance fixes:** class weights (up-weight the rare class), resampling/SMOTE, or move the threshold. **Trade-off:** oversampling can overfit the minority; class weights are usually the clean first move (what you did on the A$12B classifier).

---

# PART 2 — Experimentation & causality (this interviewer will push here)

**Correlation vs causation.** Two things moving together ≠ one causes the other. A **confounder** drives both (fuel: prices and volumes both move with the *cycle* and *season*, not because one causes the other).

**A/B test** = randomly split into treatment (change) and control (no change); the difference is *caused* by the change. Steps: hypothesis → primary metric + **guardrails** → randomisation unit → size it (power, MDE) → run → analyse.

**THE fuel-pricing twist (say this — it's the interviewer's world):** you **cannot A/B a fuel price by customer** — everyone at a site sees the same board price. So pricing experiments are **geo / matched-site tests** (change price at some sites, compare to similar control sites) or **switchback** (flip the *same* sites between price A and B over alternating periods). Then **difference-in-differences** isolates the effect by comparing the *change* in test sites vs the *change* in control sites, cancelling shared trends (the cycle, weather).

**Stats terms (one line each):** **p-value** = chance of a result this extreme if the change did nothing (small = unlikely to be luck; NOT the probability it worked). **α / significance** = your false-positive bar, usually 5%. **Type I** = false positive (cried wolf). **Type II** = false negative (missed a real effect); **power = 1−β**, aim 80%. **Confidence interval** = plausible range for the true effect; excludes 0 → significant. **MDE** = smallest effect you can reliably detect; smaller MDE needs a bigger sample.

**Guardrail metric** = a "do no harm" check. *Fuel:* a price move that lifts **margin per litre** but tanks **volume / market share / shop basket** has failed — always watch volume and basket alongside margin.

---

# PART 3 — Forecasting (fuel demand & the price cycle)

**Time series basics:** **trend** (long-term direction), **seasonality** (weekday/weekend, holidays, summer driving), **external regressors** (own price, competitor price, weather, local events).

**Evaluate a forecast:** backtest with **rolling-origin** CV (never random). Metrics: **MAPE / WMAPE** (avg % error, business-friendly; WMAPE weights by volume so big sites count more), RMSE. **Always beat a seasonal-naive baseline** ("same as last week/last year").

**Prophet (what you used):** additive trend + seasonality + holidays + regressors; robust, interpretable. **Trade-off:** great with clear seasonal structure; for highly non-linear/high-frequency, gradient-boosted trees (LightGBM on lag features) or SARIMA often win. *Fuel:* demand forecasting for a site = seasonality + price + competitor + weather; same muscles as your produce forecast.

**The fuel price cycle (domain gold):** Australian petrol prices move in **sawtooth cycles** — a sharp **restore** (hike), then a slow **undercutting decline** as retailers compete down, then restore again. Modelling questions: predict the **cycle stage**, predict **competitor moves**, decide **when to restore and how fast to discount**. This is a forecasting + optimisation + game-theory problem, and it's the interviewer's core world.

---

# PART 4 — Pricing & commercial fundamentals (MOST IMPORTANT for this interviewer)

**Price elasticity of demand** = %Δquantity ÷ %Δprice. Elastic (>1) = sensitive; inelastic (<1) = not. **THE fuel insight (nail this):** overall fuel demand is **inelastic** short-term (people still need to drive), **but station choice is highly elastic** — drivers will cross the road or use an app to save 2–4 c/L. So a site's volume is driven by its **price *relative to nearby competitors***, far more than the absolute price. Get this one sentence perfect.

**Margin vs volume — the central fuel trade-off.** Fuel is **thin-margin, high-volume**. Raise the board price → **more cents-per-litre margin but you lose volume** to cheaper competitors; lower it → **win volume/share, thinner margin**. The optimisation is choosing the price on that curve that maximises **total profit**, not either extreme.

**The basket / halo effect (why fuel margin isn't the whole story).** A fill-up pulls customers **into the shop**, where coffee/snacks are **high-margin**. So thin (even loss-leader) fuel pricing can be rational if it drives **store profit**. *Always judge the whole visit: fuel margin + shop basket*, not fuel alone. Mentioning this shows commercial maturity.

**Loss leader** = priced thin/at a loss to drive traffic. Fuel and coffee both play this role at 7-Eleven.

**Pricing strategies (know the three):** **cost-plus** (cost + markup — simple, ignores demand/competitors), **competitive** (price off rivals — dominant in fuel because the board price is public and apps compare it), **value-based** (price to willingness-to-pay — more for the shop than fuel). *Fuel is mostly competitive + margin-optimised around the cycle.*

**Cross-price elasticity & cannibalisation.** Substitutes (your site vs the servo across the road). Cannibalisation = a discount stealing from your own higher-margin sales. *Fuel:* a fuel-lock discount that just shifts *when* someone buys (pull-forward) isn't incremental volume.

**Measuring a price change (ties Part 2 → practice):** geo/matched-site test or switchback + diff-in-diff; primary metric = **profit** (margin × volume, incl. shop basket), guardrails = volume and market share.

**The Fuel Price Lock app (be curious about it).** Lets customers lock the low price for up to 7 days — it's both a **behavioural data goldmine** (who locks, when, lock-vs-buy) and a **margin lever** (customers hedge the cycle). Great thing to ask the interviewer about.

---

# PART 5 — SQL (one warm-up before the call)

- **Top-N per group:** `ROW_NUMBER() OVER (PARTITION BY site ORDER BY volume DESC)` → filter ≤ N.
- **Period-over-period:** `LAG(volume) OVER (PARTITION BY site ORDER BY day)` → change / % change (guard `NULLIF(...,0)`).
- **Running total:** `SUM(x) OVER (ORDER BY day ROWS UNBOUNDED PRECEDING)`.
- **Dedupe keep latest:** `ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC)` → keep rn=1.
- `WHERE` filters rows *before* grouping; `HAVING` filters groups *after*. `RANK` (gaps) vs `DENSE_RANK` (no gaps) vs `ROW_NUMBER` (unique).

---

# The 6 things to have PERFECT (if nothing else)
1. **Fuel elasticity:** demand inelastic, **station-choice elastic** → price relative to competitors drives volume.
2. **Margin vs volume** trade-off, judged on **total profit incl. shop basket**.
3. **Why not accuracy** → precision/recall/**F1**, and **AUC** = ranking quality (PR-AUC when rare).
4. **Precision/recall trade-off** set by **cost of FP vs FN**; threshold is a business lever.
5. **You can't A/B fuel price per customer** → **geo/switchback + diff-in-diff**, guardrail on volume.
6. **Split by time, no leakage, beat a baseline.**

Say these six without hesitating and you'll read as someone who thinks like a fuel-pricing data scientist — which is exactly who's interviewing you.
