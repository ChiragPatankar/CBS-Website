# 05 — Naming Conventions

One consistent scheme so the codebase reads as one system.

## 1. Files & folders

| Kind | Convention | Example |
|------|-----------|---------|
| Component folder & file | `PascalCase` | `StatCounter/StatCounter.tsx` |
| Variants file | `PascalCase.variants.ts` | `Button.variants.ts` |
| Stories / tests | `*.stories.tsx` / `*.test.tsx` | `Hero.stories.tsx` |
| Barrel export | `index.ts` | `primitives/Button/index.ts` |
| Hooks | `camelCase`, `use` prefix | `useReducedMotion.ts` |
| Utilities / libs | `camelCase` | `formatMetric.ts`, `cn.ts` |
| Config | `camelCase` | `site.ts`, `seo.ts`, `routes.ts` |
| Types file | `camelCase.ts` or `*.types.ts` | `content.types.ts` |
| CMS schema | `camelCase` singular | `caseStudy.ts`, `service.ts` |
| Route folder (App Router) | `kebab-case` | `ai-audit/`, `growth-management/` |
| Route group | `(kebab-case)` | `(marketing)/` |
| Dynamic segment | `[param]` | `work/[slug]/` |
| Static asset | `kebab-case` | `logo-amazon.svg`, `hero-aurora.webp` |
| Doc | `NN-kebab-case.md` | `04-design-tokens.md` |

## 2. React components & props

- **Components:** `PascalCase`, noun or noun-phrase — `ServiceCard`, `MegaMenu`, `TwoMotionSelector`.
- **Boolean props:** positive, `is/has/with/show` or plain adjective — `isLoading`, `hasIcon`, `disabled`. Never negatives (`isNotActive`).
- **Variant prop:** always `variant`; **size prop:** always `size` (`sm | md | lg`).
- **Event handlers:** `onX` for the prop, `handleX` for the internal handler — `onSelect` / `handleSelect`.
- **Render slots:** `iconLeft`, `iconRight`, `media`, `children`.
- **Data arrays (from CMS):** plural nouns — `services`, `caseStudies`, `stats`, `partners`, `faqs`.

## 3. Design tokens (CSS variables)

- Pattern: `--<category>-<name>[-<modifier>]`, all lowercase-kebab.
- Examples: `--brand-indigo`, `--text-secondary`, `--space-6`, `--r-lg`, `--dur-fast`, `--glow-brand`.
- Semantic aliases read as intent: `--color-fg`, `--surface-card`, `--focus-ring`.
- **No raw values in code** — see doc 04 §5.

## 4. CSS / Tailwind

- Prefer Tailwind utilities (mapped to tokens). Custom classes only when necessary.
- Custom class names: `kebab-case`, BEM-ish where structural — `mega-menu__column`.
- `cn()` helper (clsx + tailwind-merge) composes conditional classes.

## 5. TypeScript

| Kind | Convention | Example |
|------|-----------|---------|
| Type / Interface | `PascalCase`, **no `I` prefix** | `ServiceCardProps`, `CaseStudy` |
| Props type | `<Component>Props` | `ButtonProps` |
| Enum-like unions | `PascalCase` union of string literals | `type Motion = 'launch' \| 'scale'` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_AUDIT_STEPS` |
| Generics | single caps or descriptive | `T`, `TItem` |

## 6. CMS content model (doc 01)

- Document types: `camelCase` singular — `service`, `caseStudy`, `testimonial`, `client`, `stat`, `partner`, `pillar`.
- Fields: `camelCase` — `headlineMetric`, `relatedCaseStudies`.
- Slugs: `kebab-case`, stable, match route segments — `growth-management`.

## 7. Routes & URLs (doc 01)

- Path segments `kebab-case`; structure `/(marketing)/solutions/<pillar>/<service>`.
- No trailing slashes; lowercase; never doubled segments (fixes the old `/work-with-us/work-with-us/…`).

## 8. Analytics events (doc 05)

- `snake_case`, `object_action` — `audit_started`, `audit_completed`, `call_booked`, `case_study_viewed`, `cta_clicked`.
- Standard params: `location` (section), `variant`, `motion`.

## 9. Git

- Branches: `type/short-description` — `feat/button-primitive`, `fix/footer-links`, `chore/token-pipeline`.
- Commits: **Conventional Commits** — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- One logical change per PR; PR title mirrors the commit summary.

## 10. Storybook

- Story title path mirrors the layer: `Primitives/Button`, `Composites/StatCounter`, `Sections/Hero`.
