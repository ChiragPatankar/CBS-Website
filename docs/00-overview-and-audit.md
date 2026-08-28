# 00 — Overview & Audit

## 1. Company snapshot

| Attribute | Detail |
|-----------|--------|
| Name | CrossBorder Business Solution (CBBS) |
| Domain | cbbusinesssolution.com |
| Location | Kandivali-West, Mumbai 400067, India |
| Contact | support@cbbusinesssolution.com · WhatsApp (Vinayak, ~1hr reply) |
| Positioning | Profit-first, purpose-driven **ecommerce growth partner** — "more than media buying" |
| Tagline | *Simplifying Business, Amplifying Success* |
| Proof metrics | 100+ brands · 4.3× avg ROAS · 15+ marketplaces · 85% retention · 8+ countries · 9+ yrs |
| Two motions | **Launch & Growth** (0→1, 120+ startups, 2.3× ROI, 1.8× retention) · **Scale & Optimize** (75+ brands, 3.1× LTV, −40% CAC) |

**Service portfolio (three pillars):**

1. **Marketplace Solutions** — Cataloging & Creative, Global (cross-border) Selling, Growth & Management, New Marketplace Expansion
2. **Digital Commerce Growth** — Meta Ads, Google Ads, Shopify Design & Build, Retention (Email/SMS/WhatsApp)
3. **Technology & Development** — Custom Web, Mobile Apps, Cloud Infrastructure, AI & Machine Learning *(currently promised on the homepage but has no real pages)*

**Named clients/logos:** DN, GSI, Kvaas, Lenovo, Metashot, MTR, Sol, Sleepwell, USC, Vinod, Zindagi, Zymss, Kurlon, Izod, Quali, IPC, Reebok, Safron.

**Purpose statement (keep — it's strong):**
> Enable a new breed of profit-first brands to challenge the incumbents that
> perpetuate the status quo — better for customers, employees, communities and
> the planet.

## 2. Current page inventory

| Page | URL | Purpose today | Verdict |
|------|-----|---------------|---------|
| Home | `/` | Everything at once | Overloaded, duplicated — rebuild |
| About | `/about` | Story + capabilities + stats | Good raw material — restructure |
| Work | `/work` | Case studies | **Empty** — just a logo wall + "All" filter |
| Hire us | `/hire` | Lead form | Keep, elevate to a real conversion flow |
| Privacy | `/privacy` | Legal | Keep, restyle |
| Cataloging & Creative | `/work-with-us/cataloging-creative` | Service detail | Keep — strong template |
| Global Selling | `/work-with-us/global-selling` | Service detail | Keep |
| Growth & Management | `/work-with-us/growth-management` | Service detail | **Placeholder** deliverables & FAQ |
| Marketplace Expansion | `/work-with-us/marketplace-expansion` | Service detail | Keep |
| Meta Ads | `/work-with-us/meta-ads` | Service detail | Keep |
| Google Ads | `/work-with-us/google-ads` | Service detail | Keep |
| Shopify Design | `/work-with-us/shopify-design` | Service detail | Keep |
| Retention Marketing | `/work-with-us/retention-marketing` | Service detail | Keep |

## 3. Duplicate-content register

Removing these is task #2 of the brief. Each is a concrete defect to fix.

| # | Duplication | Where | Fix |
|---|-------------|-------|-----|
| D1 | **Entire homepage duplicated twice** in one export | `website-content.md` (`/` and `/`) | Single canonical home; drop the aggregate export from the site |
| D2 | **Category grid repeated 4×** (Health/Tech/Travel/Food/Fashion/Sports/Education/Entertainment ×4) | Home | Render once as a marquee/carousel from one data array |
| D3 | **Trust-logo wall printed twice** (the full client array is duplicated back-to-back) on every page | All pages | One `<LogoWall>` fed by one array; infinite-scroll marquee, not duplicated DOM |
| D4 | **Two logo strips on home** — "Trusted by 100+" mini strip **and** "Backed by Hundreds" full wall | Home | Keep one hero strip + one dedicated proof section, distinct content |
| D5 | **Identical stat block** (100+/4.3×/15+/85%/8+/9+) repeated on home, about and all 8 service pages | Everywhere | One `<StatBand>` component, single source of truth |
| D6 | **"Conversion Customized Product Listings" deliverable repeated 6×** verbatim | `growth-management` | Replace with 6 distinct deliverables (see Copy doc) |
| D7 | **Same image** (`weetabix.jpg`) used for both Launch and Scale stage cards | Home | Distinct imagery per stage |
| D8 | **"Success Stories from Our Clients"** heading appears with no actual stories | Home, Work, service pages | Build real case-study cards; stop repeating an empty promise |
| D9 | **WhatsApp/"Vinayak replies within 1 hour"** widget baked into content on every page | All | Single global floating widget, not page content |
| D10 | **Footer repeated** as content in every export | All | One global `<Footer>` |

## 4. Content & correctness defects

| # | Defect | Location | Fix |
|---|--------|----------|-----|
| C1 | `Built onProfit` — missing space | Home hero | "Built on Profit-First Principles" |
| C2 | `Holistic Holistic` — repeated word | Home | "A Holistic Ecommerce Growth Partner" |
| C3 | `Al & Machine Learning` — "Al" should be "AI" | Home + all footers | "AI & Machine Learning" |
| C4 | Footer **Technology & Development** links point to ad/marketing URLs (`/meta-ads`, `/google-ads`…) | All footers | Point to real tech pages (or remove until built) |
| C5 | Service-page footers use **doubled path** `/work-with-us/work-with-us/...` | 8 service pages | Correct to single `/services/...` (new scheme) |
| C6 | `your success` — lowercase sentence start | Home hero sub | Capitalize |
| C7 | Growth & Management FAQ is a placeholder ("Is it accessible?") | `growth-management` | Write real FAQs |
| C8 | `/contact-us/` referenced in Privacy but no such page | Privacy | Point to `/contact` or `/hire` |
| C9 | Buttons run together: `View ResultBook a Call`, `GoogleFacebookInstagram…` | Home, Privacy | Discrete buttons/links with spacing |
| C10 | Marketing icons mislabeled (LinkedIn uses amazon.svg, YouTube uses linkedin icon, etc.) | Home offerings | Correct icon-to-label mapping |

## 5. Structural problems (beyond copy)

- **No real case studies.** The single biggest credibility gap. The site repeatedly says "Backed by hundreds of businesses" and "Success Stories" but shows only logos. The redesign must introduce a true **Work / Case Studies** system with metrics, narrative and imagery.
- **Flat hierarchy.** 8 sibling service pages under a `work-with-us` label with no grouping page. Users can't see the portfolio shape.
- **Homepage tries to be everything** — brand story, services, categories, partners, stats, purpose — with no narrative arc or progressive disclosure.
- **Trust signals are quantitative only.** Numbers with no stories, testimonials with no quotes, logos with no outcomes.
- **No AI narrative** despite AI/ML being a listed capability and the brief calling for AI-first.
- **Generic identity.** Stock Unsplash category images, no distinctive type or color system, no motion.

## 6. What to preserve (equity to keep)

- Tagline: *Simplifying Business, Amplifying Success.*
- The **profit-first / purpose-driven** positioning and purpose statement.
- The proof metrics (as a single source of truth).
- The two-motion model (Launch & Growth / Scale & Optimize) — a genuinely good IA spine.
- The three service pillars.
- The service-detail page template (Overview → Benefits → How it works → Deliverables → Stats → Results → FAQ) — it's solid; just de-duplicate and fill it.
- Real client logos and marketplace-partner logos.

## 7. Opportunities the redesign unlocks

1. **AI-first layer** — an AI growth-audit assistant, an interactive ROI/ROAS calculator, and personalized service recommendations turn a brochure into a consultation.
2. **Evidence-driven design** — every metric animated and sourced; every service tied to a real case study.
3. **Cross-border story** — lean into the literal "cross-border" identity (global reach, multi-marketplace) as a visual motif.
4. **Premium, dark-first aesthetic** — differentiate sharply from the sea of generic agency sites.
5. **Conversion architecture** — one clear primary action (*Book a growth call*) reinforced throughout, with a low-friction AI entry point as the secondary.
