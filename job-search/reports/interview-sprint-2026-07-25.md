# Interview Sprint — Infosys (Mon 4 PM) + 7-Eleven (Tue 12 PM)

> Built **Sat 25 Jul, 2:00 PM** (Australia/Melbourne). Two interviews, ~50h and ~70h out. All times below are Melbourne local. Tick each block. **Infosys is first AND least-prepped → it front-loads the weekend.** 7-Eleven prep is already deep (see its folder), so it needs rehearsal, not a rebuild.

## The two targets
| Interview | When | Type | State of prep | Focus |
|-----------|------|------|---------------|-------|
| **Infosys — Data Engineer** | **Mon 4:00 PM** | Technical, first round | Resume ready; prep docs built today | Master resume + map the 5 recruiter points; study CI/CD + MLOps gaps |
| **7-Eleven — Data Scientist (Pricing)** | **Tue 12:00 PM** | Round 2 deep-dive | Deep prep already exists | Rehearse hero stories; drill A/B + pricing case |

## Guiding rule for both
Master the JD and master the resume so you can **explain every line and connect it to every requirement.** Think out loud, name your tools, be honest about gaps.

---

## SATURDAY 25 Jul — Infosys foundation (from 2:00 PM)
- [ ] **2:00–2:30** — Read the Infosys `jd.md`, `interview-prep.md`, and this schedule end to end.
- [ ] **2:30–3:30** — **Resume mastery** (Infosys `interview-prep.md` §2): read `resume-tailored.md` line by line. For every bullet say *problem → what you built → tools → number*, out loud.
- [ ] **3:30–4:30** — **Map the 5 points** (§1 table): cover the right column, say your example for each of SQL / Python pipelines / CI-CD / MLOps / Power BI. Repeat until automatic.
- [ ] **4:30–5:00** — Break.
- [ ] **5:00–6:15** — **Gap A: DevOps CI/CD + GitHub** (`concepts-glossary.md` §CI/CD). Understand CI vs CD, pipeline stages, GitHub Actions, and your honest bridge line word-for-word.
- [ ] **6:15–7:00** — Dinner.
- [ ] **7:00–8:00** — **Gap B: MLOps / LLMOps** (glossary §MLOps/§LLMOps). Versioning, drift, retraining, RAG, guardrails + your real AI/hackathon work. Nail the honest-boundary line.
- [ ] **(optional) 8:00–8:30** — Recap the 8 fast-recall Qs at the bottom of the glossary.
- [ ] **Anytime today** — **Chase the recruiter** for written confirmation + joining link for Mon 4 PM (still unconfirmed).

## SUNDAY 26 Jul — Infosys drills AM · 7-Eleven PM
**Morning — Infosys technical drills**
- [ ] **9:00–10:00** — **Advanced SQL** drills (glossary §SQL). Write from scratch: MoM growth (`LAG`), top-N per group (`ROW_NUMBER`), 2nd-highest (`DENSE_RANK`), dedupe-keep-latest, a running total.
- [ ] **10:00–11:00** — **Databricks / PySpark** refresh (glossary §PySpark): Spark model, DataFrame API, lazy eval, pandas-vs-Spark, and your VCDI story cold.
- [ ] **11:00–11:30** — **Power BI / BI** talking points (glossary §BI): star schema, Power Query, a DAX measure, import vs DirectQuery. Tie to DoT Power BI + 16+ Tableau dashboards.
- [ ] **11:30–12:00** — **Infosys mock** — ask Claude to fire technical questions at you (SQL + pipelines + CI/CD + MLOps).

**Afternoon — 7-Eleven**
- [ ] **1:00–2:00** — Read 7-Eleven `interview-prep.md` + `recruiter-brief-prep.md`. Rehearse **Story A (A$2M)** and **Story B (A$12B classifier)** out loud, timed ~90s each.
- [ ] **2:00–3:00** — 7-Eleven technical Q&A (`interview-prep.md` §4) + a few SQL window-function problems.
- [ ] **3:00–4:00** — **Experimentation / A-B deep-dive** (§7 — the 7-Eleven gap): Type I/II, power, p-value, geo/switchback tests, promo-lift. Until automatic.
- [ ] **4:00–5:00** — **Pricing case** practice (§5) on 2 prompts (e.g. coffee, fuel). Reason out loud with the framework.

**Evening**
- [ ] **7:00–8:00** — 7-Eleven behavioural bank (§6) once aloud + your 3 questions to ask. Then Infosys "challenge you overcame" story.

## MONDAY 27 Jul — INFOSYS DAY (interview 4:00 PM)
- [ ] **9:00–10:00** — Infosys: re-read §1 (5-point table) + §2 (resume mastery) + the two gap-bridge lines (§3). Say each mapping aloud.
- [ ] **10:00–10:45** — Say your 5 prepared examples + "challenge overcome" out loud.
- [ ] **11:00–11:30** — Final SQL warm-up (`LAG` MoM + `ROW_NUMBER` top-N) + PySpark quick pass.
- [ ] **11:30–12:00** — Polish 3–4 questions to ask Infosys (§6).
- [ ] **1:00–2:00** — Light recap, then **rest** (don't cram past this).
- [ ] **3:30** — Logistics: joining link/location confirmed, resume copy open, water, quiet space, calm.
- [ ] **➡️ 4:00 PM — INFOSYS INTERVIEW.**
- [ ] **~5:15** — Jot notes while fresh (what they asked, what to sharpen for future rounds) into the Infosys `log.md`.

## MONDAY EVE → TUESDAY — 7-ELEVEN DAY (interview 12:00 PM)
- [ ] **Mon 7:30–8:30 PM** — 7-Eleven: re-read §1, §2 (domain), Stories A/B/C, and the two gap lines (retail domain + A/B). Light — you prepped this all weekend.
- [ ] **Tue 9:00–9:45 AM** — Say your 5 examples + the pricing-case framework aloud.
- [ ] **Tue 9:45–10:15** — Experimentation gap final pass.
- [ ] **Tue 10:15–10:45** — 3–4 questions to ask + the Fuel Price Lock curiosity line.
- [ ] **Tue 11:00–11:30** — Re-read §1 + hero stories; logistics (Richmond — confirm in-person vs video).
- [ ] **➡️ Tue 12:00 PM — 7-ELEVEN INTERVIEW.**

---

## Priority triage if time gets short
1. **Infosys resume mastery + the 5-point mapping** (non-negotiable — it's a technical round with no JD).
2. **7-Eleven Stories A & B**, said cold and connected (their explicit feedback last round).
3. **Infosys SQL drills** (most likely live-coded).
4. **7-Eleven A/B + pricing case** (their known probe area).
5. CI/CD + MLOps concepts (bonus points on Infosys) / 7-Eleven domain depth.

## Standing reminders
- Both are **honest-gap** situations. Infosys: CI/CD depth + formal MLOps. 7-Eleven: retail/fuel domain + formal A/B. In both, the winning move is "here's what I've genuinely done → here's what I'd grow into," never a bluff.
- Confirm both logistics (Infosys link unconfirmed; 7-Eleven Richmond in-person vs video).
