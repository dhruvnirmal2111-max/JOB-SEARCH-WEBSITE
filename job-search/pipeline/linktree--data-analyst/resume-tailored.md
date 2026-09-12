# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary
I take a fuzzy business question, work out what evidence actually answers it, then go get that evidence: write the SQL, model the data, build the view, and stay with it until the recommendation lands. That is the job I have run for two years as the day-to-day analyst on enterprise client accounts at a data and analytics consultancy, framing asks directly with senior stakeholders such as a Chief Procurement Officer and category managers, and standardising the metrics a whole client's regional teams report against. I have also built Facit, a live product that turns messy real-world data into a weekly profitability call for a non-technical cafe owner, the closest thing I have to shipping analytics an end user opens every week and trusts. Underneath sits a genuine SQL and Python base, including a categorisation pipeline built across roughly A$12B of client spend, and I want to bring that same question-to-recommendation discipline to Linktree's Business Analytics team.

## Key Skills
**SQL & Data Modelling:** SQL (joins, window functions, CTEs), Python, Transaction-Level Data Modelling, Snowflake, Statistical Analysis, Forecasting
**BI & Self-Serve Tooling:** Tableau, Power BI, Dashboard Design, Metric Definition & Documentation, Data Storytelling
**Analytics Delivery:** Ambiguous-to-Recommendation Problem Framing, Senior Stakeholder Communication, Written & Verbal Reporting (memos, decks), Reproducible & Version-Controlled Analyses
**Cloud & Infrastructure:** AWS (S3, Athena, Glue), Azure, Databricks, Terraform (IaC), Docker

## Experience

### Data Analyst, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

Sole analyst on multiple enterprise client accounts at a data and analytics consultancy: partners directly with senior stakeholders (Chief Procurement Officers, category managers, general managers) to scope ambiguous commercial questions, model transaction-level data in SQL, and turn the analysis into recommendations and dashboards their teams use weekly.

- Owned an ambiguous pricing and margin question end to end for an AU/NZ restaurant chain client: framed it with the Chief Procurement Officer and category managers, modelled product and transaction data in SQL, and built a pricing-decision dashboard drilling from category-level trend down to product, venue and supplier. Delivered around 30% savings in the client's largest spend category over a year.
- Standardised how the firm's largest client account measures spend across 5 global regions and 13 sub-regions (~6M invoice rows), replacing a manual upload process with automated, validated SQL pipelines using rolling 4-week windows, so every region reports against one consistent set of definitions.
- Built and led a Python categorisation model (TF-IDF, one-vs-all logistic regression, feature engineering on spend value and line count) across roughly A$12B of client transaction data, cutting a categorisation cycle from 1 to 1.5 months of manual work to a single day, and documented it into a pipeline now used across other client accounts.
- Built and maintained 16+ Tableau dashboards used weekly by procurement and finance stakeholders to self-serve KPI tracking and cost-optimisation opportunities without writing SQL themselves.
- Built a Prophet-based forecasting model for a fresh-produce client to plan raw-material and chemical inventory three months ahead, incorporating external price drivers, and delivered it on a dashboard within a 12.5 to 14% error margin.
- Automated client reporting with Python, SQL and integrated LLM tools, and built an agentic QA workflow to validate datasets before delivery, standardising documentation and cutting reporting turnaround by around 50% across the analyst team.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Built a Power BI analytics solution adopted by senior Department of Transport stakeholders; presented system architecture and findings to cross-functional teams.
- Engineered a distributed anomaly-detection pipeline (Databricks, PySpark) on government procurement data, improving detection accuracy by about 20%.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL), DRDO
Jan 2021 to Jul 2021

- Analysed blast-wave datasets using statistical models and Butterworth filtering; improved noise-level prediction accuracy by about 20% and refined defence-equipment designs by about 10%.

## Projects

### Facit, cafe profitability SaaS (Python, BI, forecasting, product metrics) -- personal build
- Built Facit ([myfacit.com](https://www.myfacit.com)) as a multi-tenant SaaS for independent cafes: unifies POS transactions, staff wages and 14 suppliers' invoices into one model so an owner knows every week whether last week made money, why, and what to fix.
- Defined and shipped a weekly metrics pulse (revenue, wage cost %, food cost %, gross margin) plus menu engineering and supplier price-creep detection, with a revenue forecast for the week ahead: one canonical set of metric definitions in a self-serve view, the same pattern a product analytics team relies on.
- Built with Neighbours Cafe, St Kilda as the live design partner, designing around messy real-world data and a non-technical end user rather than a clean spec.

### Cloud data platform on Snowflake (AWS, Terraform, Snowflake, Power BI) -- personal build
- Provisioned a reproducible, version-controlled cloud environment with Terraform (S3, IAM, EC2) and built an automated ingestion pipeline from external APIs into Snowflake, feeding a Power BI layer, across dev, staging and prod environments.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Statistics I & II, Machine Learning, Communicating with Data, Applied Forecasting

### Bachelor of Engineering, Thapar University | May 2017 to May 2021
Mathematics I/II/III, Statistics, Entrepreneurship

## Keyword Alignment

**Displayed title:** current role aligned from the real title "Data Engineer" to "Data Analyst" for this application. The work itself (client-facing SQL/Python analysis, dashboards, stakeholder-driven recommendations) is genuinely analyst work; the master files keep the real title "Data Engineer." Flagging for confirmation per the generic-discipline title rule.

**JD keywords matched:** SQL, joins, window functions, CTEs, Python, Snowflake, Tableau, Power BI, dashboards, self-serve tooling, metric definition and documentation, ambiguous business question to recommendation, framing the question with a stakeholder, non-technical stakeholder communication, written and verbal communication, autonomy and ambiguity, 2-3 years experience, reproducible and version-controlled analyses, data hygiene, forecasting.

**Added (owner genuinely has, not explicit in the master resume):** SQL joins/window functions/CTEs (grounded in the rolling 4-week spend-window analysis on the firm's largest account), metric definition and documentation across regions (the 5-region/13-sub-region standardisation), "self-serve" framing for the Tableau/Power BI dashboards, Snowflake surfaced from the personal cloud-platform project.

**Not applicable / not fabricated:** Python (pandas) specifically (the master files document extensive Python for feature engineering, cleaning and ETL, but pandas is not explicitly named anywhere in them; not claimed on the resume, flagging as a likely-true inference for the owner to confirm rather than asserting it). dbt (owner has not used it; SQL/Python are the genuine strengths, noted honestly rather than claimed). BigQuery, Redshift (owner has Snowflake and AWS Athena/Glue, not these two specifically). Looker, Mode, Hex, Amplitude (owner has not used these named tools; mapped honestly to genuine Tableau/Power BI experience instead). Formal experimentation/A-B testing on live product features (owner has forecasting and evaluation experience but not run consumer product experiments). Consumer product environment (the owner's client work is B2B/enterprise procurement, not a consumer app; Facit is the closest genuine analog, since it is a live product with defined metrics for a non-technical end user, and is labelled honestly as a personal build). "Event-level" data specifically (owner models transaction/invoice-level data, a close analog, not web/product event tracking).

**Keyword match rate:** approximately 75% of extractable JD keywords/requirements covered truthfully (strong on SQL, warehouse, BI tooling, stakeholder-facing recommendation work, and metric definition; genuine gaps on dbt, BigQuery/Redshift, Looker/Mode/Hex/Amplitude, and consumer-product A/B testing).

**Top 3 Recommendations:**
1. Lead interview story: the restaurant-chain pricing engagement. Walk it as the exact loop the JD describes: framed the question with the CPO and category managers, wrote the SQL, modelled the data, built the dashboard, delivered a recommendation that landed around 30% category savings.
2. Second story: Facit. Use it to speak directly to "metric definition" and "self-serve tooling for a non-technical audience," since the weekly pulse (food cost %, gross margin, revenue) is a real product analytics loop shipped to a real end user, even though the domain is hospitality rather than consumer social.
3. Name the tooling gaps confidently rather than defensively: no dbt, Looker, Mode, Hex or Amplitude specifically, but strong SQL/Python and fast adoption of Tableau/Power BI and Databricks/PySpark in the past suggests a quick ramp; be ready to say this plainly if asked.
