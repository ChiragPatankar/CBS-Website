"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Icon } from "@/components/primitives/icon";
import { HeroAtmosphere } from "@/components/heroes/atmosphere";
import { DUR, EASE, SPRING, staggerDelay } from "@/lib/motion/tokens";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Contact hero that starts the conversion instead of describing it.
 *
 * The reader picks what they are trying to do *in the hero*; the choice scrolls
 * them to the form and pre-selects the matching interest, so the first field is
 * already answered by the time they arrive. That turns the hero from a banner
 * into step one — which is the whole reason this page exists.
 *
 * Selection is lifted via `onSelect` rather than kept local, because the form
 * below needs it. State stays in the page so a deep link could set it later.
 */
export type Intent = {
  id: string;
  label: string;
  body: string;
  icon: IconName;
  /** Must match an option in `contact.fields[interest].options`. */
  interest: string;
};

export const CONTACT_INTENTS: Intent[] = [
  {
    id: "marketplace",
    label: "Sell on more marketplaces",
    body: "Launch a new channel, or fix the ones you are already on.",
    icon: "store",
    interest: "Marketplace Solutions",
  },
  {
    id: "growth",
    label: "Make my ad spend work",
    body: "Traffic, conversion and retention measured against profit.",
    icon: "trending",
    interest: "Digital Commerce Growth",
  },
  {
    id: "technology",
    label: "Build or fix the platform",
    body: "Storefront, integrations, infrastructure, forecasting.",
    icon: "code",
    interest: "Technology & AI",
  },
  {
    id: "unsure",
    label: "I am not sure yet",
    body: "Tell us the symptom and we will name the likely cause.",
    icon: "message",
    interest: "Not sure yet",
  },
];

export function ContactHero({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (intent: Intent) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-36">
      <HeroAtmosphere variant="ember" />

      <Container>
        {/* Centred, tight measure, then a full-width selector row. Nothing like
            the split composition on the service pages. */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Start here</Eyebrow>
            <h1 className="mt-5 font-display text-h1 font-extrabold leading-[1.0] tracking-[-0.035em] sm:text-display">
              Let&rsquo;s build
              <span className="block text-gradient">what&rsquo;s next.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-7 max-w-xl text-body-lg leading-relaxed text-muted">
              Tell us what you are trying to do and we will put the right
              specialist on the call — not a salesperson.
            </p>
          </Reveal>
        </div>

        {/* The interactive step. Real buttons, keyboard operable, 44px+ targets. */}
        <div className="mt-14">
          <p className="text-center font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-3">
            What are you trying to build?
          </p>

          <div
            role="group"
            aria-label="What are you trying to build?"
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CONTACT_INTENTS.map((it, i) => {
              const on = selected === it.id;
              return (
                <motion.button
                  key={it.id}
                  type="button"
                  onClick={() => onSelect(it)}
                  aria-pressed={on}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DUR.slow,
                    delay: 0.24 + staggerDelay(i, CONTACT_INTENTS.length),
                    ease: EASE.out,
                  }}
                  whileHover={reduce ? undefined : { y: -4 }}
                  className={cn(
                    "group relative flex min-h-[152px] flex-col items-start rounded-2xl border p-5 text-left transition-colors",
                    on
                      ? "border-brand bg-brand/10"
                      : "border-border bg-surface-1 hover:border-brand/40"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl border transition-colors",
                      on
                        ? "border-brand/50 bg-brand/15 text-brand"
                        : "border-border bg-surface-2 text-brand-3 group-hover:text-brand"
                    )}
                  >
                    <Icon name={it.icon} className="size-[18px]" />
                  </span>

                  <span className="mt-4 font-display text-[0.95rem] font-bold leading-snug tracking-tight text-fg">
                    {it.label}
                  </span>
                  <span className="mt-1.5 text-xs leading-relaxed text-muted">{it.body}</span>

                  {/* Confirmation mark, spring-morphed between cards. */}
                  {on ? (
                    <motion.span
                      layoutId="intent-check"
                      transition={SPRING}
                      className="absolute right-4 top-4 grid size-5 place-items-center rounded-full bg-brand text-white"
                    >
                      <Check aria-hidden className="size-3" />
                    </motion.span>
                  ) : null}
                </motion.button>
              );
            })}
          </div>

          {/* Appears only once a choice is made — the hero has now advanced. */}
          <motion.div
            initial={false}
            animate={{ opacity: selected ? 1 : 0, y: selected ? 0 : -6 }}
            transition={{ duration: DUR.base, ease: EASE.out }}
            aria-hidden={!selected}
            className="mt-7 flex justify-center"
          >
            <a
              href="#start"
              className={cn(
                "inline-flex min-h-11 items-center gap-2 text-sm text-brand transition-colors hover:text-brand-3",
                !selected && "pointer-events-none"
              )}
            >
              <span className="link-underline pb-0.5">Continue to the details</span>
              <ArrowRight aria-hidden className="size-3.5" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
