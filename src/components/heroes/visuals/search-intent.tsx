"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * Google Ads hero: a query types itself, resolves to an intent, and the
 * sponsored result carries that intent into a landing page and a conversion.
 *
 * Non-obvious decision: the typewriter is one `setInterval` driving a single
 * reducer-shaped state object (`{ qi, len, wait }`) rather than nested timeouts.
 * A lone tick with a `wait` countdown means there is exactly one timer to clear —
 * which matters because it is torn down and rebuilt on every `visibilitychange`,
 * so a backgrounded tab is not typing to nobody. The caret x-position is
 * computed from character count, which is only legitimate because the query is
 * set in the mono face at a known 0.6em advance.
 */

const QUERIES = ["best protein powder", "buy running shoes online", "organic face serum"];
const CH = 8.4; // 14px mono advance
const PILLS = [
  { x: 16, w: 82, label: "high intent" },
  { x: 104, w: 80, label: "comparison" },
  { x: 192, w: 88, label: "ready to buy" },
];
const ORGANIC = [
  { y: 204, w: 110, h: 5 },
  { y: 214, w: 176, h: 3.5 },
  { y: 232, w: 92, h: 5 },
  { y: 242, w: 150, h: 3.5 },
];

function Cap({ x, y, text, anchor = "start" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={9.5} letterSpacing="0.14em" fill="var(--color-faint)" className="font-mono">
      {text}
    </text>
  );
}

export function SearchIntent({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [s, setS] = useState({ qi: 0, len: reduce ? QUERIES[0].length : 0, wait: 0 });

  useEffect(() => {
    if (reduce) return;
    let id: number | undefined;
    const tick = () =>
      setS((p) => {
        const q = QUERIES[p.qi];
        if (p.wait > 1) return { ...p, wait: p.wait - 1 };
        if (p.wait === 1) return { qi: (p.qi + 1) % QUERIES.length, len: 0, wait: 0 };
        if (p.len < q.length) return { ...p, len: p.len + 1 };
        return { ...p, wait: 24 };
      });
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const sync = () => {
      stop();
      if (!document.hidden) id = window.setInterval(tick, 72);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduce]);

  const query = QUERIES[s.qi].slice(0, s.len);

  const fade = (delay: number, dy = 10): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: dy },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DUR.slow, ease: EASE.out, delay },
        };

  const draw = (delay: number, duration = 0.45): MotionProps =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration, ease: EASE.out, delay }, opacity: { duration: DUR.instant, delay } },
        };

  return (
    <div className={cn("mx-auto w-full max-w-[720px]", className)}>
      <p className="sr-only">
        A shopping search query is classified by intent. The sponsored result
        leads the page, carrying the visitor to a landing page and a conversion.
      </p>
      <svg aria-hidden viewBox="0 0 440 306" className="h-auto w-full">
        <defs>
          <linearGradient id="si-ember" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="52%" stopColor="var(--color-brand-2)" />
            <stop offset="100%" stopColor="var(--color-brand-3)" />
          </linearGradient>
        </defs>

        <Cap x={16} y={10} text="SEARCH QUERY" />
        <motion.g {...fade(0.05)}>
          <rect x={16} y={18} width={408} height={42} rx={21} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" />
          <circle cx={44} cy={37} r={7} fill="none" stroke="var(--color-muted)" strokeWidth={1.6} />
          <path d="M49 42l6 6" stroke="var(--color-muted)" strokeWidth={1.6} strokeLinecap="round" />
          <text x={64} y={44} fontSize={14} fill="var(--color-fg)" className="font-mono">
            {query}
          </text>
          {!reduce && (
            <motion.rect
              x={65 + query.length * CH}
              y={29}
              width={1.8}
              height={17}
              fill="var(--color-brand)"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.05, ease: "linear", repeat: Infinity }}
            />
          )}
        </motion.g>

        <Cap x={16} y={80} text="INTENT" />
        {PILLS.map((p, i) => (
          <motion.g
            key={p.label}
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: s.qi === i ? 1 : 0.34, y: 0 },
                  transition: { duration: DUR.base, ease: EASE.standard, delay: s.len > 1 ? 0 : 0.35 + staggerDelay(i, 3) },
                })}
          >
            <rect x={p.x} y={86} width={p.w} height={22} rx={11} fill="var(--color-surface-2)" stroke="var(--color-brand)" />
            <text x={p.x + p.w / 2} y={101} textAnchor="middle" fontSize={9} fill="var(--color-fg)" className="font-mono">
              {p.label}
            </text>
          </motion.g>
        ))}

        <Cap x={16} y={128} text="RESULTS" />
        <motion.g {...fade(0.62)}>
          <rect x={16} y={134} width={250} height={58} rx={12} fill="var(--color-surface-2)" stroke="var(--color-brand)" opacity={0.95} />
          <rect x={28} y={144} width={20} height={12} rx={4} fill="var(--color-brand)" />
          <text x={38} y={153} textAnchor="middle" fontSize={7.5} fill="var(--color-bg)" className="font-mono">
            AD
          </text>
          <rect x={54} y={144} width={120} height={6} rx={3} fill="var(--color-fg)" opacity={0.85} />
          <rect x={28} y={166} width={86} height={4} rx={2} fill="var(--color-brand-3)" opacity={0.6} />
          <rect x={28} y={176} width={150} height={4} rx={2} fill="var(--color-muted)" opacity={0.5} />
        </motion.g>
        <motion.g opacity={0.38} {...fade(0.74)}>
          {ORGANIC.map((o) => <rect key={o.y} x={16} y={o.y} width={o.w} height={o.h} rx={o.h / 2} fill="var(--color-muted)" />)}
        </motion.g>

        <motion.path d="M266 163C278 163 278 172 288 172" fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5} {...draw(0.95)} />

        <Cap x={290} y={128} text="LANDING" />
        <motion.g {...fade(1.15)}>
          <rect x={290} y={134} width={134} height={118} rx={12} fill="var(--color-surface-1)" stroke="var(--color-border-strong)" />
          <rect x={300} y={142} width={64} height={8} rx={4} fill="var(--color-surface-3)" />
          <path d="M290 158h134" stroke="var(--color-border)" strokeWidth={1} />
          <rect x={300} y={166} width={114} height={34} rx={6} fill="url(#si-ember)" />
          <rect x={300} y={208} width={70} height={4} rx={2} fill="var(--color-fg)" opacity={0.75} />
          <rect x={300} y={217} width={48} height={4} rx={2} fill="var(--color-muted)" opacity={0.55} />
          <rect x={300} y={228} width={56} height={14} rx={7} fill="var(--color-brand)" />
        </motion.g>

        <motion.path d="M357 254C357 278 330 284 282 284" fill="none" stroke="var(--color-border-strong)" strokeWidth={1.5} {...draw(1.55, 0.6)} />
        <motion.g {...fade(2.05)}>
          <rect x={130} y={268} width={150} height={32} rx={16} fill="var(--color-surface-2)" stroke="var(--color-border-strong)" />
          <circle cx={152} cy={284} r={10} fill="none" stroke="var(--color-profit)" strokeWidth={1.5} />
          <path d="M147 284l4 4 7-8.5" fill="none" stroke="var(--color-profit)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <text x={170} y={288} fontSize={10} fill="var(--color-fg)" className="font-mono">
            conversion
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
