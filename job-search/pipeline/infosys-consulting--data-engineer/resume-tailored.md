# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

I'm a data engineer who builds and automates the data pipelines that keep client analytics running. I own the end-to-end pipeline for my firm's largest client, around **6 million** invoice rows refreshed weekly, and I've built and maintained **20+ automated ETL pipelines** across five enterprise clients. My core strengths are Python, advanced SQL, and the automated validation and reporting (Power BI, Tableau) that ships with every pipeline.

## Key Skills

**Languages & Pipelines:** Python (pandas, numpy), advanced SQL, ETL pipeline design, batch automation, data modelling, data cleaning, feature engineering
**Cloud & Orchestration:** Azure (Microsoft Graph API), AWS (S3, EC2, IAM, Lambda, Glue, Athena), Windows Task Scheduler, Terraform (IaC), Docker
**Big Data & Distributed:** Databricks, PySpark, Snowflake, KNIME
**Reporting & BI:** Power BI, Tableau, dashboard design, KPI reporting
**Data Quality:** automated validation, anomaly detection, reproducible and documented processes

## Experience

### Data Engineer, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy serving enterprise clients across Australia and New Zealand. I own client data pipelines end to end: ingestion, transformation, validation and delivery. Selected engagements:

**Automated ingestion and validation pipeline: largest enterprise client (multi-region)**
- Problem: the firm's biggest account ran on a manual KNIME upload-and-check process, around 4 to 5 hours every week, across roughly 6 million invoice rows spanning 5 global regions and 13 sub-regions.
- Approach: replaced it with automated email-based ingestion (Microsoft Graph API into a remote SQL Server via batch scripts), and built automated validation (row and hour counts, data-type and column-consistency checks) that drops stray columns, logs discrepancies and emails client and internal teams. Downstream I run vendor and spend lookups, multi-language cleaning, an ~11 to 12 thousand-rule categorisation, and rolling 4-week spend windows into dashboards. Python, advanced SQL (SQL Server), batch automation, Azure.
- Result: cut weekly processing from ~4 to 5 hours to a ~75-minute automated run, around 3 to 3.5 hours saved every week, and standardised intake so all 13 regions feed one consistent pipeline.

**ETL pipeline platform: five enterprise clients**
- Problem: reporting across millions of procurement transactions each month for five clients was manual and slow.
- Approach: built and maintained 20+ automated ETL pipelines (Python, SQL, batch files) deployed on Azure-hosted servers with Windows Task Scheduler.
- Result: reduced manual reporting effort by around 40% and improved turnaround by around 50%, with production-grade reliability.

**Categorisation pipeline: ~A$12B enterprise spend**
- Problem: categorising a client's five-year, roughly A$12B spend book was manual and took an account manager 1 to 1.5 months per cycle.
- Approach: built a documented, repeatable Python pipeline (scikit-learn, TF-IDF, one-vs-all classifier) with feature engineering on spend value and line count, and productionised it for reuse.
- Result: cut the cycle to a single day's run and rolled the pipeline out across other client accounts.

**Reporting and BI:** built and maintained 16+ Tableau dashboards and a Power BI solution for procurement and finance stakeholders, giving live visibility into spend, supplier performance and KPIs.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

**Distributed anomaly-detection pipeline (Databricks, PySpark)**
- Problem: government procurement data was too large to screen on a single machine.
- Approach: built a distributed anomaly-detection pipeline in Databricks with PySpark, engineering scalable transformation layers, and delivered the findings through a Power BI solution.
- Result: improved detection accuracy by about 20%; the Power BI solution was adopted by senior Department of Transport stakeholders.

## Projects

### Cloud Data Platform (Terraform, AWS, Snowflake) -- personal build
- Provisioned full cloud infrastructure as code with Terraform (AWS S3, IAM, EC2, networking), built an automated ingestion pipeline from external APIs into Snowflake, and used Docker for a modular, version-controlled multi-environment setup (dev / staging / prod).

### [Facit](https://www.myfacit.com): multi-source data integration -- personal build
- Built a pipeline unifying POS, wages and 14 suppliers' invoices into one model behind a weekly analytics product for independent cafés. Live with a St Kilda café as the design partner.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**JD asks matched (all genuine):** Python, Databricks, PySpark, advanced SQL, ETL / pipeline building, data ingestion, data validation, orchestration (Windows Task Scheduler, batch), cloud (Azure, AWS), Snowflake, Terraform (IaC), Docker, Power BI, Tableau (reporting tools), data quality, large datasets.

**Honest positioning (keep straight at interview):**
- **Databricks / PySpark** is real hands-on experience but from the VCDI internship (2023), not the current role. Say so if asked; it's genuine, just not daily right now.
- **Snowflake / Terraform / AWS** are from the personal Cloud Data Platform build, labelled as a personal project.
- **Current role** is pipeline-heavy Python + advanced SQL (SQL Server) + Azure ingestion/validation. This is the core, everyday strength.

**Coverage:** every stated requirement (Python, Databricks, reporting tool, advanced SQL, pipeline building) is backed by real work. Nothing invented.
