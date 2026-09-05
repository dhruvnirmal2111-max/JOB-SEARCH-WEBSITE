# 7-Eleven JD — Line-by-Line Breakdown, with Layered Explanations

> How to use this: every concept is explained in **levels**.
> - **Level 0 — ELI5:** plain English, no jargon. What it actually means.
> - **Level 1 — In the room:** the crisp, correct answer you say out loud.
> - **Level 2 — If they dig:** the deeper technical detail for follow-up questions.
>
> After the explanation, each JD point has **Typical questions**, **Model answers**, and **Your hook** (which of your real experiences to use, and the honest bridge if it's a gap).
>
> **The JD, decoded:** they build three kinds of model — **pricing**, **forecasting**, **machine learning** — using **Python, SQL, Databricks/PySpark**, over **large retail/pricing/loyalty datasets**, working with **stakeholders** to turn **sales and market data** into **pricing decisions**. That's the whole job. We go through every piece.

---

# PART 1 — THE THREE MODEL FAMILIES (the heart of the role)

## 1.1 "Pricing models"

**What the JD says:** develop and enhance pricing models that support commercial decisions.

**Level 0 — ELI5:** A pricing model is a tool that helps answer "what price should we charge?" It looks at what happened when prices were higher or lower in the past (how many people still bought), what competitors charge, and what it costs us, then suggests a price that hits the goal — usually the most profit, or the most customers through the door.

**Level 1 — In the room:** "A pricing model links price to an outcome — usually demand or profit. You estimate how sensitive customers are to price (elasticity), factor in cost, competitor prices and the product's role, then choose the price that best meets the objective. For fuel it's especially interesting because demand for petrol overall is fairly fixed, but *which station* people choose is very price-sensitive."

**Level 2 — If they dig:**
- **Elasticity** = % change in quantity sold ÷ % change in price. You estimate it by looking at historical price changes and promotions, ideally a log-log regression (the coefficient on log(price) *is* the elasticity). Elastic (|value| > 1) → dropping price raises revenue. Inelastic (< 1) → you can hold or raise price without losing much volume.
- **The objective matters:** maximise revenue, margin, or volume/foot traffic. A coffee might be priced as a "loss leader" (thin margin) to pull people in who then buy a high-margin item.
- **Constraints:** competitor prices, brand perception, fairness/optics (fuel pricing is politically watched in Australia), and cannibalisation (a cheaper meal-deal stealing sales from à-la-carte items).

**Typical questions:**
- "How would you build a model to set the price of coffee?"
- "What is price elasticity and how would you estimate it?"
- "If our cost goes up 10%, should we raise the price?"

**Model answers:**
- *Elasticity:* Level 0 + Level 2 above. Say the formula, then give the fuel intuition — it shows applied understanding, not textbook.
- *Cost up 10%:* "Not automatically. It depends on elasticity, competitor prices, and the product's role. If it's an inelastic, non-competitive item, pass some cost through. If it's a traffic-driver like coffee or fuel, raising price could cost you the basket that comes with it. I'd frame the trade-off: margin per unit vs volume vs the halo effect on the rest of the basket."

**Your hook (honest framing — read this carefully):**
Your pricing experience is **cost-and-supplier-side**, not consumer-demand-side. You built a pricing-decision dashboard that tracked *price movement and cost leakage* to drive **supplier negotiations** and found ~A$2M in savings. That is real pricing work — but it's about what the business *pays*, not what the customer is *charged*.
- **Say it like this:** "My pricing work has been on the cost and supplier side — tracking price movement and margin to drive negotiation. The demand side, modelling how customers respond to a shelf price, is newer to me, but it's the same core discipline: price, cost, margin and elasticity. I've done the homework on how 7-Eleven prices fuel and convenience and I'm excited to work the demand side."
- Then pivot to your **forecasting** strength, which *is* directly demand-side.

---

## 1.2 "Forecasting models"

**What the JD says:** develop and enhance forecasting models.

**Level 0 — ELI5:** Forecasting is predicting the future from the past. "How many coffees will this store sell next Tuesday?" You look at the history, spot the patterns (weekends are busier, summer sells more cold drinks, paydays spike), and project them forward so the business can plan stock, staff and pricing.

**Level 1 — In the room:** "A forecast uses historical time-series data plus known drivers to predict a future value. I've built these with Prophet — it captures trend, weekly and yearly seasonality, and holidays, and lets you add external drivers. The key discipline is evaluating it honestly: backtest on periods the model didn't see, and always compare against a simple baseline."

**Level 2 — If they dig:**
- **Time series** = data points ordered in time (daily sales, hourly fuel volume). The order matters, so you can't shuffle it like normal data.
- **Seasonality** = repeating patterns (daily, weekly, yearly). **Trend** = the long-term direction. **Holidays/events** = one-off bumps.
- **External regressors** = extra inputs that help prediction. I used **sea-freight price trends** for a produce client. For 7-Eleven: weather, local events, day-of-week, own price, competitor price.
- **Evaluation:** backtest with **rolling-origin cross-validation** (train on the past, predict the next window, roll forward) — never a random split, because that leaks the future into the past. Metrics: **MAPE / WMAPE** (average % error — business-friendly), RMSE/MAE. Always beat a **naive baseline** (e.g. "same as last week").
- **When not to use Prophet:** very high-frequency or highly non-linear data — then SARIMA, or gradient-boosted trees (e.g. LightGBM) on lag features, or deep models.

**Typical questions:**
- "Walk me through how you'd forecast weekly sales for a store."
- "Why Prophet? What are its limits?"
- "How do you know your forecast is any good?"
- "How would you add weather or a public holiday into a forecast?"

**Model answers:**
- *How good:* "I backtest with rolling-origin cross-validation and report WMAPE against a naive baseline. On my produce forecast I hit a 12.5–14% error margin, inside the client's tolerance. If I can't beat 'same as last week', the model isn't earning its place."
- *Why Prophet / limits:* Level 2 above.

**Your hook (this is a STRENGTH — lean in):**
The **Prophet fresh-produce forecast** (3 months ahead, sea-freight regressors, 12.5–14% error, delivered on a dashboard). Say the whole arc: they needed to plan ordering → Prophet with external drivers → backtested → measured error inside tolerance → used to plan. Then bridge: "The exact same muscles apply to forecasting fuel volume or store-level sales — seasonality, external drivers like weather and price, and honest backtesting."

---

## 1.3 "Machine learning models"

**What the JD says:** develop and enhance ML models.

**Level 0 — ELI5:** Machine learning is teaching a computer to spot patterns from examples instead of you writing the rules by hand. Show it thousands of past examples labelled "this is category X," and it learns to label new ones itself.

**Level 1 — In the room:** "ML learns a mapping from inputs to an output from labelled examples. I built a classifier that sorts millions of transactions into spend categories. The interesting parts were the messy real-world bits: heavy class imbalance, text features, and needing it to be trustworthy enough to replace a month of manual work."

**Level 2 — If they dig:**
- **Classification** = predict a category (spam/not-spam, which spend category). **Regression** = predict a number (next week's sales).
- **Features** = the inputs the model learns from. **Feature engineering** = creating better inputs (I added spend value and line count on top of the text).
- **TF-IDF** = a way to turn text into numbers by weighting words by how informative they are (common words like "the" get low weight; distinctive words get high weight). **Embeddings** = a smarter, newer way that captures *meaning*, so "cab fare" and "taxi" land near each other even though the words differ.
- **One-vs-all** = for many categories, train one yes/no model per category, then pick the most confident. Simple, robust, easy to debug.
- **Class imbalance** = when one label is rare (99% "not this category"). Accuracy becomes useless (a model that always says "no" is 99% accurate and worthless). Fixes: **class weights** (tell the model rare mistakes cost more), resampling, or moving the decision threshold.
- **Cross-validation (CV)** = split the data into folds, train on some, test on the rest, rotate — so your score isn't a fluke of one split. **GridSearchCV** = try many model settings and let CV pick the best.
- **Metrics for imbalance:** **precision** (of the ones I flagged, how many were right), **recall** (of the ones I should have caught, how many did I), **F1** (their balance). Not accuracy.

**Typical questions:**
- "Explain a machine learning model you built end to end."
- "Why not use accuracy to evaluate it?"
- "How did you handle class imbalance?"
- "How do you stop a model overfitting?"
- "TF-IDF vs embeddings — why move?"

**Model answers:**
- *Overfitting:* Level 0: "Overfitting is when the model memorises the training data instead of learning the general pattern — like a student who memorises past exam answers and fails the real exam." Fixes: hold out a test set (split by time if it's time data), cross-validation, regularisation (penalise complexity), keep the model as simple as the problem allows, and watch the gap between training and validation scores.
- *Accuracy:* Level 2 imbalance point above.

**Your hook (STRENGTH — this is your most technical story):**
The **~A$12B one-vs-all classifier**. Tell it fully: only 60–65% was categorised and it took an account manager 1–1.5 months → I led the firm's first ML approach → one-vs-all, TF-IDF (moving to embeddings), LogisticRegression with class weights for imbalance, GridSearchCV cross-validation, Pareto split (manual head, model tail) → cut to a single day's run, documented into a reusable pipeline. Every ML concept above is something you actually did — so you can answer follow-ups from real experience, not theory.

---

# PART 2 — THE TECHNICAL TOOLKIT

## 2.1 Python

**Level 0 — ELI5:** The main programming language for data work. It's the "hands" — you use it to clean data, build models and automate tasks.

**Level 1 — In the room:** "Python is my main tool. Day to day it's pandas and numpy for wrangling, scikit-learn for modelling, and Prophet for forecasting."

**Level 2 — If they dig:** pandas = spreadsheet-like tables in code (`groupby`, `merge`, `pivot`); numpy = fast maths on arrays; scikit-learn = the standard ML library (models, CV, metrics). Prefer **vectorised** operations (whole-column maths) over row-by-row loops — much faster on big data.

**Typical questions / tasks:** "Write a function that, given a table of sales, returns each store's total by month." Practice a `groupby().agg()` live. Know how to handle missing values (`fillna`, `dropna`) and merge two tables.

**Your hook:** Every project — the classifier, the forecast, the pricing dashboards — is Python (pandas, numpy, scikit-learn). You're on solid ground; just be ready to write a small snippet.

## 2.2 SQL

**Level 0 — ELI5:** The language for getting data out of databases. It's how you ask "give me total sales per store last month" from a huge table.

**Level 1 — In the room:** "SQL is where a lot of the real analysis happens for me — joins, aggregations, and window functions to get the data into shape before Python even starts."

**Level 2 — If they dig — know these cold, they often live-test SQL:**
- **JOINs** = combine tables (inner = matches only; left = keep all of the left table).
- **GROUP BY + HAVING** = aggregate (sum per store), filter groups.
- **Window functions** = calculations across rows *without* collapsing them:
  - `LAG(sales) OVER (PARTITION BY store ORDER BY month)` → last month's sales next to this month's, for month-over-month growth.
  - `ROW_NUMBER()/RANK() OVER (PARTITION BY category ORDER BY sales DESC)` → top-selling product per category.
  - `SUM(sales) OVER (PARTITION BY store ORDER BY date)` → running total.
- **CTEs** (`WITH ... AS`) = name a sub-query to keep complex SQL readable.

**Typical questions:**
- "Find each store's month-over-month sales growth." → `LAG` + arithmetic.
- "Top 3 products by sales in each category." → `ROW_NUMBER()` in a CTE, filter `<= 3`.
- "Difference between WHERE and HAVING?" → WHERE filters rows before grouping; HAVING filters after.

**Your hook:** You use SQL across the pricing pipeline and the largest-client pipeline (~6M invoice rows). Strong ground. **Do 5–8 window-function drills before Monday** — this is the single most likely live test.

## 2.3 Databricks & PySpark

**Level 0 — ELI5:** When data is too big for one computer, you spread the work across many computers ("a cluster"). **Spark** is the engine that coordinates that; **PySpark** is controlling Spark with Python; **Databricks** is the popular platform that hosts it all (notebooks + cluster).

**Level 1 — In the room:** "Spark distributes computation across a cluster so you can process data too big for a single machine. I used Databricks and PySpark at VCDI to build a distributed anomaly-detection pipeline on large government procurement data. Most of my recent work is at pandas/SQL scale, but I understand the model and I'm comfortable getting back into it."

**Level 2 — If they dig:**
- Spark uses **DataFrames** (like pandas but distributed) and **lazy evaluation** — it plans all your steps and only runs when you ask for a result, so it can optimise.
- **When to use Spark vs pandas:** pandas fits in one machine's memory (up to a few GB comfortably); Spark for tens of GB to TB across a cluster. Don't reach for Spark on small data — it's overhead.
- Honest boundary: you're not a Spark expert; you have one real project. Say that plainly.

**Typical questions:** "When would you use Spark over pandas?" (data size / doesn't fit in memory). "What's lazy evaluation?" (Level 2).

**Your hook + honest bridge:** VCDI Databricks/PySpark anomaly-detection pipeline (+20% detection accuracy) is genuine, hands-on proof. **Bridge:** "It's not my daily tool right now, but I've shipped a distributed pipeline in it and I pick tools up fast." This is your second gap after experimentation — skim a PySpark DataFrame cheatsheet so you can write a `groupBy().agg()` in Spark syntax if pushed.

## 2.4 "Machine learning / statistical modelling"

Covered in 1.3 (ML). The **statistical modelling** half = the classic stats toolkit:

**Level 0 — ELI5:** Using maths to describe relationships in data and to tell a real signal from random noise.

**Level 1 — In the room:** "Regression to quantify relationships, hypothesis testing to check whether an effect is real or chance, and knowing the assumptions behind each."

**Level 2 — If they dig:**
- **Linear regression** = fit a straight-line relationship (price → demand). **Logistic regression** = predict a yes/no probability. Coefficients are interpretable levers — valuable for pricing.
- **Hypothesis testing / p-values / confidence intervals / Type I & II errors** — this overlaps your experimentation gap. **Study Part 4.3 hard.**

---

# PART 3 — DOMAIN & DATA

## 3.1 "Large datasets"

**Level 0 — ELI5:** Can you work with a lot of data without it falling over or being slow?

**Level 1 — In the room:** "Yes — I own the pipeline for my firm's largest client: ~6 million invoice rows refreshed weekly, plus the ~A$12B spend book the classifier runs on."

**Your hook:** P18 (6M rows, automated ingestion + validation, cut weekly processing ~4–5 hrs → ~75 min) and the A$12B classifier. Concrete numbers = credibility.

## 3.2 "Retail, pricing, loyalty, energy, utilities, or commercial analytics"

**Level 0 — ELI5:** Have you worked in an industry like ours, where the data is about what customers buy and what things cost?

**Level 1 — In the room:** "My background is **commercial analytics** — I work at a procurement analytics consultancy, so pricing, cost, margin and supplier data is my daily bread. I haven't worked retail/fuel/loyalty directly, but the commercial core is the same, and I've studied how 7-Eleven prices."

**Level 2 — the 7-Eleven domain you should know (so the gap shrinks):**
- **Fuel price cycles:** Aussie petrol prices sawtooth — a sharp hike, then a slow decline over days/weeks. Retailers time the "restore" (hike) and the discount pace. It's a forecasting + optimisation problem.
- **My 7-Eleven Fuel Price Lock app:** customers lock the lowest nearby price for up to 7 days (up to 150L, max 25c/L off). It's a pricing *product* and a goldmine of behavioural data (who locks, when, lock-vs-buy).
- **Hyperlocal pricing:** price/promo/stock tuned per store using foot traffic, weather, local events, nearby competitors.
- **Loyalty:** My 7-Eleven app + Velocity Frequent Flyer points → personalised, targeted offers.
- **Convenience margins:** coffee/drinks/snacks are habitual, impulse, promotion-sensitive; think basket and meal-deal cannibalisation.

**Your hook + bridge:** Lead with "commercial analytics" (a named category in the JD — you *are* this). Then show the domain knowledge above so "no retail experience" clearly isn't "no clue about retail."

---

# PART 4 — WAYS OF WORKING

## 4.1 "Work closely with stakeholders"

**Level 0 — ELI5:** Can you talk to non-data business people, understand what they need, and explain your findings so they can act — without drowning them in jargon?

**Level 1 — In the room:** "This is central to how I work. I own client accounts end to end and run regular reviews directly with senior stakeholders — for the pricing engagement, bi-weekly sessions with the Chief Procurement Officer and category managers, translating the analysis into decisions they acted on."

**Typical questions:**
- "Tell me about a time you presented technical work to a non-technical audience."
- "How do you handle a stakeholder who disagrees with your analysis?"
- "How do you decide what to build when the ask is vague?"

**Model answers:** Use the A$2M account — the brief was just "our costs feel high"; you scoped it into testable questions, built the dashboards, and presented drill-downs the CPO could act on. For disagreement: "I show the data behind it, understand their concern — often they know context the data doesn't — and adjust. The goal is the right decision, not being right."

**Your hook (STRENGTH):** Sole-analyst ownership + CPO-level relationships is genuinely strong for a mid-level DS. Most candidates have built models but never run the room. You have.

## 4.2 "Analyse sales and market data"

**Level 0 — ELI5:** Dig into what's selling and what's happening in the market, and pull out the story.

**Level 1 — In the room:** "I work with transaction and spend data daily — building catalogues, tracking price and cost movement, spotting where money leaks. For a restaurant group I analysed sales and supply data down to product, venue and supplier."

**Level 2 — the honest nuance:** you've handled a lot of **transaction/spend** and **supply** data; **consumer sales and competitor/market data** at retail is adjacent, not identical. Don't overclaim "market data" — frame it as transaction and commercial data, which transfers.

**Your hook:** the restaurant-chain catalogue + drill-downs (P3), the largest-client spend analysis (P18), and Facit (POS sales data for cafés — actual sales data).

## 4.3 "Deliver insights that influence pricing strategy" + THE EXPERIMENTATION GAP

**Level 0 — ELI5:** It's not enough to build a model — did it actually change a decision and make money? And when you change a price, how do you *prove* the change caused the result and it wasn't just luck or the weather?

**Level 1 — In the room:** "The work only counts if it changes a decision. My pricing analysis fed directly into supplier negotiations and a ~A$2M saving. To prove a price change *causes* an outcome, you test it — ideally a controlled experiment comparing stores that got the change against similar ones that didn't."

**Level 2 — A/B TESTING / EXPERIMENTATION (your biggest gap — master this):**
- **What it is (ELI5):** Split into two groups, change the price for one (test), leave the other (control), and compare. Because the groups are otherwise similar, any difference is caused by the price — not the season, not the weather.
- **The recipe:** state a hypothesis → pick a **primary metric** (e.g. margin per store) and **guardrail metrics** (e.g. total volume, complaints) → choose the **randomisation unit** → work out the **sample size** needed → run it → analyse.
- **Key terms, each ELI5 then precise:**
  - **Type I error (false positive):** you conclude the price change worked when it didn't. Rate = **α**, usually 5%.
  - **Type II error (false negative):** you miss a real effect. Rate = **β**. **Power = 1 − β** (usually aim 80%) = the chance you catch a real effect.
  - **p-value:** the probability of seeing a result this extreme *if the change actually did nothing*. Small p (< 0.05) → unlikely to be chance. It is **not** the probability the change worked — a classic trap; don't misstate it.
  - **Confidence interval:** the plausible range for the true effect. If a 95% CI for "extra margin" excludes 0, it's statistically significant.
  - **MDE (minimum detectable effect):** the smallest effect you care about; smaller MDE needs a bigger sample.
- **The pricing-specific twist (say this — it's what separates you):** you usually **can't randomise price per customer** (unfair, and they talk). So pricing uses **geo / store-level tests** or **switchback tests** (flip the whole store between price A and B on alternating days/weeks) and compares matched groups.
- **Watch-outs:** **peeking** (checking early and stopping when it looks good inflates false positives), **novelty effect** (a change looks great for a week then fades), **cannibalisation** and **spillover** (nearby stores affect each other).

**Typical questions (expect at least one):**
- "How would you test whether a price change actually improved margin?"
- "What's a p-value?" / "Type I vs Type II error?" / "What is statistical power?"
- "You can't randomise fuel price by customer — how do you run the experiment?"

**Model answers:** all above. For the fuel one: "Geo or switchback design — pick matched stores or alternate the price at the same stores over time, compare margin and volume against control, and check guardrails so a margin win isn't quietly killing volume."

**Your hook + honest bridge:** "I haven't run a formal experimentation program, but I understand the design and I'm comfortable owning it." Then walk the recipe. Do NOT wing this — it's the most likely place to get exposed, and also the easiest to turn from a weakness into a "he clearly gets it" moment with two days of drilling.

---

# QUICK-REFERENCE: your proof map (which story answers what)

| They probe... | You reach for... |
|---|---|
| Pricing / margin / commercial impact | A$2M restaurant-chain pricing dashboard (P3) |
| Forecasting / time series / seasonality | Prophet produce forecast, 12.5–14% error (P7) |
| ML / classification / imbalance / CV | ~A$12B one-vs-all classifier (P6) |
| Big data / pipelines / scale | 6M-row largest-client pipeline (P18) |
| Databricks / PySpark / distributed | VCDI anomaly-detection pipeline (P11) |
| Stakeholder / ownership / ambiguity | Sole analyst, CPO reviews (P3) |
| Initiative / efficiency | Internal report automation, 12–15 hrs/wk (P5) |
| Product / consumer sales data | Facit café SaaS (P16) |
| Experimentation / A/B | (gap) — recipe in 4.3, honest bridge |
| Retail / fuel / loyalty domain | (gap) — domain cheat sheet in 3.2, honest bridge |

**Two-day priority:** (1) SQL window-function drills, (2) A/B experimentation until automatic, (3) say your 3 hero stories out loud till they're tight. Everything else you already have from real work.
