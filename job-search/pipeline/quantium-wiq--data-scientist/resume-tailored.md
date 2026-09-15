# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

Data scientist who turns messy commercial data into decisions retail and category stakeholders can act on. I owned a pricing and cost analytics engagement end to end, presenting findings directly to a Chief Procurement Officer and category managers to help surface roughly A$2M in savings, and built a demand forecasting model and a large-scale spend classifier (~A$12B) that moved manual review to a repeatable pipeline. I work in Python and SQL, hold a Master of Data Science, and I am comfortable owning a problem from an ambiguous brief through to a stakeholder-ready recommendation.

## Key Skills

**Statistics & ML:** classification (logistic regression, TF-IDF, embeddings), Prophet forecasting, feature engineering, cross-validation, GridSearchCV, class-imbalance handling; familiar with gradient boosting (GBM)
**Programming & Data:** Python (pandas, numpy, scikit-learn), SQL, data pipelines, statistical analysis
**Stakeholder & Delivery:** problem framing, client and executive presentations, translating analytics into plain-language recommendations, end-to-end engagement ownership
**AI & Automation:** LLM workflows (Claude), agentic and multi-agent orchestration, output verification, prompt design
**Cloud & BI:** Azure (work), AWS (personal), Tableau, Power BI

## Experience

### Data Scientist, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy serving enterprise clients across Australia and New Zealand. I own client engagements end to end: framing the problem, building the model, and presenting to commercial stakeholders. Selected engagements:

**Pricing and cost analytics, multi-venue restaurant group (AU/NZ)**
- Problem: the client's supply costs were rising but they had no visibility into where money was leaking across products, venues and suppliers.
- Approach: sole analyst on the account; built a roughly 3,000-item product catalogue and a pricing-decision dashboard (Python, SQL) tracking price movement and cost leakage down to product, venue and supplier level; presented findings and recommendations directly to the Chief Procurement Officer and category managers.
- Result: surfaced close to 30% savings, roughly A$2M in the client's largest category, used directly in supplier negotiations.

**Demand forecasting, fresh-produce and agricultural client**
- Problem: the client needed to plan raw-material and chemical inventory three months ahead, exposed to shipping-cost swings.
- Approach: built a Prophet time-series model with external regressors (sea-freight trends, input prices) and delivered it through a planning dashboard.
- Result: forecasts within a 12.5 to 14% error margin, comfortably inside the client's tolerance, giving a three-month forward view for ordering decisions.

**ML spend classification, enterprise procurement client (~A$12B spend)**
- Problem: only around 60 to 65% of a client's five-year, ~A$12B spend book was reliably categorised; closing the gap took an account manager over a month per cycle.
- Approach: led the firm's first ML classifier for this problem, a one-vs-all logistic regression with features engineered from spend value, line count and transaction text (TF-IDF), tuned with cross-validation and explicit class-imbalance handling; kept the high-value head on manual review and modelled the long tail.
- Result: cut the cycle from over a month to a single day's run; documented and rolled the pipeline out across other clients.

**Agentic client reporting with an independent QA agent (internal)**
- Problem: analysts each spent up to 30 minutes per client, per cycle, hand-assembling progress reports across roughly 25 to 30 accounts.
- Approach: built an agentic workflow (Claude, Python) that drafts each report from analytics outputs, plus a second, independent verification agent that re-checks the key numbers before a human signs off.
- Result: rolled out company-wide, saving roughly 12 to 15 hours a week, with a trust check on every AI output before it reaches a client.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline (Databricks, PySpark) on government procurement data, improving detection accuracy by around 20%.
- Delivered findings via a Power BI solution adopted by senior Department of Transport stakeholders.

## Projects

### Job Hunt OS: multi-agent agentic AI system (Claude Code, Python)
- A file-based multi-agent system: an orchestrator that delegates to specialist agents (resume tailoring, outreach, coaching), with a human review gate. Hands-on practice with agentic design, prompt engineering and orchestration.

### Cloud Data Platform with Terraform (personal build)
- Infrastructure as code on AWS (S3, EC2, IAM) with Terraform, an automated ingestion pipeline into Snowflake, and a Power BI layer, modular across dev/staging/prod.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Statistics I/II, Machine Learning, Applied Forecasting, Supply Chain Management, High Dimensional Analysis, Communicating with Data.
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: strong.** JD asks for Python/R/SAS/SQL (has Python + SQL, satisfies "such as"), deep stats/ML understanding (classification, forecasting, feature engineering, cross-validation, class imbalance), stakeholder management and translating analytics into business insight (CPO and category manager presentations, forecasting dashboards), end-to-end delivery from problem framing to implementation, high-impact measurable outcomes (A$2M, forecast accuracy, cycle-time reduction), quantitative degree (Master of Data Science), 2+ years experience (met, ~2 years full-time plus a 2023 internship).

**Matched:** Python, SQL, statistical methods, machine learning, feature engineering, cross-validation, stakeholder management, translating technical concepts into business insight, end-to-end delivery, quantitative degree, retail-adjacent commercial analytics (pricing, supply chain).

**Missing but applicable:** none of substance; R and SAS genuinely not used, listed honestly as a gap rather than claimed.

**Not applicable / honest gaps:** R, SAS (not used; Python/SQL satisfy the "such as" list). GBM listed as familiar, not production-shipped (real production models are logistic regression and Prophet).

**Top 3 recommendations:**
1. In interview, lean hard on the CPO presentation story: it is the clearest proof of the "growing commercial acumen" and stakeholder-translation ask in the JD.
2. If asked about retail specifically, bridge honestly: pricing/ranging/supplier work in procurement consulting is the same analytical muscle applied to a different vertical, and name that transferability directly rather than downplaying it.
3. Have the A$12B classifier's precision/recall/F1 numbers ready even though they are not in the resume bullet, this is the depth check for "deep understanding of statistical methods and machine learning techniques."
