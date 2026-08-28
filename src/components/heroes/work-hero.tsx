"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { HeroAtmosphere } from "@/components/heroes/atmosphere";
import { DraftBadge } from "@/components/composites/review-notice";
import { DUR, EASE, staggerDelay } from "@/lib/motion/tokens";
import type { CaseStudy } from "@/content/types";

/**
 * Portfolio hero: oversized type with case-study cards drifting behind it.
 *
 * Composition is layered rather than split — the cards sit *behind* the headline
 * on a parallax offset, so the type reads first and the work registers as
 * texture. That is the opposite of the service heroes, where the visual is a
 * peer of the copy.
 *
 * Cards are tilted and semi-transparent on purpose: they are atmosphere here,
 * and every one still carries its Sample badge so nothing behind the type can be
 * mistaken for a published result.
 */
export function WorkHero({ studies }: { studies: CaseStudy[] }) {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Cards drift up faster than the page, headline drifts slower — cheap depth
  // from two transforms rather than a WebGL scene.
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const floating = studies.slice(0, 4);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <HeroAtmosphere variant="neutral" animate={false} />

      {/* Card field. Hidden below lg — at phone width it would sit under the
          headline as noise rather than reading as depth. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: cardsY }}
        className="pointer-events-none absolute inset-x-0 top-24 -z-[5] hidden lg:block"
      >
        <Container>
          <div className="relative h-[420px]">
            {floating.map((cs, i) => {
              const pose = POSES[i % POSES.length];
              return (
                <motion.article
                  key={cs.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotate: pose.rotate * 0.4 }}
                  animate={{ opacity: 1, y: 0, rotate: pose.rotate }}
                  transition={{
                    duration: DUR.slow,
                    delay: 0.35 + staggerDelay(i, floating.length),
                    ease: EASE.out,
                  }}
                  style={{ left: pose.left, top: pose.top, width: pose.width }}
                  className="absolute rounded-2xl border border-border-strong/50 bg-surface-1/70 p-5 backdrop-blur-[2px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                      {cs.industry}
                    </span>
                    {cs.draft ? <DraftBadge label="Sample" /> : null}
                  </div>
                  <p className="mt-3 text-sm font-medium leading-snug text-fg/55">{cs.headline}</p>
                  <div className="mt-4 flex gap-4 border-t border-border/70 pt-3">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <span className="block font-display text-sm font-bold tabular text-fg/45">
                          {m.value}
                        </span>
                        <span className="block text-[0.6rem] leading-tight text-faint">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </motion.div>

      <Container className="relative">
        <motion.div style={reduce ? undefined : { y: typeY }}>
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            {/* Two lines, deliberately short. The old hero let a long sentence
                run to five lines simply because the font is large. */}
            <h1 className="mt-6 max-w-4xl font-display text-display font-extrabold leading-[0.94] tracking-[-0.038em]">
              Growth,
              <span className="block text-gradient">measured.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-body-lg leading-relaxed text-muted">
              We are collecting written approval from clients before publishing
              their numbers. Rather than fill this page with anonymous claims, the
              verified portfolio figures sit below and named studies follow as
              permissions land.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-7">
              {[
                { v: "100+", l: "Brands scaled" },
                { v: "4.3×", l: "Average ROAS" },
                { v: "85%", l: "Annual retention" },
                { v: "8+", l: "Countries" },
              ].map((f) => (
                <div key={f.l}>
                  <span className="block font-display text-h3 font-extrabold tabular tracking-[-0.02em]">
                    {f.v}
                  </span>
                  <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                    {f.l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}

/** Fixed poses, not random: random values differ between server and client render. */
const POSES = [
  { left: "52%", top: "0px", width: "268px", rotate: -3.2 },
  { left: "72%", top: "150px", width: "252px", rotate: 2.4 },
  { left: "44%", top: "236px", width: "240px", rotate: 1.6 },
  { left: "80%", top: "-24px", width: "228px", rotate: -1.8 },
];
