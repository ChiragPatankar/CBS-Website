"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * Portfolio index for the solutions hub.
 *
 * Not an illustration of any one service — it is a *map of the offer*: three
 * pillar columns, twelve leaves, joined to one root. The hub's only job is to
 * show the shape of the whole thing, and a diagram does that faster than three
 * cards of prose.
 *
 * Drawn as an SVG rather than DOM boxes so the connectors can be real paths that
 * animate with `pathLength`, and so the whole thing scales as one unit instead of
 * needing breakpoints for every label.
 */
const COLUMNS = [
  {
    name: "Marketplace",
    accent: "var(--color-brand-3)",
    items: ["Cataloging & Creative", "Global Selling", "Growth & Management", "New Expansion"],
  },
  {
    name: "Commerce Growth",
    accent: "var(--color-brand)",
    items: ["Meta Ads", "Google Ads", "Shopify Build", "Retention"],
  },
  {
    name: "Technology & AI",
    accent: "var(--color-brand-2)",
    items: ["Web Development", "Mobile Apps", "Cloud", "AI & ML"],
  },
];

export function HubVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const W = 900;
  const H = 340;
  const rootY = 40;
  const colY = 108;
  const leafTop = 176;
  const leafGap = 40;
  const colX = [150, 450, 750];

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Three pillars — Marketplace, Commerce Growth, and Technology and AI — each containing four services, all run by one team."
      >
        {/* Root node */}
        <g>
          <line
            x1={W / 2}
            y1={rootY + 12}
            x2={W / 2}
            y2={colY - 26}
            stroke="var(--color-border-strong)"
            strokeWidth={1}
          />
          <text
            x={W / 2}
            y={rootY}
            textAnchor="middle"
            className="fill-[var(--color-faint)] font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.16em" }}
          >
            One operating team
          </text>
        </g>

        {COLUMNS.map((col, ci) => {
          const cx = colX[ci];
          return (
            <g key={col.name}>
              {/* Root → pillar connector, drawn in. */}
              <motion.path
                d={`M ${W / 2} ${colY - 26} C ${W / 2} ${colY - 6}, ${cx} ${colY - 34}, ${cx} ${colY - 14}`}
                fill="none"
                stroke="var(--color-border-strong)"
                strokeWidth={1}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.15 + ci * 0.1, ease: EASE.out }}
              />

              {/* Pillar label */}
              <motion.g
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.slow, delay: 0.35 + ci * 0.1, ease: EASE.out }}
              >
                <rect
                  x={cx - 92}
                  y={colY - 14}
                  width={184}
                  height={30}
                  rx={15}
                  fill="var(--color-surface-1)"
                  stroke={col.accent}
                  strokeOpacity={0.45}
                  strokeWidth={1}
                />
                <text
                  x={cx}
                  y={colY + 5}
                  textAnchor="middle"
                  className="font-mono text-[10.5px] uppercase"
                  fill={col.accent}
                  style={{ letterSpacing: "0.14em" }}
                >
                  {col.name}
                </text>
              </motion.g>

              {/* Vertical spine down the column */}
              <motion.line
                x1={cx}
                y1={colY + 16}
                x2={cx}
                y2={leafTop + (col.items.length - 1) * leafGap}
                stroke="var(--color-border)"
                strokeWidth={1}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + ci * 0.1, ease: EASE.out }}
              />

              {col.items.map((item, li) => {
                const y = leafTop + li * leafGap;
                return (
                  <motion.g
                    key={item}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: DUR.base,
                      delay: 0.65 + ci * 0.08 + staggerDelay(li, col.items.length),
                      ease: EASE.out,
                    }}
                  >
                    {/* Tick out to the leaf */}
                    <line
                      x1={cx}
                      y1={y}
                      x2={cx - 78}
                      y2={y}
                      stroke="var(--color-border)"
                      strokeWidth={1}
                    />
                    <circle cx={cx} cy={y} r={2.5} fill={col.accent} fillOpacity={0.85} />
                    <text
                      x={cx - 84}
                      y={y + 3.5}
                      textAnchor="end"
                      className="fill-[var(--color-muted)] text-[11px]"
                    >
                      {item}
                    </text>
                  </motion.g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
