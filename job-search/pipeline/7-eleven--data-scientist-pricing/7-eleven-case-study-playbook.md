# 7-Eleven - Case-Study Playbook (Second Round)

> The second round for a pricing/analytics DS role is almost always an open, ambiguous business case. They are watching **how you think**, not whether you recall a formula. This playbook gives you (1) a repeatable structure that cracks any case, (2) the rules that keep you out of the classic traps, and (3) three fully worked 7-Eleven cases. Golden rule: **think out loud, structure first, state assumptions, and always say how you would measure success.**

---

## PART 1 - The universal case structure (memorise this spine)

Whatever they ask, walk these six steps out loud. It reads as senior every time.

**1. Clarify the goal and the decision (30-60 seconds, do NOT skip).**
- "Before I dive in, let me make sure I'm solving the right problem."
- Pin down: what business outcome are we chasing, what decision does this inform, what's the constraint (budget, margin floor, timeline), and any scope (which sites, which customers, which product).
- The one question that reframes most cases: **"What action gets taken based on this?"** That tells you whether it's prediction, causal, optimisation, or just measurement.

**2. Define success up front.**
- State the **primary metric** (incremental profit, retained customers, forecast error) and the **guardrails** (don't cross a margin floor, don't hurt volume). "I'd optimise for X, guardrailed on Y."

**3. Structure the problem (break it into parts).**
- Out loud, split it into 2-4 chunks: data to method to test to rollout. Or by driver (price to volume to basket to total profit). Structuring first is what separates a hire from a rambler.

**4. Data and approach.**
- What data would I want, what would I actually build (start simple to a baseline, then the model), what features, what assumptions. Name assumptions explicitly: "I'll assume we can deliver offers through the app."

**5. How I'd test / measure it (never skip - your recurring gap).**
- The causal question: how do I know my change *caused* the result? to experiment design (customer randomisation vs geo, difference-in-differences), a baseline to beat, and the metric.

**6. Risks, trade-offs, and next step.**
- Name what could go wrong (margin erosion, novelty effect, spillover, data quality), the main trade-off (margin vs volume, precision vs recall), and what you'd do first. Close with a recommendation, not a shrug.

**The 10-second version to say at the start:** "I'll clarify the goal, define what success looks like, structure the drivers, talk through the data and approach, then how I'd test it and the risks."

---

## PART 2 - The rules that keep you out of the traps

1. **Match the tool to the decision.** Predicting who churns is not the same as who to spend budget on (that's uplift). Predicting a number to regression/forecast. A yes/no to classification. Grouping with no labels to clustering.
2. **Match the experimental unit to the lever.** Personalised / in-app to randomise customers. Board price everyone sees to geo test + difference-in-differences.
3. **Always start with a baseline.** The simplest thing that could work (seasonal-naive forecast, current pricing rule, majority-class). You have to beat it or the fancy model is pointless.
4. **Total profit, not one lever.** Fuel is margin x volume PLUS the shop basket. Never optimise fuel margin alone.
5. **State assumptions out loud** and check them: "I'm assuming we can measure basket per customer; if not, I'd..."
6. **Right metric for the job.** Classification to precision/recall/F1/AUC. Forecast to MAE/RMSE/MAPE/WMAPE. Never "accuracy" on imbalanced data, never "precision" for a forecast.
7. **Causation needs an experiment.** Correlation in the data is a hypothesis, not proof. Close with how you'd run the test.
8. **Say the number you can't compute.** "I'd want the elasticity here; I don't have it, so I'd estimate it from a geo test." Naming the gap is stronger than glossing it.

---

## PART 3 - Worked case A: PRICING ("should we move the pump price 2c?")

**Clarify:** What's the goal, total profit or volume/market share? Which sites? Over what horizon? Any competitor context?

**Success:** Optimise **total profit = fuel margin x volume + shop basket**, guardrail on volume and market share.

**Structure:** three drivers, margin per litre, volume response, and the attached basket.

**Approach:**
- Fuel demand overall is **inelastic** (people still drive), but **station choice is very elastic** (drivers cross the road or use an app for a few cents). So volume depends on our price *relative to nearby competitors*, not the absolute price.
- Estimate the site's **elasticity vs the local competitor**, model the volume I'd lose from +2c, and weigh the extra margin per litre against the lost volume AND the lost high-margin basket from fill-ups that walk away.

**Test:** I can't A/B a board price by customer (everyone sees it), so a **geo test**, raise at a set of sites, hold matched control sites (separated so they don't share customers), and use **difference-in-differences** to strip out the price cycle and weather. Primary metric total profit, guardrail volume. Run long enough to beat novelty, then roll out if net profit is up.

**Risks:** competitor reaction, cannibalising the basket, cycle contamination. Trade-off is the classic margin vs volume.

---

## PART 4 - Worked case B: FORECASTING / OPS ("forecast fuel demand per site")

**Clarify:** What decision does the forecast drive, staffing, deliveries, inventory? What horizon (next day, next week)? Per site or network?

**Success:** Forecast error low enough that staffing and deliveries can rely on it; beat a seasonal-naive baseline; measured with **WMAPE** (volume-weighted, so big sites count more) plus RMSE.

**Structure:** what drives daily volume, then model, then validate.

**Approach:**
- Features: historical daily volume, day-of-week, public and school holidays, weather, our price and competitor prices, local events, seasonality, fuel-price cycle.
- Model: start with **Prophet** (trend + seasonality + holidays + regressors, interpretable) and benchmark **LightGBM on lag features** if there's non-linear signal.
- Careful with future regressors: for a multi-day horizon you need future values of price/weather, so use forecasts, forward views, or lagged features.

**Test/validate:** **time-based backtest** (train on the past, predict the next window, roll forward), never a random split (it leaks the future). Only "good" if it clearly beats the **seasonal-naive** baseline and the error is inside operational tolerance.

**Risks:** holidays and events, new sites (cold start to lean on similar-site averages), data gaps. Trade-off is accuracy vs how far ahead you forecast.

---

## PART 5 - Worked case C: OPEN GROWTH ("how would you use data to grow shop revenue?")

This is the scary open one. Structure saves you.

**Clarify:** Grow shop revenue specifically (not fuel)? Over what horizon? Any lever off-limits (can't change store layout)? What's the current baseline?

**Structure by the revenue equation:** shop revenue = **traffic x conversion x basket size x frequency**. Attack each lever:
- **Traffic:** fuel is the traffic driver, so competitive fuel pricing pulls more cars in (links to the pricing case).
- **Conversion (fuel customer to walks into shop):** targeted app offers, coffee-with-fuel bundles, positioning.
- **Basket size:** product-mix and menu-engineering (margin x volume, promote stars, fix or cut dogs), cross-sell, planogram.
- **Frequency:** loyalty and retention (links straight to the discount/churn case, uplift targeting).

**Pick and go deep on one:** "There are four levers; I'd prioritise by size and how measurable each is. Let me go deep on basket size because it's directly in our control." Then run the mini-structure: data to method (menu engineering + an uplift-targeted offer) to test (customer-randomised holdout, difference-in-differences) to metric (incremental profit per customer).

**Why this scores:** you turned a vague prompt into a driver tree, prioritised, and went deep with a testable plan. That is exactly what they're looking for.

---

## PART 6 - Behavioural half of round two (they will ask 1-2)
Have tight STAR stories ready (Situation, Task, Action, Result):
- **Commercial impact:** the A$2M pricing project (found the leak, drove the renegotiation).
- **Hard technical save:** the A$12B classifier that kept the government client (Pareto + one-vs-all, precision threshold, kept the account).
- **Ambiguity:** the A$2M brief was "we know there's savings, we don't know where", and you structured it yourself.
- **Stakeholder communication:** the mozzarella example, anchoring a non-technical CFO on one familiar item.
- **A failure/learning:** pick one real one, what you changed after.

---

## PART 7 - The night-before checklist for round two
- Say the **six-step spine** out loud until it's automatic.
- Lead every answer with **structure**, then fill it in. Never start with a detail.
- End every analytical answer with **how I'd test it and the metric**. This is your single biggest scoring lever.
- Fuel reflexes: **inelastic demand but elastic station choice; total profit = margin x volume + basket; geo test + difference-in-differences.**
- Retention reflexes: **uplift not churn; randomise customers for an app offer; Qini curve; margin guardrail.**
- Slow the first 20 seconds of each answer. Structure calmly, then go.
- Have your 5 STAR stories loaded.
- Ask 2-3 sharp questions at the end (the bar for the role, how model-driven pricing is today, what a strong first six months looks like).

**The one sentence that frames you as senior:** "Let me clarify the goal and what success looks like, structure the drivers, then talk through the approach and how I'd test it."
