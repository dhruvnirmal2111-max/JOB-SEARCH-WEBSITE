# 7-Eleven — Recruiter Brief: exact checklist → your examples

> The recruiter sent a prep note (2026-07-24). It confirms most of `jd-breakdown.md` but shifts emphasis toward **ML models + model deployment + AI/LLMs**, and asks you to prepare specific examples and a "challenge you overcame" story. This doc maps every point they raised to a concrete example of yours, and fills the two areas we under-weighted.

## The emphasis shift (read this first)
Their framing: *"developing, maintaining and improving pricing and machine learning models, analysing sales and market data, and helping deploy and optimise models."* So it leans a bit more **ML-model + deployment + AI** than pure pricing. Your strongest overall pitch here is the combination: **a real ML model at scale + genuine AI/LLM production work + commercial impact + stakeholder ownership.** Lead with that blend, not just pricing.

---

## Their checklist → your example (one strong example each)

**Python (pandas, NumPy, scikit-learn)** → the ~A$12B classifier (scikit-learn, pandas, numpy) and every pipeline. Name the libraries specifically.

**SQL + large datasets** → the ~6M-row weekly pipeline for the largest client, and the ~A$12B / 5-year spend book. Advanced SQL (SQL Server): window functions, rolling 4-week windows, ~11–12k-rule categorisation.

**Databricks + PySpark** → VCDI distributed anomaly-detection pipeline (+20% accuracy). Honest: from the internship, real, not daily now.

**ML & statistical modelling** → the one-vs-all classifier (TF-IDF → embeddings, LogisticRegression with class weights, GridSearchCV cross-validation) and the Prophet forecast (external regressors, 12.5–14% error). Details in `concepts-glossary.md`.

**Power BI / Tableau** → 16+ Tableau dashboards used weekly; Power BI solution adopted by senior Dept of Transport stakeholders.

**Translating technical insight → commercial outcome** → the ~A$2M pricing engagement (analysis fed directly into supplier negotiations). This is your headline "technical to business" proof.

**Collaborating with stakeholders** → bi-weekly reviews with the Chief Procurement Officer and category managers; presenting architecture and findings to senior DoT stakeholders.

**Industry (retail / energy / utilities / loyalty / pricing / commercial analytics)** → lead with **commercial analytics** (you are this: a procurement analytics consultancy). Pricing is real but cost/supplier-side. Then show the 7-Eleven domain knowledge (fuel cycles, Fuel Price Lock, hyperlocal pricing, loyalty) from `interview-prep.md` §2.

---

## GAP 1 we under-weighted: AI / LLMs (this is a STRENGTH — push it)

They explicitly want exposure to **AI, LLMs, model deployment**. You have a lot here. Have these ready:

- **LLM call-transcript analyzer (won the internal AI hackathon, 1st place, adopted internally).** An agent-orchestrated pipeline: transcripts dropped in a folder → an agent scores each engagement on quality, expectations met, and tone (sentiment analysis) → sends notifications to the right stakeholders and logs the engagement. Moved from a hackathon build to an adopted internal process. **This is your best AI story — production, adopted, and you won with it.**
- **Multi-agent data QA workflow** (5 agents + an orchestrator) that validates client datasets before delivery.
- **Agentic client-report generator** — auto-generates client progress reports from analytics outputs with a QA step; rolled out company-wide across ~25–30 accounts, saving ~12–15 hrs/week.
- **AI-output evaluation / QA** — you critically evaluate LLM outputs before they ship ("AI with judgement"), which is exactly what a serious team wants to hear.
- **Personal:** you built an agentic multi-agent system end to end (the job-hunt OS), and MyFacit uses AI-driven automation.

**One line to drop:** "Beyond classical ML, I've built and deployed LLM and multi-agent workflows in production, including one that won our internal AI hackathon and got adopted, and I'm deliberate about evaluating AI outputs before they go out."

---

## GAP 2 we under-weighted: model deployment & optimisation (frame it honestly)

They said "help deploy and optimise models." Here's the honest, strong framing:

- **What you HAVE done (say this):** productionised the classifier into a **documented, repeatable pipeline reused across client accounts** (that is deployment in the practical sense); deployed the Prophet forecast to a live dashboard; deployed ETL/refresh pipelines to Azure-hosted servers with scheduled runs; rolled the agentic report generator out company-wide. You **optimise** models via hyperparameter tuning (GridSearchCV), retraining as needed, and improving them (moving TF-IDF → embeddings for better accuracy).
- **Honest boundary (don't fake it):** you haven't run a formal MLOps stack (CI/CD for models, feature stores, real-time model serving, monitoring dashboards for drift). Say: "I've deployed models as productionised batch pipelines that teams rely on. I haven't run a full MLOps/serving stack, but I understand the pieces, model versioning, retraining, monitoring for drift, and I'm keen to grow there."
- This turns a potential gap into "practical deployer who gets the concepts and wants to go deeper" rather than a bluff that collapses under questioning.

---

## The 5 examples they asked you to prepare (pick these)

1. **Building or improving an ML model** → the ~A$12B classifier. The "improving" angle: started with TF-IDF, moving to embeddings for better semantic matching; tuned for heavy class imbalance; retrained and reused across clients.
2. **Working with large / complex datasets** → the 6M-row, 13-region weekly pipeline (messy, multi-language, inconsistent regional inputs).
3. **Solving a business problem with data** → the ~A$2M pricing engagement (or the classifier cutting a month of manual work to a day).
4. **Communicating technical concepts to non-technical stakeholders** → running the CPO/category-manager reviews; translating cost-leakage analysis into negotiation decisions they acted on.
5. **A challenge you faced and overcame** → see below.

---

## "Challenge you overcame" — two ready stories (STAR)

**Story 1 — the classifier's imbalance + messy data (technical challenge)**
- Situation: the ~A$12B spend book was only ~60–65% categorised, with thousands of categories and heavily imbalanced classes (most categories are rare), and the inputs were short, messy transaction descriptions.
- Task: build something accurate enough to trust and replace a month of manual work.
- Action: a one-vs-all design so each category is a clean yes/no; class weights so rare categories weren't ignored; feature engineering beyond text (spend value, line count) to add signal; GridSearchCV cross-validation for tuning; and a Pareto split, high-value head reviewed manually, long tail modelled, so accuracy stayed high where the money was. Evaluated on precision/recall/F1, not accuracy, because of the imbalance.
- Result: cut the cycle from 1–1.5 months to a single day, documented into a reusable pipeline now used across clients. Overcame it by combining the right model design with a pragmatic manual/model split.

**Story 2 — inconsistent multi-region data (data + stakeholder challenge)**
- Situation: the largest client's data came from 5 regions and 13 sub-regions with inconsistent file formats and naming, feeding a manual, error-prone process.
- Task: make it reliable and fast without the errors.
- Action: standardised file-submission and naming conventions with the regional teams (the human part), then built automated ingestion (Microsoft Graph API → SQL Server) and automated validation (row/type/column-consistency checks) that logs discrepancies and emails the right people before anything reaches a report.
- Result: cut weekly processing from ~4–5 hours to ~75 minutes and removed the manual error-checking. The challenge was as much stakeholder coordination as code, and I framed it that way.

---

## Net: how to lead in the room
Your one-sentence positioning for THIS brief: *"I build and deploy ML and AI/LLM systems on messy, large commercial datasets, and I own the whole path from framing the problem with stakeholders to a model that changes a business decision, like the pricing work that fed ~A$2M in savings."* That hits ML + deployment + AI + large data + stakeholders + commercial outcome in one breath, which is exactly their checklist.
