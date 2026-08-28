"use client";

import * as React from "react";
import { staggerDelay } from "@/lib/motion/tokens";
import { Reveal } from "./reveal";

type RevealGroupProps = {
  children: React.ReactNode;
  /** Seconds before the first child begins. */
  delay?: number;
  /** Rise distance passed through to each child's Reveal. */
  y?: number;
  /** Classes for the group wrapper (usually the grid or flex container). */
  className?: string;
  /** Classes applied to each child's Reveal wrapper — use `h-full` for equal-height cards. */
  itemClassName?: string;
  as?: "div" | "ul" | "ol";
};

/**
 * Staggers its children's scroll reveals at the canonical 60ms step
 * (docs/04 §2), compressing the step on long groups so the tail doesn't crawl.
 *
 * Replaces hand-written `delay={i * 0.06}` at the call site, which had drifted
 * to three different values (0.04 / 0.06 / 0.08) across sections. Each child is
 * wrapped in a `Reveal`, so in a grid the wrapper becomes the grid item — the
 * same shape the sections already used.
 */
export function RevealGroup({
  children,
  delay = 0,
  y,
  className,
  itemClassName,
  as: Tag = "div",
}: RevealGroupProps) {
  const items = React.Children.toArray(children);

  return (
    <Tag className={className}>
      {items.map((child, i) => (
        <Reveal
          key={React.isValidElement(child) && child.key != null ? child.key : i}
          delay={delay + staggerDelay(i, items.length)}
          y={y}
          className={itemClassName}
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
