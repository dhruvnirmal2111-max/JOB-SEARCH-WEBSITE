# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary
I have built and run a product end to end, deciding what it measures and building the data layer underneath it, which is the heart of this role. That product is MyFacit, a live profitability SaaS I founded for independent hospitality venues, where I define every metric it tracks and decide what the data needs to surface for a non-technical owner. Alongside it my work is SQL-first: I write and tune complex SQL (window functions, multi-table joins, query optimisation) to query and validate large transaction datasets, and I have stood up a cloud data warehouse from nothing on Snowflake with Terraform, so deciding what should sit alongside a workhorse database and building it is work I have already done. I use AI agents daily, including an independent verification pass that re-derives numbers before anything reaches a client, and I build validation into everything I ship, a habit suited to a role built around privacy and keeping data in house.

## Key Skills
**SQL & Query Performance:** Advanced SQL (window functions, multi-table joins, query optimisation), large-dataset validation, SQL Server, Snowflake
**Python & Data Pipelines:** Python (pandas, numpy, scikit-learn), automated ETL pipeline design, data cleaning, workflow automation
**Cloud & Data Warehousing:** Snowflake, AWS (S3, IAM, EC2), Terraform (IaC), Docker, Azure
**AI & Agentic Workflows:** Claude Code, multi-agent orchestration, independent AI verification/QA agents, LLM-assisted development, prompt and agent design
**Dashboards & Product Metrics:** Power BI, Tableau, KPI and metric definition, product analytics; picking up React to pair on an internal dashboard front end
**Practices:** data privacy and integrity discipline, Git, documentation for distributed teams

## Experience
### Data Analyst / Engineer, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy analysing supplier and transaction data for enterprise clients across Australia and New Zealand.

- Write and tune complex SQL, including window functions and multi-table joins, to query and validate large transaction datasets (one client pipeline runs to roughly 6 million rows) across 5+ enterprise clients, adding automated checks that catch discrepancies before they reach a report.
- Design and manage agentic AI workflows in production, including a multi-agent QA system (5 agents plus an orchestrator) that independently re-derives and verifies analytics outputs before they reach a client, using AI agents to strengthen delivery rather than replace the judgment behind it.
- Built and maintain 20+ automated ETL pipelines in Python and SQL, processing millions of procurement transactions monthly, deployed on Azure-hosted infrastructure with scheduled orchestration and no manual intervention.
- Own automated validation on the company's highest-volume client pipeline (row counts, data-type and column-consistency checks), replacing a manual upload process with automated ingestion and flagging discrepancies before they reach downstream reporting, the same integrity discipline a privacy-sensitive, internal-only product needs.
- Segment spend and transaction data by product, venue and supplier in SQL to isolate cost trends, then surface the analysis in Tableau and Power BI dashboards for procurement and finance stakeholders; this analysis helped one client identify close to A$2M in savings in a single spend category.

### Founder, [MyFacit](https://www.myfacit.com) (self-directed venture)
May 2026 to Present | Melbourne, Australia
- Founded and run MyFacit, a profitability SaaS for independent hospitality venues, owning it end to end from deciding what it measures to building the data layer underneath it.
- Unifies POS transactions, staff wages and invoices from 14 suppliers into one weekly view, surfacing revenue, wage cost %, food cost % and gross margin plus one recommended action for the week ahead; also runs revenue forecasting, menu engineering and supplier price-creep detection.
- Live in day-to-day use with a design-partner venue, with weekly reviews to refine the metrics. The closest analog to this role: I own a product's data from the inside and build the layer that makes it useful.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline in Databricks using PySpark on government procurement data, then delivered the results through a Power BI solution adopted by senior Department of Transport stakeholders; detection accuracy improved about 20%.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL), DRDO
Jan 2021 to Jul 2021
- Analysed blast-wave sensor data with statistical models and Butterworth filtering to predict noise levels, improving prediction accuracy about 20%.

## Projects
### Cloud Data Warehouse with Terraform (personal project): AWS, Snowflake, Terraform
- Provisioned a cloud data warehouse from scratch as infrastructure as code (S3, IAM, EC2, networking) and built an automated ingestion pipeline from external APIs into Snowflake, with modular Terraform patterns for dev, staging and prod environments. The same kind of build out a product needs once a single database stops being enough on its own.

### Job Hunt OS (personal project): Claude Code, multi-agent orchestration, Python
- Designed and built a multi-agent system that runs entirely on Claude Code with no paid APIs: an orchestrator plus specialist agents for resume tailoring, outreach and career coaching, each with a built-in verification pass that re-checks numbers and attribution before anything is finalised. Run and maintain this as a system I rely on daily, not a one-off experiment, directing agents to do real work while keeping a human check on the output.

## Education
### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Coursework: Statistics I/II, Machine Learning, High Dimensional Analysis, Applied Forecasting.
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: roughly 55 to 60% of the JD's named technical keywords matched or genuinely adjacent (about 10 of 18), plus strong alignment on the soft-skill and ownership traits the JD lists.**

**Matched (in both resume and JD):**
SQL, window functions, complex queries, query optimisation and performance, data validation on large datasets, Python for pipelines and analysis, dashboards, comfortable leveraging and managing AI agents to enhance (not replace) work, product ownership and knowing a product's data in and out, startup ownership and high-ambiguity delivery, proactive communication and stakeholder work.

**Missing but applicable (owner has related capability, added truthfully):**
- PostgreSQL specifically: not named; his SQL strength is on SQL Server and Snowflake, which is the same core skill (query design, joins, window functions, optimisation) transferable across engines. Kept as "SQL" rather than claiming Postgres-specific tuning he has not done.
- Cohort and retention queries: no shipped product-retention program; the genuine parallel is segmenting transaction data by product, venue and supplier using SQL, which is the same analytical muscle applied to a different dimension. Framed honestly as segmentation, not claimed as cohort/retention analytics.
- Building the warehouse/BI layer from scratch: the JD treats dbt, BigQuery, ClickHouse and Metabase as "a plus, not required." He has not used those specific tools, but has done the equivalent job once already, standing up a Snowflake warehouse provisioned with Terraform plus automated ingestion, which is the real skill the JD is testing for (deciding what comes after a single database and building it).
- Privacy and internal-only tooling: no health-data experience, but genuine validation and data-integrity discipline (automated checks, catching issues before delivery) transfers directly to a privacy-first, internal-tooling context.

**Not applicable (genuine gaps, not fabricated):**
- TypeScript and a Node backend: not his stack (Python and SQL are). The JD asks for "some" TypeScript and offers pairing with the frontend engineer, so this is named as a real but minor gap, not claimed as shipped experience.
- React for the dashboard front end: same as above, no shipped React work; genuinely willing and able to pick it up alongside a frontend engineer, not claimed as existing skill.
- Deep PostgreSQL internals tuning: query-performance awareness is genuine (keeping analytics queries from slowing a shared server is exactly the discipline behind the large client-pipeline validation work above), but Postgres-specific internals tuning has not been tested.
- Health-privacy domain and product-analytics-for-health experience: none; not claimed. The transferable pieces (data-quality discipline, product ownership on MyFacit, SQL-first delivery) are surfaced instead.

**Top 3 Recommendations:**
1. Before the SQL test, warm up specifically on PostgreSQL syntax quirks (window functions, `LATERAL`, upsert syntax) since the underlying skill is strong but the dialect is not the one used day to day.
2. In conversation, be direct that TypeScript/React are a real but small gap and pair that with a concrete plan (pairing with the frontend engineer, as the JD itself offers) rather than downplaying it.
3. Lead with the Terraform/Snowflake build and the multi-agent QA/verification work early in the conversation. Those two are the least common combination in the applicant pool for this role and answer "what comes next after Postgres" and "how do you manage AI agents" directly.
