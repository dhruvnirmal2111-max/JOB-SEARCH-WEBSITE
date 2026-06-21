---
description: Apply your feedback to a tailored resume and regenerate the 2-page PDF. The review/iterate loop.
argument-hint: "<company> \"<your feedback>\" — e.g. quantium \"cut the TBRL bullets, add more on the multi-agent QA work\""
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# /revise-resume — iterate on a tailored resume

## Steps

1. **Locate** the target from `$ARGUMENTS` → `job-search/pipeline/<company--role>/resume-tailored.md`. If ambiguous, list pipeline folders and ask which.
2. **Read** the current `resume-tailored.md` and the owner's feedback (the quoted part of `$ARGUMENTS`).
3. **Apply the feedback** by editing `resume-tailored.md` — honor the requested changes while keeping it truthful, ATS-friendly, and **≤2 pages**. Preserve the `## Keyword Alignment` block at the bottom (the PDF cuts it automatically).
4. **Regenerate the PDF:**
   ```
   python scripts/build_resume_pdf.py "<folder>/resume-tailored.md" "<folder>/Dhruv_Nirmal_<Company>_<Role>.pdf"
   ```
   Confirm it reports ≤2 pages; if it warns about overflow, trim the least-relevant content and rerun.
5. **Report** what changed and give the PDF path. Invite another round of feedback.

## Rules
- Never fabricate experience or metrics to satisfy feedback. If a request would require that, say so and propose a truthful alternative.
- Keep iterating until the owner says it's good.
