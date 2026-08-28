"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

type StatCounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  className?: string;
};

/** Animated count-up when scrolled into view (once). Tabular numerals. */
export function StatCounter({ value, suffix = "", decimals = 0, label, className }: StatCounterProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const numRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const format = (n: number) => n.toFixed(decimals);
    if (!inView) {
      el.textContent = format(0);
      return;
    }
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE.out,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduce]);

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        <span ref={numRef} className="tabular">
          0
        </span>
        <span className="text-gradient">{suffix}</span>
      </div>
      <span className="mt-2 text-sm text-muted">{label}</span>
    </div>
  );
}
