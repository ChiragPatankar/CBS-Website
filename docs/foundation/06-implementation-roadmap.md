# 06 — Implementation Roadmap

Sequenced build order that refines `07-implementation-plan.md §3` into concrete,
checkable steps. **We are at the end of Phase 0.** Pages are **not** built until
the design system and content model exist.

## Legend
`☐` not started · `◐` in progress · `☑` done

## Phase 0 — Foundation ☑ (this deliverable)
- ☑ Read blueprint (docs 00–08) as source of truth
- ☑ Folder structure created (`/src`, `/public`, `/tests`, `/.storybook`)
- ☑ Tech stack decided (foundation doc 01)
- ☑ Reusable components defined (foundation doc 03)
- ☑ Design tokens defined (`tokens.json` + foundation doc 04)
- ☑ Naming conventions (foundation doc 05)
- ☐ **GATE: stakeholder sign-off on foundation** → then Phase 1

## Phase 1 — Project init & token pipeline ☐
1. `pnpm` init; Next.js (App Router) + TS strict; ESLint(flat)+Prettier; Tailwind v4.
2. Self-host fonts via `next/font` (General Sans, Inter, Geist Mono).
3. **Token build step:** `tokens.json` → `tokens.css` (:root vars) → Tailwind theme.
4. `ThemeProvider` + `data-theme` + `ThemeToggle`; verify dark/light AA contrast.
5. Storybook + CI (lint, typecheck, unit, axe, Lighthouse budget).
- **Exit:** a themed blank app; tokens resolve; Storybook runs; CI green.

## Phase 2 — Design system (components, no pages) ☐
Build in tiers (foundation doc 03), each with story + test + axe:
1. **Tier 1 primitives:** Button, Heading/Text, Eyebrow, Icon, Badge, Input/Textarea/Select, Divider, GradientText + `Section`/`Container` + `cn()`.
2. **Tier 2 composites:** StatCounter, StatBand, MetricDelta, LogoWall, ServiceCard, CaseStudyCard, FeatureCard, StepItem, FAQItem, CTAButtonGroup, Tag/Chip, FilterBar.
3. **Tier 3 sections:** Hero, SiteHeader+MegaMenu, SiteFooter, SolutionsOverview, TwoMotionSelector, DeliverablesGrid, HowItWorks, PartnersStrip, ProofBand, PurposeBlock, FAQSection, CTASection, TestimonialCard.
- **Exit:** every reusable component in Storybook, tested, token-driven, both themes.

## Phase 3 — Content model & data ☐
1. Sanity schemas (doc 01 model): service, caseStudy, testimonial, client, stat, partner, pillar, global.
2. GROQ queries + typed fetchers in `src/content/queries`.
3. Author de-duplicated, rewritten copy (doc 08); seed stats/clients/partners **once** (kills D3–D6).
4. Seed 4–6 real case studies across categories.
- **Exit:** CMS populated; typed content available to templates.

## Phase 4 — Templates & core pages ☐
1. Templates (foundation doc 03) from Phase-2 sections.
2. Wire routes: Home, Solutions hub, 3 Pillars, 12 Service details, About, Approach, Contact, Privacy, Terms.
3. Global layout: header/mega-menu/footer with **corrected** links (fixes C3/C4/C5).
- **Exit:** navigable marketing site on real content.

## Phase 5 — Work system ☐
1. Work index (filterable) + Case-study detail template.
2. "Related work" wired into every service page (proof-per-service, doc 05 J2).
- **Exit:** credible proof layer (fixes D8).

## Phase 6 — AI-first layer ☐
1. `/api/ai-audit` (Vercel AI SDK, streaming) + `AIAuditWidget` (full + teaser).
2. FloatingAssistant (AI chat + WhatsApp handoff — one global widget, fixes D9).
3. "Find your fit" recommender; personalized CTAs by detected motion.
4. `/api/contact` + `/api/newsletter` with Zod validation + spam guard; audit→contact prefill.
- **Exit:** interactive consultation experience live.

## Phase 7 — Motion & polish ☐
1. Apply animation plan (doc 04): reveals, count-ups, aurora, chart draws, page transitions, micro-interactions.
2. Reduced-motion pass; performance pass (code-split motion; LCP path clean).
- **Exit:** signature feel; motion within CWV budget.

## Phase 8 — SEO, QA & launch ☐
1. Metadata + JSON-LD per page; sitemap/robots; **301 redirects** (doc 01 map).
2. QA matrix (doc 07 §5): browsers, devices, a11y, perf, forms, analytics, content.
3. Staged launch → DNS cutover → monitor GSC/GA4/CWV daily.
- **Exit:** live site + monitoring; all C-series/D-series defects verified fixed.

## Dependencies (what blocks what)
```
Phase 1 ──► Phase 2 ──► Phase 4 ──► Phase 5 ──► Phase 7 ──► Phase 8
              └► Phase 3 ─────────────┘            ▲
                          Phase 6 ─────────────────┘
```
- Templates (4) need components (2) **and** content (3).
- Motion (7) applies after pages exist (4–6).
- SEO/QA (8) gates launch.

## Definition of Done (every unit) — from doc 07
Token-driven · dark+light correct · responsive (360/768/1024/1440) · keyboard +
axe clean · reduced-motion honored · no duplicated content (CMS-fed) · meta/JSON-LD
present · Lighthouse ≥ 95 on key routes.

## Immediate next action
Await sign-off on this foundation, then start **Phase 1** (project init + token pipeline).
No page code before Phase 1 completes.
