"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { SPRING_HOVER } from "@/lib/motion/tokens";
import { industries } from "@/content/home";

export function Industries() {
  return (
    <Section className="border-t border-border/60">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow>Category expertise</Eyebrow>
            <h2 className="mt-4 max-w-xl text-h1 font-semibold">
              Growing consumer brands across every category
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted md:text-right">
              Nine years of pattern recognition across industries — so your playbook starts from
              proven ground, not a blank page.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind) => (
            <motion.div
              key={ind.name}
              whileHover={{ y: -4 }}
              transition={SPRING_HOVER}
              className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface-1 p-4 transition-colors hover:border-brand/40 sm:p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand-3 transition-transform group-hover:scale-110">
                <ind.icon className="size-5" />
              </span>
              {/* min-w-0 lets the label shrink below its content width inside the
                  flex row, and break-words handles the single long ones —
                  "Entertainment" is 103px and cannot wrap on its own, which is
                  what pushed the page 26px wide at 320px. */}
              <span className="min-w-0 break-words font-display font-medium leading-tight">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
