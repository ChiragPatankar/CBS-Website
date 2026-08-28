import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { Icon } from "@/components/primitives/icon";
import { HeroStacked } from "@/components/heroes/shells";
import { HubVisual } from "@/components/heroes/hub-visual";
import { SectionHeading } from "@/components/composites/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
import { TwoMotion } from "@/components/sections/two-motion";
import { CTA } from "@/components/sections/cta";
import { pillars } from "@/content/pillars";
import { services, serviceHref } from "@/content/services";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions — marketplace, growth and technology",
  description:
    "The full CrossBorder portfolio: marketplace operations, full-funnel commerce growth, and the technology underneath both. Twelve services across three pillars.",
  path: "/solutions",
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
];

export default function SolutionsHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      {/* Stacked composition with a portfolio map below the copy — the hub's job
          is to show the shape of the whole offer, so the visual is an index
          rather than an illustration of any one service. */}
      <HeroStacked
        eyebrow="The portfolio"
        title="Everything it takes to sell profitably, in one place"
        sub="Three pillars, twelve services, one operating team. Most brands come to us for one and stay for the others — so the pillars are built to run together rather than as separate retainers."
        primary={{ label: "Book a growth call", href: "/contact" }}
        secondary={{ label: "Not sure where to start?", href: "/ai-audit" }}
        atmosphere="neutral"
        visual={<HubVisual />}
      />

      {/* ── Pillar overview. An editorial three-row ledger rather than three
             cards: each row gets room for a real positioning paragraph, and the
             asymmetry keeps the hub from reading like a pricing table. ── */}
      <Section id="pillars">
        <Container>
          <SectionHeading
            eyebrow="Three pillars"
            title="Where brands stall, and which pillar fixes it"
            body="Each pillar exists because of a specific failure mode we kept seeing. Start with the one that matches where you are."
          />

          <div className="mt-16 border-t border-border">
            {pillars.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/solutions/${p.slug}`}
                  className="group/row relative grid gap-6 border-b border-border py-10 transition-colors hover:bg-surface-1/50 lg:grid-cols-[auto_1fr_1.1fr] lg:items-start lg:gap-10"
                >
                  <span
                    aria-hidden
                    className="row-rail absolute inset-y-0 left-0 w-[2px] ember-gradient"
                  />

                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint lg:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="flex items-start gap-2 font-display text-h2 font-extrabold tracking-[-0.025em]">
                      {p.name}
                      <ArrowUpRight
                        aria-hidden
                        className="mt-2 size-5 shrink-0 text-brand opacity-0 transition-all duration-300 group-hover/row:translate-x-0.5 group-hover/row:opacity-100"
                      />
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{p.tension}</p>
                  </div>

                  <div className="lg:pt-2">
                    <p className="text-body-lg text-fg/85">{p.intro}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.serviceSlugs.map((slug) => {
                        const s = services.find((x) => x.slug === slug);
                        if (!s) return null;
                        return (
                          <li
                            key={slug}
                            className="rounded-full border border-border bg-surface-1 px-3 py-1 font-mono text-[0.68rem] text-muted"
                          >
                            {s.navLabel}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Full service index, grouped by pillar ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="All twelve"
            title="The full service index"
            body="Every engagement is assembled from these. Nothing here is sold as a package you cannot change."
          />

          <div className="mt-14 space-y-14">
            {pillars.map((p) => (
              <div key={p.slug}>
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-3">
                    {p.name}
                  </h3>
                  <Link
                    href={`/solutions/${p.slug}`}
                    className="shrink-0 text-xs text-muted transition-colors hover:text-fg"
                  >
                    <span className="link-underline pb-0.5">Pillar overview</span>
                  </Link>
                </div>

                <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {p.serviceSlugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug);
                    if (!s) return null;
                    return (
                      <Link
                        key={s.slug}
                        href={serviceHref(s)}
                        className="group flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                      >
                        <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                          <Icon name={s.icon} className="size-[18px]" />
                        </span>
                        <h4 className="mt-4 font-display text-[0.98rem] font-bold leading-snug tracking-tight">
                          {s.navLabel}
                        </h4>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">
                          {s.eyebrow}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-brand">
                          View
                          <ArrowUpRight aria-hidden className="size-3" />
                        </span>
                      </Link>
                    );
                  })}
                </RevealGroup>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reused deliberately: the two motions are the same idea on every page
          that explains how we engage, so re-telling it differently here would
          fragment the story rather than reinforce it. */}
      <TwoMotion />

      <StatsBand />
      <CTA
        title="Not sure which pillar you need?"
        body="Take the two-minute growth audit and we will point you at the right starting place — or book a call and we will work it out together."
        primary={{ label: "Get your AI audit", href: "/ai-audit" }}
        secondary={{ label: "Book a growth call", href: "/contact" }}
      />
    </>
  );
}
