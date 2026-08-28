"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { DUR, EASE } from "@/lib/motion/tokens";
import type { Faq } from "@/content/types";

/**
 * Accordion built on real buttons rather than `<details>`, because the open
 * height needs to animate and `<details>` cannot be transitioned reliably
 * across browsers. `aria-expanded` + `aria-controls` carry the state to
 * assistive tech, and the panel is removed from the tree when closed so its
 * content is not reachable by tab while invisible.
 */
export function FaqSection({
  faqs,
  eyebrow = "Questions",
  title = "What clients usually ask",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = React.useState<number | null>(0);
  if (!faqs.length) return null;

  return (
    <Section className="border-t border-border/60">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-sm font-display text-h1 font-extrabold tracking-[-0.025em]">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-border">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                const panelId = `faq-panel-${i}`;
                return (
                  <li key={f.q} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-brand-3"
                    >
                      <span className="font-display text-[1.02rem] font-semibold tracking-tight">
                        {f.q}
                      </span>
                      <Plus
                        aria-hidden
                        className={`mt-0.5 size-4 shrink-0 text-brand transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: DUR.base, ease: EASE.standard }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">
                            {f.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
