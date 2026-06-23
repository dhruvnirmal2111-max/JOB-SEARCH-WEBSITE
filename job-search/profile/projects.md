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

### P3. Pricing-decision dashboard & cost-leakage detection (major ANZ restaurant chain) `#bi #dashboards #anomaly #pricing #statistics #python`
- **Skills/tech:** Python, statistical analysis, price-movement / anomaly detection, BI dashboards.
- **What I did:** Built a pricing-decision dashboard for one of the largest restaurant chains in Australia & New Zealand (250+ outlets), tracking how prices moved across product categories to surface cost-leakage and anomalous price movements. Framed ambiguous client spend concerns as a hypothesis-driven investigation.
- **Delivery/impact:** Contributed to ~15% client savings.

### P4. Multi-agent data QA validation workflow `#ai #agents #dataquality`
- **Skills/tech:** Claude, multi-agent orchestration (5 agents + orchestrator), Python.
- **What I did:** Built an agentic QA workflow to validate client datasets prior to delivery.
- **Delivery/impact:** Caught data issues before they reached clients; raised delivery quality/consistency.

### P5. Agentic client-report generation `#ai #agents #llm #automation #stakeholders`
- **Skills/tech:** Claude, prompt/agent design, Python.
- **What I did:** Built the agentic AI workflow that auto-generates structured client progress reports from analytics outputs and prepares them for sending. Rolled out company-wide and adopted by the entire analyst team (each analyst handles ~3–4 client accounts), replacing the manual, per-client report-assembly process.
- **Delivery/impact:** Saves ~30 minutes per client per reporting cycle; across ~25–30 client accounts company-wide, ~12–15 hours saved every week. Consistent, standardised client-facing deliverables across the whole team.

### P6. Transaction-description classifier `#ml #nlp #python`
- **Skills/tech:** scikit-learn, TF-IDF / embeddings, Logistic Regression, Python.
- **What I did:** Built a binary classification model to categorise transaction descriptions (built with TF-IDF and also with embeddings + Logistic Regression — both phrasings are truthful for this work).
- **Delivery/impact:** Cut manual categorisation effort ~40%; improved data standardisation for downstream analytics.

### P7. Chemical-consumption prediction model `#ml #forecasting`
- **Skills/tech:** scikit-learn, forecasting models, Python.
- **What I did:** Built an ML model to predict chemical consumption for industrial clients.
- **Delivery/impact:** Improved production planning and inventory management.

### P8. LLM sentiment analysis on sales calls `#ai #nlp #llm`
- **Skills/tech:** LLM workflows, Python.
- **What I did:** Implemented an LLM-driven sentiment-analysis workflow on sales-call transcripts.
- **Delivery/impact:** Surfaced customer-sentiment trends to inform the business.

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

### P16. Cafe SaaS — analytics & decision-support platform for a small hospitality business `#personal #saas #ai #analytics #forecasting #bi`
- **Skills/tech:** Data integration (8+ sources), AI-driven automation, forecasting, benchmarking, BI/insight generation.
- **What I did:** Designed and built a centralised analytics platform for a small (cafe / hospitality) business, integrating 8+ data sources. Built AI-driven workflows to automate data processing, reporting, and insight generation; added forecasting for short-term operational planning; surfaced actionable insights for pricing, product mix, and operational efficiency; benchmarked performance against external indicators for business-health monitoring.
- **Delivery/impact:** Scalable automated solution that significantly reduced manual effort and is in ongoing use.
- _Want the tech stack named (frontend/backend/DB/hosting) and a user/status line? Send it and I'll add it._

---

## Skills index (auto-reference for tailoring)
- **Languages:** Python, SQL, (learning: R), C/C++ (academic), MATLAB.
- **ML/AI:** scikit-learn, TF-IDF, **embeddings**, Logistic Regression, forecasting, **clustering**, anomaly detection, LLM/agentic workflows (Claude, ChatGPT), **agentic systems**, multi-agent orchestration, **prompt engineering**, **AI-output evaluation/QA**, NLP/sentiment.
- **Data eng:** ETL pipeline design, PySpark, Databricks, KNIME, batch automation, data modelling/cleaning, feature engineering, Snowflake, **multi-source data integration**.
- **Cloud/IaC:** AWS (S3, EC2, IAM, Lambda, **Glue, Athena**), Azure (incl. **Microsoft Graph API** for automated email ingestion), **GCP (familiar)**, Databricks, Terraform, Docker.
- **BI/viz:** Tableau, Power BI, data storytelling, KPI analytics.
- **Tools & practices:** Git / version control, documentation, KNIME, Claude Code / MCP.
- **Consulting:** client-facing delivery, problem framing, stakeholder communication, QA/documentation.
