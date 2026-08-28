"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollProgressBarProps = { className?: string };

/**
 * Thin aurora progress bar for long pages — case studies and legal prose
 * (docs/04 §5). Scales on the X axis only, so it never triggers layout.
 *
 * Under reduced-motion the spring smoothing is dropped and the bar tracks
 * scroll position directly: the indicator itself is useful orientation
 * information, it's the easing that would be gratuitous.
 */
export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduce ? scrollYProgress : smoothed }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-0.5 origin-left aurora-gradient",
        className
      )}
    />
  );
}
