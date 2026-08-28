"use client";

/**
 * AIProcessing — the full loop: ecommerce signals flow in from the left, pass
 * through a sparse three-layer model lattice, resolve as labelled predictions on
 * the right, and feed an automation step that produces an outcome. Deliberately
 * NOT a neural-net cliché: ten nodes, thin strokes, one highlighted path.
 *
 * Non-obvious decision: nothing here is state-driven. The predictions "resolve
 * in sequence" purely through one keyframe set replayed with a per-card delay,
 * so the composition needs no timers, survives being mounted off-screen, and
 * collapses to its resolved end state under reduced motion with no extra branch
 * in the render tree. The viewBox is kept near 660 wide to match the other
 * visuals in this hero family — any wider and the mono labels stop being
 * readable once the SVG is scaled down to a 360px column.
 */

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/** The one cool note allowed in this pillar — intelligence, not neon. */
const VIOLET = "#7c5cff";

const SIGNALS = ["orders", "price", "stock", "creative", "sessions"];
const A_Y = [86, 146, 206, 266, 326];
const B_Y = [116, 206, 296];
const C_Y = [146, 266];
const AB: [number, number][] = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2]];
const BC: [number, number][] = [[0, 0], [1, 0], [1, 1], [2, 1]];

const CARDS = ["demand forecast", "spend reallocation", "churn risk"];
const CARD_Y = [84, 142, 200];
const CX = 456;
const CW = 190;
const ACTIVE = "M 258,206 L 330,206 L 402,146 L 444,146 L 444,106 L 456,106";

const TRACK_X = 86;
const TRACK_LEN = 160;

/** One keyframe set replayed with a per-item delay — no state, no timers. */
function resolve(reduce: boolean | null, from: number, delay: number): MotionProps {
  if (reduce) return { initial: false, animate: { opacity: 1 } };
  return {
    initial: { opacity: from },
    animate: { opacity: [from, 1, 1, from] },
    transition: { duration: 6, times: [0, 0.16, 0.76, 1], ease: EASE.out, repeat: Infinity, delay },
  };
}

export function AIProcessing({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 664 400" className={cn("h-auto w-full", className)} role="img"
      aria-labelledby="ai-processing-title">
      <title id="ai-processing-title">
        Machine learning pipeline: order, price, stock, creative and session
        signals feed a three-layer model, which resolves demand forecast, spend
        reallocation and churn risk predictions. Those drive an automation step
        and a measured outcome.
      </title>

      {/* stage captions */}
      <motion.g
        aria-hidden="true" className="font-mono" fontSize={10} letterSpacing="0.18em"
        fill="var(--color-faint)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.reveal, ease: EASE.out }}
      >
        <text x={20} y={30}>DATA</text>
        <text x={234} y={30}>MODEL</text>
        <text x={CX} y={30}>PREDICTION</text>
      </motion.g>

      {/* left: signal tracks */}
      <g aria-hidden="true">
        {SIGNALS.map((s, i) => (
          <g key={s}>
            <rect x={20} y={A_Y[i] - 4} width={3} height={8} rx={1} fill="var(--color-brand-2)" />
            <text x={30} y={A_Y[i] + 3.5} className="font-mono" fontSize={10} letterSpacing="0.08em"
              fill="var(--color-muted)">
              {s.toUpperCase()}
            </text>
            <line x1={TRACK_X} y1={A_Y[i]} x2={TRACK_X + TRACK_LEN} y2={A_Y[i]}
              stroke="var(--color-border)" strokeWidth={1} />
          </g>
        ))}
      </g>

      {/* data marks flowing inward */}
      <g aria-hidden="true" fill="var(--color-brand-2)">
        {A_Y.flatMap((y, i) =>
          [0, 1].map((k) =>
            reduce ? (
              <rect key={`${i}-${k}`} x={TRACK_X + 44 + k * 66} y={y - 1} width={12} height={2} rx={1} opacity={0.7} />
            ) : (
              <motion.rect
                key={`${i}-${k}`} x={TRACK_X} y={y - 1} width={12} height={2} rx={1}
                animate={{ x: [0, TRACK_LEN], opacity: [0, 0.9, 0.9, 0] }}
                transition={{ duration: 2.8, ease: EASE.inOut, repeat: Infinity, delay: i * 0.34 + k * 1.4 }}
              />
            ),
          ),
        )}
      </g>

      {/* model boundary + lattice */}
      <g aria-hidden="true">
        <rect x={234} y={56} width={196} height={312} rx={12} fill="none"
          stroke="var(--color-border-strong)" strokeWidth={1} strokeDasharray="4 6" />
        <g stroke={VIOLET} strokeWidth={1} opacity={0.3}>
          {AB.map(([a, b]) => <line key={`ab${a}${b}`} x1={258} y1={A_Y[a]} x2={330} y2={B_Y[b]} />)}
          {BC.map(([b, c]) => <line key={`bc${b}${c}`} x1={330} y1={B_Y[b]} x2={402} y2={C_Y[c]} />)}
        </g>
        {([[258, A_Y], [330, B_Y], [402, C_Y]] as [number, number[]][]).map(([x, ys], li) =>
          ys.map((y, i) => {
            const p = { cx: x, cy: y, r: 3.5, fill: "var(--color-bg)", strokeWidth: 1.25,
              stroke: li === 0 ? "var(--color-border-strong)" : VIOLET };
            return reduce ? <circle key={`${x}-${y}`} {...p} /> : (
              <motion.circle key={`${x}-${y}`} {...p} animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3.4, ease: EASE.inOut, repeat: Infinity, delay: staggerDelay(i, 5) * 3 }} />
            );
          }),
        )}
      </g>

      {/* the single active path — the only place brand orange is a stroke */}
      <g aria-hidden="true" fill="none" strokeLinecap="round">
        <path d={ACTIVE} stroke="var(--color-border-strong)" strokeWidth={1} strokeDasharray="1 5" />
        {reduce ? (
          <path d={ACTIVE} stroke="var(--color-brand)" strokeWidth={1.75} opacity={0.9} />
        ) : (
          <motion.path
            d={ACTIVE} stroke="var(--color-brand)" strokeWidth={1.75}
            initial={{ pathLength: 0.22, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: 2.6, ease: EASE.inOut, repeat: Infinity, repeatDelay: 0.8 }}
          />
        )}
      </g>

      {/* right: bus, predictions, automation, outcome */}
      <g aria-hidden="true" stroke="var(--color-border-strong)" strokeWidth={1} fill="none">
        <line x1={402} y1={146} x2={444} y2={146} />
        <line x1={402} y1={266} x2={444} y2={266} />
        <line x1={444} y1={106} x2={444} y2={267} />
        {[106, 164, 222, 267].map((y) => <line key={y} x1={444} y1={y} x2={CX} y2={y} />)}
        <line x1={CX + CW / 2} y1={284} x2={CX + CW / 2} y2={310} />
      </g>

      {CARDS.map((label, i) => (
        <motion.g key={label} aria-hidden="true" {...resolve(reduce, 0.28, i * 0.7)}>
          <rect x={CX} y={CARD_Y[i]} width={CW} height={44} rx={8} fill="var(--color-surface-1)" stroke="var(--color-border-strong)" strokeWidth={1} />
          <rect x={CX} y={CARD_Y[i] + 10} width={2} height={24} rx={1} fill={VIOLET} />
          <text x={CX + 16} y={CARD_Y[i] + 27.5} className="font-mono" fontSize={11} fill="var(--color-fg)">{label}</text>
        </motion.g>
      ))}

      {/* automation: inset and dashed, so it does not read as a fourth prediction */}
      <g aria-hidden="true">
        <rect x={CX + 14} y={250} width={CW - 28} height={34} rx={8} fill="none" stroke="var(--color-border)" strokeWidth={1} strokeDasharray="3 4" />
        <text x={CX + 30} y={271.5} className="font-mono" fontSize={10} letterSpacing="0.16em" fill="var(--color-muted)">AUTOMATION</text>
      </g>

      <motion.g aria-hidden="true" {...resolve(reduce, 0.4, 2.4)}>
        <rect x={CX} y={310} width={CW} height={52} rx={10} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" strokeWidth={1} />
        <text x={CX + 16} y={328} className="font-mono" fontSize={10} letterSpacing="0.16em" fill="var(--color-faint)">OUTCOME</text>
        <path d="M 472,353 L 492,346 L 508,350 L 530,337" fill="none" stroke="var(--color-profit)" strokeWidth={1.5} strokeLinecap="round" />
        <polygon points="530,337 521,336 528,345" fill="var(--color-profit)" />
        <text x={558} y={351} className="font-mono" fontSize={10} letterSpacing="0.12em" fill="var(--color-muted)">APPLIED</text>
      </motion.g>
    </svg>
  );
}
