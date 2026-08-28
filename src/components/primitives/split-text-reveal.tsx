"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, REVEAL_VIEWPORT } from "@/lib/motion/tokens";

type SplitTextRevealProps = {
  /** Plain text. Split on whitespace; each word animates independently. */
  text: string;
  /** Seconds before the first word. */
  delay?: number;
  /** Seconds between words (docs/04 §3 specifies 40ms for headline reveals). */
  stagger?: number;
  /** `mount` for above-the-fold headings, `inView` for ones further down. */
  trigger?: "mount" | "inView";
  /** Classes on the wrapper. */
  className?: string;
  /** Classes on each word — e.g. `text-gradient` for a highlighted line. */
  wordClassName?: string;
};

/**
 * Per-word headline reveal (docs/04 §3). Generalises the hardcoded `line1` /
 * `line2` word arrays that were inlined in `sections/hero.tsx`.
 *
 * Words translate up into place rather than being clipped by an
 * `overflow-hidden` mask: masking each word clips descenders (g, y, p) unless
 * every line's box is padded, which is fragile across the fluid type scale.
 *
 * Accessibility: the animated spans are `aria-hidden` and the full string is
 * exposed once via a visually-hidden span, so assistive tech reads a single
 * clean phrase instead of word-by-word fragments.
 */
export function SplitTextReveal({
  text,
  delay = 0,
  stagger = 0.04,
  trigger = "mount",
  className,
  wordClassName,
}: SplitTextRevealProps) {
  const reduce = useReducedMotion();
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: "0.45em" };
  const shown = { opacity: 1, y: 0 };
  const animateProps =
    trigger === "mount"
      ? { animate: shown }
      : { whileInView: shown, viewport: REVEAL_VIEWPORT };

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={hidden}
            {...animateProps}
            transition={{
              duration: DUR.slow,
              delay: delay + i * stagger,
              ease: EASE.out,
            }}
            className={`inline-block ${wordClassName ?? ""}`}
          >
            {word}
            {i < words.length - 1 ? " " : null}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
