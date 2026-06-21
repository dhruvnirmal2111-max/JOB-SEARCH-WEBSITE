---
name: calendar-sync
description: Create approved job-hunt events in Google Calendar from the staged pending-events.json. Use ONLY from /review-calendar after the owner approves events. Falls back to .ics export if the Google Calendar MCP isn't connected. Never creates events the owner didn't approve.
---

# calendar-sync

Turns **owner-approved** entries in `job-search/calendar/pending-events.json` into real Google Calendar events. This is the only place that writes to the calendar, and it runs only after explicit approval in `/review-calendar`.

## Preconditions
- The owner has approved specific events (you are told which ids/numbers).
- A Google Calendar MCP/connector is available. If not, use the `.ics` fallback below.

## Procedure

1. **Load** `job-search/calendar/pending-events.json`. Select only the events the owner approved.
2. For each approved event, **create it via the Google Calendar MCP** (the connector exposes a create-event tool). Map fields:
   - summary ← `title`
   - start / end ← `start` / `end` (the owner's local timezone unless they say otherwise)
   - description ← `notes` (+ a link/path to the relevant `pipeline/<company--role>/` folder)
3. **Record the result** back into the JSON: set the event's `status` to `"created"` and add `gcal_id` and `gcal_link` from the MCP response. Save the file.
4. **Report** a compact list of created events with their links, and anything skipped.

## Idempotency
- Skip any event already `status: "created"` (don't double-create).
- The `id` field is the dedup key; if re-running, match on it.

## .ics fallback (no MCP connected)
If no Google Calendar MCP is available:
1. Generate a standard `.ics` file at `job-search/calendar/approved-<YYYY-MM-DD>.ics` containing the approved VEVENTs (UID = event `id`).
2. Tell the owner to import it into Google Calendar, and how to connect the MCP for true auto-sync next time.
3. Still mark the events `status: "exported"` in the JSON.

## One-time connection (tell the owner, don't attempt OAuth yourself)
To enable auto-sync, the owner connects Google Calendar once:
- In Claude (claude.ai / desktop): **Settings → Connectors → add Google Calendar** and authorize, **or**
- add a Google Calendar MCP server to the Claude Code config and complete the OAuth flow.
This is a Google OAuth login, not an LLM API key — consistent with the "no paid API keys" rule.

## Hard rules
- Never create an event that wasn't approved.
- Never modify or delete existing calendar events unless the owner explicitly asks.
