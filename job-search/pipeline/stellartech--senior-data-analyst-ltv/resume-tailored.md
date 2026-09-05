# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

I build and validate forecasting and predictive models that a business actually uses to make decisions, and I dig into the underlying factors until I can explain why a model moves, not just what it predicts. I built a Prophet demand-forecasting model with external regressors that held within a 12.5 to 14% error margin against actuals, and I led a logistic-regression classifier over roughly **A$12B** of client spend; both started as a vague question, moved through SQL and Python prototyping and validation on held-out data, and ended in a recommendation senior stakeholders acted on. I also design and own MyFacit, a live subscription-style product for independent cafes, where I define the unit economics it tracks (revenue, cost, margin) and turn a weekly number into the one decision an owner should make next. That is the closest experience I have to owning a metric end to end for a product, and it is the same discipline behind owning and evolving StellarTech's LTV prediction algorithm: build a forecast, validate it against reality, and work out what is actually driving it.

## Key Skills

**Forecasting & Predictive Modelling:** Prophet time-series forecasting, external-regressor and feature engineering, backtesting against held-out data, error-margin validation, factor analysis
**Statistics & Model Validation:** classification modelling (logistic regression, TF-IDF and embeddings), GridSearchCV, cross-validation, class-imbalance handling, precision/recall/F1, hypothesis-driven analysis
**SQL & Data:** SQL (complex queries, prototyping at scale, large datasets), Python (pandas, numpy, scikit-learn), Snowflake, AWS S3
**Product & Unit Economics:** unit economics (revenue, cost, margin, payback thinking), owning product metrics end to end, pricing and cost analysis, menu engineering
**Visualisation & Stakeholder Communication:** Tableau, Power BI, dashboard design, presenting to technical and senior business stakeholders

## Experience

### Data Analyst, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consulting firm serving enterprise clients across Australia and New Zealand. I own analytical engagements end to end: framing the question, building and validating the model, and presenting the finding to business stakeholders. Selected engagements:

**Demand forecasting and model validation, fresh produce and agricultural client**
- Problem: the client needed a rolling three-month view of raw-material and chemical inventory to plan ordering, including items sourced internationally and exposed to freight-cost swings.
- Approach: built a Prophet time-series forecasting model, engineered external regressor features (sea-freight trends, input pricing) in Python, prototyped the underlying query logic in SQL, and backtested the forecast against actual usage on held-out periods before handing it to a planning dashboard.
- Result: held within a 12.5 to 14% error margin against actuals, comfortably inside the client's tolerance; the client used it to plan ordering three months ahead.

**ML classification and factor analysis, enterprise procurement client (~A$12B spend)**
- Problem: only 60 to 65% of a five-year, roughly A$12B spend book was reliably categorised, and the manual process took an account manager over a month per cycle.
- Approach: led the company's first ML classifier for this problem, a one-vs-all logistic regression per category built in scikit-learn. Engineered features on top of TF-IDF and embeddings text signals (spend value, line count) to isolate what actually distinguished a category, tuned via GridSearchCV and cross-validation, and explicitly handled the class imbalance across categories.
- Validation/Result: evaluated on precision, recall and F1 given the imbalance rather than raw accuracy; cut the cycle to a single day's model run and documented the pipeline, now rolled out across the wider client base.

**Pricing and procurement analytics, multi-venue restaurant group (AU/NZ)**
- Problem: the client felt supply costs were too high but had no product-level view of where the money was leaking.
- Approach: owned the account solo as the sole analyst. Structured a product catalog of roughly 3,000 items in SQL, built a pricing-decision dashboard tracking price movement and cost leakage by product, venue and supplier, and ran the client relationship directly through bi-weekly and monthly stakeholder meetings.
- Result: presented findings to the Chief Procurement Officer and category managers; helped the client identify close to 30% savings, roughly **A$2M**, in their largest category over a year.

Also own the end-to-end SQL pipeline and data-validation logic for the firm's largest client account (roughly 6M invoice rows across 5 global regions, with 500 to 600k rows refreshed weekly), including automated checks that catch discrepancies before they reach a report and coordination with the firm's own data engineering team on the underlying refresh logic.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Built a distributed anomaly-detection pipeline (Databricks, PySpark) on government procurement data, improving detection accuracy by about 20%, and delivered the findings through a Power BI solution adopted by senior Department of Transport stakeholders.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL), DRDO
Jan 2021 to Jul 2021

- Built statistical models to predict blast-wave noise levels, improving prediction accuracy by about 20%, and compiled findings into a structured report used to refine defence equipment design.

## Projects

### [MyFacit](https://www.myfacit.com): a multi-tenant profitability product I built and own, for independent cafes
- Designed and shipped the product end to end: defined the unit economics it tracks (revenue, wage cost %, food cost %, gross margin) and built the data model that unifies point-of-sale, wages and 14 suppliers' invoices into one weekly view.
- Turned that data into a weekly decision the owner acts on: a "pulse" combining revenue forecasting, menu engineering (which items actually carry the margin), supplier price-creep detection, and one recommended action for the week ahead, rather than a static report.
- In active use with a design-partner cafe (Neighbours Cafe, St Kilda), iterating the product from real operating data through weekly reviews. My closest analog to owning the prediction logic and unit economics for a live, subscription-style product.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
Coursework: Statistics I/II, Machine Learning, Applied Forecasting, Communicating with Data, High Dimensional Analysis.

### Bachelor of Engineering, Thapar University | May 2017 to May 2021

## Keyword Alignment

**Match rate: roughly 65% of critical JD keywords matched or genuinely applicable; the two biggest gaps (seniority and product domain) are named below rather than hidden.**

**Matched (in both resume and JD):**
SQL as the main prototyping instrument (complex queries at scale, used to prototype the classifier features and the forecast logic), building and validating a forecast, judging model quality via a validated error margin against actuals, factor analysis (isolating what distinguishes a spend category; identifying external drivers of demand), the end-to-end pattern of a vague question through to a documented recommendation for senior stakeholders, back-conclusions-with-data and communicate to technical and business audiences, Python (pandas, numpy, scikit-learn), feature engineering, unit economics thinking (via MyFacit and the pricing engagement).

**Missing but applicable (owner has the underlying capability, added truthfully):**
- MAE/RMSE/MAPE/R2 by name: not confirmed as computed under those specific names; the genuine equivalent is the Prophet forecast validated by backtesting to a 12.5 to 14% error margin, and the classifier validated on precision/recall/F1. Kept the language to what was actually measured rather than naming metrics not confirmed.
- Window functions specifically: not confirmed by name; SQL is described as "complex queries, prototyping at scale" rather than claiming a specific SQL feature not verified.
- A/B testing and hypothesis testing: no formal A/B program run; the honest proxy is cross-validation, held-out backtesting and hypothesis-driven investigation, named as such rather than as A/B testing.
- Cloud DWH / large data volumes: AWS S3 and Snowflake are genuine; Amazon Athena, BigQuery and Redshift specifically are not used, so kept to what was actually used.

**Not applicable (genuine gaps, not fabricated):**
- 4+ years as a Data Analyst / Senior Data Analyst / Product Analyst: the owner has roughly 2 years full-time in this kind of analytical work plus a 2023 internship, not 4+ years. This is named honestly rather than inflated; the resume leads with depth of capability (forecasting, model validation, end-to-end ownership) rather than years, and the current-role title is shown as the generic "Data Analyst" rather than "Senior."
- In-app monetization product economics (LTV, cohorts, retention, ROI, CAC, ARPU, payback on a mobile subscription app): this is a critical requirement the owner does not have. His domain is B2B procurement consulting plus MyFacit, a cafe profitability SaaS, not a mobile app. MyFacit's unit-economics discipline (revenue, cost, margin, weekly forecasting, a recurring decision cycle) is a genuine and honest parallel to subscription unit economics, and is presented as such, but no mobile-app LTV, CAC, ARPU or cohort-retention experience is claimed.
- CatBoost, SHAP, Amazon Athena specifically: not used. The owner's model work is scikit-learn (logistic regression) and Prophet, with AWS S3 as the adjacent (not equivalent) cloud data-warehouse experience. Not claimed.

**Top 3 Recommendations:**
1. Open the conversation with the Prophet forecasting engagement as the direct analogue to owning the LTV algorithm: a live forecast, validated against actuals, with a named error margin. This is the strongest single proof point and should anchor the interview, not a resume line buried under other work.
2. Be upfront early about the two genuine gaps rather than letting them surface as a surprise: name the ~2 years of full-time analytical depth (not 4+) and the absence of mobile in-app monetization experience, then pivot immediately to why the underlying discipline (unit economics via MyFacit, forecast validation via Prophet, factor analysis via the A$12B classifier) transfers directly to LTV work on a subscription app.
3. If asked about MAE/RMSE/MAPE/R2, CatBoost, SHAP or Athena by name, answer honestly that the equivalent tools used were error-margin backtesting, precision/recall/F1, scikit-learn and AWS S3, and that picking up the named tool or metric has not been a blocker in past engagements.
