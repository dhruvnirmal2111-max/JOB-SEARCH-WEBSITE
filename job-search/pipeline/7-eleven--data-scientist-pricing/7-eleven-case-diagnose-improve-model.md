# 7-Eleven Case - "Here are the model's metrics, what does it mean and how would you improve it?"

> A very common round-two case: they put a model's numbers in front of you and watch how you reason. The winning move is NOT to blurt "I'd try a bigger model." It is: **question whether the metric even fits the decision, diagnose the pattern the numbers show, improve in order of leverage, and say exactly what data and context you would ask for.** Think out loud the whole way.

---

## PART 0 - The 4-step reflex (say this structure out loud)
1. **Clarify the job and the cost of errors.** "What decision does this drive, and which mistake is more expensive, a false alarm or a miss?" That decides which metric even matters.
2. **Sanity-check the metric and the validation.** Is this the right metric? How was it validated (split, leakage, out-of-time)? A great-looking number from a broken evaluation is worse than useless.
3. **Diagnose the pattern.** Read the numbers together (train vs test, precision vs recall, error by segment) and name what they say: overfit, underfit, imbalance, wrong threshold, drift, leakage.
4. **Improve in order of leverage** (cheap and high-impact first) and **name the data you'd ask for**.

---

## PART 1 - What the metrics actually mean (quick read)

**Classification numbers:**
- **Accuracy** = overall % correct. High accuracy alone tells you almost nothing if classes are imbalanced.
- **Precision** = of what the model flagged as positive, how much was right. Low precision = too many false alarms.
- **Recall** = of the real positives, how many it caught. Low recall = too many misses.
- **F1** = balance of precision and recall in one number.
- **ROC-AUC** = how well it ranks positives above negatives, independent of the cut-off. High AUC but poor precision/recall = the ranking is fine, the **threshold** is wrong.
- **PR-AUC** = the ranking quality that matters when positives are rare.

**Regression / forecast numbers:**
- **MAE** = average miss in real units. **RMSE** = average miss but punishing big errors. If RMSE is much bigger than MAE, a few large errors dominate.
- **MAPE / WMAPE** = average % error (WMAPE weights by volume). Business-readable.
- **R2** = fraction of variation explained. Low R2 = the model is barely better than guessing the average.
- **Bias** = if predictions are consistently over or under, there's a systematic problem, not just noise.

---

## PART 2 - Diagnose the pattern (what the numbers are telling you)

| What you see | What it usually means | First move |
|---|---|---|
| High **train** score, low **test** score | **Overfitting** (memorised the data) | Simplify, regularise, more data, fewer features |
| Low train AND low test | **Underfitting** (too simple / weak features) | Add features, more complex model |
| High **accuracy**, low **recall** on the rare class | **Imbalance**; accuracy is lying | Switch to precision/recall/F1/PR-AUC; class weights; tune threshold |
| High **precision**, low **recall** | Threshold too **high** (too cautious) | Lower the threshold |
| Low precision, high recall | Threshold too **low** (too trigger-happy) | Raise the threshold |
| High **AUC**, weak precision/recall at the cut-off | Ranking is good, **threshold** is wrong | Re-pick threshold from the precision-recall curve |
| Great **offline**, poor in **production** | **Drift**, **leakage**, or train/serve skew | Check for a time-based leak; re-validate out-of-time; monitor drift |
| Good average error, bad on **peaks/events** | Missing features for those events | Add holiday/event/promo/weather features |
| Predictions consistently **biased** one way | Systematic issue (label, feature, or target definition) | Re-check the target and features |

**The two silent killers to always name:**
- **Data leakage:** a feature secretly contains the answer (e.g. a field only filled in after the outcome). Symptom: suspiciously perfect offline scores that collapse in production. Always ask "could any feature not be available at prediction time?"
- **A broken split:** random split on time-series data leaks the future into training and inflates every number. Ask how it was validated before trusting anything.

---

## PART 3 - The improvement ladder (do it in this order, cheapest and highest-leverage first)

1. **Fix the target and the metric.** Are we even optimising the right thing for the decision? (If the action is "who to discount," churn accuracy is the wrong target, uplift is.) A wrong target caps everything below it.
2. **Fix the evaluation.** Correct the split (time-based, stratified), check for leakage. No point tuning a model against a lie.
3. **Tune the threshold.** For classification this is a **free win**, no retraining. Move the cut-off to the precision/recall balance the business needs.
4. **Better data and labels.** More rows, cleaner or more consistent labels, fix class imbalance (class weights, resampling). Usually higher leverage than a fancier model.
5. **Better features (usually the single biggest lever).** Add real signal, engineer features (lags, ratios, interactions, event flags), remove noise and leaks. Most model gains come from features, not algorithms.
6. **Model choice and complexity.** Overfitting to simpler or more regularised. Underfitting to more expressive (e.g. gradient boosting for tabular).
7. **Hyperparameter tuning + regularisation.** Grid/random search with cross-validation. Real but usually smaller gains than data and features.
8. **Ensembling.** Combine models for a last few points, at the cost of complexity.
9. **Monitor and retrain** in production. Track the metric each cycle, alert on drift, retrain on a trigger.

**Say this line:** "I'd get the most from the target, the data and the features before I touch the algorithm. Threshold tuning is a free win, and a fancier model is usually the smallest lever."

---

## PART 4 - What data and context to ask for (this is what they want to hear)

When shown metrics, asking the right questions scores as high as any fix. Ask for:

**About the decision:**
- What decision does this model drive, and what's the cost of a **false positive vs a false negative**? (Sets the metric and the threshold.)
- What does "good enough" look like, and what's the **baseline** a naive model gets? (A number means nothing without a baseline.)

**About the evaluation (is the metric even trustworthy):**
- How was it **validated**, random split or time-based? Any **leakage** check?
- Is the test set **out-of-time** (a real future) or just a random slice?
- What's the **class balance / base rate**?

**About where it fails (the most useful ask):**
- Can I see the **confusion matrix** and the **error broken down by segment** (site, region, product, time)? Failures are usually concentrated, not uniform.
- The **train-vs-test gap** / learning curves (overfit vs underfit).
- A few **misclassified examples** to eyeball what's going wrong.

**About the inputs:**
- The **feature list**, what signal do we have, and what obvious drivers are missing?
- How are the **labels** created, and how reliable are they?
- The **sample size** and time period covered.
- Has the data or the world **changed** since training (drift)?

---

## PART 5 - Worked mini-example (7-Eleven flavour)

*"This churn model has 92% accuracy but the business says it's useless. Improve it."*

> "First, 92% accuracy is a red flag, not a win, because churn is rare, so predicting nobody churns already scores high. I'd want the **precision and recall on the churn class**, not accuracy. My guess is recall is low: it's missing the churners we actually care about.
>
> Before I change the model I'd ask what decision this drives. If the action is a retention offer, the right target isn't 'who churns' at all, it's **uplift**, who a discount actually keeps. So the metric and possibly the target are the first fix.
>
> Then I'd check the evaluation: was it a **time-based split**, and is any feature a leak (something only known after they'd already churned)? Then I'd look at the **confusion matrix and errors by segment** to see where it fails.
>
> For improvement, in order: fix the target/metric, tune the **threshold** (a free win to lift recall), fix the **imbalance** with class weights, then add **features** (recency, frequency, basket trend, competitor proximity), and only then reach for a stronger model. And I'd put it on a dashboard tracking **incremental profit vs baseline**, not just model accuracy, so we catch it if it drifts."

That answer questions the metric, reframes the target, checks the evaluation, improves in leverage order, and asks for the right data. That is the whole game.

---

## PART 6 - One-liners to keep
- "A metric with no **baseline** and no **cost-of-error** context is meaningless, so those are my first two questions."
- "High accuracy on imbalanced data is a trap, show me precision, recall and the confusion matrix."
- "High AUC but poor precision/recall means the ranking is fine and the **threshold** is wrong, that's a free fix."
- "Most model gains come from the **target, the data and the features**, not the algorithm."
- "Great offline but bad live means **leakage, a broken split, or drift** until proven otherwise."
- "I'd always look at **errors by segment**, failures cluster, they're rarely uniform."
