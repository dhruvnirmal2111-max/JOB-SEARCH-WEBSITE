# 7-Eleven — Night-Before Card, Sample Answers & Mock Debrief

> One sheet to run through before you walk in. Part 1 = the drill card (do this last, right before). Part 2 = polished sample answers to every question we practised. Part 3 = concept one-liners. Part 4 = the debrief (your patterns).

---

# PART 1 — NIGHT-BEFORE DRILL CARD

### The metrics flashcard (say aloud until zero hesitation — your #1 risk)
- **Classification** (predicting a category / yes-no): **accuracy, precision, recall, F1, AUC.** NOT accuracy when classes are **imbalanced** → use precision/recall/F1 (or PR-AUC).
- **Regression / forecast** (predicting a number): **MAE, RMSE, MAPE, WMAPE.** Never "precision" for a forecast.
- **AUC** = probability the model ranks a random positive above a random negative; 0.5 random, 1.0 perfect; threshold-independent.

### The "always close" reflex (kills your recurring gap)
End **every** analytical answer with how you'd prove it:
> "…and I'd validate it with **[time-split backtest / geo test + difference-in-differences / cross-validation / the realised business outcome]**."

### The 6 fuel fundamentals (for the Head of Fuel Pricing)
1. Fuel demand is **inelastic**, but **station choice is very elastic** → price *relative to competitors* drives volume.
2. **Margin vs volume**, judged on **total profit = fuel margin × volume + shop basket.**
3. **Why not accuracy** → precision/recall/F1; **AUC** = ranking quality.
4. **Precision/recall trade-off** set by cost of false-positive vs false-negative; threshold is a business lever.
5. **Can't A/B fuel price per customer** → **geo / switchback + difference-in-differences**, guardrail on volume.
6. **Split by time, no leakage, beat a baseline.**

### Delivery
- Pause before answering: "good question, let me structure that."
- Signpost: "Two parts — how I'd think, then how I'd test."
- Land the last line and **stop**. No trailing "…so".

---

# PART 2 — SAMPLE ANSWERS (all mock questions)

## Q1. "Tell me about yourself"
**Beats:** analyst → pushed into DS → 5 clients · pricing proof (A$2M) · ML proof (A$12B) · why 7-Eleven.

> "Hi Priya, hi Marcus. I'm Dhruv — a data scientist at a data and analytics consultancy in Melbourne. I was hired as a data *analyst* two years ago, but it's a lean team where you wear every hat, and I pushed us toward machine learning and grew the role into data science. I own five enterprise clients end to end — framing the problem, building the model or pipeline, and presenting to senior stakeholders.
>
> The work I'm proudest of, and why I'm drawn to this role, is on the commercial side. I ran a pricing and margin project for a multi-venue restaurant group — I built the analysis that showed where their margin was leaking by product, venue and supplier, and it fed directly into supplier negotiations and about **A$2 million** in savings. That's what got me hooked on pricing.
>
> On the heavier ML side, I built a classifier over a client's roughly **A$12 billion** spend book — about 20 million rows — that cut a month of manual categorisation down to a single day's run, and became the template we reuse across clients. I've also done demand forecasting, and I ship models end to end and check their accuracy in production.
>
> What I want next is to go deep on pricing and product analytics, and 7-Eleven is a place where pricing is a genuinely hard, high-impact data problem — exactly the work I want to be doing."

## Q2. "Walk me through the A$2M project — how did you find the leak, and how did you know you were right?"
> "They had one ask — 'we know there's savings in our spend, we don't know where.' No brief. So first I built the foundation: I categorised their spend with clustering into ~1,000 buckets, using Pareto — I manually reviewed the high-value head (the ~20% of items that make up ~80% of spend) for accuracy, and used ML for the long tail.
>
> Then the analysis: for each category I tracked **unit price year-over-year, like-for-like at the SKU level**, so I wasn't fooled by mix or pack-size changes, and I **benchmarked the moves against market trends** to tell a genuine bad deal from a supplier passing through a real cost rise. The dashboard surfaced it by category, venue and supplier.
>
> That flagged one of their largest suppliers whose unit prices had crept up beyond the market. **How I knew it was right: they took it straight into a renegotiation and *realised* about A$2 million in savings that year** — validated by the outcome, not just my model."

## Q3. "Should we raise the pump price 2c/L — how would you decide, and how would you test it?"
> "Two parts — how I'd decide, then how I'd test.
> **Decide:** raising 2c gives more margin per litre but costs volume, because while overall fuel demand is inelastic, *station choice* is very elastic — people cross the road for 2c, especially with price apps. And fuel is a thin-margin traffic driver: a lost fill-up also loses the high-margin shop basket, the coffee and snacks. So I'd judge it on **total profit — fuel margin × volume plus shop basket** — using our elasticity estimate, nearby competitor prices, and where we are in the price cycle.
> **Test:** I can't A/B by customer since everyone sees the board price, so I'd run a **geo test** — raise it at a set of sites, hold matched control sites, and use **difference-in-differences** to strip out the cycle and weather. Guardrails on volume and market share, primary metric total profit. Run it long enough to beat novelty, then roll out if net profit's up."

*(Difference-in-differences = (test after − test before) − (control after − control before); the control cancels out what would've happened anyway.)*

## Q4. "Forecast daily fuel demand per site — approach, and how do you know it's good?"
> "This is a forecasting problem — predicting litres per site per day. **Features:** historical daily volume plus the drivers — day-of-week, public and school holidays, weather, our own and competitor prices, local events, seasonality. **Model:** I'd start with **Prophet** — it handles trend, seasonality and holidays and takes external regressors — and benchmark it against LightGBM on lag features if there's non-linear signal. **Evaluation:** I'd **backtest with a time-based split** — train on the past, predict the next window, roll forward — never random, so I don't leak the future. I'd measure with **WMAPE** and RMSE, and it only counts as good if it clearly **beats a seasonal-naive baseline** and the error's within what staffing and deliveries can tolerate."

## Q5. "Tell me about the most challenging project — what made it hard, how you got through it."
> "Recently we nearly lost a government client we'd had for five years — before their end-of-financial-year panel they said our spend categorisation wasn't good enough, and the panel wasn't happy with the dashboard. I was brought in to fix it fast, on a ~A$12B, ~20-million-row book.
>
> We used Pareto — manually verified the high-value head as the training set — and I built the ML for the tail: a **one-vs-all** text classifier over ~100 categories (too many for a single multi-class model). The invoice descriptions were messy, so I cleaned them hard — a stopword list of terms that appear across many categories, to cut noise — started with TF-IDF and logistic regression as a baseline, and moved toward embeddings since the descriptions carry meaning. I **aimed for high precision** — anything the model auto-labelled had to be right, so I set a **0.75 probability threshold and routed everything below it to manual review**. I validated with cross-validation and had an analyst QA a sample.
>
> **Precision came out strong, the panel signed off on the EOFY analysis, and we kept the client — they resigned the contract recently.**"

---

# PART 3 — CONCEPT ONE-LINERS (if they probe)

**AUC:** "The probability the model ranks a random positive above a random negative — 0.5 is random, 1.0 perfect. Threshold-independent; I'd use PR-AUC if positives are rare."

**Difference-in-differences:** "Compare the before-to-after change at treated sites to the change at matched control sites; the control captures what would've happened anyway, so the leftover is the causal effect. Relies on parallel trends beforehand."

**Feature store:** "A central, versioned place for model features so training and serving use identical inputs — kills training/serving skew, and lets models reuse features. Offline store for training (point-in-time correct, no leakage), online store for fast real-time lookups."

**Uplift modelling:** "Predicts the *incremental* effect of an offer, not raw propensity, so you don't waste discounts on people who'd buy anyway. Needs a randomised treated/control split; simplest build is a two-model approach — model the treated group, model the control, and the difference is the uplift. Evaluate with a Qini curve, not AUC."

**Cold start (not enough data on a customer):** "Back off to 'people like them' — the store/segment/signup-channel average — and lean on the individual more as their history grows. The clean version is shrinkage: blend individual with the group prior, weighted by how much data you have. For truly new customers, explore to learn rather than pretend to predict."

**What counts as 'enough data':** "No magic number — it's when the individual signal is more reliable than the group. Practically: when the estimate stabilises, or the confidence interval is tight enough for the decision's stakes. Ideally shrinkage removes the hard threshold entirely."

---

# PART 4 — DEBRIEF (your patterns)

**Strengths:** strong commercial instinct (basket, competitor, elasticity), real technical depth (one-vs-all, Pareto, embeddings, DiD), great stories with real stakes (A$2M, kept-the-client, A$12B), and standout **coachability** — you applied every correction on the next rep.

**The 3 things that held you back (all fixable tonight):**
1. **Metrics fundamentals** — you said "precision" for a forecast and "accuracy" on an imbalanced multi-class. Highest-risk because it's asked early and directly. → Drill the flashcard (Part 1).
2. **The "always close" gap** — first-pass answers skipped the validation/test/result half three times. → Weld on the always-close reflex.
3. **Rambling / trailing off** — tighten to a few filler-free sentences per beat; land the last line and stop.

**Score trend:** every answer jumped ~2 points once you added the validation/metric/close. That *is* the lesson — bake those in from the first pass.

**If interviewed today:** solid on thinking and commercial sense; at risk from one basic metrics question. Fix that + always-close = **confident pass.** Ceiling is high — get the floor solid.
