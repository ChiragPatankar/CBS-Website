"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { DraftBadge } from "@/components/composites/review-notice";
import { EASE, SPRING } from "@/lib/motion/tokens";
import { caseStudies as workStudies } from "@/content/work";
import type { CaseStudy } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Selector + detail panel for case studies.
 *
 * Sources from `@/content/work` rather than the old hardcoded array in
 * `content/home.ts`, which carried invented figures ("+312% Revenue in 9 months",
 * "4.8× Blended ROAS") attributed to anonymised clients and rendered them on the
 * live homepage as fact. The studies here are explicitly draft-flagged, badged in
 * the UI, and their figures are `~`-prefixed — so the section can exercise the
 * design without asserting a result CrossBorder cannot evidence.
 */
export function CaseStudies({
  items,
  eyebrow = "Selected work",
  title = "Built for outcomes, not impressions",
  showViewAll = true,
}: {
  items?: CaseStudy[];
  eyebrow?: string;
  title?: string;
  showViewAll?: boolean;
}) {
  const studies = (items ?? workStudies).slice(0, 3);
  const [active, setActive] = React.useState(0);
  const current = studies[active];
  if (!current) return null;

  return (
    <Section id="work" className="border-t border-border/60">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-h1 font-extrabold tracking-[-0.025em]">
              {title}
            </h2>
          </Reveal>
          {showViewAll ? (
            <Reveal delay={0.1}>
              <Button asChild variant="secondary">
                <Link href="/work">
                  See all work
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Selector */}
          <Reveal>
            <ul className="flex flex-col gap-2">
              {studies.map((cs, i) => {
                const on = i === active;
                return (
                  <li key={cs.slug}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className={cn(
                        "relative flex min-h-16 w-full flex-col items-start gap-1 rounded-xl border px-5 py-4 text-left transition-colors",
                        on
                          ? "border-brand/50 bg-surface-1"
                          : "border-border bg-surface-1/40 hover:border-border-strong"
                      )}
                    >
                      {on ? (
                        <motion.span
                          layoutId="cs-active"
                          transition={SPRING}
                          aria-hidden
                          className="absolute inset-y-2 left-0 w-[2px] rounded-full ember-gradient"
                        />
                      ) : null}
                      <span className="flex w-full items-center justify-between gap-3">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                          {cs.industry}
                        </span>
                        {cs.draft ? <DraftBadge label="Sample" /> : null}
                      </span>
                      <span className="text-sm font-medium text-fg">{cs.headline}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Detail */}
          <Reveal delay={0.08}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={current.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE.out }}
                className="glass inner-lip relative h-full overflow-hidden rounded-2xl border border-border-strong/60 p-7 sm:p-9"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full opacity-[0.15]"
                  style={{
                    background: `radial-gradient(closest-side, ${current.accent}, transparent)`,
                  }}
                />

                <p className="text-sm text-muted">{current.client}</p>
                <h3 className="mt-3 font-display text-h3 font-bold leading-snug tracking-tight">
                  {current.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{current.summary}</p>

                <dl className="mt-8 grid grid-cols-3 gap-5 border-t border-border pt-6">
                  {current.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <dd className="font-display text-h3 font-extrabold tabular text-fg/75">
                        {m.value}
                      </dd>
                      <dt className="mt-1 text-xs leading-tight text-faint">{m.label}</dt>
                    </div>
                  ))}
                </dl>

                {current.draft ? (
                  <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-signal/80">
                    Illustrative figures — not client results
                  </p>
                ) : null}

                <Link
                  href={`/work/${current.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center gap-1.5 text-sm text-brand transition-colors hover:text-brand-3"
                >
                  <span className="link-underline pb-0.5">Read the full story</span>
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </Link>
              </motion.article>
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
