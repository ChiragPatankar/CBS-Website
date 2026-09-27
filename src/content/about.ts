/**
 * About page content.
 *
 * Copy derives from content/about.md and the rewritten About section of
 * docs/08-copy-rewrite.md. Stats are the six verified company aggregates.
 *
 * Deliberately omitted: there is no team section. No verified names, roles,
 * photos or bios exist, and inventing them is worse than leaving the section out.
 */
import type { Seo } from "./types";

export type TimelineEntry = { year: string; title: string; body: string };
export type Belief = { statement: string; body: string };
export type Differentiator = { n: string; title: string; body: string };
export type CapabilityGroup = { title: string; items: string[] };
export type Reach = { countries: string; marketplaces: string; brands: string };

export type About = {
  eyebrow: string;
  h1: string;
  sub: string;
  lede: string;
  timeline: TimelineEntry[];
  beliefs: Belief[];
  differentiators: Differentiator[];
  capabilities: CapabilityGroup[];
  reach: Reach;
  seo: Seo;
};

export const about: About = {
  eyebrow: "About us",
  h1: "You lead the brand. We lead the conversions.",
  sub: "At CrossBorder we combine data, creative strategy and customer insight to drive consistent, profitable ecommerce growth — from conversion-ready product pages to performance-driven ads, across every layer of your online presence.",
  lede:
    "We are an ecommerce growth partner, not an ad agency with a media plan. Brands come to us when growth has become an operations problem: catalog work nobody owns, ad spend nobody can tie to profit, a storefront that leaks the traffic it paid for. We take the whole stack — marketplaces, DTC, creative, analytics and the technology under it — and run it against one measure, which is what the business keeps after costs.",

  timeline: [
    {
      year: "2016",
      title: "Started in Mumbai, on marketplace work",
      body: "The company began with the unglamorous end of ecommerce: catalogs, listings, buy-box hygiene and account health for consumer brands selling on Indian marketplaces. That work set the standard we still hold — operations before advertising.",
    },
    {
      year: "2019",
      title: "Performance media added to operations",
      body: "Brands kept asking us to run the ads against the catalogs we already managed. Owning both sides let us judge campaigns on contribution margin instead of platform-reported ROAS, and profit-first benchmarking became the way we plan media.",
    },
    {
      year: "2021",
      title: "Cross-border selling",
      body: "Indian brands wanted international demand and international brands wanted India. Global selling, localisation and marketplace compliance became a practice in their own right, and the work spread across more countries and more platforms.",
    },
    {
      year: "2023",
      title: "Technology and AI in-house",
      body: "Growth kept hitting engineering ceilings, so we stopped outsourcing them. Custom storefronts, commerce apps, cloud infrastructure and applied machine learning for forecasting, creative testing and catalog automation became part of the offer.",
    },
    {
      year: "Today",
      title: "Two motions, three pillars",
      body: "We work with brands at 0→1 and at 1→n across Marketplace Solutions, Digital Commerce Growth, and Technology & AI. More than 100 brands have scaled with us, and 85% of clients stay with us year on year.",
    },
  ],

  beliefs: [
    {
      statement: "Revenue is a vanity metric until it is profitable.",
      body: "Any agency can buy revenue with your money. We plan against profit-first benchmarks — contribution margin, CAC payback, blended returns — and we would rather tell you a channel does not work than keep spending in it to protect a dashboard.",
    },
    {
      statement: "Operations decide who wins the channel.",
      body: "Listings, catalog data, stock, reviews and account standing set the ceiling on what advertising can achieve. Fix the operating layer and the same media budget performs better, which is usually the cheapest growth available to a brand.",
    },
    {
      statement: "Data earns the decision; creative wins the customer.",
      body: "Insight without execution is a report nobody acts on, and creative without evidence is a preference argument. We pair customer research and performance data with creative built for the platform it runs on, then test until the numbers agree.",
    },
    {
      statement: "It is never one-size-fits-all.",
      body: "Marketplace expansion, DTC scaling and retention are different problems, and a brand at its first thousand orders needs a different plan than one at its hundred-thousandth. We build the plan around your goals and your margins, then work the whole funnel.",
    },
  ],

  differentiators: [
    {
      n: "01",
      title: "An integrated growth partner, not just an ad agency",
      body: "We partner with ambitious ecommerce brands and manage the full technical stack behind marketplaces and DTC: conversion-driven design, catalog efficiency and advanced advertising. We work as an extension of your team, so operations, growth and profitability stay joined up.",
    },
    {
      n: "02",
      title: "Data-led strategy, creative execution",
      body: "We pair actionable insight with creative that converts — from deep customer research to targeted messaging — so every decision is grounded in performance data and optimised for return rather than taste.",
    },
    {
      n: "03",
      title: "Full-funnel growth, tailored to scale",
      body: "Marketplace expansion, DTC scaling or retention: we build the plan around your goals and work the entire funnel for long-term, profitable growth. It is never one-size-fits-all; it is what works for you.",
    },
  ],

  capabilities: [
    {
      title: "Profit-first media buying & growth",
      items: [
        "Data-driven media planning",
        "Profit-first growth benchmarking",
        "Rapid testing and scaling",
      ],
    },
    {
      title: "Creative strategy & production",
      items: [
        "Hook-based storyboarding",
        "Platform-native ad creation",
        "Iterative content testing",
      ],
    },
    {
      title: "Conversion rate optimisation",
      items: [
        "Landing page A/B testing",
        "Funnel performance analysis",
        "User behaviour insights",
      ],
    },
    {
      title: "Performance analytics & reporting",
      items: [
        "Custom dashboard setup",
        "ROI and attribution modelling",
        "Weekly growth reports",
      ],
    },
    {
      title: "Audience research & segmentation",
      items: [
        "Psychographic and demographic profiling",
        "Lookalike audience development",
        "Behaviour-based targeting",
      ],
    },
    {
      title: "Full-funnel growth strategy",
      items: [
        "Top-to-bottom funnel mapping",
        "Lifecycle campaign integration",
        "Continuous optimisation loops",
      ],
    },
  ],

  reach: {
    countries: "8+",
    marketplaces: "15+",
    brands: "100+",
  },

  seo: {
    title: "About Us: Ecommerce Growth Partner in Mumbai",
    description:
      "An integrated ecommerce growth partner for consumer brands: 100+ brands scaled, 15+ marketplaces operated, 85% annual client retention. How we work.",
  },
};
