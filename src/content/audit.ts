import type { PillarSlug } from "@/content/types";

/**
 * The growth audit is a deterministic scorer, not a model.
 *
 * Each option carries weights; the engine sums them and picks a winner. That
 * means the same answers always produce the same recommendation, it needs no API
 * key or network call, and — importantly — it cannot invent a claim about the
 * user's business the way a generative answer could.
 *
 * `motionWeight` is a single axis: negative pulls toward Launch & Growth (still
 * establishing a channel), positive toward Scale & Optimize (channel works, the
 * economics need fixing).
 */
export type AuditOption = {
  id: string;
  label: string;
  hint?: string;
  motionWeight: number;
  pillarWeights: Partial<Record<PillarSlug, number>>;
  serviceWeights?: Record<string, number>;
};

export type AuditQuestion = {
  id: string;
  prompt: string;
  help?: string;
  options: AuditOption[];
};

export const auditQuestions: AuditQuestion[] = [
  {
    id: "stage",
    prompt: "Where is your brand right now?",
    help: "Pick the one that stings most.",
    options: [
      {
        id: "pre-launch",
        label: "Not selling on marketplaces yet",
        hint: "DTC only, or just getting started",
        motionWeight: -2,
        pillarWeights: { marketplace: 3 },
        serviceWeights: { expansion: 3, "cataloging-creative": 2 },
      },
      {
        id: "live-flat",
        label: "Live on one or two channels, but flat",
        hint: "Revenue has stopped moving",
        motionWeight: -1,
        pillarWeights: { marketplace: 2, growth: 2 },
        serviceWeights: { "growth-management": 3, "meta-ads": 1 },
      },
      {
        id: "growing-thin",
        label: "Growing, but margin is thinning",
        hint: "Top line up, profit flat or down",
        motionWeight: 2,
        pillarWeights: { growth: 3, marketplace: 1 },
        serviceWeights: { "growth-management": 2, "google-ads": 2 },
      },
      {
        id: "scaled-capped",
        label: "Scaled and hitting a ceiling",
        hint: "Need new channels or new geographies",
        motionWeight: 2,
        pillarWeights: { marketplace: 2, technology: 2 },
        serviceWeights: { "global-selling": 3, expansion: 2 },
      },
    ],
  },
  {
    id: "constraint",
    prompt: "What is actually holding you back?",
    options: [
      {
        id: "traffic",
        label: "Not enough qualified traffic",
        motionWeight: -1,
        pillarWeights: { growth: 3 },
        serviceWeights: { "meta-ads": 3, "google-ads": 3 },
      },
      {
        id: "conversion",
        label: "Traffic arrives but does not convert",
        motionWeight: 1,
        pillarWeights: { growth: 2, marketplace: 2 },
        serviceWeights: { shopify: 3, "cataloging-creative": 2 },
      },
      {
        id: "repeat",
        label: "Customers buy once and never return",
        motionWeight: 2,
        pillarWeights: { growth: 3 },
        serviceWeights: { retention: 4 },
      },
      {
        id: "ops",
        label: "Operations and data cannot keep up",
        motionWeight: 2,
        pillarWeights: { technology: 3, marketplace: 1 },
        serviceWeights: { cloud: 2, "web-development": 2, "ai-ml": 2 },
      },
    ],
  },
  {
    id: "channels",
    prompt: "How many channels are you selling on today?",
    options: [
      {
        id: "one",
        label: "One",
        motionWeight: -2,
        pillarWeights: { marketplace: 3 },
        serviceWeights: { expansion: 3 },
      },
      {
        id: "few",
        label: "Two or three",
        motionWeight: 0,
        pillarWeights: { marketplace: 2, growth: 1 },
        serviceWeights: { "growth-management": 2 },
      },
      {
        id: "many",
        label: "Four or more",
        motionWeight: 2,
        pillarWeights: { technology: 2, marketplace: 1 },
        serviceWeights: { "ai-ml": 2, cloud: 1, "growth-management": 1 },
      },
      {
        id: "cross-border",
        label: "Several, across more than one country",
        motionWeight: 2,
        pillarWeights: { marketplace: 3, technology: 1 },
        serviceWeights: { "global-selling": 4 },
      },
    ],
  },
  {
    id: "measurement",
    prompt: "Can you see profit by channel and by SKU?",
    help: "Honestly.",
    options: [
      {
        id: "no",
        label: "No — we look at revenue and ad spend",
        motionWeight: 1,
        pillarWeights: { technology: 3, growth: 1 },
        serviceWeights: { "ai-ml": 2, "growth-management": 2 },
      },
      {
        id: "partial",
        label: "Roughly, in a spreadsheet",
        motionWeight: 1,
        pillarWeights: { technology: 2, growth: 2 },
        serviceWeights: { "growth-management": 2, cloud: 1 },
      },
      {
        id: "yes",
        label: "Yes, down to contribution margin",
        motionWeight: 2,
        pillarWeights: { growth: 2, marketplace: 1 },
        serviceWeights: { "google-ads": 2, "meta-ads": 1 },
      },
    ],
  },
  {
    id: "priority",
    prompt: "If one thing improved this quarter, which would you pick?",
    options: [
      {
        id: "new-channel",
        label: "A new channel live and selling",
        motionWeight: -2,
        pillarWeights: { marketplace: 3 },
        serviceWeights: { expansion: 3, "cataloging-creative": 1 },
      },
      {
        id: "roas",
        label: "Better return on ad spend",
        motionWeight: 1,
        pillarWeights: { growth: 3 },
        serviceWeights: { "meta-ads": 2, "google-ads": 2 },
      },
      {
        id: "ltv",
        label: "Higher lifetime value per customer",
        motionWeight: 2,
        pillarWeights: { growth: 3 },
        serviceWeights: { retention: 3, "ai-ml": 1 },
      },
      {
        id: "platform",
        label: "A storefront and stack that stops breaking",
        motionWeight: 1,
        pillarWeights: { technology: 3 },
        serviceWeights: { shopify: 2, "web-development": 3 },
      },
    ],
  },
];

export const auditCopy = {
  eyebrow: "Growth audit",
  h1: "Find your starting point in two minutes",
  sub: "Five questions. No email required to see the result, and nothing here is a generated guess — the recommendation is a fixed scoring rule you could check by hand.",
  resultEyebrow: "Your read",
  disclaimer:
    "This is a directional recommendation from your answers, not a forecast. It says where to look first — it does not predict a number.",
};

export const motionCopy: Record<
  "launch" | "scale",
  { title: string; when: string; body: string }
> = {
  launch: {
    title: "Launch & Growth",
    when: "0 → 1",
    body: "You are still establishing a channel. The priority is getting listings, creative and demand working together well enough to prove the channel can carry volume at all.",
  },
  scale: {
    title: "Scale & Optimize",
    when: "1 → n",
    body: "The channel works. Now the economics matter: spend follows margin, retention does the compounding, and operations stop being the constraint.",
  },
};
