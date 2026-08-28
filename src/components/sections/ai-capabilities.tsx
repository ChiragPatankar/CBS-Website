"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { SPRING_HOVER } from "@/lib/motion/tokens";
import { capabilities } from "@/content/home";

export function AICapabilities() {
  return (
    <Section id="technology" className="border-t border-border/60">
      {/* overflow-hidden is load-bearing: the blob below is a fixed 720px wide
          and centred with -translate-x-1/2, so on any viewport under ~720px it
          hangs off both edges. Unclipped, that made the whole document 548px
          wide at a 375px viewport — the entire page scrolled sideways. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand-2/10 blur-[120px]" />
      </div>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Eyebrow>AI & Technology</Eyebrow>
            <h2 className="mt-4 text-h1 font-semibold">
              An intelligent growth engine, not just campaigns
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-muted lg:pb-2">
              Machine learning and automation run underneath everything we do — forecasting demand,
              testing creative, and optimizing spend so growth compounds while costs fall.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
              <motion.article
                key={cap.title}
                whileHover={{ y: -4 }}
                transition={SPRING_HOVER}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 transition-colors hover:border-border-strong"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                    <cap.icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-h3 font-semibold">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{cap.desc}</p>
              </motion.article>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
