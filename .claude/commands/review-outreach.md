---
description: Review drafted outreach messages for a target and mark approved ones ready to send (the owner still sends them manually).
argument-hint: "[company or company--role; omit to review all pending]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# /review-outreach — approve outreach drafts

This is the **send approval gate**. The system never sends messages; the owner sends them manually after approving here.

Covers **both tracks**: Track A drafts in `pipeline/<company--role>/outreach.md` and Track B drafts in `network/people/<slug>.md`.

## Steps

1. **Find the drafts.** From `$ARGUMENTS`, locate the relevant file:
   - a company/role → `job-search/pipeline/<company--role>/outreach.md` (Track A), or
   - a person/company → `job-search/network/people/<slug>.md` (Track B).
   If no argument, list everything un-reviewed across **both** locations and ask which.
2. **Present** each contact (persona, name, role) and its messages — Track A: connection ≤300 chars, follow-up, thank-you · Track B: Day-0 connection ≤300 chars, value touch, soft ask. Keep it scannable.
3. **Collect edits/approvals** per contact. Apply the owner's edits directly to the source file.
4. **Mark approved** messages as `Ready to send`. Track A → also add a checklist row in the target's `log.md`. Track B → update the contact's `Stage` and `Next touch` in `network/relationships.md` so `/standup` surfaces the next step.
5. **Remind** the owner these are sent manually, and to log responses (in `log.md` or the contact's dossier message log) so `/standup` can schedule follow-ups.

## Rules
- Never auto-send. Never contact anyone. Output is for the owner to copy/paste and send themselves.
