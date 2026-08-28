/**
 * Marketplace Growth & Management — marketplace pillar.
 * Source copy: content/work-with-us_growth-management.md (hero + overview).
 * Deliverables and FAQs come from docs/08-copy-rewrite.md, which replaces the six
 * duplicated deliverables and the placeholder "Is it accessible?" FAQ on the live site.
 */
import type { Service } from "@/content/types";

export const growthManagement: Service = {
  slug: "growth-management",
  pillar: "marketplace",
  name: "Marketplace Growth & Management",
  navLabel: "Growth & Management",
  eyebrow: "Marketplace Growth & Management",
  h1: "Sustainable, profitable growth on every marketplace",
  problem:
    "Revenue on a marketplace is easy to buy and hard to keep. Brands that chase top-line growth end up funding it with ad spend, discounts and stockouts, and only notice the margin gap at the end of the quarter.",
  overview:
    "We help brands scale profitably and strategically on marketplaces like Amazon, Walmart and eBay, using data-led strategy and conversion-focused optimization. Listings, advertising, catalog health and account risk are managed together, because on a marketplace they are the same problem.",
  overviewPoints: [
    "Measured against contribution margin, not just revenue",
    "Advertising, listings and operations under one owner",
    "Weekly decisions, monthly strategy, no black-box reporting",
  ],
  platforms: ["Amazon", "Flipkart", "Walmart", "eBay", "Myntra", "Noon"],
  benefits: [
    {
      title: "Profit-first benchmarking",
      body: "Every account gets contribution-margin targets per SKU before we change a bid, so growth is judged on the money you keep. When a product cannot clear its target, we say so and either fix the cost base or stop funding it.",
      icon: "gauge",
    },
    {
      title: "Advertising tuned to your economics",
      body: "Sponsored Products, Brands and Display are structured around defended keywords, category share and ACOS ceilings that match your margin. Budget moves toward the placements that convert rather than the ones that look busy.",
      icon: "megaphone",
    },
    {
      title: "Operations you stop chasing",
      body: "Buy-box health, stock cover, content hygiene and policy cases are worked as routine, not as emergencies. That removes the interruptions that usually consume a founder's week and keeps listings live during peak demand.",
      icon: "workflow",
    },
  ],
  steps: [
    {
      title: "Account and margin diagnostic",
      body: "We reconcile sales, fees, returns and ad spend into a real contribution-margin view per SKU, then identify where profit is leaking.",
    },
    {
      title: "Set the profit-first plan",
      body: "Targets are agreed for ROAS, ACOS, share of category and margin, along with the SKUs we are growing, holding or retiring.",
    },
    {
      title: "Fix the conversion layer",
      body: "Listings, imagery, pricing and review coverage are corrected first, so advertising spends into pages that already convert.",
    },
    {
      title: "Scale advertising and share",
      body: "Campaigns expand keyword by keyword against the agreed ceilings, with weekly bid, budget and creative decisions rather than monthly guesswork.",
    },
    {
      title: "Report and reset",
      body: "You get dashboards for sales, share and profitability, and a monthly session where the plan changes based on what the data showed.",
    },
  ],
  deliverables: [
    {
      title: "Conversion-optimized listings",
      body: "SEO-ranked, high-converting product pages across your catalog. Content is maintained as the category and search terms shift, not written once.",
      icon: "cart",
    },
    {
      title: "Advertising management",
      body: "Sponsored Products, Brands and Display managed against your ACOS and ROAS goals. Structure, bids and negatives are reviewed weekly.",
      icon: "megaphone",
    },
    {
      title: "Catalog and inventory health",
      body: "Buy-box, stock and content hygiene maintained at scale. Suppressions, variation breaks and stockout risks are caught before they cost rank.",
      icon: "boxes",
    },
    {
      title: "Review and rating growth",
      body: "Compliant programs that build social proof on the SKUs where reviews are the constraint. No incentivized reviews and no tactics that risk the account.",
      icon: "badge-check",
    },
    {
      title: "Analytics and reporting",
      body: "Dashboards for sales, category share and profitability, reconciled to fees and returns. You see margin, not just gross revenue.",
      icon: "bar-chart",
    },
    {
      title: "Account and compliance management",
      body: "Cases, policy issues and marketplace risk handled by us. Escalations are chased to resolution and logged so the same issue does not recur.",
      icon: "badge-check",
    },
  ],
  faqs: [
    {
      q: "Which marketplaces do you manage?",
      a: "Amazon, Flipkart, Walmart, eBay, Myntra, Noon and more, across 15+ marketplaces in total. Where you sell in several at once, we run them from one plan so pricing, stock and creative stay consistent.",
    },
    {
      q: "How is performance measured?",
      a: "Against profit-first benchmarks: ROAS, ACOS, contribution margin and share of category. Revenue alone is not a result we report, because it can be bought at a loss.",
    },
    {
      q: "Do you handle advertising and operations?",
      a: "Yes. Listings, ads, catalog health and account management sit with one partner, which is the point. Splitting them across vendors is how a brand ends up advertising into a suppressed listing.",
    },
    {
      q: "What does the first 90 days look like?",
      a: "The first weeks go into the margin diagnostic and the conversion layer, because scaling spend against weak listings wastes money. Advertising expansion follows once the pages convert and the profit targets are agreed.",
    },
  ],
  icon: "trending",
  seo: {
    title: "Marketplace Growth & Account Management",
    description:
      "Profit-first marketplace management: conversion-optimized listings, Sponsored Ads tuned to ACOS targets, catalog health and reporting on contribution margin.",
  },
  status: "published",
};
