/**
 * Homepage content — single source of truth for every data-driven section.
 * Copy from docs/08-copy-rewrite.md; metrics from docs/00-overview-and-audit.md.
 * (In production this comes from the CMS; typed here for the prototype.)
 *
 * NOTE: the `caseStudies` and `testimonials` arrays were removed from this file.
 * They contained invented figures ("+312% Revenue in 9 months") and invented
 * customer quotes, and were rendering on the live homepage as fact. Case studies
 * now come from `@/content/work`, where every entry is draft-flagged and badged.
 */
import {
  BarChart3,
  Boxes,
  BrainCircuit,
  Gauge,
  LineChart,
  Megaphone,
  Palette,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export type Stat = { value: number; suffix?: string; decimals?: number; label: string };

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Brands scaled worldwide" },
  { value: 4.3, suffix: "×", decimals: 1, label: "Average growth in ROAS" },
  { value: 15, suffix: "+", label: "Global marketplaces operated" },
  { value: 85, suffix: "%", label: "Annual client retention" },
  { value: 8, suffix: "+", label: "Countries served" },
  { value: 9, suffix: "+", label: "Years of experience" },
];

export const marketplaces = [
  "Amazon",
  "Flipkart",
  "Walmart",
  "Shopify",
  "eBay",
  "Etsy",
  "Myntra",
  "Noon",
] as const;

export type Motion = {
  id: "launch" | "scale";
  eyebrow: string;
  title: string;
  proof: string;
  body: string;
  metrics: { value: string; label: string }[];
};

export const motions: Motion[] = [
  {
    id: "launch",
    eyebrow: "0 → 1",
    title: "Launch & Growth",
    proof: "120+ startups trusted us with their 0→1.",
    body: "Build a conversion-ready presence across marketplaces and DTC, win your first customers, gather reviews, and create the traction that compounds.",
    metrics: [
      { value: "2.3×", label: "Growth in marketing ROI" },
      { value: "1.8×", label: "Growth in customer retention" },
    ],
  },
  {
    id: "scale",
    eyebrow: "1 → n",
    title: "Scale & Optimize",
    proof: "75+ brands scaled beyond early traction.",
    body: "Sharpen operations, improve unit economics, and expand into new channels with advanced analytics and performance marketing built for scale.",
    metrics: [
      { value: "3.1×", label: "Increase in customer LTV" },
      { value: "40%", label: "Reduction in CAC" },
    ],
  },
];

export type Capability = { icon: LucideIcon; title: string; desc: string; tag: string };

export const capabilities: Capability[] = [
  {
    icon: BrainCircuit,
    title: "Predictive growth modeling",
    desc: "ML forecasts demand, budget allocation, and profitability so every rupee is deployed where it compounds.",
    tag: "AI",
  },
  {
    icon: Wand2,
    title: "AI creative testing",
    desc: "Generate, score, and iterate ad creative at scale — winning hooks surfaced in days, not months.",
    tag: "AI",
  },
  {
    icon: Boxes,
    title: "Catalog automation",
    desc: "Automated listing optimization and content hygiene across 15+ marketplaces from one control plane.",
    tag: "Automation",
  },
  {
    icon: BarChart3,
    title: "Attribution & analytics",
    desc: "Unified dashboards with ROI and attribution modeling — profit-first, not vanity metrics.",
    tag: "Data",
  },
  {
    icon: Target,
    title: "Audience intelligence",
    desc: "Psychographic segmentation and lookalike modeling that finds high-intent buyers before competitors do.",
    tag: "AI",
  },
  {
    icon: Gauge,
    title: "Conversion optimization",
    desc: "Continuous A/B testing across funnels and storefronts to lift revenue per visitor.",
    tag: "CRO",
  },
];

export type Industry = { icon: LucideIcon; name: string };

export const industries: Industry[] = [
  { icon: Sparkles, name: "Health & Wellness" },
  { icon: BrainCircuit, name: "Technology" },
  { icon: Rocket, name: "Travel" },
  { icon: Palette, name: "Food & Dining" },
  { icon: Megaphone, name: "Fashion" },
  { icon: TrendingUp, name: "Sports" },
  { icon: LineChart, name: "Education" },
  { icon: Wand2, name: "Entertainment" },
];

export const clients = [
  "DN", "GSI", "Kvaas", "Lenovo", "Metashot", "MTR", "Sol", "Sleepwell",
  "USC", "Vinod", "Zindagi", "Zymss", "Kurlon", "Izod", "Quali", "IPC",
  "Reebok", "Safron",
] as const;

