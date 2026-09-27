import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { HeroEditorial } from "@/components/heroes/shells";
import { SectionHeading } from "@/components/composites/section-heading";
import { FeatureCard } from "@/components/composites/feature-card";
import { CTA } from "@/components/sections/cta";
import { crossBorderServices as c, type RegionServices } from "@/content/cross-border-services";
import { pageMetadata, JsonLd, breadcrumbJsonLd, offerCatalogJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/cross-border-services",
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Cross-Border Services", href: "/cross-border-services" },
];

const ALL_REGIONS = [...c.regions, c.other];

export default function CrossBorderServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
      <JsonLd
        data={offerCatalogJsonLd({
          name: "Cross-Border Services",
          path: "/cross-border-services",
          groups: [
            { name: "Core services", items: c.core.map((s) => s.title) },
            ...ALL_REGIONS.map((r) => ({
              name: r.name,
              items: r.items,
              areaServed: r.id === "other" ? "India" : r.name,
            })),
          ],
        })}
      />

      <HeroEditorial
        eyebrow={c.eyebrow}
        title={c.h1}
        sub={c.sub}
        breadcrumbs={CRUMBS}
        primary={{ label: "Talk to an expert", href: "/contact" }}
        secondary={{ label: "Services by country", href: "#by-country" }}
        atmosphere="neutral"
        facts={[
          { label: "Core services", value: String(c.core.length) },
          { label: "Regions covered", value: String(c.regions.length) },
          {
            label: "Country-specific services",
            value: String(ALL_REGIONS.reduce((n, r) => n + r.items.length, 0)),
          },
          { label: "Freight modes: air, sea & land", value: "3" },
        ]}
      />

      {/* ── Core services ── */}
      <Section id="services">
        <Container>
          <SectionHeading
            eyebrow="Our services"
            title="Everything between your warehouse and a new market"
            body="Six services that cover market entry, tax, import, compliance, freight and fulfilment. Take one or let us run the whole route."
          />

          <RevealGroup
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            itemClassName="h-full"
          >
            {c.core.map((s) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Country-based services ── */}
      <Section id="by-country" className="scroll-mt-20 border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="By country"
            title="Country-based services for e-commerce sellers"
            body="Registrations, filings and compliance for each market, handled by people who work in that market every day."
          />

          {/* Jump links, so a seller can go straight to the country they care about. */}
          <Reveal delay={0.05}>
            <nav aria-label="Regions" className="mt-10 flex flex-wrap gap-2">
              {ALL_REGIONS.map((r) => (
                <a
                  key={r.id}
                  href={`#${r.id}`}
                  className="rounded-full border border-border bg-surface-1 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-brand/40 hover:text-fg"
                >
                  {r.name}
                </a>
              ))}
            </nav>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {c.regions.map((r) => (
              <RegionCard key={r.id} region={r} />
            ))}
          </RevealGroup>

          <Reveal className="mt-4">
            <RegionCard region={c.other} wide />
          </Reveal>
        </Container>
      </Section>

      <CTA
        eyebrow={c.eyebrow}
        title="Selling into a new country?"
        body="Tell us where you want to go and what you sell. We will tell you what it takes to register, import and stay compliant there."
        primary={{ label: "Talk to an expert", href: "/contact" }}
        secondary={null}
      />
    </>
  );
}

function RegionCard({ region, wide }: { region: RegionServices; wide?: boolean }) {
  return (
    <article
      id={region.id}
      className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-border bg-surface-1 p-6 sm:p-7"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
        <h3 className="font-display text-h3 font-bold tracking-tight">{region.name}</h3>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
          {region.items.length} services
        </span>
      </div>
      <ol className={wide ? "mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3" : "mt-5 space-y-3"}>
        {region.items.map((item, i) => (
          <li key={item} className="grid grid-cols-[1.75rem_1fr] text-sm leading-relaxed text-fg/85">
            <span className="pt-px font-mono text-[0.68rem] tabular text-brand-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </article>
  );
}
