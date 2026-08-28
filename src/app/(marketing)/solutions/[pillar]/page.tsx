import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { Icon } from "@/components/primitives/icon";
import { HeroEditorial } from "@/components/heroes/shells";
import { atmosphereForPillar } from "@/components/heroes/atmosphere";
import { SectionHeading } from "@/components/composites/section-heading";
import { CTA } from "@/components/sections/cta";
import { ClientWall } from "@/components/sections/client-wall";
import { pillars, getPillar, PILLAR_SLUGS } from "@/content/pillars";
import { services, serviceHref } from "@/content/services";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

/** All three pillars are prerendered; anything else is a 404 rather than an empty shell. */
export function generateStaticParams() {
  return PILLAR_SLUGS.map((pillar) => ({ pillar }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar } = await params;
  const p = getPillar(pillar);
  if (!p) return {};
  return pageMetadata({
    title: p.seo.title,
    description: p.seo.description,
    path: `/solutions/${p.slug}`,
  });
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  const p = getPillar(pillar);
  if (!p) notFound();

  const own = p.serviceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => !!s);

  const siblings = pillars.filter((x) => x.slug !== p.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: p.name, href: `/solutions/${p.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      {/* Pillar pages are chapter openers: typographic, no visual column, the
          pillar's own atmosphere. Deliberately unlike the service pages beneath
          them so the hierarchy is legible without reading the breadcrumb. */}
      <HeroEditorial
        eyebrow={p.eyebrow}
        title={p.h1}
        sub={p.sub}
        breadcrumbs={crumbs}
        primary={{ label: "Book a growth call", href: "/contact" }}
        secondary={{ label: "See all solutions", href: "/solutions" }}
        atmosphere={atmosphereForPillar(p.slug)}
        facts={p.outcomes.map((o) => ({ label: o.label, value: o.value }))}
      />

      {/* ── The tension. A single wide statement, no cards — this beat is a claim,
             and boxing a claim weakens it. ── */}
      <Section>
        <Container>
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-3">
              The problem
            </p>
            <p className="mt-6 max-w-4xl font-display text-h2 font-bold leading-[1.18] tracking-[-0.02em] text-fg/90">
              {p.tension}
            </p>
            <p className="mt-7 max-w-2xl text-body-lg text-muted">{p.intro}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Included services ── */}
      <Section id="services" className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="Included"
            title={`What sits inside ${p.name}`}
            body="Four services, run by one team. Take them together or start with the one that is bleeding."
          />

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {own.map((s) => (
              <Link
                key={s.slug}
                href={serviceHref(s)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-brand/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                    <Icon name={s.icon} />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-5 font-display text-h3 font-bold tracking-tight">{s.name}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{s.problem}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.platforms.slice(0, 4).map((pl) => (
                    <li
                      key={pl}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.62rem] text-faint"
                    >
                      {pl}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ClientWall />

      {/* ── Cross-links to the other two pillars ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="Also relevant"
            title="The other two pillars"
            body="Most brands eventually need all three. These are the neighbours of this one."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                <h3 className="flex items-center gap-2 font-display text-h3 font-bold tracking-tight">
                  {s.name}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.tension}</p>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CTA
        eyebrow={p.name}
        title={`Let’s talk about ${p.name.toLowerCase()}`}
        body="Tell us where the margin is leaking and we will tell you honestly whether this pillar is the fix."
      />
    </>
  );
}
