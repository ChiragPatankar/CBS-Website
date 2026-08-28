"use client";

/**
 * CommandCenter — what operating a live ecommerce business looks like: a header
 * strip, a two-series area chart, a dense tile grid and a live status row. The
 * numbers are stylised interface mock values, not results.
 *
 * Non-obvious: every tile value is a pure function of a single `tick` counter
 * rather than accumulated state. That keeps the first paint identical on server
 * and client (tick 0), makes the drift deterministic, and means pausing the
 * interval — under reduced motion, or whenever the tab is hidden — simply
 * freezes the frame instead of leaving values out of sync.
 */

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

const group = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

type Tile = { label: string; value: (t: number) => string; up: boolean };

const TILES: Tile[] = [
  { label: "Sales", value: (t) => group(1248 + t * 3), up: true },
  { label: "Ad spend", value: (t) => group(312 + Math.floor(t / 3)), up: false },
  { label: "Inventory", value: () => "86%", up: false },
  { label: "Orders", value: (t) => group(74 + Math.floor(t / 2)), up: true },
  { label: "ROAS", value: (t) => `${(3.2 + ((t % 5) - 2) * 0.04).toFixed(2)}×`, up: true },
  { label: "Contribution margin", value: (t) => `${21 + (t % 3)}%`, up: false },
];

const S1 = [18, 27, 22, 35, 31, 45, 41, 57, 52, 69, 74, 88];
const S2 = [12, 15, 20, 18, 27, 24, 33, 30, 39, 36, 47, 51];

function toPath(vals: number[], close = false) {
  const pts = vals.map((v, i) => [
    Math.round(10 + (i * 580) / (vals.length - 1)),
    Math.round(132 - v),
  ]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const m = Math.round((pts[i - 1][0] + pts[i][0]) / 2);
    d += ` C ${m} ${pts[i - 1][1]}, ${m} ${pts[i][1]}, ${pts[i][0]} ${pts[i][1]}`;
  }
  return close ? `${d} L ${pts[pts.length - 1][0]} 138 L ${pts[0][0]} 138 Z` : d;
}

const SERIES = [
  { key: "s1", line: toPath(S1), area: toPath(S1, true), stroke: "var(--color-brand)", fill: "url(#cc-a1)" },
  { key: "s2", line: toPath(S2), area: toPath(S2, true), stroke: "var(--color-brand-3)", fill: "url(#cc-a2)" },
];

/** Ticks the counter every 2.2s. Idle under reduced motion and while hidden. */
function useTick(enabled: boolean) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!enabled) return;
    let id: number | undefined;
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const start = () => {
      if (id === undefined) id = window.setInterval(() => setTick((t) => t + 1), 2200);
    };
    const onVis = () => (document.hidden ? stop() : start());
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled]);
  return tick;
}

export function CommandCenter({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const tick = useTick(!reduce);

  return (
    <div className={cn("w-full", className)}>
      <p className="sr-only">
        A mock operations panel: a revenue and ad-spend trend chart above tiles for sales, ad spend,
        inventory, orders, return on ad spend and contribution margin, with a live sync status row.
      </p>
      <div aria-hidden="true" className="glass inner-lip w-full overflow-hidden rounded-[var(--radius-lg)]">
        {/* Header strip */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1">
              {["var(--color-brand)", "var(--color-brand-2)", "var(--color-brand-3)"].map((c) => (
                <span key={c} className="size-1.5 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--color-faint)] uppercase">Operations</span>
          </div>
          <div className="flex items-center gap-1">
            {["7d", "30d", "QTD"].map((s, i) => (
              <span key={s} className={cn("rounded-full px-2 py-0.5 font-mono text-[10px]",
                i === 0 ? "bg-[var(--color-surface-3)] text-[var(--color-fg)]" : "text-[var(--color-faint)]")}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="px-3 pt-3">
          <svg viewBox="0 0 600 150" className="h-auto w-full" aria-hidden="true" focusable="false">
            <defs>
              {SERIES.map((s, i) => (
                <linearGradient key={s.key} id={`cc-a${i + 1}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.stroke} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={s.stroke} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <g stroke="var(--color-border)" strokeWidth={1}>
              {[48, 78, 108, 138].map((y) => (
                <line key={y} x1={10} x2={590} y1={y} y2={y} />
              ))}
            </g>
            {SERIES.map((s, i) => (
              <g key={s.key}>
                <motion.path d={s.area} fill={s.fill}
                  initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: DUR.reveal, delay: 0.5 + i * 0.14, ease: EASE.out }} />
                <motion.path d={s.line} fill="none" stroke={s.stroke} strokeWidth={2} strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.14, ease: EASE.standard }} />
              </g>
            ))}
            <g fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-faint)">
              {["W1", "W2", "W3", "W4"].map((w, i) => (
                <text key={w} x={12 + i * 193} y={148}>
                  {w}
                </text>
              ))}
            </g>
          </svg>
        </div>

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-2 px-3 pt-3 pb-3 sm:grid-cols-3">
          {TILES.map((t, i) => (
            <motion.div
              key={t.label}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-3 py-2"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, delay: 0.7 + staggerDelay(i, TILES.length), ease: EASE.out }}
            >
              <div className="truncate font-mono text-[9.5px] tracking-[0.12em] text-[var(--color-faint)] uppercase">
                {t.label}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="tabular font-display text-[17px] leading-none text-[var(--color-fg)]">{t.value(tick)}</span>
                <span className="font-mono text-[9.5px]"
                  style={{ color: t.up ? "var(--color-profit)" : "var(--color-faint)" }}>
                  {t.up ? "▲" : "—"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-[var(--color-muted)] uppercase">
            <span className={cn("size-1.5 rounded-full bg-[var(--color-profit)]", !reduce && "live-dot")} />
            Live — marketplace feeds syncing
          </span>
          <span className="font-mono text-[10px] text-[var(--color-faint)]">auto</span>
        </div>
      </div>
    </div>
  );
}
