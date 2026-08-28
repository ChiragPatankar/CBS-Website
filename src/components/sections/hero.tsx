"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { DUR, EASE } from "@/lib/motion/tokens";
import { marketplaces } from "@/content/home";
import { site } from "@/config/site";

const line1 = ["AI-driven", "ecommerce", "growth,"];
const line2 = ["built", "on", "profit-first", "principles."];

export function Hero() {
  const reduce = useReducedMotion();

  const word = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DUR.reveal, delay: 0.1 + i * 0.05, ease: EASE.out },
    }),
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16">
      {/* Aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px] animate-aurora" />
        <div className="absolute right-[8%] top-[18%] h-[380px] w-[380px] rounded-full bg-brand-3/20 blur-[110px] animate-aurora" />
        <div className="absolute left-[6%] bottom-[6%] h-[360px] w-[360px] rounded-full bg-brand-2/20 blur-[110px] animate-aurora" />
        <div className="absolute inset-0 grid-bg opacity-[0.5]" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/70 px-3 py-1 text-xs text-muted backdrop-blur">
                <span className="aurora-gradient size-1.5 rounded-full" />
                Profit-first · AI-accelerated · Global
              </span>
            </motion.div>

            <h1 className="mt-6 text-display font-semibold">
              <span className="block">
                {line1.map((w, i) => (
                  <motion.span
                    key={w}
                    custom={i}
                    variants={word}
                    initial="hidden"
                    animate="show"
                    className="inline-block"
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
              </span>
              <span className="block text-gradient">
                {line2.map((w, i) => (
                  <motion.span
                    key={w}
                    custom={i + line1.length}
                    variants={word}
                    initial="hidden"
                    animate="show"
                    className="inline-block"
                  >
                    {w}&nbsp;
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 max-w-xl text-body-lg text-muted"
            >
              We scale consumer brands across marketplaces and DTC — with conversion-focused
              marketing, modern technology, and AI-driven strategy. We grow when you grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg">
                <Link href="/contact">
                  {site.cta.primary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/ai-audit">{site.cta.secondary}</Link>
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-signal text-signal" />
                  ))}
                </div>
                Trusted by 100+ consumer brands
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-faint">
                {marketplaces.slice(0, 5).map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating UI cluster */}
          <div className="relative hidden h-[440px] lg:block" aria-hidden>
            <FloatingCard
              className="absolute right-0 top-2 w-64"
              delay={0.7}
              float
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Blended ROAS</span>
                <TrendingUp className="size-4 text-profit" />
              </div>
              <div className="mt-2 font-display text-4xl font-semibold tabular">4.3×</div>
              <div className="mt-3 flex h-14 items-end gap-1">
                {[30, 45, 40, 62, 55, 78, 72, 96].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm aurora-gradient"
                    style={{ height: `${h}%`, opacity: 0.4 + i * 0.075 }}
                  />
                ))}
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute left-0 top-40 w-60"
              delay={0.95}
              float
            >
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-brand/15 text-brand">
                  <Globe2 className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-medium text-fg">15+ marketplaces</div>
                  <div className="text-xs text-faint">Amazon · Flipkart · Walmart</div>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-border" />
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted">CAC</span>
                <span className="rounded-md bg-profit/15 px-2 py-0.5 font-mono text-profit">−40%</span>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute bottom-2 right-8 w-56"
              delay={1.15}
              float
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">AI creative tests</span>
                <span className="aurora-gradient rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white">
                  LIVE
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {["Hook A", "Hook B", "Hook C"].map((h, i) => (
                  <div key={h} className="flex items-center gap-2">
                    <span className="w-12 text-xs text-faint">{h}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                      <span
                        className="block h-full aurora-gradient"
                        style={{ width: `${[92, 64, 38][i]}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FloatingCard({
  children,
  className,
  delay = 0,
  float = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  float?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: DUR.reveal, delay, ease: EASE.out }}
      className={className}
    >
      <div className={`glass rounded-2xl p-4 shadow-xl ${float && !reduce ? "animate-float" : ""}`}>
        {children}
      </div>
    </motion.div>
  );
}
