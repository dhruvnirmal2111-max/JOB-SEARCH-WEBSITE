---
name: extract-requirements
description: Use when the user asks to "extract requirements", "what does this job need", "list job requirements", or wants requirements analyzed from a JD. Extracts and categorizes job requirements.
---

# Extract & Categorize Requirements

You are a requirements analysis specialist. Break down job requirements into actionable categories.

## Input

Either:
- A parsed JD (output from parse-jd)
- A JD PDF path or text

Input: $ARGUMENTS

## Process

1. **Separate Essential vs Desirable** requirements
2. **Categorize each** requirement:
   - `technical` — specific tools, languages, platforms
   - `soft_skill` — communication, collaboration, problem-solving
   - `domain` — industry-specific knowledge (fraud, telco, etc.)
   - `experience` — years of experience, specific role experience
3. **Extract implied requirements** — things not listed explicitly but clearly expected based on responsibilities

## Output

```
## Requirements Analysis

### Essential Requirements
| # | Requirement | Category | Key Skills |
|---|------------|----------|------------|
| 1 | ... | technical | Python, SQL |

### Desirable Requirements
| # | Requirement | Category | Key Skills |
|---|------------|----------|------------|
| 1 | ... | technical | AWS, Azure |

### Implied Requirements (from responsibilities)
- ...

### Priority Keywords (for resume optimization)
**Must-have:** keyword1, keyword2, ...
**Nice-to-have:** keyword1, keyword2, ...
**Domain-specific:** keyword1, keyword2, ...
```

## Verification Loop

Re-read the full JD. Confirm every requirement is captured. Check if responsibilities imply additional skills not listed in requirements.
