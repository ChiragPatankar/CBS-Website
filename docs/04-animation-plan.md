# 04 — Animation Plan

## 1. Principles

1. **Motion earns its place.** Every animation clarifies hierarchy, gives feedback, or tells the growth story. No decoration for its own sake (the OpenAI/Linear discipline).
2. **Fast & physical.** Short durations, natural easing. UI should feel instant; storytelling can breathe.
3. **Choreographed, not chaotic.** Elements enter in a deliberate sequence (stagger), never all at once.
4. **Respect the user.** Full support for `prefers-reduced-motion` — reduce to opacity-only or no motion.
5. **60fps or don't ship it.** Animate only `transform` and `opacity`. No layout-thrash properties.

## 2. Motion tokens

| Token | Value | Use |
|-------|-------|-----|
| `--dur-instant` | 100ms | Taps, toggles |
| `--dur-fast` | 180ms | Hovers, buttons |
| `--dur-base` | 280ms | Cards, reveals |
| `--dur-slow` | 500ms | Hero, section entrances |
| `--dur-ambient` | 8–20s | Aurora drift, marquees |
| `--ease-standard` | `cubic-bezier(.2,.0,.0,1)` | Most UI |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | Entrances (expressive) |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Loops |
| `--spring` | (Framer Motion) `stiffness 300, damping 30` | Interactive drags/toggles |

Stagger base: **60ms** between siblings (cap the total so long lists don't crawl).

## 3. Signature moments

| Moment | Behavior |
|--------|----------|
| **Aurora hero** | Slow, GPU-cheap gradient drift + parallax blob behind the H1; settles as you scroll. Reduced-motion: static gradient. |
| **Headline reveal** | Hero H1 animates in by line/word (clip-mask + y-translate, 500ms, ease-out, 40ms word stagger). |
| **Animated metrics** | `StatCounter` counts up from 0 when scrolled into view (once). Tabular-nums prevents jitter. The core "every number is alive" idea. |
| **Growth chart draw** | Case-study/home area charts draw their path (`stroke-dashoffset`) + fill fades in when in view. |
| **Two-motion swap** | Toggling Launch⇄Scale cross-fades + slides stat values; the active pill morphs with a spring. |
| **Cross-border map** | Arcs animate from origin to destination markets on the reach section (draw-on). |
| **Mega-menu** | Panel fades + drops 8px (fast, ease-out); columns stagger 40ms; blur backdrop. |

## 4. Interaction micro-motions

| Element | Motion |
|---------|--------|
| Button hover | `translateY(-1px)` + brightness + glow (fast) |
| Button press | `scale(.98)` (instant) |
| Card hover | `translateY(-2px)` + border brighten + faint glow (base) |
| Link hover | Underline wipe left→right |
| Input focus | Border color + focus ring fade-in (fast) |
| Accordion (FAQ) | Height auto + content fade (base, ease-standard) |
| Filter chip select | Background fill + checkmark pop (spring) |
| Theme toggle | Icon crossfade/rotate; colors transition 200ms |
| Tab/nav underline | Shared-layout slide between items (spring) |

## 5. Scroll choreography

- **`RevealOnScroll`** wraps sections: opacity 0→1 + `translateY(16px→0)`, base duration, triggered once at ~15% visibility.
- **Staggered grids** (services, deliverables, case studies): children reveal with 60ms stagger.
- **Sticky header** condenses (height + blur + border) between 0–80px scroll.
- **Parallax**: subtle (≤ 8% translate) on hero blobs and case-study hero images only. Never on text.
- **Progress**: thin aurora scroll-progress bar on long pages (case studies, legal).

## 6. Page transitions

- Route change: outgoing fades 120ms, incoming fades + 8px rise 200ms (View Transitions API where supported; Framer Motion fallback).
- Preserve header; only the `<main>` region transitions.
- Skeleton/shimmer for async content (case-study lists, AI audit steps).

## 7. AI-first motion

- **AIAuditWidget**: questions advance with a horizontal slide; a typing/thinking indicator (3-dot pulse) while it "computes" the result; the final recommendation assembles with a staggered reveal + count-up projected metrics.
- **FloatingAssistant**: gentle idle bob every ~6s to draw attention (once, then rests); opens with a scale+fade from the corner.

## 8. Performance budget & guardrails

- Animate **only** `transform`/`opacity`; promote with `will-change` sparingly, remove after.
- Ambient loops must be GPU-composited and pause when tab hidden (`visibilitychange`) and when off-screen.
- Marquees/aurora use CSS animation, not JS rAF, where possible.
- Lazy-mount heavy motion (charts, map arcs) via intersection observer.
- Hard rule: **`@media (prefers-reduced-motion: reduce)`** disables transforms/parallax/auto-play, keeps essential opacity fades, freezes counters at final value.
- Total JS for motion (Framer Motion) code-split per route; hero/above-the-fold motion must not block LCP.
