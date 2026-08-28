"use client";

/**
 * JourneyPath — discovery → launch → scale on a new marketplace. A diagonal
 * route draws through five waypoints; the final segment breaks sharply upward
 * against a dashed continuation of the previous trajectory, so "growth" is
 * legible as a divergence rather than just a label.
 *
 * Non-obvious: waypoint activation delays are derived from hand-measured
 * cumulative arc fractions (`AT`) rather than an even stagger. `pathLength`
 * advances at constant *length*, not constant index, so an even stagger would
 * visibly drift ahead of the stroke on the long final segment.
 */

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

type Kind = "existing" | "step" | "growth";

const STOPS: { label: string; x: number; y: number; lx: number; ly: number; kind: Kind }[] = [
  { label: "Existing channel", x: 60, y: 330, lx: 74, ly: 351, kind: "existing" },
  { label: "Opportunity detected", x: 160, y: 286, lx: 174, ly: 307, kind: "step" },
  { label: "New marketplace", x: 262, y: 236, lx: 276, ly: 257, kind: "step" },
  { label: "Launch", x: 364, y: 182, lx: 378, ly: 203, kind: "step" },
  { label: "Growth", x: 452, y: 62, lx: 466, ly: 83, kind: "growth" },
];

const PATH =
  "M 60 330 C 96 324, 126 300, 160 286" +
  " C 196 271, 230 254, 262 236" +
  " C 296 217, 334 198, 364 182" +
  " C 402 162, 428 132, 452 62";

/** Where the trajectory would have gone at the pre-launch slope. */
const BASELINE = "M 364 182 L 452 135";

/** Cumulative fraction of total path length at each waypoint. */
const AT = [0, 0.22, 0.46, 0.7, 1];

const DRAW = 1.7;
const START = 0.3;

export function JourneyPath({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const done = START + DRAW;

  return (
    <div className={cn("w-full", className)}>
      <p className="sr-only">
        A rising route through five stages: existing channel, opportunity detected, new marketplace,
        launch, and growth — the final stage climbing away from the previous trajectory.
      </p>
      <svg viewBox="0 0 520 400" className="h-auto w-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="jp-route" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand-2)" />
            <stop offset="60%" stopColor="var(--color-brand)" />
            <stop offset="100%" stopColor="var(--color-brand-3)" />
          </linearGradient>
        </defs>

        <g stroke="var(--color-border)" strokeWidth={1} strokeDasharray="3 6">
          {[90, 160, 230, 300].map((y) => (
            <line key={y} x1={26} x2={500} y1={y} y2={y} />
          ))}
        </g>

        {/* Trajectory it diverges from */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.reveal, delay: done - 0.1, ease: EASE.out }}
        >
          <path d={BASELINE} fill="none" stroke="var(--color-border-strong)" strokeWidth={1.4} strokeDasharray="5 5" />
          <text
            x={456}
            y={140}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fill="var(--color-faint)"
            letterSpacing="0.08em"
          >
            baseline
          </text>
        </motion.g>

        {/* Route */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#jp-route)"
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DRAW, delay: START, ease: EASE.standard }}
        />
        {!reduce && (
          <motion.path
            d={PATH}
            fill="none"
            stroke="var(--color-brand-3)"
            strokeWidth={4.4}
            strokeLinecap="round"
            /* pathLength attribute + literal dasharray, NOT framer's
               `pathLength`/`pathSpacing` shorthands: via `style` those are emitted
               verbatim as `path-length:0.05px`, which is not a real CSS property,
               so the dash never forms and the packet sits frozen and invisible.
               The shorthands only get translated through `initial`/`animate`.
               `pathLength={1}` normalises the path, so one traverse is exactly -1. */
            pathLength={1}
            strokeDasharray="0.05 0.95"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -1, opacity: 1 }}
            transition={{
              strokeDashoffset: { duration: 3.2, delay: done, repeat: Infinity, ease: "linear" },
              opacity: { duration: DUR.base, delay: done },
            }}
          />
        )}

        {/* Waypoints */}
        {STOPS.map((s, i) => (
          <motion.g
            key={s.label}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.base, delay: START + AT[i] * DRAW, ease: EASE.out }}
          >
            {s.kind === "existing" ? (
              <>
                <rect x={s.x - 9} y={s.y - 9} width={18} height={18} rx={5} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" strokeWidth={1.4} />
                <rect x={s.x - 3.4} y={s.y - 3.4} width={6.8} height={6.8} rx={1.6} fill="var(--color-muted)" />
              </>
            ) : s.kind === "growth" ? (
              <>
                <circle cx={s.x} cy={s.y} r={19} fill="none" stroke="var(--color-brand)" strokeWidth={1} opacity={0.28} />
                <circle cx={s.x} cy={s.y} r={13} fill="var(--color-surface-2)" stroke="var(--color-brand)" strokeWidth={1.6} />
                <circle cx={s.x} cy={s.y} r={5} fill="var(--color-brand)" />
              </>
            ) : (
              <>
                <circle cx={s.x} cy={s.y} r={10} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" strokeWidth={1.4} />
                <circle cx={s.x} cy={s.y} r={3.6} fill="var(--color-brand-2)" />
              </>
            )}
            <text
              x={s.lx}
              y={s.ly}
              fontSize={13.5}
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
              fill={s.kind === "growth" ? "var(--color-brand-3)" : "var(--color-muted)"}
            >
              {s.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
