# 02 — Folder Structure

The physical tree has been created (empty, `.gitkeep`-preserved). Routes and
component categories mirror the IA (doc 01) and component hierarchy (doc 03).
**No page or component code exists yet** — only the skeleton.

## Repository layout

```
D:\CBS
├── content/                      # EXISTING — scraped current-site markdown (research input)
├── docs/                         # EXISTING — strategy blueprint (00–08) = source of truth
│   └── foundation/               # THIS layer — build setup decisions
├── crawl.py                      # EXISTING — scraper
│
├── public/                       # Static assets served as-is
│   ├── logos/
│   │   ├── clients/              # DN, Lenovo, Sleepwell, … (one file per client)
│   │   ├── partners/             # Amazon, Flipkart, Meta, Google, Shopify, …
│   │   └── brand/                # CrossBorder logo lock-ups, favicon
│   ├── images/
│   │   ├── hero/                 # aurora renders, hero art
│   │   └── case-studies/         # per-study imagery
│   └── fonts/                    # self-hosted General Sans, Inter, Geist Mono
│
├── src/
│   ├── app/                      # Next.js App Router — ROUTES ONLY (pages built later)
│   │   ├── (marketing)/          # route group: public marketing site
│   │   │   ├── solutions/
│   │   │   │   ├── marketplace/{cataloging-creative,global-selling,growth-management,expansion}/
│   │   │   │   ├── growth/{meta-ads,google-ads,shopify,retention}/
│   │   │   │   └── technology/{web-development,mobile-apps,cloud,ai-ml}/
│   │   │   ├── work/[slug]/      # case-study detail (dynamic)
│   │   │   ├── approach/  about/  ai-audit/  contact/  privacy/  terms/
│   │   │   └── (layout.tsx, page.tsx … added in build phases)
│   │   └── api/{ai-audit,contact,newsletter}/   # route handlers (built later)
│   │
│   ├── components/               # Design system — atomic layers (doc 03)
│   │   ├── primitives/           # atoms:      Button, Input, Text, Icon, Badge …
│   │   ├── composites/           # molecules:  StatCounter, ServiceCard, LogoWall …
│   │   ├── sections/             # organisms:  Hero, MegaMenu, SiteFooter, CTASection …
│   │   ├── templates/            # page templates: HomeTemplate, ServiceDetailTemplate …
│   │   └── providers/            # ThemeProvider, AnalyticsProvider
│   │
│   ├── styles/
│   │   ├── tokens/               # tokens.json (source) → generated CSS variables
│   │   └── (globals.css, generated tokens.css … added in Phase 1)
│   │
│   ├── content/                  # CMS integration
│   │   ├── schemas/              # Sanity document/object schemas (doc 01 content model)
│   │   └── queries/             # GROQ queries + typed fetchers
│   │
│   ├── config/                   # site.ts (nav, footer, contact), seo.ts, routes.ts
│   ├── lib/                      # utils: cn(), formatters, analytics events, api clients
│   ├── hooks/                    # useReducedMotion, useInView, useTheme, useMediaQuery
│   └── types/                    # shared TS types (content, props, api)
│
├── .storybook/                   # Storybook config (component workshop)
└── tests/
    ├── unit/                     # Vitest + RTL
    ├── e2e/                      # Playwright (journeys from doc 05)
    └── a11y/                     # axe checks
```

## Layer boundaries (import rules)

Enforced later via ESLint `import/no-restricted-paths`. Dependencies flow **one way**:

```
templates  →  sections  →  composites  →  primitives  →  tokens/lib
     │            │             │              │
     └── may use providers, config, content, hooks, lib at any level ──┘
```

- **primitives** import only tokens, `lib`, and other primitives. Never composites/sections.
- **composites** import primitives (+ lib/hooks). Never sections/templates.
- **sections** import composites + primitives. Never other sections’ internals, never templates.
- **templates** compose sections (+ content/config). Pages (`app/`) render templates + fetch data.
- **No component hard-codes a style value** — always a token.
- **No cross-feature reach-around**: shared logic lives in `lib`/`hooks`, not copied.

## Where each blueprint component lands

| Layer | Folder | Components (doc 03) |
|-------|--------|---------------------|
| Primitives | `components/primitives` | Button, Link, Text, Heading, Eyebrow, Icon, BrandMark, Badge, Input, Textarea, Select, Avatar, Divider, GradientText, Tag/Chip |
| Composites | `components/composites` | StatCounter, MetricDelta, ServiceCard, CaseStudyCard, TestimonialCard, FeatureCard, StepItem, FAQItem, LogoWall, PillarColumn, CTAButtonGroup, FilterBar, StatBand, ThemeToggle |
| Sections | `components/sections` | SiteHeader, MegaMenu, SiteFooter, Hero, TwoMotionSelector, SolutionsOverview, FeaturedWork, WorkGrid, CaseStudyBody, DeliverablesGrid, HowItWorks, PartnersStrip, ProofBand, PurposeBlock, FAQSection, CTASection, AIAuditWidget, FloatingAssistant, LeadForm, NewsletterForm, LegalLayout |
| Templates | `components/templates` | Home, SolutionsHub, Pillar, ServiceDetail, WorkIndex, CaseStudy, About, Approach, AIAudit, Contact, Legal |
| Providers | `components/providers` | ThemeProvider, AnalyticsProvider |

## Per-component file convention (applied in build phases, not now)

```
components/primitives/Button/
├── Button.tsx            # component (RSC-safe or 'use client' as needed)
├── Button.variants.ts    # CVA variant definitions (token-driven)
├── Button.stories.tsx    # Storybook
├── Button.test.tsx       # Vitest + RTL + axe
└── index.ts              # barrel re-export
```
