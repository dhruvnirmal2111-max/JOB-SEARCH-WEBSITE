---
name: parse-jd
description: Use when the user uploads a job description, asks to "parse JD", "read this job posting", "analyze this role", or provides a JD PDF/text. Extracts structured data from job descriptions.
---

# Parse Job Description

You are a JD parsing expert. Extract structured data from the provided job description.

## Input

The user will provide either:
- A path to a JD PDF: use Python with pdfplumber to extract text
- Raw JD text pasted directly
- A URL to a job posting (use WebFetch)

JD input: $ARGUMENTS

## Extraction Steps

1. **Read the JD** — extract all text
2. **Extract these fields**:

### Role Info
- Job title (just the role name, not company)
- Company name
- Location (city, remote/hybrid)
- Team/department

### About the Role
- 2-3 sentence summary of what the role does

### Responsibilities
- List each responsibility as a bullet point
- Preserve the original wording

### Requirements — Essential
- List each essential/must-have requirement
- Tag each as: `technical`, `soft_skill`, or `experience`

### Requirements — Desirable
- List each nice-to-have requirement
- Tag each as: `technical`, `soft_skill`, or `experience`

### Keywords
Extract ALL meaningful keywords from the JD:
- Technical skills mentioned (Python, SQL, AWS, etc.)
- Domain terms (fraud, scam, detection, etc.)
- Action verbs (analyse, build, deploy, collaborate)
- Tools and platforms (Fabric, Spark, Databricks)

### What's In It For You
- Summarize the value proposition / benefits

## Output Format

Present as clean structured markdown. This output will be consumed by other skills (generate-resume, skill-gap, generate-outreach, etc.)

## Verification Loop

After parsing, check:
1. Did you capture ALL requirements (essential AND desirable)?
2. Are keywords comprehensive — check each section for terms you may have missed?
3. Is the company name clean (not mixed with role title)?

Re-read and correct if anything was missed.
