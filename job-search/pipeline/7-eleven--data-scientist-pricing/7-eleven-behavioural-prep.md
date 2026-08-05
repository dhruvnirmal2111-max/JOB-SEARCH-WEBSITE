# 7-Eleven - Behavioural Interview Prep

> Round two is behavioural. The panel's emphasis: a **fast-moving team, multiple projects at once, and quick deadlines**. So lead with stories that prove you deliver under exactly that. Use **STAR** (Situation, Task, Action, Result), keep each answer ~90 seconds, and **always land the result with a number**. Golden rule: be concise and structured, they are as much testing "can this person communicate clearly under pressure" as the content.

---

## PART 0 - The meta-signal to hit all interview
They want to know you can **run several things at once, prioritise well, move fast, and still land quality**. Every answer should quietly reinforce: *I own it, I prioritise, I move, I deliver, I communicate.* Don't wait to be asked "can you handle pace", prove it in how you tell the stories (crisp, structured, outcome-first).

---

## PART 1 - YOUR 7 CORE STORIES (memorise the shape, not a script)

### Story A - "The Juggle" (multiple projects + competing deadlines) — YOUR #1 STORY HERE
- **S/T:** One week I had four things live at once: a big product-catalogue build, a smaller bill-of-materials analysis, an urgent supplier tender evaluation, and a deliverable a teammate needed from me.
- **A:** I triaged by urgency, effort and impact. Did the **tender evaluation first** (urgent and short, unblocked the client), knocked out the BOM next for momentum, **delegated** the teammate piece with clear context so it didn't sit on me, and protected focused time for the big catalogue build at the end.
- **R:** Everything landed on time, the client's negotiation went ahead on schedule, and the catalogue shipped clean. Rule I work by: small-and-urgent first for momentum, protect the big deliverable, delegate what doesn't need me.
- *Answers: competing deadlines, prioritisation, working under pressure, fast pace, time management.*

### Story B - "The Save" (tight deadline, high stakes, move fast)
- **S/T:** We were about to lose a five-year government client. Before their end-of-financial-year panel they said our spend categorisation wasn't good enough, and I was brought in to fix it fast on a ~A$12B, ~20-million-row book.
- **A:** Moved quickly but structured: Pareto to verify the high-value head as a trusted base, then built a one-vs-all classifier for the long tail, cleaned messy invoice text hard, aimed for high precision with a manual-review threshold so nothing auto-labelled was wrong.
- **R:** The panel signed off, we **kept the client, and they re-signed the contract**. Delivered under a hard deadline without cutting corners on quality.
- *Answers: tight deadline, pressure, high-impact, ownership, delivering fast.*

### Story C - "The Ambiguous Brief" (structure from nothing)
- **S/T:** A restaurant-group client said "we know we're leaking money on supply costs, we don't know where." No dataset, no brief.
- **A:** I structured it myself: built a ~3,000-item product catalogue as the foundation, tracked unit price like-for-like at SKU level so pack-size changes didn't fool me, benchmarked against market to tell a bad deal from a real cost rise, and surfaced it by category, venue and supplier.
- **R:** Flagged an over-market supplier; the client took it into a renegotiation and realised close to **A$2M**. I turned a vague hunch into a number they acted on.
- *Answers: ambiguity, no fully-formed requirements, initiative, ownership, creating structure.*

### Story D - "The Mozzarella" (communicating to non-technical people)
- **S/T:** I had to get a non-technical procurement client to trust and act on a complex margin analysis.
- **A:** I anchored on one item they knew, **mozzarella**: showed the raw invoice, the quantity, the unit price, then walked step by step how the unit price had crept, adjusted for pack size, and how the dashboard showed that same number moving across venues.
- **R:** Walking one familiar example end to end is what made them trust the numbers enough to take into a negotiation. I always translate data into the stakeholder's language, not mine.
- *Answers: stakeholder communication, influence, explaining technical work, building trust.*

### Story E - "The Mistake" (failure + what you learned)
- **S/T:** Early on I shipped a client refresh where a source had quietly changed a column, and a downstream number came out wrong.
- **A:** I caught it, owned it with the client immediately, fixed the report, then **hardened the validation** to check column consistency and alert on any mismatch, so it couldn't happen silently again.
- **R:** That validation is now standard across my pipelines. The lesson: build the check the moment something surprises you, and never hide a mistake, fix it and fix the system.
- *Answers: failure, mistake, learning, attention to detail, honesty.*

### Story F - "The Stretch" (learning fast / growth)
- **S/T:** I was hired as a data analyst, but the team was small and needed more than dashboards.
- **A:** I taught myself the ML side on the job, pushed us from pure reporting toward modelling, and grew the role into data science, delivering the classifier and forecasting work.
- **R:** I now own five enterprise clients end to end. I'd rather learn a new domain or skill than stay in my lane, and I move fast on it.
- *Answers: learning quickly, initiative, growth, "biggest weakness / growth area", why-you.*

### Story G - "The Lead" (ownership + helping the team)
- **S/T:** Refreshing each client's data was a manual, specialist task that tied up our whole small team.
- **A:** I built and maintain a self-service app across all 26 client accounts, one-click ingestion, validation and refresh, all in Git with current documentation so anyone can run it.
- **R:** Turned a specialist job into a button any teammate can press, on track to save ~10 hours per person a month. I look for the thing that unblocks the whole team, not just me.
- *Answers: ownership, leadership, initiative, teamwork, impact, going beyond the role.*

---

## PART 2 - QUESTION to STORY MAP (know which story to reach for)

| Question | Lead with | Backup |
|---|---|---|
| Juggling multiple projects / competing priorities | **A (Juggle)** | G (Lead) |
| Tight deadline / worked under pressure | **B (Save)** | A |
| Fast-paced environment / move quickly | **B (Save)** | A |
| Ambiguous problem / unclear requirements | **C (Ambiguous)** | A |
| Explain something technical to non-technical | **D (Mozzarella)** | - |
| A failure / mistake | **E (Mistake)** | - |
| Learned something quickly / stepped up | **F (Stretch)** | G |
| Leadership / ownership / initiative | **G (Lead)** | F |
| Conflict / disagreement | see Part 3 | - |
| Difficult stakeholder | **D**, then how you handled pushback | C |

---

## PART 3 - STANDARD QUESTIONS (tight model answers)

**"Tell me about yourself."**
> "I'm a data scientist at a Melbourne analytics consultancy. I was hired as an analyst two years ago, but on a lean team I pushed us toward modelling and grew into data science. I own five enterprise clients end to end, framing the problem, building the model or pipeline, and presenting to senior stakeholders. The work I'm proudest of is commercial: a pricing and margin analysis that fed about A$2M in savings. I'm drawn to this role because fuel pricing is a genuinely hard, high-impact data problem, and I like moving fast across several things at once, which is how I already work."

**"How do you prioritise when everything is urgent?"** to Story A, plus the rule: "urgency, effort and impact; small-urgent first for momentum, protect the big one, delegate what doesn't need me, and communicate timelines early so nothing surprises anyone."

**"A time you disagreed with a colleague or manager."**
> "On a pricing recommendation, an account manager disagreed with what my analysis suggested. I didn't dig in; I showed the trade-off in numbers, listened to their on-the-ground context (a local factor the data hadn't caught), and we agreed to test it rather than argue. Being right matters less than getting to the right answer, and often that means letting the data settle it."

**"Biggest weakness / growth area."**
> "Formal software-engineering depth like production CI/CD and MLOps, my hands-on there is my own projects, not a big platform team. I've done the concepts and I ramp fast, and it's exactly what I want to grow into. I keep it honest rather than overclaiming."

**"Why 7-Eleven / why this role?"**
> "Two reasons. Fuel pricing is a hard, high-impact problem, tiny moves swing volume, and it's real commercial analytics, which is the work I love. And it's a fast team owning multiple things, which is how I already operate. I want to go deep on pricing and product analytics, and this is exactly that."

**"Where do you see yourself / what do you want to grow into?"** to "Deeper in pricing and product data science, and stronger on the production-engineering side. I want to keep being the person who turns an ambiguous commercial question into a number the business acts on, at bigger scale."

**"A time you got tough feedback."** to Story E framing: took it on board, fixed the immediate thing, and changed the system so it wouldn't recur.

---

## PART 4 - DELIVERY (this is half the score in a behavioural)
- **Be concise.** ~90 seconds per story. They're testing communication under pressure, rambling reads as "can't handle pace."
- **Structure out loud:** "Situation was X, my job was Y, so I did A, B, C, and the result was Z." Signposting sounds senior.
- **Lead or end with the number.** A$2M, kept the client, 75 minutes, ~12-15 hrs/week. Numbers make it real.
- **Show pace and ownership** in the telling: "I triaged", "I owned it", "I moved fast", "I delegated". Those verbs are the signal they want.
- **Pause before answering** a hard one: "Good question, let me think of the best example." Better than a rushed start.
- **Have 2-3 questions ready** (below).

## PART 5 - QUESTIONS TO ASK THEM
- "What does a typical fortnight look like on the team, how many things is an analyst usually running at once?"
- "How does the team balance moving fast with getting pricing decisions right?"
- "What separates someone who thrives here from someone who struggles?"
- "What's the biggest pricing or analytics problem you want cracked in the next year?"
- "What would a strong first three to six months look like?"

## The one line to carry in
Every answer should quietly say: **I own it, I prioritise, I move fast, I deliver, and I tell you the number.** That is the fast-team, multiple-projects, tight-deadline signal they're screening for.
