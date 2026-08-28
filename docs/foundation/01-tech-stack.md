# 01 — Technology Stack (Decision)

Confirmed from `07-implementation-plan.md §1`. Each choice is locked with a rationale
and the alternative it beat, so the decision is auditable later.

## Decision table

| Layer | **Decision** | Version target | Why it wins | Runner-up (rejected) |
|-------|--------------|----------------|-------------|----------------------|
| Language | **TypeScript** (strict) | 5.x | Type safety across a large component system; self-documenting props | Plain JS — no |
| Framework | **Next.js — App Router** | 15.x | SSR/SSG for SEO (doc 06), route-level code-split, RSC, image optim, Vercel-native | Vite SPA (loses SEO/SSR); Astro (weaker for the app-like AI layer) |
| UI runtime | **React** | 19.x | Ecosystem, RSC, Framer Motion support | — |
| Styling | **Tailwind CSS v4 + CSS custom properties** | 4.x | Utilities for speed; **tokens live in CSS variables** so theming/dark-mode is one source (doc 02) | CSS Modules (slower authoring); styled-components (runtime cost, RSC friction) |
| Headless primitives | **Radix UI** | latest | Accessible menus/dialogs/accordions out of the box (mega-menu, FAQ, modals) | Building a11y from scratch — risky |
| Component variants | **CVA** (class-variance-authority) + `tailwind-merge` | latest | Typed variant APIs for Button/Card/etc. matching token variants | Hand-rolled className logic |
| Motion | **Framer Motion** + native View Transitions/CSS | 11.x | Choreography from doc 04 (stagger, layout, count-up); code-split per route | GSAP (heavier licensing/bundle for our needs) |
| Content | **Sanity** (headless CMS) | latest | Structured content model (doc 01) kills duplication at source; portable-text, live preview, GROQ | Contentful (pricier), Payload (self-host overhead) |
| Validation | **Zod** | 3.x | Shared client/server schemas for forms + API | Yup (weaker TS inference) |
| Forms | **React Hook Form** + Zod + Server Actions | latest | Performant, accessible, minimal re-render | Formik (heavier) |
| AI layer | **Vercel AI SDK** over an LLM API (server routes) | latest | Streaming audit/assistant, keys stay server-side | Direct fetch — more plumbing |
| Charts | **visx** (SVG primitives) | latest | Lightweight, animatable growth charts (doc 04) | Recharts (less control); Chart.js (canvas, harder to theme) |
| Icons | **lucide-react** | latest | 1.5px stroke set matching doc 02 | Heroicons (smaller set) |
| Fonts | **next/font** (self-hosted) — General Sans, Inter, Geist Mono | — | No layout shift, no external request, GDPR-clean | Google Fonts CDN (CLS + privacy) |
| Analytics | **GA4** + privacy-friendly product analytics | — | Funnel measurement (doc 05) | — |
| Hosting | **Vercel** + CDN | — | ISR, image optim, edge, CWV budget (doc 06) | Netlify (fine alt); self-host (ops cost) |
| Package manager | **pnpm** | 9.x | Fast, disk-efficient, strict | npm/yarn |
| Lint/format | **ESLint** (flat config) + **Prettier** | latest | Consistency | — |
| Unit test | **Vitest** + **React Testing Library** | latest | Fast, Vite-native | Jest (slower) |
| E2E | **Playwright** | latest | Cross-browser flows (doc 05) | Cypress |
| A11y | **axe-core** (jest-axe + CI) | latest | Automated a11y gate (doc 07 DoD) | manual only |
| Component workshop | **Storybook** | 8.x | Build the design system in isolation before pages | Ladle (smaller ecosystem) |
| CI/CD | **GitHub Actions** + Lighthouse CI | — | Quality gates: lint, test, a11y, CWV | — |

## Guardrails baked into the stack choice

- **SEO-first rendering:** default to Server Components / static generation; client components only where interactivity demands it (nav, audit, forms, motion).
- **Tokens are the only style source:** no hard-coded hex/px in components — everything references CSS variables generated from `tokens.json` (doc 04).
- **Accessibility is non-negotiable:** Radix + axe-in-CI enforce the doc-07 Definition of Done.
- **Performance budget:** Framer Motion and charts are code-split; the LCP path ships no blocking motion JS (doc 04 §8).

## What is intentionally deferred

- Resources/blog (fast-follow after launch — doc 07).
- CRM integration specifics (wire once the client's CRM is confirmed).
- i18n/hreflang (add when localization is scoped — doc 06).
