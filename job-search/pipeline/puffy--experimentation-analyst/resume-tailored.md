# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61406259619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)
## Professional Summary
I'm a hands-on analyst who'd rather write my own SQL and Python than wait on a pre-built dashboard or someone else's backlog. At PI Data Analytics, a data and analytics consulting firm, I independently manage the full analytics loop for enterprise clients: pulling and joining data from multiple systems myself, building the pipeline, running the statistical work, and distilling it into a recommendation a non-technical stakeholder can actually use. That approach has produced real outcomes, including roughly A$2M in surfaced savings for a multi-venue restaurant client by tracking price movement and cost leakage down to the product, venue, and supplier level, and a classification pipeline that cut a six-week manual categorisation cycle to a single automated run across a roughly A$12B spend dataset. I'm looking to bring that same source-to-recommendation ownership to Puffy's experimentation and CRO work.
## Key Skills
**Analytics & Statistics:** SQL (CTEs, window functions, complex joins), Python (pandas, numpy, scikit-learn), hypothesis-driven classification, cross-validation, class-imbalance handling, segment/venue/supplier-level analysis, time-series forecasting (Prophet)
**Data Pipelines & Warehousing:** Multi-source data integration (APIs, email ingestion, SQL Server, flat files) without engineering support, ETL pipeline design, Snowflake, Azure, AWS (S3, Athena, Glue), BigQuery/GCP (familiar)
**AI & Automation:** Agentic AI and LLM workflows (Claude, ChatGPT) built on SQL and Python foundations, multi-agent orchestration, prompt engineering, AI-output QA
**BI & Stakeholder Communication:** Tableau, Power BI, KPI dashboards, client-facing reporting to non-technical senior stakeholders, clear written documentation for distributed teams
## Experience
### Data Analyst, PI Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

Independently manage analytics engagements across 5 enterprise clients for this data and analytics consulting firm (Australia and New Zealand), owning each account's SQL/Python analysis, data pipeline, and stakeholder reporting end to end.

**Pricing analytics, multi-venue restaurant group (AU/NZ)**
- Problem: the client's category spend was leaking margin across roughly 3,000 products and multiple venues with no visibility into where.
- Approach: owned the account as the sole analyst, built the product catalog from scratch, then a pricing-decision dashboard tracking price movement at the product, venue, and supplier level using direct SQL/Python analysis, and presented findings in recurring meetings with the Chief Procurement Officer and category managers.
- Result: surfaced roughly A$2M (about 30%) in identifiable savings in the client's largest spend category over a year.

**Spend classification and Pareto-driven pipeline, enterprise client (approximately A$12B spend, 5 years)**
- Problem: only about 60 to 65% of a five-year, roughly A$12B spend dataset was reliably categorised.
- Approach: led the build of a one-vs-all classification pipeline (scikit-learn, TF-IDF plus engineered features on spend value and line count), tuned with cross-validation and explicit class-imbalance handling, paired with a Pareto approach where I manually reviewed the high-value head of spend and let the model classify the long tail.
- Result: cut a categorisation cycle from roughly six weeks of manual account-manager work to about a single day's model run; the pipeline is now the standard being rolled out across other client accounts.

**Multi-source pipeline ownership, largest client account (global, 5 regions / 13 sub-regions)**
- Problem: the firm's highest-billing client account ran on a manual upload process, costing roughly 4 to 5 hours of manual checking every week with no single connected pipeline.
- Approach: pulled and joined the data myself without waiting on a separate engineering team, replacing the manual process with automated email-based ingestion (Microsoft Graph API into a remote SQL Server batch process), standardised the intake format across all 13 sub-regions, and built automated validation to catch stray columns and discrepancies before they reached the client.
- Result: cut weekly processing from 4 to 5 hours down to about 75 minutes (roughly 3 to 3.5 hours saved weekly) on the firm's highest-billing account.

**Internal (own firm, not client-facing): agentic AI and automation**
- Built and orchestrate agentic AI/LLM workflows (Claude, ChatGPT) that speed up analytics-script development, run automated multi-agent QA validation on datasets before client delivery, and auto-generate client progress reports, saving the wider analyst team roughly 12 to 15 hours weekly across the firm's client accounts.
- Built a call-transcript sentiment and quality analyzer that took 1st place in an internal AI hackathon and was later adopted into the company's workflow.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline (Databricks, PySpark), improving detection accuracy by roughly 20%.
- Deployed a Power BI analytics solution adopted by senior Department of Transport stakeholders and presented findings to cross-functional audiences.
## Projects
### Inventory-demand forecasting, fresh-produce client (Python, Prophet)
- Client engagement (PI Data Analytics): built a Prophet time-series model forecasting raw-material and chemical inventory roughly 3 months ahead, engineering external price-driver features (including sea-freight trends) for internationally sourced chemicals, delivered on a client dashboard.
- Delivery/impact: forecast landed within a 12.5 to 14% error margin, comfortably inside the client's tolerance, giving them a real forward planning window.

### Facit (myfacit.com), profitability SaaS for independent cafes (personal, forecasting + BI)
- Personal build, not client/employer work: a multi-tenant product giving cafe owners a weekly profitability view, unifying POS, wages, and supplier invoice data into a single "pulse" (revenue, wage cost %, food cost %, gross margin) with one recommended action.
- Includes revenue forecasting and supplier price-creep detection, designed around a real, non-technical operator (Neighbours Cafe, Melbourne, as design partner) and messy real-world data.
- Delivery/impact: live and in active weekly use with the design-partner cafe; turns unintegrated operational data into a Monday-morning decision.

### Job Hunt OS, agentic career-search system (personal, Claude Code, Python)
- Personal build: a file-based, multi-agent system (orchestrator plus resume, outreach, and career-coach specialist agents) that tailors resumes to a JD, drafts cover letters, and runs a two-track networking CRM, all without paid APIs.
- Delivery/impact: demonstrates end-to-end agentic AI orchestration and system design over a plain-file data model, applied to a real, ongoing job search.
## Education
### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Statistics I/II, Machine Learning, Communicating with Data, Applied Forecasting, High Dimensional Analysis, Supply Chain Management, Web App Development.
### Bachelor of Engineering, Thapar University | May 2017 to May 2021
Statistics, C, C++, Analog & Digital Electronics, Mathematics I/II/III.

## Keyword Alignment

**Match rate: roughly 60% of core JD requirements directly matched; most of the remainder are genuinely adjacent rather than absent.**

**Matched (in both resume and JD):**
- SQL (complex joins, window functions, CTEs) across large datasets, no reliance on pre-built dashboards
- Python (pandas, numpy, scikit-learn) for data manipulation, statistical analysis, and automation
- Independently connecting to and pulling from multiple data sources (APIs, SQL Server, email ingestion, flat files) without engineering support
- Cloud data warehousing (Snowflake, AWS S3/Athena/Glue, Azure); BigQuery/GCP familiarity noted honestly as "familiar," not deep hands-on
- Segment, venue, and supplier-level analysis to find non-obvious drivers (direct analogue to segment/device/source-level digital analytics)
- Orchestrating agentic AI workflows on an SQL/Python foundation
- Dashboarding tools (Tableau, Power BI) as an analogue to Looker/Tableau
- Sharp analytical communication distilling complex findings for non-technical senior stakeholders

**Missing but applicable (added where truthful):**
- "Proactive, chasing root causes" and structured, prioritised analysis work: reflected via the Pareto-driven classification approach and anomaly detection, not claimed as literal experimentation

**Not applicable (genuine gaps, not fabricated):**
- Direct A/B testing experience (hypothesis design through sample sizing, significance thresholds): no hands-on A/B test ownership on the resume; the statistical rigor (cross-validation, class-imbalance handling, forecast-error validation) is real and transferable but is not the same discipline, and I have not implied otherwise
- GA4 event tracking and custom explorations: not present in Dhruv's experience
- Ad-platform integration (Google Ads, Meta) tied to on-site analytics: not present
- Shopify: not present
- Session replay / heatmap tools (FullStory, Hotjar): not present

## Top 3 Recommendations
1. Before interviewing, do a focused pass on A/B testing fundamentals (sample size/power calculations, significance thresholds, common pitfalls like peeking and novelty effects) so the genuinely strong SQL/Python/stats base has a concrete experimentation vocabulary to sit alongside it.
2. If there's time before applying, a small personal project running and analysing even a toy A/B test (even on the Facit or Job Hunt OS project) would convert the "adjacent statistical rigor" story into a literal one.
3. In the interview, lead with the restaurant-client and spend-classification stories (independent ownership, hands-on SQL/Python, hypothesis-driven analysis, non-technical stakeholder delivery) rather than the ETL/engineering framing, since that is the exact archetype this JD is filtering for.
