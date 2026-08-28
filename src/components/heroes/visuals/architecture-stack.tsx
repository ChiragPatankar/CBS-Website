"use client";

/**
 * ArchitectureStack — the five planes of a custom web build (frontend → API →
 * backend → database → cloud) drawn as an engineering elevation: flat offset
 * planes, 1px strokes, mono labels, and brand orange reserved for the single
 * live path. A request descends the stack, a response returns up it.
 *
 * Non-obvious decision: the travelling request is ONE <path> whose dash window
 * moves — pathLength is pinned to a fraction and pathOffset is tweened 0→1 —
 * rather than a dot translated along the polyline. That is one element and one
 * compositable property (stroke-dashoffset), and it stays correct at every
 * breakpoint because the viewBox scales the path with it; a translated dot
 * would need its keyframes recomputed per width.
 */

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

const LAYERS = [
  { id: "01", label: "FRONTEND", note: "UI / RENDER" },
  { id: "02", label: "API", note: "CONTRACT" },
  { id: "03", label: "BACKEND", note: "SERVICES" },
  { id: "04", label: "DATABASE", note: "PERSISTENCE" },
  { id: "05", label: "CLOUD", note: "RUNTIME" },
] as const;

const W = 300;
const H = 42;
const GAP = 24;
const X0 = 110;
const Y0 = 34;
const SKEW = 14;

const planeX = (i: number) => X0 - i * SKEW;
const planeY = (i: number) => Y0 + i * (H + GAP);
const pt = (i: number, dx: number) => `${planeX(i) + dx},${planeY(i) + H / 2}`;

const DOWN = `M ${LAYERS.map((_, i) => pt(i, 34)).join(" L ")}`;
const UP = `M ${LAYERS.map((_, i) => pt(LAYERS.length - 1 - i, W - 34)).join(" L ")}`;

export function ArchitectureStack({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 460 380"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-labelledby="arch-stack-title"
    >
      <title id="arch-stack-title">
        Layered application architecture: a request travels down from the frontend
        through the API, backend and database to the cloud runtime, and the
        response returns back up the same stack.
      </title>

      {/* inter-plane connectors */}
      <g aria-hidden="true" stroke="var(--color-border-strong)" strokeWidth={1}>
        {LAYERS.slice(0, -1).map((l, i) => (
          <line
            key={l.id} strokeDasharray="2 4"
            x1={planeX(i) + W / 2} y1={planeY(i) + H}
            x2={planeX(i + 1) + W / 2} y2={planeY(i + 1)}
          />
        ))}
      </g>

      {/* planes */}
      {LAYERS.map((l, i) => (
        <motion.g
          key={l.id}
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.reveal, ease: EASE.out, delay: staggerDelay(i, LAYERS.length) }}
        >
          <rect
            x={planeX(i)} y={planeY(i)} width={W} height={H} rx={6}
            fill="var(--color-surface-1)" stroke="var(--color-border-strong)" strokeWidth={1}
          />
          <line
            x1={planeX(i) + 1} y1={planeY(i) + 1} x2={planeX(i) + W - 1} y2={planeY(i) + 1}
            stroke="var(--color-border)" strokeWidth={1}
          />
          <text
            x={planeX(i) - 10} y={planeY(i) + H / 2 + 3} textAnchor="end"
            className="font-mono" fontSize={9} fill="var(--color-faint)"
          >
            {l.id}
          </text>
          <text
            x={planeX(i) + 56} y={planeY(i) + H / 2 + 4} className="font-mono"
            fontSize={11} letterSpacing="0.12em" fill="var(--color-fg)"
          >
            {l.label}
          </text>
          <text
            x={planeX(i) + W - 48} y={planeY(i) + H / 2 + 3} textAnchor="end"
            className="font-mono" fontSize={9} letterSpacing="0.1em" fill="var(--color-faint)"
          >
            {l.note}
          </text>
        </motion.g>
      ))}

      {/* static rails — keep the route legible when the live segment is elsewhere */}
      <g aria-hidden="true" fill="none" strokeWidth={1} strokeDasharray="1 5">
        <path d={DOWN} stroke="var(--color-border-strong)" />
        <path d={UP} stroke="var(--color-border-strong)" />
      </g>

      {/* request down / response up */}
      {reduce ? (
        <g aria-hidden="true" fill="none" strokeWidth={1.5} strokeLinecap="round">
          <path d={DOWN} stroke="var(--color-brand)" opacity={0.9} />
          <path d={UP} stroke="var(--color-brand-3)" opacity={0.7} />
        </g>
      ) : (
        <g aria-hidden="true" fill="none" strokeWidth={1.75} strokeLinecap="round">
          <motion.path
            d={DOWN}
            stroke="var(--color-brand)"
            initial={{ pathLength: 0.16, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: 3.2, ease: EASE.inOut, repeat: Infinity, repeatDelay: 1.2 }}
          />
          <motion.path
            d={UP}
            stroke="var(--color-brand-3)"
            initial={{ pathLength: 0.16, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: 3.2, ease: EASE.inOut, repeat: Infinity, repeatDelay: 1.2, delay: 2.2 }}
          />
        </g>
      )}

      {/* terminals + direction, so the route reads with zero motion */}
      <g aria-hidden="true" className="font-mono" fontSize={8} letterSpacing="0.16em">
        <circle cx={planeX(0) + 34} cy={planeY(0) + H / 2} r={3} fill="var(--color-brand)" />
        <text x={planeX(0) + 34} y={planeY(0) - 10} textAnchor="middle" fill="var(--color-brand)">
          REQUEST
        </text>
        <polygon points="-3.5,-4 3.5,-4 0,3.5" fill="var(--color-brand)"
          transform={`translate(${planeX(4) + 34},${planeY(4) + H / 2 + 10})`} />
        <text x={planeX(0) + W - 34} y={planeY(0) - 10} textAnchor="middle" fill="var(--color-brand-3)">
          RESPONSE
        </text>
        <polygon points="-3.5,4 3.5,4 0,-3.5" fill="var(--color-brand-3)"
          transform={`translate(${planeX(0) + W - 34},${planeY(0) + H / 2 - 10})`} />
      </g>
    </svg>
  );
}
