import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { HeroEditorial } from "@/components/heroes/shells";
import { SectionHeading } from "@/components/composites/section-heading";
import { GlobalReach } from "@/components/sections/global-reach";
import { StatsBand } from "@/components/sections/stats-band";
import { ClientWall } from "@/components/sections/client-wall";
import { CTA } from "@/components/sections/cta";
import { about } from "@/content/about";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: about.seo.title,
  description: about.seo.description,
  path: "/about",
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      {/* Editorial composition: no visual column at all. On a company page the
          claim IS the content, so the headline gets the full measure and the
          verified numbers carry the credibility instead of a decorative card. */}
      <HeroEditorial
        eyebrow={about.eyebrow}
        title={about.h1}
        sub={about.sub}
        breadcrumbs={CRUMBS}
        primary={{ label: "Book a growth call", href: "/contact" }}
        secondary={{ label: "How we work", href: "/approach" }}
        atmosphere="neutral"
        facts={[
          { label: "Years operating", value: "9+" },
          { label: "Brands scaled", value: about.reach.brands },
          { label: "Marketplaces", value: about.reach.marketplaces },
          { label: "Countries served", value: about.reach.countries },
        ]}
      />

      {/* ── Opening statement. One paragraph at display scale, nothing else on
             screen. The page earns its editorial claim by giving it room. ── */}
      <Section>
        <Container>
          <Reveal>
            <p className="max-w-4xl font-display text-h2 font-bold leading-[1.2] tracking-[-0.02em] text-fg/90">
              {about.lede}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── The story. A sticky-label timeline: the heading pins on the left while
             the entries scroll past, so the reader keeps their place in the
             narrative without the section re-announcing itself. ── */}
      <Section id="story" className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>The story</Eyebrow>
              <h2 className="mt-4 font-display text-h1 font-extrabold tracking-[-0.025em]">
                Nine years of learning where margin actually hides
              </h2>
              <p className="mt-4 text-body-lg text-muted">
                We did not start with a thesis. We arrived at one by running other
                people&rsquo;s accounts.
              </p>
            </div>

            <ol className="relative border-l border-border">
              {about.timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.05}>
                  <li className="relative pb-12 pl-8 last:pb-0">
                    {/* Node on the rail. */}
                    <span
                      aria-hidden
                      className="absolute -left-[5px] top-1.5 size-[9px] rounded-full border border-brand bg-bg"
                    />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand">
                      {t.year}
                    </span>
                    <h3 className="mt-3 font-display text-h3 font-bold tracking-tight">
                      {t.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{t.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ── Beliefs. Large editorial statements, numbered because they are a
             ranked argument rather than a menu. ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading eyebrow="What we believe" title="Four positions we will argue for" />

          <div className="mt-16 border-t border-border">
            {about.beliefs.map((b, i) => (
              <Reveal key={b.statement} delay={i * 0.05}>
                <div className="grid gap-5 border-b border-border py-11 lg:grid-cols-[auto_1.1fr_1fr] lg:items-start lg:gap-12">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint lg:pt-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-h3 font-bold leading-[1.25] tracking-[-0.015em] text-fg">
                    {b.statement}
                  </p>
                  <p className="text-sm leading-relaxed text-muted lg:pt-1.5">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reused from the homepage on purpose — the reach story is the same fact,
          and re-visualising it differently here would imply it is a different one. */}
      <GlobalReach />

      {/* ── Differentiators ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="Why brands stay"
            title="Three things that are unusual about working with us"
            body="85% of clients renew annually. These are the reasons they give."
          />
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {about.differentiators.map((d) => (
              <article
                key={d.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 p-7"
              >
                <span
                  aria-hidden
                  className="absolute -right-4 -top-6 font-display text-[5.5rem] font-extrabold leading-none text-brand/[0.07]"
                >
                  {d.n}
                </span>
                <h3 className="font-display text-h3 font-bold tracking-tight">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.body}</p>
              </article>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Capabilities. A dense two-column index rather than six cards — this is
             reference material, and cards would triple its height for no gain. ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="How we operate"
            title="Everything we run, in one list"
            link={{ label: "See all solutions", href: "/solutions" }}
          />
          <RevealGroup className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {about.capabilities.map((c) => (
              <div key={c.title}>
                <h3 className="border-b border-border pb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-3">
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm text-muted">
                      <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-brand/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <StatsBand
        eyebrow="Proof"
        title="What nine years adds up to"
        body="Every figure here is portfolio-wide and verifiable. We do not publish per-client numbers without permission."
      />

      <ClientWall />

      <CTA
        eyebrow="Work with us"
        title="Tell us where the margin is going"
        body="Most first calls end with us naming one thing you could fix without hiring anyone. Sometimes that is the whole engagement."
      />
    </>
  );
}
