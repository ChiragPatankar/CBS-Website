import type { Service } from "@/content/types";

export const aiMl: Service = {
  slug: "ai-ml",
  pillar: "technology",
  name: "AI & Machine Learning",
  navLabel: "AI & Machine Learning",
  eyebrow: "Applied machine learning",
  h1: "From commerce data to decisions that compound",
  problem:
    "Every brand running on marketplaces and a storefront already generates more data than anyone reads — order histories, ad reports, search terms, stock movements, returns. It accumulates in exports and dashboards while the decisions it should inform are still made weekly, from memory, under time pressure.",
  overview:
    "This work follows one line and does not deviate from it: commerce data in, processed into something a model can use, turned into a prediction, wired into an action, and measured against the decision it was supposed to improve. The starting point is always a decision that is already being made — how much to reorder, what to bid, which creative to scale, which customers to re-engage — because a forecast nobody acts on is a report with better maths. Genuine ecommerce use cases are the substance of it: demand forecasting by SKU and channel, price and inventory optimisation, creative performance prediction, customer lifetime value and churn modelling, spend reallocation across channels, and catalogue classification and attribute enrichment. Operating across 15+ marketplaces for 100+ brands shapes which signals are worth modelling and which are noise, but the models themselves are built on your data, validated against your history, and monitored after deployment because commerce data drifts and a model that was right last quarter will quietly stop being right.",
  overviewPoints: [
    "Data in — orders, ads, catalogue, stock, customer history",
    "Processing — cleaned, joined and made model-ready",
    "Prediction — demand, value, churn, creative performance",
    "Decision — the output wired into an action and measured",
  ],
  platforms: [
    "Python",
    "PostgreSQL",
    "BigQuery",
    "dbt",
    "scikit-learn",
    "XGBoost",
    "Prophet",
    "PyTorch",
    "MLflow",
    "Airflow",
    "AWS",
    "Google Cloud",
  ],
  benefits: [
    {
      title: "Forecasts that change what you order",
      body: "Demand models built per SKU and channel give a defensible number to plan purchase orders and allocation against. The value is not the forecast itself but fewer stockouts on the lines that sell and less capital held in the lines that do not.",
      icon: "line-chart",
    },
    {
      title: "Budget moved on predicted return, not last week's report",
      body: "Customer value, churn and creative performance models let spend be reallocated toward the segments and assets likely to return, ahead of the outcome rather than after it. Reporting explains what happened; a prediction is what lets you act before it does.",
      icon: "target",
    },
    {
      title: "Judgement removed from repetitive work",
      body: "Catalogue classification, attribute enrichment and anomaly detection are pattern tasks that scale badly with people and well with models. Freeing that time is what lets a team spend its attention on the decisions models cannot make.",
      icon: "sparkles",
    },
  ],
  steps: [
    {
      title: "Decision audit and data inventory",
      body: "Identify the recurring commerce decisions worth improving and the value of getting each one closer to right. Then establish what data exists for them, at what granularity, over what history — because a model needs enough past to learn from before anything else is worth discussing.",
    },
    {
      title: "Data pipeline and feature preparation",
      body: "Build the pipelines that pull order, advertising, catalogue, stock and customer data into one place, then clean and reconcile it. Seasonality, promotions, stockout periods and returns are handled explicitly here — untreated, each one teaches a model the wrong lesson.",
    },
    {
      title: "Modelling and validation",
      body: "Train candidate models and test them against held-back historical periods, compared to the existing method as the baseline. A model only proceeds if it beats how the decision is made today on the metric that decision is judged by.",
    },
    {
      title: "Deployment and decision integration",
      body: "Put the output where the decision is actually made — a replenishment recommendation, a bid or budget adjustment, a customer segment pushed into the retention stack, an alert. Human approval sits in the loop by default until the output has earned autonomy.",
    },
    {
      title: "Monitoring, retraining and review",
      body: "Track prediction accuracy and the business metric side by side, watch for drift as demand patterns and channel mix change, and retrain on a defined schedule. A regular review keeps the model tied to the decision it was built for.",
    },
  ],
  deliverables: [
    {
      title: "Data readiness assessment",
      body: "What data exists, its quality and history depth, and which of the candidate use cases are supportable today versus after remediation.",
      icon: "search",
    },
    {
      title: "Unified commerce data pipeline",
      body: "Automated ingestion and transformation of order, ad, catalogue and customer data into a single modelled dataset.",
      icon: "database",
    },
    {
      title: "Demand and inventory forecasting",
      body: "Forecasts at SKU and channel level, with confidence ranges and reorder recommendations in a format planning can use.",
      icon: "boxes",
    },
    {
      title: "Customer value and churn models",
      body: "Lifetime-value and churn-risk scoring with segments exported to the channels where retention campaigns run.",
      icon: "users",
    },
    {
      title: "Creative and spend allocation models",
      body: "Predicted performance scoring for creative and channel-level reallocation recommendations, tied to margin rather than revenue alone.",
      icon: "megaphone",
    },
    {
      title: "Model documentation and monitoring",
      body: "Method, inputs, assumptions, validation results and limitations written down, with dashboards tracking accuracy and drift after deployment.",
      icon: "bar-chart",
    },
  ],
  faqs: [
    {
      q: "How much data do we need before this is worth doing?",
      a: "It depends on the use case. Demand forecasting generally needs at least two full seasonal cycles of clean order history at the granularity you want to forecast, because a model cannot learn a seasonal pattern it has only seen once. Churn and lifetime-value modelling needs enough repeat customers for the behaviour to be learnable. Catalogue classification needs far less. The data readiness assessment exists to answer this for your specific case rather than guess.",
    },
    {
      q: "Is this a product or a build?",
      a: "It is a build against your data and your decisions. There is no claim here of a pre-trained proprietary model that arrives knowing your category — models are trained on your history, validated against your own past periods, and deployed into the systems you already run. Where a well-established open-source or commercial model fits the task better than building one, that is the recommendation.",
    },
    {
      q: "How do you prove a model is actually better?",
      a: "By comparison against the current method on held-back historical data. If replenishment is currently planned on a trailing average, that average is the baseline, and the model has to beat it on the metric the decision is judged by — forecast error, stockout days, holding cost. No accuracy figure can be promised before seeing the data, because achievable accuracy is a property of the data, not the technique.",
    },
    {
      q: "Will this replace our team's judgement?",
      a: "No, and the pattern that works keeps a person in the loop. Models are good at ranking, scoring and forecasting over large volumes and poor at anything they have no precedent for — a new category launch, a supply disruption, a competitor's sudden move. Outputs are delivered as recommendations with the reasoning visible, and automated only where the decision is repetitive, bounded and low-risk.",
    },
    {
      q: "What happens when the model stops working?",
      a: "It will degrade eventually — that is the normal behaviour of a model in a changing market, not a failure. Monitoring tracks prediction accuracy against outcomes so degradation is visible early, retraining runs on a defined schedule, and material changes such as entering a new market or overhauling the catalogue trigger a review rather than waiting for the schedule.",
    },
  ],
  icon: "brain",
  seo: {
    title: "AI & Machine Learning for Ecommerce Growth",
    description:
      "Demand forecasting, churn and lifetime-value models, creative scoring and spend reallocation — machine learning applied to the decisions that move revenue.",
  },
  status: "draft-unreviewed",
  reviewNote:
    "CrossBorder must confirm which machine learning use cases the team has genuinely delivered, the modelling and data tooling actually used, whether any internal or partner platform underpins this work, and how engagements are scoped and priced, before this page is published — no accuracy or outcome figures should be added without evidence.",
};
