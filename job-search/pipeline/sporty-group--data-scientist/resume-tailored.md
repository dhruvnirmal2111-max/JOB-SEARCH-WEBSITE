# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61406259619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary
I build machine learning models that are judged by whether they move a real business number, not just whether they run cleanly. My clearest proof is a one-vs-all classification model, built in scikit-learn with TF-IDF and embeddings, LogisticRegression and GridSearchCV, that took a client's **A$12B**, five-year spend categorisation from a month-long manual cycle down to a single day's automated run; separately, Prophet forecasting and pricing analysis helped another client find roughly **A$2M** in savings. That work sits on a Master of Data Science built around statistics, machine learning and high-dimensional data analysis, and on daily use of Python's quantitative stack (pandas, numpy, scikit-learn) and SQL against relational data. I also treat AI tools and agents as a normal part of how I build, not an occasional aid: I have designed multi-agent workflows for data QA and client report generation now used company-wide, and built my own agentic systems from scratch. On a fully remote team I default to clear written updates and documentation so decisions and handovers do not depend on being in the same room, and I would bring that same habit, along with a real appetite for applying statistics and ML where they move a number, to the Data Scientist role at Sporty Group.

## Key Skills
**ML & Statistics:** scikit-learn (TfidfVectorizer, LogisticRegression, GridSearchCV), classification, Prophet time-series forecasting, feature engineering, class-imbalance handling, cross-validation, anomaly detection, probability & statistics, linear algebra, NLP/embeddings
**Python & Data:** Python, pandas, numpy, SQL, relational databases, PySpark, Databricks, Snowflake
**AI Tools & Agentic Systems:** Claude, ChatGPT, multi-agent orchestration, agentic workflow design, prompt engineering, AI-output evaluation/QA, daily AI-assisted development
**Cloud & Infrastructure:** AWS (S3, Lambda, IAM, EC2), Azure, Docker, Terraform
**Visualisation & Communication:** Tableau, Power BI, data storytelling, stakeholder presentation

## Experience
### Data Scientist, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy. I own client engagements end to end: framing the problem, building the model, and presenting results to commercial stakeholders. Selected engagements:

**ML spend classification: enterprise procurement client (~A$12B spend)**
- Problem: categorising the client's five-year, roughly A$12B spend book was manual and took an account manager over a month per cycle, with only 60 to 65% reliably categorised.
- Approach: led the company's first ML classifier for this problem, a one-vs-all model that keeps the high-value head of spend on manual review and models the long tail automatically. Built in scikit-learn using text features from transaction descriptions (originally TF-IDF, now moving to embeddings), plus engineered features such as spend value and line count; LogisticRegression with class-imbalance handling, GridSearchCV and cross-validation for tuning.
- Validation: evaluated on precision, recall and F1 rather than raw accuracy, given the heavy class imbalance across categories.
- Result: cut the categorisation cycle from over a month to a single day's model run, and documented the pipeline for reuse across the wider client base.

**Demand forecasting: fresh-produce and agricultural client**
- Problem: the client needed to plan raw-material and chemical inventory three months ahead, including chemicals sourced internationally.
- Approach: built a Prophet time-series forecasting model, incorporating external drivers such as sea-freight trends and input prices; prepared and engineered features with pandas, and delivered the output through a planning dashboard.
- Result: forecasts within a 12.5 to 14% error margin, comfortably inside the client's accepted tolerance.

**Pricing and cost analytics: multi-venue restaurant group (AU/NZ)**
- Problem: the client felt supply costs were too high but could not see where the money was leaking.
- Approach: owned the account solo, built a product catalogue of roughly 3,000 items, then a pricing-decision dashboard tracking price movement and cost leakage by product, venue and supplier (Python, SQL, statistical analysis); presented findings directly to the Chief Procurement Officer and category managers.
- Result: helped the client identify close to 30% savings, roughly A$2M over a year, in their largest category.

**AI tools and agentic workflows: internal, my own firm**
- Use AI tools and agents daily as part of my own development workflow, not only as a productivity aid.
- Designed a five-agent QA validation workflow (Claude, Python) that checks client datasets for issues before delivery.
- Built the agentic report-generation workflow that turns analytics outputs into structured client progress reports; rolled out company-wide across the analyst team, saving roughly 12 to 15 hours a week across the firm.
- Also placed first in an internal AI hackathon with a call-transcript sentiment and quality analyzer, later adopted into the team's workflow.

**Data pipelines and reporting: 5 enterprise clients**
- Manage 20+ automated ETL pipelines (Python, SQL) processing millions of procurement transactions monthly, and maintain 16+ Tableau dashboards used daily by procurement and finance stakeholders.
- Applied statistical anomaly detection across procurement datasets, flagging cost-leakage patterns that contributed to roughly 15% savings for one client.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia
- Built a distributed anomaly-detection pipeline in Databricks using PySpark, engineering scalable transformation layers to process government procurement data, improving detection accuracy by about 20%.
- Delivered a Power BI analytics solution adopted by senior Department of Transport stakeholders, presenting model outcomes and system architecture to a cross-functional, non-technical audience.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL), DRDO
Jan 2021 to Jul 2021
- Applied statistical modelling and signal filtering (Butterworth filter) to blast-wave data to predict noise levels, improving prediction accuracy by about 20%, and compiled findings into a 70-page technical report.

## Projects
### Job Hunt OS, agentic AI career-search system (Claude Code, multi-agent orchestration, Python)
- Designed and built a multi-agent system, an orchestrator plus specialist agents for resume tailoring, outreach and career coaching, that runs natively on Claude Code with no paid APIs, tailors resumes and cover letters to a job description, and produces ATS-ready two-page PDFs end to end.

### [Facit](https://www.myfacit.com), profitability analytics SaaS for independent cafes (Python, forecasting, BI)
- Built and own a multi-tenant product that unifies POS transactions, staff wages and 14 suppliers' invoices into one weekly profitability view (revenue, wage cost %, food cost %, gross margin), with revenue forecasting, menu engineering and supplier price-creep detection.
- Live in day-to-day use with a design-partner cafe (Neighbours Cafe, St Kilda); I define the metrics it tracks and make the product decisions myself, weekly, based on real usage.

## Education
### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Coursework: Statistics I & II, Machine Learning, High-Dimensional Data Analysis, Applied Forecasting, Communicating with Data.
### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate:** all 8 of the 8 "what you'll bring" essentials are genuine, direct matches (100%). The genuine gap sits one level up, in the "what you'll be doing" responsibilities (recommendation systems, search ranking, content-intelligence ML specifically), and in the "even better if" list, 3 of 4 are matched. Counting all 14 named JD capabilities together (8 bring + 2 responsibilities + 4 even-better-if), 11 of 14 match, about 79%.

**Matched, "what you'll bring" (8 of 8):** hands-on statistical/ML modelling applied to real business problems with measurable impact (A$12B classifier, A$2M pricing analysis, Prophet forecasting); advanced Python plus the quantitative-analysis ecosystem (pandas, numpy, scikit-learn); strong probability, statistics, ML and linear-algebra foundation (Master of Data Science: Statistics I/II, ML, High-Dimensional Analysis); 2+ years as a data professional (meets the bar cleanly: ~2 years full-time plus a 2023 internship and an ongoing founder project); SQL and relational databases; a quantitative degree (Master of Data Science, Bachelor of Engineering); project and stakeholder management (owned client accounts, presented to a Chief Procurement Officer and category managers).

**Matched, "even better if" (3 of 4):** Apache Spark, via PySpark on the VCDI internship's distributed pipeline; cloud platforms, genuinely hands-on with AWS and Azure (GCP not used, named below); a solid CS background (Bachelor of Engineering plus Master of Data Science).

**Standout match, worth flagging explicitly:** "proficient with AI tools and agents as part of daily development workflow" is a rare, exact match. I use AI tools and agents daily and have built multi-agent systems in production, a five-agent data QA validation workflow and a company-wide agentic report-generation workflow at work, plus this Job Hunt OS on Claude Code, not just occasional AI-assisted coding.

**Honest gaps and adjacencies (named, not papered over):**
- **Recommendation systems, search ranking, content-intelligence ML (from "what you'll be doing"):** I have not built these specifically. My shipped ML is classification (the A$12B spend classifier) and time-series forecasting (Prophet), not a recommender or ranking system. The underlying skills transfer, feature engineering, handling class imbalance, evaluating with precision/recall/F1, working with text-derived features, but I am not claiming reco/search/ranking experience I don't have.
- **Large-scale online ML serving:** the A$12B classifier was operationalised and cut a month-long manual cycle to a single day's run, but that is a scheduled batch pipeline, not large-scale online model serving. Named honestly rather than implied.
- **GCP:** not used. AWS and Azure are genuine, hands-on tools; GCP is not.
- **Gaming industry (from "even better if"):** genuinely new to me. Listed as beneficial, not required, and no gaming experience is claimed anywhere in this resume.

**Top 3 recommendations:**
1. In the take-home or interview, lead with the classifier and forecasting work as proof of applied ML with measurable impact, and be direct that recommendation/search-ranking systems specifically have not been built; frame the classification and feature-engineering methodology as the transferable core.
2. Use the AI-tools-and-agents standout as a genuine differentiator, most DS candidates cannot show a production multi-agent system they built themselves; be ready to walk through the QA-agent and report-generation-agent designs in technical depth.
3. A short pre-interview look at GCP's core services (versus the AWS/Azure equivalents already used) would close the one clearly named tooling gap at low cost.
