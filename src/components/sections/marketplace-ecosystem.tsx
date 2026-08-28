"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Store } from "lucide-react";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { marketplaces } from "@/content/home";

const RADIUS = 210;

export function MarketplaceEcosystem() {
  const reduce = useReducedMotion();
  const nodes = React.useMemo(
    () =>
      marketplaces.map((name, i) => {
        const angle = (i / marketplaces.length) * Math.PI * 2 - Math.PI / 2;
        return { name, x: Math.cos(angle) * RADIUS, y: Math.sin(angle) * RADIUS };
      }),
    []
  );

  return (
    <Section className="overflow-hidden">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>One control plane</Eyebrow>
            <h2 className="mt-4 text-h1 font-semibold">
              Your brand, connected to every marketplace that matters
            </h2>
            <p className="mt-4 text-body-lg text-muted">
              We operate a unified growth engine across 15+ global marketplaces and DTC —
              cataloging, advertising, and analytics from a single, profit-first command center.
            </p>
          </Reveal>
        </div>

        {/* Desktop orbit */}
        <div className="relative mt-16 hidden h-[520px] items-center justify-center md:flex">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60" />
            <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40" />
            <div className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[80px]" />
          </div>

          {/* Rotating ring (nodes + connectors) */}
          <motion.div
            className="absolute left-1/2 top-1/2 size-0"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 48, ease: "linear", repeat: Infinity }}
          >
            <svg
              className="pointer-events-none absolute overflow-visible"
              style={{ left: 0, top: 0 }}
              aria-hidden
            >
              {nodes.map((n) => (
                <line
                  key={n.name}
                  x1={0}
                  y1={0}
                  x2={n.x}
                  y2={n.y}
                  stroke="url(#eco)"
                  strokeWidth={1}
                  strokeDasharray="3 5"
                  opacity={0.5}
                />
              ))}
              <defs>
                <linearGradient id="eco" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5b5bf0" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>

            {nodes.map((n) => (
              <div
                key={n.name}
                className="absolute"
                style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
              >
                <motion.div
                  animate={reduce ? undefined : { rotate: -360 }}
                  transition={{ duration: 48, ease: "linear", repeat: Infinity }}
                >
                  <div className="glass group flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:border-brand/60">
                    <span className="size-2 rounded-full aurora-gradient" />
                    <span className="whitespace-nowrap font-display text-sm font-medium text-fg">
                      {n.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Center hub */}
          <div className="relative z-10">
            <div className="glass glow-brand grid size-40 place-items-center rounded-full text-center">
              <div>
                <span className="mx-auto grid size-10 place-items-center rounded-xl aurora-gradient text-white">
                  <Store className="size-5" />
                </span>
                <div className="mt-2 font-display text-sm font-semibold">Your Brand</div>
                <div className="text-xs text-faint">one command center</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
          {marketplaces.map((m) => (
            <div key={m} className="glass flex items-center gap-2 rounded-xl px-4 py-3">
              <span className="size-2 rounded-full aurora-gradient" />
              <span className="font-display text-sm font-medium">{m}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
