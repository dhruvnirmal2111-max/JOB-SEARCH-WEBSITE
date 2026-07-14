# Dhruv Nirmal

Melbourne, Australia | dhruvnirmal2111@gmail.com | +61 406 259 619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

## Professional Summary

I'm a data scientist who builds pricing, forecasting and ML models that feed real commercial decisions, and works with stakeholders to make sure they land. I've built a pricing analysis that helped a client find around **A$2M** in savings, Prophet forecasting models, and an ML classifier over roughly **A$12B** of spend. I work mainly in Python (pandas, numpy, scikit-learn) and SQL, and have used Databricks and PySpark for large-scale data.

## Key Skills

**ML & Statistical Modelling:** scikit-learn, classification (logistic regression, TF-IDF and embeddings), Prophet time-series forecasting, anomaly detection, feature engineering, cross-validation, hyperparameter tuning, class-imbalance handling
**Python & Data:** Python, pandas, numpy, scikit-learn, SQL, PySpark, Databricks, Snowflake, large and complex datasets
**Pricing & Commercial Analytics:** pricing strategy, price-movement and cost analysis, sales and market data, demand forecasting, stakeholder communication
**Visualisation:** Tableau, Power BI, dashboard design

## Experience

### Data Scientist, Purchasing Index Data Analytics (Comprara Group)
Jun 2024 to Present | Melbourne, Australia

A data and analytics consultancy. I own client engagements end to end: framing the problem, building the model, and presenting the results to commercial stakeholders. Selected engagements:

**Pricing and cost analytics — multi-venue restaurant group (AU/NZ)**
- Problem: the client felt their supply costs were too high but couldn't see where the money was leaking.
- Approach: owned the account and built a product catalogue of roughly 3,000 to 3,500 items, then a pricing-decision dashboard tracking price movement and cost leakage by product, venue and supplier, using Python (pandas, numpy) and SQL; presented findings to the CFO and category managers.
- Result: helped them identify close to 30% savings, roughly **A$2M** over a year, in their largest category, used directly in supplier negotiations.

**ML spend classification — enterprise procurement client (~A$12B spend)**
- Problem: categorising the client's five-year, roughly **A$12B** spend book was manual and took an account manager over a month per cycle.
- Approach: led the company's first ML classifier to automate it, a one-vs-all model that keeps high-value spend on manual review and models the long tail. Built in scikit-learn with text features from the transaction descriptions (originally TF-IDF, now moving to embeddings for better semantic matching), LogisticRegression with class weights for the heavy imbalance, and GridSearchCV with cross-validation for tuning; pandas and numpy for feature engineering.
- Validation: evaluated on precision, recall and F1 rather than accuracy, given the heavy class imbalance across categories.
- Result: cut the cycle from over a month to a single day's model run, and documented the pipeline for reuse across clients.

**Demand forecasting — fresh-produce and agricultural client**
- Problem: the client needed to plan raw-material and chemical inventory three months ahead.
- Approach: built a Prophet time-series model with external regressors such as sea-freight trends and input prices, prepared the data with pandas, and backtested on held-out periods; delivered through a planning dashboard.
- Result: forecasts within a 12.5 to 14% error margin, comfortably inside the client's tolerance.

**Reporting automation — internal, my own firm**
- Problem: our analysts were each spending 12 to 15 hours a week hand-assembling client progress reports.
- Approach: built an internal LLM-based workflow that generates them from our analytics outputs, with a QA step that checks the output before it goes out.
- Result: adopted across the whole analyst team (around 25 to 30 accounts), saving roughly 12 to 15 hours a week.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Problem: government procurement data was too large to screen on a single machine.
- Approach: built a distributed anomaly-detection pipeline in Databricks with PySpark, engineering scalable transformation layers, and delivered the findings through a Power BI solution.
- Result: detection accuracy improved by about 20%; the Power BI solution was adopted by senior Department of Transport stakeholders.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL, DRDO)
Jan 2021 to Jul 2021 | India

- Built statistical models with Butterworth signal filtering to predict blast-wave noise levels, improving prediction accuracy by about 20%, and compiled the findings into a technical report.

## Projects

### [MyFacit](https://www.myfacit.com): Analytics and Decision-Support SaaS for Hospitality
- Centralised analytics platform integrating 8+ data sources with dashboards, short-term forecasting and pricing and product-mix insights; in pilot with a local business and in active use.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021
