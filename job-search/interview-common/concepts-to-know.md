# Concepts to Know but Haven't Used Much — both roles

> Things you may not have hands-on experience with, but should be able to **explain and place** if they come up. For each: **what it is (ELI5) → why it matters → the honest line to say.** The honest line pattern is always: *"I haven't used X hands-on, but it's [what], you'd reach for it when [when], and it's on my list to go deeper on."* That reads confident, not evasive.

---

## SHARED (could come up in either interview)

**Data modelling — star schema / normalisation** — ELI5: how you structure tables. A **star schema** = one central **fact** table (events/measures like sales) linked to **dimension** tables (descriptors: store, product, date). **Normalisation** = splitting data to avoid duplication; **denormalisation** = combining for read speed. *Say:* "Analytics/BI favour a star schema — a fact table surrounded by dimensions — because it's fast and intuitive to query."

**REST APIs / JSON** — ELI5: how systems talk over the web. An **API** is a defined way to request data; **REST** uses HTTP verbs (GET/POST); **JSON** is the common text format for the data. *Say:* "I've consumed APIs — e.g. Microsoft Graph for email ingestion — so I'm comfortable with request/response and JSON."

**Docker / containers** — ELI5: package an app + all its dependencies into a box that runs identically anywhere. **Kubernetes** = orchestrates many containers at scale. *Say:* "I've used Docker in my cloud-platform build for reproducible environments; Kubernetes I understand conceptually (it schedules and scales containers) but haven't operated."

**Cloud basics (AWS/Azure/GCP)** — ELI5: rent compute/storage instead of owning servers. Key services: **object storage** (S3/Blob), **compute** (EC2/VM/functions), **warehouse** (Redshift/Snowflake/BigQuery). *Say:* "I've worked Azure (Graph API, hosted servers) and AWS (S3, EC2, IAM via Terraform); the pattern generalises across clouds."

**Testing** — ELI5: automated checks that code does what it should. **Unit test** = one function; **integration test** = parts together. *Say:* "I'd unit-test transform functions and add data-quality tests in the pipeline."

**Agile / Scrum** — ELI5: iterative delivery in short sprints with standups, backlog, retros. *Say:* "I'm comfortable in an agile delivery rhythm — sprints, standups, iterative releases."

---

## DATA ENGINEER (Infosys) — know these names even if you haven't run them

**Apache Airflow** — ELI5: the standard **orchestrator** — schedules pipelines and manages step dependencies as a **DAG** (a flowchart of tasks). *Say:* "I've orchestrated with batch + Windows Task Scheduler; Airflow is the industry standard for DAG-based scheduling with retries and backfills, and I'd pick it up quickly." (Databricks Workflows/Jobs is the Databricks-native equivalent.)

**dbt (data build tool)** — ELI5: lets you build warehouse transformations as version-controlled **SQL models**, with built-in testing and lineage. It's the "T" of ELT done properly. *Say:* "dbt is SQL-based transformations with testing, docs and lineage baked in — very aligned with how I already think about validated, documented pipelines."

**Kafka / streaming** — ELI5: moving data **continuously in real time** (event by event) instead of in scheduled batches. Kafka is the common message pipe. *Say:* "My work is batch and micro-batch; streaming with Kafka is for real-time/event-driven needs — I understand the model (producers/topics/consumers) but haven't built one."

**Snowflake / BigQuery** — ELI5: cloud **data warehouses** that separate storage from compute and scale on demand. *Say:* "I've used Snowflake in my cloud build; these are columnar, auto-scaling warehouses — great for ELT."

**Delta Lake / lakehouse** — ELI5: adds database reliability (**ACID transactions**, versioning/time-travel) on top of cheap data-lake files. The Databricks default. *Say:* "Delta gives a data lake warehouse-like reliability — ACID and time travel — which is why Databricks pipelines standardise on it."

**CI/CD tooling (GitHub Actions / Jenkins / Azure DevOps)** — ELI5: automate build→test→deploy on every code change. *Say:* "I work Git-first; I understand the CI/CD shape and want to own a full GitHub Actions pipeline." (See the interview-prep gap bridge.)

**Data contracts / Great Expectations** — ELI5: formalised, testable agreements about data shape/quality between producer and consumer. *Say:* "I've built validation layers by hand; tools like Great Expectations formalise those checks — same principle, standardised."

**Slowly Changing Dimensions (SCD)** — ELI5: how you track history when a dimension changes (e.g. a store changes region). **Type 1** = overwrite; **Type 2** = keep history with new rows + valid-from/to dates. *Say:* "For historical accuracy I'd use SCD Type 2 to preserve the old value with effective dates." (Classic DE interview term — worth knowing.)

**Partitioning & file formats (Parquet)** — ELI5: **partition** data (e.g. by date) so queries scan less; **Parquet** = compressed columnar file format that's fast for analytics. *Say:* "Partitioning by date and storing Parquet cuts scan cost massively vs row-based CSV."

---

## DATA SCIENTIST (7-Eleven) — know these even if you haven't built them

**Gradient boosting (XGBoost / LightGBM)** — ELI5: builds many small trees in sequence, each fixing the last one's errors; usually the **best off-the-shelf model for tabular data**. *Say:* "For a store-level sales or demand model I'd strongly consider LightGBM on lag features — it typically beats linear models on rich tabular data. I've focused on logistic regression and Prophet, but boosting is the natural next tool."

**Deep learning / neural networks** — ELI5: stacked layers that learn complex non-linear patterns; needs lots of data; overkill for most tabular problems. *Say:* "Neural nets shine on images/text/sequences with big data; for tabular pricing work, boosted trees usually win, so I'd reach for DL only when the problem needs it."

**Transformers / LLMs (how they work)** — ELI5: models that predict the next token using **attention** (weighing which earlier words matter); the basis of GPT/Claude. *Say:* "I use LLMs heavily at the application layer — tool calling, RAG, evaluation — even if I don't train them. Conceptually they're attention-based next-token predictors."

**Causal inference (beyond A/B)** — ELI5: methods to estimate cause when you can't run a clean experiment: **difference-in-differences**, **instrumental variables**, **propensity-score matching**, **regression discontinuity**. *Say:* "When a clean A/B isn't possible I'd use diff-in-differences or matched controls to isolate the causal effect — that's how I'd measure a pricing change across stores."

**MLflow / model registry** — ELI5: track experiments (params, metrics) and version deployed models. *Say:* "MLflow is the standard for experiment tracking and a model registry; I've versioned models informally in pipelines and would adopt MLflow in a mature stack." (Built into Databricks.)

**Feature store** — ELI5: a central, reusable, consistent place for model features, so training and serving use identical inputs. *Say:* "A feature store solves training/serving skew by making features consistent and reusable — I understand the why, haven't operated one."

**Recommendation systems** — ELI5: predict what a user will want (collaborative filtering = 'people like you liked…'; content-based = 'similar items'). *Say:* "For personalised offers / loyalty, that's a rec-systems problem — collaborative filtering or matrix factorisation — which I'd frame as a ranking/prediction task."

**Bayesian methods / A-B via Bayesian** — ELI5: express uncertainty as probability distributions and update with data; Bayesian A/B gives "probability B beats A". *Say:* "Bayesian testing gives a more intuitive 'probability B is better' and handles small samples well; I've used frequentist testing, and understand the Bayesian alternative."

**Clustering / segmentation (k-means)** — ELI5: group similar customers/stores automatically. *Say:* "For customer or store segmentation I'd use k-means and validate k with the elbow/silhouette method." (You do know this — glossary §2.)

**SHAP / model explainability** — ELI5: quantifies how much each feature pushed a prediction, for trust and debugging. *Say:* "SHAP values explain individual predictions — I'd use them to make a model's reasoning transparent to stakeholders."

---

## How to use the honest line (it's a strength, not a weakness)
Interviewers don't expect you to have used everything. They're testing whether you **understand where a tool fits and can learn it**. The pattern — *"haven't used it hands-on, here's what it is and when I'd reach for it, and I'm keen to go deeper"* — turns every gap into evidence you think like an engineer/scientist, not a tool-list. Confidence + honesty beats bluffing every time; a made-up answer that unravels under one follow-up is the only real failure.
