"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { DUR, EASE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * Retention hero: first purchase → email → SMS → WhatsApp → repeat purchase →
 * loyal, arranged as a ring rather than a line, because the claim being made is
 * that retention compounds — a left-to-right chart would contradict it.
 *
 * Non-obvious decision: the orbiting highlight is a *full-circumference* circle
 * with a stroke-dasharray that leaves one short visible segment, spun with
 * `rotate`. Framer Motion derives an SVG element's transform origin from its
 * bounding box, so an actual arc segment would spin about its own centre and
 * wobble off the ring; a whole dashed circle has the ring's own bbox and
 * therefore the correct origin, with no manual transform-origin needed.
 */

const CX = 230;
const CY = 190;
const R = 110;
const CIRC = 2 * Math.PI * R;

type Node = {
  a: number;
  label: string;
  anchor: "start" | "middle" | "end";
  accent: string;
  glyph: string[];
};

const NODES: Node[] = [
  { a: -90, label: "first purchase", anchor: "middle", accent: "var(--color-brand)", glyph: ["M-7-4h14l-1.4 12h-11.2z", "M-3.6-4a3.6 3.6 0 0 1 7.2 0"] },
  { a: -30, label: "email", anchor: "start", accent: "var(--color-brand-2)", glyph: ["M-8-5.5h16v11h-16z", "M-8-5.5 0 1.5 8-5.5"] },
  { a: 30, label: "sms", anchor: "start", accent: "var(--color-brand-2)", glyph: ["M-5.5-8h11v16h-11z", "M-2 5.4h4"] },
  {
    a: 90,
    label: "whatsapp",
    anchor: "middle",
    accent: "var(--color-brand-2)",
    glyph: ["M-7-7h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4.6 3.6V4h-1.4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M-4-2l1.9 1.9 3.3-3.3", "M0.6-2l1.9 1.9 3.3-3.3"],
  },
  {
    a: 150,
    label: "repeat purchase",
    anchor: "end",
    accent: "var(--color-profit)",
    glyph: ["M-7 2A7 7 0 0 1 5-4.9", "M5-4.9 1.4-5.6M5-4.9 5.6-8.6", "M7-2A7 7 0 0 1-5 4.9", "M-5 4.9-1.4 5.6M-5 4.9-5.6 8.6"],
  },
  {
    a: 210,
    label: "loyal",
    anchor: "end",
    accent: "var(--color-brand-3)",
    glyph: ["M0-8.4 2.12-2.91 7.99-2.6 3.42 1.11 4.94 6.79 0 3.6-4.94 6.79-3.42 1.11-7.99-2.6-2.12-2.91Z"],
  },
];

/**
 * Ring coordinates, rounded to 2dp. The rounding is load-bearing, not cosmetic:
 * `Math.cos`/`Math.sin` are allowed to differ in their last bit between Node and
 * the browser's JS engine, which surfaced as a React hydration mismatch on the
 * tick-mark paths. Rounding makes the emitted `d` attribute deterministic.
 */
function pt(a: number, r: number): [number, number] {
  const rad = (a * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 100) / 100;
  return [round(CX + r * Math.cos(rad)), round(CY + r * Math.sin(rad))];
}

export function CustomerLifecycle({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const step = (i: number) => 0.45 + i * 0.42;
  const done = 0.45 + NODES.length * 0.42;

  const node = (i: number): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0.26, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: DUR.slow, ease: EASE.out, delay: step(i) },
        };

  const label = (i: number): MotionProps =>
    reduce ? {} : { initial: { opacity: 0.22 }, animate: { opacity: 1 }, transition: { duration: DUR.base, delay: step(i) + 0.08 } };

  return (
    <div className={cn("mx-auto w-full max-w-[720px]", className)}>
      <p className="sr-only">
        A repeating retention loop: first purchase, then email, SMS and WhatsApp
        follow-up, leading to a repeat purchase and a loyal customer.
      </p>
      <svg aria-hidden viewBox="0 0 460 380" className="h-auto w-full">
        <defs>
          <linearGradient id="cl-ember" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="52%" stopColor="var(--color-brand-2)" />
            <stop offset="100%" stopColor="var(--color-brand-3)" />
          </linearGradient>
        </defs>

        {/* Base ring + radial ticks: the static skeleton, always present */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5} />
        {[-60, 0, 60, 120, 180, 240].map((a) => {
          const [x1, y1] = pt(a, R - 12);
          const [x2, y2] = pt(a, R - 5);
          return <path key={a} d={`M${x1} ${y1}L${x2} ${y2}`} stroke="var(--color-border)" strokeWidth={1.5} />;
        })}

        {/* Progressive draw, clockwise from the top */}
        <g transform={`rotate(-90 ${CX} ${CY})`}>
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="url(#cl-ember)"
            strokeWidth={2.5}
            {...(reduce
              ? { style: { opacity: 0.9 } }
              : {
                  initial: { pathLength: 0, opacity: 0 },
                  animate: { pathLength: 1, opacity: 1 },
                  transition: { pathLength: { duration: done - 0.2, ease: EASE.inOut }, opacity: { duration: DUR.fast } },
                })}
          />
        </g>

        {/* Loop closed: the ring thickens (opacity crossfade onto a heavier stroke) */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth={5}
          {...(reduce
            ? { style: { opacity: 0.34 } }
            : { initial: { opacity: 0 }, animate: { opacity: 0.34 }, transition: { duration: DUR.reveal, ease: EASE.out, delay: done } })}
        />
        {!reduce && (
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="var(--color-brand-3)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={`46 ${CIRC - 46}`}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 0.85, rotate: 270 }}
            transition={{ opacity: { duration: DUR.slow, delay: done }, rotate: { duration: 9, ease: "linear", repeat: Infinity, delay: done } }}
          />
        )}

        {/* Hub */}
        <motion.g
          {...(reduce
            ? {}
            : { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 }, transition: { duration: DUR.reveal, ease: EASE.out, delay: 0.12 } })}
        >
          <circle cx={CX} cy={CY} r={54} fill="var(--color-surface-1)" stroke="var(--color-border)" />
          <circle cx={CX} cy={CY} r={68} fill="none" stroke="var(--color-border)" strokeWidth={1} strokeDasharray="2 7" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize={11} letterSpacing="0.16em" fill="var(--color-fg)" className="font-mono">
            RETENTION
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize={9.5} fill="var(--color-faint)" className="font-mono">
            compounds
          </text>
        </motion.g>

        {NODES.map((n, i) => {
          const [x, y] = pt(n.a, R);
          const [lx, ly] = pt(n.a, R + 44);
          return (
            <g key={n.label}>
              <motion.g {...node(i)}>
                <circle cx={x} cy={y} r={26} fill="var(--color-bg)" />
                <circle cx={x} cy={y} r={23} fill="var(--color-surface-2)" stroke={n.accent} strokeWidth={1.5} />
                <g transform={`translate(${x} ${y})`} fill="none" stroke={n.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  {n.glyph.map((d) => <path key={d} d={d} />)}
                </g>
              </motion.g>
              <motion.text x={lx} y={ly + 4} textAnchor={n.anchor} fontSize={10} letterSpacing="0.06em" fill="var(--color-fg)" className="font-mono" {...label(i)}>
                {n.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
