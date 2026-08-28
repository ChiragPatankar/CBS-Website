"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, REVEAL_VIEWPORT } from "@/lib/motion/tokens";

type AnimatedPathProps = {
  /** SVG path data. */
  d: string;
  delay?: number;
  /** Seconds for the draw. Longer than a UI transition by design. */
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
  fill?: string;
  className?: string;
};

/**
 * Draw-on SVG path for growth charts and cross-border map arcs (docs/04 §3).
 *
 * Uses framer-motion's `pathLength`, which drives `stroke-dasharray` /
 * `stroke-dashoffset` under the hood — a compositor-friendly stroke animation,
 * no layout involved. Under reduced-motion the path renders complete
 * immediately: the data is the point, the drawing is decoration.
 */
export function AnimatedPath({
  d,
  delay = 0,
  duration = 1.2,
  stroke = "currentColor",
  strokeWidth = 2,
  strokeLinecap = "round",
  fill = "none",
  className,
}: AnimatedPathProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        fill={fill}
        className={className}
      />
    );
  }

  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      fill={fill}
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{
        pathLength: { duration, delay, ease: EASE.out },
        opacity: { duration: DUR.fast, delay },
      }}
    />
  );
}
