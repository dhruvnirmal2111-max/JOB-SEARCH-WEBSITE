# 7-Eleven Interview Prep — Data Scientist, Advanced Analytics & Pricing

> Round 2 (deep dive), Mon PM / Tue AM. First round (intro) done; revised resume sent per interviewer feedback. This is the only active interview. Buckle up.

---

## 1. The read: what they're testing

**Role:** Data Scientist in the **Advanced Analytics & Pricing** team (part of 7-Eleven's "Better Buying & Pricing" function). Build and improve **pricing, forecasting and ML models** that drive commercial decisions. Richmond VIC, hybrid.

**They want:** Python, SQL, Databricks, PySpark, ML/stats modelling, comfort with large datasets, and someone who works with stakeholders and turns sales/market data into pricing decisions.

**Your fit (lead with these):**
- Real pricing + margin work with a hard commercial outcome (~A$2M).
- Forecasting in production (Prophet, external regressors, measured error).
- An end-to-end ML classifier over ~A$12B of data (scikit-learn, imbalance, CV).
- You own accounts end to end and present to senior stakeholders (CPO). That is exactly the "work with stakeholders, influence decisions" ask.

**Two honest gaps (don't hide, bridge them — see §7):**
1. No retail / fuel / loyalty domain experience yet.
2. No formal A/B experiment design experience.

---

## 2. 7-Eleven pricing world — domain cheat sheet (so you sound like an insider)

7-Eleven AU: ~700 stores, ~$1.9B revenue, convenience + **fuel**. Pricing is genuinely hard here — talk to these:

- **Fuel price cycles.** Australian petrol prices move in sawtooth "price cycles" (sharp jump, slow decline over days/weeks). Retailers decide when to restore (hike) and how fast to discount. This is a forecasting + optimisation problem: predict the cycle, competitor moves, and demand response.
- **My 7-Eleven "Fuel Price Lock" app.** Customers lock the lowest nearby price for up to 7 days (up to 150L, max 25c/L off). This is a pricing *product* — it generates a huge behavioural dataset (who locks, when, redemption, elasticity of locking vs buying) and is itself a margin lever. Great thing to be curious about.
- **Hyperlocal pricing.** They adjust price/promo/inventory per store using foot traffic, local events, weather, competitor sites nearby. Store-level demand modelling.
- **Convenience merchandise pricing.** Coffee, drinks, snacks — high-frequency, habitual, promotion-sensitive. Margin mix, meal-deal bundling, cannibalisation.
- **Loyalty.** My 7-Eleven app + Velocity Frequent Flyer points. Personalised offers, targeted discounts, redemption analytics.

**One-line you can drop:** "The Fuel Price Lock app is a fascinating pricing mechanism — you're essentially letting customers hedge against the price cycle, which must generate rich data on price sensitivity and lock-vs-buy behaviour. I'd love to know how the team models that."

---

## 3. Your hero stories (STAR) — tell them as complete, connected narratives

The interviewer's exact feedback last round: *points were good but didn't connect; make each a complete story; name the tools.* So each story = **Situation → Task → Action (with tools + method) → Result → what you'd do next.**

### Story A — Pricing & margin (the A$2M story) — LEAD WITH THIS
- **S:** A restaurant group across AU/NZ (client of my consultancy) felt their supply costs were too high but couldn't see where margin was leaking. No clear brief, just a concern.
- **T:** As sole analyst on the account, scope it and give the procurement team something to act on.
- **A:** Built a ~3,000-item product catalogue as the foundation; then a pricing-decision dashboard tracking price movement and cost leakage drilling from category → product → venue → supplier (Python: pandas, numpy; SQL). Built a second dashboard flagging cheaper substitute items. Ran bi-weekly reviews directly with the Chief Procurement Officer and category managers.
- **R:** Surfaced ~30% savings, roughly **A$2M** over a year, in their largest category, used directly in supplier negotiations.
- **Next / reflection:** If I had demand data I'd have closed the loop from cost to shelf price to volume. (This is your natural bridge to *retail* pricing.)

### Story B — ML classifier over ~A$12B spend
- **S:** A client's 5-year, ~A$12B spend book was only ~60–65% categorised; manual categorisation took an account manager 1–1.5 months per cycle.
- **T:** Automate it; I led the firm's first ML approach to this.
- **A:** One-vs-all binary classifier per category (1 = in-category, 0 = rest). Text features from transaction descriptions with **TF-IDF** (now moving to **embeddings** for better semantic matching), plus feature-engineered signals (spend value, line count). **LogisticRegression with class weights** for heavy imbalance; **GridSearchCV + cross-validation** for tuning. Pareto split: high-value head reviewed manually, long tail modelled.
- **R:** Cut the cycle from 1–1.5 months to a **single day's run**; documented into a reusable pipeline now used across clients.
- **Why it matters here:** shows you handle imbalance, evaluate properly (precision/recall/F1, not accuracy), and productionise.

### Story C — Forecasting (Prophet)
- **S:** A fresh-produce client needed to plan raw-material and chemical inventory 3 months ahead; some inputs sourced internationally.
- **T:** Give them a reliable forward view to order against.
- **A:** **Prophet** time-series model, 3 months ahead, with **external regressors** including sea-freight price trends; prepared data in pandas; backtested on held-out periods; delivered on a dashboard.
- **R:** Forecasts within a **12.5–14% error margin**, inside the client's tolerance.
- **Bridge to 7-Eleven:** same muscles as fuel-demand or store-level sales forecasting — seasonality, external drivers (weather, events, price), backtesting.

### Story D — Facit (range + product instinct)
Built a café-profitability SaaS unifying POS, wages and supplier invoices into a weekly read on food cost %, gross margin and price movement. Shows you ship analytics an end user *trusts and opens weekly*, and think about pricing/margin from the operator side.

### Supporting: internal automation
Built an internal LLM workflow that auto-generates client reports with a QA check; adopted across the analyst team (~25–30 accounts), saving ~12–15 hrs/week. (Label clearly: **internal to my own firm.**) Shows initiative + you make teams faster.

---

## 4. Technical Q&A — likely questions + model answers

### Pricing & commercial
- **"How would you measure price elasticity of demand?"** % change in quantity / % change in price. Estimate from historical price variation (log-log regression: coef on log price = elasticity), ideally from natural experiments or promo periods. Watch confounders (seasonality, competitor price, stockouts). Elastic (|e|>1) → cutting price grows revenue; inelastic (|e|<1) → you can hold/raise. For fuel, demand is fairly inelastic short-term but *station choice* is very elastic (people drive to the cheap one).
- **"How would you evaluate whether a promotion worked?"** Incremental lift vs a counterfactual, not raw uplift. Ideal = control stores / holdout (A/B). Without that: pre/post with matched control group, difference-in-differences, account for cannibalisation (did it just pull forward demand or steal from other SKUs?) and margin (a discount that lifts volume can still lose money).
- **"Cost went up 10%, should we raise price?"** Depends on elasticity, competitor pricing, and role of the product (traffic-driver/loss-leader like coffee vs margin product). Frame the trade-off: margin per unit vs volume vs basket/halo effect. Don't just pass cost through blindly.

### Forecasting
- **"Why Prophet? When would you not use it?"** Prophet: fast, handles seasonality/holidays/regressors, robust to missing data, interpretable — great for business forecasting with clear seasonal structure. Wouldn't use it for high-frequency/high-volume where SARIMA, gradient-boosted trees (LightGBM on lag features), or deep models do better, or when relationships are highly non-linear. Always benchmark against a naive/seasonal-naive baseline.
- **"How do you evaluate a forecast?"** Backtest with time-series cross-validation (rolling origin), not random splits. Metrics: MAPE / WMAPE (business-friendly), RMSE/MAE. Compare to a naive baseline. Check residuals for remaining structure.
- **"External regressors?"** Yes — I used sea-freight trends. For 7-Eleven: weather, local events, day-of-week, holidays, competitor price, own price.

### Machine learning
- **"Why not accuracy for your classifier?"** Heavy class imbalance — accuracy is misleading (predict majority = high accuracy, useless). Used precision/recall/F1 per class; chose the threshold to fit the business cost of false positives vs negatives.
- **"How did you handle imbalance?"** Class weights in LogisticRegression; could also resample (SMOTE) or adjust the decision threshold. Validated with stratified CV.
- **"How do you prevent overfitting?"** Train/validation/test split by time where relevant, cross-validation, regularisation (L1/L2), keep the model as simple as the problem allows, watch train-vs-val gap.
- **"Linear/logistic regression assumptions?"** Linearity (in log-odds for logistic), independence, low multicollinearity, homoscedasticity (linear). Be ready to explain coefficients as interpretable levers — useful for pricing.

### Statistics & experimentation (YOUR GAP — study this hardest, §7)
- **A/B test basics:** define hypothesis + primary metric, randomise unit (customer/store), compute sample size from MDE + power (usually 80%) + significance (usually 5%), run, check for peeking, analyse with a t-test / proportion test, watch novelty effects and network/geo spillover. For pricing, often **geo/store-level** tests (switchback or matched-market) since you can't randomise price per customer easily.
- **p-value / confidence interval / Type I & II errors:** know these cold (see §7 drill).

### SQL (expect a live question)
- Know **window functions** (`ROW_NUMBER`, `RANK`, `LAG/LEAD`, running totals with `SUM() OVER`), CTEs, joins, `GROUP BY` + `HAVING`.
- Likely prompt: *"Find each store's month-over-month sales growth"* or *"top-selling product per category."* Practice: `LAG(sales) OVER (PARTITION BY store ORDER BY month)` for MoM; `ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC)` for top-N.

### Python / pandas
- groupby-agg, merge/join, pivot, handling nulls, vectorisation over loops. Be ready to write a small function live.

### Databricks / PySpark
- You have real proof (VCDI: distributed anomaly detection in Databricks/PySpark, +20%). Talk to: Spark distributes across a cluster for data too big for one machine; DataFrame API; lazy evaluation; when you'd use Spark vs pandas (data size). Honest: most of your recent work is pandas/SQL scale — say so, and note the Spark work at VCDI.

---

## 5. The pricing CASE — a framework to reason out loud

If they give a case ("How would you help us optimise pricing for coffee / fuel / a category?"), **don't jump to a model.** Structure it:

1. **Clarify the goal & constraints.** Revenue, margin, volume, or traffic? Over what horizon? Any brand/competitor/regulatory limits? (Fuel pricing is politically sensitive + monitored.)
2. **Understand the product's role.** Traffic-driver/loss-leader (coffee, fuel) vs margin product. Habitual vs impulse. That changes the objective.
3. **Data I'd want.** Transaction-level sales, current price + price history, competitor prices, cost/margin, store attributes (location, foot traffic), promo calendar, loyalty/basket data, weather/events.
4. **Approach, simplest-first.**
   - Descriptive: where are we vs competitors, margin by SKU/store.
   - Elasticity estimation from historical + promo variation.
   - Optimisation: choose price to maximise the objective subject to constraints; simulate scenarios.
   - Validate with a **geo/store A/B test** before rollout.
5. **Watch-outs.** Cannibalisation, basket/halo effects, competitor reaction, fairness/optics (fuel), stockouts confounding demand.
6. **Close the loop.** Monitor, measure lift vs control, iterate.

**Say the meta-point:** "I'd start descriptive and get a testable hypothesis in front of stakeholders fast, rather than build a big model in a vacuum — then validate with a controlled test before scaling." That mirrors how you actually work and de-risks you.

---

## 6. Behavioural bank (STAR, 60–90 sec each)

- **Ownership / carried something end-to-end:** the A$2M account — sole analyst, framed it, built it, presented to the CPO.
- **Influencing without authority / stakeholder mgmt:** running bi-weekly reviews with a CPO and category managers; translating analysis into decisions they acted on.
- **Ambiguity:** the pricing brief was just "costs feel high" — you scoped it into testable questions.
- **Initiative / making the team better:** the internal report-automation (saved 12–15 hrs/wk).
- **Failure / what you'd do differently:** pick one real thing (e.g. a first model version too complex, or a forecast miss) and show the learning + fix. Be honest, land on the lesson.
- **Handling feedback:** literally this process — interviewer said stories didn't connect, you rebuilt the resume into complete narratives. Meta-proof you take feedback well.

---

## 7. Closing the two honest gaps

**Gap 1 — retail/fuel/loyalty domain.** Don't apologise. Say: "My pricing work has been on the *cost and supplier* side — I've built the tools that track price movement and margin and drive negotiation. The retail demand side is new to me, but it's the same core discipline: price, cost, margin, elasticity, forecasting. I've done the homework on how 7-Eleven prices fuel and convenience, and I'm genuinely excited to work the demand side." Then show the domain knowledge from §2.

**Gap 2 — formal A/B experimentation.** This is the most likely thing to expose you. Spend real time here. Know cold:
- Hypothesis, primary vs guardrail metrics, randomisation unit, sample size / power / MDE, significance level, t-test vs proportion/chi-square, one vs two-tailed, peeking problem, novelty effect.
- **Type I error** = false positive (reject a true null), rate = α (5%). **Type II** = false negative (miss a real effect), rate = β; **power** = 1−β (aim 80%). **p-value** = P(data this extreme | null true), NOT P(null true). **95% CI** = range of plausible values; if it excludes 0/1.0, significant.
- For pricing specifically: **geo/market-level or switchback tests** (you can't cleanly randomise price by customer). Mention this — it shows applied understanding.
- Honest line: "I haven't run a formal experimentation program, but I understand the design and I'm comfortable owning it — here's how I'd design one for a price change." Then walk §5 step 4.

---

## 8. Smart questions to ask them (pick 3–4)

- "How does the team currently decide fuel price restores — how much is model-driven vs analyst judgement?"
- "What does the modelling stack look like day to day — Databricks-first, and where do pricing decisions actually get made?"
- "How do you measure the impact of a pricing or promo change — do you run controlled/geo tests?"
- "What's the biggest open pricing problem the team wants to crack in the next year?"
- "How does the Fuel Price Lock data feed into pricing models?" (signals genuine curiosity)
- "What would a strong first 6 months look like in this role?"

---

## 9. Thu → Mon study plan

- **Thu (tonight):** read this doc end to end. Rehearse Story A + B out loud, timed (~90s each). Skim §2 domain.
- **Fri:** drill §4 technical answers out loud. Do 5–8 SQL window-function problems (LAG for MoM, ROW_NUMBER for top-N, running totals). Re-derive elasticity + promo-lift logic.
- **Sat:** experimentation deep-dive (§7 gap 2) until it's automatic — Type I/II, power, p-value, geo tests. Then a live mock with me (technical + case).
- **Sun:** case practice (§5) on 2–3 prompts (fuel, coffee, a slow SKU). Behavioural bank (§6) — say each aloud once. Polish your 3 questions to ask.
- **Mon AM:** light. Re-read §1, §2, your 3 hero stories, and the gap lines. Logistics: know if it's in-person (Richmond) or video, who you're meeting, resume copy handy. Arrive calm.

---

## 10. Mindset
You already passed the first round and they liked you enough to give feedback and continue. They're not trying to catch you out; they want to see how you think. Be structured, say your reasoning out loud, start simple, and be honest about the two gaps while showing you've done the work. You've got real, quantified pricing + forecasting + ML stories. Tell them like you own them.
