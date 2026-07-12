# Resume, Cover Letter & Writing Style — Owner Preferences

> **Read this every time you tailor a resume, cover letter, or application writeup** (resume-intelligence agent / generate-resume / quick-apply / revise-resume). These are the owner's distilled preferences, learned from real review cycles. Honour them by default; only deviate if the owner says so for a specific application.

## Principles (the reasons behind everything below)

Role-agnostic. Future roles will differ in their specifics (title, domain, archetype); the reasoning holds. When a concrete rule below doesn't obviously apply to a new role, fall back to these.

1. **Decode the role before writing a word.** Understand what the company does, *why this req exists*, and *who they actually want* (the archetype). Everything downstream serves that read. A resume that answers "why are they hiring" beats one that just lists skills.
2. **Tailor to the archetype and lead with its #1 proof.** Find the single strongest signal for that role's archetype and surface it at the top (summary + top of the current role), never buried. Different role -> different archetype -> different lead.
3. **Sound like a human, not a keyword sheet.** Don't echo the JD's phrasing back (reads AI-generated and try-hard). Plain, confident, specific. The point is to *prove* fit, not to mirror the posting.
4. **Select evidence by relevance, not flashiness.** Choose the projects/bullets that prove fit for THIS role even if they're less "impressive"; cut redundant or off-target ones; bring in the heavyweight work (big clients, real adoption) when it serves the archetype.
5. **Prove fit; don't apologise for gaps.** In outward materials (cover letter, writeups) lead with strengths and frame transferable experience as a direct fit. Handle genuine gaps honestly where it actually matters (resume skills, interview), never as a disclaimer that undercuts you.
6. **Credibility signals make claims believable.** Real-world use, adoption, scale, named stakeholders, and outcomes. Surface traction (a tool in production/pilot, used by a real business or team) not just the build.
7. **Truthful always; flag judgment calls.** Align titles only to a truthful generic discipline; never fabricate. When a choice is the owner's (displayed title, an inferred number), surface it rather than deciding silently.
8. **Presentation is part of the deliverable.** Clean, professional formatting is not optional: justified text, no cramming, clickable LinkedIn/GitHub (and project) links, a one-page cover letter at full size with breathing room. A strong candidate who looks sloppy loses.
9. **Keywords matter, but second.** Shape the resume by the "why" and the archetype first, then do a keyword pass for ATS. Both, in that order.
10. **The owner's voice and preferences are the source of truth.** When the owner corrects something, record it here so it's never re-litigated, and apply it across every future role.

## Header / contact line (every CV)
- The contact line (directly under the name) MUST include a **clickable GitHub hyperlink and a clickable LinkedIn hyperlink**, written as markdown links so the PDF renders them clickable: e.g. `Melbourne, Australia | email | phone | [LinkedIn](<url>) | [GitHub](<url>)`. The PDF builder turns `[label](url)` into a real hyperlink.
- Owner's URLs (use these on every CV): LinkedIn `https://www.linkedin.com/in/dhruv-nirmal-data`, GitHub `https://github.com/dhruvnirmal2111-max`.

## Voice
- Write like a human, not a keyword sheet. Plain, concrete, confident.
- **Do NOT echo the JD's phrasing back verbatim.** Mirroring the posting's exact buzzwords (e.g. "AI-first", "past experimentation, into building", "intuition to evidence", "single point of contact") reads as AI-generated and "matchy-matchy." Say the same thing in the owner's own words.
- **No em dashes. No hyphen-as-sentence-punctuation** ("word - word"). Use commas, colons, full stops. Hyphens only for compound words (client-facing, end-to-end) and numeric/date ranges (12.5-14%, Feb 2022 to Dec 2023). Use "to" for date ranges.

## Professional summary (the opening paragraph) — the part most scrutinised
- **Write the summary in the first person ("I ...").** The owner prefers it personal, not the implied-subject "Does X, builds Y" voice, which reads mechanical. The summary is the one place first person is used; experience/project bullets stay implied-subject (no "I").
- **Paint a picture of the archetype the role is hiring for.** It should make the reader feel "this is the person we need" before any number.
- **Lead with what the owner does / who they are. Do NOT open with tenure** ("X years of..."). Years of experience does not go first.
- **At most one or two of the BIGGEST numbers** (e.g. ~A$2M, ~A$12B). Keep smaller metrics (hours saved, % counts, account counts) OUT of the summary — they make it busy and unprofessional. Detailed metrics live in the bullets.
- Hit the main things the role hires for. For client/consulting roles that means: independent client ownership, framing ambiguous problems, gathering the right information, translating analysis into plain language for non-technical stakeholders, and a genuine technical base underneath.

## Structure & selection
- **Decode the role first** (what they do, why they're hiring, who they want), then hand-pick evidence to that read. See the agent's Phase 0.
- **Name the employer type** when it strengthens the fit (e.g. "a data & analytics consulting firm serving enterprise clients").
- **Surface the strongest archetype signal at the TOP of the current role**, not buried in a bullet. E.g. independent ownership of multiple client accounts is a lead context line, not bullet #6.
- **Pick projects by relevance to THIS JD**, not by how flashy or AI-heavy they are. Drop weak or off-target bullets; include analytics/decision-support and domain-adjacent work even if it's less "impressive" on paper.
- Be selective: a tight set of strong, relevant bullets beats an exhaustive list.
- **Order bullets by relevance to the archetype.** Lead the current role with the bullets that match the target role (analyst / data-science / stakeholder work first); push engineering-sounding bullets lower. The first two bullets set the reader's impression of *what you are*, so don't let them read "data engineer" for an analyst/DS role.
- **Detune verbs that mis-signal the archetype.** E.g. "own the end-to-end data pipeline" reads data-engineer; use "manage the end-to-end data". Same facts, right signal.

## Resume length (1 vs 2 pages)
- With under ~5 years of experience, **default to a 1-page resume for straightforward, BAU, junior or analyst roles**. Keep a **2-page** version for senior, consulting, or data-science-depth roles where the extra depth is the selling point. It's fine to maintain both variants in the folder.
- When condensing to 1 page: cut the oldest/least-relevant role (e.g. early research roles like TBRL), drop or one-line the Projects section, merge weaker bullets, and trim education detail. Build with `--max-pages 1`. ~9.5 to 10.5pt is fine; do not cram below ~9.5pt, trim content instead.

## Recruiter reach-outs & adapting an existing resume
- **Recruiter-sourced reach-out** (a recruiter messages directly asking for a resume + call times): the deliverable is the tailored resume plus a short, personal reply (`recruiter-reply.md`) with a few availability slots. Do NOT write a formal cover letter or run 5-contact outreach — the recruiter is the channel. If the company isn't named, use a `confidential-...` folder and note it; rename once disclosed.
- **Adapting an existing resume** (owner says "work from the X resume for this JD"): work from that file, retarget it, don't regenerate from scratch. Retarget the summary, re-order and re-emphasise bullets/skills for the new archetype, and strip the previous role's company-specific framing (e.g. remove "Quantium"/"financial services" when moving to a pricing role).

## Remote / distributed roles
- When the role is remote or hybrid, explicitly highlight the strengths that de-risk remote work: **proactive, clear written communication, async updates, and thorough documentation** of methods, decisions and handovers. The owner deliberately over-communicates and over-documents on remote work, so make that visible (in the summary and/or a bullet, e.g. "keep clear written documentation and proactive updates so distributed teams and clients stay aligned"). Only do this for genuinely remote/hybrid roles, not co-located ones.

## Titles
- **Target the ACTUAL posting title** — it can differ from the body text (e.g. posting says "Data Scientist (Consulting)" while the body says "Analyst"). Confirm and use the real one.
- Align the **displayed** current-role title to the JD's generic discipline only when truthful (e.g. Data Engineer -> Data Scientist when the work genuinely supports it). The master files keep the real title.
- **Name the PDF to match the target role** (Dhruv_Nirmal_<Company>_<Role>.pdf).

## Cover letter
- **One page, always — full size and roomy, never shrunk-to-fit or cramped.** Build with `--max-pages 1 --para-space 12` so paragraphs are clearly separated. If it won't fit at full size, cut content (don't shrink the font).
- **Four tight paragraphs, no bullet list:** (1) the role + why it fits how the owner works; (2) the strongest proof, with a named client/outcome; (3) the building/technical edge; (4) a positive "why this company" that frames transferable experience as a direct fit.
- **Prove fit, lead with strengths. No disclaimers** ("I'm not from <domain>", "I don't have <skill>") — they undercut the candidate. Frame transferable methods as direct fits instead.
- **Letterhead matches the resume:** name + contact line with clickable LinkedIn/GitHub. Keep the recipient block on one line so paragraph spacing doesn't stretch it.
- Same voice and dash rules as the resume; first person.
- Output a PDF alongside the resume: `Dhruv_Nirmal_<Company>_CoverLetter.pdf`.

## Short application writeups (e.g. "why is this a top choice", < N characters)
- Human and specific, in the owner's voice; lead with the genuine differentiators (independent client ownership, building with AI in production, real outcomes). Count characters against the limit. No disclaimers, no JD-echoing.

## Always
- **Flag judgment calls to the owner** (e.g. displayed-title alignment vs. the real title, an inferred metric) rather than deciding silently.
- **Truthful only.** Never fabricate experience or metrics. Name honest gaps (e.g. no production R) rather than hiding them.
- **Attribute tools and outcomes to the right work.** Never imply a tool was used for work it wasn't, or that one project produced another's result. Examples caught in review: a summary that trailed "in Python, SQL and Databricks/PySpark" after the pricing/ML savings, implying those were built in Databricks/PySpark (they were Python/SQL; Databricks/PySpark was a separate VCDI project); and tying the ~A$2M restaurant-chain figure to the Tableau/Power BI builds. Check every summary and bullet for this conflation and keep tools/impacts with the project that actually earned them.
- **Never invent project specifics.** Use only facts in `projects.md` or explicitly confirmed by the owner. Agents have embellished (e.g. inventing "14 suppliers", "POS/wages", "menu engineering", "multi-tenant" for MyFacit). Revert any detail the owner hasn't confirmed.
