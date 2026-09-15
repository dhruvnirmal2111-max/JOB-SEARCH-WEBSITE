# How a great Data Scientist operates — best-practice principles (7-Eleven)

> The "how the role *should* behave" doc. If they ask "how do you approach a modelling problem?", "how do you make sure a model is any good?", or "how do you deploy a model responsibly?", these principles mark a mature data scientist. Each: **the principle → why it matters → how you show it (your example / the line to say).**
>
> **The one-sentence philosophy:** a data scientist's job isn't to build models — it's to **change a decision** with evidence, and to be honest about how much to trust that evidence.

---

## 1. Frame the problem before touching a model
**Principle:** understand the business decision first, then define a **success metric tied to that decision**. Don't model for its own sake.
**Why:** the most common failure is a technically good model that answers the wrong question.
**Your line:** "On the pricing engagement the brief was just 'our costs feel high'. I scoped it into testable questions and defined what a useful answer looked like before building anything."

## 2. Baseline first, simplest thing that works
**Principle:** always compare against a **naive baseline** (e.g. 'same as last week'); reach for the simplest model that solves it before anything fancy.
**Why:** if you can't beat the baseline, the model isn't earning its place; complexity you don't need is risk you don't need.
**Your line:** "I benchmark forecasts against a seasonal-naive baseline — the Prophet model has to beat 'same period last year' to justify itself."

## 3. Rigorous validation — no data leakage
**Principle:** proper **train/validation/test** split; **cross-validation**; **time-based splits** for time series (train on past, test on future); actively guard against **leakage** (no future info or target-derived features sneaking in).
**Why:** leakage produces amazing offline scores that collapse in production. Honest validation is the difference between a model that works and one that only looks like it does.
**Your line:** "I validate with cross-validation and split by time where it's temporal, and I check no feature secretly encodes the target — leakage is the silent killer of models."

## 4. Match the metric to the problem
**Principle:** pick the metric that reflects the business cost. **Precision/recall/F1** (not accuracy) under class imbalance; **WMAPE/RMSE** for forecasts; choose the decision **threshold** by the cost of false positives vs negatives.
**Why:** the wrong metric optimises the wrong thing — e.g. 99% accuracy on an imbalanced problem is useless.
**Your line:** "On the A$12B classifier I used precision/recall/F1, not accuracy, because the classes were heavily imbalanced, and I set the threshold on the business cost of a wrong category vs a miss."

## 5. Reproducibility & experiment tracking
**Principle:** version the **data, code, and model**; set seeds; log experiments (params, metrics) — a model registry / MLflow in a mature setup.
**Why:** if you can't reproduce a result, you can't trust or improve it.
**Your line:** "I documented the classifier into a repeatable pipeline with the parameters and process captured, so it can be retrained and reused rather than rebuilt from memory."

## 6. Experimentation rigor (causal thinking)
**Principle:** to prove a change *caused* an outcome, run a controlled experiment — **A/B test** (or **geo/switchback** when you can't randomise per customer, like pricing). Define primary + **guardrail** metrics, size the test up front (**power, MDE**), and avoid **peeking / p-hacking**.
**Why:** correlation isn't causation; without a proper test you can't claim your model made money.
**Your line:** "For a price change I'd validate with a geo or switchback test against matched control stores, with guardrails so a margin win isn't quietly killing volume." *(This is also your honest growth area — see the experimentation block in the glossary.)*

## 7. Monitor for drift; models decay
**Principle:** a deployed model degrades as the world changes (**data drift / concept drift**). Monitor live performance and **retrain** on a trigger.
**Why:** a model that was great at launch can quietly become wrong.
**Your line:** "I treat a model as something you maintain, not ship-and-forget — monitor accuracy on live data and retrain when it drifts, like moving the classifier from TF-IDF to embeddings as the data grew."

## 8. Interpretability & stakeholder trust
**Principle:** for high-stakes decisions, favour models you can **explain**; be able to tell a non-technical stakeholder *why* the model says what it says.
**Why:** people won't act on a black box they don't trust — and pricing/commercial decisions need buy-in.
**Your line:** "I lean toward interpretable models like logistic regression where the coefficients are explainable levers, which matters when a category manager has to trust and act on the output."

## 9. Responsible / trustworthy AI (esp. LLMs)
**Principle:** watch for **bias/fairness**, protect PII, and for LLM/GenAI features build an **evaluation set**, add **guardrails**, and keep a **human in the loop** on high-stakes outputs.
**Why:** shipping an unevaluated or biased model is a real business and ethical risk.
**Your line (your ace):** "In MyFacit I built a gold evaluation set to measure LLM accuracy and a human-in-the-loop confirmation gate on high-stakes fields, which doubles as live monitoring and new labels. I'm deliberate about evaluating AI outputs before they ship."

## 10. Communicate to the business — the model only matters if it changes a decision
**Principle:** translate the technical result into a decision and a dollar impact, in plain language.
**Why:** insight that doesn't reach or move a decision-maker is wasted.
**Your line:** "My pricing analysis wasn't a model in a notebook — it fed directly into supplier negotiations and about A$2M in savings. That's the only scoreboard that counts."

## 11. Iterate — ship small, learn, improve
**Principle:** get a simple version in front of stakeholders fast, then improve, rather than perfecting in a vacuum.
**Why:** early feedback beats a big-bang model that misses the need.
**Your line:** "I'd rather get a testable v1 and a hypothesis in front of the team quickly, then improve, than spend a month on a model no one's validated the need for."

## 12. Garbage in, garbage out — own the data quality
**Principle:** a model is only as good as its inputs; validate and understand the data before modelling.
**Why:** most model failures are data failures.
**Your line:** "I come from a data-engineering background, so I check the data quality first — most modelling problems are really data problems."

---

## If they ask "how do you know a model is good?" — the 60-second answer
"Three layers. **Offline:** honest validation — cross-validation, time-based splits, no leakage, and the right metric for the business cost, always beating a simple baseline. **Online:** does it actually move the business metric, ideally proven with a controlled test, not just correlation. **Over time:** monitor for drift and retrain, because models decay. And underneath all of it, the data has to be trustworthy — garbage in, garbage out."

## The shared core (same principles as Data Engineering)
Framing, validation, reproducibility, monitoring, documentation, and stakeholder communication are role-agnostic. The DE version (pipelines, data quality, governance) is in the Infosys `infosys-best-practices.md` — worth a read since 7-Eleven also values engineering rigor in a DS.
