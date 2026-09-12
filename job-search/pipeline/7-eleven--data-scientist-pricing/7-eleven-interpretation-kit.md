# 7-Eleven - Interpretation Kit (read any result and say something smart)

> Second rounds love "here's a chart / a table / a test result / a model output, what do you make of it?" They are testing whether you can turn numbers into a **decision**. The trick is one repeatable framework, then knowing what to look for in each type of output. Golden rule: **describe what you see, explain why it might be, say what it means for the business, then what you'd check next.**

---

## PART 0 - The universal framework (use it on ANY output)
Say these four beats out loud, in order:
1. **What I see** - describe the pattern plainly, with the number. ("Revenue is up 8% but only at metro sites.")
2. **Why it might be** - one or two plausible drivers. ("Could be the promo, or just more foot traffic from the holiday.")
3. **So what** - the business implication. ("If it's the promo, it's worth scaling; if it's seasonal, it isn't.")
4. **What I'd check next** - the test or data that settles it. ("I'd compare against control sites with difference-in-differences to separate the promo from the season.")

That four-beat answer works on a chart, a table, a metric, or a model. It makes you sound like a decision-maker, not a describer.

---

## PART 1 - Reading a chart / trend
- **Describe it first:** direction (up/down/flat), size (how much), and where (which segment, which time).
- **Look for:** a trend, seasonality (a repeating shape), an outlier or spike, a level shift (a step change at a point in time), and whether segments differ.
- **Always ask:** compared to what? A number with no baseline or comparison is meaningless. "Up 8%" versus last month, last year, or a control group?
- **Correlation trap:** two lines moving together is a hypothesis, not proof. Name a possible **confounder** (a hidden third cause). "Ice cream and drownings both rise, because it's summer."
- **Say:** "It's trending up, mostly at metro sites, with a step change in July. That step lines up with the price change, so my first hypothesis is the price move, but I'd rule out the school holidays with a control group before I believe it."

---

## PART 2 - Reading an A/B test result
Four things, in order:
1. **Effect size** - how big is the difference? (The thing that actually matters.)
2. **Significance (p-value / confidence interval)** - is it real or could it be noise? p < 0.05, or the confidence interval doesn't cross zero.
3. **Practical significance** - is it big enough to matter commercially? A statistically significant 0.1% lift can be useless. **Always separate "real" from "worth it."**
4. **Guardrails and validity** - did anything else move (did we win conversions but lose margin)? Was the test run long enough (novelty effect)? Was the split clean?
- **Say:** "Treatment lifted basket 4%, the confidence interval is clearly above zero so it's not noise, and 4% is commercially meaningful. But I'd check the margin guardrail held and that it ran long enough to beat the novelty effect before rolling out."
- **Trap to avoid:** never call a result good on significance alone. Significant + big enough + guardrails intact.

---

## PART 3 - Reading model metrics (short version)
- **Classification:** don't trust accuracy on imbalanced data; ask for precision, recall and the confusion matrix. High AUC but weak precision/recall means the ranking is fine and the **threshold** is wrong.
- **Regression/forecast:** MAE/RMSE/MAPE, and always "compared to a **baseline**." A number alone means nothing; beat the seasonal-naive.
- **Overfit tell:** great on training, poor on test.
- **Say:** "92% accuracy on a rare event is a red flag, not a win; show me recall and the confusion matrix." (Full detail in the diagnose-and-improve sheet.)

---

## PART 4 - Reading a regression output (coefficients)
If they show a fitted model table:
- **Sign:** does the direction make sense? (Price up, volume down = sensible. The opposite = suspicious, probably a confounder.)
- **Magnitude:** how much does the outcome move per unit of the driver? "Each 1c price rise is linked to X fewer litres."
- **Significance:** is that coefficient trustworthy (p-value / confidence interval), or could it be zero?
- **Careful:** a regression coefficient is an **association**, not proof of cause, unless it came from an experiment. Say that.
- **Say:** "The price coefficient is negative and significant, which fits, higher price links to lower volume. But this is observational, so I'd confirm the size with a geo test before acting on the exact number."

---

## PART 5 - Reading a summary table / describing data
- **Centre:** mean vs median. If they differ a lot, the data is **skewed**; trust the median.
- **Spread:** standard deviation or the range. Big spread = inconsistent.
- **Outliers:** a max far above the rest drags the mean; flag it.
- **Missing data:** how much, and is it missing randomly or in a pattern?
- **Say:** "The mean basket is well above the median, so a few big spenders are pulling it up; I'd report the median for a typical customer and look at the top tail separately."

---

## PART 6 - The phrases that make you sound senior
- "Compared to what?" (always demand a baseline or a control.)
- "Is that difference real, and is it big enough to matter?" (significance vs practical.)
- "That's a correlation; what could be the confounder?" (causation discipline.)
- "What decision does this change?" (ties analysis to action.)
- "I'd want to see it by segment, the average is probably hiding the story." (averages mask; segments reveal.)
- "How would I confirm it caused the outcome? A controlled test." (always close on how to prove it.)

---

## PART 7 - The one habit that wins this
Never stop at describing the number. Every time, push to **so what** and **what I'd check next**. Describers get a polite nod; people who turn a number into a decision and a next test get hired. Four beats, every time: **see it, explain it, say why it matters, name the check.**
