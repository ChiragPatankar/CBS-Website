# 03 — Component Hierarchy

Organized atomic → composite → sections → templates. Every reusable pattern that
was previously copy-pasted (logo walls, stat blocks, CTAs) becomes **one**
component fed by data — this is the structural cure for the duplication audit.

## 1. Primitives (atoms)

| Component | Variants / props | States |
|-----------|------------------|--------|
| `Button` | primary · secondary · ghost · link; sizes sm/md/lg; `iconLeft/iconRight` | default, hover, active, focus, loading, disabled |
| `Link` | inline · nav · footer | default, hover, active, current |
| `Text` / `Heading` | polymorphic `as`, scale token | — |
| `Eyebrow` | mono uppercase label | — |
| `Icon` | Lucide set, size 16/20/24 | — |
| `BrandMark` | partner/marketplace SVG | mono, hover-tint |
| `Badge` | metric-up · metric-down · neutral · new | — |
| `Input` / `Textarea` / `Select` | label, hint, error | default, focus, error, disabled |
| `Avatar` | image · initials | — |
| `Divider` | solid · gradient hairline | — |
| `GradientText` | aurora clip | — |
| `Tag` / `Chip` | filter chip (selectable) | default, selected |

## 2. Composites (molecules)

| Component | Composed of | Notes |
|-----------|-------------|-------|
| `StatCounter` | Heading + Eyebrow + Badge | Animated count-up; tabular-nums; single data source (kills D5) |
| `MetricDelta` | value + arrow + Badge | e.g. `4.3× ROAS ↑`, `−40% CAC` |
| `ServiceCard` | Icon + Heading + Text + Link | Hover lift + glow; used in mega-menu, hubs, pillars |
| `CaseStudyCard` | image + client + headline metric + tags + Link | The star of the new Work system |
| `TestimonialCard` | quote + Avatar + name/role/company | Real quotes (fills D8) |
| `FeatureCard` | Icon + title + body | Deliverables / benefits |
| `StepItem` | index + title + body + connector line | "How it works" |
| `FAQItem` | Accordion (question/answer) | Real content (fixes C7) |
| `LogoWall` | marquee of `BrandMark[]` | Infinite CSS scroll, one array (kills D3/D4) |
| `PillarColumn` | heading + `ServiceCard[]` | Mega-menu & hubs |
| `CTAButtonGroup` | primary + secondary | discrete buttons (fixes C9) |
| `FilterBar` | `Chip[]` groups | Work index filtering |
| `StatBand` | row of `StatCounter[]` | one component reused everywhere |
| `ThemeToggle` | switch | dark/light |

## 3. Organisms (sections)

| Component | Purpose | Key behavior |
|-----------|---------|--------------|
| `SiteHeader` | Sticky glass nav + mega-menu | Condenses on scroll; keyboard-navigable mega-menu |
| `MegaMenu` | 3-pillar solutions panel | Hover/focus open; AI-audit footer strip |
| `SiteFooter` | Corrected multi-column footer + newsletter | One source; fixes C3/C4/C5 |
| `Hero` | variants: home / pillar / service / case / generic | Aurora glow, animated headline, dual CTA |
| `TwoMotionSelector` | Launch&Growth vs Scale&Optimize toggle | Swaps stats/copy; the IA spine made interactive |
| `SolutionsOverview` | 3 pillars → service grid | Home + hub |
| `FeaturedWork` | 2–3 `CaseStudyCard` | Home |
| `WorkGrid` | filterable `CaseStudyCard[]` | Work index |
| `CaseStudyBody` | challenge/approach/results layout | Case template |
| `DeliverablesGrid` | 6 `FeatureCard` | Service pages (fixes D6 with distinct content) |
| `HowItWorks` | `StepItem[]` timeline | Service/Approach |
| `PartnersStrip` | marketplace/tech `BrandMark[]` | Trust |
| `ProofBand` | `StatBand` + short narrative | Trust |
| `PurposeBlock` | purpose statement + image | About/Home |
| `FAQSection` | `FAQItem[]` | Service pages |
| `CTASection` | headline + `CTAButtonGroup` + aurora | Global closer |
| `AIAuditWidget` | conversational multi-step | AI-first entry point |
| `FloatingAssistant` | WhatsApp + AI chat launcher | One global widget (fixes D9) |
| `LeadForm` | qualified contact form | Validation, spam guard, success state |
| `NewsletterForm` | email opt-in | Footer |
| `LegalLayout` | prose + sticky ToC | Privacy/Terms |

## 4. Templates (pages) → sections

```
Home (T1)
  SiteHeader
  Hero[home]              headline, dual CTA, aurora, trust micro-strip
  PartnersStrip           marketplace logos (once)
  TwoMotionSelector       Launch&Growth ⇄ Scale&Optimize (metrics swap)
  SolutionsOverview       3 pillars → services
  FeaturedWork            2–3 real case studies
  AIAuditWidget[teaser]   "Where should you grow next? → audit"
  ProofBand               StatBand (single source)
  PurposeBlock            profit-first purpose
  CTASection
  SiteFooter
  FloatingAssistant

Solutions Hub (T2)
  Header · Hero · SolutionsOverview(full) · TwoMotionSelector · ProofBand · CTASection · Footer

Pillar (T3)
  Header · Hero[pillar] · ServiceCard grid · MetricDelta outcomes · FeaturedWork(related) · CTASection · Footer

Service Detail (T4)
  Header · Hero[service] · Overview · PartnersStrip · Benefits(3) · HowItWorks
  · DeliverablesGrid(6) · StatBand · FeaturedWork(related) · FAQSection · CTASection · Footer

Work Index (T5)
  Header · Hero · FilterBar · WorkGrid · LogoWall · CTASection · Footer

Case Study (T6)
  Header · Hero[case] · StatBand(case metrics) · CaseStudyBody · TestimonialCard
  · FeaturedWork(next) · CTASection · Footer

About (T7)   Header · Hero · PurposeBlock · Differentiators(3) · Capabilities · ProofBand · Team · CTASection · Footer
Approach (T8) Header · Hero · Philosophy · TwoMotionSelector · HowItWorks · Tooling/AI · CTASection · Footer
AI Audit (T9) Header · AIAuditWidget(full) · LeadForm(inline) · Footer
Contact (T10) Header · split[value recap | LeadForm] · Footer
Legal (T11)   Header · LegalLayout · Footer
```

## 5. Global/shared building blocks

- `Section` wrapper — consistent vertical rhythm + optional aurora backdrop.
- `Container` — max-width + gutters.
- `RevealOnScroll` — intersection-observer animation wrapper (respects reduced-motion).
- `Seo` — meta/OG/JSON-LD per page.
- `ThemeProvider` — token + dark/light context.
- `AnalyticsProvider` — event tracking for conversion funnels.

## 6. State & data notes

- All list content (`services`, `caseStudies`, `clients`, `stats`, `partners`, `faqs`) comes from the **content model** in doc 01 — no hard-coded repetition.
- `StatBand` reads one `stats` collection so a number changes in exactly one place.
- `LogoWall` reads one `clients` array; the marquee duplicates *visually* via CSS, not in the DOM/content.
- Forms: client + server validation, honeypot + rate-limit, accessible error summary, optimistic success UI.
