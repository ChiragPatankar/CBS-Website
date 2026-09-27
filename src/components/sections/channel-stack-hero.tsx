"use client";

import * as React from "react";
import Link from "next/link";
import { animate, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { SplitTextReveal } from "@/components/primitives/split-text-reveal";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import { HeroAtmosphere } from "@/components/sections/hero-atmosphere";
import { ConvergenceMesh } from "@/components/heroes/visuals/convergence-mesh";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { crossBorderServices } from "@/content/cross-border-services";
import { stats } from "@/content/home";

/**
 * Each panel is a real sales channel and the real scope of work CBBS runs on it,
 * drawn from the 12 services in the solutions IA. Deliberately no per-channel
 * performance figures: the verified numbers are portfolio-wide (see the rail
 * below), and pinning "+312% GMV" to a named marketplace would be inventing a
 * result. Aggregates that are true beat specifics that are not.
 */
type Channel = { name: string; scope: string; region: string; mark: string };

const CHANNELS: Channel[] = [
  { name: "Amazon", scope: "Catalog · Ads · Global Selling", region: "IN · US · AE", mark: "a" },
  { name: "Flipkart", scope: "Catalog · Ads · Growth Management", region: "IN", mark: "F" },
  { name: "Walmart", scope: "Global Selling · Demand Capture", region: "US · MX", mark: "W" },
  { name: "Shopify", scope: "Design · Build · Retention", region: "DTC", mark: "S" },
  { name: "eBay", scope: "Listings · Cross-border Logistics", region: "US · UK · DE", mark: "e" },
];

/**
 * The markets half of the business — trade, tax and compliance per region.
 * Scopes are the headline items from each region's list in
 * `content/cross-border-services.ts`; each row deep-links to that region.
 */
type Market = { name: string; scope: string; code: string; id: string };

const MARKETS: Market[] = [
  { name: "USA", scope: "LLC · Sales Tax · FDA/MOCRA · IOR", code: "US", id: "usa" },
  { name: "European Union", scope: "VAT · IOR · EPR · GPSR", code: "EU", id: "eu" },
  { name: "United Kingdom", scope: "VAT · Incorporation · SCPN", code: "UK", id: "uk" },
  { name: "Mid-East", scope: "IOR · Corporate Tax · VAT · Warehousing", code: "GCC", id: "mid-east" },
  { name: "Canada", scope: "GST · Incorporation · CFIA", code: "CA", id: "canada" },
  { name: "Australia", scope: "ABN/GST · Return Filing · Book Keeping", code: "AU", id: "australia" },
];

type BoardView = "channels" | "markets";

/** Real per-region service counts, read from the page the rows link to. */
const serviceCount = (id: string) =>
  crossBorderServices.regions.find((r) => r.id === id)?.items.length ?? 0;

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
              Marketplaces · Compliance · Logistics
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
              One team for every channel and market you sell in: catalog,
              advertising and retention, plus the import, tax and compliance work
              that gets you there. Measured against profit, not impressions.
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

            {/* Tertiary route for sellers who arrive for trade and compliance
                work rather than marketplace growth. Text-weight on purpose, so
                it never competes with the primary CTA. */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.slow, delay: 0.65 }}
              className="mt-5 text-sm text-muted"
            >
              Selling abroad?{" "}
              <Link
                href="/cross-border-services#by-country"
                className="inline-flex items-center gap-1 text-brand transition-colors hover:text-brand-3"
              >
                <span className="link-underline pb-0.5">Country-by-country services</span>
                <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            </motion.p>

            {/* Metric rail. Mono + tabular because these are figures, and the
                ledger is the vernacular of cross-border trade. */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.reveal, delay: 0.7 }}
              className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-border/70 border-t border-border pt-6"
            >
              {RAIL.map((s) => (
                <div key={s.label} className="px-4 first:pl-0">
                  {/* 0.68rem computed to 10.9px, which is below the readable
                      floor on a phone. This rail is visible at every width. */}
                  <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-faint">
                    {RAIL_LABELS[s.label]}
                  </dt>
                  <dd className="mt-1.5 font-display text-2xl font-bold tabular text-fg">
                    <CountUp value={s.value} decimals={s.decimals ?? 0} delay={0.75} />
                    <span className="text-gradient">{s.suffix}</span>
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
            {/* 1024–1279 backdrop. The convergence mesh cannot fit at these
                widths (see above), which left the corridor left of the board
                empty. A soft glow and dot field fill it instead — pure CSS,
                and gone at xl where the mesh takes over. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-24 -inset-y-16 -z-10 xl:hidden"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_18%,transparent),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--color-brand-3)_28%,transparent)_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:radial-gradient(closest-side,black,transparent)]" />
            </div>
            <ChannelBoard reduce={!!reduce} />
          </div>

          {/* Mobile board — the same two views as the desktop board, laid
              flat. A receding 3D stack needs horizontal room a phone does not
              have, but the information should not disappear with it. */}
          <div className="lg:hidden">
            <MobileBoard />
          </div>
        </div>
      </Container>

      {/* Scroll cue. The hero fills the viewport, so without it the page can
          read as complete. Hidden on short viewports, where it would collide
          with the metric rail. */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.reveal, delay: 1.2 }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-fg sm:flex [@media(max-height:720px)]:hidden"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em]">Scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-border">
          <span className="scroll-cue absolute inset-x-0 top-0 h-3 bg-brand-3 motion-reduce:hidden" />
        </span>
        <ArrowDown aria-hidden className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.a>
      </div>
    </section>
  );
}

/**
 * Counts up from zero on mount. The server renders the final figure, so the
 * static HTML (and anyone without JS) gets the real number; the reset to zero
 * happens while the rail is still at opacity 0, so it is never seen.
 */
function CountUp({ value, decimals, delay }: { value: number; decimals: number; delay: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    el.textContent = (0).toFixed(decimals);
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: EASE.out,
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [value, decimals, delay, reduce]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

/** Flat, phone-width version of the channel board: first three rows of each view. */
function MobileBoard() {
  const [view, setView] = React.useState<BoardView>("channels");
  const rows =
    view === "channels"
      ? CHANNELS.slice(0, 3).map((c) => ({
          key: c.name,
          mark: c.mark,
          name: c.name,
          scope: c.scope,
          tag: c.region,
          href: undefined,
        }))
      : MARKETS.slice(0, 3).map((m) => ({
          key: m.id,
          mark: m.code,
          name: m.name,
          scope: m.scope,
          tag: `${serviceCount(m.id)} services`,
          href: `/cross-border-services#${m.id}`,
        }));

  return (
    <div className="glass overflow-hidden rounded-2xl border border-border-strong/70">
      <div className="flex items-center justify-between gap-4 border-b border-border/70 bg-surface-2/40 px-3 py-2.5">
        <BoardToggle view={view} onChange={setView} />
        <span className="flex items-center gap-2 pr-2">
          <span className="live-dot size-1.5 rounded-full bg-profit" style={{ ["--i" as string]: 0 }} />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-profit">Live</span>
        </span>
      </div>
      <ul key={view}>
        {rows.map((r) => {
          const body = (
            <>
              <div className="flex min-w-0 items-center gap-3">
                <Monogram label={r.mark} />
                <div className="min-w-0">
                  <h3 className="font-display text-[0.95rem] font-bold tracking-tight text-fg">{r.name}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted">{r.scope}</p>
                </div>
              </div>
              <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                {r.tag}
              </span>
            </>
          );
          return (
            <li key={r.key} className="border-b border-border/50 last:border-b-0">
              {r.href ? (
                <Link href={r.href} className="flex min-h-11 items-center justify-between gap-4 px-4 py-3">
                  {body}
                </Link>
              ) : (
                <div className="flex items-center justify-between gap-4 px-4 py-3">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="border-t border-border/70 bg-surface-2/30 px-4 py-3">
        {view === "channels" ? (
          <Link
            href="/solutions/marketplace"
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint hover:text-brand-3"
          >
            + 12 more marketplaces →
          </Link>
        ) : (
          <Link
            href="/cross-border-services#by-country"
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint hover:text-brand-3"
          >
            + {MARKETS.length - 3} more regions →
          </Link>
        )}
      </div>
    </div>
  );
}

function BoardToggle({ view, onChange }: { view: BoardView; onChange: (v: BoardView) => void }) {
  return (
    <div role="group" aria-label="Board view" className="flex rounded-lg border border-border/70 bg-surface-1/60 p-0.5">
      {(["channels", "markets"] as const).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          onClick={() => onChange(v)}
          className={cn(
            "rounded-md px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-colors",
            view === v ? "bg-surface-2 text-fg" : "text-faint hover:text-muted"
          )}
        >
          {v === "channels" ? "Channels" : "Markets"}
        </button>
      ))}
    </div>
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
  const [view, setView] = React.useState<BoardView>("channels");
  // The first render waits for the board's entrance; later toggles should not.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

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
          className="relative"
          style={{
            ["--tilt-x" as string]: "0deg",
            ["--tilt-y" as string]: "0deg",
            transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
            transition: "transform 320ms var(--ease-out-expo)",
            transformStyle: "preserve-3d",
          }}
        >
        {/* Ember floor glow. The board reads as lit from below rather than
            pasted onto the page. Radial gradient, not a blur filter. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-[8%] right-[8%] h-32 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_30%,transparent),transparent)]"
        />
        <div className="border-orbit board-sheen inner-lip panel-lit glass relative overflow-hidden rounded-2xl border border-border-strong/70 shadow-[0_1px_0_0_rgba(255,217,194,0.05),0_24px_48px_-24px_rgba(0,0,0,0.8),0_60px_120px_-50px_rgba(240,86,45,0.28)]">
          {/* Top-edge specular line — the brightest point on the glass. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd9c2]/45 to-transparent"
          />
          {/* Board header — frames the rows as an operations view. The toggle
              switches between the two halves of the business: the channels we
              operate and the markets we get you into. */}
          <div className="flex items-center justify-between gap-4 border-b border-border/70 bg-surface-2/40 px-3 py-2.5 pl-5">
            <BoardToggle view={view} onChange={setView} />
            <span className="flex items-center gap-2 pr-2">
              <span
                className="live-dot size-1.5 rounded-full bg-profit"
                style={{ ["--i" as string]: 0 }}
              />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-profit">
                Live
              </span>
            </span>
          </div>

          {view === "channels" ? (
              <ul key="channels">
                {CHANNELS.map((c, i) => (
                  <motion.li
                    key={c.name}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DUR.slow,
                      delay: (mounted.current ? 0 : 0.5) + staggerDelay(i, CHANNELS.length),
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
                      <div className="flex min-w-0 items-center gap-3.5">
                        <Monogram label={c.mark} live={i + 1} />
                        <div className="min-w-0">
                          <h3 className="font-display text-[0.95rem] font-bold tracking-tight text-fg">
                            {c.name}
                          </h3>
                          <p className="mt-0.5 truncate text-xs text-muted">{c.scope}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <Sparkline
                          points={SPARKS[c.name] ?? []}
                          delay={(mounted.current ? 0.2 : 0.9) + i * 0.08}
                        />
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors duration-200 group-hover/row:text-brand-3">
                          {c.region}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <ul key="markets">
                {MARKETS.map((m, i) => (
                  <motion.li
                    key={m.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DUR.slow,
                      delay: staggerDelay(i, MARKETS.length),
                      ease: EASE.out,
                    }}
                    className="group/row relative border-b border-border/50 last:border-b-0"
                  >
                    <span
                      aria-hidden
                      className="row-rail absolute inset-y-0 left-0 w-[2px] ember-gradient"
                    />
                    <Link
                      href={`/cross-border-services#${m.id}`}
                      className="flex items-center justify-between gap-5 px-5 py-3 transition-colors duration-200 group-hover/row:bg-surface-2/40"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <Monogram label={m.code} />
                        <div className="min-w-0">
                          <h3 className="font-display text-[0.95rem] font-bold tracking-tight text-fg">
                            {m.name}
                          </h3>
                          <p className="mt-0.5 truncate text-xs text-muted">{m.scope}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors duration-200 group-hover/row:text-brand-3">
                          {serviceCount(m.id)} services
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 text-brand opacity-0 transition-opacity duration-200 group-hover/row:opacity-100"
                        />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}

          <div className="border-t border-border/70 bg-surface-2/30 px-5 py-3">
            {view === "channels" ? (
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                + 10 more marketplaces
              </span>
            ) : (
              <Link
                href="/cross-border-services"
                className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-brand-3"
              >
                IOR · Tax · Compliance · Logistics →
              </Link>
            )}
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

/**
 * Letter tile standing in for a channel or market logo. No logo files exist,
 * and a mis-drawn trademark is worse than none, so this is a typographic mark.
 * `live` adds the staggered status pip at the corner.
 */
function Monogram({ label, live }: { label: string; live?: number }) {
  return (
    <span className="relative grid size-9 shrink-0 place-items-center rounded-[10px] border border-border-strong/70 bg-[linear-gradient(145deg,var(--color-surface-3),var(--color-surface-1))] shadow-[inset_0_1px_0_0_rgba(255,217,194,0.1)] transition-colors duration-200 group-hover/row:border-brand/50">
      <span
        className={cn(
          "font-display font-extrabold leading-none text-brand-3",
          label.length > 2 ? "text-[0.6rem] tracking-tight" : label.length > 1 ? "text-[0.7rem]" : "text-[0.95rem]"
        )}
      >
        {label}
      </span>
      {live !== undefined ? (
        <span
          className="live-dot absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-surface-1 bg-profit"
          style={{ ["--i" as string]: live }}
        />
      ) : null}
    </span>
  );
}

function Sparkline({ points, delay }: { points: number[]; delay: number }) {
  const gid = React.useId().replace(/:/g, "");
  const w = 64;
  const h = 20;
  if (!points.length) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const xy = points.map((v, i) => [
    (i / (points.length - 1)) * w,
    h - 2 - ((v - min) / (max - min || 1)) * (h - 4),
  ]);
  const d = xy.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  const [ex, ey] = xy[xy.length - 1];

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden
      className="shrink-0 overflow-visible text-brand-3/80 transition-colors duration-200 group-hover/row:text-brand-3"
    >
      <defs>
        <linearGradient id={`sf-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.35} />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#sf-${gid})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.6 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: EASE.out }}
      />
      {/* End-point marker with a soft halo: the "now" of each series. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 1.1 }}
      >
        <circle cx={ex} cy={ey} r={4.5} fill="var(--color-brand)" opacity={0.18} />
        <circle cx={ex} cy={ey} r={1.9} fill="var(--color-brand-3)" />
      </motion.g>
    </svg>
  );
}
