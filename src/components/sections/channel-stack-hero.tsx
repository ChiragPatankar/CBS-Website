"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { SplitTextReveal } from "@/components/primitives/split-text-reveal";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { HeroAtmosphere } from "@/components/sections/hero-atmosphere";
import { ConvergenceMesh } from "@/components/heroes/visuals/convergence-mesh";
import { site } from "@/config/site";
import { stats } from "@/content/home";

/**
 * Each panel is a real sales channel and the real scope of work CBBS runs on it,
 * drawn from the 12 services in the solutions IA. Deliberately no per-channel
 * performance figures: the verified numbers are portfolio-wide (see the rail
 * below), and pinning "+312% GMV" to a named marketplace would be inventing a
 * result. Aggregates that are true beat specifics that are not.
 */
type Channel = { name: string; scope: string; region: string };

const CHANNELS: Channel[] = [
  { name: "Amazon", scope: "Catalog · Ads · Global Selling", region: "IN · US · AE" },
  { name: "Flipkart", scope: "Catalog · Ads · Growth Management", region: "IN" },
  { name: "Walmart", scope: "Global Selling · Demand Capture", region: "US · MX" },
  { name: "Shopify", scope: "Design · Build · Retention", region: "DTC" },
  { name: "eBay", scope: "Listings · Cross-border Logistics", region: "US · UK · DE" },
];

/**
 * The three substantiated portfolio numbers, with rail-length labels. Mapped
 * explicitly rather than trimmed from `s.label` with string surgery — the long
 * one wrapped to two lines and knocked the rail out of alignment.
 */
const RAIL_LABELS: Record<string, string> = {
  "Brands scaled worldwide": "Brands scaled",
  "Average growth in ROAS": "Avg. ROAS",
  "Annual client retention": "Retention",
};
const RAIL = stats.filter((s) => s.label in RAIL_LABELS);

export function ChannelStackHero() {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative">
      {/* The short-viewport variant is for landscape phones: 176px of vertical
          padding is nearly half of a 375px-tall viewport, which pushed the CTAs
          and metric rail well below the fold. */}
      <div className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 [@media(max-height:560px)]:pt-20 [@media(max-height:560px)]:pb-10">
      <HeroAtmosphere />

      <Container>
        <div className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Convergence mesh. The lede claims "one team operating every
              channel"; this draws it — separate lines arriving from off-canvas
              and landing on a single point at the board.

              Width is tuned to the board's VISUAL left edge, not its layout
              box: the board carries rotateY(-11deg), which projects that edge
              well right of where its grid column starts. Anchoring to the column
              left a 116px dead gap. The sink sits at 87% of this box, so w-[64%]
              lands it just short of the tilted edge — wider and the convergence
              point vanishes behind the board, which is the one part that has to
              stay visible.

              xl, not lg: the usable corridor is the space between the widest
              inked text and that tilted edge. Measured, it is 97 viewBox units
              at both 1280 and 1440 (the Container caps out, so those are
              identical) but collapses to 25 at 1024, because the display
              headline does not shrink in step with the container. At 1024 the
              graphic would be a 30px sliver, so it simply does not render — and
              below lg the board it converges on does not exist at all. */}
          <div className="pointer-events-none absolute left-0 top-1/2 z-0 hidden aspect-[500/400] w-[64%] -translate-y-1/2 xl:block">
            <ConvergenceMesh className="h-full w-full" />
          </div>

          {/* ── Copy. z-20 so the headline crosses in front of the stack ── */}
          <div className="relative z-20 lg:col-span-7">
            <span className="inline-flex items-center gap-2.5 font-mono text-eyebrow uppercase text-faint">
              <span className="ember-gradient size-1.5 rounded-full" />
              Mumbai · 9 years · 8 countries
            </span>

            <h1 className="mt-7 font-display text-display font-extrabold leading-[0.94] tracking-[-0.035em]">
              <SplitTextReveal text="We run your" className="block" delay={0.05} />
              <SplitTextReveal text="storefront" className="block" delay={0.16} />
              <SplitTextReveal
                text="everywhere."
                className="block text-gradient"
                delay={0.27}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.slow, delay: 0.45, ease: EASE.out }}
              className="mt-6 max-w-lg text-body-lg text-muted"
            >
              One team operating every channel your brand sells on — catalog,
              advertising, retention and logistics — measured against profit, not
              impressions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.slow, delay: 0.55, ease: EASE.out }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="cta-shimmer">
                <Link href="/contact">
                  {site.cta.primary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/solutions">See what we operate</Link>
              </Button>
            </motion.div>

            {/* Metric rail. Mono + tabular because these are figures, and the
                ledger is the vernacular of cross-border trade. */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.reveal, delay: 0.7 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6"
            >
              {RAIL.map((s) => (
                <div key={s.label}>
                  {/* 0.68rem computed to 10.9px, which is below the readable
                      floor on a phone. This rail is visible at every width. */}
                  <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-faint">
                    {RAIL_LABELS[s.label]}
                  </dt>
                  <dd className="mt-1.5 font-display text-2xl font-bold tabular text-fg">
                    {s.decimals ? s.value.toFixed(s.decimals) : s.value}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── The Channel Stack ──────────────────────────────────────────
              Hidden below lg: a receding Z stack needs horizontal room, and
              forcing it onto a 375px viewport produces overflow, not depth.
              Phones get the honest compact list underneath instead.        */}
          <div className="relative z-10 hidden lg:col-span-5 lg:-ml-10 lg:block">
            <ChannelBoard reduce={!!reduce} />
          </div>

          {/* Mobile channel list — same information, no perspective. */}
          <ul className="flex flex-wrap gap-2 lg:hidden">
            {CHANNELS.map((c) => (
              <li
                key={c.name}
                className="rounded-full border border-border bg-surface-1 px-3.5 py-1.5 font-mono text-xs text-muted"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      </div>
    </section>
  );
}

/**
 * The channel board.
 *
 * This replaced a stack of five overlapping perspective cards. That version
 * failed on two counts: each card occluded the next one's status row, so only
 * the front card's "LIVE" badge and region codes were ever readable, and the
 * depth cue was carried by opacity falling to 0.48 on the rear card — which put
 * its body text below the 4.5:1 contrast floor.
 *
 * One tilted surface with flat rows inside keeps the dimensional object while
 * making every channel legible: depth now comes from the board's own rotation,
 * lighting and shadow rather than from dimming the content.
 */
function ChannelBoard({ reduce }: { reduce: boolean }) {
  const tiltHost = React.useRef<HTMLDivElement>(null);

  // Dashboard drifts upward as the hero scrolls away. Read off the document
  // rather than a measured target — no offsetParent to mis-measure.
  const { scrollY } = useScroll();
  const driftY = useTransform(scrollY, [0, 900], [0, -72]);

  React.useEffect(() => {
    const el = tiltHost.current;
    if (!el || reduce) return;
    // Tilt is a fine-pointer enhancement: there is no hover position to track
    // on touch, and scroll-linked transforms stutter under momentum there.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let rx = 0;
    let ry = 0;
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      // Normalised from the board's own centre, so the tilt tracks the card
      // rather than the viewport.
      ry = ((e.clientX - (b.left + b.width / 2)) / (b.width / 2)) * 3.2;
      rx = -((e.clientY - (b.top + b.height / 2)) / (b.height / 2)) * 2.4;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
      });
    };
    const reset = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    /* Three transform sources, three nested elements. Scroll drift, the static
       pose plus pointer tilt, and the mount entrance all write `transform`;
       any two on one element and the last writer silently wins. */
    <motion.div style={reduce ? undefined : { y: driftY }}>
    <div className="stage-3d">
      <motion.div
        className="panel-3d"
        initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -22, x: 44 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, rotateY: -11, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE.out }}
      >
        <div
          ref={tiltHost}
          style={{
            ["--tilt-x" as string]: "0deg",
            ["--tilt-y" as string]: "0deg",
            transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
            transition: "transform 320ms var(--ease-out-expo)",
            transformStyle: "preserve-3d",
          }}
        >
        <div className="border-orbit board-sheen inner-lip panel-lit glass relative overflow-hidden rounded-2xl border border-border-strong/70 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
          {/* Board header — frames the rows as an operations view, and gives the
              live indicator somewhere to belong. */}
          <div className="flex items-center justify-between border-b border-border/70 bg-surface-2/40 px-5 py-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
              Channels operated
            </span>
            <span className="flex items-center gap-2">
              <span
                className="live-dot size-1.5 rounded-full bg-profit"
                style={{ ["--i" as string]: 0 }}
              />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-profit">
                Live
              </span>
            </span>
          </div>

          <ul>
            {CHANNELS.map((c, i) => (
              <motion.li
                key={c.name}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DUR.slow,
                  delay: 0.5 + staggerDelay(i, CHANNELS.length),
                  ease: EASE.out,
                }}
                className="group/row relative border-b border-border/50 last:border-b-0"
              >
                {/* Ember rail wipes down on hover — the only accent per row. */}
                <span
                  aria-hidden
                  className="row-rail absolute inset-y-0 left-0 w-[2px] ember-gradient"
                />
                <div className="flex items-center justify-between gap-5 px-5 py-4 transition-colors duration-200 group-hover/row:bg-surface-2/40">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="live-dot size-1 rounded-full bg-profit"
                        style={{ ["--i" as string]: i + 1 }}
                      />
                      <h3 className="font-display text-[0.95rem] font-bold tracking-tight text-fg">
                        {c.name}
                      </h3>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted">{c.scope}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Sparkline points={SPARKS[c.name] ?? []} delay={0.9 + i * 0.08} />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors duration-200 group-hover/row:text-brand-3">
                      {c.region}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="border-t border-border/70 bg-surface-2/30 px-5 py-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
              + 10 more marketplaces
            </span>
          </div>
        </div>
        </div>
      </motion.div>
    </div>
    </motion.div>
  );
}

/**
 * Deterministic sparkline shapes — fixed arrays, never Math.random(), which
 * differs between the server and client render and trips hydration.
 *
 * No axis, no values, no accessible label, on purpose. These read as channel
 * activity without asserting a figure: CBBS has no published per-marketplace
 * results, and a chart with numbers on it would be inventing them. The only
 * real numbers on this page stay the portfolio aggregates in the rail.
 */
const SPARKS: Record<string, number[]> = {
  Amazon: [4, 6, 5, 8, 7, 11, 10, 14, 13, 17],
  Flipkart: [6, 5, 7, 7, 9, 8, 12, 11, 13, 15],
  Walmart: [3, 5, 4, 6, 9, 8, 10, 12, 11, 14],
  Shopify: [7, 6, 9, 8, 10, 13, 12, 14, 16, 18],
  eBay: [5, 7, 6, 8, 7, 9, 11, 10, 12, 13],
};

function Sparkline({ points, delay }: { points: number[]; delay: number }) {
  const w = 54;
  const h = 16;
  if (!points.length) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      className="shrink-0 overflow-visible text-brand-3/70 transition-colors duration-200 group-hover/row:text-brand-3"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: EASE.out }}
      />
    </svg>
  );
}
