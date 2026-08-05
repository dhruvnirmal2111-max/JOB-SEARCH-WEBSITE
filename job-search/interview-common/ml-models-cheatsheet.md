# ML Models Cheat Sheet — mental model, when to use, trade-offs, params, metrics

> For each model: **how it works → when to use → trade-offs → key hyperparameters.** Then a metrics section (what each means) and a "how to pick" guide. Read §0 and §1 first — they're the mental model.

---

## §0 — HOW TO PICK (the mental model)
- **Tabular data, want best accuracy** → **Gradient boosting** (LightGBM / XGBoost).
- **Tabular, want robust with little tuning** → **Random forest**.
- **Want interpretability / a baseline / probabilities** → **Linear** (number) or **Logistic** (class) regression.
- **Text** → **TF-IDF or embeddings** + logistic regression / Naive Bayes / SVM (or transformers for the heavy stuff).
- **Time series / forecasting** → **Prophet** or **ARIMA/SARIMA** — always benchmarked against a **seasonal-naive baseline**.
- **Grouping with no labels (segmentation)** → **k-means**.
- **Images / audio / text at scale / very complex patterns** → **Neural nets**.
- **Small / simple data** → simpler models (logistic, Naive Bayes, kNN).
- **Always start with the simplest thing that could work, and a baseline.**

The three questions that pick the model: **(1) predicting a number or a category?** (2) **do I have labels?** (3) **do I need interpretability or maximum accuracy?**

---

## §1 — PARAMETERS vs HYPERPARAMETERS (say this cold)
- **Parameters** = what the model **learns from data** during training. You don't set them. e.g. regression **coefficients/weights**, a tree's **split points**, a neural net's **weights**.
- **Hyperparameters** = settings **you choose before training** that control *how* it learns. e.g. **learning rate**, **tree depth**, **number of trees**, **k**, **regularisation strength**. Tuned with **GridSearchCV / RandomSearch + cross-validation**.
- One-liner: *"Parameters are learned; hyperparameters are chosen and tuned."*

---

## §2 — THE MODELS

### Linear regression
- **How:** fits the best straight line, `y = b0 + b1·x1 + …`, by minimising squared error.
- **When:** predict a **number**; relationship is roughly linear; you want interpretable coefficients.
- **Trade-offs:** + simple, fast, interpretable; − assumes linearity, sensitive to outliers, misses non-linear patterns.
- **Hyperparameters:** none for plain OLS; with regularisation → **Ridge (L2)**, **Lasso (L1)**, ElasticNet, tuned by **alpha** (strength). *(Parameters learned = the coefficients.)*

### Logistic regression
- **How:** predicts the **probability** of a class by passing a linear combination through the **sigmoid** (squashes to 0–1).
- **When:** binary (or one-vs-all multi-class) classification; want an interpretable, probabilistic, strong **baseline**. *(Your A$12B classifier.)*
- **Trade-offs:** + interpretable, fast, gives calibrated probabilities; − linear decision boundary, underfits complex patterns.
- **Hyperparameters:** **C** (inverse regularisation strength), **penalty** (l1/l2), **class_weight** (for imbalance).

### Decision tree
- **How:** a flowchart of yes/no splits on feature thresholds; each leaf gives a prediction.
- **When:** you want interpretable rules; non-linear relationships; mixed data types, no scaling needed.
- **Trade-offs:** + very interpretable, handles non-linearity + interactions; − **overfits easily**, unstable (small data change → different tree).
- **Hyperparameters:** **max_depth**, **min_samples_split/leaf**, criterion (gini/entropy).

### Random forest
- **How:** many decision trees, each on a random sample of rows + features; average (regression) or vote (classification). "Wisdom of the crowd."
- **When:** strong general-purpose **tabular** model; want robustness with little tuning.
- **Trade-offs:** + robust, handles non-linearity, less overfit than one tree, gives feature importance; − less interpretable, larger/slower.
- **Hyperparameters:** **n_estimators** (#trees), **max_depth**, **max_features**, min_samples_leaf.

### Gradient boosting (XGBoost / LightGBM)
- **How:** builds trees **sequentially**, each one correcting the previous trees' errors (gradient descent on the loss).
- **When:** usually the **best off-the-shelf model for tabular data** — sales, demand, churn, pricing.
- **Trade-offs:** + top accuracy on tabular, handles missing values, feature importance; − more tuning, can overfit, less interpretable.
- **Hyperparameters:** **learning_rate**, **n_estimators**, **max_depth**, subsample, regularisation (lambda/alpha).

### k-Nearest Neighbours (kNN)
- **How:** to predict, look at the **k most similar** past examples and take their majority (class) or average (number).
- **When:** simple baseline, small data.
- **Trade-offs:** + dead simple, no real training; − **slow at prediction** (compares to everything), needs feature **scaling**, breaks in high dimensions.
- **Hyperparameters:** **k** (n_neighbors), distance metric.

### Naive Bayes
- **How:** Bayes' theorem, assuming features are independent; computes the most probable class.
- **When:** **text classification** (spam), high-dimensional data, a fast baseline.
- **Trade-offs:** + very fast, works with little data, great for text; − the independence assumption is unrealistic, probabilities poorly calibrated.
- **Hyperparameters:** smoothing (**alpha**).

### Support Vector Machine (SVM)
- **How:** finds the boundary (**hyperplane**) that separates classes with the **widest margin**; **kernels** bend it for non-linear data.
- **When:** small-to-medium, high-dimensional data (e.g. text); clear separation.
- **Trade-offs:** + effective in high dimensions, flexible via kernels; − slow on large data, hard to tune/interpret, needs scaling.
- **Hyperparameters:** **C** (regularisation), **kernel**, **gamma**.

### Neural network / deep learning
- **How:** layers of weighted connections learn complex non-linear patterns via **backpropagation**.
- **When:** **images, text, audio**, very large data, complex patterns. **Overkill for most tabular problems.**
- **Trade-offs:** + state-of-the-art on unstructured data; − needs lots of data + compute, black box, heavy tuning.
- **Hyperparameters:** #layers/units, **learning rate**, epochs, batch size, dropout.

### k-means (unsupervised)
- **How:** splits data into **k clusters**, each point assigned to the nearest centre; repeat until stable.
- **When:** **segmentation** — customers, stores — and exploratory grouping (no labels).
- **Trade-offs:** + simple, scalable; − you must pick **k**, assumes round clusters, sensitive to scale/outliers/starting point.
- **Hyperparameters:** **k** (n_clusters), init. **Pick k** with the **elbow** (inertia) or **silhouette** score.

### PCA (dimensionality reduction)
- **How:** projects data onto the directions of **maximum variance**, giving fewer, uncorrelated features.
- **When:** too many features, visualisation, speed-up, removing correlation.
- **Trade-offs:** + cuts dimensions/noise; − components aren't interpretable.
- **Hyperparameter:** **n_components**.

### Time series — exponential smoothing / ARIMA / Prophet
- **Exponential smoothing (Holt-Winters):** weights recent points more; adds trend + seasonality. Simple, strong **baseline**.
- **ARIMA / SARIMA:** uses past **values** (AR) + past **errors** (MA) + **differencing** (I) to remove trend; SARIMA adds seasonality. Needs a **stationary** series. Hyperparams: **(p,d,q)** (+ seasonal P,D,Q,s).
- **Prophet:** additive **trend + seasonality + holidays + regressors**; robust, interpretable, easy. Best with clear seasonal structure; weaker on high-frequency/non-linear. Hyperparams: seasonality mode, changepoint_prior_scale, added regressors. *(Your produce forecast.)*

### Text representations (feed these into a model)
- **TF-IDF:** turns text into numbers by weighting words by how **distinctive** they are. Feed to logistic regression / NB / SVM.
- **Embeddings:** dense vectors that capture **meaning**, so "taxi" and "cab" sit close. Better semantic matching. *(Your TF-IDF → embeddings upgrade.)*

---

## §3 — METRICS POST-PREDICTION (what they mean + how they're computed)

### Classification (all built from the confusion matrix: TP, FP, TN, FN)
- **Accuracy** = (TP+TN)/all. *Overall % correct.* **Trap:** misleading under imbalance.
- **Precision** = TP/(TP+FP). *Of the ones I predicted positive, how many were right.* Use when **false positives are costly**.
- **Recall (Sensitivity)** = TP/(TP+FN). *Of the actual positives, how many I caught.* Use when **misses are costly**.
- **F1** = 2·(P·R)/(P+R). *Harmonic mean of precision & recall* — one number under imbalance.
- **ROC-AUC** = probability the model ranks a random positive above a random negative (0.5 random, 1 perfect). Threshold-independent ranking quality.
- **PR-AUC** = area under precision-recall curve. **Better than ROC-AUC under heavy imbalance.**
- **Log loss** = penalises confident-but-wrong probabilities; lower is better.
- **Specificity** = TN/(TN+FP) — of the actual negatives, how many correctly ruled out.

### Regression / forecast (predicting a number)
- **MAE** (mean absolute error) = average size of the miss, in real units. Easy to explain.
- **MSE** = mean of squared errors; **penalises big misses**, but units are squared.
- **RMSE** = √MSE; back in real units, still punishes big misses.
- **MAPE** = mean absolute **% error**; comparable across scales. **Trap:** blows up when actuals are near zero.
- **WMAPE** = volume-weighted MAPE — big items count more (best for retail).
- **R²** = fraction of the variance the model explains (0–1; can go negative if worse than the mean).

### Clustering (no labels)
- **Inertia** (within-cluster sum of squares) → the **elbow method** to choose k.
- **Silhouette score** (−1 to 1) → how tight and well-separated the clusters are.

**The rule to never miss:** classification → accuracy/precision/recall/F1/AUC · regression/forecast → MAE/RMSE/MAPE/WMAPE · clustering → silhouette/inertia.

---

## §4 — YOUR MODELS (map to real work)
- **Logistic regression** (+ TF-IDF → embeddings, class weights, GridSearchCV) → the **A$12B spend classifier**.
- **Prophet** (trend/seasonality/holidays + external regressors) → the **produce inventory forecast** (12.5–14% error).
- **Anomaly detection** (statistical) → the **VCDI** distributed pipeline.
- If asked "what would you use for demand/pricing here?" → **"LightGBM on lag features"** is your strong, modern answer for tabular retail.

**Interview move:** name the model, then in one breath give **when + one trade-off** — e.g. *"I'd start with gradient boosting because it's usually best on tabular data, at the cost of interpretability, so if the stakeholders needed to see the 'why' I'd fall back to logistic regression."* That structure — choice + trade-off + alternative — is what senior sounds like.
