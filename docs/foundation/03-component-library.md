# 03 — Reusable Component Library

The build inventory derived from `03-component-hierarchy.md`. This defines **what
each reusable component is and its prop contract** — the API to build against.
No implementations here (that's Phase 1+). Contracts use TS-ish shorthand.

## Shared conventions

- Every component: typed props, `className` passthrough, forwarded `ref` where DOM-bound, token-driven styles, dark+light correct, a11y-complete, reduced-motion aware.
- Variants via **CVA**; sizes are tokens (`sm | md | lg`).
- Data-driven components take **arrays from the CMS** — never hard-coded (this is how duplication D3–D6 stays dead).

## Primitives (atoms)

| Component | Key props | Variants / states | Notes |
|-----------|-----------|-------------------|-------|
| `Button` | `variant, size, iconLeft?, iconRight?, loading?, asChild?, href?` | primary·secondary·ghost·link; sm/md/lg; hover/active/focus/loading/disabled | `asChild` renders as `Link` for nav CTAs |
| `Link` | `href, variant, external?` | inline·nav·footer; current-state | Wraps `next/link` |
| `Heading` | `as (h1–h6), size, gradient?` | display/h1/h2/h3 | `gradient` clips aurora |
| `Text` | `as, size, tone` | body-lg/body/sm; primary/secondary/tertiary | |
| `Eyebrow` | `children` | mono uppercase | Section kicker |
| `Icon` | `name, size` | 16/20/24 | lucide-react wrapper |
| `BrandMark` | `name, kind` | client·partner; mono→tint on hover | Fixes mislabeled icons (C10) |
| `Badge` | `tone, children` | metric-up·metric-down·neutral·new | emerald = profit/up only |
| `Input`/`Textarea`/`Select` | `label, hint?, error?, ...native` | default/focus/error/disabled | RHF-compatible, labelled |
| `Avatar` | `src?, name, size` | image·initials fallback | |
| `Divider` | `variant` | solid·gradient | |
| `GradientText` | `children` | aurora clip | |
| `Tag`/`Chip` | `selected?, onToggle?` | default·selected | Filter chips |

## Composites (molecules)

| Component | Key props | Notes |
|-----------|-----------|-------|
| `StatCounter` | `value, label, format, suffix?` | Count-up on in-view (once); tabular-nums; **reads one stats source** (kills D5) |
| `MetricDelta` | `value, direction, label` | `4.3× ROAS ↑`, `−40% CAC` |
| `ServiceCard` | `icon, title, description, href` | Hover lift+glow; used in mega-menu/hub/pillar |
| `CaseStudyCard` | `image, client, headlineMetric, tags[], href` | Star of the Work system |
| `TestimonialCard` | `quote, author, role, company, avatar?` | Real quotes (fills D8) |
| `FeatureCard` | `icon, title, body` | Deliverables/benefits |
| `StepItem` | `index, title, body, isLast?` | How-it-works connector |
| `FAQItem` | `question, answer` | Radix Accordion item (fixes C7) |
| `LogoWall` | `logos[], speed?` | Infinite CSS marquee, **one array**, visual dup only (kills D3/D4) |
| `PillarColumn` | `title, services[]` | Mega-menu + hub |
| `CTAButtonGroup` | `primary, secondary?` | Discrete buttons (fixes C9) |
| `FilterBar` | `groups[], value, onChange` | Work index filtering |
| `StatBand` | `stats[]` | Row of `StatCounter`; **single component reused everywhere** |
| `ThemeToggle` | — | dark/light, persists choice |

## Sections (organisms)

| Component | Key props / data | Notes |
|-----------|------------------|-------|
| `SiteHeader` | `nav` | Sticky glass; condenses on scroll |
| `MegaMenu` | `pillars[]` | 3-column, keyboard-navigable, AI-audit footer strip |
| `SiteFooter` | `nav, contact` | Corrected links (fixes C3/C4/C5); newsletter |
| `Hero` | `variant, eyebrow, title, sub, cta, media?` | home/pillar/service/case/generic; aurora + animated headline |
| `TwoMotionSelector` | `motions[]` | Launch⇄Scale toggle; swaps stats/copy — the IA spine, interactive |
| `SolutionsOverview` | `pillars[]` | 3 pillars → service grid |
| `FeaturedWork` | `caseStudies[]` | 2–3 cards |
| `WorkGrid` | `caseStudies[], filters` | Filterable |
| `CaseStudyBody` | `challenge, approach, solution, results` | Long-form layout |
| `DeliverablesGrid` | `deliverables[6]` | Distinct content (fixes D6) |
| `HowItWorks` | `steps[]` | Timeline |
| `PartnersStrip` | `partners[]` | Trust |
| `ProofBand` | `stats[], narrative?` | `StatBand` + copy |
| `PurposeBlock` | `statement, image, cta?` | About/Home |
| `FAQSection` | `faqs[]` | Emits `FAQPage` JSON-LD |
| `CTASection` | `title, cta` | Global closer, aurora |
| `AIAuditWidget` | `mode` | teaser·full; conversational multi-step |
| `FloatingAssistant` | `whatsapp, aiEnabled` | **One global widget** (fixes D9) |
| `LeadForm` | `variant, prefill?` | Zod+RHF; qualification fields; success state |
| `NewsletterForm` | — | Footer opt-in |
| `LegalLayout` | `title, updated, toc[], children` | Sticky ToC |

## Templates (page compositions)

| Template | Composes (sections) |
|----------|---------------------|
| `HomeTemplate` | Hero·PartnersStrip·TwoMotionSelector·SolutionsOverview·FeaturedWork·AIAuditWidget·ProofBand·PurposeBlock·CTASection |
| `SolutionsHubTemplate` | Hero·SolutionsOverview·TwoMotionSelector·ProofBand·CTASection |
| `PillarTemplate` | Hero·ServiceCard grid·MetricDelta·FeaturedWork·CTASection |
| `ServiceDetailTemplate` | Hero·Overview·PartnersStrip·Benefits·HowItWorks·DeliverablesGrid·StatBand·FeaturedWork·FAQSection·CTASection |
| `WorkIndexTemplate` | Hero·FilterBar·WorkGrid·LogoWall·CTASection |
| `CaseStudyTemplate` | Hero·StatBand·CaseStudyBody·TestimonialCard·FeaturedWork·CTASection |
| `AboutTemplate` | Hero·PurposeBlock·Differentiators·Capabilities·ProofBand·Team·CTASection |
| `ApproachTemplate` | Hero·Philosophy·TwoMotionSelector·HowItWorks·Tooling/AI·CTASection |
| `AIAuditTemplate` | AIAuditWidget(full)·LeadForm |
| `ContactTemplate` | split(value recap · LeadForm) |
| `LegalTemplate` | LegalLayout |

## Providers & utilities

- `ThemeProvider` — token/dark-light context, `data-theme` on `:root`.
- `AnalyticsProvider` — funnel events (doc 05).
- `RevealOnScroll` (in `lib`/hook form) — intersection-observer wrapper, reduced-motion aware.
- `Seo` helper — metadata + JSON-LD per page (doc 06).

## Build priority (for Phase 1 — see roadmap)

**Tier 1 (unblock everything):** Button, Text/Heading, Icon, Badge, Card base, Input, Section/Container, ThemeProvider.
**Tier 2:** StatCounter, StatBand, LogoWall, ServiceCard, CTAButtonGroup, Hero.
**Tier 3:** everything else, then templates.
