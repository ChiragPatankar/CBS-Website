/**
 * Approach page content — the philosophy, the engagement sequence, the two
 * motions and the instrumentation behind them.
 *
 * `tooling[].icon` values are names from `src/lib/icons.ts`, never component
 * references: this data crosses a Server → Client Component boundary.
 */
import type { IconName } from "@/lib/icons";
import type { Seo } from "./types";

export type MethodStep = { title: string; body: string };

export type Motion = {
  id: "launch" | "scale";
  title: string;
  when: string;
  body: string;
  focus: string[];
};

export type Tool = { title: string; body: string; icon: IconName };

export type Approach = {
  eyebrow: string;
  h1: string;
  sub: string;
  philosophy: string[];
  methodSteps: MethodStep[];
  motions: Motion[];
  tooling: Tool[];
  seo: Seo;
};

export const approach: Approach = {
  eyebrow: "Our approach",
  h1: "Profit-first, or it does not count as growth",
  sub: "How we diagnose a business, decide what to work on, and keep compounding the parts that pay.",

  philosophy: [
    "Profit-first means the P&L sets the target before any channel does. We start from your margins, your CAC payback tolerance and your contribution per order, then work backwards to what media, catalog and creative have to deliver. A campaign that hits its ROAS goal and loses money on delivery is a failure, and we would rather say so in week two than defend it in month six.",
    "It also changes what we do first. The cheapest growth in most brands is not more spend, it is the operating layer: listings that rank, product data that is correct, a checkout that does not leak, and follow-up that turns a first order into a second. We fix that ceiling before we raise the budget, because the same money buys more once the machine underneath it works. Everything is measured net of costs, reported weekly, and open to being killed.",
  ],

  methodSteps: [
    {
      title: "Diagnose",
      body: "Two weeks inside the accounts. We audit marketplace and DTC performance, unit economics, catalog health, creative inventory, tracking and the conversion path, then write down what is actually constraining growth. You get the findings whether or not you engage us further.",
    },
    {
      title: "Prioritise",
      body: "We rank the fixes by expected profit per week of effort, not by what is most fun to build. That produces a short plan with named owners, profit-first benchmarks and an explicit list of what we are choosing not to do yet.",
    },
    {
      title: "Build",
      body: "Fix the ceiling before raising the spend: listings and catalog data, storefront and page speed, creative production, tracking and dashboards, and any engineering the plan depends on. Short cycles, shipped in sequence, with the measurement in place before the budget moves.",
    },
    {
      title: "Operate",
      body: "Weekly cadence on the live channels — media, catalog, account health, lifecycle programs — with one report that reconciles platform numbers against contribution margin. Tests run continuously and losing bets are cut on schedule rather than defended.",
    },
    {
      title: "Compound",
      body: "Quarterly, we take what worked and widen it: new marketplaces, new geographies, deeper retention, automation for anything now being done by hand. The point of a good quarter is a cheaper next one.",
    },
  ],

  motions: [
    {
      id: "launch",
      title: "Launch & Growth",
      when: "0 → 1. Pre-launch, or live but not yet predictable.",
      body: "Build a conversion-ready presence across marketplaces and DTC, win your first customers, gather reviews, and create the traction that compounds. The goal of this stage is not scale, it is a repeatable unit that survives more spend.",
      focus: [
        "Marketplace and DTC setup, listings and catalog build",
        "First creative library and offer testing",
        "Tracking, analytics and profit-first benchmarks from day one",
        "Review and rating programs that build early social proof",
      ],
    },
    {
      id: "scale",
      title: "Scale & Optimize",
      when: "1 → n. Traction exists; efficiency and expansion are the constraint.",
      body: "Sharpen operations, improve unit economics, and expand into new channels with advanced analytics and performance marketing built for scale. At this stage most of the upside is in margin and in channels you have not opened yet.",
      focus: [
        "Media efficiency against contribution margin, not platform ROAS",
        "Creative volume and structured testing cadence",
        "New marketplace and cross-border expansion",
        "Retention, LTV and automation of manual operations",
      ],
    },
  ],

  tooling: [
    {
      title: "Profit-first benchmarking",
      body: "Targets are set from your margins and CAC payback before a channel budget exists, so every decision has a number to be judged against.",
      icon: "gauge",
    },
    {
      title: "One reconciled dashboard",
      body: "Marketplace, ads, storefront and lifecycle data in one view, reconciled against contribution margin rather than left to disagree platform by platform.",
      icon: "line-chart",
    },
    {
      title: "A weekly operating cadence",
      body: "Fixed rhythm: one report, one prioritised action list, one decision log of what we started, changed or killed. No surprises at quarter end.",
      icon: "workflow",
    },
    {
      title: "Applied AI where it earns its place",
      body: "Machine learning for demand forecasting, creative testing and catalog automation — used to remove manual work and shorten learning cycles, not as a headline.",
      icon: "brain",
    },
  ],

  seo: {
    title: "Our Approach: Profit-First Ecommerce Growth",
    description:
      "Diagnose, prioritise, build, operate, compound: how CrossBorder runs ecommerce growth against contribution margin rather than revenue alone.",
  },
};
