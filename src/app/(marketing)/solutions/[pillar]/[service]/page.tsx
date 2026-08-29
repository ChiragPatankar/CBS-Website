import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { Icon } from "@/components/primitives/icon";
import { ServiceHero } from "@/components/heroes/service-hero";
import { SectionHeading } from "@/components/composites/section-heading";
import { FeatureCard, StepItem } from "@/components/composites/feature-card";
import { FaqSection } from "@/components/composites/faq-section";
import { StatsBand } from "@/components/sections/stats-band";
import { CTA } from "@/components/sections/cta";
import { getPillar } from "@/content/pillars";
import { services, getService, serviceHref, SERVICE_PARAMS } from "@/content/services";
import {
  pageMetadata,
  JsonLd,
  breadcrumbJsonLd,
  serviceJsonLd,
  faqJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_PARAMS;
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; service: string }>;
}): Promise<Metadata> {
  const { pillar, service } = await params;
  const s = getService(pillar, service);
  if (!s) return {};
  return pageMetadata({
    title: s.seo.title,
    description: s.seo.description,
    path: serviceHref(s),
    // Unreviewed drafts stay out of the index until a human has checked them.
    noindex: s.status !== "published",
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ pillar: string; service: string }>;
}) {
  const { pillar, service } = await params;
  const s = getService(pillar, service);
  if (!s) notFound();

  const p = getPillar(s.pillar);
  const related = services
    .filter((x) => x.pillar === s.pillar && x.slug !== s.slug)
    .slice(0, 3);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    ...(p ? [{ label: p.name, href: `/solutions/${p.slug}` }] : []),
    { label: s.navLabel, href: serviceHref(s) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={serviceJsonLd({
          name: s.name,
          description: s.seo.description,
          path: serviceHref(s),
        })}
      />
      {s.faqs.length ? <JsonLd data={faqJsonLd(s.faqs)} /> : null}

      {/* No on-page draft banner. The four `draft-unreviewed` services
          (web-development, cloud, mobile-apps, ai-ml) read as finished copy by
          decision of the site owner, who is the authority on whether they
          describe the real offering.

          `status` still drives `noindex` in generateMetadata above, and those
          pages are still excluded from the sitemap, so they stay out of search
          until someone flips them to "published". `reviewNote` is retained in
          the content files as the record of what needs checking. */}

      {/* Composition, visual and atmosphere are chosen per service — no two
          siblings in a pillar share a layout. See heroes/service-hero.tsx. */}
      <ServiceHero
        service={s}
        breadcrumbs={crumbs}
        pillarName={p?.name}
        pillarHref={p ? `/solutions/${p.slug}` : undefined}
      />

      {/* ── The problem. Large-type statement, deliberately uncontained. ── */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
            <Reveal>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-3 lg:writing-mode-vertical">
                The problem
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-4xl font-display text-h2 font-bold leading-[1.18] tracking-[-0.02em] text-fg/90">
                {s.problem}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Benefits ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="What changes"
            title={`What ${s.navLabel.toLowerCase()} actually gets you`}
          />
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {s.benefits.map((b) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Process. A vertical timeline with a drawn connector, not cards —
             a sequence should look like a sequence. ── */}
      <Section className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="How it works"
                title="The operating sequence"
                body="Same order every time. It is the part clients tell us they were missing."
              />
            </div>
            <Reveal delay={0.08}>
              <ol>
                {s.steps.map((st, i) => (
                  <StepItem
                    key={st.title}
                    index={i}
                    title={st.title}
                    body={st.body}
                    isLast={i === s.steps.length - 1}
                  />
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Deliverables ── */}
      <Section className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="Deliverables"
            title="What lands in your account"
            body="Concrete artefacts, not a monthly slide deck."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {s.deliverables.map((d) => (
              <div key={d.title} className="group bg-surface-1 p-6 transition-colors hover:bg-surface-2">
                <span className="grid size-10 place-items-center rounded-lg border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                  <Icon name={d.icon} className="size-[18px]" />
                </span>
                <h3 className="mt-4 font-display text-[1rem] font-bold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <StatsBand
        eyebrow="Track record"
        title="The numbers behind the team running this"
        body="Portfolio-wide figures across every channel we operate. We do not publish per-client results without permission."
      />

      <FaqSection faqs={s.faqs} />

      {/* ── Related services in the same pillar ── */}
      {related.length ? (
        <Section className="border-t border-border/60">
          <Container>
            <SectionHeading
              eyebrow="Next door"
              title={p ? `More in ${p.name}` : "Related services"}
            />
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={serviceHref(r)}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                >
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                    <Icon name={r.icon} className="size-[18px]" />
                  </span>
                  <h3 className="mt-4 font-display text-[1rem] font-bold tracking-tight">
                    {r.navLabel}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{r.eyebrow}</p>
                </Link>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <CTA
        eyebrow={s.navLabel}
        title={`Ready to fix ${s.navLabel.toLowerCase()}?`}
        body="Book a call and we will walk your account, name what is actually costing you margin, and tell you whether we are the right team for it."
      />
    </>
  );
}
