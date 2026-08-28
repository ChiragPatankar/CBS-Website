"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, SPRING } from "@/lib/motion/tokens";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { motions } from "@/content/home";
import { cn } from "@/lib/utils";

export function TwoMotion() {
  const [active, setActive] = React.useState<"launch" | "scale">("launch");
  const current = motions.find((m) => m.id === active)!;

  return (
    <Section id="services" className="border-t border-border/60">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Wherever you are in the journey</Eyebrow>
            <h2 className="mt-4 text-h1 font-semibold">We power your next stage of growth</h2>
            <p className="mt-4 text-body-lg text-muted">
              Two proven motions, one profit-first operating system — matched to exactly where your
              brand is today.
            </p>
          </Reveal>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-surface-1 p-1">
            {motions.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={cn(
                  // min-h-11 not py-3: the pill sits in a bordered track, and
                  // growing the padding would break that alignment. 44px is the
                  // touch-target floor.
                  "relative flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors",
                  active === m.id ? "text-white" : "text-muted hover:text-fg"
                )}
              >
                {active === m.id && (
                  <motion.span
                    layoutId="motion-pill"
                    className="absolute inset-0 rounded-full aurora-gradient"
                    transition={SPRING}
                  />
                )}
                <span className="relative z-10">{m.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE.out }}
              className="grid items-stretch gap-6 lg:grid-cols-2"
            >
              {/* Copy card */}
              <div className="glass flex flex-col rounded-2xl p-8">
                <span className="font-mono text-eyebrow uppercase text-brand-3">{current.eyebrow}</span>
                <h3 className="mt-3 text-h2 font-semibold">{current.title}</h3>
                <p className="mt-2 text-sm font-medium text-muted">{current.proof}</p>
                <p className="mt-4 text-body-lg text-muted">{current.body}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border bg-surface-1 p-4">
                      <div className="font-display text-3xl font-semibold text-gradient">{m.value}</div>
                      <div className="mt-1 text-xs text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>

                <Button asChild variant="secondary" className="mt-6 w-fit">
                  <Link href="/solutions">
                    Explore this motion <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual card */}
              <div className="glass relative overflow-hidden rounded-2xl p-8">
                <div className="absolute inset-0 -z-10 opacity-40 grid-bg" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    {active === "launch" ? "Traction curve" : "Efficiency curve"}
                  </span>
                  <span className="rounded-md bg-profit/15 px-2 py-0.5 font-mono text-xs text-profit">
                    profit-first
                  </span>
                </div>
                <GrowthChart variant={active} />
                <ul className="mt-6 space-y-2">
                  {(active === "launch"
                    ? ["Conversion-ready marketplace + DTC presence", "First customers & review velocity", "Foundational retention flows"]
                    : ["Advanced analytics & unit economics", "New-channel expansion", "Continuous optimization loops"]
                  ).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="size-4 text-profit" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}

function GrowthChart({ variant }: { variant: "launch" | "scale" }) {
  const reduce = useReducedMotion();
  const d =
    variant === "launch"
      ? "M0,150 C60,140 110,120 160,96 C210,72 260,60 320,30 L320,180 L0,180 Z"
      : "M0,150 C60,150 90,110 150,104 C220,96 250,50 320,20 L320,180 L0,180 Z";
  const line =
    variant === "launch"
      ? "M0,150 C60,140 110,120 160,96 C210,72 260,60 320,30"
      : "M0,150 C60,150 90,110 150,104 C220,96 250,50 320,20";

  return (
    <svg viewBox="0 0 320 180" className="mt-4 h-40 w-full">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b5bf0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5b5bf0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5b5bf0" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <motion.path
        key={`area-${variant}`}
        d={d}
        fill="url(#area)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        key={`line-${variant}`}
        d={line}
        fill="none"
        stroke="url(#stroke)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: EASE.out }}
      />
    </svg>
  );
}
