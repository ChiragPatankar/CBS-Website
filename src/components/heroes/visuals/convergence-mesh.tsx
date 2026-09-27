"use client";

/**
 * ConvergenceMesh — the hero's claim, drawn.
 *
 * The lede says "one team operating every channel your brand sells on" and the
 * board beside it is titled CHANNELS OPERATED. This draws that: separate channel
 * lines arriving from off-canvas and landing on a single point at the board.
 *
 * It is deliberately not a particle field. Every line terminates at the same
 * point, so the graphic means something — remove the board and the lines would
 * have nowhere to go.
 *
 * ── Why the mask exists ──────────────────────────────────────────────────────
 * Measured on the real layout at 1440px, the clean corridor between the widest
 * inked text (the lede, ending at x≈352 in these units) and the board's visual
 * left edge (x≈449, already displaced right by its rotateY(-11deg)) is only 97
 * units — about 141 CSS px. A full-strength fan across this column therefore
 * cannot avoid crossing the headline; the first attempt put bright ember strokes
 * straight through "everywhere." and through the lede.
 *
 * So brightness is a function of x. Behind the type the mask holds the linework
 * at ~10% — present as texture, never as a slash across a glyph — then ramps to
 * full only after x=350, inside the corridor. The graphic reads as a funnel
 * tightening into the board, which is the part worth seeing anyway.
 *
 * Non-obvious: the travelling marks are the same path re-stroked with a very
 * short dash whose offset loops, not circles animated along a path. The whole
 * graphic stays stroke-dashoffset on the compositor — no extra geometry, no
 * per-frame layout. The marks are inside the mask too, otherwise they would be
 * the one thing still crossing the headline at full opacity.
 *
 * The dash is declared with the `pathLength={1}` attribute plus a literal
 * `strokeDasharray`, and `strokeDashoffset` is what animates. Framer's
 * `pathLength`/`pathSpacing`/`pathOffset` shorthands are NOT usable here: passed
 * through `style` they are emitted verbatim as `path-length:0.03px`, which is not
 * a real CSS property, so the dash never materialises and the marks sit frozen
 * and invisible. Those shorthands only get translated when they arrive via
 * `initial`/`animate`. `pathLength={1}` normalises the path to one user unit, so
 * the dasharray reads as fractions and one full traverse is exactly -1.
 */

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * Where every line lands. x=435 sits ~21px left of the board's projected edge —
 * far enough that the convergence ring stays visible rather than being swallowed
 * by the board, which is stacked above this layer.
 */
const SINK = { x: 435, y: 200 };

/**
 * Origins fan across the left. Fixed values, never Math.random(): random
 * geometry differs between the server and client render and trips hydration.
 * `curve` biases the control point so no two lines share a path shape, and the
 * spread of `dur` keeps the marks from ever pulsing in unison — which is what
 * makes the field read as many independent channels instead of one animation.
 *
 * `delay` is a small positive entry stagger, never negative: framer does not seek
 * into a timeline the way a negative CSS animation-delay does, and a negative
 * value here just kills the animation outright. It does not need to be large,
 * because at offset 0 every mark sits at its own origin out in the masked-down
 * region where it is invisible anyway — the seven different durations are what
 * pull them permanently out of phase.
 */
const LINES: { x: number; y: number; curve: number; dur: number; delay: number }[] = [
  { x: -30, y: 26, curve: -40, dur: 6.4, delay: 0 },
  { x: 18, y: 96, curve: -22, dur: 7.8, delay: 0.34 },
  { x: -22, y: 168, curve: 10, dur: 5.9, delay: 0.68 },
  { x: 44, y: 240, curve: 28, dur: 8.6, delay: 1.02 },
  { x: 4, y: 310, curve: 48, dur: 7.1, delay: 1.36 },
  { x: 140, y: 8, curve: -56, dur: 6.8, delay: 1.7 },
  { x: 190, y: 372, curve: 40, dur: 9.2, delay: 2.04 },
];

function path(l: (typeof LINES)[number]) {
  const mx = (l.x + SINK.x) / 2;
  const my = (l.y + SINK.y) / 2 + l.curve;
  return `M ${l.x} ${l.y} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${SINK.x} ${SINK.y}`;
}

export function ConvergenceMesh({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden>
      <svg viewBox="0 0 500 400" className="h-full w-full" focusable="false">
        <defs>
          {/* userSpaceOnUse, not the default objectBoundingBox: the ramp has to
              sit at fixed viewBox coordinates matching the text edge. Per-object
              units would rescale it to each path's own bbox, so every line would
              brighten at a different x and the type-safe zone would evaporate. */}
          <linearGradient
            id="cm-ramp"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="500"
            y2="0"
          >
            <stop offset="0" stopColor="#1a1a1a" />
            {/* x=350 — the widest inked text ends here. */}
            <stop offset="0.70" stopColor="#242424" />
            {/* x=420 — clear of the type, short of the board. */}
            <stop offset="0.84" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
          <mask id="cm-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="400">
            <rect x="0" y="0" width="500" height="400" fill="url(#cm-ramp)" />
          </mask>
          <radialGradient id="sink-halo">
            <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.45} />
            <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
          </radialGradient>
        </defs>

        <g mask="url(#cm-mask)">
          {LINES.map((l, i) => {
            const d = path(l);
            return (
              <g key={i}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--color-brand-2)"
                  strokeWidth={0.8}
                  strokeOpacity={0.6}
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.4 + i * 0.11, ease: EASE.out }}
                />

                {!reduce && (
                    <motion.path
                    d={d}
                    fill="none"
                    stroke="var(--color-brand-3)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="0.03 0.97"
                    initial={{ strokeDashoffset: 0, opacity: 0 }}
                    animate={{ strokeDashoffset: -1, opacity: 0.9 }}
                    transition={{
                      strokeDashoffset: {
                        duration: l.dur,
                        delay: l.delay,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: { duration: 0.8, delay: 1.6 + i * 0.1 },
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* The convergence point. Everything above lands here. Inside the mask
              so it inherits the same ramp — at x=435 that is full brightness. */}
          <motion.g
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE.out }}
            style={{ transformOrigin: `${SINK.x}px ${SINK.y}px` }}
          >
            <motion.circle
              cx={SINK.x}
              cy={SINK.y}
              r={9}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth={0.9}
              style={{ transformOrigin: `${SINK.x}px ${SINK.y}px` }}
              {...(reduce
                ? { opacity: 0.35 }
                : {
                    animate: { scale: [1, 1.5, 1], opacity: [0.45, 0.05, 0.45] },
                    transition: { duration: 3.2, repeat: Infinity, ease: EASE.inOut },
                  })}
            />
            {/* Halo and a second, slower ring: the point where every line
                lands should read as a light source, not a dot. */}
            <circle cx={SINK.x} cy={SINK.y} r={22} fill="url(#sink-halo)" />
            <motion.circle
              cx={SINK.x}
              cy={SINK.y}
              r={14}
              fill="none"
              stroke="var(--color-brand-3)"
              strokeWidth={0.5}
              style={{ transformOrigin: `${SINK.x}px ${SINK.y}px` }}
              {...(reduce
                ? { opacity: 0.2 }
                : {
                    animate: { scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] },
                    transition: { duration: 4.4, repeat: Infinity, ease: EASE.inOut, delay: 1.1 },
                  })}
            />
            <circle cx={SINK.x} cy={SINK.y} r={2.4} fill="var(--color-brand)" />
            <circle cx={SINK.x} cy={SINK.y} r={1} fill="#ffe6d6" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
