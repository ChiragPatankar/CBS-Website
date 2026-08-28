"use client";

import * as React from "react";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { LeadForm } from "@/components/composites/lead-form";
import { ContactHero, type Intent } from "@/components/heroes/contact-hero";
import { contact } from "@/content/contact";
import { site } from "@/config/site";

/**
 * Client half of the contact page.
 *
 * Exists so the interactive hero and the form can share the chosen intent while
 * the route itself stays a Server Component that owns `metadata`. The hero
 * selection pre-fills the form's interest field, which is the point of putting a
 * chooser in the hero at all — otherwise it would just be decoration the reader
 * has to repeat.
 */
export function ContactClient() {
  const [intent, setIntent] = React.useState<Intent | null>(null);

  const onSelect = (next: Intent) => {
    setIntent(next);
    // Respect a reduced-motion preference for the scroll as well as the animation.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("start")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  // Pre-select the matching option without mutating the content module.
  const fields = React.useMemo(
    () =>
      contact.fields.map((f) =>
        f.name === "interest" && intent ? { ...f, defaultValue: intent.interest } : f
      ),
    [intent]
  );

  return (
    <>
      <ContactHero selected={intent?.id ?? null} onSelect={onSelect} />

      <Section id="start" className="scroll-mt-24 border-t border-border/60">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-3">
                  What happens after you send this
                </p>
                <ol className="mt-6 space-y-6">
                  {contact.whatHappensNext.map((s) => (
                    <li key={s.title} className="grid grid-cols-[auto_1fr] gap-4">
                      <span className="grid size-8 place-items-center rounded-full border border-border-strong bg-surface-1 font-mono text-[0.66rem] tabular text-brand">
                        {s.n}
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold text-fg">{s.title}</h2>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="mt-11 space-y-2.5 border-t border-border pt-7">
                  {contact.valueRecap.map((v) => (
                    <li key={v} className="flex gap-3 text-sm text-fg/85">
                      <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-profit" />
                      {v}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10 flex flex-col gap-3 text-sm">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-11 items-center gap-2.5 text-muted transition-colors hover:text-fg"
                  >
                    <Mail aria-hidden className="size-4 text-faint" />
                    <span className="link-underline pb-0.5">{site.email}</span>
                  </a>
                  <p className="inline-flex items-center gap-2.5 text-muted">
                    <MapPin aria-hidden className="size-4 text-faint" />
                    {site.location}
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <div className="glass inner-lip rounded-[24px] border border-border-strong/60 p-6 sm:p-9">
                <h2 className="font-display text-h3 font-bold tracking-tight">
                  {intent ? intent.label : "Start a conversation"}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{contact.formIntro}</p>
                <div className="mt-8">
                  <LeadForm
                    fields={fields}
                    submitLabel={contact.submitLabel}
                    source={intent ? `contact-${intent.id}` : "contact-page"}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border/60">
        <Container>
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/ai-audit"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-3">
                Two minutes, no call
              </p>
              <h2 className="mt-4 font-display text-h3 font-bold tracking-tight">
                Take the AI growth audit
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                Five questions and a fixed scoring rule tell you which motion you
                are in and where to start. No email required to see the result.
              </p>
            </Link>
            <Link
              href="/solutions"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-3">
                Still researching
              </p>
              <h2 className="mt-4 font-display text-h3 font-bold tracking-tight">
                Read what we actually do
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                Twelve services across marketplace operations, commerce growth and
                the technology underneath.
              </p>
            </Link>
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
