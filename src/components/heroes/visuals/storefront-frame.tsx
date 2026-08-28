"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { DUR, EASE, SPRING, staggerDelay } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/**
 * Shopify Design & Build hero: a premium storefront assembling itself inside an
 * abstract device frame — chrome, header, hero block, product grid, cart, then a
 * checkout confirmation that floats over the frame's bottom edge.
 *
 * Non-obvious decision: the rhythm is deliberately uneven rather than a flat
 * stagger. Structure (frame → chrome → header → hero) lands on a slow beat, the
 * four product tiles fire fast and tight (0.085s apart) so the grid reads as one
 * gesture, and then there is a held pause before the cart and confirmation arrive
 * on springs. An even stagger across all of it reads as a loading skeleton; this
 * reads as something being composed.
 */

const TILES = [26, 124, 222, 320];
const HERO_LINES = [
  { y: 108, w: 180, h: 8, o: 0.9 },
  { y: 124, w: 122, h: 8, o: 0.55 },
];

export function StorefrontFrame({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const part = (delay: number, dy = 12): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: dy },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DUR.slow, ease: EASE.out, delay },
        };

  const pop = (delay: number): MotionProps =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.9, y: 8 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { ...SPRING, delay },
        };

  return (
    <div className={cn("mx-auto w-full max-w-[720px]", className)}>
      <p className="sr-only">
        A storefront assembling inside a device frame: navigation, hero section,
        product grid, cart, and a completed checkout.
      </p>
      <svg aria-hidden viewBox="0 0 440 310" className="h-auto w-full">
        <defs>
          <linearGradient id="sf-ember" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand)" />
            <stop offset="52%" stopColor="var(--color-brand-2)" />
            <stop offset="100%" stopColor="var(--color-brand-3)" />
          </linearGradient>
        </defs>

        {/* Device frame */}
        <motion.g
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.985 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: DUR.reveal, ease: EASE.out },
              })}
        >
          <rect x={8} y={6} width={424} height={258} rx={18} fill="var(--color-surface-1)" stroke="var(--color-border-strong)" />
          <path d="M8 40h424" stroke="var(--color-border)" strokeWidth={1} />
        </motion.g>

        {/* Chrome: one thin address pill, nothing else */}
        <motion.g {...part(0.18, 0)}>
          <rect x={26} y={16} width={214} height={16} rx={8} fill="var(--color-surface-3)" />
          <rect x={36} y={22} width={92} height={4} rx={2} fill="var(--color-muted)" opacity={0.5} />
          <rect x={392} y={22} width={22} height={3} rx={1.5} fill="var(--color-border-strong)" />
        </motion.g>

        {/* Storefront header */}
        <motion.g {...part(0.32)}>
          <rect x={26} y={56} width={46} height={14} rx={4} fill="url(#sf-ember)" />
          <rect x={120} y={61} width={32} height={5} rx={2.5} fill="var(--color-muted)" opacity={0.7} />
          <rect x={162} y={61} width={26} height={5} rx={2.5} fill="var(--color-muted)" opacity={0.7} />
          <rect x={198} y={61} width={36} height={5} rx={2.5} fill="var(--color-muted)" opacity={0.7} />
          <path
            d="M392 60h14l-1.6 14h-10.8zM396 60a3.1 3.1 0 0 1 6.2 0"
            fill="none"
            stroke="var(--color-fg)"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Hero block */}
        <motion.g {...part(0.52)}>
          <rect x={26} y={88} width={388} height={84} rx={12} fill="var(--color-surface-2)" stroke="var(--color-border)" />
          <rect x={26} y={88} width={388} height={84} rx={12} fill="url(#sf-ember)" opacity={0.16} />
        </motion.g>
        {HERO_LINES.map((l, i) => (
          <motion.rect key={l.y} x={48} y={l.y} width={l.w} height={l.h} rx={4} fill="var(--color-fg)" opacity={l.o} {...part(0.66 + i * 0.07, 6)} />
        ))}
        <motion.rect x={48} y={142} width={78} height={18} rx={9} fill="var(--color-brand)" {...pop(0.84)} />

        {/* Product grid — fast, tight stagger so it reads as one gesture */}
        {TILES.map((x, i) => (
          <motion.g key={x} {...part(1 + staggerDelay(i, 4) * 1.42, 10)}>
            <rect x={x} y={180} width={92} height={62} rx={10} fill="var(--color-surface-2)" stroke="var(--color-border)" />
            <rect x={x + 8} y={188} width={76} height={30} rx={6} fill="var(--color-surface-3)" />
            <rect x={x + 8} y={224} width={44} height={4} rx={2} fill="var(--color-fg)" opacity={0.7} />
            <rect x={x + 8} y={232} width={28} height={4} rx={2} fill="var(--color-muted)" opacity={0.5} />
          </motion.g>
        ))}

        {/* Cart affordance: add-to-cart on a tile, badge on the header bag */}
        <motion.rect x={232} y={222} width={72} height={14} rx={7} fill="var(--color-brand)" {...pop(1.5)} />
        <motion.circle cx={408} cy={58} r={5} fill="var(--color-brand)" stroke="var(--color-surface-1)" strokeWidth={1.5} {...pop(1.62)} />

        {/* Checkout confirmation, floating over the frame edge */}
        <motion.g {...pop(1.84)}>
          <rect x={236} y={248} width={192} height={52} rx={14} fill="var(--color-surface-3)" stroke="var(--color-border-strong)" />
          <circle cx={264} cy={274} r={12} fill="none" stroke="var(--color-profit)" strokeWidth={1.5} />
          <motion.path
            d="M258 274l4.5 5 8-9.5"
            fill="none"
            stroke="var(--color-profit)"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...(reduce
              ? {}
              : {
                  initial: { pathLength: 0 },
                  animate: { pathLength: 1 },
                  transition: { duration: DUR.base, ease: EASE.out, delay: 2.05 },
                })}
          />
          <rect x={286} y={264} width={96} height={6} rx={3} fill="var(--color-fg)" opacity={0.85} />
          <rect x={286} y={278} width={62} height={5} rx={2.5} fill="var(--color-muted)" opacity={0.6} />
        </motion.g>
      </svg>
    </div>
  );
}
