# Outreach Plan - Tabby - Data Engineer (DWH Team)

Track A (reactive, tied to a live posting). All messages below are DRAFTS ONLY. The owner reviews via `/review-outreach` and sends manually. Before sending anything, verify each named person still currently works at Tabby (fast-growing 1,000+ person fintech, roles change).

## Phase 1 - Role context (from jd.md)

- **Company:** Tabby (tabby.ai), largest and fastest-growing BNPL fintech in the GCC. 17M+ users, 40,000+ brands (Amazon, noon, IKEA, SHEIN), $10B+ annual transaction volume, valued at $4.5B, HQ in Riyadh/Dubai/Cairo.
- **Role:** Data Engineer on the DWH Team, building the corporate data warehouse for Business Users, Analysts and ML Engineers. EL/ELT/ETL pipeline development, data sync, data governance/quality, cost optimisation.
- **Stack signals:** Airflow, dbt, BigQuery, Clickhouse, PostgreSQL, Docker, GitLab CI/CD, GCP. Data modelling frameworks named in the JD: Kimball, Inmon, Medallion, Data Mesh, SCD, Star Schema, Data Vault.
- **Personalization angle for Dhruv:** currently titled Data Engineer (PI Data Analytics, Melbourne), 20+ automated ETL pipelines across enterprise clients, a Snowflake data warehouse provisioned as infrastructure-as-code with Terraform (adjacent to a BigQuery/Clickhouse DWH build), and PySpark/Databricks distributed processing (VCDI internship). Honest gap: ~2 years full-time DE vs the 3+ years asked, and no shipped dbt/Airflow/GitLab CI/CD, so these are framed as truthful transferable equivalents, not overstated.
- **Relocation angle:** Dhruv is based in Melbourne and actively open to relocating to Dubai/GCC. Tabby's HQ location is a genuine draw for him, not a hurdle to work around, worth surfacing honestly in messages (especially with the recruiter) since it removes a common objection for an overseas applicant.

## Phase 2 & 3 - 5 ranked targets

Scoring: Relevance to role (30%) + Response likelihood (25%) + Information value (25%) + Hiring influence (20%).

| # | Name / Title | Persona | Verification | Score | Search query |
|---|---|---|---|---|---|
| 1 | **Maksim Zolotarev**, Head of Data Platform & ML, Tabby (Dubai) | Manager | VERIFIED (multiple independent sources: ZoomInfo, RocketReach, LinkedIn bio, Google Cloud case study naming him) | 8.8 | `Maksim Zolotarev Tabby Head of Data Platform` on LinkedIn |
| 2 | **[Data Engineer / DWH Engineer / Analytics Engineer - name TBD]**, Tabby Data Platform team | Peer | **PLACEHOLDER - verify before sending** | 7.3 | `site:linkedin.com/in "Tabby" ("Data Engineer" OR "Analytics Engineer" OR "DWH")`, cross-check against Maksim Zolotarev's direct reports/connections on LinkedIn |
| 3 | **Arpit Jain**, Head of Analytics, Tabby (Dubai) | Senior | VERIFIED (LinkedIn, ZoomInfo, ex-noon/Flipkart background) | 6.6 | `Arpit Jain Tabby Head of Analytics` on LinkedIn (linkedin.com/in/arpit-jain-a3a92a105) |
| 4 | **Anastasija Konoreva**, Senior Talent Acquisition Partner, Tabby (Dubai) | Recruiter | VERIFIED (LinkedIn, ZoomInfo, RocketReach, tabby.ai email domain) | 6.4 | `Anastasija Konoreva Tabby Talent Acquisition` on LinkedIn (ae.linkedin.com/in/konoreva) |
| 5 | **Marwan Ashraf**, Senior Risk Data Analyst, Tabby (Dubai/UAE) | Peer | VERIFIED (LinkedIn, RocketReach) | 5.9 | `Marwan Ashraf Tabby Senior Risk Data Analyst` on LinkedIn (ae.linkedin.com/in/marwan-ashraf-) |

Why each persona:
1. **Manager - Maksim Zolotarev** - heads Tabby's Data Platform & ML org and is publicly credited with building a 2-petabyte data warehouse and real-time feature store on Google Cloud. This is very likely the actual hiring-influence chain for a DWH Team Data Engineer, and the highest information-value contact of the five (what the team is prioritising, what "good" looks like at Tabby's scale).
2. **Peer 1 (placeholder)** - a second, more directly-titled Data Engineer/DWH Engineer/Analytics Engineer peer for hiring-process and day-to-day texture. Could not confirm a specific current name despite multiple searches, flagged rather than invented. Tabby's data org is real and sizeable (multiple open DWH/data-platform reqs), so a name is very likely findable directly on LinkedIn once logged in.
3. **Senior - Arpit Jain** - Head of Analytics, senior data leadership at Tabby (ex-noon, ex-Flipkart), one level up from the day-to-day DWH build but sets strategic direction for how data gets consumed across the business. Good source for company-direction perspective, sequenced last per the "respectful curiosity, no ask" rule.
4. **Recruiter - Anastasija Konoreva** - Senior Talent Acquisition Partner at Tabby, more likely than the Head of Talent Acquisition (Alexandre Corbin, also verified at Tabby, kept as a backup name) to be the person actually working individual technical reqs like this one. Best first stop for process and timeline.
5. **Peer 2 - Marwan Ashraf** - Senior Risk Data Analyst at Tabby, a genuine current employee on the data side of the business. Honest caveat: he is a consumer of the DWH (per the JD, the warehouse serves "Business Users, Analysts and ML Engineers") rather than a DWH engineer himself, so he is included as a real peer for culture/process color, not as someone with hands-on DWH build experience.

**Verification summary: 3 of 5 contacts fully verified as data-org employees currently at Tabby with a strong persona match (Maksim Zolotarev, Arpit Jain, Anastasija Konoreva). 1 of 5 verified as a current Tabby employee but an adjacent persona fit, honestly caveated (Marwan Ashraf). 1 of 5 is a placeholder (the second peer, a DWH/data engineer) - do not send until a real name is confirmed on LinkedIn.**

---

## Contact 1 - Manager: Maksim Zolotarev, Head of Data Platform & ML, Tabby (Dubai)

**Search/LinkedIn:** `Maksim Zolotarev Tabby Head of Data Platform` (linkedin.com/in/maksim-zolotarev-a553b8177)
**Why:** Heads Tabby's Data Platform & ML org, publicly credited with building a 2-petabyte data warehouse and real-time feature store entirely on GCP, and has spoken about semantic/metadata layers that make data trustworthy for ML use cases. Very likely the actual hiring-manager chain for this DWH Team role, and the highest information-value contact of the five.
**Status:** VERIFIED currently at Tabby.

**1. Connection request (draft, ~198 chars):**
> Hi Maksim, I just applied for the Data Engineer role on the DWH Team. I read about the 2-petabyte warehouse and feature store you built on GCP, exactly the kind of DWH work I'd love to help scale.

**2. Follow-up message (after connection accepted):**
> Hi Maksim, thanks for connecting. I applied for the Data Engineer role on the DWH Team, and what stood out most was your build-out of the 2-petabyte warehouse and real-time feature store on GCP. I've built something at a smaller scale in my current role: 20+ automated ETL pipelines processing millions of transactions monthly, plus a Snowflake data warehouse I provisioned as infrastructure-as-code with Terraform. I'm also actively looking to relocate to Dubai, so Tabby's GCC base is a real draw, not just the role. If you have 15 minutes, I'd value hearing what the DWH team is prioritising right now, whether that's cost optimisation, governance, or something else. Thanks, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for taking the time, Maksim. Hearing how you approached the metadata layer to make the feature store trustworthy for ML use cases gave me a much better sense of what "DWH done right" looks like at Tabby's scale. Really appreciate the conversation, and hope we stay in touch either way.

---

## Contact 2 - Peer: [Data Engineer / DWH Engineer / Analytics Engineer - PLACEHOLDER, verify on LinkedIn]

**Search:** `site:linkedin.com/in "Tabby" ("Data Engineer" OR "Analytics Engineer" OR "DWH") -"Head of" -jobs`, plus check Tabby's LinkedIn company "People" tab filtered to Data Platform/Data Engineering titles, and Maksim Zolotarev's visible connections/team as a route to find his direct reports.
**Why:** A second, more directly-titled peer for hiring-process detail and day-to-day texture the JD and Maksim's public profile don't cover.
**Status:** PLACEHOLDER - do not send until a real, currently-employed name is confirmed.

**1. Connection request (draft, ~187 chars):**
> Hi [Name], I just applied for the Data Engineer (DWH Team) role at Tabby. I'd love to connect with someone building the warehouse day to day on Tabby's stack (Airflow/dbt/BigQuery/GCP).

**2. Follow-up message (after connection accepted):**
> Hi [Name], thanks for connecting. I applied for the Data Engineer role on the DWH Team and I'm curious what a typical week looks like building out the warehouse, especially balancing new pipeline work against cost optimisation and data quality. My background is 20+ ETL/EL pipelines in Python and SQL, a Snowflake warehouse provisioned with Terraform, and PySpark work in Databricks. I'm also looking to relocate to Dubai, so Tabby's GCC base is a genuine draw for me. Would you have 15 minutes to talk through what the hiring process and day-to-day actually look like. Thanks for considering it, Dhruv

**3. Thank-you note (post-conversation):**
> Thank you for walking me through [specific detail], [Name]. It gave me a much clearer picture of how the DWH team prioritises work, and I'll carry that into the rest of the process. Appreciate the time, and hope to stay in touch regardless of outcome.

---

## Contact 3 - Senior: Arpit Jain, Head of Analytics, Tabby (Dubai)

**LinkedIn:** linkedin.com/in/arpit-jain-a3a92a105
**Why:** Senior data leadership at Tabby, ex-noon and ex-Flipkart, over a decade in e-commerce/fintech analytics. One level up from the day-to-day DWH build but sets strategic direction for how the business consumes data. Lower response likelihood given seniority, so sequenced last and framed as pure curiosity, not a job ask.
**Status:** VERIFIED currently at Tabby.

**1. Connection request (draft, ~205 chars):**
> Hi Arpit, I applied for the Data Engineer role on Tabby's DWH Team. Curious how Analytics and the DWH team work together at Tabby's scale, coming from noon/Flipkart into fintech. Would love to connect.

**2. Follow-up message (after connection accepted):**
> Hi Arpit, thanks for connecting. I applied for the Data Engineer role on the DWH Team, and I'm curious about your view moving from e-commerce analytics at noon and Flipkart into fintech at Tabby, what changed most about how the data function needs to operate. I'm a Data Engineer in Melbourne building ETL pipelines and a Snowflake warehouse, and I'm also looking to relocate to the GCC. If you ever have five minutes, I'd value hearing how Analytics and the DWH team's roadmaps line up. No pressure either way, thanks for reading this. Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for taking the time to reply, Arpit. [Reference the specific point Arpit made] gave me a much clearer picture of how Tabby's data organisation thinks about analytics and the warehouse together, and I appreciate you engaging directly. Hope to speak again down the line.

---

## Contact 4 - Recruiter: Anastasija Konoreva, Senior Talent Acquisition Partner, Tabby (Dubai)

**LinkedIn:** ae.linkedin.com/in/konoreva
**Why:** Senior Talent Acquisition Partner at Tabby, more likely than the Head of Talent Acquisition to be working individual technical reqs like this one directly. Best first stop for process and timeline questions.
**Status:** VERIFIED currently at Tabby. Backup name if she isn't the right req owner: Alexandre Corbin, Head of Talent Acquisition at Tabby (linkedin.com/in/alexandre-corbin-774340115), also verified current at Tabby.

**1. Connection request (draft, ~207 chars):**
> Hi Anastasija, I just applied for the Data Engineer (DWH Team) role at Tabby and wanted to connect directly. I'm a Data Engineer already looking to relocate to the GCC, genuinely excited about this one.

**2. Follow-up message (after connection accepted):**
> Hi Anastasija, thanks for connecting. I applied for the Data Engineer role on the DWH Team and wanted to introduce myself directly. I'm a Data Engineer at PI Data Analytics in Melbourne, building 20+ ETL pipelines and a Snowflake data warehouse on Terraform, and I'm actively looking to relocate to Dubai or the wider GCC, so this role and Tabby's HQ location are a genuine fit for me, not just a box to tick. Could you let me know what the process and rough timeline look like for this role, and whether there's anything about relocation logistics I should be thinking about early. Thanks for your time, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for the update, Anastasija, I really appreciate you walking me through the process. I'm genuinely excited about the role and the move to Dubai, and I'll keep an eye out for next steps.

---

## Contact 5 - Peer: Marwan Ashraf, Senior Risk Data Analyst, Tabby (Dubai/UAE)

**LinkedIn:** ae.linkedin.com/in/marwan-ashraf-
**Why:** Verified current Tabby employee on the data side of the business. Honest caveat: he consumes the DWH's output for risk analytics rather than building it, so this conversation is framed around culture and how the warehouse serves analysts day to day, not DWH build specifics.
**Status:** VERIFIED currently at Tabby.

**1. Connection request (draft, ~185 chars):**
> Hi Marwan, I'm a Data Engineer applying to Tabby's DWH Team. Would love to connect with someone on the data side to hear how risk analytics uses what the warehouse delivers day to day.

**2. Follow-up message (after connection accepted):**
> Hi Marwan, thanks for connecting. I just applied for the Data Engineer role on Tabby's DWH Team, and I'm curious how risk analytics teams like yours actually use the warehouse day to day, what makes a dataset easy versus painful to work with. I'm currently a Data Engineer in Melbourne building 20+ ETL pipelines and a Snowflake warehouse on Terraform, and I'm also looking to relocate to Dubai, so getting a real read on how the DWH team supports analysts like you would help me understand the role better. Would you have 15 minutes for a quick chat, or happy to send a couple of questions async if that's easier. Thanks, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for making time to chat, Marwan. Hearing how your team flags a bad handoff from the warehouse before it hits a risk model was genuinely useful context, and it's given me a clearer sense of what the DWH team needs to get right. Really appreciate it, and hope to stay in touch either way.

---

## Phase 5 - Outreach strategy (week by week)

```
Week 1: Recruiter (Anastasija Konoreva) + Peer (Marwan Ashraf) - establish presence, low-pressure
Week 2: Manager (Maksim Zolotarev) + Peer (placeholder, once confirmed) - deeper engagement
Week 3: Senior (Arpit Jain) - only after initial conversations, respectful curiosity, no ask
```

Rules applied:
- Every message personalized to a specific detail (Maksim's public 2-petabyte GCP warehouse/feature store build, Arpit's noon/Flipkart-to-fintech path, Anastasija's role in Tabby's talent org, Marwan's position as a real data-side consumer of the DWH).
- The relocation-to-GCC angle is surfaced honestly wherever it strengthens the message (especially with the recruiter), never overstated as already arranged.
- Follow up ONCE after 5-7 business days if no response, never a second follow-up.
- Thank-you sent within 24 hours of any real conversation.
- No referral ask in any first message, referral conversation only considered after a genuine exchange and only if it comes up naturally.
- The placeholder peer contact must be confirmed as a real, current Tabby employee via LinkedIn before any message is sent. If no confirmed name is found by the time outreach starts, skip that slot rather than send to an unverified name.

## Phase 6 - Tracking

| Person | Persona | Status | Date Sent | Response | Follow-Up Date | Notes |
|--------|---------|--------|-----------|----------|----------------|-------|
| Maksim Zolotarev | Manager | Not sent | | | | Highest hiring influence, send week 2 |
| [Data Engineer/DWH/Analytics Eng - TBD] | Peer | Not sent | | | | Placeholder, verify name first |
| Arpit Jain | Senior | Not sent | | | | Send last, week 3 only |
| Anastasija Konoreva | Recruiter | Not sent | | | | Confirm she owns this req; backup: Alexandre Corbin |
| Marwan Ashraf | Peer | Not sent | | | | Adjacent role (Risk Data), framed as culture/process peer |

---

*All messages above are drafts only. Nothing is sent automatically. Review via `/review-outreach`, verify each person is still current at Tabby on LinkedIn, then send manually.*
