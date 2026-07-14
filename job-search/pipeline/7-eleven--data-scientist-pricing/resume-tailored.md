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
- The client felt their supply costs were too high but couldn't see where the money was leaking. I owned the account, built a product catalogue of roughly 3,000 to 3,500 items, then a pricing-decision dashboard tracking price movement and cost leakage by product, venue and supplier, using Python (pandas, numpy) and SQL. Presenting to the CFO and category managers, the analysis helped them identify close to 30% savings, roughly **A$2M** over a year, in their largest category, which they used directly in supplier negotiations.

**ML spend classification — enterprise procurement client (~A$12B spend)**
- Categorising the client's five-year, roughly **A$12B** spend book was manual and took an account manager over a month per cycle. I led the company's first ML classifier to automate it: a one-vs-all model built in scikit-learn (TfidfVectorizer on the transaction text, LogisticRegression with class weights for the heavy class imbalance, GridSearchCV and cross-validation for tuning), with pandas and numpy for feature engineering, and I evaluated it on precision, recall and F1 rather than accuracy. It cut the cycle to a single day's model run, and I documented the pipeline so it could be reused across other clients.

**Demand forecasting — fresh-produce and agricultural client**
- The client needed to plan raw-material and chemical inventory three months ahead. I built a Prophet time-series model with external regressors such as sea-freight trends and input prices, prepared the data with pandas, and backtested on held-out periods, delivering it through a planning dashboard. Forecasts landed within a 12.5 to 14% error margin, comfortably inside the client's tolerance.

**Reporting automation — internal, my own firm**
- Our analysts were each spending 12 to 15 hours a week hand-assembling client progress reports. I built an internal LLM-based workflow that generates them straight from our analytics outputs, with a QA step that checks the output before it goes out. It was adopted across the whole analyst team, around 25 to 30 accounts, saving roughly 12 to 15 hours a week.

### Data Engineer Intern, Victorian Centre for Data Insights (VCDI)
Aug 2023 to Nov 2023 | Melbourne, Australia

- Government procurement data was too large to screen on a single machine. I built a distributed anomaly-detection pipeline in Databricks with PySpark, engineering scalable transformation layers, and delivered the findings through a Power BI solution adopted by senior Department of Transport stakeholders. Detection accuracy improved by about 20%.

### Research Data Analyst, Terminal Ballistics Research Laboratory (TBRL, DRDO)
Jan 2021 to Jul 2021 | India

- Built statistical models with Butterworth signal filtering to predict blast-wave noise levels, improving prediction accuracy by about 20%, and compiled the findings into a technical report.

## Projects

### [MyFacit](https://www.myfacit.com): Analytics and Decision-Support SaaS for Hospitality
- Centralised analytics platform integrating 8+ data sources with dashboards, short-term forecasting and pricing and product-mix insights; in pilot with a local business and in active use.

## Education

### Master of Data Science, Monash University | Feb 2022 to Dec 2023
### Bachelor of Engineering, Thapar University | May 2017 to May 2021
