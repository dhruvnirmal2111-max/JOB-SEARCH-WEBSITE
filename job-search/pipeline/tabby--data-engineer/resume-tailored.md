# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61406259619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary
I'm a Data Engineer who builds and maintains the pipelines, warehouses and quality checks that let analysts, business teams and ML engineers trust the data they work with. In my current role at a data and analytics consulting firm I own the end-to-end pipeline for the company's largest client account, syncing spend data across five global regions into one automated feed, and I've built and maintained 20+ automated ETL and EL pipelines that pull and clean data from multiple client source systems. I've provisioned a cloud data warehouse on Snowflake with infrastructure as code in Terraform, and worked with distributed processing in Databricks and PySpark. I write clear documentation and keep pipelines auditable, since most of my work runs unattended and has to stay reliable without me watching it.

## Key Skills
**Data Engineering:** Python, SQL, ETL/EL pipeline design, data modelling (dimensional/star schema in practice), data cleaning and validation, batch automation, Git/version control
**Cloud & Infrastructure:** AWS (S3, EC2, IAM), Azure, Snowflake, Terraform (IaC), Databricks, PySpark, Microsoft Graph API
**Data Quality & Governance:** automated validation and reconciliation checks, anomaly detection, pipeline reliability, documentation
**Analytics & BI (supporting):** Power BI, Tableau, KNIME

## Experience
### Data Engineer, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia
- Own the end-to-end data pipeline for the company's largest client account: spend data across 5 global regions and 13 sub-regions, roughly 6 million invoice rows plus PO and lookup data, refreshed weekly. Replaced a manual upload process with automated email-based ingestion (Microsoft Graph API into SQL Server batch scripts), standardising file submission across every region and cutting weekly processing from 4 to 5 hours down to about 75 minutes.
- Built and maintained 20+ automated ETL and EL pipelines (Python, SQL, batch scripting) pulling and cleaning procurement transaction data from multiple client source systems each month, deployed on Azure-hosted servers with scheduled automation.
- Automated the data-refresh pipelines behind a company-wide, self-service app used across all 26 client accounts: separate one-click controls for ingestion, validation, downstream processing and both full and incremental refresh, with automatic archiving. The project is version-controlled in Git, and I maintain the pipeline documentation and keep the underlying databases clean so refreshes stay reliable.
- Added automated data-quality checks (row and column-count reconciliation, data-type validation) that catch discrepancies before they reach clients, and built a multi-agent QA workflow to validate datasets prior to delivery.
- Performed anomaly detection on procurement datasets to flag cost-leakage patterns, and supported client cost-optimisation decisions with pricing and supplier dashboards built on the underlying pipeline output.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline in Databricks using PySpark, engineering scalable transformation layers to process government procurement data, improving detection accuracy about 20%.
- Deployed a Power BI analytics solution adopted by senior Department of Transport stakeholders, and presented system architecture and outcomes to cross-functional stakeholders.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL), DRDO
Jan 2021 to Jul 2021
- Analysed blast-wave data with statistical models and Butterworth filtering to predict noise levels, improving prediction accuracy about 20% and refining defence equipment designs about 10%.

## Projects
### Cloud Data Warehouse Platform with Terraform (personal project): AWS, Terraform, Snowflake
- Provisioned a full cloud data warehouse environment as code (S3, EC2, IAM, networking) with Terraform, built an automated ingestion pipeline pulling data from external APIs into Snowflake, and designed modular Terraform patterns for reproducible, version-controlled dev/staging/prod deployments.

### MyFacit (personal project): multi-source data integration for café profitability
- Built a data pipeline that synchronises and unifies POS transactions, staff wages and invoices from 14 suppliers into one weekly refreshed model for an independent café, turning three unintegrated source systems into a single automated, structured feed used to generate a weekly profitability view.

## Education
### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: roughly 40% of the JD's named stack/keywords (about 14 of 34), with several genuine adjacent-experience matches and a set of honest gaps below.**

**Matched (present in both the resume and the JD):**
Python, SQL, ETL / EL / ELT pipeline development, data synchronization (multi-region, multi-source ingestion), data quality, data governance (practice-level, via validation and QA workflows), system design (Terraform IaC, modular self-service pipeline app), MPP/distributed processing (Databricks, PySpark), REST API integration (Microsoft Graph API, external API ingestion), star schema/dimensional modelling (in practice, not the named formal frameworks), cost-optimisation adjacent work (cost-leakage/anomaly detection, pipeline consolidation reducing manual effort).

**Missing but applicable (genuinely has, now surfaced):**
Git/version control (P23 self-service app is fully version-controlled), documentation practice (maintained pipeline docs), cloud data warehouse ownership (Snowflake IaC build), reconciliation-style validation (row/column-count and data-type checks on the largest client pipeline).

**Not applicable / honest gaps (do not claim):**
- **3+ years as a Data Engineer:** currently at roughly 2 years full-time plus a 2023 internship. Did not inflate tenure; framed the summary around what was built rather than years.
- **dbt:** not used. His modelling is SQL-based, not dbt-managed.
- **Airflow:** pipelines are automated (Windows Task Scheduler, batch scripts, a self-service refresh app) but not confirmed as Airflow specifically. Not claimed.
- **BigQuery, Clickhouse, GCP:** his cloud data warehouse and IaC work is on Snowflake and AWS (with Azure in his current role); GCP is not used. Presented as adjacent, not equivalent.
- **PostgreSQL, Docker, GitLab CI/CD:** not confirmed in his stack (SQL Server/Snowflake for databases, Git but not confirmed GitLab CI specifically). Not claimed.
- **Kimball, Inmon, Medallion, Data Mesh, Data Vault, SCD forms (named methodologies):** he does practical dimensional/star-schema-style modelling day to day but has not worked with these as named formal frameworks. Framed honestly as "in practice," not claimed as expertise.
- **gRPC, message brokers/queues, NoSQL:** no confirmed hands-on experience; omitted rather than implied.

## Top 3 Recommendations
1. If shortlisted, be upfront early that tenure is close (about 2 years full-time plus an internship) rather than letting it surface later. The engineering substance (20+ pipelines, a 6M-row multi-region pipeline, a company-wide self-service refresh app) is strong enough to carry a "slightly under on years, ahead on scope" conversation.
2. Before an interview, skim the actual definitions of Kimball vs Inmon vs Data Vault and SCD types 1/2, since the JD names them explicitly. He does the practical version of this work already; knowing the vocabulary removes the only real knowledge gap in an otherwise strong match.
3. If a take-home or technical screen touches Airflow or dbt, be transparent that his automation has been script/scheduler-based rather than DAG-orchestrator-based, and pivot to the self-service pipeline app (P23) as evidence of the same orchestration thinking (ingestion, validation, downstream, full/incremental refresh) built a different way.
