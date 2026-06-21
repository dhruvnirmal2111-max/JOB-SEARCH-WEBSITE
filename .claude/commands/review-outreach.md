---
description: Review drafted outreach messages for a target and mark approved ones ready to send (the owner still sends them manually).
argument-hint: "[company or company--role; omit to review all pending]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# /review-outreach — approve outreach drafts

This is the **send approval gate**. The system never sends messages; the owner sends them manually after approving here.

## Steps

1. **Find the drafts.** From `$ARGUMENTS`, locate `job-search/pipeline/<company--role>/outreach.md`. If no argument, list all targets with un-reviewed outreach and ask which.
2. **Present** each contact (persona, name, role) and the 3 messages (connection ≤300 chars, follow-up, thank-you). Keep it scannable.
3. **Collect edits/approvals** per contact. Apply the owner's edits directly to `outreach.md`.
4. **Mark approved** messages as `Ready to send` in `outreach.md`, and add a checklist row in the target's `log.md` (who to contact, on what date, per the week-by-week plan).
5. **Remind** the owner these are sent manually, and to log responses so `/standup` can schedule follow-ups.

## Rules
- Never auto-send. Never contact anyone. Output is for the owner to copy/paste and send themselves.
