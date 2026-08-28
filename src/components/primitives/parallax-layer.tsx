"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** docs/04 §5 caps parallax at 8% translate. Not configurable past this. */
const MAX_SHIFT_PERCENT = 8;

type ParallaxLayerProps = {
  children: React.ReactNode;
  /** Percent shift across the element's scroll range. Clamped to 8. */
  shift?: number;
  className?: string;
};

/**
 * Decorative parallax for background and ornamental layers.
 *
 * Always `aria-hidden` and `pointer-events-none` by construction: docs/04 §5
 * restricts parallax to non-content layers — never text — so this component
 * refuses to be used for anything an assistive-tech user needs to reach.
 * Disabled entirely under reduced-motion.
 */
export function ParallaxLayer({ children, shift = MAX_SHIFT_PERCENT, className }: ParallaxLayerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const capped = Math.min(Math.abs(shift), MAX_SHIFT_PERCENT);
  const y = useTransform(scrollYProgress, [0, 1], [`${-capped}%`, `${capped}%`]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none", className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
