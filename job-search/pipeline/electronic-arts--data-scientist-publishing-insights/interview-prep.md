# EA Data Scientist — Interview Prep

> Publishing Insights & Markets (Asia Publishing). Role = a practical DS who **builds AND maintains** statistical/ML models (segmentation, forecasting), validates them, mines first/third-party data for trends, and helps automate + document reporting.
> One-line framing of yourself: **"I'm a data scientist who builds models, validates them properly, and documents and automates them so they keep working after I've moved on."**

---

## 0. Before the call
- **Confirm location / remote eligibility early** (EA *Asia* Publishing). This matters more than any answer.
- Skim EA's live-service games and know 1–2 you actually play.
- 30 min on game KPIs (see cheat-sheet at the bottom).

---

## 1. Your three core stories (know these cold)

### A. Spend-categorisation classifier — your flagship ML story
> "A client's spend, about A$12B over five years, was being categorised by hand and took an account manager over a month. I built a one-vs-all classifier: for each category a binary logistic-regression model, 1 for in-category, 0 for the rest. I used TF-IDF on the transaction descriptions and also tried embeddings, plus engineered features like spend value and line count. The categories were heavily imbalanced, so I didn't trust accuracy — I looked at precision, recall and F1 per class, adjusted class weights and the decision threshold, and tuned regularisation strength with cross-validated grid search. I kept the highest-value spend on manual review and let the model take the long tail, so accuracy stayed high where the dollars were. It took the cycle from over a month to about a day, and I documented the pipeline so it could be reused across clients."

Be ready to defend: why one-vs-all, why logistic regression (interpretable, strong baseline), TF-IDF vs embeddings, why F1 not accuracy, how you handled imbalance.

### B. Prophet forecasting model
> "A fresh-produce client needed to plan raw-material and chemical inventory three months ahead. I used Prophet because it handles trend and seasonality well, is interpretable, and doesn't need heavy tuning. Some inputs were imported, so I added external regressors like sea-freight trends. I validated by backtesting on held-out periods and landed within a 12.5 to 14% error margin, inside the client's tolerance. Prophet's limit is it's essentially univariate with regressors, so for strong interacting drivers I'd move to ARIMA or a gradient-boosted model — but here it was the right, explainable tool."

### C. Report automation (maps to "automation of distributed reports")
> "Every analyst was hand-assembling the same client progress reports each cycle. I built an agentic workflow that generates them straight from our analytics outputs, with a QA step that checks the output first. It got rolled out across the team, ~25–30 accounts, saving roughly 12–15 hours a week."

---

## 2. Most-expected questions + your answers

**"How do you validate a model?"**
> "I never judge on training performance. I hold out data the model hasn't seen, or use cross-validation so every fold gets a turn as the test set. I pick the metric to match the problem — for the imbalanced classifier that was precision/recall/F1 per class, not accuracy; for forecasting it was error on held-out future periods. And I sanity-check that it holds up on fresh data before rollout, then keep watching it in production."

**"How do you handle class imbalance?"**
> "A few levers: adjust class weights so the model is penalised more for missing the rare class, move the decision threshold off the default 0.5 to trade precision for recall, and use resampling if needed. And crucially, evaluate on precision/recall/F1, not accuracy, because accuracy rewards just predicting the majority class."

**"How would you build a segmentation / customer personas?"** *(your gap — answer confidently)*
> "I'll be straight that I haven't shipped personas as delivered work, but segmentation is clustering plus feature engineering, which I know. I'd start from the decision it feeds — personas for marketing or for product? Then features: behavioural ones like playtime, spend, session frequency and recency, plus market. I'd start with k-means or an RFM-style approach, consider a Gaussian mixture if I wanted soft membership, choose the number of segments with elbow/silhouette but weight it on business interpretability, check stability, then profile and name them with stakeholders. New in name, familiar in method."

**"Precision vs recall — which do you optimise?"**
> "Depends on the cost of each error. For churn, a false negative — missing an at-risk player — usually costs more than a wasted retention offer, so I'd favour recall. If acting on a positive is expensive or annoys the player, I'd favour precision. I set the threshold from the precision-recall curve to the business's tolerance, not automatically 0.5."

**"When would you pick a simpler model over a complex one?"**
> "Most of the time. If a logistic regression gets me 90% of the value, is explainable to a stakeholder, and is easy to maintain, I'll take that over a black box. I only add complexity when the simpler model genuinely leaves performance on the table and that performance matters commercially."

**"How do you maintain models / handle drift?"**
> "I build models the next person can maintain: document the assumptions, features and validation, version the pipeline, and watch for drift — retrain on a sensible cadence and monitor whether input distributions or performance are shifting. On my largest account I built automated validation and standardised conventions so the pipeline stays reliable as it scales and people change."

**"Tell me about learning a new tool proactively."** *(behavioural)*
> "Outside client work I built an agentic AI system that runs my whole job search, in a version-controlled repo — nobody asked me to; I wanted to actually build with agentic tooling, not just read about it. At work it's the same instinct: I picked up Databricks and PySpark in my internship to handle data that didn't fit on one machine."

**"Tell me about improving how a team works."** *(behavioural)*
> "The report automation. It started as me fixing my own repetitive reporting, but everyone had the same problem, so I generalised it and rolled it out across the team. A personal time-saver became something the whole team relies on."

**"Why EA / this role?"**
> "It reads like how I already work — build and maintain models, validate them, document and automate the outputs. The shift I'm excited about is applying that to markets and player behaviour instead of procurement, and doing it for games people actually play across Asia's priority markets."

**"What's your biggest gap for this role?"** *(be honest, then reframe)*
> "Two honest ones: I haven't built segmentation/personas as delivered work, and I'm not from gaming. But segmentation is method I already have — clustering and feature engineering — and I've applied ML across genuinely different commercial settings, so picking up a new domain is something I've done repeatedly. The gaming metrics are vocabulary I can ramp on fast."

---

## 3. Concept cheat-sheet

**Segmentation** — grouping players into meaningful buckets (personas) so you can treat groups differently (marketing, pricing, content). It's the JD's #1 responsibility.

**Precision** = of what you flagged positive, how many were right = `TP / (TP + FP)`.
**Recall** = of the actual positives, how many you caught = `TP / (TP + FN)`.
**F1** = harmonic mean = `2·P·R / (P + R)`. High only when *both* are decent; use it (not accuracy) when classes are imbalanced.

**Clustering methods:**
- **K-means** — pick k, assign each point to nearest cluster centre. Fast; assumes round, similar-sized clusters; choose k via elbow/silhouette.
- **Hierarchical (agglomerative)** — merges closest points into a tree (dendrogram); don't need k upfront; slower.
- **DBSCAN** — density-based; finds odd shapes, labels sparse points as noise; tune `eps`/min points, no k.
- **Gaussian Mixture (GMM)** — soft clustering; each point gets a probability of belonging to each cluster; good for overlapping segments.
- **RFM** — framework, not algorithm: score Recency, Frequency, Monetary, then bucket or feed into k-means. Common for value-based personas.

**TF-IDF vs Embeddings:**
- **TF-IDF** — sparse vector, one dimension per word, weighted by rarity. Only knows which words are present; no sense of meaning ("car" and "automobile" are unrelated).
- **Embeddings** — dense learned vectors where similar meanings sit close together. Learned by training a model to predict a word from its context ("you know a word by the company it keeps"); similar words appear in similar contexts, so they get similar vectors. Meaning becomes geometry; compare with cosine similarity. Static (word2vec/GloVe = one vector per word) vs contextual (BERT = vector depends on the sentence, so "river bank" ≠ "bank account").

**Saving models (so you don't retrain):** train once (expensive) → serialise the fitted model to disk (`joblib.dump`, preferred over pickle for scikit-learn) → load it for predictions (inference, cheap). Retrain only on a schedule or when you see drift. Version the saved models so you can roll back.

**Game KPIs:**
- **DAU / MAU** — daily / monthly active users. **DAU/MAU** = stickiness (0.2 ≈ active 6 days/month).
- **Retention (D1/D7/D30)** — % of new players who return after 1/7/30 days. The key health metric.
- **Churn** — % who stop playing/paying (flip side of retention).
- **LTV** — lifetime revenue expected per player. **ARPU / ARPPU** — avg revenue per user / per paying user.
- **Conversion** — % who take an action (free → paying). **Cohort analysis** — group by join date, track over time.

---

## 4. Live technical

**SQL — cohort retention (talk it through):**
```sql
WITH first_seen AS (
  SELECT user_id, DATE_TRUNC('month', MIN(event_date)) AS cohort
  FROM events GROUP BY user_id
)
SELECT f.cohort,
       DATE_DIFF('month', f.cohort, DATE_TRUNC('month', e.event_date)) AS month_n,
       COUNT(DISTINCT e.user_id) AS active_users
FROM first_seen f
JOIN events e ON e.user_id = f.user_id
GROUP BY 1, 2
ORDER BY 1, 2;
```
Know window functions too (`ROW_NUMBER()` for first event, running totals).

**Analytical case ("did a promotion improve engagement?"):**
> "First define the metric precisely — say sessions per active user or D7 retention — and pick it before looking. Then get a control: players who didn't get the promo, matched to those who did, or a pre/post vs a comparable prior period. Check confounders — seasonality, a content release at the same time. Compare with a significance test, and report the *effect size* and whether it's commercially meaningful, not just 'significant'."

---

## 5. Questions to ask them
- "Which models does the team maintain today, and where's the biggest gap?"
- "How do you measure whether a model is succeeding in production?"
- "What decisions do the segmentation and forecasting outputs actually feed?"
- "What's the stack — Databricks, Looker?"
- "How's the team split across Asia and global, and how do you collaborate?"

---

## 6. Gaps to own (don't hide, reframe)
- **Segmentation** — no delivered persona work; it's method you have (clustering + features). Fast pickup.
- **Gaming domain** — none; lean on "ML across a variety of commercial environments" (a listed nice-to-have you genuinely meet).
- **Looker / TensorFlow / R / formal Agile** — not used; Python + Tableau/Power BI cover the core; the rest are learnable, flag if any is a day-one must.
