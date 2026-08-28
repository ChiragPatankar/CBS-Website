# 07 — Implementation Plan

> Build follows this spec. No code is written until this plan is approved.

## 1. Recommended stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js (App Router) + React + TypeScript** | SSR/SSG for SEO, route-level code-split, industry standard (Vercel-grade) |
| Styling | **Tailwind CSS + CSS custom properties** for tokens | Fast, consistent, tokens drive theming (doc 02) |
| Components | Headless primitives (**Radix UI**) + custom design-system layer | Accessible by default (menus, accordions, dialogs) |
| Motion | **Framer Motion** + native CSS/View Transitions | Choreography (doc 04), code-split per route |
| Content | **Headless CMS** (Sanity / Contentful / Payload) | Content model (doc 01) kills duplication at source; non-devs edit |
| Forms | Server actions + validation (**Zod**) + spam guard | Secure lead capture |
| AI | LLM API behind a server route (audit + assistant) | Keep keys server-side; stream responses |
| Charts | Lightweight SVG (visx/Recharts) or hand-rolled | Animated growth metrics |
| Analytics | GA4 + privacy-friendly product analytics | Funnel measurement (doc 05) |
| Hosting | **Vercel** (or equivalent edge) + CDN | ISR, image optimization, CWV |
| Testing | Vitest/RTL (unit) · Playwright (e2e) · axe (a11y) · Lighthouse CI | Quality gates |

## 2. Workstreams (parallelizable)

1. **Foundations** — repo, TS config, Tailwind + token pipeline, theming, CI/CD, analytics scaffold.
2. **Design system** — primitives → composites (docs 02/03), Storybook, a11y baseline.
3. **Content model & CMS** — schemas (doc 01), migrate/rewrite copy (doc 08), seed real data (stats, clients, partners).
4. **Templates & pages** — T1–T11 assembled from components.
5. **AI layer** — audit flow, assistant, recommenders.
6. **SEO & performance** — metadata, JSON-LD, redirects, CWV budget (doc 06).
7. **QA & launch** — cross-browser, a11y, perf, redirect verification, analytics validation.

## 3. Phased milestones

### Phase 0 — Discovery & sign-off (this blueprint)
- Approve IA, design direction, content model.
- Gather assets: real case-study data, testimonials, corrected logos, brand photography.
- **Deliverable:** approved spec + asset list. *(No code.)*

### Phase 1 — Foundations & design system
- Token pipeline, theming (dark/light), Tailwind config.
- Build primitives + key composites in Storybook (`Button`, `Card`, `StatCounter`, `LogoWall`, `ServiceCard`, `Hero`).
- CI/CD, Lighthouse/axe in CI.
- **Deliverable:** living component library.

### Phase 2 — Content model & migration
- CMS schemas; author de-duplicated, rewritten copy (doc 08).
- Single sources for stats/clients/partners (eliminates D3–D5).
- Draft real case studies (min. 4–6 across categories).
- **Deliverable:** populated CMS.

### Phase 3 — Core pages
- Home (T1), Solutions hub (T2), Pillars (T3), Service detail (T4 ×12), About (T7), Approach (T8), Contact (T10), Legal (T11).
- Global header/mega-menu/footer (fixes nav defects C4/C5).
- **Deliverable:** navigable marketing site.

### Phase 4 — Work system
- Work index (T5) with filters; Case study (T6) template; wire "related work" into service pages.
- **Deliverable:** credible proof layer (fixes D8).

### Phase 5 — AI-first layer
- AI Growth Audit (T9), FloatingAssistant, "find your fit" recommender, personalized CTAs.
- **Deliverable:** interactive consultation experience.

### Phase 6 — Motion & polish
- Apply animation plan (doc 04): reveals, counters, aurora, chart draws, transitions.
- Reduced-motion + performance pass.
- **Deliverable:** signature feel.

### Phase 7 — SEO, QA & launch
- Metadata, JSON-LD, sitemap/robots, **301 redirects** (doc 01 map).
- Full QA matrix (below); CWV to target.
- Staged launch → DNS cutover → post-launch monitoring.
- **Deliverable:** live site + monitoring dashboard.

## 4. Definition of done (per component/page)

- Matches design tokens; dark + light both correct.
- Responsive (360 / 768 / 1024 / 1440+); no horizontal scroll.
- Keyboard-navigable; visible focus; axe clean; screen-reader sane.
- Reduced-motion honored.
- No duplicated content; data from CMS.
- Meta/JSON-LD present; Lighthouse ≥ 95 (Perf/SEO/Best/A11y) on key routes.

## 5. QA matrix

| Dimension | Coverage |
|-----------|----------|
| Browsers | Chrome, Safari, Firefox, Edge (latest 2) |
| Devices | iOS Safari, Android Chrome, desktop |
| A11y | axe + manual keyboard + VoiceOver/NVDA on key flows |
| Perf | Lighthouse CI + CrUX; LCP<2s, INP<200ms, CLS<0.05 |
| SEO | Metadata, canonicals, redirects, structured-data validator |
| Forms | Validation, spam, success/error, delivery to CRM/email |
| Analytics | Every funnel event (doc 05) fires correctly |
| Content | No lorem/placeholder; all links resolve (kills C-series) |

## 6. Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| No real case-study data yet | Phase 0 asset-gathering is a gate; start with 4–6, expand |
| AI cost/latency | Cache audit logic, stream responses, cap tokens, graceful fallback to static recommender |
| Motion hurting CWV | Strict budget (doc 04); LCP path motion-free; code-split Framer Motion |
| SEO dip during migration | Complete 301 map, submit sitemap, monitor GSC daily post-launch |
| Scope creep (resources/blog) | Ship marketing + work + AI first; resources is a fast-follow |

## 7. Team & sequencing

- **Design** leads Phases 0–1, supports throughout.
- **Frontend** owns 1, 3, 4, 6.
- **Full-stack/backend** owns 2 (CMS) and 5 (AI).
- **SEO/content** owns 2 (copy, doc 08) and 7.
- Phases 1–2 run in parallel; 3–4 sequential-ish; 5–6 overlap; 7 gates launch.
