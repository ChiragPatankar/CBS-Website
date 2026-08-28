/**
 * Shared content types.
 *
 * Field names deliberately mirror the CMS content model in
 * docs/01-information-architecture.md §5, so a later Sanity migration replaces
 * the module bodies rather than every consumer.
 *
 * Icons are stored as STRING NAMES, never as `LucideIcon` component references.
 * These files are read by Server Components that pass data into Client
 * Components, and a function is not serialisable across that boundary — a live
 * icon component in the payload throws at render. `src/lib/icons.ts` resolves
 * the name. (`content/home.ts` predates this and holds real components; it works
 * only because its consumers are all `"use client"` and import it directly.)
 */
import type { IconName } from "@/lib/icons";

export type PillarSlug = "marketplace" | "growth" | "technology";

/** Editorial confidence. Anything other than `published` renders a visible notice. */
export type ContentStatus = "published" | "draft-unreviewed" | "placeholder";

export type Metric = {
  value: string;
  label: string;
  direction?: "up" | "down" | "neutral";
};

export type Faq = { q: string; a: string };
export type Benefit = { title: string; body: string; icon: IconName };
export type Step = { title: string; body: string };
export type Deliverable = { title: string; body: string; icon: IconName };

export type Seo = {
  title: string;
  description: string;
};

export type Pillar = {
  slug: PillarSlug;
  /** Full name, e.g. "Marketplace Solutions". Must match site.ts nav title. */
  name: string;
  eyebrow: string;
  h1: string;
  sub: string;
  /** One-paragraph positioning statement for the pillar hero. */
  intro: string;
  /** The tension this pillar resolves — drives the "problem" beat. */
  tension: string;
  outcomes: Metric[];
  /** Ordering is authoritative for the pillar page. */
  serviceSlugs: string[];
  seo: Seo;
};

export type Service = {
  slug: string;
  pillar: PillarSlug;
  /** Full service name. */
  name: string;
  /** Short label for nav and cards. Must match site.ts item label. */
  navLabel: string;
  eyebrow: string;
  /** The promise, set as the page H1. */
  h1: string;
  /** What the client is up against before CrossBorder is involved. */
  problem: string;
  overview: string;
  overviewPoints?: string[];
  /** Platform / channel wordmarks. No logo files exist, so these render as text. */
  platforms: readonly string[];
  benefits: Benefit[];
  steps: Step[];
  deliverables: Deliverable[];
  faqs: Faq[];
  icon: IconName;
  seo: Seo;
  status: ContentStatus;
  /** Shown inside the review banner when status is not `published`. */
  reviewNote?: string;
};

export type CaseStudy = {
  slug: string;
  /** true ⇒ DRAFT badge on every surface + noindex. */
  draft: boolean;
  client: string;
  industry: string;
  pillars: PillarSlug[];
  marketplaces: string[];
  headline: string;
  summary: string;
  /** Hex, drives the card accent. */
  accent: string;
  metrics: Metric[];
  challenge: string;
  approach: string[];
  results: string;
};

export type LegalSection = { id: string; heading: string; body: string[] };

export type LegalDoc = {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  /** true ⇒ renders a "needs legal review" notice. */
  reviewRequired?: boolean;
  seo: Seo;
};
