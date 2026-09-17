# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61406259619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary
I design the SQL data models and pipelines that turn large, messy source data into reliable, reusable datasets other teams can build reporting on. In my current role I own the modelling and validation behind a 6M-row, multi-region client account, build the 20+ automated pipelines and 16+ Tableau and Power BI dashboards that keep that data trustworthy and usable, and coordinate with stakeholders across regions so everyone works from one consistent set of definitions; on a separate account this kind of analysis helped a client find roughly A$2M in savings. I also design and maintain MyFacit, a live product where I own the data model and weekly metrics end to end, and I work well in distributed teams, documenting decisions clearly so pipelines and definitions hold up across time zones.

## Key Skills
**SQL & Data Modelling:** SQL (SQL Server, Snowflake), modular and reusable SQL transformations, data modelling, query optimisation, Python
**ETL & Data Pipelines:** automated Python/SQL pipelines, API-based ingestion, batch scheduling, full and incremental refresh, data validation, standardised intake
**Data Warehousing & Cloud:** Snowflake, AWS (S3, EC2, IAM), Azure, Terraform (IaC), relational database design, Docker
**BI & Reporting:** Tableau, Power BI, KPI design and monitoring, dashboard development, self-service reporting
**Tools & Practices:** Git, documentation, stakeholder collaboration, data-quality/validation processes

## Experience
### Data & Analytics Engineer, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia (remote-capable client analytics consulting)
- Design and maintain the SQL data models and transformation logic behind the firm's largest client account, turning raw invoice, PO and lookup data from 5 global regions (about 6M rows) into one standardised, reusable dataset for downstream reporting.
- Build and maintain 20+ automated ETL pipelines (Python, SQL) across 5 enterprise clients, processing millions of procurement transactions monthly on scheduled, Azure-hosted infrastructure.
- Own data quality on that largest account: automated validation (row and hour counts, data-type and column-consistency checks) that catches discrepancies before delivery, replacing a manual, error-prone upload process.
- Build and maintain 16+ Tableau and Power BI dashboards that give procurement and finance stakeholders self-service KPI reporting instead of ad hoc requests.
- Coordinate with stakeholders and analysts across 13 sub-regions to standardise file submission, naming conventions and metric definitions so every region feeds one consistent model.
- Leading the automation behind a company-wide, self-service pipeline-refresh app across 26 client accounts (Python, SQL, Git), turning a manual, specialist refresh into a one-click run with separate controls for ingestion, validation and processing.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline (Databricks, PySpark) and engineered scalable transformation layers for government procurement data, improving detection accuracy by about 20%.
- Delivered a Power BI analytics solution adopted by senior Department of Transport stakeholders, presenting the architecture and outcomes to cross-functional stakeholders.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL), DRDO
Jan 2021 to Jul 2021
- Applied statistical modelling and signal filtering to blast-wave data to predict noise levels, improving prediction accuracy by about 20%, and compiled findings into a 70-page technical report.

## Projects
### Cloud Data Platform (Terraform, AWS, Snowflake)
- Provisioned cloud infrastructure as code (S3, IAM, EC2) with Terraform and built an automated ingestion pipeline from external APIs into a Snowflake data warehouse.
- Modular, multi-environment design (dev, staging, prod), hands-on with core data warehousing and infrastructure-as-code concepts.

### [MyFacit](https://www.myfacit.com), profitability analytics SaaS for independent cafes (personal build)
- Own the data model and metric definitions end to end for a live multi-tenant product that unifies POS transactions, staff wages and 14 suppliers' invoices into one weekly profitability view.
- Define and maintain the metrics it reports (revenue, wage cost %, food cost %, gross margin) plus revenue forecasting and supplier price-creep detection, live in day-to-day use with a design-partner cafe (Neighbours Cafe, St Kilda).

## Education
### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Coursework: Statistics I & II, Machine Learning, Communicating with Data, Applied Forecasting
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate:** about 10 of 13 core requirements are genuine, direct matches (roughly 80%). The rest are named honestly below, not papered over.

**Matched (genuine, direct):** strong SQL and query optimisation across large datasets; data modelling and reusable, standardised datasets (SQL-based); end-to-end data pipelines (20+ automated Python/SQL pipelines); data quality checks and cleansing (automated validation on a 6M-row account); data warehousing concepts (Snowflake, SQL Server, a Terraform-provisioned warehouse); BI dashboards (16+ Tableau, Power BI; JD accepts "Looker, Tableau, or similar"); Python for data processing and automation; working with analysts and stakeholders to keep metrics and definitions consistent across regions; handling multiple client projects and deadlines in a consulting environment; communicating with technical and non-technical stakeholders; relevant degree (Master of Data Science, Monash).

**Honest gaps (named, not inflated):**
- **dbt:** the real gap. The JD names dbt specifically for data modelling and macros. My modelling experience is SQL-based (modular transformation logic, standardised, reusable datasets, validation checks) rather than in dbt itself; the underlying concepts (modular models, transformations, tests) map directly to what I already do in SQL, but I have not shipped dbt, and I'm not claiming otherwise here.
- **3+ years in a similar role:** the JD asks for 3+ years; I have about 2 years full-time in this role plus a 2023 data engineering internship and an ongoing founder project (MyFacit). Kept out of the summary rather than inflated.
- **Looker:** not used. Tableau and Power BI are (the JD explicitly accepts "or similar"), and both are used at meaningful scale (16+ dashboards).

**Top 3 recommendations:**
1. Be upfront early (cover note or first call) that dbt itself hasn't been shipped, while pointing to the SQL modelling and standardisation work on the largest client account as the direct proof the underlying skill transfers quickly.
2. If time allows before an interview, do a short hands-on pass through dbt basics (models, refs, a macro or two) so the honest answer becomes "learning it now" rather than "haven't touched it."
3. Lean on the 6M-row, multi-region account and the metric-standardisation work across 13 sub-regions as the closest real analogy to Deel's own scale (100+ countries, one consistent data model), since that is the strongest single proof point for this specific req.
