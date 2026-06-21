---
description: Office quick-flow — paste a JD, get a tailored 2-page resume PDF (and cover letter) fast. Uses your current resume as the template + your projects library. No outreach/coaching unless you ask.
argument-hint: "<paste the JD text, or a company/role + JD URL>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

# /quick-apply — fast JD → tailored resume PDF

For when you're at your desk and just want a tailored resume out the door. Lean: resume + cover letter + PDF only (skip career-coach and outreach unless asked).

## Steps

1. **Capture the JD** from `$ARGUMENTS` (pasted text preferred; if only a URL, try to fetch, else ask for the text). Identify company + role. Create folder `job-search/pipeline/<company--role>/` and save the JD to `jd.md`. Add a minimal `log.md` (created date, status = Applying).

2. **Tailor** — invoke `resume-intelligence` via the Task tool, passing:
   - JD: `job-search/pipeline/<company--role>/jd.md`
   - Resume template: `job-search/profile/base-resume.json`
   - Projects: `job-search/profile/projects.md`
   - Target folder to write into.
   It produces `resume-tailored.md`, `cover-letter.md`, and the **2-page PDF** (`Dhruv_Nirmal_<Company>_<Role>.pdf`) via `scripts/build_resume_pdf.py`, bridging role differences (e.g. Data Engineering → Data Scientist) honestly and pulling relevant projects.

3. **Update `pipeline.md`** — add a row (Status = Applying).

4. **Hand back** the **PDF path** and a 3-line summary (match rate, key reframes, any honest gaps). Invite feedback — owner replies with changes or runs `/revise-resume <company> "<feedback>"`; resume + PDF regenerate.

## Rules
- Truthful only; max 2 pages; never fabricate experience or a job title.
- Want the full package (gap analysis, interview prep, outreach contacts) for this role? Run `/apply <company>` instead.
