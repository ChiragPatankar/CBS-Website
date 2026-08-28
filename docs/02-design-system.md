# 02 — Design System

## 1. Direction

A synthesis of four references, tuned for a profit-first, cross-border growth partner:

| Reference | What we borrow |
|-----------|----------------|
| **Stripe** | Gradient meshes, animated data/diagram storytelling, precise layered depth, trust through polish |
| **Vercel** | High-contrast black/white minimalism, geometric grids, monospace accents, speed |
| **Linear** | Dark-first surfaces, subtle glow/gradient, glassmorphism, exquisite micro-interactions |
| **OpenAI** | Editorial spacing, generous whitespace, restrained calm, big confident type |

**CrossBorder's own signature:** the *aurora* — a spectrum gradient (indigo → violet → cyan) that literally represents crossing borders and connecting markets. Used sparingly for emphasis; never wallpaper.

**Aesthetic in one line:** *Dark-first, editorial, evidence-driven. Calm surfaces, confident type, one luminous accent, every number alive.*

## 2. Color

### Brand

| Token | Hex | Use |
|-------|-----|-----|
| `--brand-indigo` | `#5B5BF0` | Primary brand, primary buttons, links |
| `--brand-violet` | `#8B5CF6` | Gradient midpoint, accents |
| `--brand-cyan` | `#22D3EE` | Gradient endpoint, highlights |
| `--profit-emerald` | `#10B981` | "Profit / positive" — up-metrics, success, growth deltas |
| `--signal-amber` | `#F59E0B` | Attention, "−CAC" style savings, warnings |

**Aurora gradient:** `linear-gradient(120deg, #5B5BF0 0%, #8B5CF6 45%, #22D3EE 100%)`

### Neutrals (zinc-based, dark-first)

| Token | Dark value | Light value | Use |
|-------|-----------|-------------|-----|
| `--bg` | `#08090B` | `#FFFFFF` | Page background |
| `--surface-1` | `#0E1013` | `#FAFAFB` | Cards |
| `--surface-2` | `#16181D` | `#F2F3F5` | Raised cards, inputs |
| `--surface-3` | `#1E2127` | `#E8EAED` | Hover, popovers |
| `--border` | `#26292F` | `#E3E5E9` | Hairlines |
| `--border-strong` | `#363A42` | `#CDD1D7` | Emphasis borders |
| `--text-primary` | `#F5F6F7` | `#0A0B0D` | Headlines, body |
| `--text-secondary` | `#A0A5AE` | `#4A4F58` | Sub-copy |
| `--text-tertiary` | `#6B7079` | `#8A8F98` | Captions, labels |

### Semantics

- Success `--profit-emerald` · Warning `--signal-amber` · Error `#F43F5E` · Info `--brand-cyan`
- Focus ring: `0 0 0 2px var(--bg), 0 0 0 4px var(--brand-indigo)`

### Rules

- **Default to dark.** Light mode is a first-class, fully-tokenized alternate (theme-aware via `prefers-color-scheme` + a manual toggle).
- The aurora appears in: hero glow, one CTA per view, active nav state, metric emphasis. **Never** as a full-section background behind text.
- Emerald = profit/up only. Never decorative. This keeps "profit-first" legible.
- Maintain WCAG AA (4.5:1 body, 3:1 large text) in both themes.

## 3. Typography

| Role | Font | Notes |
|------|------|-------|
| Display / headings | **Geist** or **General Sans** (grotesk) | Tight tracking, confident |
| Body / UI | **Inter** | Workhorse, excellent at small sizes |
| Mono / metrics / labels | **Geist Mono** / **JetBrains Mono** | Stats, eyebrow labels, code-like precision (Vercel cue) |

### Type scale (fluid, `clamp()` — 1.25 major-third)

| Token | Size (min → max) | Weight | Line height | Use |
|-------|------------------|--------|-------------|-----|
| `--fs-display` | 3rem → 5.25rem | 600 | 1.02 | Hero H1 |
| `--fs-h1` | 2.25rem → 3.5rem | 600 | 1.06 | Page titles |
| `--fs-h2` | 1.75rem → 2.5rem | 600 | 1.12 | Section titles |
| `--fs-h3` | 1.375rem → 1.75rem | 550 | 1.2 | Card titles |
| `--fs-body-lg` | 1.125rem → 1.25rem | 400 | 1.55 | Lead paragraphs |
| `--fs-body` | 1rem | 400 | 1.6 | Body |
| `--fs-sm` | 0.875rem | 400 | 1.5 | Secondary |
| `--fs-eyebrow` | 0.8125rem | 500 | 1 | Mono, uppercase, +0.08em tracking |

**Metric numerals** use `font-variant-numeric: tabular-nums` so animated counters don't jitter.

## 4. Spacing, grid, radius

- **Space scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- **Grid:** 12-col, `max-width: 1200px` content / `1440px` wide, gutters 24px desktop / 16px mobile.
- **Section rhythm:** 96–160px vertical padding desktop, 64–96px mobile.
- **Radius:** `--r-sm 8px`, `--r-md 12px`, `--r-lg 16px`, `--r-xl 24px`, `--r-full 9999px`. Cards default `--r-lg`.

## 5. Elevation & materials

Dark UIs lean on **light and blur**, not drop shadows.

| Token | Treatment |
|-------|-----------|
| `--elev-flat` | surface color only |
| `--elev-card` | `surface-1` + `1px var(--border)` + faint inner top-highlight |
| `--elev-raised` | `surface-2` + border + `0 8px 24px rgba(0,0,0,.4)` |
| `--elev-overlay` | glass: `backdrop-filter: blur(16px)` + `rgba(20,22,28,.72)` + border |
| `--glow-brand` | `0 0 40px -8px rgba(91,91,240,.5)` (hero, active states) |

**Glassmorphism** on sticky nav, mega-menu, floating AI/WhatsApp widget, modals.

## 6. Iconography & imagery

- **Icons:** Lucide (consistent 1.5px stroke). Brand/partner marks (Amazon, Flipkart, Meta, Google, Shopify…) as monochrome SVGs that tint on hover — fixes the mislabeled-icon defect (C10).
- **Imagery:** replace generic Unsplash category stock with (a) real client/product photography, (b) abstract aurora/data-mesh renders for section backdrops, (c) product-UI screenshots in device frames for case studies.
- **Data-viz:** animated line/area charts for growth deltas; a stylized world map with arcs for cross-border reach.

## 7. Component tokens (examples)

```
Button / primary
  bg: var(--brand-indigo); text: #fff; radius: --r-md; pad: 12px 20px
  hover: brightness(1.08) + translateY(-1px) + --glow-brand
  focus: focus ring
Button / secondary
  bg: transparent; border: 1px var(--border-strong); text: --text-primary
Button / ghost
  bg: transparent; text: --text-secondary; hover: surface-2
Card
  bg: --surface-1; border: 1px --border; radius: --r-lg; pad: 24–32px
  hover: border --border-strong + translateY(-2px) + subtle glow
Input
  bg: --surface-2; border: 1px --border; radius: --r-md; h: 44px
  focus: border --brand-indigo + focus ring
Badge / metric-up
  bg: rgba(16,185,129,.12); text: --profit-emerald; mono
```

## 8. Accessibility & theming baseline

- All interactive targets ≥ 44×44px; visible focus states everywhere.
- Respect `prefers-reduced-motion` (see Animation doc) and `prefers-color-scheme`.
- Color never the sole signal (icon + text with every status color).
- Semantic landmarks, skip-link, logical heading order, labelled forms.
- Theme via `data-theme` attribute on `:root`; all colors are tokens so both themes stay in sync.

## 9. Design tokens (source-of-truth sketch)

```jsonc
{
  "color": { "brand": {"indigo":"#5B5BF0","violet":"#8B5CF6","cyan":"#22D3EE"},
             "profit":"#10B981","signal":"#F59E0B" },
  "font":  { "display":"General Sans","body":"Inter","mono":"Geist Mono" },
  "radius":{ "sm":8,"md":12,"lg":16,"xl":24,"full":9999 },
  "space": [4,8,12,16,24,32,48,64,96,128,160],
  "z":     { "base":0,"sticky":100,"overlay":200,"modal":300,"toast":400 }
}
```
Tokens compile to CSS custom properties consumed by every component — one edit, global effect.
