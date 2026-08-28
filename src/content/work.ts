/**
 * ⚠️  STRUCTURAL PLACEHOLDERS — NOT PUBLISHABLE CONTENT.
 *
 * CrossBorder has no approved, client-cleared case studies. Everything in
 * `caseStudies` below exists only so the /work index, its filters, and the case
 * study template can be built, styled and tested against realistic shapes.
 *
 * Every entry is `draft: true`, which renders a DRAFT badge and applies noindex.
 *
 * Before launch, for each entry that is kept:
 *   1. Replace `client` — every value is deliberately suffixed "— TBD" and must
 *      become a real, written-permission-granted brand name (or an approved
 *      anonymised descriptor, e.g. "A DTC wellness brand").
 *   2. Replace every `metrics` value — all are prefixed "~" to mark them as
 *      illustrative. Real figures must come from the account, signed off by the
 *      client, with the measurement window stated.
 *   3. Rewrite `headline`, `summary`, `challenge`, `approach` and `results` from
 *      the actual engagement.
 *   4. Confirm `industry`, `pillars` and `marketplaces` match reality — the
 *      /work filters are generated from these fields.
 *   5. Flip `draft` to false. `hasPublishedCaseStudies` then turns true and any
 *      "case studies coming soon" empty state stops rendering.
 *
 * Delete, do not publish, any entry that never gets a real engagement behind it.
 *
 * `clients` is the one genuinely real dataset here: the 18 logo-wall names from
 * content/work.md. They are logo-wall names only — no outcome, spend or result
 * may be attributed to any of them without sign-off.
 */
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "wellness-dtc-scale",
    draft: true,
    client: "Wellness Brand — TBD",
    industry: "Health & Wellness",
    pillars: ["growth"],
    marketplaces: ["Shopify", "Amazon"],
    headline: "Placeholder: a supplements brand moves from ROAS targets to margin targets",
    summary:
      "Illustrative structure only. Repositioned a DTC supplements funnel around contribution margin, rebuilt the creative library, and put subscription retention behind first orders.",
    accent: "#10b981",
    metrics: [
      { value: "~3.1×", label: "Blended ROAS", direction: "up" },
      { value: "~−28%", label: "CAC", direction: "down" },
      { value: "~+40%", label: "Repeat purchase rate", direction: "up" },
    ],
    challenge:
      "Placeholder challenge. Paid spend was growing while contribution per order fell, and nobody could say whether the problem was audience, creative or the landing page.",
    approach: [
      "Placeholder step: rebuild reporting around contribution margin and CAC payback.",
      "Placeholder step: produce a hook-led creative library and run a fixed weekly test cadence.",
      "Placeholder step: fix the highest-exit steps in the conversion path.",
      "Placeholder step: launch lifecycle email, SMS and WhatsApp flows behind first orders.",
    ],
    results:
      "Placeholder results. Replace with client-approved figures, the measurement window, and what specifically drove the change.",
  },
  {
    slug: "packaged-food-marketplace",
    draft: true,
    client: "Packaged Food Brand — TBD",
    industry: "Food & Beverage",
    pillars: ["marketplace"],
    marketplaces: ["Amazon", "Flipkart", "Blinkit"],
    headline: "Placeholder: catalog and account health lift a food brand's marketplace share",
    summary:
      "Illustrative structure only. Cleaned a fragmented catalog, stabilised buy-box ownership, and tuned Sponsored campaigns to category share rather than raw ROAS.",
    accent: "#f59e0b",
    metrics: [
      { value: "~+2.4×", label: "Marketplace revenue", direction: "up" },
      { value: "~+18pt", label: "Buy-box ownership", direction: "up" },
      { value: "~−6pt", label: "Ad cost of sale", direction: "down" },
    ],
    challenge:
      "Placeholder challenge. Duplicate and incomplete listings split demand across variants, and stock-outs kept resetting hard-won ranking.",
    approach: [
      "Placeholder step: consolidate duplicate ASINs and rebuild variant families.",
      "Placeholder step: rewrite titles, bullets and A+ content for search and conversion.",
      "Placeholder step: set stock and pricing guardrails to protect the buy box.",
      "Placeholder step: restructure Sponsored Products and Brands around category share.",
    ],
    results:
      "Placeholder results. Replace with client-approved figures, the measurement window, and what specifically drove the change.",
  },
  {
    slug: "apparel-omnichannel",
    draft: true,
    client: "Apparel Brand — TBD",
    industry: "Fashion & Apparel",
    pillars: ["marketplace", "growth"],
    marketplaces: ["Myntra", "Amazon", "Shopify"],
    headline: "Placeholder: one plan across marketplace and DTC for a fashion label",
    summary:
      "Illustrative structure only. Aligned marketplace merchandising with DTC acquisition so the two channels stopped competing on price and creative.",
    accent: "#ec4899",
    metrics: [
      { value: "~+85%", label: "Full-price sell-through", direction: "up" },
      { value: "~2.7×", label: "Blended ROAS", direction: "up" },
      { value: "~+31%", label: "New-customer revenue", direction: "up" },
    ],
    challenge:
      "Placeholder challenge. Marketplace discounting undercut the brand store, and returns were absorbing the margin that acquisition reported earning.",
    approach: [
      "Placeholder step: separate assortment and pricing logic per channel.",
      "Placeholder step: rebuild size and fit content to reduce returns.",
      "Placeholder step: shift paid spend towards new-customer acquisition targets.",
      "Placeholder step: report profitability net of returns and channel fees.",
    ],
    results:
      "Placeholder results. Replace with client-approved figures, the measurement window, and what specifically drove the change.",
  },
  {
    slug: "consumer-electronics-cross-border",
    draft: true,
    client: "Consumer Electronics Brand — TBD",
    industry: "Consumer Electronics",
    pillars: ["marketplace", "technology"],
    marketplaces: ["Amazon", "Walmart", "eBay", "Noon"],
    headline: "Placeholder: cross-border launch with catalog automation underneath it",
    summary:
      "Illustrative structure only. Opened new geographies on marketplace, with localisation, compliance documentation and an automated catalog feed doing the repetitive work.",
    accent: "#5b5bf0",
    metrics: [
      { value: "~4", label: "New markets live", direction: "up" },
      { value: "~+2.2×", label: "International revenue", direction: "up" },
      { value: "~−70%", label: "Manual listing hours", direction: "down" },
    ],
    challenge:
      "Placeholder challenge. Each new market meant re-entering the same catalog by hand, and compliance requirements were discovered late enough to stall launches.",
    approach: [
      "Placeholder step: sequence market entry by demand and compliance effort.",
      "Placeholder step: build a feed that localises and syndicates the catalog per market.",
      "Placeholder step: prepare tax, labelling and platform compliance ahead of listing.",
      "Placeholder step: launch market-specific advertising against local benchmarks.",
    ],
    results:
      "Placeholder results. Replace with client-approved figures, the measurement window, and what specifically drove the change.",
  },
  {
    slug: "home-furnishing-storefront",
    draft: true,
    client: "Home & Furnishing Brand — TBD",
    industry: "Home & Living",
    pillars: ["technology", "growth"],
    marketplaces: ["Shopify", "Amazon"],
    headline: "Placeholder: a rebuilt storefront stops leaking the traffic it paid for",
    summary:
      "Illustrative structure only. Replaced a slow, heavily-apped theme with a headless build, then let acquisition scale against the improved conversion path.",
    accent: "#22d3ee",
    metrics: [
      { value: "~+55%", label: "Conversion rate", direction: "up" },
      { value: "~−2.1s", label: "Largest contentful paint", direction: "down" },
      { value: "~+1.9×", label: "Revenue per session", direction: "up" },
    ],
    challenge:
      "Placeholder challenge. Mobile pages took seconds to become usable, and every added app made checkout slower and harder to diagnose.",
    approach: [
      "Placeholder step: audit the conversion path and rank fixes by revenue at risk.",
      "Placeholder step: rebuild the storefront on a headless stack with a real performance budget.",
      "Placeholder step: retire overlapping apps and consolidate tracking.",
      "Placeholder step: scale paid acquisition once the conversion path held.",
    ],
    results:
      "Placeholder results. Replace with client-approved figures, the measurement window, and what specifically drove the change.",
  },
  {
    slug: "beauty-retention-ai",
    draft: true,
    client: "Beauty Brand — TBD",
    industry: "Beauty & Personal Care",
    pillars: ["growth", "technology"],
    marketplaces: ["Shopify", "Nykaa", "Amazon"],
    headline: "Placeholder: faster creative learning and lifecycle automation for a beauty brand",
    summary:
      "Illustrative structure only. Used structured creative testing and model-assisted segmentation to shorten learning cycles and raise repeat revenue.",
    accent: "#a855f7",
    metrics: [
      { value: "~2.6×", label: "Winning-creative velocity", direction: "up" },
      { value: "~+34%", label: "Revenue from repeat customers", direction: "up" },
      { value: "~+22%", label: "Customer LTV", direction: "up" },
    ],
    challenge:
      "Placeholder challenge. Creative was produced in small batches on instinct, and lifecycle messaging treated every buyer the same regardless of product or cadence.",
    approach: [
      "Placeholder step: define a testing framework with one variable per test.",
      "Placeholder step: increase creative throughput to keep the framework fed.",
      "Placeholder step: model replenishment timing and segment lifecycle flows on it.",
      "Placeholder step: automate reporting so results are read weekly, not quarterly.",
    ],
    results:
      "Placeholder results. Replace with client-approved figures, the measurement window, and what specifically drove the change.",
  },
];

/**
 * The real client logo wall from content/work.md — 18 names, in source order.
 * Logo-wall use only. Do not attribute any metric or case study to these names.
 */
export const clients: readonly string[] = [
  "DN",
  "GSI",
  "Kvaas",
  "Lenovo",
  "Metashot",
  "MTR",
  "Sol",
  "Sleepwell",
  "USC",
  "Vinod",
  "Zindagi",
  "Zymss",
  "Kurlon",
  "Izod",
  "Quali",
  "IPC",
  "Reebok",
  "Safron",
] as const;

/** False until at least one case study is client-approved and `draft` is flipped. */
export const hasPublishedCaseStudies: boolean = caseStudies.some((c) => !c.draft);
