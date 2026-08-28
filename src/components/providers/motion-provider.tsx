"use client";

import type * as React from "react";
import { MotionConfig } from "framer-motion";

/**
 * Sitewide motion policy.
 *
 * `reducedMotion="user"` makes framer-motion drop transform and layout
 * animations for anyone with the OS reduce-motion preference set, across every
 * `motion.*` component — including the ones that never called
 * `useReducedMotion()` themselves: the card hover lifts in `ai-capabilities`
 * and `industries`, the `cta` band, the `layoutId` morphs in `case-studies`,
 * and the header mega-menu and mobile drawer.
 *
 * The `prefers-reduced-motion` block in globals.css cannot reach any of those:
 * framer-motion animates via rAF/WAAPI, not CSS transitions, so no amount of
 * `transition-duration: 0 !important` affects it. This provider is what
 * actually honours the preference.
 *
 * Opacity fades survive, which is the behaviour docs/04 §8 specifies.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
