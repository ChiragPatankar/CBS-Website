# 01 — Information Architecture

## 1. Principles

1. **Two-motion spine.** Everything maps to where a brand is: *Launch & Growth* (0→1) or *Scale & Optimize* (1→n). This is CBBS's clearest existing idea; make it the organizing metaphor.
2. **Three pillars, one portfolio.** Marketplace Solutions · Digital Commerce Growth · Technology & AI. Give the portfolio a hub so users see the whole shape before drilling in.
3. **Proof is a first-class citizen.** Case studies get their own top-level home, not a buried logo wall.
4. **One primary action everywhere:** *Book a growth call*. One secondary: *Get an AI growth audit*.
5. **Shallow & scannable.** Max depth = 3 clicks from home to any leaf. Clean, human-readable URLs.

## 2. Sitemap

```
/                                   Home
│
├── /solutions                      Solutions hub (the whole portfolio)
│   ├── /solutions/marketplace      Pillar: Marketplace Solutions
│   │   ├── …/cataloging-creative       Cataloging & Creative Optimization
│   │   ├── …/global-selling            Cross-Border Global Selling
│   │   ├── …/growth-management         Marketplace Growth & Management
│   │   └── …/expansion                 New Marketplace Expansion
│   ├── /solutions/growth           Pillar: Digital Commerce Growth
│   │   ├── …/meta-ads                  Meta Ads — Performance & Branding
│   │   ├── …/google-ads                Google Ads — Demand Capture
│   │   ├── …/shopify                    Shopify Design & Build
│   │   └── …/retention                  Retention — Email, SMS & WhatsApp
│   └── /solutions/technology       Pillar: Technology & AI
│       ├── …/web-development           Custom Web Development
│       ├── …/mobile-apps               Mobile App Development
│       ├── …/cloud                      Cloud Infrastructure
│       └── …/ai-ml                      AI & Machine Learning
│
├── /work                           Case studies index (filterable)
│   └── /work/[slug]                Individual case study
│
├── /approach                       How we work (profit-first method, the two motions)
│
├── /about                          Company, purpose, team, results
│
├── /ai-audit                       AI Growth Audit (interactive, lead-gen)
│
├── /contact  (= /hire)             Book a call / contact form
│
├── /resources        (future)     Insights / playbooks / blog
│   └── /resources/[slug]
│
├── /privacy                        Privacy Policy
└── /terms            (future)      Terms of Service
```

### URL migration map (old → new, with redirects)

| Old | New | Redirect |
|-----|-----|----------|
| `/work-with-us/cataloging-creative` | `/solutions/marketplace/cataloging-creative` | 301 |
| `/work-with-us/global-selling` | `/solutions/marketplace/global-selling` | 301 |
| `/work-with-us/growth-management` | `/solutions/marketplace/growth-management` | 301 |
| `/work-with-us/marketplace-expansion` | `/solutions/marketplace/expansion` | 301 |
| `/work-with-us/meta-ads` | `/solutions/growth/meta-ads` | 301 |
| `/work-with-us/google-ads` | `/solutions/growth/google-ads` | 301 |
| `/work-with-us/shopify-design` | `/solutions/growth/shopify` | 301 |
| `/work-with-us/retention-marketing` | `/solutions/growth/retention` | 301 |
| `/hire` | `/contact` | 301 (keep `/hire` alias) |

> Keep URLs short. `/solutions/<pillar>/<service>` is clear and SEO-friendly.
> The old doubled `/work-with-us/work-with-us/...` links are dropped entirely.

## 3. Navigation model

### Primary nav (sticky, translucent, condenses on scroll)

```
[CrossBorder logo]   Solutions ▾   Work   Approach   About        [Get AI audit]  [Book a call →]
```

**`Solutions ▾` = mega-menu** (three columns = three pillars), the site's centerpiece:

```
┌─ Marketplace Solutions ─┬─ Digital Commerce Growth ─┬─ Technology & AI ────────┐
│ Cataloging & Creative   │ Meta Ads                  │ Custom Web Development     │
│ Global Selling          │ Google Ads                │ Mobile App Development     │
│ Growth & Management     │ Shopify Design & Build    │ Cloud Infrastructure       │
│ New Marketplace Expansion│ Retention (Email/SMS/WA) │ AI & Machine Learning      │
├─────────────────────────┴───────────────────────────┴───────────────────────────┤
│  Not sure where to start?  →  Take the 2-minute AI Growth Audit                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

Each item shows a 16px icon + label + one-line descriptor on hover. The footer strip of the mega-menu routes indecisive users into the AI audit.

### Footer (corrected & simplified)

- **Marketplace Solutions** — 4 correct links
- **Digital Commerce Growth** — 4 correct links
- **Technology & AI** — 4 correct links (fixes defect C4/C3: real targets, "AI" not "Al")
- **Company** — About, Approach, Work, Contact
- **Legal** — Privacy, Terms
- Address (Mumbai), email, social, newsletter opt-in
- Tagline lock-up: *Simplifying Business. Amplifying Success.*

## 4. Page hierarchy (template types)

| Template | Pages using it | Key sections (top → bottom) |
|----------|----------------|------------------------------|
| **T1 Home** | `/` | Hero → Trust strip → Two-motion selector → Solutions overview → Featured case studies → AI-audit CTA → Proof/stats → Partners → Purpose → Final CTA |
| **T2 Solutions Hub** | `/solutions` | Hero → Pillar overview (3) → Full service grid → "Find your fit" (AI) → Proof → CTA |
| **T3 Pillar** | `/solutions/{pillar}` | Pillar hero → Included services (cards) → Outcomes/stats → Related work → CTA |
| **T4 Service Detail** | 12 service leaves | Hero (name + promise + CTA) → Overview → Platform logos → Key benefits → How it works (steps) → Deliverables (6) → Stats band → Related case studies → FAQ → CTA |
| **T5 Work Index** | `/work` | Hero → Filter bar (pillar/industry/marketplace) → Case-study grid → Logo wall → CTA |
| **T6 Case Study** | `/work/[slug]` | Hero (client + headline result) → At-a-glance metrics → Challenge → Approach → Solution → Results → Testimonial → Next case → CTA |
| **T7 About** | `/about` | Hero → Purpose → Differentiators (3) → Capabilities → Results/stats → Team → CTA |
| **T8 Approach** | `/approach` | Hero → Profit-first philosophy → The two motions → Method steps → Tooling/AI → CTA |
| **T9 Interactive** | `/ai-audit` | Conversational multi-step audit → Personalized result → Lead capture |
| **T10 Conversion** | `/contact` | Split layout: value-recap + qualified form → Confirmation |
| **T11 Legal** | `/privacy`, `/terms` | Prose layout with sticky ToC |

## 5. Content model (for a headless CMS)

Structured types so content is data, not markup — this is how the duplication (D1–D10) is eliminated at the source.

- **Service** — name, slug, pillar, promise, overview, benefits[], steps[], deliverables[], faqs[], heroImage, relatedCaseStudies[], platforms[]
- **CaseStudy** — client, industry, marketplaces[], pillar, headlineMetric, metrics[], challenge, approach, results, testimonialRef, gallery[]
- **Testimonial** — quote, author, role, company, avatar, caseStudyRef
- **Client** — name, logo (single source → fixes D3)
- **Stat** — label, value, motion-format (fixes D5, one source)
- **Partner** — name, logo, category
- **Pillar** — name, slug, description, services[]
- **Global** — nav, footer, contact, purpose, tagline
