# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

I work as the analytics partner embedded with business teams, the person a category manager or a procurement lead comes to with a rough question and leaves with a number they can act on. At my current firm I own client engagements end to end, including a procurement spend analysis for a multi-venue restaurant group that started with no clear direction and ended in close to A$2M in identified savings, presented directly to their Chief Procurement Officer and category managers. I use AI agents daily to speed up analytics work, but the part I actually built is the verification layer: an independent QA agent that re-derives every number from a clean session before it reaches a client, plus a human check before it goes out. I'm strong in SQL, keep dashboards other teams rely on without checking with me first, and work in Git as part of my daily routine, and I'd like to bring that same partnership and skepticism about AI-generated answers to RevenueCat's Data Analyst role.

## Key Skills

**Analytics Partnering:** client engagement ownership, framing ambiguous questions into analysis, presenting to senior stakeholders (Chief Procurement Officer, category managers), written communication of caveats and limitations, documentation of methods and definitions
**SQL & Data Warehousing:** SQL, Azure-hosted data warehouses, data modelling, KNIME, high-volume datasets (millions of rows, weekly refresh cycles)
**Dashboards & BI:** Tableau (16+ dashboards maintained), Power BI, dashboard design, KPI reporting
**AI & Agentic Workflows:** Claude, ChatGPT, multi-agent orchestration, independent QA/verification agents, human-in-the-loop review, LLM-driven automation
**Engineering Practices:** Git (branches, PRs, code review), Python, ETL pipeline design and automation
**Also familiar with (nice-to-have for this role):** Snowflake (personal cloud data platform build), Databricks and PySpark (internship)

## Experience

### Data Analyst, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy. I work as the direct analytics partner to enterprise clients across Australia and New Zealand, owning each engagement end to end: understanding what a business team is trying to decide, framing the real question, and shipping a dataset or dashboard they actually use. Selected engagements:

**Pricing and cost analytics: multi-venue restaurant group (AU/NZ)**
- Problem: the client knew they were leaking money on supplier costs but had no idea where; there was no ready-made dataset, just a hunch that savings existed somewhere in the spend.
- Approach: owned the account as the sole analyst, structured a product catalogue of roughly 3,000 to 3,500 items as the foundation, then built a pricing-decision dashboard in Tableau (one of 16+ I maintain across clients) that tracks price movement and cost leakage down to product, venue and supplier level, using SQL and Python; ran bi-weekly progress meetings and presented findings directly to the Chief Procurement Officer, food category manager and general managers.
- Result: helped the client find close to 30% savings, roughly A$2M, in their largest spend category over a year, used directly in supplier negotiations.

**Agentic client reporting with independent verification (internal, my own firm)**
- Problem: analysts were spending real time each cycle hand-assembling client progress reports, with no consistent way to check an AI-generated report before it went to a client.
- Approach: built an agentic workflow in Claude that drafts structured client progress reports from our analytics outputs, then added a second, independent QA agent that re-derives the key numbers from a clean session with no memory of how the first agent got there, plus a human sign-off before anything is sent; also evaluate and refine AI-generated outputs across other client workflows before they go out.
- Result: adopted across the whole analyst team (roughly 25 to 30 client accounts), saving about 12 to 15 hours a week firm-wide, with the QA agent catching answers that looked right but weren't before a client ever saw them.

**Data pipeline and quality: largest client account (5 regions, 13 sub-regions)**
- Problem: the firm's biggest client submitted spend data manually every week across 13 regions, with no consistent format and no automated way to catch bad files before they broke downstream reporting.
- Approach: own the SQL and Python pipeline behind an account totalling around 6 million invoice rows (plus PO and lookup data), with roughly 500,000 to 600,000 rows refreshed weekly; replaced the manual upload process with automated email ingestion via the Microsoft Graph API into SQL Server, standardised file submission across all 13 regions, and built automated validation that checks row counts, data types and column consistency before anything moves downstream.
- Result: cut weekly processing from 4 to 5 hours of manual checking to about 75 minutes, while giving the client's team a warehouse they can trust without re-checking the numbers themselves.

**Self-service pipeline refresh app: 26 client accounts, Git-based**
- Problem: refreshing a client's data was a manual, specialist task, with nothing documenting how it actually worked end to end.
- Approach: built and maintain a self-service app used across all 26 client accounts, with one-click ingestion, validation, downstream processing and full or incremental refresh options; the whole project lives in Git with proper branching and change history, and I keep the pipeline documentation current so anyone on the team can pick it up.
- Result: turned a specialist job into a button any teammate can press, on track to save around 10 hours per person across a 6-person team each month.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Problem: government procurement data needed anomaly screening at a scale too large for a single machine.
- Approach: built a distributed anomaly-detection pipeline using Databricks and PySpark, then delivered the findings through a Power BI dashboard and presented the architecture to cross-functional stakeholders.
- Result: improved detection accuracy by about 20%, and the Power BI solution was adopted by senior Department of Transport stakeholders.

## Projects

### [MyFacit](https://www.myfacit.com): analytics and decision-support SaaS for independent cafés
- Personal product build, live with a real café as design partner: unifies POS transactions, staff wages and 14 suppliers' invoices into one model, delivering a weekly view of revenue, wage cost %, food cost % and gross margin plus one recommended action, alongside revenue forecasting, menu engineering and supplier price-creep detection. Built for a non-technical operator who needs a clear answer, not a raw dataset.

### Cloud Data Platform with Terraform (personal project)
- Provisioned AWS infrastructure as code with Terraform (S3, IAM, EC2) and built an automated ingestion pipeline from external APIs into Snowflake, with a modular multi-environment (dev/staging/prod) design. Personal build, not client work; included since Snowflake is a nice-to-have for this role.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: roughly 70% of the JD's core requirements.**

**Matched (already true of Dhruv, now surfaced):** SQL, data warehouse comfort (Azure-hosted, SQL Server), Tableau/Power BI dashboards non-technical teams rely on, Git/branches/PRs/code review, Python, client/stakeholder partnering (Chief Procurement Officer, category managers), ambiguous-question framing (restaurant-chain engagement), documentation of methods and definitions, high-volume data (millions of rows, weekly refresh), AI agents used daily plus a built independent QA/verification agent.

**Missing but applicable (had it, wasn't foregrounded before, now added):** explicit "warehouse" language, explicit Git/PR wording, explicit high-volume-data callout, explicit "verification" framing around the QA agent.

**Not applicable (genuine gaps, not claimed):** dbt, LookML/Looker (not used in production), Snowflake in production (personal project only), ClickHouse, subscription or fintech domain experience, 3+ years tenure (roughly 2 years full-time plus a 2023 internship).

## Top 3 Recommendations

1. In the interview, lead with the restaurant-chain engagement as the single strongest proof: an ambiguous brief, independent ownership, and a Chief Procurement Officer level presentation are exactly the "direct analytics partner" signal this JD screens for.
2. Be ready to walk through the QA-agent verification story in detail (how the second agent re-derives numbers with no session context, what it has caught) since this is RevenueCat's explicit differentiator ask.
3. Be upfront about the two honest gaps if asked directly: no hands-on dbt/LookML, and tenure is closer to 2 years than 3; frame both as fast-learn areas backed by real warehouse and stakeholder experience rather than disclaiming them unprompted.
