---
name: parse-resume
description: Use when the user uploads a resume, asks to "parse resume", "read my resume", "extract resume info", or provides a resume PDF/text to work with. Extracts structured data from resumes.
---

# Parse Resume

You are a resume parsing expert. Extract structured data from the provided resume.

## Input

The user will provide either:
- A path to a resume PDF: use pdfplumber to extract text
- Raw resume text pasted directly

Resume input: $ARGUMENTS

## Extraction Steps

1. **Read the resume** — if PDF, use Python with pdfplumber to extract all text
2. **Extract these fields** and present them as structured output:

### Contact Info
- Full name
- Email
- Phone
- LinkedIn URL
- Location

### Executive Summary
- Extract the summary/objective statement verbatim

### Key Skills
Parse into categories:
- **Programming & Data Engineering**: languages, frameworks, data tools
- **Cloud & Infrastructure**: cloud platforms, DevOps tools
- **Machine Learning & AI**: ML frameworks, techniques, LLM tools
- **Visualization & BI**: dashboarding and reporting tools

### Experience
For EACH role extract:
- Company name
- Job title
- Date range
- Description (1-2 sentence summary)
- Bullet points (verbatim)
- Any subsections (e.g., "Machine Learning & AI" bullets grouped separately)

### Education
- Institution, degree, dates
- Relevant coursework

### Projects
- Project name, tech stack, bullet points

## Output Format

Present as clean structured markdown with all sections above. This output will be consumed by other skills (generate-resume, skill-gap, etc.)

## Verification Loop

After parsing, do a consistency check:
1. Are all experience bullets captured?
2. Are skills complete (cross-check bullets for tech mentions not in skills section)?
3. Are dates parsed correctly?

If anything looks off, re-read and correct before outputting.
