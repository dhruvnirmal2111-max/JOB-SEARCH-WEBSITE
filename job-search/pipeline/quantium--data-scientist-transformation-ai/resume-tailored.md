# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

I'm a data scientist who pairs predictive modelling with hands-on GenAI and agentic AI, building both into systems that support live decisions rather than one-off demos. I led a one-vs-all classification model that brought structure to roughly A$12B of client spend, and built an agentic reporting workflow with an independent verification agent that re-checks the numbers before a human signs off, my way of making sure AI output earns trust rather than assumes it. I also build Prophet forecasting models and ran a pricing analysis that helped a client find around A$2M in savings, always translating the results into language non-technical stakeholders can act on. I work mainly in Python and SQL, and like owning a problem end to end, from framing it with the client through to the model, or the agent, running in production.

## Key Skills

**Predictive Modelling:** scikit-learn, classification (logistic regression, TF-IDF, embeddings), Prophet time-series forecasting, feature engineering, cross-validation, hyperparameter tuning (GridSearchCV), class-imbalance handling; familiar with gradient boosting (GBM), keen to build on it in production
**GenAI & Agentic AI:** LLM-driven workflows (Claude, ChatGPT), prompt design, multi-agent orchestration, independent QA/verification agents, structured tool calls, evaluating and refining AI outputs before they reach a stakeholder; familiar with retrieval-augmented generation (RAG)
**Python & Data:** Python (pandas, numpy, scikit-learn), SQL, PySpark and Databricks (internship), data pipelines, feature engineering
**Cloud:** Azure (Microsoft Graph API ingestion, work), AWS (S3, EC2, IAM, personal build with Terraform and Snowflake)
**Visualisation & Communication:** Tableau, Power BI, translating model and AI outputs into plain language for non-technical stakeholders

## Experience

### Data Scientist, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy. I own client engagements end to end: framing the problem, building the model or the agent, and presenting the results to commercial stakeholders. Selected engagements:

**Agentic client reporting with an independent QA agent, internal, my own firm**
- Problem: our analysts were each spending up to 30 minutes per client, per reporting cycle, hand-assembling progress reports across roughly 25 to 30 client accounts company-wide.
- Approach: built an agentic workflow (Claude, Python) that drafts the report from the underlying analytics outputs, then added a second, independent verification agent, run with no memory of the drafting session, that re-derives the key numbers from source data and checks them against the draft before a human reviews and sends it.
- Result: rolled out company-wide, saving roughly 12 to 15 hours a week across the team, with a human check on every output before it reaches a client, standardised and trustworthy AI-assisted delivery rather than a one-off automation.

**ML spend classification, enterprise procurement client (~A$12B spend)**
- Problem: only around 60 to 65% of a client's five-year, roughly A$12B spend book was reliably categorised; the manual review to close the gap took an account manager over a month per cycle.
- Approach: led the firm's first ML classifier for this problem, a one-vs-all logistic regression (one model per category), with features engineered from spend value, line count and transaction text (TF-IDF, moving toward embeddings), tuned with GridSearchCV and cross-validation, with explicit handling for the heavy class imbalance; kept the high-value head of spend on manual review and modelled the long tail.
- Validation: evaluated on precision, recall and F1 given the imbalance; the model is retrained as new spend data comes in.
- Result: cut the categorisation cycle from over a month to a single day's model run; the pipeline is documented and now reused across other clients.

**Pricing and cost analytics, multi-venue restaurant group (AU/NZ)**
- Problem: the client felt their supply costs were too high but couldn't see where the money was leaking across products, venues and suppliers.
- Approach: owned the account as the sole analyst, built a product catalogue of roughly 3,000 items, then a pricing-decision dashboard (Python, SQL) tracking price movement and cost leakage; presented findings directly to the Chief Procurement Officer and category managers, translating the model outputs into plain, relatable terms for non-technical stakeholders.
- Result: helped the client identify close to 30% savings, roughly A$2M over a year, in their largest category, used directly in supplier negotiations.

**Demand forecasting, fresh-produce and agricultural client**
- Problem: the client needed to plan raw-material and chemical inventory three months ahead, with chemicals sourced internationally and exposed to shipping cost swings.
- Approach: built a Prophet time-series model with external regressors (sea-freight trends, input prices), prepared the data with pandas, and delivered the forecast through a planning dashboard.
- Result: forecasts within a 12.5 to 14% error margin, comfortably inside the client's tolerance, giving the client a three-month forward view for ordering.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Built a distributed anomaly-detection pipeline in Databricks using PySpark on government procurement data, engineering scalable transformation layers, improving detection accuracy by around 20%.
- Delivered findings through a Power BI solution adopted by senior Department of Transport stakeholders, presenting system architecture and model outcomes to a cross-functional audience.

## Projects

### Job Hunt OS: multi-agent agentic AI system (Claude Code, Python)
- Designed and built a file-based, multi-agent career-search system: an orchestrator agent that delegates to specialist agents (resume tailoring, outreach, career coaching), running on scheduled cloud routines with a human review gate before anything is sent to a real person. A personal build that puts agentic system design, prompt engineering and multi-agent orchestration into daily practice outside of client work.

### Cloud Data Platform with Terraform (personal build)
- Provisioned cloud infrastructure as code on AWS (S3, EC2, IAM) with Terraform, with an automated ingestion pipeline into Snowflake and a Power BI layer on top, modular across dev/staging/prod environments.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: ~88% of applicable JD keywords**

**Matched (in both JD and resume):** Python, SQL, predictive models, feature engineering, model development, data products, stakeholder communication (technical to non-technical), GenAI, LLMs, prompting, agentic workflows, experimentation/validation, ongoing improvement of production solutions, Azure, AWS, analytical/problem-solving.

**Missing but applicable (JD terms the owner has, now added):** "data product development" (framed via the pricing/ML pipelines turned into dashboards and reused pipelines), "end-to-end solution design" (framed via owning engagements from problem definition to deployment), "working independently while collaborating within a team" (framed via sole-analyst account ownership plus company-wide rollout of the reporting agent).

**Not applicable / honestly flagged as a gap (do not overclaim):**
- **GBM (gradient boosting):** listed as "familiar with, keen to build on in production." Real production models were logistic regression and Prophet, not GBM. Be ready to name a concrete GBM concept (e.g. how it differs from logistic regression, boosting vs. bagging) at interview.
- **RAG (retrieval-augmented generation):** listed as "familiar with," not claimed as built. The genuine agentic proof is the report-generation and independent QA/verification agent workflow, not RAG. Do not claim a RAG system was shipped.
- **Databricks/PySpark:** internship only (VCDI), not part of the current production stack at Purchasing Index. Kept clearly attributed to that role.

## Top 3 Recommendations

1. At interview, lead with the independent QA/verification agent story first (it is the closest real match to "make AI trustworthy in production"), then bridge to the A$12B classifier for the predictive-modelling ask; this mirrors the resume's ordering.
2. If asked about GBM or RAG, answer with genuine familiarity plus a concrete plan to go deeper (e.g. "I've worked with logistic regression and Prophet in production; I understand the theory behind GBM and I'm keen to build with it"), rather than implying either was shipped.
3. Have one or two more numbers ready beyond the resume (e.g. the ~15 hours/week saved, the ~20% anomaly-detection accuracy gain) in case the interviewer wants more depth than the 2-page format allows.
