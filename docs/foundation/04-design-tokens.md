# 04 — Design Tokens

The **single source of truth for every style value**. Values come from
`02-design-system.md` and `04-animation-plan.md`. The machine-readable source is
[`src/styles/tokens/tokens.json`](../../src/styles/tokens/tokens.json). This doc
explains the model, the pipeline and the rules. **No component may hard-code a
raw value** — always reference a token.

## 1. Token pipeline

```
tokens.json  ──(build step, Phase 1)──►  tokens.css (:root CSS variables)
   (data)                                     │
                                              ├─► Tailwind theme (maps to var(--…))
                                              └─► consumed by every component
```

- `tokens.json` is edited by hand; a generator emits `tokens.css` + Tailwind config.
- Change a value in **one** place → it propagates everywhere. This is the structural
  guarantee against the style drift and duplication seen in the current site.

## 2. Categories (see tokens.json for exact values)

| Category | Prefix (CSS var) | Examples |
|----------|------------------|----------|
| Brand color | `--brand-*`, `--profit`, `--signal` | `--brand-indigo`, `--profit` (emerald) |
| Gradient | `--gradient-aurora` | hero glow, one CTA/view, active nav |
| Surfaces (themed) | `--bg`, `--surface-1/2/3` | resolve per theme |
| Borders (themed) | `--border`, `--border-strong` | hairlines |
| Text (themed) | `--text-primary/secondary/tertiary` | |
| Font family | `--font-display/body/mono` | General Sans / Inter / Geist Mono |
| Font size | `--fs-*` | fluid `clamp()` scale |
| Weight/leading/tracking | `--fw-*`, `--lh-*`, `--tracking-*` | |
| Space | `--space-1 … --space-40` | 4px base scale |
| Radius | `--r-sm/md/lg/xl/full` | cards default `--r-lg` |
| Layout | `--container`, `--gutter`, `--section-y` | |
| Elevation | `--elev-card/raised`, `--glow-brand` | light+blur, not heavy shadows |
| Motion | `--dur-*`, `--ease-*`, `--stagger` | doc 04 |
| Z-index | `--z-*` | sticky/overlay/modal/toast |
| Breakpoints | `--bp-*` | responsive |

## 3. Theming model (dark-first, theme-aware)

- Themed tokens have **dark** and **light** value sets in `tokens.json`.
- `ThemeProvider` sets `data-theme="dark|light"` on `:root`; CSS resolves the set.
- Default follows `prefers-color-scheme`; a `ThemeToggle` overrides and persists.
- Both themes must pass **WCAG AA** (4.5:1 body / 3:1 large). Verified in CI.

```
:root, [data-theme="dark"]  { --bg:#08090B; --text-primary:#F5F6F7; … }
[data-theme="light"]        { --bg:#FFFFFF; --text-primary:#0A0B0D; … }
```

## 4. Semantic aliases (built on primitives)

Components reference **semantic** tokens, not raw scale values, so intent stays legible:

| Semantic | Resolves to |
|----------|-------------|
| `--color-fg` | `--text-primary` |
| `--color-muted` | `--text-secondary` |
| `--color-accent` | `--brand-indigo` |
| `--color-positive` | `--profit` (emerald) |
| `--surface-card` | `--surface-1` |
| `--focus-ring` | `0 0 0 2px var(--bg), 0 0 0 4px var(--brand-indigo)` |

## 5. Usage rules (enforced in review + lint)

1. **No raw hex/px/ms in components.** Use `var(--token)` or a Tailwind class mapped to a token.
2. **Emerald = profit/positive only.** Never decorative (keeps "profit-first" readable).
3. **Aurora gradient is an accent**, never a full section background behind text.
4. **Motion** references `--dur-*` / `--ease-*`; all motion respects `prefers-reduced-motion` (doc 04 §8).
5. **Numerals** that animate use `font-variant-numeric: tabular-nums`.
6. New value needed? **Add a token first**, then use it — don't inline.

## 6. Tailwind mapping (Phase 1)

Tailwind's theme is generated to point at the CSS variables, e.g.
`colors.bg → var(--bg)`, `spacing.6 → var(--space-6)`, `borderRadius.lg → var(--r-lg)`.
Result: utility classes and design tokens are the same source — no divergence.
