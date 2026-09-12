# 7-Eleven Panel Mock — Questions & Ideal Answers

> From the full panel sim (Marcus = Head of Fuel Pricing & Analytics; Raj = agency technical lead). Each question with a tight, correct model answer. Structure to copy: **claim → one detail → close with validation/trade-off.**

---

### Q1. Intro / why this pricing role?
> "I'm a data scientist at a data & analytics consultancy in Melbourne. Hired as a data analyst two years ago, but I pushed us toward ML and grew into data science; I own five enterprise clients end to end. The work I'm proudest of is commercial: a pricing and margin project for a 250-venue hospitality group that fed ~**A$2M** in savings. On the heavier ML side, an **A$12B / ~20M-row** spend classifier that cut a month of manual work to a day. I want to go deep on pricing and product analytics, and fuel pricing at 7-Eleven is a genuinely hard, high-impact data problem — exactly what I want to do."

### Q2. The A$2M project — data, how you found the leak, how you validated
> "The ask was vague — 'we know there's savings, we don't know where.' First I built a product catalogue: clustered items into ~1,000 buckets, Pareto — manually verified the high-value head (~20% of items ≈ 80% of spend), ML for the tail. Then I tracked **unit price year-over-year, like-for-like at SKU level** (same pack size, so mix/pack changes didn't fool me), and benchmarked moves against the market to separate a bad deal from a genuine cost rise. The dashboard surfaced it by category/venue/supplier. **Validation: they took it into a renegotiation and *realised* ~A$2M that year — proven by outcome, not just my model.**"

### Q3. Classifier — algorithm, ~100 imbalanced categories, how measured before it hit the dashboard
> "Text classification. Features from **TF-IDF** (later embeddings for meaning). Model: **logistic regression, one-vs-all** — one yes/no model per category — which handles many categories and imbalance better than a single multi-class model. I aimed for **high precision** because anything auto-labelled had to be right, set a **0.75 probability threshold**, and routed everything below it to **manual review**. Measured with **precision/recall/F1** (not accuracy — imbalanced), cross-validated, and did a human QA sample before it went near the client."

### Q4. What model sat on TF-IDF, why one-vs-all not multi-class, and how does AUC help pick a threshold?
> "Logistic regression on the TF-IDF features. One-vs-all because with ~100 categories a single multi-class model degrades; per-category yes/no is cleaner and lets me tune each. **On AUC — careful: AUC is threshold-independent, it tells me the *ranking* is good, not where to cut.** I set the 0.75 threshold from the **precision-recall trade-off** — the cutoff that hit the precision the client needed, with the rest going to manual review."
*(This is the corrected version — don't say "AUC gave me the threshold.")*

### Q5. Convince me you get fuel pricing + a site is losing volume to a competitor 3c cheaper
> "Fuel pricing is hard because tiny per-litre moves swing volume, competitors are visible on the board and in apps, and you're optimising **total profit — fuel margin × volume plus the shop basket** — not fuel alone. For the 3c case: I'd estimate the site's **elasticity vs the local competitor**, model the volume I'd lose, and weigh it against the margin gained — including the **basket** we lose when a fill-up walks across the road. Then I wouldn't guess — I'd **test it with a geo/matched-site design and difference-in-differences**, guardrailed on volume."

### Q6. Fuel demand is inelastic — so why does 3c matter?
> "Overall fuel demand *is* inelastic — people still drive. But **station choice is highly elastic**: drivers will cross the road or use an app to save a few cents. So a site's volume is driven by its price *relative to nearby competitors*, not the absolute price — and every lost fill-up also loses the **high-margin shop basket**. It's not the fuel that's elastic; it's the choice of *where* to buy it."

### Q7. Metrics — forecast vs classification, why not accuracy; and overfitting
> "**Forecast (a number):** MAE, RMSE, and **MAPE/WMAPE** for a business-readable % error. **Classification:** precision/recall/F1, AUC — not accuracy when classes are imbalanced, because always predicting the majority scores high and is useless. **Overfitting** = the model memorises the training data — great on train, poor on unseen data. I catch it with a **train/validation/test split** (a held-out set it never saw) and **cross-validation**, and by watching the train-vs-test gap."

### Q8. Is a random split OK for a forecast?
> "No — for time series you must **split by time: train on the past, test on the future.** A random split leaks future information into training and inflates the score. So rolling/time-based backtests, never random."

### Q9. AI/LLM work + how you deploy and keep it reliable
> "At work I built an **agentic monthly client-report generator**: it pulls numbers from client databases into the report, and an **independent QA agent** — no context of the main pipeline — re-derives the numbers and checks they match before anything goes out, with a **human-in-the-loop** final sign-off. Personally I built a set of LLM tools for my job search (resume tailoring with a strict no-fabrication rule, project tracker, skill-gap analysis, cover letters), deployed to run in the cloud. I use **structured tool calls** and **gold/eval checks** so outputs are testable, not vibes."

### Q10. How do you know a live model is degrading, and when do you retrain?
> "I **log the metric every refresh** — for the A$12B classifier, precision each cycle. If it dips or I see **drift**, I retrain; testing showed a **3-month cadence** was the sweet spot. Same monitored, documented pipeline is reused across clients. So it's monitor → detect drift → retrain on a trigger, not ship-and-forget."

### Q11. Explaining something technical to a non-technical decision-maker
> "I anchor on an example they know. On the hospitality account I picked **mozzarella cheese**: showed them the raw data — what they bought, the quantity, the unit price — then walked step by step how I calculated the unit-price move, adjusted for pack size, and how the dashboard shows that same number creeping across venues and suppliers. Walking one familiar example end to end is what makes them **trust** the numbers enough to act."

### Q12. Good questions to ask THEM (you asked the first two — both strong)
- "How model-driven vs analyst-judgement are your fuel price decisions today?"
- "How does the team measure a pricing change's impact today?"
- "What's the biggest open pricing problem you want cracked in the next year?"
- "How does the Fuel Price Lock data feed into pricing models?"
- "What would a strong first six months look like in this role?"

---

## The corrections to remember (from this mock)
1. **AUC does NOT pick a threshold** — it's threshold-independent (ranking quality). Pick the threshold from the **precision-recall curve** / target precision.
2. **Add WMAPE** to forecast metrics (business-readable, volume-weighted).
3. **Delivery:** slow the first sentence, few clean sentences per beat, don't narrate fumbles.
4. **Keep the two clients distinct:** hospitality 250-venue (A$2M) ≠ government A$12B classifier.
5. **The winning pattern you already have:** lead pricing answers with the **margin-vs-volume trade-off**, close with the **geo test + difference-in-differences**.
