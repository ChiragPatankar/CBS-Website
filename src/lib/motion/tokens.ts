/**
 * Motion tokens — single source of truth for duration, easing and stagger.
 * Mirrors the CSS custom properties in `src/app/globals.css` (`--dur-*`, `--ease-*`).
 * Values from docs/04-animation-plan.md §2.
 *
 * Import these instead of inlining literals: the `[0.16, 1, 0.3, 1]` curve was
 * previously duplicated across reveal, hero and every section that animates.
 */

/** Cubic-bezier control points, in the mutable-tuple shape framer-motion's `ease` expects. */
export type Cubic = [number, number, number, number];

/** Durations in **seconds** — framer-motion's unit. CSS uses the `--dur-*` vars. */
export const DUR = {
  /** Taps, toggles. */
  instant: 0.1,
  /** Hovers, buttons. */
  fast: 0.18,
  /** Cards, state changes. */
  base: 0.28,
  /** Hero and section entrances. */
  slow: 0.5,
  /** Scroll reveals — deliberately slower than UI feedback. */
  reveal: 0.6,
} as const;

export const EASE: Record<"out" | "standard" | "inOut", Cubic> = {
  /** Entrances. Expressive, strongly decelerating. */
  out: [0.16, 1, 0.3, 1],
  /** Most UI transitions. */
  standard: [0.2, 0, 0, 1],
  /** Loops and reversible transitions. */
  inOut: [0.65, 0, 0.35, 1],
};

/** Interactive drags, toggles, shared-layout morphs. */
export const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

/** Slightly tighter spring for card hover lifts. */
export const SPRING_HOVER = { type: "spring", stiffness: 300, damping: 24 } as const;

/** Seconds between siblings in a staggered group (docs/04 §2 — 60ms base). */
export const STAGGER = 0.06;

/** Ceiling on a group's total stagger, so long lists don't crawl in. */
export const STAGGER_MAX_TOTAL = 0.48;

/**
 * Per-item entrance delay for index `i`. Pass `count` to compress the step when
 * a group is long enough that `i * STAGGER` would exceed `STAGGER_MAX_TOTAL`.
 */
export function staggerDelay(i: number, count = 0): number {
  const step =
    count > 1 ? Math.min(STAGGER, STAGGER_MAX_TOTAL / (count - 1)) : STAGGER;
  return i * step;
}

/** Exits should read quicker than entrances (docs/04 §7). */
export const EXIT_RATIO = 0.65;

/** Standard scroll-reveal viewport config — fire once, slightly before full visibility. */
export const REVEAL_VIEWPORT = { once: true, margin: "-80px" } as const;
