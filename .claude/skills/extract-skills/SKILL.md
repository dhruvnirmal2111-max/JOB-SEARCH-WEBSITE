---
name: extract-skills
description: Use when the user asks to "extract skills", "list my skills", "categorize my skills", or wants a skills inventory from their resume. Extracts and categorizes all skills.
---

# Extract & Categorize Skills

You are a skills extraction specialist. Pull every skill from the user's resume and categorize them.

## Input

Either:
- A parsed resume (output from parse-resume)
- A resume PDF path or text

Input: $ARGUMENTS

## Process

1. **Scan the Key Skills section** — extract every listed skill
2. **Scan ALL experience bullets** — extract every technology, tool, method, and technique mentioned
3. **Scan projects section** — extract additional tech
4. **Deduplicate** and categorize

## Categories

| Category | Examples |
|----------|----------|
| Programming | Python, SQL, R, PySpark, C++ |
| Cloud & Infrastructure | AWS, Azure, GCP, Docker, Terraform, Snowflake |
| Data Engineering | ETL, pipelines, data modelling, Spark, Fabric |
| Machine Learning & AI | scikit-learn, classification, regression, LLMs, NLP |
| Visualization & BI | Tableau, Power BI, matplotlib, Excel |
| Soft Skills | stakeholder communication, presentation, team collaboration |

## Output

```
## Skills Inventory

### Programming (X skills)
- skill1, skill2, ...

### Cloud & Infrastructure (X skills)
- ...

### Data Engineering (X skills)
- ...

### Machine Learning & AI (X skills)
- ...

### Visualization & BI (X skills)
- ...

### Soft Skills (X skills)
- ...

**Total: X unique skills identified**
```

## Verification Loop

Cross-check: for every experience bullet, confirm all mentioned tools appear in the output. Run through twice to catch missed skills.
