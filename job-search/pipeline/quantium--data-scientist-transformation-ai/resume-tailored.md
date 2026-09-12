# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

Data scientist who pairs predictive modelling with hands-on GenAI and agentic AI, built into systems that support live decisions, not demos. I led a one-vs-all classifier that structured roughly A$12B of client spend, and built an agentic reporting workflow with an independent verification agent that re-checks every number before a human signs off. I work mainly in Python and SQL, own problems end to end from framing to production, and translate results into language non-technical stakeholders can act on.

## Key Skills

**Predictive Modelling:** scikit-learn, classification (logistic regression, TF-IDF, embeddings), Prophet forecasting, feature engineering, cross-validation, GridSearchCV, class-imbalance handling; familiar with gradient boosting (GBM), keen to build on it
**GenAI & Agentic AI:** LLM workflows (Claude), prompt design, multi-agent orchestration, independent QA/verification agents, structured tool calls, output evaluation; familiar with RAG
**Python & Data:** Python (pandas, numpy, scikit-learn), SQL, data pipelines, feature engineering; PySpark and Databricks (internship)
**Cloud:** Azure (Microsoft Graph API ingestion, work), AWS (S3, EC2, IAM; personal Terraform and Snowflake build)
**Visualisation:** Tableau, Power BI, translating model and AI outputs into plain language for non-technical stakeholders

## Experience

### Data Scientist, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy. I own client engagements end to end: framing the problem, building the model or agent, and presenting to commercial stakeholders. Selected engagements:

**Agentic client reporting with an independent QA agent (internal)**
- Problem: analysts each spent up to 30 minutes per client, per cycle, hand-assembling progress reports across roughly 25 to 30 accounts.
- Approach: built an agentic workflow (Claude, Python) that drafts each report from analytics outputs, plus a second, independent verification agent (no session memory) that re-derives the key numbers from source and checks them before a human signs off.
- Result: rolled out company-wide, saving roughly 12 to 15 hours a week, with a trust check on every AI output before it reaches a client.

**ML spend classification, enterprise procurement client (~A$12B spend)**
- Problem: only around 60 to 65% of a client's five-year, ~A$12B spend book was reliably categorised; closing the gap took an account manager over a month per cycle.
- Approach: led the firm's first ML classifier, a one-vs-all logistic regression with features from spend value, line count and transaction text (TF-IDF, moving to embeddings), tuned with GridSearchCV and cross-validation, with class-imbalance handling; kept the high-value head on manual review and modelled the long tail.
- Result: cut the cycle from over a month to a single day's run, evaluated on precision, recall and F1; documented and reused across clients.

**Pricing and cost analytics, multi-venue restaurant group (AU/NZ)**
- Problem: the client's supply costs were too high but they couldn't see where the money leaked across products, venues and suppliers.
- Approach: sole analyst on the account; built a ~3,000-item catalogue and a pricing-decision dashboard (Python, SQL) tracking price movement and cost leakage; presented to the Chief Procurement Officer and category managers in plain terms.
- Result: surfaced close to 30% savings, roughly A$2M in the largest category, used directly in supplier negotiations.

**Demand forecasting, fresh-produce and agricultural client**
- Problem: the client needed to plan raw-material and chemical inventory three months ahead, exposed to shipping-cost swings.
- Approach: built a Prophet model with external regressors (sea-freight, input prices) and delivered it through a planning dashboard.
- Result: forecasts within a 12.5 to 14% error margin, inside tolerance, giving a three-month forward view for ordering.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline in Databricks and PySpark on government procurement data, improving detection accuracy by around 20%.
- Delivered findings via a Power BI solution adopted by senior Department of Transport stakeholders.

## Projects

### Job Hunt OS: multi-agent agentic AI system (Claude Code, Python)
- A file-based multi-agent system: an orchestrator that delegates to specialist agents (resume tailoring, outreach, coaching), running on scheduled cloud routines with a human review gate. Puts agentic design, prompt engineering and orchestration into daily practice.

### Cloud Data Platform with Terraform (personal build)
- Infrastructure as code on AWS (S3, EC2, IAM) with Terraform, an automated ingestion pipeline into Snowflake, and a Power BI layer, modular across dev/staging/prod.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Matched (genuine):** Python, SQL, predictive models, feature engineering, model development, data products, stakeholder communication, GenAI, LLMs, prompting, agentic workflows, experimentation/validation, production improvement, Azure, AWS.

**Not claimed (honest gaps):** GBM (familiar, not shipped, real production models were logistic regression + Prophet); RAG (familiar, not built, agentic proof is the report + verification agent); Databricks/PySpark (internship only). Tenure ~2 years full-time plus a 2023 internship.
