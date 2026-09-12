# Stats & ML Fundamentals - Plain-English Revision

> Everything a data-science recruiter or panel can ask on the basics. Every formula is followed by **"In plain words"** so nothing technical is explained with more jargon. Read it once end to end, then use the rapid-fire section (Part 12) the night before.

---

## PART 1 - Describing data (the basics)

**Mean** = add all values, divide by how many. `mean = (sum of all values) / n`
- In plain words: the average.

**Median** = the middle value when you line them up in order.
- In plain words: half are above it, half below. Not dragged around by a few extreme values.

**Mode** = the most common value.

**Mean vs median (they love this):** if the data is **skewed** or has outliers, the median is more honest. Example: average salary in a room gets wrecked if a billionaire walks in; the median barely moves. Use median for income, house prices, anything with a long tail.

**Variance** = average of (each value minus the mean), squared. `variance = average of (value - mean)²`
- In plain words: how spread out the data is. Squared so negatives don't cancel positives.

**Standard deviation (SD)** = square root of the variance.
- In plain words: spread, but back in the original units (dollars, litres) so it's readable. Big SD = values scattered far from the average; small SD = values bunched near it.

**Range** = max minus min. **IQR (interquartile range)** = the middle 50% (the value at 75% minus the value at 25%).
- In plain words: IQR is a spread measure that ignores the extreme ends, so outliers don't distort it.

**Percentile** = the value below which that % of the data falls (the 90th percentile = 90% of values are below it).

---

## PART 2 - Distributions (binomial, Poisson, etc.)

A **distribution** is just the *shape* of how often each value happens.

**Normal (Gaussian) - the bell curve.** Symmetric, most values near the middle, fewer at the extremes.
- Describes: heights, measurement errors, averages of lots of things.
- Rule of thumb: ~68% of values within 1 SD of the mean, ~95% within 2 SD, ~99.7% within 3.

**Bernoulli** - a single yes/no trial. One coin flip. Value is 0 or 1.
- Parameter: `p` (probability of "yes"). Mean = p.

**Binomial** - count of "yes"es in a fixed number of yes/no trials.
- Describes: out of 100 customers shown an offer, how many take it. "How many successes in n tries."
- Mean = `n × p`. Example: 100 customers, 10% take-up, expect 10.

**Poisson** - count of events in a fixed window of time or space, when events are rare and independent.
- Describes: number of customers arriving at a pump per hour, calls to a call centre per minute, defects per batch.
- Parameter: `λ` (lambda) = the average rate. Mean = variance = λ. (A giveaway sign of Poisson: the mean and variance are roughly equal.)

**Uniform** - every value equally likely (a fair die).

**Exponential** - the *time between* rare events (how long until the next customer arrives). Partner of Poisson.

**Interview line:** "Binomial counts successes in a fixed number of yes/no trials; Poisson counts rare events over a window with a known average rate. Bernoulli is a single yes/no."

---

## PART 3 - Samples, uncertainty, and confidence

**Population vs sample:** the population is everyone; a sample is the slice you actually measured. You use the sample to *estimate* the population.

**Standard error (SE)** = how much your sample's average would wobble if you took the sample again. `SE = SD / √n`
- In plain words: bigger sample (`n`) to smaller wobble to more trustworthy estimate. This is *why* more data helps: the SE shrinks with the square root of the sample size.

**Central Limit Theorem (CLT):** if you take lots of samples and average each, those averages form a **normal bell curve**, even if the original data wasn't normal.
- In plain words: averages behave predictably (bell-shaped) once the sample is decent-sized. It's what lets us use normal-based confidence intervals and tests.

**Confidence interval (CI):** a range that probably contains the true value. A 95% CI means: if you repeated the study many times, ~95% of the intervals you build would contain the true value.
- Roughly: `estimate ± 2 × SE` for 95%.
- In plain words: "our best estimate is X, and the true number is very likely between here and here." Narrower = more certain.

---

## PART 4 - Hypothesis testing (the core inference idea)

**The setup:**
- **Null hypothesis (H0):** "nothing is going on" (no difference, no effect).
- **Alternative (H1):** "there is a real effect."
- You assume the null is true, then ask: how surprising is my data *if* nothing were going on?

**p-value** = the probability of seeing data this extreme *if the null were true*.
- In plain words: small p-value (usually < 0.05) = "this would be very unlikely if there were no real effect," so we reject "nothing's going on." **A p-value is NOT the probability the null is true** (common trap).

**Significance level (alpha)** = the bar you set, usually 0.05. Reject the null if p < alpha.

**Type I error (false positive):** you say there's an effect when there isn't. Probability = alpha.
**Type II error (false negative):** you miss a real effect. 
**Power** = the chance you *catch* a real effect (1 minus the false-negative rate). More data to more power.
- In plain words: Type I = crying wolf; Type II = missing the real wolf. Power = your ability to spot the real wolf.

**Statistical vs practical significance:** with a huge sample, a tiny, useless difference can be "statistically significant." Always ask "is the effect *big enough to matter*," not just "is it significant."

---

## PART 5 - The specific tests (when to use which)

**Pick by what you're comparing:**

| You're comparing | Use |
|---|---|
| Two group **averages** (a number) | **t-test** |
| Association between two **categories** | **Chi-square** |
| **Three or more** group averages | **ANOVA** |
| Strength of a **linear relationship** between two numbers | **Correlation** |

**t-test** - compares means (averages).
- **One-sample:** is this group's average different from a known value?
- **Two-sample (independent):** do group A and group B have different averages? (A/B test on a numeric metric like basket size.)
- **Paired:** same people measured twice (before/after).
- In plain words: "are these two averages *really* different, or could the gap just be luck?" It weighs the size of the gap against the noise.

**Chi-square test** - for **categories**, not averages.
- Asks: are two categorical things related? Example: is "took the offer (yes/no)" related to "region (city/regional)"? It compares the counts you observed to the counts you'd expect if there were no relationship.
- In plain words: "does the split of this category depend on that category, or are they independent?"

**ANOVA (Analysis of Variance)** - compares the averages of **3+ groups at once**.
- Why not just many t-tests? Running lots of t-tests inflates your false-positive rate. ANOVA tests "are *any* of these groups different" in one go.
- In plain words: "do these several groups differ, or are they all basically the same?"

**Correlation** - measures how two numbers move together, from -1 to +1.
- +1 = move perfectly together, -1 = perfectly opposite, 0 = no linear link.
- **Pearson** = straight-line relationships; **Spearman** = rank-based, catches "one goes up as the other goes up" even if not a straight line.
- Trap: **correlation is not causation** (Part 6).

---

## PART 6 - Bayes, Bayesian thinking, and propensity scores

**Bayes' theorem** - update a belief when new evidence arrives.
`P(A given B) = P(B given A) × P(A) / P(B)`
- In plain words: start with a prior belief, see evidence, get an updated belief. The famous trap: a test that's "99% accurate" for a rare disease still gives mostly false alarms, because the disease is rare to start with. You must weigh the base rate (how common it is) not just the test accuracy.

**Bayesian vs frequentist (one line each):**
- **Frequentist:** the true value is fixed; the data is random. Gives p-values and confidence intervals.
- **Bayesian:** you hold a belief (a probability) about the value and update it with data. Gives a direct "probability the effect is positive," which business people find more intuitive.

**Propensity score** - the **probability a unit gets/does something, given its characteristics.** Two meanings, know both:
1. **Industry meaning:** "propensity model" = a model that scores each customer's probability of an action (buy, churn, take an offer). Just a probability output from a classifier.
2. **Causal-inference meaning:** the probability of *receiving the treatment* given a customer's features. Used for **propensity-score matching**: when you can't randomise, you pair each treated person with an untreated person who had the *same probability of being treated*, so you compare like with like and estimate the treatment's real effect.
- In plain words: it's a single number summarising "how likely was this person to get the treatment (or do the action)," and matching on it fakes a fair comparison when a true random experiment wasn't possible.

---

## PART 7 - Classification metrics (which to watch, and why)

Everything is built from the **confusion matrix** - four counts:
- **TP** (true positive): predicted yes, was yes.
- **FP** (false positive): predicted yes, was no. (A false alarm.)
- **TN** (true negative): predicted no, was no.
- **FN** (false negative): predicted no, was yes. (A miss.)

**Accuracy** = (TP + TN) / everything.
- In plain words: overall % correct. **Trap:** useless on imbalanced data. If 99% of customers don't churn, "predict nobody churns" is 99% accurate and catches zero churners.

**Precision** = TP / (TP + FP).
- In plain words: of everything I *flagged as yes*, how much was actually yes. Watch this when **false alarms are costly** (auto-labelling spend, sending an expensive offer, flagging fraud that triggers a manual investigation).

**Recall (Sensitivity)** = TP / (TP + FN).
- In plain words: of all the *actual yeses*, how many I caught. Watch this when **misses are costly** (missing a disease, missing a churner you could have saved, missing fraud).

**The precision-recall trade-off:** push the threshold up to fewer false alarms (higher precision) but you miss more (lower recall). Push it down to catch more (higher recall) but more false alarms (lower precision). **The right balance depends on which mistake costs more.**

**F1** = the harmonic mean of precision and recall. `F1 = 2 × (P × R) / (P + R)`
- In plain words: one number that's only high when *both* precision and recall are decent. Use it on imbalanced data instead of accuracy.

**Specificity** = TN / (TN + FP). Of the actual noes, how many I correctly ruled out.

**ROC-AUC** = the probability the model ranks a random *yes* above a random *no*. 0.5 = coin flip, 1.0 = perfect.
- In plain words: how well the model *ranks* positives above negatives, regardless of where you set the cut-off. Threshold-independent. Good general "is the model any good at separating the classes."

**PR-AUC (precision-recall AUC)** = area under the precision-recall curve.
- In plain words: **better than ROC-AUC when the positive class is rare**, because ROC-AUC can look flatteringly high on heavy imbalance.

**Which to report (say this):**
- Balanced classes to accuracy is fine, plus AUC.
- **Imbalanced classes to precision, recall, F1, and PR-AUC. Never lead with accuracy.**
- Cost of a false alarm high to optimise **precision**. Cost of a miss high to optimise **recall**.

---

## PART 8 - Regression / forecast metrics (predicting a number)

**MAE (mean absolute error)** = average size of the miss, ignoring direction.
- In plain words: "on average we're off by X units." Easy to explain, treats all misses equally.

**MSE (mean squared error)** = average of the squared misses.
- In plain words: like MAE but **punishes big misses much harder** (squaring). Units are squared, so less readable.

**RMSE (root mean squared error)** = square root of MSE.
- In plain words: back in normal units, but still punishes big misses more than MAE. Use when a few large errors are especially bad.

**MAPE (mean absolute percentage error)** = average miss as a **percentage** of the actual.
- In plain words: "we're off by X% on average," comparable across products of different sizes. **Trap:** blows up when actual values are near zero.

**WMAPE (weighted MAPE)** = percentage error weighted by volume, so big items count more.
- In plain words: the retail-friendly one; a 50% error on a tiny SKU shouldn't count as much as a 5% error on your best-seller.

**R² (R-squared)** = the fraction of the variation the model explains (0 to 1).
- In plain words: "how much better than just guessing the average." 0.8 = explains 80% of the variation. Can go negative if the model is worse than the average.

**The rule to never miss:** classification to accuracy / precision / recall / F1 / AUC. Regression or forecast to MAE / RMSE / MAPE / WMAPE. Never say "precision" for a forecast or "accuracy" on imbalanced classes.

---

## PART 9 - How to tune a model (the whole workflow)

**Overfitting vs underfitting:**
- **Overfitting** = the model memorised the training data (including its noise); great on training, poor on new data.
- **Underfitting** = the model is too simple to capture the real pattern; poor on both.
- In plain words: overfitting = memorised the textbook, fails the real exam; underfitting = didn't study enough.

**Bias-variance trade-off:**
- **Bias** = error from being too simple (underfitting).
- **Variance** = error from being too sensitive to the exact training data (overfitting).
- In plain words: you're balancing "too dumb" against "too jumpy." The sweet spot minimises total error.

**How you catch and fix it:**
1. **Train / validation / test split.** Train on one part, tune on the validation part, and only *touch the test set once* at the end for an honest score. The test set stands in for "new, unseen data."
2. **Cross-validation (k-fold).** Split the data into k chunks, train on k-1 and test on the held-out one, rotate, average. In plain words: gives a more stable score by testing on every part of the data in turn. Use **stratified** k-fold for imbalanced classes so each chunk keeps the class ratio.
3. **Regularisation** (fights overfitting by penalising complexity):
   - **L2 (Ridge):** shrinks all the model's weights toward zero, smoothly. Keeps every feature but tamer.
   - **L1 (Lasso):** can push some weights *exactly* to zero, dropping useless features (built-in feature selection).
   - In plain words: both tell the model "don't get too excited about any one feature." L1 also does a cleanup by zeroing out dead weight.
4. **Hyperparameter tuning.** Parameters the model *learns* on its own (the weights); **hyperparameters** you *set* before training (tree depth, learning rate, k, regularisation strength). Tune them with:
   - **Grid search:** try every combination in a grid.
   - **Random search:** try random combinations (often finds a good one faster).
   - Always judged by **cross-validation**, never on the test set.
5. **Class imbalance handling:** class weights (tell the model minority mistakes cost more), resampling (over/under-sample), or SMOTE (make synthetic minority examples). Plus **threshold tuning** and the right metrics (Part 7).
6. **Learning curves / the train-vs-test gap:** if training score is high but validation is low to overfitting (simplify or regularise). If both are low to underfitting (add features or complexity).

**Parameters vs hyperparameters (say it cleanly):** "Parameters are learned from the data during training; hyperparameters are the settings I choose beforehand and tune with cross-validation."

---

## PART 10 - Forecasting specifics (stationarity, ARIMA p,d,q)

**Stationarity - what it means (plain):** a series is **stationary** when its behaviour doesn't change over time to roughly constant average, constant spread, and no trend or seasonality drifting through it.
- In plain words: it looks statistically "the same" whether you look at the start or the end. A stock price wandering upward is **not** stationary; the daily *changes* in it usually are.
- Why it matters: classic forecasting models (ARIMA) assume stationarity, because you can only learn a stable pattern if the pattern is stable.

**How you make a series stationary:** **differencing** to instead of the raw value, model the *change* from the previous point (today minus yesterday). That strips out a trend. Do it again for stubborn trends.

**How you test for it:** the **ADF test (Augmented Dickey-Fuller).** In plain words: a hypothesis test where the null is "not stationary." A small p-value means "reject not-stationary," i.e. it looks stationary.

**ARIMA and its (p, d, q) values** - the three knobs:
- **p (AR, autoregressive):** how many *past values* the model uses. "Today depends on the last p days' values." In plain words: memory of recent levels.
- **d (I, integrated / differencing):** how many times you differenced to make it stationary. In plain words: how much trend you had to strip out.
- **q (MA, moving average):** how many past *errors* (surprises) the model uses. "Today's value corrects for the last q prediction errors." In plain words: memory of recent mistakes.
- **SARIMA** adds a seasonal version of the same three (P, D, Q) plus the season length (e.g. 12 for monthly-yearly seasonality).
- How you pick them: differencing until stationary sets **d**; ACF/PACF plots (how the series correlates with its own past) suggest **p** and **q**; then compare candidates by an information criterion (AIC/BIC to lower is better) and backtest.

**Prophet vs ARIMA (your world):** Prophet handles trend + seasonality + holidays + external regressors automatically and doesn't need you to hand-tune stationarity; ARIMA is more manual but classic. Both should beat a **seasonal-naive baseline** (just "same as last year's same period") or they're not worth it.

---

## PART 11 - A few more they might drop

**Correlation vs causation:** two things moving together doesn't mean one causes the other; a hidden third factor (a **confounder**) can drive both (ice-cream sales and drownings both rise with summer heat). Only a **randomised experiment** (or careful causal methods) proves causation.

**Confounder:** a lurking variable that affects both the thing you changed and the outcome, faking a relationship.

**Selection bias:** your sample isn't representative (e.g. only surveying happy customers), so conclusions don't generalise.

**p-hacking / multiple comparisons:** test enough things and something looks "significant" by chance. Fix: pre-register the metric, or correct for multiple tests.

**Normal distribution "why it matters":** many tests assume it, and thanks to the CLT, *averages* are normal even when raw data isn't.

**Law of large numbers:** more data to your sample average converges to the true average. (Different from CLT, which is about the *shape* of averages.)

---

## PART 12 - Rapid-fire (night-before, answer in one breath)

- **Mean vs median?** Median resists outliers; use it for skewed data (income).
- **What's a p-value?** Chance of data this extreme if there were no real effect; small to reject "nothing's going on." Not the probability the null is true.
- **Type I vs II?** I = false alarm; II = missed a real effect. Power = catching real effects.
- **t-test vs chi-square?** t-test compares averages (numbers); chi-square tests if two categories are related.
- **When ANOVA?** Comparing 3+ group averages at once, without inflating false positives.
- **Accuracy trap?** On imbalanced data it's useless; use precision/recall/F1/PR-AUC.
- **Precision vs recall?** Precision = of what I flagged, how much was right (watch when false alarms cost). Recall = of the real positives, how many I caught (watch when misses cost).
- **What's AUC?** Probability the model ranks a random positive above a random negative; threshold-independent ranking quality.
- **Overfitting fix?** More data, simpler model, regularisation, cross-validation.
- **Parameters vs hyperparameters?** Learned vs chosen-and-tuned.
- **L1 vs L2?** L1 zeroes out useless features (selection); L2 just shrinks all weights.
- **Stationary?** Stats don't change over time (no drifting trend/seasonality); difference the series to get there.
- **ARIMA p,d,q?** Past values, differencing steps, past errors.
- **Binomial vs Poisson?** Successes in a fixed number of yes/no trials vs rare-event counts over a window (mean = variance = λ).
- **Propensity score?** Probability of getting the treatment (or doing the action) given features; match on it to fake a fair comparison when you couldn't randomise.
- **Bayes trap?** A 99%-accurate test for a rare thing still mostly false-alarms; weigh the base rate.
- **Correlation vs causation?** Moving together isn't causing; watch for confounders; only experiments prove cause.

**The two rules that save you:** (1) classification to precision/recall/F1/AUC, regression to MAE/RMSE/MAPE/WMAPE, never mix them. (2) On imbalanced data, never say "accuracy."
