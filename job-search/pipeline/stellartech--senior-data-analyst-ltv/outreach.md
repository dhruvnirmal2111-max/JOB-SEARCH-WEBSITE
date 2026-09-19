# Outreach Plan - StellarTech - Senior Data Analyst (LTV / Predictive Analytics)

Track A (reactive, tied to a live posting). All messages below are DRAFTS ONLY. The owner reviews via `/review-outreach` and sends manually. Before sending anything, verify each named person still currently works at StellarTech on LinkedIn.

## Company identification note (read first)

"StellarTech" is a common company name and this search hit real name-collision risk. There are at least three unrelated real entities also called "Stellar Tech" / "StellarTech": Stellartech Research Corporation (medical-device manufacturer, California, CEO Roger A. Stern), Stellar Tech / stellar.io (influencer-marketing platform, CEO Cathy Pill, CPO Andre Kilz, acquired IROIN in Germany), and several unrelated "Stellar Technology(ies)" IT/sensor/cloud firms. **None of those are this target.**

The target company is the B2C mobile EdTech publisher at **stellartechapps.com** (Crunchbase lists it in Nicosia, Cyprus; day-to-day team appears based in Limassol, Cyprus, with some leadership remote in Amsterdam and Prague), running subscription study/learning apps plus a "Creative Producer Bootcamp" for performance-marketing hires. This matches the JD's description (B2C mobile EdTech publisher, subscription apps, in-app monetization, performance marketing at scale) closely enough, and I cross-checked live job postings for it (Senior Data Analyst, Head of BI & Analytics, Chief Data Officer, Senior Recruiter, IT Service Manager) that match the JD's stack/team language. **Confidence: moderate-to-good that this is the correct company** (multiple independent sources converge on the same org, several people list `@stellartechapps.com` email addresses), but I could not access the company's own site or LinkedIn company page directly (network egress to those domains was blocked in this environment), so treat every name below as needing a final manual LinkedIn check, not a confirmed fact. Do not confuse with the other "Stellar Tech" companies above when searching.

## Phase 1 - Role context (from jd.md)

- **Company:** StellarTech - B2C mobile publisher in EdTech (subscription apps, in-app monetization, performance marketing at scale).
- **Role:** Senior Data Analyst, LTV/Predictive Analytics. Owns and evolves the live LTV prediction algorithm (research/predictive work, not reporting - reporting is already automated by Data Engineering). Reports to the "Head of Operational Department"; partners with Product, UA, Finance, Data Engineering.
- **What makes this role distinct:** SQL is the primary prototyping tool for testing new LTV parameters/factors before Data Engineering productionises them; the analyst is judged on forecast accuracy (MAE/RMSE/MAPE/R2) and on running a research loop end to end, from a vague question to a documented recommendation for Product/UA/Finance.
- **Stack signals:** Amazon Athena, S3-based DWH, CatBoost, Tableau, Git, Jupyter.
- **Personalization angle for Dhruv:** the Prophet demand-forecasting engagement (external regressors, 12.5-14% error margin, validated against held-out actuals) maps directly onto "own the forecast, validate it, explain where it deviates." The A$12B classifier (logistic regression, factor engineering, precision/recall/F1) shows model-quality judgment. MyFacit is the closest product/unit-economics credential (revenue, cost, margin, payback for a subscription-style product), used honestly as an analogue, not a claim of mobile-app LTV/CAC/ARPU/cohort experience, which he does not have and is not claiming.

## Phase 2 & 3 - 5 ranked targets

Scoring: Relevance to role (30%) + Response likelihood (25%) + Information value (25%) + Hiring influence (20%).

| # | Name / Title | Persona | Verification | Score | Search query |
|---|---|---|---|---|---|
| 1 | **Ilya Karol**, VP, Platform and Data Engineering, StellarTech (Amsterdam) | Manager | VERIFIED currently at StellarTech (RocketReach StellarTech management/org-chart listing; corroborated by an independent RocketReach contact-card citing the same title). **Not a literal match for the JD's "Head of Operational Department"** - flagged as the closest confirmed data-leadership figure the analyst would hand LTV logic to, not necessarily the direct line manager. Confirm on LinkedIn before treating as the hiring manager. | 8.3 | `site:linkedin.com/in "StellarTech" ("Head of Operational Department" OR "Head of Analytics" OR "Head of BI")`, and separately `Ilya Karol StellarTech VP Data Engineering` on LinkedIn |
| 2 | **Svetlana Kuleshova**, Data Analyst, StellarTech (Limassol) | Peer | VERIFIED currently at StellarTech (RocketReach contact record ties her directly to a `@stellartechapps.com` address; 5 years in "insights discovery and business growth") | 7.8 | `Svetlana Kuleshova StellarTech` on LinkedIn (linkedin.com/in/lana-kuleshova) |
| 3 | **[Daniil Shindin - NAME UNRELIABLE, treat as placeholder]** | Peer | **DO NOT SEND without independent re-verification.** His LinkedIn tag reads "StellarTech" and one search pass described him as a senior data analyst (ex-OZON.ru) based in Cyprus, but a second pass on the same name returned an unrelated bio (Computer Vision/NLP/LLM background, ex-Lamoda/Checklens/Handl) - almost certainly two different people or a stale/merged listing. Search results conflicted enough that I am not confident this is one real, currently-employed StellarTech analyst. | 5.5 | `site:linkedin.com/in "StellarTech" ("Data Analyst" OR "Product Analyst" OR "Senior Data Analyst")` filtered to Limassol/Cyprus, cross-checked against StellarTech's LinkedIn company "People" tab |
| 4 | **Natalia Malamut**, Senior Tech Recruiter / Talent Acquisition Partner, StellarTech | Recruiter | VERIFIED currently at StellarTech (her own LinkedIn headline: "Experienced Talent Acquisition Partner / Tech recruiter (ex Miro)"; bio explicitly describes full-cycle hiring for product/engineering/data roles "in a fast-growing EdTech environment") | 7.5 | `Natalia Malamut StellarTech` on LinkedIn (linkedin.com/in/natalia-malamut-48726491) |
| 5 | **Andrey Chygarkin**, CTO, StellarTech (Prague) | Senior | VERIFIED currently at StellarTech (own LinkedIn profile lists StellarTech; RocketReach lists him leading a 34-person IT/Engineering department as CTO) | 6.4 | `Andrey Chygarkin StellarTech CTO` on LinkedIn (linkedin.com/in/andreychigarkin) |

Why each persona:
1. **Manager - Ilya Karol** - highest hiring influence and information value: he leads the Data Engineering org the analyst hands prediction logic to, so he can speak directly to how that handoff works and what "good" looks like technically. Flagged because the JD names a different manager title ("Head of Operational Department") that I could not independently confirm by name; verify who the actual hiring manager is before leaning on this contact for a referral.
2. **Peer 1 - Svetlana Kuleshova** - an actual Data Analyst inside StellarTech, best source for day-to-day texture (what "own the LTV algorithm" looks like week to week, what the hiring bar feels like).
3. **Peer 2 (Daniil Shindin, unreliable)** - kept in the ranked list rather than silently dropped so the owner can see the lead exists, but explicitly marked do-not-send until re-verified by hand; the fallback search query above should be used to find a confirmed second peer if this name does not check out.
4. **Recruiter - Natalia Malamut** - explicitly recruits for product/engineering/data roles at StellarTech per her own bio; best first stop for process and timeline.
5. **Senior - Andrey Chygarkin (CTO)** - sets technical direction across Engineering/Data at StellarTech; lower response likelihood given seniority, so sequenced last, framed as pure curiosity.

**Verification summary: 4 of 5 contacts verified as currently at StellarTech through at least two independent signals each (Ilya Karol, Svetlana Kuleshova, Natalia Malamut, Andrey Chygarkin). The manager slot is a confirmed StellarTech data leader but not a confirmed match to the JD's exact "Head of Operational Department" title. 1 of 5 (second peer) is unreliable and must not be sent until re-confirmed by hand on LinkedIn - do not invent a replacement name; use the fallback search query.**

---

## Contact 1 - Manager: Ilya Karol, VP Platform and Data Engineering, StellarTech (Amsterdam)

**LinkedIn search:** `Ilya Karol StellarTech VP Data Engineering`
**Why:** Leads the Data Engineering org this role hands LTV logic to once it is validated. Highest hiring influence and information value of the five, even though he may not be the literal line manager named in the JD ("Head of Operational Department") - confirm that separately before assuming a referral path through him.
**Status:** VERIFIED currently at StellarTech. Confirm his exact reporting relationship to this specific role before sending.

**1. Connection request (draft, 231 chars):**
> Hi Ilya, I just applied for StellarTech's Senior Data Analyst (LTV) role. I build and validate forecasting models for a living and would love to connect with someone who owns the platform that logic eventually lands on.

**2. Follow-up message (after connection accepted):**
> Hi Ilya, thanks for connecting. I applied for the Senior Data Analyst role because the JD's framing, find the factors that move the forecast in SQL, validate the gain, then hand the logic to Data Engineering, is close to how I already work: I built a Prophet forecasting model with external regressors that held within a 12.5 to 14% error margin, validated against held-out actuals, before it went into a production dashboard. I'd be genuinely interested in how that handoff works in practice on your side, what makes a proposed change to the LTV logic easy versus painful for the platform team to take on. If you have 15 minutes for a quick chat, or would rather point me to whoever owns that relationship day to day, either is very welcome. Thanks for your time, Dhruv

**3. Thank-you note (post-conversation):**
> Thank you for making time to talk this through, Ilya. Hearing how the platform team decides what's worth productionising versus what stays a one-off SQL prototype was genuinely useful, and it's sharpened how I'd approach the first few months in the role. Appreciate the conversation, whichever way this goes.

---

## Contact 2 - Peer: Svetlana Kuleshova, Data Analyst, StellarTech (Limassol)

**LinkedIn:** linkedin.com/in/lana-kuleshova
**Why:** A working Data Analyst inside StellarTech - the best source for what "own the LTV algorithm" actually looks like week to week, and for honest color on the hiring process.
**Status:** VERIFIED currently at StellarTech.

**1. Connection request (draft, 224 chars):**
> Hi Svetlana, I just applied for the Senior Data Analyst (LTV) role at StellarTech. I come from a forecasting and unit-economics background and would love to connect with someone doing analytics work there day to day.

**2. Follow-up message (after connection accepted):**
> Hi Svetlana, thanks for connecting. I applied for the Senior Data Analyst role focused on the LTV prediction algorithm, and I'm curious what a typical week looks like when you're testing a new factor or segment against the forecast, how much of that lives in SQL versus getting handed to Data Engineering. My background is forecasting and model validation (a Prophet model I built held within a 12.5 to 14% error margin against actuals) plus owning unit economics end to end for a subscription-style product I run on the side, so I'm genuinely curious how that translates onto a live, high-volume LTV model. Would you have 15 minutes to talk through it, or happy to send a couple of questions async if that's easier. Really appreciate any time you can spare, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks so much for the chat, Svetlana. Your point about how a forecast can look accurate in aggregate but be wrong for the segment that actually matters is exactly the kind of thing I want to get good at here, and I'll be thinking about it through the rest of the process. Hope we can stay in touch either way.

---

## Contact 3 - Peer: [Daniil Shindin - VERIFY, do not send until re-confirmed]

**Search:** `site:linkedin.com/in "StellarTech" ("Data Analyst" OR "Product Analyst" OR "Senior Data Analyst")`, filtered to Limassol/Cyprus, cross-checked against StellarTech's LinkedIn company "People" tab. If Daniil Shindin's LinkedIn profile, once opened directly, clearly shows current StellarTech employment as a data analyst/scientist, use it; if it shows an unrelated background (computer vision/NLP, ex-Lamoda), treat it as a mismatch and use this search to find a real second peer instead.
**Why:** A second peer for hiring-process detail and day-to-day texture a single contact can't fully cover.
**Status:** UNRELIABLE - two search passes on this name returned conflicting bios. Do not send any message to this name without opening the actual LinkedIn profile and confirming (a) current StellarTech employment and (b) an analytics/data title, first.

**1. Connection request (draft, 190 chars, template - confirm name/title first):**
> Hi [Name], I'm applying for StellarTech's Senior Data Analyst (LTV) role and would love to connect with someone doing similar analytics work there day to day.

**2. Follow-up message (after connection accepted, template):**
> Hi [Name], thanks for connecting. I just applied for the Senior Data Analyst role focused on the LTV prediction algorithm, and I'm curious how the team decides which factors are worth testing next versus which ones turn out to be noise. My background is forecasting and model validation, plus owning unit economics for a subscription-style product I run myself. Would you have 15 minutes to talk through what the first few months in this role tend to look like. Really appreciate any time you can spare, Dhruv

**3. Thank-you note (post-conversation, template):**
> Thank you for walking me through how the team scopes a new factor to test, [Name]. That gave me a much clearer picture of the day-to-day, and I'll be thinking about it through the rest of the process. Hope we can stay in touch regardless of how it goes.

---

## Contact 4 - Recruiter: Natalia Malamut, Senior Tech Recruiter / Talent Acquisition Partner, StellarTech

**LinkedIn:** linkedin.com/in/natalia-malamut-48726491
**Why:** Her own profile describes full-cycle hiring across product, engineering and data roles at StellarTech's EdTech business - the natural first stop for process and timeline on this exact req.
**Status:** VERIFIED currently at StellarTech.

**1. Connection request (draft, 189 chars):**
> Hi Natalia, I just applied for the Senior Data Analyst (LTV) role at StellarTech and wanted to connect directly. I'd love to learn more about the team and the process.

**2. Follow-up message (after connection accepted):**
> Hi Natalia, thanks for connecting. I applied for the Senior Data Analyst role focused on owning and evolving the LTV prediction algorithm. My background is forecasting and model validation, a Prophet demand-forecasting model that held within a 12.5 to 14% error margin against actuals, plus SQL-heavy analytics work and unit-economics ownership for a subscription-style product I run myself. I know the role calls for 4+ years and I'm coming in a little under that on paper, so I wanted to be upfront about it rather than let it sit unaddressed; happy to talk through why I still think the analytical depth is there. Could you let me know what the process and timeline typically look like for this role. Thanks for your time, Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for the update, Natalia, I appreciate you taking the time to walk me through the process. I'm genuinely excited about the role and will keep an eye out for next steps.

---

## Contact 5 - Senior: Andrey Chygarkin, CTO, StellarTech (Prague)

**LinkedIn:** linkedin.com/in/andreychigarkin
**Why:** Sets technical direction across Engineering and Data at StellarTech, including, plausibly, how much the company invests in analytics/ML tooling around the LTV model. Lower response likelihood given seniority, so sequenced last and framed as pure curiosity, never a job ask.
**Status:** VERIFIED currently at StellarTech.

**1. Connection request (draft, 217 chars):**
> Hi Andrey, I applied for StellarTech's Senior Data Analyst (LTV) role. I'm genuinely curious how the team balances SQL-prototyped analytics work against a more automated ML pipeline for LTV. Would love to connect.

**2. Follow-up message (after connection accepted):**
> Hi Andrey, thanks for connecting. I applied for the Senior Data Analyst role, and what stood out most in the JD was that SQL is the primary prototyping tool for new LTV factors before anything gets handed to Data Engineering, rather than everything living in a heavier ML pipeline from day one. I work this way myself, prototype fast, validate against held-out data, then only formalise what earns it, most recently on a demand-forecasting model that held within a 12.5 to 14% error margin. If you ever have five minutes, I'd be curious what convinced the team to keep that SQL-first research loop rather than pushing earlier into something like CatBoost end to end. No pressure either way, and thanks for reading this. Dhruv

**3. Thank-you note (post-conversation):**
> Thanks for taking the time to reply, Andrey. [Reference the specific point Andrey made] gave me a much clearer picture of how the team thinks about that trade-off, and I really appreciate you engaging directly. Hope to speak again down the line.

---

## Phase 5 - Outreach strategy (week by week)

```
Week 1: Recruiter (Natalia Malamut) + Peer 1 (Svetlana Kuleshova) - establish presence, low-pressure
Week 2: Manager (Ilya Karol) + Peer 2 (once Daniil Shindin is re-verified, or a replacement is found) - deeper engagement
Week 3: Senior (Andrey Chygarkin) - only after initial conversations, respectful curiosity, no ask
```

Rules applied:
- Every message personalized to a specific detail (Ilya's Data Engineering platform ownership, Svetlana's day-to-day analyst seat, Natalia's own hiring scope, Andrey's technical-direction role) and grounded in Dhruv's real forecasting/unit-economics background, not invented app-LTV experience.
- The seniority gap (JD wants 4+ years, Dhruv has roughly 2 full-time) is named honestly rather than hidden, specifically in the recruiter message, since she is the one who will screen against that requirement.
- Follow up ONCE after 5-7 business days if no response; never a second follow-up.
- Thank-you sent within 24 hours of any real conversation.
- No referral ask in any first message; referral conversation only considered after a genuine exchange, and only if it comes up naturally.
- Contact 3 (second peer) must be independently re-verified as a real, current StellarTech analyst before any message is sent to that name; if the lead does not check out, skip that slot rather than send to an unverified name.
- Given the company-name collision risk flagged above, re-run each LinkedIn search query at send time and confirm the profile references stellartechapps.com / the EdTech mobile-apps business, not one of the unrelated "Stellar Tech" companies.

## Phase 6 - Tracking

| Person | Persona | Status | Date Sent | Response | Follow-Up Date | Notes |
|--------|---------|--------|-----------|----------|----------------|-------|
| Ilya Karol | Manager | Not sent | | | | Confirm he's the relevant hiring-adjacent leader, not just Data Engineering |
| Svetlana Kuleshova | Peer | Not sent | | | | |
| [Daniil Shindin - VERIFY] | Peer | Not sent | | | | Do not send until re-confirmed on LinkedIn; conflicting search data |
| Natalia Malamut | Recruiter | Not sent | | | | |
| Andrey Chygarkin | Senior | Not sent | | | | Send last, week 3 only |

---

*All messages above are drafts only. Nothing is sent automatically. Review via `/review-outreach`, verify each person is still current at StellarTech on LinkedIn (and that their profile clearly ties to stellartechapps.com, not an unrelated "Stellar Tech" company), then send manually.*
