# 7-Eleven - Live-Coding Survival Kit (DS)

> For a data-science role, live coding is NOT hard algorithms. It is SQL and pandas **data manipulation**, which you already do every day. This sheet is the ~12 patterns that cover almost all of it, plus how to **talk while you code** (that is half the marks) and how to recover if you get stuck. Golden rule: **narrate your thinking, start simple, test on a tiny example.**

---

## PART 0 - How to behave (this scores as much as the code)
1. **Restate the question first.** "So I need the top 3 products by revenue per store, right?" Confirms scope and buys thinking time.
2. **Say your plan before typing.** "I'll group by store and product, sum revenue, then rank within each store and keep the top 3." A clear plan earns marks even if the syntax wobbles.
3. **Narrate as you code.** Talk through each line. They are hiring how you *think*, not whether you remember a method name.
4. **Start with the simplest thing that works,** then improve. A working slow answer beats a broken clever one.
5. **Test on a tiny example** in your head or with a few rows. "Let me sanity-check on two stores."
6. **If you blank on syntax, say so and keep moving:** "I'd use a window function here, `ROW_NUMBER` partitioned by store; let me write the shape and fix the exact syntax." Honesty plus direction reads fine.

---

## PART 1 - SQL patterns (the most common ask)

**1. Aggregate + filter groups (GROUP BY / HAVING)**
```sql
SELECT store_id, SUM(revenue) AS total
FROM sales
GROUP BY store_id
HAVING SUM(revenue) > 10000;
```
Narrate: "WHERE filters rows before grouping, HAVING filters the groups after."

**2. Top-N per group (window function) - the classic**
```sql
SELECT * FROM (
  SELECT store_id, product_id, revenue,
         ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY revenue DESC) AS rn
  FROM sales
) t
WHERE rn <= 3;
```
Narrate: "ROW_NUMBER, not RANK, so I get exactly N even on ties."

**3. Deduplicate, keep the latest**
```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY updated_at DESC) AS rn
  FROM customers
) t WHERE rn = 1;
```

**4. Growth vs previous period (LAG)**
```sql
SELECT month, revenue,
  (revenue - LAG(revenue) OVER (ORDER BY month)) * 1.0
   / LAG(revenue) OVER (ORDER BY month) AS mom_growth
FROM monthly;
```

**5. Running total**
```sql
SELECT day, SUM(sales) OVER (ORDER BY day
     ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM daily;
```

**6. Join two tables**
```sql
SELECT o.order_id, c.name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id;
```
Narrate: "INNER keeps only matches; LEFT keeps all orders even if the customer is missing. Careful: a filter on the right table in WHERE quietly turns a LEFT join into an INNER, so it goes in the ON."

**7. Conditional counts (CASE WHEN)**
```sql
SELECT store_id,
  COUNT(*) AS total,
  SUM(CASE WHEN revenue > 100 THEN 1 ELSE 0 END) AS big_orders
FROM sales GROUP BY store_id;
```

**8. Date filtering (sargable, so it uses an index)**
```sql
WHERE order_date >= '2026-01-01' AND order_date < '2026-02-01'
-- NOT WHERE YEAR(order_date) = 2026  (that scans the whole table)
```

---

## PART 2 - pandas patterns (the other common ask)

Assume `df` is the dataframe. `import pandas as pd`.

**1. Filter and select**
```python
df[df['revenue'] > 100][['store_id', 'product_id', 'revenue']]
```

**2. Group by and aggregate**
```python
df.groupby('store_id')['revenue'].sum()
df.groupby('store_id').agg(total=('revenue','sum'), n=('order_id','count'))
```

**3. Top-N per group (the pandas version of the SQL classic)**
```python
df.sort_values('revenue', ascending=False).groupby('store_id').head(3)
```

**4. Merge / join**
```python
df.merge(customers, left_on='customer_id', right_on='id', how='left')
```

**5. New column (vectorised, not a loop)**
```python
df['margin'] = df['price'] - df['cost']
df['flag'] = (df['revenue'] > 100)
```
Narrate: "Vectorised, so it runs in fast C rather than a slow Python loop."

**6. Counts and value distribution**
```python
df['category'].value_counts()
df['store_id'].nunique()
```

**7. Sort and top-N overall**
```python
df.nlargest(5, 'revenue')
```

**8. Handle missing values**
```python
df['revenue'].fillna(0)
df.dropna(subset=['revenue'])
df.isna().sum()          # how many missing per column
```

**9. Dates / resample to a period**
```python
df['date'] = pd.to_datetime(df['date'])
df.set_index('date').resample('W')['sales'].sum()   # weekly totals
```

**10. Pivot (rows/cols summary)**
```python
df.pivot_table(index='store_id', columns='month', values='sales', aggfunc='sum')
```

**11. Rank within group**
```python
df['rank'] = df.groupby('store_id')['revenue'].rank(ascending=False)
```

**12. Simple stats**
```python
df['revenue'].mean(); df['revenue'].median(); df['revenue'].std()
df[['price','sales']].corr()      # correlation between two numbers
```

---

## PART 3 - The "simple function" ask (if it comes)
Sometimes a light Python function. Keep it plain, narrate, test.
```python
def conversion_rate(visitors, buyers):
    if visitors == 0:          # guard the divide-by-zero, they watch for this
        return 0.0
    return buyers / visitors
```
Narrate: "I'll guard the zero-division first, then the calculation." Edge-case awareness is what they are checking.

---

## PART 4 - If you get stuck (recovery lines that keep you looking strong)
- "Let me write the shape first and fix the exact syntax after." (Then pseudo-code it.)
- "I know this is a window function; the pattern is `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)`, let me fill it in."
- "Let me test this on two rows to check the logic." (Slows you down, catches bugs, looks methodical.)
- "There's probably a cleaner one-liner, but here's a version that definitely works; I can optimise after." (Working first, clever later.)
- If truly stuck: "I'd normally look up the exact method name here, but the approach is X." Honesty with direction is fine; silence and flailing is not.

---

## PART 5 - The reframe to hold onto
You manipulate data in SQL and pandas **every working day**: group-bys, joins, filters, window functions, cleaning. That IS the live-coding test. It is not competitive programming. Restate the question, say your plan, write the simple version, narrate throughout, and test on a small example. Do that and you pass, even with a couple of syntax stumbles.
