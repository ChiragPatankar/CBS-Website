import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { Icon } from "@/components/primitives/icon";
import { HeroEditorial } from "@/components/heroes/shells";
import { SectionHeading } from "@/components/composites/section-heading";
import { StepItem } from "@/components/composites/feature-card";
import { StatsBand } from "@/components/sections/stats-band";
import { CTA } from "@/components/sections/cta";
import { approach } from "@/content/approach";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: approach.seo.title,
  description: approach.seo.description,
  path: "/approach",
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Approach", href: "/approach" },
];

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      {/* Editorial: the method is an argument, so it opens with type and the
          five-step sequence carries the visual weight further down. */}
      <HeroEditorial
        eyebrow={approach.eyebrow}
        title={approach.h1}
        sub={approach.sub}
        breadcrumbs={CRUMBS}
        primary={{ label: "Book a growth call", href: "/contact" }}
        secondary={{ label: "See the solutions", href: "/solutions" }}
        atmosphere="neutral"
      />

      {/* ── Philosophy. Two paragraphs at reading scale in a narrow measure — the
             one place on the site that is deliberately just prose. ── */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Reveal>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-3">
                Profit first
              </p>
            </Reveal>
            <div className="max-w-2xl">
              {approach.philosophy.map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p
                    className={
                      i === 0
                        ? "font-display text-h2 font-bold leading-[1.2] tracking-[-0.02em] text-fg/90"
                        : "mt-7 text-body-lg leading-relaxed text-muted"
                    }
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── The two motions. Side by side rather than a toggle: on this page the
             comparison IS the content, so hiding one behind a tab would bury it. ── */}
      <Section id="motions" className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="Two motions"
            title="Where you are decides what we do first"
            body="Every engagement is one of these. Naming which one you are in is usually the first useful thing that happens."
          />

          <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-2">
            {approach.motions.map((m) => (
              <article
                key={m.id}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 p-8"
              >
                {/* Directional accent: launch reads upward, scale reads across. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px ember-gradient"
                />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand">
                  {m.when}
                </span>
                <h3 className="mt-4 font-display text-h2 font-extrabold tracking-[-0.025em]">
                  {m.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{m.body}</p>

                <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
                  {m.focus.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-fg/85">
                      <span
                        aria-hidden
                        className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Method. Sticky heading, scrolling timeline. ── */}
      <Section className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="The method"
                title="Five steps, in this order, every time"
                body="Not a framework we invented to sound proprietary. Just the sequence that stops teams optimising the wrong thing."
              />
            </div>
            <Reveal delay={0.08}>
              <ol>
                {approach.methodSteps.map((st, i) => (
                  <StepItem
                    key={st.title}
                    index={i}
                    title={st.title}
                    body={st.body}
                    isLast={i === approach.methodSteps.length - 1}
                  />
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Tooling ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="What runs underneath"
            title="The instrumentation"
            body="Decisions are only as good as the numbers behind them. This is what we put in place before we start changing spend."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {approach.tooling.map((t) => (
              <div key={t.title} className="group bg-surface-1 p-7 transition-colors hover:bg-surface-2">
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                  <Icon name={t.icon} />
                </span>
                <h3 className="mt-5 font-display text-h3 font-bold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <StatsBand
        eyebrow="Does it work"
        title="What the method has produced"
        body="Portfolio-wide, across every channel we operate."
      />

      <CTA
        eyebrow="Start here"
        title="Find out which motion you are in"
        body="A two-minute audit will tell you whether you are still finding product-market fit on a channel or ready to squeeze it. Or just book a call."
        primary={{ label: "Get your AI audit", href: "/ai-audit" }}
        secondary={{ label: "Book a growth call", href: "/contact" }}
      />
    </>
  );
}
