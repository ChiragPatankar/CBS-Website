"use client";

/**
 * WorldRoutes — one market becoming many. India lights first, then trade arcs
 * draw outward to the US, UK, UAE and Singapore, each destination igniting as
 * its arc lands. Deliberately flat and cartographic (graticule + dot-grid
 * landmass suggestion) so it does not compete with the volumetric globe used
 * elsewhere on the site.
 *
 * Non-obvious: the travelling dots are not separate circles following a path.
 * Each is the same arc re-stroked with a 4%-long dash whose offset loops — i.e.
 * pure stroke-dashoffset, which keeps the whole visual on the compositor and
 * costs no extra geometry.
 *
 * The dash uses the `pathLength={1}` attribute plus a literal `strokeDasharray`,
 * and `strokeDashoffset` is what animates. Framer's `pathLength`/`pathSpacing`
 * shorthands do NOT work through `style`: they are emitted verbatim as
 * `path-length:0.04px`, which is not a real CSS property, so the dash never forms
 * and the packets sit frozen and invisible. They are only translated when passed
 * via `initial`/`animate` — which is why the arcs below, which do exactly that,
 * animated correctly while these packets silently did nothing.
 */

import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/** Loose ellipse regions [cx, cy, rx, ry] — a suggestion of landmass, not a map. */
const BLOBS: [number, number, number, number][] = [
  [118, 120, 46, 40], [158, 226, 30, 48], [290, 110, 38, 28], [306, 198, 38, 54],
  [412, 120, 72, 44], [396, 182, 24, 28], [466, 222, 26, 20], [512, 262, 30, 19],
];

const ORIGIN = { x: 400, y: 186 };

type Node = { id: string; x: number; y: number; anchor: "start" | "middle" | "end"; dx: number; dy: number };

const NODES: Node[] = [
  { id: "US", x: 120, y: 122, anchor: "middle", dx: 0, dy: -16 },
  { id: "UK", x: 280, y: 92, anchor: "middle", dx: 0, dy: -16 },
  { id: "UAE", x: 348, y: 162, anchor: "end", dx: -12, dy: 4 },
  { id: "Singapore", x: 464, y: 222, anchor: "start", dx: 12, dy: 5 },
];

/** Signed bow: positive curves one way along the arc normal, negative the other. */
const ROUTES: { to: Node; bow: number }[] = [
  { to: NODES[0], bow: 0.13 },
  { to: NODES[1], bow: 0.22 },
  { to: NODES[2], bow: 0.45 },
  { to: NODES[3], bow: -0.25 },
];

function arcPath(to: Node, bow: number) {
  const dx = to.x - ORIGIN.x;
  const dy = to.y - ORIGIN.y;
  const cx = (ORIGIN.x + to.x) / 2 - dy * bow;
  const cy = (ORIGIN.y + to.y) / 2 + dx * bow;
  return `M ${ORIGIN.x} ${ORIGIN.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x} ${to.y}`;
}

/** Dots on a 14u lattice, kept only inside a blob. `hot` marks the origin cluster. */
const DOTS: { x: number; y: number; hot: boolean }[] = (() => {
  const out: { x: number; y: number; hot: boolean }[] = [];
  for (let x = 26; x <= 574; x += 14) {
    for (let y = 46; y <= 294; y += 14) {
      const inside = BLOBS.some(
        ([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1,
      );
      if (inside) out.push({ x, y, hot: Math.hypot(x - ORIGIN.x, y - ORIGIN.y) < 46 });
    }
  }
  return out;
})();

const LAT = [70, 110, 150, 190, 230, 270];
const LON = [80, 160, 240, 320, 400, 480, 560];

/**
 * Continuous loop timing, in seconds within one cycle.
 *
 * The stagger is baked into each keyframe's `times` array rather than expressed
 * as a `delay`, because framer applies `delay` only before the FIRST iteration —
 * with `repeat: Infinity` every arc would drift into sync on the second pass and
 * the sequence would collapse into a single simultaneous flash.
 */
const CYCLE = 9;
const ARC_START = 0.55;
const ARC_STEP = 0.32;
const ARC_DRAW = 0.7;
/** Fully-drawn dwell — the state a reader actually looks at. */
const HOLD_UNTIL = 6.2;
const ERASED_BY = 7.4;

/** Normalised keyframe stops for one arc, and for the node it lands on. */
function cycleStops(i: number) {
  const start = (ARC_START + i * ARC_STEP) / CYCLE;
  const drawn = (ARC_START + i * ARC_STEP + ARC_DRAW) / CYCLE;
  // The exit is staggered too, so routes retract in the order they arrived
  // instead of all snapping off together — which read as a hard reset.
  const exitStagger = i * 0.14;
  return {
    start,
    drawn,
    hold: (HOLD_UNTIL + exitStagger) / CYCLE,
    erased: (ERASED_BY + exitStagger) / CYCLE,
  };
}

const LOOP = { duration: CYCLE, repeat: Infinity, ease: "linear" as const };

export function WorldRoutes({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={cn("w-full", className)}>
      <p className="sr-only">
        A stylised world plate. Routes radiate from India to the United States, the United Kingdom,
        the United Arab Emirates and Singapore — one home market expanding into many.
      </p>
      <svg viewBox="0 0 600 340" className="h-auto w-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="wr-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="100%" stopColor="var(--color-brand-3)" />
          </linearGradient>
        </defs>

        {/* Plate + graticule */}
        <rect x={14} y={26} width={572} height={288} rx={18} fill="var(--color-surface-1)" stroke="var(--color-border)" />
        <g stroke="var(--color-border-strong)" strokeWidth={0.8} fill="none" opacity={0.5}>
          {LAT.map((y) => (
            <path key={`la${y}`} d={`M 26 ${y} C 180 ${y - 7}, 420 ${y + 7}, 574 ${y}`} />
          ))}
          {LON.map((x) => (
            <path key={`lo${x}`} d={`M ${x} 40 C ${x - 13} 120, ${x + 13} 220, ${x} 300`} />
          ))}
        </g>

        {/* Dot-grid landmass */}
        <g>
          {DOTS.map((d) => (
            <circle
              key={`${d.x}-${d.y}`}
              cx={d.x}
              cy={d.y}
              r={d.hot ? 1.9 : 1.6}
              fill={d.hot ? "var(--color-brand-2)" : "var(--color-border-strong)"}
              opacity={d.hot ? 0.85 : 0.75}
            />
          ))}
        </g>

        {/* Arcs — draw outward in sequence, dwell, then retract forward and repeat. */}
        {ROUTES.map((r, i) => {
          const d = arcPath(r.to, r.bow);
          const { start, drawn, hold, erased } = cycleStops(i);
          return (
            <g key={r.to.id}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#wr-route)"
                strokeWidth={1.1}
                strokeLinecap="round"
                {...(reduce
                  ? { style: { pathLength: 1, opacity: 0.9 } }
                  : {
                      initial: { pathLength: 0, pathOffset: 0, opacity: 0 },
                      animate: {
                        // pathLength shrinking while pathOffset grows retracts the
                        // segment from its START, so the route exits in the same
                        // direction it arrived rather than rewinding backwards.
                        pathLength: [0, 0, 1, 1, 0, 0],
                        pathOffset: [0, 0, 0, 0, 1, 1],
                        opacity: [0, 0.9, 0.9, 0.9, 0.9, 0],
                      },
                      transition: {
                        ...LOOP,
                        times: [0, start, drawn, hold, erased, 1],
                      },
                    })}
              />
              {!reduce && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--color-brand-3)"
                  strokeWidth={1.9}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0.04 0.96"
                  initial={{ strokeDashoffset: 0, opacity: 0 }}
                  animate={{
                    strokeDashoffset: -1,
                    // Packets only exist while their route does.
                    opacity: [0, 0, 1, 1, 0, 0],
                  }}
                  transition={{
                    // Runs on its own faster clock, independent of the cycle.
                    strokeDashoffset: { duration: 2.4, repeat: Infinity, ease: "linear" },
                    opacity: { ...LOOP, times: [0, drawn, Math.min(drawn + 0.03, 0.99), hold, erased, 1] },
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Origin — stays lit for the whole cycle. India is the home market, so
            blinking it off between passes would tell the wrong story; only the
            outer ring breathes, on its own independent clock. */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DUR.base, delay: 0.18, ease: EASE.out }}
          style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px` }}
        >
          <motion.circle
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r={11}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth={1}
            style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px` }}
            {...(reduce
              ? { opacity: 0.4 }
              : {
                  animate: { scale: [1, 1.35, 1], opacity: [0.45, 0.1, 0.45] },
                  transition: { duration: 2.8, repeat: Infinity, ease: EASE.inOut },
                })}
          />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={6} fill="none" stroke="var(--color-brand)" strokeWidth={1.4} />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={2.8} fill="var(--color-brand)" />
          <text
            x={ORIGIN.x}
            y={ORIGIN.y + 30}
            fontSize={10.5}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
            fill="var(--color-brand-3)"
          >
            India
          </text>
        </motion.g>

        {/* Destinations — each ignites exactly as its own arc lands, and dims with it. */}
        {NODES.map((n, i) => {
          const { drawn, hold, erased } = cycleStops(i);
          // A beat before "drawn" so the pop coincides with the arc arriving
          // rather than trailing it.
          const ignite = Math.max(drawn - 0.012, 0.001);
          return (
          <motion.g
            key={n.id}
            /* transformOrigin must be set explicitly: an SVG group scales about
               the viewBox origin otherwise, so the node would fly in from the
               top-left corner instead of growing in place. */
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.7 },
                  animate: {
                    opacity: [0, 0, 1, 1, 0, 0],
                    scale: [0.7, 0.7, 1, 1, 0.75, 0.7],
                  },
                  transition: { ...LOOP, times: [0, ignite, drawn, hold, erased, 1] },
                })}
          >
            <circle cx={n.x} cy={n.y} r={5} fill="none" stroke="var(--color-brand-2)" strokeWidth={1} />
            <circle cx={n.x} cy={n.y} r={2.2} fill="var(--color-brand-3)" />
            <text
              x={n.x + n.dx}
              y={n.y + n.dy}
              fontSize={10}
              textAnchor={n.anchor}
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
              fill="var(--color-muted)"
            >
              {n.id}
            </text>
          </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
