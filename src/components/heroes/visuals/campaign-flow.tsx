"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * Meta Ads hero. Reads left to right: three creative variants feed an audience
 * layer, the winning variant becomes the live ad unit, and a click on it carries
 * through to a conversion — the creative-testing loop, not a generic funnel.
 *
 * Non-obvious decision: "winning" is expressed as group *opacity* (the two
 * losers settle at 0.34) rather than a fill or stroke swap. Opacity is one of
 * the four properties this project permits animating, and a test resolving
 * genuinely looks like two options going quiet — a colour change on the winner
 * alone would read as a hover state instead of a result.
 */

const WINNER = 1;
const TILE_Y = [62, 122, 182];
const FEED = [
  "M72 84C94 84 94 104 116 104",
  "M72 144H116",
  "M72 204C94 204 94 184 116 184",
];
const DOT_X = [131, 151, 171];
const DOT_Y = [80, 104, 128, 152, 176, 200];

function Cap({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={9.5} letterSpacing="0.14em" fill="var(--color-faint)" className="font-mono">
      {text}
    </text>
  );
}

export function CampaignFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const fade = (delay: number, dy = 10): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: dy },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DUR.slow, ease: EASE.out, delay },
        };

  const draw = (delay: number, duration = 0.5): MotionProps =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration, ease: EASE.out, delay },
            opacity: { duration: DUR.instant, delay },
          },
        };

  const tile = (i: number): MotionProps => {
    const win = i === WINNER;
    if (reduce) return { style: { opacity: win ? 1 : 0.34 } };
    return {
      initial: { opacity: 0, scale: 0.94 },
      animate: win
        ? { opacity: [0, 1, 1], scale: [0.94, 1, 1.05] }
        : { opacity: [0, 0.95, 0.34], scale: [0.94, 1, 0.97] },
      transition: {
        duration: 1.7,
        delay: 0.15 + staggerDelay(i, 3),
        times: [0, 0.22, 1],
        ease: EASE.standard,
      },
    };
  };

  return (
    <div className={cn("mx-auto w-full max-w-[720px]", className)}>
      <p className="sr-only">
        Three creative variants feed an audience layer. The winning creative
        becomes the live ad unit, and a click on it resolves into a conversion.
      </p>
      <svg aria-hidden viewBox="0 0 460 248" className="h-auto w-full">
        <defs>
          <linearGradient id="cf-ember" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="52%" stopColor="var(--color-brand-2)" />
            <stop offset="100%" stopColor="var(--color-brand-3)" />
          </linearGradient>
        </defs>

        <Cap x={40} y={44} text="CREATIVE" />
        <Cap x={151} y={44} text="AUDIENCE" />
        <Cap x={273} y={44} text="AD" />
        <Cap x={350} y={44} text="CLICK" />
        <Cap x={412} y={44} text="CONVERSION" />

        {TILE_Y.map((y, i) => (
          <motion.g key={y} {...tile(i)}>
            <rect x={8} y={y} width={64} height={44} rx={10} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" />
            <rect x={14} y={y + 6} width={52} height={18} rx={4} fill={i === WINNER ? "url(#cf-ember)" : "var(--color-surface-3)"} />
            <rect x={14} y={y + 30} width={34} height={3.5} rx={1.75} fill="var(--color-muted)" opacity={0.7} />
            <rect x={14} y={y + 37} width={22} height={3.5} rx={1.75} fill="var(--color-muted)" opacity={0.4} />
          </motion.g>
        ))}
        <motion.rect
          x={4}
          y={TILE_Y[WINNER] - 4}
          width={72}
          height={52}
          rx={13}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth={1.25}
          {...(reduce /* winner ring stays visible with no motion */
            ? { style: { opacity: 0.8 } }
            : {
                initial: { opacity: 0, scale: 0.92 },
                animate: { opacity: 0.8, scale: 1 },
                transition: { duration: DUR.slow, ease: EASE.out, delay: 0.66 },
              })}
        />

        {FEED.map((d, i) => (
          <motion.path key={d} d={d} fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5} {...draw(0.55 + i * 0.08)} />
        ))}

        <motion.g {...fade(0.9)}>
          <rect x={116} y={62} width={70} height={164} rx={12} fill="var(--color-surface-1)" stroke="var(--color-border)" />
          {DOT_Y.map((cy, r) =>
            DOT_X.map((cx, c) => {
              const hot = (r + c) % 4 === 1;
              return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.4} fill={hot ? "var(--color-brand-2)" : "var(--color-border-strong)"} opacity={hot ? 0.95 : 0.7} />;
            }),
          )}
        </motion.g>

        <motion.path d="M186 144H224" fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5} {...draw(1.35, 0.35)} />

        <motion.g {...fade(1.5)}>
          <rect x={224} y={84} width={98} height={120} rx={12} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" />
          <rect x={234} y={94} width={78} height={44} rx={8} fill="url(#cf-ember)" />
          <rect x={234} y={148} width={58} height={4.5} rx={2.25} fill="var(--color-fg)" opacity={0.8} />
          <rect x={234} y={158} width={42} height={4.5} rx={2.25} fill="var(--color-muted)" opacity={0.55} />
          <rect x={234} y={174} width={52} height={16} rx={8} fill="var(--color-brand)" />
        </motion.g>

        <motion.path d="M322 144H378" fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5} {...draw(1.95, 0.35)} />
        <motion.path d="M344 132v14l3.4-3.6 2.8 6 3.2-1.6-2.9-5.9 4.6-1z" fill="var(--color-fg)" stroke="var(--color-bg)" strokeWidth={0.8} {...fade(2.15, 0)} />

        <g>
          <motion.circle
            cx={412}
            cy={144}
            r={34}
            fill="none"
            stroke="var(--color-profit)"
            strokeWidth={1}
            {...(reduce
              ? { style: { opacity: 0.4 } }
              : {
                  initial: { opacity: 0.2 },
                  animate: { opacity: 0.6 },
                  transition: { duration: 2.4, delay: 2.7, ease: EASE.inOut, repeat: Infinity, repeatType: "reverse" },
                })}
          />
          <circle cx={412} cy={144} r={26} fill="var(--color-surface-1)" stroke="var(--color-border)" />
          <g transform="rotate(-90 412 144)">
            <motion.circle cx={412} cy={144} r={26} fill="none" stroke="var(--color-profit)" strokeWidth={2.5} {...draw(2.3, 0.7)} />
          </g>
          <motion.path d="M402 145l6.5 7 13.5-15" fill="none" stroke="var(--color-profit)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...draw(2.75, 0.35)} />
        </g>
      </svg>
    </div>
  );
}
