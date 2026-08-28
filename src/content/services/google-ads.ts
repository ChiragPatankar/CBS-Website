/**
 * Google Ad Buying — Demand Capture. Digital Commerce Growth pillar.
 * Source copy: content/work-with-us_google-ads.md.
 */
import type { Service } from "@/content/types";

export const googleAds: Service = {
  slug: "google-ads",
  pillar: "growth",
  name: "Google Ad Buying — Demand Capture",
  navLabel: "Google Ads",
  eyebrow: "Google Ad Buying — Demand Capture",
  h1: "Capture ready-to-buy search intent with high-performing Google Ads",
  problem:
    "Search is where the cheapest revenue in the account usually hides, and where the most is wasted. Broad match and automated campaign types will happily spend your budget on people who were never going to buy your product.",
  overview:
    "Our team builds data-backed campaigns across Search, Shopping, Display and YouTube that convert high-intent users into customers. The starting point is intent: which queries mean purchase, which mean research, and what each is worth to you.",
  overviewPoints: [
    "Keyword sets grouped by intent, with negatives maintained weekly",
    "Merchant Center and product feed treated as a ranking asset",
    "Testing across copy, creative, landing pages and bid strategy",
  ],
  platforms: ["Google Ads", "Google Shopping", "Merchant Center", "YouTube", "Google Analytics 4"],
  benefits: [
    {
      title: "Keyword and intent mapping",
      body: "Queries are grouped by what the searcher is actually trying to do, so brand, category and competitor traffic get different bids, copy and landing pages. Negative lists are maintained every week, which is where most wasted spend is recovered.",
      icon: "search",
    },
    {
      title: "Multi-format campaigns",
      body: "Search, Shopping, Display and YouTube are used for the job each does well instead of running one blended campaign and hoping. Shopping carries the product-level demand, while YouTube and Display feed the queries that have not been asked yet.",
      icon: "boxes",
    },
    {
      title: "Conversion optimization",
      body: "We fix conversion tracking and landing-page fit before raising budgets, because a smart bidding strategy trained on bad signal will scale the wrong thing. Copy, offer and page are tested together so the click has somewhere good to land.",
      icon: "gauge",
    },
  ],
  steps: [
    {
      title: "Account and conversion review",
      body: "We audit campaign structure, conversion actions, GA4 setup and feed status, then quantify how much current spend is going to non-buying queries.",
    },
    {
      title: "Intent map and build plan",
      body: "Keywords, match types and campaign types are mapped to intent and margin, and target CPA or ROAS is set per group rather than account-wide.",
    },
    {
      title: "Feed and campaign build",
      body: "Merchant Center feed is cleaned and enriched, then Search, Shopping, Display and YouTube campaigns are built with the copy and extensions each needs.",
    },
    {
      title: "Test and refine",
      body: "Headlines, creatives, landing pages and bid strategies go through structured A/B tests, with search-term reviews and negative updates every week.",
    },
    {
      title: "Report and reallocate",
      body: "Dashboards show spend, CPA and margin by campaign type, and budget moves toward the intent tiers proving profitable.",
    },
  ],
  deliverables: [
    {
      title: "Search campaign setup",
      body: "Full configuration of search campaigns with keyword targeting, match-type discipline and extensions. Negative lists are built at launch, not months later.",
      icon: "search",
    },
    {
      title: "Shopping ads",
      body: "Product feed optimization and Shopping campaign setup, including titles, attributes and image quality. Feed errors are monitored so SKUs do not silently drop out.",
      icon: "cart",
    },
    {
      title: "YouTube ads",
      body: "Short-form and skippable video campaigns for awareness and conversion, targeted from your existing customer and search data. Cut for the first five seconds.",
      icon: "megaphone",
    },
    {
      title: "Ad copywriting",
      body: "Persuasive copy written per intent tier and matched to the landing page it points at. Variants are supplied so the asset-level reporting has something to compare.",
      icon: "wand",
    },
    {
      title: "A/B testing",
      body: "Structured tests across headlines, creatives, landing pages and bidding strategies, one variable at a time. Results are logged so the account keeps its history.",
      icon: "target",
    },
    {
      title: "Reporting and strategy",
      body: "Custom dashboards plus next-step recommendations you can act on. Reporting separates brand from non-brand so growth is not confused with existing demand.",
      icon: "line-chart",
    },
  ],
  faqs: [
    {
      q: "Which Google ad types do you support?",
      a: "Search, Shopping, Performance Max, Display and YouTube. We pick the mix based on where your demand already exists: for most consumer brands Search and Shopping carry the profitable volume, with Display and YouTube used to create demand once capture is maxed out.",
    },
    {
      q: "Do you manage product feeds?",
      a: "Yes. Merchant Center feed work is part of the engagement, covering titles, attributes, imagery, GTINs and disapproval fixes. Feed quality decides Shopping performance more than bidding does, so we treat it as ongoing maintenance rather than a one-time upload.",
    },
    {
      q: "How quickly can we go live?",
      a: "Once conversion tracking is verified and the feed is clean, a first campaign set can launch quickly. We do not skip that verification step, because launching against broken conversion data costs more than the few days it takes to fix.",
    },
    {
      q: "Can you work alongside our Meta or marketplace spend?",
      a: "Yes, and it usually works better that way. We reconcile Google performance to blended CAC so search is not credited for demand that Meta or your marketplace listings created.",
    },
  ],
  icon: "search",
  seo: {
    title: "Google Ads Management for Demand Capture",
    description:
      "Search, Shopping, Display and YouTube campaigns mapped to real buying intent, with feed hygiene, ad testing and reporting you can act on each week.",
  },
  status: "published",
};
