# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

Data scientist and analyst with a Master of Data Science, building ML, forecasting and analytics solutions that drive commercial decisions. I own work end to end, from framing an ambiguous problem through to modelling, dashboards and stakeholder recommendations, across pricing, forecasting, classification, anomaly detection and AI automation. Strong in Python (pandas, numpy, scikit-learn), SQL and BI (Tableau, Power BI), with Databricks and PySpark for large-scale data.

## Key Skills

**Languages:** Python, SQL, R (learning), C/C++, MATLAB
**ML & AI:** scikit-learn, TF-IDF, embeddings, Logistic Regression, forecasting (Prophet), clustering, anomaly detection, LLM and agentic workflows (Claude, ChatGPT), multi-agent orchestration, prompt engineering, AI-output evaluation and QA, NLP and sentiment analysis
**Data Engineering:** ETL pipeline design, PySpark, Databricks, KNIME, batch automation, data modelling and cleaning, feature engineering, Snowflake, multi-source data integration
**Cloud & IaC:** AWS (S3, EC2, IAM, Lambda, Glue, Athena), Azure (incl. Microsoft Graph API for automated ingestion), GCP (familiar), Databricks, Terraform, Docker
**Visualisation & BI:** Tableau, Power BI, data storytelling, KPI analytics, dashboard design
**Practices:** Git and version control, documentation, stakeholder communication, problem framing, QA

## Experience

### Data Scientist, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia
Client-facing data and analytics consultancy serving enterprise clients across Australia and New Zealand.

- Pricing and cost analytics (restaurant chain, AU/NZ): owned the account end to end; built a product catalogue (~3,000 items) and pricing-decision and supplier dashboards tracking price movement and cost leakage by product, venue and supplier, using Python (pandas, numpy) and SQL; presented to the Chief Procurement Officer and category managers, helping the client identify close to 30% savings (roughly A$2M over a year) in their largest category.
- ML spend classification (~A$12B client spend): led the company's first ML classifier to automate categorisation, a one-vs-all model in scikit-learn (TF-IDF, and now embeddings, with LogisticRegression, class weights for imbalance, GridSearchCV and cross-validation; pandas/numpy for feature engineering), using a Pareto manual/ML split. Cut a cycle that took an account manager 1 to 1.5 months down to a single day's model run; documented pipeline now rolled out across clients.
- Demand forecasting (fresh-produce client): built a Prophet time-series model with external drivers (sea-freight trends, input prices) to forecast raw-material and chemical inventory three months ahead, within a 12.5 to 14% error margin, delivered via dashboard.
- Inventory reporting and planning (fresh-produce and medical clients): built a bill of materials mapping finished products to the raw materials they require, and automated inventory reports (a daily morning refresh and a weekly one) that clients rely on day to day to manage stock, with par-level alerts that flag any item below a user-set threshold so they reorder before a stockout.
- Global multi-region spend platform (largest client): own the end-to-end pipeline across 5 regions and 13 sub-regions (~6M invoice rows, ~500-600k refreshed weekly); replaced manual uploads with automated email ingestion (Microsoft Graph API to a SQL Server batch script), standardised conventions, and built automated validation with discrepancy logging; cut weekly processing from ~4-5 hours to ~75 minutes.
- Agentic report automation: built a company-wide LLM workflow that auto-generates client progress reports from analytics outputs, adopted across the analyst team (~25-30 accounts), saving ~12-15 hours a week, with a multi-agent QA step validating outputs before delivery.
- Built and maintained 20+ automated ETL pipelines (Python, SQL, Azure) processing millions of transactions monthly; reduced manual reporting effort ~40% and improved turnaround ~50%.
- Built and maintained 16+ Tableau dashboards for procurement and finance teams for supplier spend, KPI tracking and cost-optimisation decisions.
- AI hackathon (1st place, internal): built an LLM call-transcript analyzer scoring call quality, sentiment and expectations, later adopted into the company's workflow.
- Additional AI and automation: multi-agent data QA validation; AI-output evaluation and QA in analytics workflows; automated PowerPoint deck generation from analytics outputs.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Built a distributed anomaly-detection pipeline in Databricks with PySpark on large-scale government procurement data, engineering scalable transformation layers; improved detection accuracy by about 20%.
- Built and presented a Power BI analytics solution adopted by senior Department of Transport stakeholders.

## Projects

### [Facit](https://www.myfacit.com) — Multi-tenant Profitability SaaS for Independent Cafes
- A multi-tenant SaaS that unifies a cafe's POS transactions, staff wages and 14 suppliers' invoices into one weekly profitability view (revenue, wage cost %, food cost %, gross margin) with a recommended action each week, revenue forecasting, menu engineering and supplier price-creep detection. Live with Neighbours Cafe (St Kilda, Melbourne) as design partner; built as a white-labellable product designed for messy real-world data and non-technical operators.

### Job Hunt OS — Agentic AI Career-Search System
- Single-user, file-based system running natively on Claude Code with no paid APIs: multi-agent orchestration (orchestrator plus resume, outreach and career-coach specialists) that tailors ATS-friendly resumes and PDFs, drafts cover letters, runs a two-track networking CRM, analyses resume-to-JD skill gaps, and runs scheduled cloud routines behind a human review gate. Python (reportlab, pdfplumber), Bash, Git, Google Calendar via MCP.

### Cloud Data Platform with Terraform (portfolio)
- Provisioned full cloud infrastructure as code (AWS S3, IAM, EC2), built an automated ingestion pipeline from external APIs to Snowflake, and designed a modular multi-environment (dev/staging/prod) setup; Docker, Power BI.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Coursework: Statistics I and II, Machine Learning, Applied Forecasting, High Dimensional Analysis, Communicating with Data, Supply Chain Management.

### Bachelor of Engineering, Thapar University | May 2017 to May 2021
