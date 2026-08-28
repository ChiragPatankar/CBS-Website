"use client";

/**
 * DeviceShowcase — an abstract phone cycling through five product screens
 * (home, product, cart, analytics, profile). Thin bezel, no notch, no
 * photorealism: the point is that a real shippable product exists, drawn as a
 * wireframe rather than a render.
 *
 * Non-obvious decision: the status bar and tab bar are drawn OUTSIDE the
 * cross-fading group, so the app shell stays put while only the content region
 * changes. Fading the whole device made every transition read as a page reload;
 * holding the chrome makes it read as navigation. Screens are declared as
 * numeric tuples rather than JSX so five layouts cost five lines each.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, SPRING } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/** x, y, w, h, r, tone (0 block · 1 bar · 2 accent) */
type Sh = [number, number, number, number, number, number];

const TONE = ["var(--color-surface-3)", "var(--color-border-strong)", "var(--color-brand)"];

const SCREENS: { name: string; shapes: Sh[] }[] = [
  {
    name: "home",
    shapes: [
      [12, 20, 64, 9, 4, 1], [12, 38, 156, 90, 10, 0], [12, 138, 74, 58, 8, 0],
      [94, 138, 74, 58, 8, 0], [12, 204, 74, 58, 8, 0], [94, 204, 74, 58, 8, 0],
      [12, 276, 156, 9, 4, 1], [12, 293, 112, 9, 4, 1],
    ],
  },
  {
    name: "product",
    shapes: [
      [12, 20, 156, 124, 10, 0], [12, 156, 104, 10, 4, 1], [12, 174, 64, 8, 4, 1],
      [12, 198, 56, 16, 6, 2], [12, 228, 156, 28, 8, 0], [12, 272, 156, 9, 4, 1],
      [12, 289, 120, 9, 4, 1],
    ],
  },
  {
    name: "cart",
    shapes: [
      ...([0, 1, 2].flatMap((k) => [
        [12, 20 + k * 56, 42, 42, 8, 0], [64, 26 + k * 56, 84, 9, 4, 1],
        [64, 43 + k * 56, 46, 8, 4, 1],
      ]) as Sh[]),
      [12, 196, 156, 1, 0, 1], [12, 208, 64, 10, 4, 1], [104, 208, 64, 10, 4, 1],
      [12, 236, 156, 28, 8, 2],
    ],
  },
  {
    name: "analytics",
    shapes: [
      [12, 20, 72, 9, 4, 1], [12, 38, 156, 112, 10, 0], [12, 160, 74, 48, 8, 0],
      [94, 160, 74, 48, 8, 0], [12, 218, 156, 64, 8, 0],
      ...([26, 40, 58, 34, 50].map((h, k) => [
        22 + k * 30, 282 - h, 16, h, 3, k === 4 ? 2 : 0,
      ]) as Sh[]),
    ],
  },
  {
    name: "profile",
    shapes: [
      [56, 96, 68, 10, 4, 1], [68, 114, 44, 8, 4, 1], [12, 146, 156, 36, 8, 0],
      [12, 190, 156, 36, 8, 0], [12, 234, 156, 36, 8, 0],
    ],
  },
];

const SX = 126;
const SY = 34;

export function DeviceShowcase({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let id: number | undefined;
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const start = () => {
      stop();
      id = window.setInterval(() => setI((p) => (p + 1) % SCREENS.length), 2900);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    if (!document.hidden) start();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  const screen = SCREENS[i];

  return (
    // Capped and centred: this is the one portrait composition in the family, and
    // the hero shells hand it up to ~1000px — unconstrained, `h-auto` would give
    // back a phone over 1000px tall.
    <div className={cn("mx-auto w-full max-w-[380px]", className)}>
      <svg viewBox="0 0 480 500" className="h-auto w-full" role="img" aria-labelledby="device-title">
        <title id="device-title">
          A mobile app moving through its home, product, cart, analytics and
          profile screens.
        </title>
        <defs>
          <clipPath id="device-screen">
            <rect x={SX} y={SY} width={180} height={404} rx={24} />
          </clipPath>
        </defs>

        {/* depth: a second frame set back, not a 3D render */}
        <rect
          x={150} y={46} width={196} height={420} rx={32}
          fill="var(--color-surface-1)" stroke="var(--color-border)" strokeWidth={1} opacity={0.55}
          aria-hidden="true"
        />
        <rect
          x={118} y={26} width={196} height={420} rx={32}
          fill="var(--color-bg)" stroke="var(--color-border-strong)" strokeWidth={1.5}
          aria-hidden="true"
        />
        <rect
          x={SX} y={SY} width={180} height={404} rx={24}
          fill="var(--color-surface-1)" stroke="var(--color-border)" strokeWidth={1}
          aria-hidden="true"
        />

        <g clipPath="url(#device-screen)" aria-hidden="true">
          <AnimatePresence initial={false} mode="wait">
            <motion.g
              key={screen.name}
              initial={reduce ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -14 }}
              transition={reduce ? { duration: 0 } : { ...SPRING, opacity: { duration: DUR.base } }}
            >
              {screen.shapes.map(([x, y, w, h, r, t], k) => (
                <rect
                  key={k} x={SX + x} y={SY + y} width={w} height={h} rx={r}
                  fill={TONE[t]} opacity={t === 2 ? 0.9 : 1}
                />
              ))}
              {screen.name === "profile" && (
                <circle cx={SX + 90} cy={SY + 56} r={26} fill="none"
                  stroke="var(--color-brand-2)" strokeWidth={1.5} />
              )}
              {screen.name === "analytics" && (
                <path
                  d="M 20 118 L 50 96 L 80 104 L 110 66 L 140 78" fill="none"
                  stroke="var(--color-brand)" strokeWidth={1.75} strokeLinecap="round"
                  transform={`translate(${SX + 12},${SY + 38})`}
                />
              )}
            </motion.g>
          </AnimatePresence>
        </g>

        {/* app shell: held still across transitions */}
        <g aria-hidden="true">
          <rect x={SX + 66} y={SY + 8} width={48} height={4} rx={2} fill="var(--color-border-strong)" />
          <line x1={SX} y1={SY + 356} x2={SX + 180} y2={SY + 356} stroke="var(--color-border)" strokeWidth={1} />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={SX + 26 + k * 36} y={SY + 372} width={16} height={3} rx={1.5}
              fill={k === i % 4 ? "var(--color-brand)" : "var(--color-border-strong)"} />
          ))}
        </g>
      </svg>

      <div className="mt-5 flex items-center justify-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase tabular">
          {screen.name}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          {SCREENS.map((s, k) => (
            <motion.span
              key={s.name}
              className="block h-1 w-1 rounded-full"
              style={{ backgroundColor: k === i ? "var(--color-brand)" : "var(--color-border-strong)" }}
              animate={reduce ? undefined : { scale: k === i ? 1.6 : 1 }}
              transition={{ duration: DUR.base, ease: EASE.out }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
