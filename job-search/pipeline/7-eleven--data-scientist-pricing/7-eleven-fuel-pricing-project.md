# 7-Eleven Fuel Pricing Optimisation - Full Project + 1-Hour Panel Defence

> A realistic, end-to-end 7-Eleven fuel-pricing data-science project, built to survive a one-hour technical assessment with a five-person panel. It is grounded in the genuine problem: Australian petrol **price cycles** ("rockets and feathers"), **station-choice elasticity** relative to nearby competitors, the shop **basket** attached to a fill-up, and 7-Eleven's distinctive **Fuel Price Lock** app feature. Contains the business framing, data model, full SQL and PySpark and Python code, an elasticity model with a coefficient table, a demand forecast, a profit-optimisation step, a causal analysis of Price Lock, an experiment to validate, a production design, and the questions each of the five interviewers will ask with model answers. Golden rule throughout: **optimise total profit = fuel margin x volume + shop basket, and prove causation with a test.**

---

## 1. THE BUSINESS PROBLEM (say this in 60 seconds)

7-Eleven runs ~700 fuel sites in Australia inside a market with **price cycles**: pump prices rocket up over a day or two, then feather down over 2-4 weeks as sites undercut each other, then reset. Because drivers use price apps, **station choice is highly elastic**: a site's volume is driven by its price *relative to nearby competitors*, not the absolute price. Fuel is a thin-margin traffic driver; a lost fill-up also loses the **high-margin shop basket** (coffee, snacks). And 7-Eleven has **Fuel Price Lock**, where an app user locks a price for up to 7 days.

**The task:** recommend a daily pump price per site (per fuel grade) that **maximises total profit** across the network, responding to competitor moves and the cycle, **guardrailed** so we don't torch volume or breach a margin floor. Success is measured by **incremental profit versus current human pricing, proven by a controlled test**, not by a model metric alone.

**Why it's hard (name these):** the price-response is causal not correlational; the lever (board price) is seen by everyone so we can't A/B per customer; there's a margin-versus-volume tension plus the basket; and the cycle and competitors make the counterfactual moving target.

---

## 2. THE DATA MODEL (the tables I'd want)

```
dim_site(site_id PK, brand, lat, lon, region, site_type[metro/highway/regional],
         num_pumps, has_store, opened_date)

fact_fuel_sales(site_id, date, grade[U91/U95/U98/Diesel], litres, transactions,
                revenue, cost_of_goods)                      -- our volume + revenue

fact_pump_price(site_id, date, grade, our_price_cpl, changed_at)   -- our board price history

fact_competitor_price(comp_site_id, our_site_id, date, grade,
                      comp_price_cpl, distance_km)            -- scraped, nearest competitors

dim_terminal_gate_price(date, grade, tgp_cpl)                -- wholesale cost benchmark (TGP)

fact_price_lock(lock_id, customer_id, site_grade, lock_price_cpl, lock_date,
                redeemed_flag, redeemed_date, redeemed_litres)   -- app Fuel Price Lock

fact_shop_basket(txn_id, site_id, date, customer_id, bought_fuel[0/1],
                 basket_value, basket_margin)                -- links fuel visit to store spend

dim_calendar(date, dow, is_public_holiday, is_school_holiday)
fact_weather(site_id, date, temp, rainfall)
```

**Interview move if asked "what data do you need?":** "Our volume and revenue, our price history, competitor prices with distance, the wholesale TGP benchmark for cost, the linked shop basket, and the Price Lock events. The two that people forget are the **basket** (so I optimise total profit) and **TGP** (so I know the true margin and the cycle position)."

---

## 3. PHASE 1 - BUILD THE MODELLING TABLE (SQL + PySpark)

Goal: one row per site-grade-day with volume, our price, the competitor gap, cost/margin, cycle position, basket, and calendar/weather.

**Nearest-competitor price gap (SQL, window + join):**
```sql
-- weighted nearest-competitor price within 3km, closest weighted most
WITH comp AS (
  SELECT our_site_id, date, grade, comp_price_cpl, distance_km,
         ROW_NUMBER() OVER (PARTITION BY our_site_id, date, grade
                            ORDER BY distance_km) AS rn
  FROM fact_competitor_price
  WHERE distance_km <= 3
)
SELECT our_site_id, date, grade,
       AVG(comp_price_cpl) AS comp_avg_3km,
       MIN(comp_price_cpl) AS comp_min_3km
FROM comp
WHERE rn <= 5                       -- up to 5 nearest competitors
GROUP BY our_site_id, date, grade;
```

**Assemble the model table (PySpark on Databricks):**
```python
from pyspark.sql import functions as F, Window

sales = spark.table("gold.fact_fuel_sales")
price = spark.table("gold.fact_pump_price")
comp  = spark.table("gold.comp_gap")          # from the SQL above
tgp   = spark.table("gold.dim_terminal_gate_price")
cal   = spark.table("gold.dim_calendar")

df = (sales
  .join(price, ["site_id","date","grade"])
  .join(comp,  ["site_id","date","grade"], "left")
  .join(tgp,   ["date","grade"], "left")
  .join(cal,   ["date"], "left"))

# derived features
df = (df
  .withColumn("margin_cpl", F.col("our_price_cpl") - F.col("tgp_cpl"))          # true margin over wholesale
  .withColumn("price_gap",  F.col("our_price_cpl") - F.col("comp_avg_3km"))     # +ve = we're dearer
  .withColumn("rel_price",  F.col("our_price_cpl") / F.col("comp_avg_3km"))     # ratio for elasticity
  # cycle position: our price vs its own trailing 28-day min/max (proxy for where we are in the cycle)
  .withColumn("p28_min", F.min("our_price_cpl").over(
       Window.partitionBy("site_id","grade").orderBy("date").rowsBetween(-28,-1)))
  .withColumn("p28_max", F.max("our_price_cpl").over(
       Window.partitionBy("site_id","grade").orderBy("date").rowsBetween(-28,-1)))
  .withColumn("cycle_pos", (F.col("our_price_cpl")-F.col("p28_min"))
                          /(F.col("p28_max")-F.col("p28_min")+F.lit(1e-6)))     # 0=trough,1=peak
)
df.write.format("delta").mode("overwrite").saveAsTable("gold.fuel_model_table")
```
Narrate: "Medallion: raw to cleaned to this gold modelling table. The key engineered features are **margin over wholesale (TGP)**, the **competitor price gap**, and a **cycle-position** proxy from the trailing 28-day min-max. Windows shifted to exclude today so nothing leaks."

---

## 4. PHASE 2 - EDA (the relationships that matter)
Say what I'd look for, not just "I'd explore":
- **Volume vs price gap:** expect a steep downward slope, volume falls fast as we get dearer than local competitors (station-choice elasticity).
- **Price cycle:** our price and volume plotted over time should show the sawtooth; volume spikes at troughs.
- **Rockets and feathers:** our price rises faster than it falls after a TGP move, asymmetric response.
- **Basket by fuel visit:** fuel visits should carry a bigger basket than shop-only, quantifying the traffic-driver value.
- **Segment differences:** metro sites more elastic (denser competition) than regional.

---

## 5. PHASE 3 - ELASTICITY MODEL (regression + coefficient table)

The core causal-ish relationship: how does volume respond to our price relative to competitors? Log-log so coefficients read as elasticities, with **site fixed effects** to control for permanent site differences and controls for cycle, weather, calendar.

```python
import statsmodels.formula.api as smf, numpy as np
d = spark.table("gold.fuel_model_table").toPandas()
d = d[(d.litres>0)&(d.our_price_cpl>0)&(d.comp_avg_3km>0)]
d["log_litres"]     = np.log(d.litres)
d["log_our_price"]  = np.log(d.our_price_cpl)
d["log_comp_price"] = np.log(d.comp_avg_3km)

m = smf.ols("log_litres ~ log_our_price + log_comp_price + cycle_pos "
            "+ is_public_holiday + is_school_holiday + C(dow) + C(site_id)",
            data=d).fit(cov_type="cluster", cov_kwds={"groups": d.site_id})
```

**Coefficient table (the rows that matter):**

| term | coef | std err | t | P>|t| | [0.025 | 0.975] |
|---|---|---|---|---|---|---|
| log_our_price | -2.10 | 0.18 | -11.7 | 0.000 | -2.45 | -1.75 |
| log_comp_price | 1.55 | 0.16 | 9.7 | 0.000 | 1.24 | 1.86 |
| cycle_pos | -0.22 | 0.05 | -4.4 | 0.000 | -0.32 | -0.12 |
| is_public_holiday | 0.14 | 0.04 | 3.5 | 0.001 | 0.06 | 0.22 |

(site + dow fixed effects absorbed.) R-squared (within): 0.68

**Read it (four beats):**
1. "Own-price elasticity **-2.1**: a 1% price rise loses ~2.1% volume, highly elastic, exactly the station-choice story."
2. "Cross-price **+1.55**: when local competitors go up 1%, we gain ~1.5%. We're clearly competing head-to-head."
3. "cycle_pos negative: near the peak of the cycle, volume is a bit softer even controlling for price."
4. "Significant with tight intervals, clustered by site. But it's observational, elasticity could be confounded by us cutting price exactly when demand is soft, so I'd **confirm the number with a geo test** before optimising hard on it."

---

## 6. PHASE 4 - DEMAND MODEL FOR THE OPTIMISER (LightGBM)

The elasticity model is for insight; for the optimiser I want a flexible volume predictor I can query at candidate prices.
```python
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error
feats = ["our_price_cpl","comp_avg_3km","price_gap","cycle_pos","margin_cpl",
         "dow","is_public_holiday","is_school_holiday","temp","rainfall",
         "lag_litres_1","lag_litres_7","roll_litres_7"]
cut = d.date.max() - pd.Timedelta(days=28)
tr, te = d[d.date<=cut], d[d.date>cut]           # time-based split
model = lgb.LGBMRegressor(n_estimators=600, learning_rate=0.03, num_leaves=63)
model.fit(tr[feats], tr["litres"])
te = te.assign(pred=model.predict(te[feats]))
te["naive"] = te["lag_litres_7"]                  # seasonal-naive baseline
def wmape(y,yh): return np.sum(np.abs(y-yh))/np.sum(np.abs(y))
```

| model | WMAPE | MAE (litres/site/day) |
|---|---|---|
| Seasonal-naive | 13.5% | 720 |
| LightGBM | 7.6% | 395 |

Top features: `price_gap`, `comp_avg_3km`, `cycle_pos`, `lag_litres_7`. "Price gap being the top feature confirms the model has learned the station-choice effect."

---

## 7. PHASE 5 - THE OPTIMISER (turn predictions into a price)

For each site-grade-day, search candidate prices, predict volume at each, and pick the price that **maximises total profit** within guardrails.
```python
def recommend_price(site_row, model, feats, tgp, basket_per_fill,
                    min_margin_cpl=2.0, max_daily_move=4.0):
    best = None
    current = site_row["our_price_cpl"]
    for cand in np.arange(current-max_daily_move, current+max_daily_move+0.1, 0.5):
        row = site_row.copy()
        row["our_price_cpl"] = cand
        row["price_gap"]     = cand - site_row["comp_avg_3km"]
        row["margin_cpl"]    = cand - tgp
        vol = model.predict(row[feats].to_frame().T)[0]      # predicted litres
        if row["margin_cpl"] < min_margin_cpl:               # guardrail: margin floor
            continue
        fuel_profit  = (cand - tgp) * vol
        # each fill-up brings a basket; approximate fills from litres, add expected basket margin
        fills        = vol / 45.0
        basket_profit = fills * basket_per_fill
        total_profit = fuel_profit + basket_profit
        if best is None or total_profit > best["total_profit"]:
            best = {"price": cand, "vol": vol, "total_profit": total_profit}
    return best
```
Narrate the key design choices: "**Total profit, not fuel margin**, so I add the expected basket per fill. **Guardrails**: a margin floor and a max daily move so it can't do anything wild. And I'd cap how far below competitors we go. This produces a *recommendation* a pricing manager reviews, not an auto-set price, that human-in-the-loop matters commercially and politically."

---

## 8. PHASE 6 - THE FUEL PRICE LOCK ANGLE (the distinctive, senior bit)

Price Lock lets app users lock a price for 7 days. Two questions the panel will love:
1. **Does Price Lock actually change behaviour, or do we discount people who'd have bought anyway?** This is a **causal / selection** problem, lockers self-select (they're price-savvy), so a naive "lockers spend more" comparison is biased. The clean read is the **incremental** effect: compare lockers to a matched holdout of similar non-lockers (propensity-score matched on recency, frequency, app engagement), or better, a randomised offer of the lock feature. Metric: incremental fills and basket net of the margin given up by the locked price.
2. **Margin risk:** a lock is a free option for the customer, they use it when the market price rises above their lock (we lose), and ignore it when it falls (we don't gain). So I'd model the **expected cost of the option** given price-cycle volatility, and weigh it against the incremental loyalty/basket it drives.

"So Price Lock is a marketing lever with a real, quantifiable option cost, and the right way to value it is incremental profit from a matched or randomised comparison, not raw locker spend."

---

## 9. PHASE 7 - VALIDATE (the experiment, because causation)

The optimiser is a hypothesis until tested.
- **Design:** roll the recommended prices out at a **treatment set of sites**, hold a **matched control set** (matched on baseline volume, margin, competitor density, region; separated so they don't share customers), for 4-6 weeks.
- **Analysis:** **difference-in-differences** on total profit, the interaction term is the causal lift. Cluster SEs by site.
- **Guardrails/metrics:** primary = incremental total profit; guardrails = volume, market share, margin floor. Check parallel pre-trends. Run long enough to beat the novelty effect and cover a full price cycle.
- **Decision rule:** roll out network-wide only if incremental profit is significant and positive with guardrails intact.

---

## 10. PHASE 8 - PRODUCTIONISE (Databricks + MLflow)
- **Pipeline (Databricks Workflow):** daily job, ingest competitor scrape + TGP + sales via **Auto Loader** to Bronze, build the gold model table, score the optimiser, write recommendations to a table the pricing team's dashboard reads.
- **Idempotent + reliable:** Delta **MERGE** so a re-run is safe; validation (row counts, price sanity bounds) with alerts.
- **Model ops:** track the demand model in **MLflow**, register it, monitor **WMAPE and realised-vs-predicted volume** each day; retrain on drift (a new competitor, a cost regime shift).
- **Guardrails in production:** hard caps on price moves, a margin floor, and **human sign-off** before prices go live. Log every recommendation and outcome so we can keep measuring incremental profit, not just model error.

---

## 11. THE ONE-HOUR PANEL - 5 INTERVIEWERS, THEIR QUESTIONS + YOUR ANSWERS

### Interviewer 1 - Head of Fuel Pricing (commercial)
**Q: We raise price 2c at a site. Walk me through the P&L.** to "More margin per litre but less volume, because station choice is elastic (my model says ~-2.1). And every lost fill-up also loses the shop basket. So I judge it on **total profit = margin x volume + basket**, using the elasticity and the current competitor gap and cycle position."
**Q: Your model says cut price, but the area manager disagrees. What do you do?** to "The model is a recommendation, not a mandate. I'd show the expected profit trade-off, respect local knowledge (a road closure, a new competitor the data hasn't caught), and, if it's material, test it rather than argue, geo test and let the numbers settle it."
**Q: How much is this worth?** to "Industry algorithmic pricing reports 3-8% volume and 1-3 cpl margin gains. I wouldn't promise that; I'd size it from our own geo-test lift and be honest it's a projection until proven."

### Interviewer 2 - Lead Data Scientist (modelling)
**Q: Why log-log for elasticity, and what's the endogeneity risk?** to "Logs make coefficients read as elasticities. The risk is **endogeneity**: we may cut price exactly when demand is soft, biasing the elasticity. Site fixed effects and cycle controls help, but the clean fix is exogenous variation from a **geo experiment**."
**Q: Elasticity model vs LightGBM, why both?** to "The regression is for **interpretable insight** (the elasticity number, significance). LightGBM is the **flexible predictor** the optimiser queries at candidate prices, it captures non-linearities and interactions but isn't as readable. Different jobs."
**Q: How do you know the demand model is good?** to "Time-based backtest, WMAPE ~7.6% versus ~13.5% seasonal-naive, and I check realised-versus-predicted in production. Beating the baseline and being inside operational tolerance is the bar."
**Q: Your optimiser loves extreme prices. What stops it?** to "Guardrails: margin floor, max daily move, a floor on how far below competitors we go, and I only trust predictions inside the price range seen in training, extrapolation is where these blow up."

### Interviewer 3 - Data Engineer (pipelines/Databricks)
**Q: Competitor prices arrive every 15 minutes. How do you ingest at scale?** to "**Auto Loader** into a Bronze Delta table, incremental and checkpointed so it only picks up new files. Then batch-build the daily gold table."
**Q: Make the daily load safe to re-run.** to "**Idempotent MERGE** on (site, grade, date), or replaceWhere on the date partition, so a re-run lands the same state. Every step validated and alerted."
**Q: A join of billions of price rows to the site dim is slow.** to "**Broadcast** the small site dimension so the big table isn't shuffled, filter early, and watch the Spark UI for skew, one huge site could straggle, then salt or use AQE."
**Q: How is this table laid out?** to "Partition by date, **OPTIMIZE with ZORDER on site_id** for fast site filters, and VACUUM on a retention that preserves the time-travel we need for audit."

### Interviewer 4 - Experimentation / Stats Lead
**Q: You can't A/B a board price by customer. So how do you prove the optimiser works?** to "**Geo test**: treatment sites versus matched control sites, **difference-in-differences** on total profit, controls chosen so they don't share customers to avoid contamination, parallel pre-trends checked."
**Q: A stakeholder says volume rose 8% at the treated sites, ship it. Your reaction?** to "Versus what? Without the control I can't separate the price change from the cycle or weather. The DiD number is the causal one; 8% raw isn't evidence."
**Q: How long do you run it, and how do you size it?** to "Long enough to cover a full price cycle and beat novelty, and I'd power it for the **minimum detectable effect** that's commercially meaningful, more sites and longer to detect a smaller lift."
**Q: Fuel Price Lock, do lockers really spend more?** to "Lockers self-select, so raw comparison is biased. I'd estimate the **incremental** effect with a matched holdout (propensity-matched) or a randomised feature offer, and net off the option cost of the lock."

### Interviewer 5 - Product / Commercial stakeholder (non-technical)
**Q: Explain your pricing model to me like I'm running the stores.** to "For each site each day it asks: at this price, how many litres do we sell given what the servo across the road charges and where we are in the price cycle, and what's the shop spend that comes with those fill-ups. It picks the price that makes the most **total** money, fuel plus shop, and never breaks the rules you set on margin. You always approve before it goes live."
**Q: What could go wrong?** to "Bad or stale competitor data, a model over-confident outside normal price ranges, or optimising fuel while quietly hurting the basket. That's why there are guardrails, monitoring, and a human sign-off, and why we prove it with a controlled test before trusting it."
**Q: What would you deliver in the first 90 days?** to "Weeks 1-4 the data foundation and the elasticity read; weeks 5-8 the demand model and optimiser as recommendations; weeks 9-12 a geo test at a set of sites and a first measured incremental-profit number. Evidence, not just a model."

---

## 12. RISKS, ASSUMPTIONS, AND WHAT I'D DO FIRST
- **Assumptions:** competitor data is fresh and accurate; TGP reflects true cost; basket can be attributed to fuel visits. I'd validate each early.
- **Biggest risks:** endogenous elasticity (fix with the experiment), optimiser extrapolation (guardrails + in-range only), basket cannibalisation (optimise total profit), competitor reaction (they re-price too, so monitor and re-test).
- **First move:** not a model, the **data foundation and the elasticity read**, then a single-site-cluster geo test. Prove the lever moves profit before scaling.

**The through-line for the whole hour:** clarify the goal, optimise **total profit not fuel alone**, respect that pricing is **causal so I test it**, keep **guardrails and a human in the loop**, and deliver **measured incremental profit**, not a leaderboard metric.

---

**Sources (real context this is grounded in):**
- Rockets and feathers / price cycles and competition: [The Conversation](https://theconversation.com/rockets-and-feathers-why-competition-matters-for-petrol-pricing-36489)
- Fuel pricing optimisation inputs (competitor scraping, elasticity vs nearest competitor, demand forecasting) and reported 3-8% volume / 1-3 cpl gains: [Kalibrate](https://kalibrate.com/kalibrate-fuel-pricing-software/), [PriceEasy Fuel IQ](https://priceeasy.com/fuel-iq/), [DataRobot](https://www.datarobot.com/partner-solutions/fuel-pricing-optimization/)
- ACCC on fuel price apps/transparency: [ACCC](https://www.accc.gov.au/system/files/making-the-most-of-fuel-apps-websites_0.pdf)
