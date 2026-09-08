# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

I build and maintain the pipelines that pull data from different source systems into one reliable base, then turn it into the dashboards and reporting that business teams use to make decisions. In my current role at Purchasing Index Data Analytics I own the end-to-end pipeline for the firm's largest client, close to six million transaction rows drawn from five global regions, and I have built and maintained 20+ automated ETL pipelines across five enterprise clients, backed by Tableau reporting for stakeholders. I also design and run MyFacit, a live product I built that unifies point-of-sale, payroll and supplier invoice data for independent cafes into a single weekly profitability view, direct experience integrating retail and operational systems into one source of truth. I want to bring that pipeline-to-insight discipline to the Data & Analytics Engineer role at Johnson Fitness & Wellness.

## Key Skills

**Data Engineering & Pipelines:** Python, SQL, ETL/ELT pipeline design, API integration (Microsoft Graph API), batch automation, full and incremental refresh, data modelling, data validation and quality monitoring, documentation
**Cloud & Data Warehousing:** Snowflake, Databricks, PySpark, AWS (S3, EC2, IAM, Lambda), Azure, Terraform (IaC), Docker
**BI & Reporting:** Tableau, Power BI, KPI reporting, dashboard design, data storytelling
**Analytics & Forecasting:** Prophet time-series forecasting, anomaly detection, statistical analysis, scikit-learn
**Tools & Practices:** Git / version control, KNIME, stakeholder communication

## Experience

### Data & Analytics Engineer, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy building pipelines and reporting across supplier, transaction and procurement systems for enterprise clients in Australia and New Zealand. Selected engagements:

**Multi-source pipeline integration: largest enterprise client (multi-region)**
- Problem: the account ran on a manual upload-and-check process, about 4 to 5 hours every week, across close to six million invoice rows spanning 5 global regions and 13 sub-regions, each submitting files in its own format.
- Approach: replaced it with automated email-based ingestion (Microsoft Graph API into a remote SQL Server via batch scripts), standardised file submission and naming conventions so every region feeds one consistent intake, and built automated validation (row and hour counts, data-type and column-consistency checks) that drops stray columns and logs discrepancies for review.
- Result: cut weekly processing from 4 to 5 hours down to about 75 minutes, roughly 3 to 3.5 hours saved every week, with one standardised pipeline now feeding downstream reporting for the company's highest-billing client.

**Enterprise ETL pipelines across 5 clients**
- Problem: each client's procurement and transaction data needed repeatable, reliable ingestion from separate source systems.
- Approach: built and maintain 20+ automated ETL pipelines in Python and SQL, deployed on Azure-hosted servers with scheduled automation.
- Result: cut manual reporting effort by about 40% and improved turnaround by about 50% across all 5 accounts.

**Self-service pipeline refresh app (26 client accounts, in progress)**
- Problem: refreshing each of the firm's 26 client datasets was a manual, specialist task that tied up the analytics team.
- Approach: leading the automation behind a company-wide app that turns each client refresh into a one-click run, with separate controls for ingestion, validation and downstream processing, both full and incremental, version-controlled in Git with maintained documentation and clean underlying databases.
- Result: on track to save about 60 hours a month across the team once complete.

**Reporting, BI and data quality:** developed and maintain 16+ Tableau dashboards for procurement and finance stakeholders, translating transaction and supplier data into KPIs and cost-optimisation opportunities; ran anomaly detection across procurement datasets to flag cost-leakage patterns, contributing to about 15% in client savings.

**Forecasting for inventory planning:** built a Prophet time-series forecasting model for a fresh-produce client, projecting raw-material and chemical inventory needs about three months ahead and incorporating external price drivers such as sea-freight trends, delivered on a dashboard within a 12.5 to 14% error margin, well inside the client's tolerance.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Built a distributed anomaly-detection pipeline in Databricks using PySpark, engineering scalable transformation layers for government procurement data and improving detection accuracy by about 20%.
- Delivered a Power BI analytics solution adopted by senior Department of Transport stakeholders, presenting the architecture and outcomes to cross-functional stakeholders.

## Projects

### [MyFacit](https://www.myfacit.com): multi-tenant profitability SaaS for independent cafes (personal build)
- Built a product that unifies POS transactions, staff wages and 14 suppliers' invoices into one weekly profitability view: revenue, wage cost %, food cost %, gross margin and a recommended action for the week ahead.
- Includes revenue forecasting, menu engineering and supplier price-creep detection; live with a St Kilda cafe as the design partner, with weekly meetings to refine it against real, messy operational data. Direct experience with the kind of multi-source, retail-adjacent data integration this role needs.

### Cloud Data Platform with Terraform (personal build)
- Provisioned cloud infrastructure as code with Terraform (AWS S3, IAM, EC2, networking) and built an automated ingestion pipeline from external APIs into Snowflake, with Docker for a modular, multi-environment setup (dev, staging, prod).

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: approximately 75% on the core technical requirements.**

**Matched (genuine):** data engineering / analytics engineering / BI experience, building and maintaining scalable pipelines, ETL/ELT, strong SQL, Python, cloud data warehouse (Snowflake, from the personal Cloud Data Platform build; JD accepts "Snowflake, BigQuery, Redshift, or similar"), integrating APIs and third-party sources (Microsoft Graph API) and multiple data sources across regions, BI/reporting platforms (Tableau, Power BI; JD accepts "or similar" to Looker/Sigma/Metabase), data models/schemas and reporting standards (standardised regional intake, categorisation rules, product catalog work), monitoring pipelines for data quality and reliability, documentation, forecasting supporting inventory optimisation (Prophet), cross-functional and independent delivery.

**Added from JD (now foregrounded):** led with the multi-source pipeline/API-integration engagement rather than opening with the flatter ETL-pipeline count, since "integrate ecommerce, POS, ERP, CRM... into a centralized view" is the JD's stated core; surfaced MyFacit's POS/wages/supplier-invoice integration as the closest retail-adjacent analogy; foregrounded anomaly/trend detection and KPI reporting language to match "identify trends/anomalies/gaps."

**Honest gaps (do not paper over at interview):**
- **Ecommerce and customer-journey domain** (conversion funnels, add-to-cart/checkout behaviour, attribution, lifecycle marketing, CRO): not direct experience. The closest transferable proof is MyFacit and the procurement/retail-adjacent POS integration; frame it as the same analytical and integration discipline applied to a different domain, not as ecommerce experience.
- **R:** not used; Python is the working language.
- **BigQuery / Redshift:** not used; Snowflake and AWS are (JD explicitly accepts "or similar").
- **Looker / Sigma / Metabase:** not used; Tableau and Power BI are (JD explicitly accepts "or similar").
- **A/B testing frameworks, customer data platforms, marketing automation, event-based analytics:** not used. Statistical and anomaly-detection background exists, but there is no shipped A/B testing program to point to.
- **3+ years of experience:** currently at about 2 years full-time (since Jun 2024) plus a 2023 data engineering internship; slightly under the stated minimum. Not inflated here.
- **Eligibility:** this is a US onsite role requiring a valid driver's licence and pre-employment/annual MVR checks, which is a genuine open question against a Melbourne base; confirm US work eligibility and location fit before applying.

**Top 3 Recommendations:**
1. Lead with the multi-region pipeline/API-integration story (Microsoft Graph API, automated validation across 13 sub-regions) since it is the closest real match to the JD's "integrate ecommerce, POS, ERP, CRM into a centralized view" core.
2. Be upfront in the cover letter and interview that the domain is procurement/supply-chain, not ecommerce, and frame MyFacit and the multi-source pipeline work as the transferable proof rather than implying ecommerce-specific experience.
3. Before investing further, confirm US work eligibility and the onsite/travel/driver's-licence requirement, since this is the biggest practical risk flagged in the JD, independent of the technical fit.
