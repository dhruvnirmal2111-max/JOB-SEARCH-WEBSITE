# Dhruv Nirmal
Melbourne, Australia | dhruvnirmal2111@gmail.com | +61406259619 | [LinkedIn](https://www.linkedin.com/in/dhruv-nirmal-data) | [GitHub](https://github.com/dhruvnirmal2111-max)

Hiring Team, Tabby, DWH Team

Dear Hiring Team,

I'm writing to apply for the Data Engineer role on Tabby's DWH team. I currently work as a Data Engineer at a data and analytics consulting firm in Melbourne, where my day to day is exactly the kind of work this role describes: building and maintaining the pipelines and warehouse structures that let business users, analysts and ML engineers work with data they can trust, rather than data they have to double check. Building a corporate data warehouse from cloud infrastructure and getting the ingestion, cleaning and governance right underneath it is the part of the job I find most satisfying, and it's what pulled me to this posting specifically.

The clearest proof of that is a pipeline I own for the firm's largest client account: spend data arriving weekly across 5 global regions and 13 sub-regions, roughly 6 million invoice rows plus purchase-order and lookup data. I replaced a manual, error-prone upload process with automated email-based ingestion through the Microsoft Graph API into scheduled SQL Server batch scripts, standardised how every region submits its files, and built validation that checks row counts, data types and column consistency before anything reaches the client. That took weekly processing from 4 to 5 hours of manual checking down to about 75 minutes, and it's the same kind of synchronization, cleaning and quality work this role is built around, just running on a different client's data.

That pipeline sits alongside 20+ other automated ETL and EL pipelines I've built and maintained across multiple client systems, and a company-wide, self-service pipeline app I built that gives a team of 26 client accounts one-click ingestion, validation, downstream processing and full or incremental refresh, fully version-controlled in Git. Outside work, I've built a Snowflake data warehouse as infrastructure as code in Terraform, provisioning S3, EC2 and IAM and automating ingestion from external APIs, and during an internship I built a distributed anomaly-detection pipeline in Databricks using PySpark. I like building the tooling underneath a pipeline as much as the pipeline itself, which is where a lot of the reliability actually comes from.

Tabby's scale of data, tens of millions of users and tens of thousands of brands processing billions in transactions, is exactly the kind of environment where getting the warehouse foundations right matters most, and I'd genuinely like to be part of building that. The GCC is also where I'm actively looking to base myself next, so this role lines up with both the kind of engineering I want to keep doing and where I want to be doing it. The core problem I solve for every week, turning messy, multi-source data into a clean, governed warehouse that other teams can build on, is the same problem underneath a corporate DWH, and it's one I already know how to run at scale.

I'd welcome the chance to talk through how this experience maps onto the DWH team's roadmap. Thank you for considering my application.

Sincerely,
Dhruv Nirmal
