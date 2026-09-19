# 7-Eleven Case — Targeted Discounts to Win Back Lapsing Customers

> A worked case (from a live mock with Marcus, Head of Fuel Pricing & Analytics, and Raj, technical lead). The brief: a competitor launched a fuel app, our lighter customers are drifting, and we want to send **app discounts to win them back** — on a finite budget finance won't extend without proof of *incremental* profit. This sheet is the full arc: clarify to build to test to model to measure. Pattern to copy: **clarify the decision to experiment design to uplift model to Qini to margin guardrail.**

---

## 0. The one rule that runs through the whole case
**Match the tool to the decision.**
- **Match the experimental unit to how the lever is delivered:** personalised / in-app discount to randomise the *customers* (holdout); everyone-sees-it board price to randomise *stores* (geo + difference-in-differences). Ask yourself: *"Is this treatment delivered to a person or to a place?"*
- **Match the model to the action:** if the action is "who do we discount," the target is **uplift** (does my discount change their behaviour), **not churn** (are they likely to leave). Ranking by churn spends the budget worst-first.

Both traps are easy to fall into under pressure. Catch them by naming the *decision* before the method.

---

## 1. Clarify before building (structured, not a list of objections)
Open with the frame, then hang the questions off it:
> "Before I build anything I'd pin down four things, because they change the whole approach: what we mean by churn, what decision the model drives, what we've already tried, and how we test it without bleeding margin."

- **Define churn + window.** Here: a loyalty-app customer with **no transaction in 60 days**; we predict who lapses in the next 30. The definition *is* the label.
- **What action follows the prediction?** "Send a discount" to the target is **uplift**, not churn. (The killer clarifying question.)
- **Prior evidence / holdout.** Any past experiment? Here: only untargeted price-lock promos with no control group, so the read is messy. Even a rough past promo gives a baseline.
- **Success metric + budget guardrail.** Incremental profit *net of discount cost*, with a **margin floor** finance won't cross. Retained customers alone is not enough.
- **Geo / segment focus + the real business trigger.** Ask "what's driving this now — retention gap, competitor, margin target?" **Not** "is there another motive" (reads as distrust). Same info, professional framing.
- **Move in parallel.** "I'd review the data and prior tests first since they shape the design, but I can scope the plan and the experiment in parallel" — not "I can't start until I have everything."

---

## 2. The targeting logic (this part was strong)
From the app data, narrow to the customers worth spending margin on:
- **Refuelled *at all* through the app** (not at a specific site) — so moving suburb doesn't count as churn as long as a 7-Eleven is in reach. Only real exclusion: **no nearby store**.
- **Previously-regular fuel buyers who suddenly went quiet** — filled every 2-3 days, then stopped. This tight bucket strips out most "would've bought anyway" noise.
- **Attached basket** — average basket size and margin that came with each fill. A lapsed customer with a good shop basket is worth more to win back.

Good bucket selection reduces the noise — but it does **not** remove the uplift point (Section 4).

---

## 3. Experiment design — prove the discount *caused* incremental profit

### The default here: randomise customers, not stores
The discount is delivered to individuals **through the app**, so the experimental unit is the **customer**:
1. Take the target segment (lapsed valuable regulars).
2. **Randomly split** into **treatment** (gets the app discount) and a **held-back control** (business as usual).
3. Randomisation makes the two groups statistically identical on average — even on things you can't measure — so any post difference is **causal**.
4. Measure return rate, fuel volume, basket, and **incremental profit net of discount cost**, treatment vs holdout. That gap **is** the uplift.

Why customer-level beats geo here: **no store-level contamination** (two customers at the *same* store can be treatment vs control, because board price is irrelevant to an app discount); **far more power** (thousands of customers vs a handful of stores to detect a smaller effect faster); **measures incremental profit per customer directly** — the number finance wants. A randomised holdout is the gold standard for uplift.

### When geo *is* right (show the judgment)
The moment the lever becomes a **board/pump-price change everyone at the site sees**, you can't split customers at one store to geo test with matched stores + **difference-in-differences**. Keep local competition as a **covariate** (stratify/block on competitor intensity) either way.

### If you do run a geo test: picking control stores you trust
The enemy is **contamination / spillover** (interference): treated and control must **not share customers**, or DiD understates the effect.
- **Separate:** control stores **outside the treated store's catchment** — a different trade area, non-overlapping customer pool. Not "down the road."
- **Match:** on baseline fuel volume, basket, **pre-period trend (parallel trends — the core DiD assumption)**, local competition, and site type.
- **Measure with difference-in-differences:** `(test after - test before) - (control after - control before)` — the control cancels out season, fuel-price cycle, weather.
- **Synthetic control (cleaner):** build a *weighted blend* of many untreated stores that reproduces the treated store's pre-period path, then measure the gap.
- **Many pairs, not one** (power), and **actively watch for spillover** — if a control near a treated store moves oddly, drop it.
- **Run long enough** to beat novelty effect; primary metric incremental profit, guardrails on volume and margin.

---

## 4. The model — predict uplift, not churn

### Why not churn
"Likely to churn" and "will respond to my discount" are **different axes**. Among even a clean bucket of lapsed regulars:
- Some lapsed for a **benign temporary reason** (holiday, work travel, partner filled the car) and return on their own to discount is **wasted margin**.
- Some **genuinely defected** to the competitor's app to a few cents won't pull them back to **wasted budget**.
- Only the **persuadable middle** earns money.
A churn score doesn't separate these — and the **highest** churn scores are often the **least** persuadable (truly gone), so churn-ranking spends worst-first. Churn targeting is a defensible v1; **uplift is the answer that spends a limited budget optimally.**

### Build
- **Baseline:** logistic regression for interpretable probabilities + metrics.
- **Main model (tabular):** **gradient boosting (XGBoost / LightGBM)**, hyperparameter-tuned (tree depth, class balancing).
- **Uplift via two-model / T-learner:** train one model on the **treated** group and one on the **control** group; **predicted uplift = treated probability - control probability**; rank customers by that difference.
- **Features:** recency (days since last fill), fuel frequency (fills/week), average basket size and margin, tenure, location / nearest-store distance, local competitor presence, historical price sensitivity.
  - **Leakage watch:** keep the feature windows *before* the label window so "bought recently" doesn't leak the churn label.
- **Cold-start (thin history):** back off to the **segment / "people like them" average** (shrinkage), leaning on the individual more as data grows; exclude truly unreachable customers (no nearby store).

### Monitor in production (this instinct was good)
- **Model metrics:** track uplift/Qini each cycle; alert on drift or decay to trigger retraining.
- **Business dashboard:** incremental profit / margin **versus baseline**, discount cost, redemption, return rate to catch it when the model quietly goes wrong, fast. Business tracking, not just model metrics.

---

## 5. Evaluating uplift — the Qini curve
You **can't** score uplift with AUC/precision, because you never observe both outcomes (discount / no discount) for one person. Use the **Qini (uplift) curve**:
1. **Rank** customers by predicted uplift, highest first.
2. Walk down the list; at each cut ("top 10%…"), compare the **actual** treated response rate to the control response rate in that group.
3. That difference × group size = **incremental** returns from treating them.
4. **Plot** cumulative incremental gain (y) vs % targeted (x).

```
 Incremental
 returns ^            ______  good uplift model (steep early)
         |        ___/
         |      _/     . . . . random targeting (diagonal)
         |    _/  . . .
         |  _/. .
         +----------------------------> % of customers targeted
         0%                        100%
```
- **Steep early rise = good** (high-ranked customers really did respond more when treated).
- **Area over the diagonal = Qini coefficient** (the AUC/Gini of uplift; bigger = better).
- **The peak = where to stop** — beyond it the curve flattens then can turn **down**: the **"sleeping dogs"** with *negative* uplift (the discount annoys them / reminds a lapsed customer to leave). **Do not target them.**

**Use:** rank lapsed regulars by uplift, read the Qini curve, target the top fraction that **maximises incremental profit within budget** — often not everyone, explicitly excluding sleeping dogs.

---

## 6. The lines to remember
- **"Is this delivered to a person or a place?"** to picks customer-randomisation vs geo.
- **"What decision does the model drive?"** to discount to **uplift, not churn**.
- **Control stores:** matched on volume/basket/pre-trend/competition, **geographically separated** so they don't share customers to DiD or synthetic control, watch for spillover.
- **Uplift build:** two-model T-learner on the randomised holdout; rank by treated-minus-control probability.
- **Evaluate with Qini, not AUC;** the downturn flags sleeping dogs.
- **Always close on the guardrail:** primary metric incremental profit, hard **margin floor**, business dashboard alongside model metrics.
