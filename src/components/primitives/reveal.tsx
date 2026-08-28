"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { DUR, EASE, REVEAL_VIEWPORT } from "@/lib/motion/tokens";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Scroll-triggered opacity + rise. Respects reduced-motion. Fires once. */
export function Reveal({ children, delay = 0, y = 18, className, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: DUR.reveal, delay, ease: EASE.out }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * `docs/04-animation-plan.md` §5 refers to this component as `RevealOnScroll`.
 * `Reveal` is the canonical export (it is what every existing call site
 * imports); this alias exists so code written against the spec's vocabulary
 * resolves without renaming eight files.
 */
export { Reveal as RevealOnScroll };
