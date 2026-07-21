# Learning Roadmap — Dhruv Nirmal

> The sequenced curriculum that closes the gap to **AI Engineer (applied LLM / agentic AI)** — the primary long-term direction (see `goals.md`). Owner is a confident Data Analyst, solid on DE principles, with **real practical experience already in agentic/LLM systems** (Job Hunt OS, production report/QA agents at work). The two real gaps: (1) formalising the theory behind the AI-engineering work already being done in practice, and (2) **production software-engineering depth** — the thing that separates "built a working agent" from "shipped a production AI system." DS foundations are kept for interview-readiness and the near-term DA/DS bridge roles, but move briskly.
> This is a **living file**: `/learning-roadmap` (the ds-learning-coach agent) re-sequences it as `progress.md` shows mastery and weak areas. The daily `/learn` picks the next topic from here; the weekly `/ds-interview` tests across it.
> Legend for `progress.md`: `not-started → learning → tested → mastered`. Weak areas get resurfaced (spaced repetition).

## How to use
- **Daily:** a bite-sized lesson on the next `not-started`/weak topic (concept + worked example + interview angle + 2-3 Q&A). **Always written to `lessons/YYYY-MM-DD.md`** (owner keeps a downloadable record), **with diagrams (ASCII/text or mermaid) wherever they aid understanding**. Live quiz is optional on top of the file.
- **Weekly:** a full mock interview (stats, ML, SQL, Python, AI-engineering, case + behavioural) → `tests/week-N.md`.
- **Trends:** an occasional "trend of the day" keeps you current (GenAI/LLMs, agent tooling, MLOps).

---

# Part 1 — Foundations (keep, move briskly)

DS/ML foundations needed for interview-readiness and the near-term DA/DS-bridge roles. Not the destination — move through these efficiently, formalising what's already used in practice rather than starting from zero.

## Module 1 — Statistics & Probability
1. Descriptive stats, distributions (normal, binomial, Poisson), CLT ✅
2. Sampling, standard error, confidence intervals ✅
3. Hypothesis testing (null/alt, p-value, type I/II errors, power) ✅
4. Common tests (t-test, chi-square, ANOVA) and when to use each — **next up**
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
3. Text features: TF-IDF vs embeddings (how embeddings work, cosine similarity) — **bridges straight into Part 2**
4. Feature selection; leakage traps in feature engineering

## Module 5 — SQL for Analytics/DS (light — already strong)
1. Joins, aggregation, CTEs
2. Window functions (ROW_NUMBER, LAG/LEAD, running totals, rank)
3. Cohort / retention / funnel queries
4. Query performance basics

## Module 6 — Python for Data Science / Engineering
1. pandas core (indexing, groupby, merge, reshape) + common gotchas
2. numpy & vectorisation (why loops are slow, broadcasting)
3. scikit-learn API (fit/transform/predict, Pipelines, ColumnTransformer)
4. Model persistence (joblib), reproducibility, notebooks vs scripts
5. Pythonic idioms & interview gotchas (mutability, comprehensions, generators)

### Optional / secondary (lower priority for an AI Engineer — revisit only if time allows or an interview needs it)
## Module 7 — Experimentation & Causal Inference + Product DS *(optional)*
1. A/B testing: hypothesis, randomisation, sample size, MDE, power
2. Reading a test: significance vs effect size, peeking, multiple comparisons
3. Pitfalls (novelty effect, network effects, Simpson's paradox)
4. Causal basics (diff-in-diff, matching, instrumental variables — intuition)
5. Product metrics: activation, retention (D1/D7/D30), churn, LTV, ARPU, funnels, cohorts
6. Segmentation/personas (clustering, RFM) for product decisions
7. Metric definition & "one source of truth" thinking

## Module 8 — Time-Series & Forecasting *(optional — Prophet already used in practice, P7)*
1. Components (trend, seasonality, residual), stationarity
2. Prophet (regressors, changepoints) and its limits
3. ARIMA family (intuition); backtesting / rolling validation
4. Forecast error metrics (MAPE, sMAPE) and tolerance

---

# Part 2 — AI Engineering Core (the destination)

This is the differentiator and the real goal. Interleave this **early** — don't wait for Part 1 to finish — because it's both the fastest-growing area and where the existing edge (Job Hunt OS, agentic work automation) already lives. The job here is to formalise the theory behind practice, not start from scratch.

## Module 9 — Modern NLP & LLM Foundations
1. Text representation recap (BoW → TF-IDF → embeddings) — ground in P6 (TF-IDF classifier) and P4/P5 (LLM workflows)
2. Embeddings deep-dive: how they're trained, vector space intuition, cosine/dot-product similarity
3. Transformers & attention (conceptual: self-attention, positional encoding, why attention beats RNNs)
4. Tokenization, context windows, and what LLMs actually do (next-token prediction, in-context learning, limits)
5. Decoding/sampling (temperature, top-k/top-p) and why outputs vary

## Module 10 — RAG & Semantic Search
1. Why RAG: grounding LLMs in fresh/private data, reducing hallucination
2. Chunking strategies (fixed-size, semantic, overlap) and their tradeoffs
3. Vector databases (pgvector, Qdrant, Pinecone) — indexing (HNSW/IVF), similarity metrics
4. Retrieval + reranking (bi-encoder vs cross-encoder), hybrid search (BM25 + vector)
5. RAG failure modes and evaluation (retrieval quality vs generation quality)

## Module 11 — Agents & Orchestration
1. Tool/function calling — the mechanics (schema, model picks tool, executes, feeds result back)
2. ReAct pattern (reason → act → observe loop) and why it works
3. Multi-agent design (orchestrator + specialists, handoffs) — ground directly in the Job Hunt OS (P15) and P4/P8
4. Memory (short-term/context vs long-term/vector store) for agents
5. MCP (Model Context Protocol) — what it standardises and why it matters (owner already uses it via Google Calendar MCP)
6. Frameworks survey: LangGraph, LlamaIndex, CrewAI — what each is for, when to reach for a framework vs plain code
7. Human-in-the-loop patterns (approval gates, review — mirrors this repo's own "generate → stage → review → act" design)

## Module 12 — LLM Evaluation, Observability & Guardrails
1. Why evaluating LLM systems is hard (non-determinism, no single ground truth)
2. Evals: golden datasets, task-specific metrics, regression testing for prompts
3. LLM-as-judge: how it works, its biases, when to trust it
4. Tracing/observability (e.g. LangSmith, Langfuse) — what to log, latency/cost/token tracking
5. Hallucination: causes, detection, mitigation (grounding, citations, guardrails)
6. Safety/guardrails (input/output filtering, prompt-injection awareness)
7. Cost, latency, reliability tradeoffs in production LLM systems (caching, batching, fallback models)

## Module 13 — Prompt & Context Engineering + Structured Outputs
1. Prompt engineering fundamentals (few-shot, chain-of-thought, system vs user prompts)
2. Context engineering: what to put in the context window and why (vs just "better prompting")
3. Function calling / tool schemas in practice (ties back to Module 11)
4. Structured outputs: JSON schema enforcement, guardrails/validation libraries (e.g. Pydantic, Instructor)
5. Failure modes: prompt brittleness, injection, context-window overflow

---

# Part 3 — Engineering & Production (the gap to close)

The honest gap vs. pure software engineers. This is what turns "I built an agent that works on my laptop" into "I can ship and operate an AI system." Weave this in throughout, not just at the end.

## Module 14 — Software Engineering for AI
1. Python packaging & project structure (poetry/uv, src layout, dependency management)
2. Building APIs (FastAPI) — request/response models, async, serving a model or agent behind an endpoint
3. Git workflows for real teams (branching, PRs, code review norms) — beyond solo commits
4. CI/CD basics (GitHub Actions: lint, test, build, deploy pipeline)
5. Testing (unit/integration tests, mocking LLM calls, test-driven habits)
6. Docker: images, containers, docker-compose for local multi-service dev

## Module 15 — MLOps & Deployment
1. Experiment/model tracking (MLflow or similar) — versioning models, params, metrics
2. Monitoring & drift (data drift, model/LLM performance drift in production)
3. Serving & containers (packaging a model/agent as a deployable service)
4. Enough cloud (AWS/GCP/Azure) to deploy: compute (EC2/Lambda-equivalents), storage, basic IAM, one deploy path end-to-end

---

# Rolling / cross-cutting

## Module 16 — Current Trends (rolling, WebSearch-driven)
- Agentic systems, RAG patterns, GenAI/LLMs in production
- MLOps basics (versioning, monitoring, drift, retraining)
- What's hot in AI-engineering tooling this month (frameworks, model releases, evals)

## Module 17 — Interview & Global Readiness
1. AI-system-design interviews (design a RAG pipeline / an agent system / an LLM feature end-to-end)
2. Coding interviews (Python for AI engineering — not just DS scripts)
3. DS/ML case-interview frameworks (structure an ambiguous problem) — still shows up in bridge-role interviews
4. Behavioural / STAR stories from real projects (P4, P5, P6, P8, P15, P17, Facit)
5. Communicating to non-technical stakeholders
6. Portfolio & GitHub polish for remote/international applications (the Job Hunt OS itself is a portfolio piece)
7. Remote/international interview norms (async, take-homes, system-ish design)

---

## Sequencing (default order)
**Finish the Statistics foundation first** (M1 is in progress — common tests next), then **interleave the AI-Engineering core early** since it's both the differentiator and the goal — don't wait for all of Part 1 to finish. Default weave: **M1 (finish) → M9 → M2 → M10 → M3 → M11 → M4 → M12 → M5 → M6 → M13 → M14 (woven throughout, not left to the end) → M15**, with **M7/M8 (optional)** picked up opportunistically or before a relevant interview, **M16 (trends)** sprinkled ~once a week, and **M17 (interview)** reinforced by the weekly mock throughout. Re-order based on `progress.md` weak areas and any upcoming interview.
