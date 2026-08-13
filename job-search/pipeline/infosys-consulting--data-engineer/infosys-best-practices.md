# How a great Data Engineer operates — best-practice principles (Infosys)

> This is the "how the role *should* behave" doc. If they ask "how do you approach building a pipeline?", "what makes a pipeline production-grade?", or "how do you ensure data quality?" — these are the principles that separate a senior engineer from someone who just writes scripts. Each one: **the principle → why it matters → how you show it (your example / the line to say).**
>
> **The one-sentence philosophy:** a data engineer's job isn't to move data — it's to deliver **trustworthy** data **reliably**, so people can make decisions on it without checking it by hand.

---

## 1. Documentation — "keep the docs fresh"
**Principle:** every pipeline has current docs: what it does, its sources, schedule, owner, dependencies, and a **runbook** (what to do when it breaks). Docs are updated *as part of* changing the pipeline, not later.
**Why:** in consulting you hand work over. A pipeline nobody but you understands is a liability, not an asset. Fresh docs = the work survives you.
**Your line:** "On the refresh app I keep the documentation current alongside the code, so anyone on the team can run or fix a client's refresh without me. Docs going stale is how pipelines rot."

## 2. Data governance
**Principle:** clear ownership of each dataset; **least-privilege access** (people/systems get only what they need); PII/sensitive data identified and handled per policy; a **catalogue** so people can find data; **retention & archiving** rules (what's kept, for how long, what's archived); compliance (privacy law) respected.
**Why:** governance is what makes data trustworthy *and* legal to use. Consulting clients care a lot about this.
**Your line:** "I standardised submission and naming conventions across 13 regions so there's one governed intake, and the refresh app archives automatically on a defined policy rather than ad-hoc."

## 3. Validation robustness — data quality gates
**Principle:** validate at ingestion and fail loudly. Layered checks: **schema/type**, **row & column counts**, **null/range**, **uniqueness** (no dupes), **referential integrity** (keys match), and **reconciliation** against source totals. Bad data is **quarantined and alerted**, never silently passed downstream.
**Why:** the whole point of a pipeline is that people *trust* the output without re-checking. One bad number that reaches a report destroys that trust.
**Your line:** "My validation layer on the 6M-row pipeline does row/type/column-consistency checks, drops stray columns, logs discrepancies and emails the client and internal teams *before* anything hits a report. I'd rather block a run than ship a wrong number."

## 4. Reliability & idempotency
**Principle:** a pipeline can be re-run safely (idempotent — no duplicates), handles failures with **retries + backoff**, **checkpoints** so it resumes rather than restarts, and copes with **late or partial data**.
**Why:** pipelines fail (network, source delays). Production-grade means it recovers without a human babysitting it.
**Your line:** "I design writes to be idempotent so a re-run doesn't double-load, and the incremental refresh uses a watermark so late data is picked up cleanly."

## 5. Observability — monitoring, logging, alerting, freshness SLAs
**Principle:** you know when a pipeline fails *or is late*, without a user telling you. Structured logging, failure alerts, and a **freshness SLA** ("this data is never more than X hours old").
**Why:** the worst failure is a silent one — stale data that looks fine. Observability turns "someone noticed the dashboard was wrong" into "we were paged and fixed it first."
**Your line:** "The pipeline emails discrepancies automatically, so failures surface to the right people immediately rather than being discovered downstream."

## 6. Reproducibility & version control
**Principle:** everything in **Git** (code, config, even infra as code); environments separated (**dev/staging/prod**); config-driven rather than hard-coded; anyone can rebuild it.
**Why:** reproducible = debuggable, auditable, and safe to change.
**Your line:** "The whole refresh app is in Git with branching and change history, and my cloud platform build used Terraform and Docker across dev/staging/prod so environments are reproducible."

## 7. Testing & CI/CD
**Principle:** transforms have **unit tests**; there are **data tests** (quality checks in the pipeline); changes go through automated **build → test → deploy**, with prod behind an approval gate; secrets live in a secret store, never in code.
**Why:** it lets you change pipelines *fast without breaking them* — essential at consulting pace.
**Your honest line:** "I work Git-first and understand the CI/CD shape — lint and test on push, deploy through environments with approval. Owning a full GitHub Actions pipeline end to end is where I want to go deeper."

## 8. Incremental & cost-aware design
**Principle:** prefer **incremental** loads over full reloads; **partition** data sensibly; be aware of **compute/storage cost**; don't scan what you don't need.
**Why:** full reloads on 6M+ rows are slow and expensive; good engineers design for scale and cost.
**Your line:** "The refresh app supports full *and* incremental refresh — incremental by watermark so we only process changed rows, which is what keeps it fast at scale."

## 9. Security
**Principle:** least-privilege access, **secrets managed** (vault/CI store, not in code or notebooks), encryption in transit and at rest, no PII in logs.
**Why:** a breach or leaked credential can end a client relationship.
**Your line:** honest — "I follow least-privilege and keep credentials out of code; deeper security tooling I'd lean on the client's platform standards."

## 10. Modularity, standards & maintainability
**Principle:** reusable components over copy-paste, consistent naming, one standard applied across clients. DRY (don't repeat yourself).
**Why:** consulting = many similar pipelines; standards make them maintainable by a team, not heroes.
**Your line:** "I documented the categorisation work into a *reusable* pipeline now used across client accounts, rather than a one-off per client."

## 11. Lineage & auditability
**Principle:** you can trace any number back to its source (**data lineage**), and there's an audit trail of what ran when.
**Why:** when a stakeholder asks "where did this figure come from?", you can answer. Trust again.
**Your line:** "Because ingestion, validation and transformation are all logged and standardised, I can trace a figure on a dashboard back through the pipeline to the source file."

## 12. Stakeholder communication & handover
**Principle:** set expectations (SLAs), explain trade-offs in plain language, and hand over cleanly (docs + runbook).
**Why:** a technically perfect pipeline no one can operate or trust has failed.
**Your line:** the refresh app *is* this — turning a specialist task into a one-click, documented operation the whole team can run.

---

## If they ask "what makes a pipeline production-grade?" — the 60-second answer
"For me it's five things: it's **reliable** (idempotent, retries, recovers on its own), it's **validated** (quality gates so bad data never reaches a report), it's **observable** (I'm alerted on failure or staleness, not the user), it's **reproducible** (in Git, config-driven, environment-separated), and it's **documented** so the team can run it without me. A script becomes a pipeline when you can trust it unattended."

## The shared core (same principles carry to Data Science)
Documentation, validation/data-quality, reproducibility, monitoring, version control, and stakeholder communication are role-agnostic — they're just as central to a data scientist. See the 7-Eleven `7-eleven-best-practices.md` for the DS-specific version.
