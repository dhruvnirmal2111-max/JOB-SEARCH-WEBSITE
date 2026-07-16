# DS Learning Roadmap — Dhruv Nirmal

> The sequenced curriculum that closes the **Data Science gap**. Owner is a confident Data Analyst, solid on DE principles (cloud is a slower burn); **DS is the target gap**. Goal: interview-ready + ready for a **remote / international move** (India-first, see `goals.md`).
> This is a **living file**: `/learning-roadmap` (the ds-learning-coach agent) re-sequences it as `progress.md` shows mastery and weak areas. The daily `/learn` picks the next topic from here; the weekly `/ds-interview` tests across it.
> Legend for `progress.md`: `not-started → learning → tested → mastered`. Weak areas get resurfaced (spaced repetition).

## How to use
- **Daily:** a bite-sized lesson on the next `not-started`/weak topic (concept + worked example + interview angle + 2-3 Q&A). Written to `lessons/YYYY-MM-DD.md`, or done interactively.
- **Weekly:** a full **DS mock interview** (stats, ML, SQL, Python, product/experimentation, case + behavioural) → `tests/week-N.md`.
- **Trends:** an occasional "trend of the day" keeps you current (GenAI/LLMs, tooling).

---

## Module 1 — Statistics & Probability (foundation)
1. Descriptive stats, distributions (normal, binomial, Poisson), CLT
2. Sampling, standard error, confidence intervals
3. Hypothesis testing (null/alt, p-value, type I/II errors, power)
4. Common tests (t-test, chi-square, ANOVA) and when to use each
5. Bayes' theorem and Bayesian vs frequentist thinking
6. Correlation vs causation; confounders

## Module 2 — Machine Learning Fundamentals
1. Supervised vs unsupervised vs reinforcement; the ML workflow
2. Linear regression (assumptions, OLS, diagnostics)
3. Logistic regression (odds, sigmoid, decision boundary)
4. Regularisation (L1/L2/elastic net) and the bias-variance tradeoff
5. Decision trees; ensembles (random forest, gradient boosting/XGBoost)
6. kNN, SVM (margins, kernels) — intuition + tradeoffs
7. Unsupervised: k-means, hierarchical, DBSCAN, GMM; PCA/dimensionality reduction
8. When to pick which model (interpretability vs performance)

## Module 3 — Model Evaluation & Validation
1. Train/val/test, cross-validation, data leakage
2. Classification metrics (accuracy, precision, recall, F1, ROC-AUC, PR-AUC)
3. Regression metrics (MAE, RMSE, R²)
4. Class imbalance (class weights, threshold tuning, resampling, SMOTE)
5. Overfitting/underfitting, learning curves, calibration
6. Hyperparameter tuning (grid/random/Bayesian search)

## Module 4 — Feature Engineering & Data Prep
1. Encoding (one-hot, target, ordinal); scaling/normalisation
2. Missing data, outliers, imbalance handling
3. Text features: TF-IDF vs embeddings (how embeddings work, cosine similarity)
4. Feature selection; leakage traps in feature engineering

## Module 5 — Experimentation & Causal Inference + Product DS
1. A/B testing: hypothesis, randomisation, sample size, MDE, power
2. Reading a test: significance vs effect size, peeking, multiple comparisons
3. Pitfalls (novelty effect, network effects, Simpson's paradox)
4. Causal basics (diff-in-diff, matching, instrumental variables — intuition)
5. Product metrics: activation, retention (D1/D7/D30), churn, LTV, ARPU, funnels, cohorts
6. Segmentation/personas (clustering, RFM) for product decisions
7. Metric definition & "one source of truth" thinking

## Module 6 — SQL for Analytics/DS
1. Joins, aggregation, CTEs
2. Window functions (ROW_NUMBER, LAG/LEAD, running totals, rank)
3. Cohort / retention / funnel queries
4. Query performance basics

## Module 7 — Python for Data Science
1. pandas core (indexing, groupby, merge, reshape) + common gotchas
2. numpy & vectorisation (why loops are slow, broadcasting)
3. scikit-learn API (fit/transform/predict, Pipelines, ColumnTransformer)
4. Model persistence (joblib), reproducibility, notebooks vs scripts
5. Pythonic idioms & interview gotchas (mutability, comprehensions, generators)

## Module 8 — Time-Series & Forecasting
1. Components (trend, seasonality, residual), stationarity
2. Prophet (regressors, changepoints) and its limits
3. ARIMA family (intuition); backtesting / rolling validation
4. Forecast error metrics (MAPE, sMAPE) and tolerance

## Module 9 — NLP & Modern ML (high level)
1. Text representation recap (BoW → TF-IDF → embeddings)
2. Transformers & attention (conceptual)
3. LLMs: what they do, prompting, evaluation, hallucination
4. RAG and agentic patterns (conceptual)

## Module 10 — Current Trends (rolling, WebSearch-driven)
- GenAI/LLMs in production, agentic systems, RAG
- MLOps basics (versioning, monitoring, drift, retraining)
- What's hot in DS/analytics tooling this month

## Module 11 — Interview & Global Readiness
1. DS case-interview frameworks (structure an ambiguous problem)
2. Behavioural / STAR stories from real projects (P3, P6, P7, Facit)
3. Communicating to non-technical stakeholders
4. Portfolio & GitHub polish for remote/international applications
5. Remote/international interview norms (async, take-homes, system-ish design)

---

## Sequencing (default order)
Foundation first, then breadth: **M1 → M2 → M3 → M4 → M6 → M7 → M5 → M8 → M9 → M11**, with **M10 (trends)** sprinkled ~once a week and **M11 (interview)** reinforced by the weekly mock. Re-order based on `progress.md` weak areas and any upcoming interview.
