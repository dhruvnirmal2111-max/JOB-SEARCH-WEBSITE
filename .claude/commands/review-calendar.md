---
description: Review staged calendar events and push the approved ones to Google Calendar (the calendar approval gate).
allowed-tools: Read, Write, Edit, Bash
---

# /review-calendar — approve & push calendar events

This is the **calendar approval gate**. Events are only created in Google Calendar here, after the owner approves.

## Steps

1. **Read** `job-search/calendar/pending-events.json`. If empty, say so and stop.
2. **Present** the pending events as a compact numbered list (title, kind, start–end, notes).
3. **Ask the owner** which to approve: all, some (by number), or none. Let them edit times/titles before approving.
4. **Create the approved events** via the `calendar-sync` skill (Google Calendar MCP). For each created event, mark it in the JSON as `status: "created"` and record the returned event id/link; leave declined ones `pending` or remove them per the owner's choice.
5. **Confirm** what was created with calendar links, and what remains pending.

## Rules
- Never create an event the owner didn't approve.
- If the Google Calendar MCP isn't connected, tell the owner how to connect it and offer to export the approved events as an `.ics` file instead.
