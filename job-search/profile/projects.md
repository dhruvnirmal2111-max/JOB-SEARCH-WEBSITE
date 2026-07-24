# Master Projects & Delivery Library — Dhruv Nirmal

> The reusable bank the resume agent draws from. Each entry = what it was, the skills/tech used, what I did, and the delivery/impact.
>
> **Two buckets — keep them separate (never mix):**
> - **Professional** — actual client / employer work (paid, for an organisation or a client).
> - **Personal** — my own builds (cafe SaaS, this Job Hunt OS, portfolio projects).
>
> The resume agent may draw from both but must label them honestly — personal projects are never presented as client/employer work.
>
> **Maintenance:** keep impact numbers truthful and specific. Tag each project so the resume agent can match it to a JD (e.g. `#ml #ai #etl #bi #cloud #anomaly`).

---

# PROFESSIONAL — client & employer work

## Current role — Purchasing Index Data Analytics (Comprara Group), Data Engineer (Jun 2024 – present)
Client-facing analytics consulting; supplier/transaction datasets for enterprise clients across AU & NZ.

### P1. Enterprise ETL pipeline platform `#etl #cloud #python #sql`
- **Skills/tech:** Python, SQL, batch scripting, Azure-hosted servers, Windows Task Scheduler.
- **What I did:** Built and maintained 20+ automated ETL pipelines processing millions of procurement transactions monthly across 5 enterprise clients.
- **Delivery/impact:** Production-grade, reliable analytics pipelines; reduced manual reporting effort ~40% and improved reporting turnaround ~50%.

### P2. AI-accelerated client reporting workflows `#ai #automation #python #sql #llm`
- **Skills/tech:** Python, SQL, KNIME, Claude, ChatGPT.
- **What I did:** Automated client reporting/analytics workflows, integrating LLM tools (Claude, ChatGPT) to accelerate analytics-script development and speed up delivery.
- **Delivery/impact:** Faster delivery of reporting outputs; standardised, repeatable analytics process. (The company-wide progress-report generator built on this is captured in P5.)

### P3. Product catalog + pricing-decision & supplier dashboards (restaurant chain, AU & NZ) `#bi #dashboards #pricing #procurement #catalog #statistics #python #stakeholders`
- **Skills/tech:** Python, SQL, statistical analysis, price-movement tracking, product-catalog modelling, BI dashboards, client/stakeholder management.
- **What I did:** Multi-part project for a restaurant chain operating across Australia & New Zealand, which I **owned and ran end-to-end as the sole analyst on the account**. (1) **Built the product catalog** — structured up to ~3,000 products into a categorised catalog as the foundation. (2) **Pricing-decision dashboard** — tracks how prices move across products/categories so the client can negotiate better deals on their category mix: an overview level showing potential savings vs. money lost on bad deals, with drill-down to the detail level to pinpoint which products, venues and suppliers are driving the overspend. (3) **Supplier & item-onboarding dashboard** — shows how many suppliers were onboarded and how many new items were added for purchase each month, and flags where a better/cheaper substitute product is available from a supplier, guiding smarter ordering decisions. Ran the client relationship directly — bi-weekly/monthly progress meetings with senior stakeholders (Chief Procurement Officer, food category manager, category managers, general managers, and the client-side procurement team).
- **Delivery/impact:** Enabled the client to identify ~**30% savings (roughly A$2M) in one of their largest categories over a year** by surfacing price movement and cost leakage down to the product/venue/supplier level for better-negotiated supplier deals. _(A$2M is owner-confirmed; keep consistent across resumes.)_

### P4. Multi-agent data QA validation workflow `#ai #agents #dataquality`
- **Skills/tech:** Claude, multi-agent orchestration (5 agents + orchestrator), Python.
- **What I did:** Built an agentic QA workflow to validate client datasets prior to delivery.
- **Delivery/impact:** Caught data issues before they reached clients; raised delivery quality/consistency.

### P5. Agentic client-report generation `#ai #agents #llm #automation #stakeholders`
- **Skills/tech:** Claude, prompt/agent design, Python.
- **What I did:** Built the agentic AI workflow that auto-generates structured client progress reports from analytics outputs and prepares them for sending. Rolled out company-wide and adopted by the entire analyst team (each analyst handles ~3–4 client accounts), replacing the manual, per-client report-assembly process.
- **Delivery/impact:** Saves ~30 minutes per client per reporting cycle; across ~25–30 client accounts company-wide, ~12–15 hours saved every week. Consistent, standardised client-facing deliverables across the whole team.

### P6. ML spend-categorisation model + Pareto-driven process (client spend ~A$12B / 5 yrs) `#ml #nlp #python #classification #pareto #stakeholders`
- **Skills/tech:** Python, scikit-learn, TF-IDF / embeddings, Logistic Regression, one-vs-all (binary per category), feature engineering, hyperparameter tuning, class-imbalance handling, cross-validation.
- **What I did:** **Led this work** (the first time the company ran this approach for a client) to categorise a large client spend dataset — ~A$12B of spend across five years — where only ~**60–65%** was reliably categorised to begin with. Built a **one-vs-all binary classifier**: for each spend category, the model is trained with 1 = in-category and 0 = everything else. Did **feature engineering** on top of the text features — including spend value and line count — to strengthen the signal. Applied a **Pareto approach**: the high-value head of spend (low volume, but high signal) is reviewed and categorised **manually** for accuracy, while the **ML model — built/trained over ~5 months** — categorises the remaining long tail. Tuned via hyperparameter search, explicitly handled **class imbalance**, and validated with **cross-validation**. Documented the method into a repeatable **pipeline now being rolled out across the wider client base**; models are maintained and retrained as needed.
- **Delivery/impact:** Cut a categorisation cycle that took an account manager ~**1–1.5 months down to ~a single day's model run**; established a scalable, documented categorisation pipeline being adopted across clients.

### P7. Inventory-demand forecasting for a fresh-produce client (raw materials + chemicals) `#ml #forecasting #timeseries #prophet #inventory #dashboards`
- **Skills/tech:** Python, time-series forecasting (Prophet), feature engineering with external drivers, BI dashboard.
- **What I did:** Ad-hoc request for a fresh-produce client who has to order fertilisers, raw materials and chemicals to process their produce. Built a **time-series forecasting model (Prophet)** to forecast **~3 months ahead** the inventory levels they should hold — specifically **raw materials and chemicals** (not packaging). For chemicals sourced internationally, incorporated external price drivers — including **sea-freight trends over the prior couple of years** and other factors — into the forecast. Delivered the output to the client on a **dashboard**.
- **Delivery/impact:** Forecast inventory within a ~**12.5–14% error margin — comfortably below the client's accepted tolerance** — giving them a 3-month forward view to plan raw-material and chemical ordering. Delivered end-to-end as a one-off client request.

### P8. LLM call-transcript analyzer — AI hackathon win, adopted internally `#ai #nlp #llm #agents #automation`
- **Skills/tech:** LLM workflows, agent orchestration, Python, sentiment analysis, notification/automation pipeline.
- **What I did:** Built for an **internal company AI-themed hackathon, where it placed 1st** (won a $200 gift voucher). A **call/transcript analyzer** that scores each engagement on several metrics — call quality (how good/bad it went), whether expectations were met, and tone — essentially **sentiment analysis**. Wrapped it in a full **pipeline**: transcripts dropped into a source folder → an **agent orchestrates** the processing → it then sends **notifications to everyone involved internally** (e.g. the senior manager / director) and writes a **log of the engagement** with that client. Later **adopted into the company's workflow**.
- **Delivery/impact:** Automatically surfaced call sentiment/quality to the right stakeholders; demonstrated agentic orchestration; moved from a 1st-place hackathon build to an adopted, smoother internal process.

### P9. Automated presentation generation `#ai #automation #llm`
- **Skills/tech:** Claude, Python, PowerPoint automation.
- **What I did:** Built a workflow converting analytics outputs into PowerPoint decks.
- **Delivery/impact:** Eliminated manual deck-building for client outputs.

### P10. Tableau analytics dashboards `#bi #tableau`
- **Skills/tech:** Tableau, data storytelling, KPI analytics.
- **What I did:** Developed and maintained 16+ dashboards for procurement/finance teams.
- **Delivery/impact:** Enabled monitoring of supplier spend, KPI tracking, and cost-optimisation decisions by stakeholders.

### P17. AI-output evaluation & QA in analytics workflows `#ai #dataquality #llm`
- **Skills/tech:** Critical evaluation of LLM outputs, prompt refinement, QA process design.
- **What I did:** Evaluated and refined AI-generated outputs within client analytics workflows to ensure accuracy, consistency, and business relevance before delivery.
- **Delivery/impact:** Higher reliability of AI-assisted insights; a defensible "AI with judgement" practice (valued by AI-first employers).

### P18. Global multi-region spend-analytics platform (largest client account) `#etl #cloud #python #sql #automation #bi #dataquality #stakeholders`
- **Skills/tech:** SQL, Python, Microsoft Graph API (Azure), remote SQL Server batch scripting, KNIME (legacy process), rules-based spend-categorisation engine, BI dashboards.
- **What I did:** Own the end-to-end data pipeline for the company's largest client — spend data across 5 global regions / 13 sub-regions (~6M invoice rows plus PO, lookup and open-PO datasets; ~500–600k rows refreshed weekly). Replaced a manual KNIME upload process with fully automated email-based ingestion (Microsoft Graph API → remote SQL Server batch script). Coordinate stakeholders across all 13 regions and standardised file-submission + naming conventions so every region feeds one consistent intake. Built automated validation (row/hour counts, data-type and column-consistency checks) that drops stray columns, logs discrepancies, and emails client + internal teams for review. Downstream: vendor/spend lookups, multi-language data cleaning, ~11–12k-rule categorisation, and advanced spend analysis (rolling / 4-week spend windows, PO splitting) into dashboards. Now working with the client's IT + cybersecurity teams to consolidate into a single unified pipeline.
- **Delivery/impact:** Cut weekly processing from ~4–5 hours of manual upload-and-check to a ~75-min automated run (30-min ingestion + 45-min downstream) — **~3–3.5 hours saved weekly** — while removing manual number-checking and standardising delivery for the company's highest-billing client account.

### P19. Bill of Materials (BOM) for a fresh-produce client `#inventory #bom #sql #python #supplychain #reporting`
- **Skills/tech:** SQL, Python, data modelling, bill-of-materials / inventory logic, reporting.
- **What I did:** Built a **bill of materials** for a fresh-produce client — mapping each finished product to the raw materials and inputs required to produce it — to support inventory planning and ordering. (Same client family as the P7 raw-material/chemical forecasting work.)
- **Delivery/impact:** Gives the client a structured view of what inputs their outputs consume, underpinning inventory and purchasing decisions. _(No hard metrics captured.)_

### P20. Automated daily inventory report with par-level alerts (medical client) `#inventory #reporting #automation #alerts #sql #python #stakeholders`
- **Skills/tech:** SQL, Python, scheduled/automated refresh, inventory reporting, threshold-based alerting.
- **What I did:** Built an inventory report for a **medical client** that **auto-refreshes every morning**, so the team starts each day with current stock positions. Added **par-level alerts**: the report flags any item that has dropped **below a par level the client sets themselves**, prompting reorder before a stockout.
- **Delivery/impact:** **Used daily by the client to manage their inventory** — one of their core operational tools. Refresh is automatic each morning; the user-defined par-level alerts surface what needs action without manual checking. _(Only metric available: daily refresh + daily client use.)_

### P21. Automated weekly inventory report (medical client) `#inventory #reporting #automation #sql #python`
- **Skills/tech:** SQL, Python, scheduled/automated refresh, inventory reporting.
- **What I did:** Built a similar automated inventory report for **another medical client**, on a **weekly refresh** cadence, supporting their inventory management rhythm.
- **Delivery/impact:** Keeps the client's inventory view current on a weekly cycle without manual rebuilds. _(Only metric available: weekly refresh cadence.)_

### P22. Supplier tender evaluations (restaurant chain + fresh-produce client) `#procurement #tender #supplier-evaluation #sourcing #pricing #fooddrink #packaging #stakeholders`
- **Skills/tech:** Tender / RFP evaluation, supplier bid comparison, commercial and price analysis, category sourcing support.
- **What I did:** As part of the procurement analytics consultancy (my current role — this kind of procurement work is the firm's core business), evaluated supplier tenders to help clients decide which supplier to award:
  - **AU/NZ restaurant chain** (same client as P3): evaluated tenders for **chicken** supply and for **spirits** supply, comparing supplier bids on a like-for-like basis to support the client's sourcing decision.
  - **Fresh-produce client** (same client family as P7 / P19): evaluated tenders for **fruit** supply and for **packaging**.
- **Delivery/impact:** Gave clients a structured, comparable read of competing supplier tenders to inform the award decision across food, drink and packaging categories. _(Owner to confirm any savings/award outcomes; no hard figures captured yet.)_

### P23. Self-service pipeline-refresh app (company-wide, 26 client accounts) `#dataengineering #pipelines #automation #etl #python #sql #git #orchestration #documentation`
- **Skills/tech:** Python, SQL, Git / version control, ETL orchestration, full & incremental refresh, data validation, automated archiving, documentation, database cleaning.
- **What I did:** In charge of automating the data-refresh pipelines behind a **company-wide app** across all **26 client accounts**. Turned a manual, specialist refresh into a **one-click** operation, with separate buttons for **ingestion, validation, downstream processing, and full pipeline runs (both full refresh and incremental)**, plus **automatic archiving**. Maintain the pipeline **documentation** and keep the underlying **databases clean** so refreshes run reliably; version-controlled in Git. (In progress.)
- **Delivery/impact:** Makes a refresh a button press anyone on the team can run, standardised across all 26 accounts. **On track to save ~10 hours per person across the 6-person team, ~60 hours a month.** _(Projected design target while in progress; not yet a measured historical figure.)_

## Victorian Centre for Data Insights (VCDI), Data Engineer Intern (Aug 2023 – Nov 2023)
Government procurement monitoring; distributed data + ML.

### P11. Distributed anomaly-detection pipeline `#anomaly #spark #cloud`
- **Skills/tech:** Databricks, PySpark, cloud data processing.
- **What I did:** Built a distributed anomaly-detection pipeline; engineered scalable transformation layers.
- **Delivery/impact:** Improved detection accuracy ~20%.

### P12. Power BI solution for Dept of Transport `#bi #powerbi #stakeholders`
- **Skills/tech:** Power BI, stakeholder communication.
- **What I did:** Built and presented a Power BI analytics solution; communicated architecture + outcomes to cross-functional stakeholders.
- **Delivery/impact:** Adopted by senior Department of Transport stakeholders.

## Research — Terminal Ballistics Research Laboratory (TBRL, DRDO), Research Data Analyst (Jan 2021 – Jul 2021)

### P14. Blast-wave signal analysis `#statistics #signal #matlab`
- **Skills/tech:** Butterworth filtering, statistical modelling, MATLAB, Excel.
- **What I did:** Acquired, analysed and filtered noise from blast-wave data; predicted noise levels; compiled a 70-page report.
- **Delivery/impact:** Reduced noise ~20%; improved prediction accuracy ~20%; refined defence-equipment designs ~10%.

---

# PERSONAL PROJECTS — my own builds (not client work)

### P13. Cloud Data Platform with Terraform (portfolio) `#cloud #iac #snowflake`
- **Skills/tech:** AWS (S3, IAM, EC2, networking), Terraform (IaC), Snowflake, Docker, Power BI.
- **What I did:** Provisioned full cloud infrastructure as code; built an automated ingestion pipeline from external APIs to Snowflake; modular multi-environment design (dev/staging/prod).
- **Delivery/impact:** Reproducible, version-controlled environments; end-to-end ingestion-to-BI platform.

### P15. Job Hunt OS — agentic AI career-search system (this repo) `#ai #agents #llm #prompt-eng #automation`
- **Skills/tech:** Claude Code (agentic systems), multi-agent orchestration (orchestrator + resume / outreach / career-coach specialists), Python (reportlab, pdfplumber), Bash, Git, Google Calendar (MCP), file-based data modelling, prompt/agent design.
- **What I did:** Designed and built a single-user, file-based "Job Hunt OS" that runs natively on Claude Code with no paid APIs. It tailors ATS-friendly resumes to a JD and builds 2-page PDFs, drafts cover letters, runs two-track networking (reactive applications + a proactive relationship CRM), analyses resume↔JD skill gaps, and produces daily/weekly reports. Scheduled cloud routines scout roles and build application packages autonomously behind a human review gate; outreach reminders sync to Google Calendar via MCP.
- **Delivery/impact:** End-to-end automation of a real job search; demonstrates agentic AI, multi-agent orchestration, and system design over a plain-file data model.

### P16. [Facit](https://www.myfacit.com) — multi-tenant profitability SaaS for independent cafés `#personal #saas #ai #analytics #forecasting #bi #hospitality #menu-engineering #margin #pricing #cogs #stakeholders`
- **Site:** www.myfacit.com
- **One-liner:** A multi-tenant SaaS that gives independent café owners a single weekly view of profitability by unifying their POS, wages and supplier invoices, so they know every Monday whether last week made money, why, and what to fix.
- **Skills/tech:** Multi-source data integration (POS + payroll/wages + supplier invoices), multi-tenant SaaS architecture, AI-driven automation, revenue forecasting, menu engineering, supplier price-creep detection, BI/insight generation, designing for messy real-world data and a non-technical end user.
- **Origin / context:** Started as a **real consulting engagement with Dom, owner of Neighbours Cafe in St Kilda, Melbourne** — a ~6-year-old café with ~20 staff running a TapTouch POS and QuickBooks (unintegrated). Rather than a one-off dashboard, built it as a **white-labellable product**: Neighbours is the live case study / design partner, and every architectural decision was made to generalise to "any independent café with a POS". Working with a real operator meant designing around messy real-world data and a non-technical end user, not a clean spec. (Personal build / product — Neighbours is the design-partner client, not an employer engagement.)
- **What it does:**
  - Pulls POS transactions, staff wages, and **14 suppliers' invoices** into one unified model.
  - A weekly **"pulse"**: revenue, **wage cost %, food cost %, gross margin**, plus one recommended action for the week ahead.
  - **Revenue forecasting**, cost breakdowns (labour / food / fixed), **menu engineering**, and **supplier price-creep detection**.
- **Delivery/impact:** Scalable, automated, multi-tenant solution that significantly reduces manual effort; live with Neighbours Cafe as the design partner and in active day-to-day use, with weekly meetings to fix bugs and assess the industry-specific implications of embedding the tool in a real café. Turns unintegrated POS/payroll/supplier data into a Monday-morning profitability decision.
- _Want the tech stack named (frontend/backend/DB/hosting)? Send it and I'll add it._

---

## Skills index (auto-reference for tailoring)
- **Languages:** Python, SQL, (learning: R), C/C++ (academic), MATLAB.
- **ML/AI:** scikit-learn, TF-IDF, **embeddings**, Logistic Regression, forecasting, **clustering**, anomaly detection, LLM/agentic workflows (Claude, ChatGPT), **agentic systems**, multi-agent orchestration, **prompt engineering**, **AI-output evaluation/QA**, NLP/sentiment.
- **Data eng:** ETL pipeline design, PySpark, Databricks, KNIME, batch automation, data modelling/cleaning, feature engineering, Snowflake, **multi-source data integration**.
- **Cloud/IaC:** AWS (S3, EC2, IAM, Lambda, **Glue, Athena**), Azure (incl. **Microsoft Graph API** for automated email ingestion), **GCP (familiar)**, Databricks, Terraform, Docker.
- **BI/viz:** Tableau, Power BI, data storytelling, KPI analytics.
- **Tools & practices:** Git / version control, documentation, KNIME, Claude Code / MCP.
- **Consulting:** client-facing delivery, problem framing, stakeholder communication, QA/documentation.
