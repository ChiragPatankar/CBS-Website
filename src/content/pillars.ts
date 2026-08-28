/**
 * The three solution pillars — hero copy, positioning and service ordering.
 *
 * `name` is kept identical to `nav.pillars[].title` in `src/config/site.ts`; the
 * header and these pages must never disagree on what a pillar is called.
 *
 * Every figure in `outcomes` is a verified company-level aggregate (see
 * docs/08-copy-rewrite.md "Proof stats"). Where no verified number exists the
 * outcome is stated qualitatively rather than invented.
 */
import type { Pillar, PillarSlug } from "./types";

export const pillars: Pillar[] = [
  {
    slug: "marketplace",
    name: "Marketplace Solutions",
    eyebrow: "Marketplace Solutions",
    h1: "Win the marketplaces that already have your buyers",
    sub: "Cataloging, advertising, account health and cross-border expansion, run as one operation instead of four disconnected ones.",
    intro:
      "Marketplaces reward operators, not advertisers. We run the whole surface for you: listings built to rank and convert, creative that survives a 4-inch screen, Sponsored campaigns tuned to contribution margin rather than raw ROAS, and the unglamorous account work that keeps the buy box yours. One team owns catalog, ads, compliance and expansion, so decisions in one place stop breaking things in another.",
    tension:
      "Most brands treat marketplaces as a second storefront and staff them accordingly, then lose margin to bad data, stalled listings and ad spend nobody has tied back to profit. The channel punishes that quietly, one lost buy box at a time.",
    outcomes: [
      { value: "15+", label: "Global marketplaces operated", direction: "up" },
      { value: "8+", label: "Countries served", direction: "up" },
      {
        value: "One partner",
        label: "Listings, ads, catalog health and compliance",
        direction: "neutral",
      },
    ],
    serviceSlugs: [
      "cataloging-creative",
      "global-selling",
      "growth-management",
      "expansion",
    ],
    seo: {
      title: "Marketplace Solutions | Amazon, Flipkart & global marketplace growth",
      description:
        "Cataloging, creative, advertising, account health and cross-border expansion across 15+ marketplaces, run by one team against profit-first benchmarks.",
    },
  },
  {
    slug: "growth",
    name: "Digital Commerce Growth",
    eyebrow: "Digital Commerce Growth",
    h1: "Full-funnel performance that answers to the P&L",
    sub: "Meta and Google acquisition, a Shopify storefront built to convert, and retention across email, SMS and WhatsApp — measured as one system.",
    intro:
      "Acquisition, storefront and retention are one machine, and it only performs as well as its weakest part. We plan media against profit-first benchmarks, produce creative in volume so learning is fast rather than lucky, fix the conversion path the traffic lands on, and put lifecycle programs behind every first order. You get one number to judge us on: what the funnel returns after costs.",
    tension:
      "Spend rises, blended returns fall, and nobody can say which layer broke — the audience, the creative, the landing page or the follow-up. Split across three vendors, that answer never arrives.",
    outcomes: [
      { value: "4.3×", label: "Average growth in ROAS", direction: "up" },
      { value: "100+", label: "Brands scaled worldwide", direction: "up" },
      {
        value: "Full funnel",
        label: "Acquisition, conversion and retention under one plan",
        direction: "neutral",
      },
    ],
    serviceSlugs: ["meta-ads", "google-ads", "shopify", "retention"],
    seo: {
      title: "Digital Commerce Growth | Meta & Google ads, Shopify, retention",
      description:
        "Profit-first media buying, conversion-focused Shopify builds and lifecycle retention across email, SMS and WhatsApp, run as a single full-funnel system.",
    },
  },
  {
    slug: "technology",
    name: "Technology & AI",
    eyebrow: "Technology & AI",
    h1: "The systems that make growth repeatable",
    sub: "Custom storefronts, commerce apps, cloud infrastructure and applied AI, built so your team can keep operating them.",
    intro:
      "At some point growth stops being a media problem and becomes an engineering one: a storefront that cannot hold traffic, catalog work no human should be doing twice, forecasts assembled by hand in a spreadsheet. We build the layer underneath — headless and custom storefronts, native and cross-platform apps, cloud infrastructure sized to real load, and machine learning applied to forecasting, creative testing and catalog automation. You own the code, the data and the accounts.",
    tension:
      "Manual process is invisible until volume triples, then it sets the ceiling on everything else. Brands end up paying for people to move data instead of paying for growth.",
    outcomes: [
      { value: "9+", label: "Years of ecommerce experience", direction: "up" },
      { value: "85%", label: "Annual client retention", direction: "up" },
      {
        value: "You own it",
        label: "Your code, your data, your platform accounts",
        direction: "neutral",
      },
    ],
    serviceSlugs: ["web-development", "mobile-apps", "cloud", "ai-ml"],
    seo: {
      title: "Technology & AI | Commerce engineering, cloud and applied ML",
      description:
        "Custom web and mobile commerce builds, cloud infrastructure and applied AI for forecasting, creative testing and catalog automation. You own what we build.",
    },
  },
];

export const PILLAR_SLUGS: string[] = pillars.map((p) => p.slug);

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === (slug as PillarSlug));
}
