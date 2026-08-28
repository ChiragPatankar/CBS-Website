"use client";

/**
 * ProductTransformation — raw product data becoming a polished marketplace
 * listing. Visual weight climbs left→right (surface tint, border strength,
 * ember accents, a real buy affordance) so "enrichment" reads even as a
 * freeze-frame with zero motion.
 *
 * Non-obvious: SVG cannot reflow, so the composition is declared once as a
 * `Layout` (viewBox + panel origins + connector paths) and the same three panel
 * bodies are rendered twice — stacked below `sm`, a row above. Panels are
 * authored landscape (190×120) because that is the only aspect ratio that stays
 * legible both as a 3-up row at 640px and stacked at 360px.
 */

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

type Layout = { id: string; viewBox: string; at: [number, number][]; arrows: string[] };

const ROW: Layout = {
  id: "row",
  viewBox: "0 0 660 160",
  at: [[10, 20], [235, 20], [460, 20]],
  arrows: ["M 206 80 H 227 M 221 74 L 228 80.5 L 221 87", "M 431 80 H 452 M 446 74 L 453 80.5 L 446 87"],
};

const COL: Layout = {
  id: "col",
  viewBox: "0 0 210 430",
  at: [[10, 8], [10, 154], [10, 300]],
  arrows: ["M 105 134 V 148 M 99 142 L 105.5 149 L 112 142", "M 105 280 V 294 M 99 288 L 105.5 295 L 112 288"],
};

const CHIPS = [
  { t: "Material", w: 48 },
  { t: "Size", w: 28 },
  { t: "GTIN", w: 30 },
  { t: "Colour", w: 40 },
];

const STAR =
  "M 0 -4.2 L 1.2 -1.3 L 4.3 -1.1 L 1.9 0.9 L 2.7 3.9 L 0 2.2 L -2.7 3.9 L -1.9 0.9 L -4.3 -1.1 L -1.2 -1.3 Z";

const tr = (delay: number, duration: number = DUR.base) => ({ duration, delay, ease: EASE.out });
const MONO = "var(--font-mono)";

type P = { reduce: boolean };

function Shell({ fill, stroke, label, tint }: Record<"fill" | "stroke" | "label" | "tint", string>) {
  return (
    <>
      <rect width={190} height={120} rx={10} fill={fill} stroke={stroke} strokeWidth={1} />
      <text x={12} y={17} fontSize={7.5} fontFamily={MONO} letterSpacing="0.12em" fill={tint}>{label}</text>
    </>
  );
}

function PanelRaw({ reduce }: P) {
  return (
    <>
      <Shell fill="var(--color-surface-1)" stroke="var(--color-border)" label="01 · RAW FEED" tint="var(--color-faint)" />
      <rect x={12} y={26} width={42} height={42} rx={6} fill="var(--color-surface-2)" stroke="var(--color-border)" strokeDasharray="3 3" />
      <path d="M 22 36 L 44 58 M 44 36 L 22 58" stroke="var(--color-border-strong)" strokeWidth={1.2} fill="none" />
      <g fill="none" strokeWidth={1} strokeDasharray="4 4">
        {[0, 1, 2].map((i) => (
          <motion.g key={i} initial={reduce ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
            transition={tr(0.24 + staggerDelay(i, 3))}>
            <rect x={64} y={30 + i * 14} width={26} height={5} rx={2.5} fill="var(--color-surface-3)" strokeDasharray="0" />
            <rect x={96} y={30 + i * 14} width={78} height={5} rx={2.5} stroke="var(--color-border-strong)" />
          </motion.g>
        ))}
        <rect x={12} y={82} width={124} height={5} rx={2.5} stroke="var(--color-border)" />
        <rect x={12} y={96} width={82} height={5} rx={2.5} stroke="var(--color-border)" />
      </g>
    </>
  );
}

function PanelEnriched({ reduce }: P) {
  let x = 12;
  return (
    <>
      <Shell fill="var(--color-surface-2)" stroke="var(--color-border-strong)" label="02 · ENRICHED" tint="var(--color-brand-3)" />
      <rect x={12} y={26} width={38} height={38} rx={6} fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
      <rect x={20} y={40} width={22} height={14} rx={3} fill="var(--color-brand-2)" opacity={0.55} />
      <circle cx={26} cy={35} r={3.4} fill="var(--color-brand-3)" opacity={0.7} />
      <motion.g initial={reduce ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={tr(0.86)}>
        <rect x={58} y={28} width={92} height={7} rx={3.5} fill="var(--color-fg)" opacity={0.82} />
        <rect x={58} y={41} width={62} height={6} rx={3} fill="var(--color-muted)" opacity={0.5} />
      </motion.g>
      {CHIPS.map((c, i) => {
        const cx = x;
        x += c.w + 4;
        return (
          <motion.g key={c.t} initial={reduce ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={tr(1 + staggerDelay(i, CHIPS.length))}>
            <rect x={cx} y={76} width={c.w} height={14} rx={7} fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
            <text x={cx + c.w / 2} y={85.4} fontSize={7.5} textAnchor="middle" fontFamily={MONO} fill="var(--color-muted)">{c.t}</text>
          </motion.g>
        );
      })}
      <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={tr(1.24)}>
        <rect x={12} y={95} width={166} height={15} rx={4} fill="var(--color-surface-1)" stroke="var(--color-border)" />
        <text x={18} y={105.4} fontSize={7} fontFamily={MONO} fill="var(--color-faint)">meta · keywords · alt-text</text>
      </motion.g>
    </>
  );
}

function PanelListing({ reduce, gid }: P & { gid: string }) {
  return (
    <motion.g initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
      transition={tr(1.5, DUR.slow)}>
      <Shell fill="var(--color-surface-2)" stroke="var(--color-brand)" label="03 · LIVE LISTING" tint="var(--color-brand)" />
      <rect x={2} y={2} width={186} height={116} rx={8} fill="none" stroke="var(--color-brand-3)" opacity={0.16} />
      <rect x={12} y={26} width={44} height={44} rx={6} fill={`url(#${gid})`} />
      <rect x={64} y={27} width={88} height={7} rx={3.5} fill="var(--color-fg)" opacity={0.9} />
      <rect x={64} y={39} width={54} height={6} rx={3} fill="var(--color-brand-3)" opacity={0.45} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path key={i} d={STAR} transform={`translate(${69 + i * 11} 57)`} fill="var(--color-brand-3)"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={tr(1.78 + staggerDelay(i, 5), DUR.fast)} />
      ))}
      <text x={128} y={60} fontSize={7} fontFamily={MONO} fill="var(--color-faint)" className="tabular">(1,248)</text>
      <rect x={12} y={82} width={92} height={24} rx={6} fill="var(--color-brand)" />
      <text x={58} y={97.5} fontSize={9} fontWeight={600} textAnchor="middle" fill="#14100f">Add to cart</text>
      <rect x={110} y={82} width={68} height={24} rx={6} fill="none" stroke="var(--color-border-strong)" />
      <text x={144} y={97.5} fontSize={9} textAnchor="middle" fill="var(--color-muted)">Save</text>
    </motion.g>
  );
}

function Scene({ layout, reduce, className }: { layout: Layout; reduce: boolean; className?: string }) {
  const gid = `pt-ember-${layout.id}`;
  const bodies = [
    <PanelRaw key="a" reduce={reduce} />,
    <PanelEnriched key="b" reduce={reduce} />,
    <PanelListing key="c" reduce={reduce} gid={gid} />,
  ];
  return (
    <svg viewBox={layout.viewBox} className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop offset="100%" stopColor="var(--color-brand-3)" />
        </linearGradient>
      </defs>
      {layout.arrows.map((d, i) => (
        <motion.path key={d} d={d} fill="none" stroke="var(--color-border-strong)" strokeWidth={1.4}
          strokeLinecap="round" strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: DUR.slow, delay: 0.6 + i * 0.66, ease: EASE.standard }} />
      ))}
      {bodies.map((body, i) => (
        <g key={i} transform={`translate(${layout.at[i][0]} ${layout.at[i][1]})`}>{body}</g>
      ))}
    </svg>
  );
}

export function ProductTransformation({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={cn("w-full", className)}>
      <p className="sr-only">
        Three stages of product enrichment: a raw supplier feed with empty attribute fields, an
        enriched record with title, attribute chips and SEO metadata, and a finished marketplace
        listing with imagery, ratings and a buy button.
      </p>
      <Scene layout={COL} reduce={reduce} className="sm:hidden" />
      <Scene layout={ROW} reduce={reduce} className="hidden sm:block" />
    </div>
  );
}
