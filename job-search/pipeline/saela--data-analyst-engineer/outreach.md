# Outreach Plan - Saela - Data Analyst/Engineer

Track A (reactive, tied to a live posting). All messages below are DRAFTS ONLY. The owner reviews via `/review-outreach` and sends manually. Before sending anything, verify each named person still currently works at Saela (Saela Technologies / Saela Sync, the health-privacy femtech app, NOT the unrelated pest-control company also called Saela).

## Company identification (important, read first)

There are at least two unrelated companies called "Saela":

1. **Saela Technologies, Inc.** (also branded "Saela Sync"), headquartered in Nolita, New York, incorporated in Delaware in 2025, launched the Saela app in April 2026. A privacy-first AI app for women's health: interprets biology, cycle, and lifestyle data, stores health/chat data separately from identity (the link lives only on the user's device), and does not sell personal data. Founded by Maggie Lusk (ex-Deloitte, AI and technology strategy). Web: saelasync.com, meetsaela.ai, LinkedIn company page "saelasync-femtech." **This matches the JD** (early-stage SaaS + AI service, health-privacy sensitive, internal-tooling-only).
2. **Saela Pest Control**, Fort Worth, Texas, founded 2008, ~20+ locations, CEO Andrew Richardson, recently acquired by Rollins. This is a large door-to-door pest-control company with 26+ open positions on Glassdoor/Indeed. **Unrelated. Do not contact anyone from this company.**

Confidence: I am confident I have identified the right company (#1, Saela Technologies / Saela Sync). I could NOT independently verify LinkedIn profiles directly (linkedin.com is blocked from this environment's web access), so every named or placeholder person below still needs a manual LinkedIn check before sending anything, per the rule below.

## Phase 1 - Role context (from jd.md)

- **Company:** Saela (Saela Technologies / Saela Sync) - early-stage SaaS with an AI service, health-privacy sensitive, wants internal databases and dashboards and avoids third-party tools for privacy reasons.
- **Role:** Own how the product is measured. High ownership, one-month trial, then a 90-day review, then a longer-term placement decision.
- **Stack signals:** SQL first (tested), Python for pipelines, some TypeScript (Node backend), PostgreSQL (two instances: product and AI service), no warehouse or BI tool yet (part of the role is deciding what comes next), internal metrics dashboard (some React), dbt/BigQuery/ClickHouse/Metabase are a plus not required.
- **What makes this distinct:** it is a genuinely tiny, very early team (incorporated 2025, app publicly launched April 2026). The person hired is expected to build the data layer largely from scratch and to know the product well enough to decide what is worth measuring, not just execute a spec.
- **Personalization angle for Dhruv:** SQL-first strength directly matches the tested core; 20+ automated ETL pipelines and a Snowflake data warehouse provisioned with Terraform map to "decide what the data layer becomes and build it"; daily agentic-AI work (a multi-agent QA/verification workflow that re-checks outputs before they reach a client) is a rare, on-point match for "leverage and manage agents, not be replaced by them"; founding and owning the metrics for his own SaaS (MyFacit) maps to "know the product in and out."

## Team-size reality check (shapes the strategy)

Public sources show Saela as a very small, very young team: one founder (Maggie Lusk, Founder and CEO) is the only person I could confirm by name and role. I found one additional plausible lead, a marketing contact (see Contact 3 below), but could not confirm engineering, data, or recruiting hires distinct from the founder. **At this stage, Maggie Lusk is very plausibly also the hiring manager and the person who screens applicants** - there may be no separate "recruiter" or "manager" persona to find, only Maggie plus a small number of early engineers/contractors. The 5 slots below follow the standard persona mix, but three of the five are search-query placeholders precisely because I would not fabricate a name to fill a slot that may not exist yet. **If, on manual LinkedIn search, no additional employee turns up for a given placeholder slot, skip that slot rather than invent or substitute a person, and route more of the outreach energy toward Maggie Lusk directly** - for an early-stage startup this size, warm founder-direct outreach is the highest-value path.

## Phase 2 & 3 - 5 ranked targets

Scoring: Relevance to role (30%) + Response likelihood (25%) + Information value (25%) + Hiring influence (20%).

| # | Name / Title | Persona | Verification | Score | Search query |
|---|---|---|---|---|---|
| 1 | **Maggie Lusk**, Founder and CEO, Saela Technologies | Senior | VERIFIED (multiple independent sources: company site, TechRound interview, LinkedIn presence, ex-Deloitte background) | 9.0 | `Maggie Lusk Saela Sync` or `Maggie Lusk Saela Technologies` on LinkedIn (site references linkedin.com/in/maggielusk) |
| 2 | **[Software/Data Engineer - name TBD]**, Saela | Peer | **PLACEHOLDER - could not find a name; verify existence and identity on LinkedIn** | 6.5 | `site:linkedin.com/in "Saela" ("software engineer" OR "backend engineer" OR "data engineer" OR "full stack") -pest` |
| 3 | **Ifrah A. (Ifrah Ayoob)**, marketing role, listed as "Saela Sync" on LinkedIn | Peer | **PARTIALLY VERIFIED - found via search snippet only (LinkedIn itself is blocked from this environment), described as a digital marketing professional based in Dubai; her current employment status and exact function at Saela are unconfirmed. She is marketing, not engineering/data, so treat this as a "second peer, adjust the ask" option rather than an ideal data peer** | 5.0 | `Ifrah Ayoob Saela Sync` on LinkedIn (ae.linkedin.com/in/ifrahayoob) |
| 4 | **[Engineering Lead / Head of Product - name TBD]**, Saela | Manager | **PLACEHOLDER - could not confirm this role is filled by anyone other than Maggie Lusk; verify on LinkedIn before treating as a distinct contact** | 5.5 | `site:linkedin.com/in "Saela" ("CTO" OR "Head of Engineering" OR "Engineering Lead" OR "Head of Product") -pest` |
| 5 | **[Recruiter / Talent - name TBD]**, Saela | Recruiter | **PLACEHOLDER - a team this size very likely has no dedicated recruiter; Maggie Lusk or a contract recruiter may fill this function. Verify before treating as a distinct contact** | 4.0 | `site:linkedin.com/in "Saela" ("recruiter" OR "talent" OR "people ops") -pest`, and check the LinkedIn company page "saelasync-femtech" People tab |

Why each persona:
1. **Senior/Founder - Maggie Lusk** - the only confirmed, named person at the company, and very plausibly the actual decision-maker on this hire given the team's size. Highest relevance, highest hiring influence, and the highest information value (only she can speak to what "own how the product is measured" really means day to day). Sequenced FIRST, not last as a typical org chart would suggest, because at a two-to-five-person startup a respectful, curiosity-led founder message often IS the fastest path to a real conversation, not a long-shot escalation.
2. **Peer 1 (engineer, placeholder)** - a second technical voice on data-layer decisions (Postgres split, dbt/warehouse choices) would be the single most useful non-founder conversation, but no name could be confirmed. Must be found and verified before sending.
3. **Peer 2 - Ifrah A. (partially verified, marketing)** - the closest thing to a second real lead found in research. Not a data/eng peer, so if contacted, the message should be framed around "early team, building in public" rather than data-layer specifics, and her current employment must be reconfirmed first since it comes from a search snippet only.
4. **Manager (placeholder)** - kept as a distinct slot per the standard mix, but flagged that it may not exist separately from Maggie Lusk at this team size. Confirm on LinkedIn before sending; if it turns out to be the same person as Contact 1, skip this slot rather than message the founder twice with different personas.
5. **Recruiter (placeholder)** - lowest confidence a dedicated person exists at all at this stage. Kept as a placeholder search only; do not send unless a real, currently-employed name surfaces.

**Verification summary: 1 of 5 contacts fully verified as a current, named person at the correct Saela (Maggie Lusk). 1 of 5 partially verified via a search snippet only (Ifrah A., role/tenure unconfirmed). 3 of 5 are search-query placeholders with no name attached - do not send until a real, currently-employed name is confirmed on LinkedIn. Do not substitute anyone from Saela Pest Control.**

---

## Contact 1 - Senior/Founder: Maggie Lusk, Founder and CEO, Saela Technologies

**LinkedIn:** search `Maggie Lusk Saela Sync` (profile referenced as linkedin.com/in/maggielusk; confirm directly before sending, this tool's environment cannot load linkedin.com to double-check).
**Why:** The only confirmed named person at the company, ex-Deloitte (AI and technology strategy, regulated/data-sensitive industries), publicly built Saela's privacy architecture (health and chat data stored separately from identity, the link lives only on the user's device) after her own experience with under-served hormonal health. At this team size she is very plausibly also the hiring manager. Highest-value contact of the five.
**Status:** VERIFIED as founder/CEO of the correct Saela.

**1. Connection request (draft, 239 chars):**
> Hi Maggie, I just applied for Saela's Data Analyst/Engineer role. I really respect how you've separated identity from health data so the link only lives on-device, that is a genuinely hard privacy problem done right. Would love to connect.

**2. Follow-up message (after connection accepted):**
> Hi Maggie, thanks for connecting. I applied for the Data Analyst/Engineer role, and the part of the JD that stood out most was deciding what the data layer becomes next rather than just executing a spec. I've spent two years building and owning pipelines end to end, 20+ automated ETL pipelines and a cloud data warehouse I stood up on Snowflake with Terraform from scratch, so that ownership question is genuinely exciting to me rather than daunting. I also manage AI agents daily, including an independent QA workflow that re-checks outputs before they reach a client, which felt directly relevant to the JD's point about leveraging agents without letting them replace judgment. If you ever have 15 minutes, I would love to hear what is hardest about Saela's data setup right now, happy to work around your schedule. Thanks for reading this, Dhruv

**3. Thank-you note (post-conversation):**
> Thank you for making time to talk, Maggie, especially this early in building Saela. [Reference the specific point she made about the data layer or the privacy architecture] gave me a much clearer picture of what the role actually needs, and it made me even more genuinely interested. Appreciate the conversation either way.

---

## Contact 2 - Peer: [Software/Data Engineer - PLACEHOLDER, verify on LinkedIn]

**Search:** `site:linkedin.com/in "Saela" ("software engineer" OR "backend engineer" OR "data engineer" OR "full stack engineer") -pest`, plus check the LinkedIn company page "saelasync-femtech" People tab for anyone with an engineering title.
**Why:** A second technical voice on how the data layer is actually built day to day (the two-Postgres-instance split, query performance shared with the live app, whether a warehouse gets added) would be the most useful non-founder conversation for this role. No name could be confirmed in research.
**Status:** PLACEHOLDER - do not send until a real, currently-employed name is confirmed.

**1. Connection request (draft, 210 chars):**
> Hi [Name], I just applied for the Data Analyst/Engineer role at Saela and would love to connect with someone building the product day to day. Really admire what the team is doing with privacy-first health data.

**2. Follow-up message (after connection accepted):**
> Hi [Name], thanks for connecting. I applied for the Data Analyst/Engineer role and I am curious what it is actually like standing up the data layer at Saela, especially keeping analytics queries from slowing the live app when they share a Postgres server. I come from a data engineering background, 20+ automated ETL pipelines and a cloud data warehouse I built from scratch on Snowflake with Terraform, so I have run into similar tradeoffs before. Would you have 15 minutes to talk through what has worked so far on the data side, or happy to send a couple of questions async if that is easier. Thanks so much, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for walking me through that, [Name]. [Specific detail from the conversation] was genuinely useful and I will be thinking about it through the rest of the process. Appreciate you taking the time this early on.

---

## Contact 3 - Peer: Ifrah A. (Ifrah Ayoob), listed with Saela Sync on LinkedIn (partially verified, marketing)

**LinkedIn:** search `Ifrah Ayoob Saela Sync` (referenced as ae.linkedin.com/in/ifrahayoob; confirm her current title, function, and that she is still with Saela before sending).
**Why:** The closest second lead found in research beyond the founder. Appears to be a digital marketing contact rather than engineering or data, so if verified, the ask should be framed around early-team culture and building-in-public rather than data-layer specifics.
**Status:** PARTIALLY VERIFIED via search snippet only. LinkedIn could not be loaded directly to confirm current role/tenure. Verify before sending.

**1. Connection request (draft, 187 chars):**
> Hi Ifrah, I just applied for the Data Analyst/Engineer role at Saela. I would love to connect with someone on the early team and hear a bit about what building Saela has been like so far.

**2. Follow-up message (after connection accepted):**
> Hi Ifrah, thanks for connecting. I applied for the Data Analyst/Engineer role and I am always curious how an early team like Saela's thinks about the product day to day, beyond what is visible from the outside. My background is data engineering and analytics, and I would love to hear what you have seen resonate most with users since launch, if you have 15 minutes sometime. No pressure at all if the timing is not right. Thanks, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks so much for chatting, Ifrah. [Specific detail from the conversation] gave me a much better feel for the team and what you are all building. Really appreciate it.

---

## Contact 4 - Manager: [Engineering Lead / Head of Product - PLACEHOLDER, verify on LinkedIn]

**Search:** `site:linkedin.com/in "Saela" ("CTO" OR "Head of Engineering" OR "Engineering Lead" OR "Head of Product") -pest`, plus the LinkedIn company page "saelasync-femtech" People tab.
**Why:** The standard persona mix calls for a hiring-manager-equivalent contact. At this team size that role may not exist separately from Maggie Lusk (Contact 1). Confirm before sending; if the same person, skip this slot rather than message the founder twice under different personas.
**Status:** PLACEHOLDER - do not send until a real, currently-employed, distinct-from-founder name is confirmed.

**1. Connection request (draft, 211 chars):**
> Hi [Name], I just applied for the Data Analyst/Engineer role at Saela. I have built data pipelines and a cloud data warehouse from scratch, and would love to connect and learn what the team needs most right now.

**2. Follow-up message (after connection accepted):**
> Hi [Name], thanks for connecting. I applied for the Data Analyst/Engineer role, and the SQL-first, build-the-layer-from-scratch framing in the JD is close to what I have already done, 20+ automated ETL pipelines and a Snowflake data warehouse I provisioned with Terraform end to end. I also manage AI agents daily, including an independent QA step that catches wrong answers before they reach a client, which maps closely to the JD's point about leveraging agents rather than being replaced by them. Would you have 15 minutes to talk through what the team is prioritizing on the data side first, or happy to answer any questions async. Thanks for considering it, Dhruv

**3. Thank-you note (post-conversation):**
> Thank you for taking the time to talk, [Name]. [Specific detail from the conversation] was genuinely helpful and it has sharpened how I am thinking about the role. Appreciate the conversation, whichever way this goes.

---

## Contact 5 - Recruiter: [Talent/People - PLACEHOLDER, verify on LinkedIn]

**Search:** `site:linkedin.com/in "Saela" ("recruiter" OR "talent" OR "people ops") -pest`, plus the LinkedIn company page "saelasync-femtech" People tab.
**Why:** Kept as a distinct slot per the standard mix, but at a team this size a dedicated recruiter very likely does not exist. If no one surfaces, the process/timeline questions this slot would normally cover should instead go to Maggie Lusk (Contact 1) once a real conversation is underway.
**Status:** PLACEHOLDER - lowest confidence of the five that a distinct person exists. Do not send unless a real, currently-employed name is confirmed.

**1. Connection request (draft, 165 chars):**
> Hi [Name], I just applied for the Data Analyst/Engineer role at Saela and wanted to connect directly. Excited about the team's privacy-first approach to health data.

**2. Follow-up message (after connection accepted):**
> Hi [Name], thanks for connecting. I applied for the Data Analyst/Engineer role and wanted to introduce myself directly. I bring two years of building automated data pipelines and a cloud data warehouse from scratch, plus daily experience managing AI agents with an independent QA step, which lines up closely with what the JD describes. Could you let me know what the process and timeline typically look like for this role, and anything useful I should know going in. Thanks for your time, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for the update, [Name], I appreciate you walking me through the process. I am genuinely excited about the role and will keep an eye out for next steps.

---

## Phase 5 - Outreach strategy (week by week)

```
Week 1: Senior/Founder (Maggie Lusk) + Peer 1 (engineer, once confirmed) - founder-direct outreach leads here, not last, given the team's size
Week 2: Peer 2 (Ifrah A., once reconfirmed) + Manager (only if confirmed as a distinct person from Maggie Lusk)
Week 3: Recruiter (only if a distinct, confirmed person is found; otherwise route process/timeline questions to Maggie Lusk directly once a conversation is underway)
```

Rules applied:
- Every message personalized to a specific, real detail (Saela's on-device identity/health-data separation, the JD's own language on building the data layer and managing agents, MyFacit-style product ownership).
- Follow up ONCE after 5-7 business days if no response; never a second follow-up.
- Thank-you sent within 24 hours of any real conversation.
- No referral ask in any first message; referral conversation only considered after a genuine exchange, and only if it comes up naturally.
- All three placeholder contacts (Peer 1, Manager, Recruiter) and the partially verified contact (Ifrah A.) must be confirmed as real, current, correctly-identified Saela employees on LinkedIn before any message is sent. If a placeholder slot cannot be filled with a confirmed name, skip it rather than invent one or substitute anyone from Saela Pest Control.
- Given the team's size, expect to genuinely end up with fewer than 5 sendable contacts. That is fine, quality and accuracy over hitting a quota of 5.

## Phase 6 - Tracking

| Person | Persona | Status | Date Sent | Response | Follow-Up Date | Notes |
|--------|---------|--------|-----------|----------|----------------|-------|
| Maggie Lusk | Senior/Founder | Not sent | | | | Verified; send first, not last |
| [Software/Data Engineer - TBD] | Peer | Not sent | | | | Placeholder, verify name first |
| Ifrah A. (Ifrah Ayoob) | Peer | Not sent | | | | Partially verified only, reconfirm role/tenure first |
| [Engineering Lead/Head of Product - TBD] | Manager | Not sent | | | | Placeholder, may be the same person as Maggie Lusk, verify first |
| [Talent/People - TBD] | Recruiter | Not sent | | | | Placeholder, may not exist at this team size |

---

*All messages above are drafts only. Nothing is sent automatically. Review via `/review-outreach`, verify each person is still current at Saela Technologies / Saela Sync (not Saela Pest Control) on LinkedIn, then send manually.*
