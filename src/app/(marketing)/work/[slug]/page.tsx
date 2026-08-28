import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { ScrollProgressBar } from "@/components/primitives/scroll-progress-bar";
import { HeroFramed } from "@/components/heroes/shells";
import { SectionHeading } from "@/components/composites/section-heading";
import { ReviewNotice, DraftBadge } from "@/components/composites/review-notice";
import { StepItem } from "@/components/composites/feature-card";
import { CTA } from "@/components/sections/cta";
import { caseStudies } from "@/content/work";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

/**
 * Draft studies are still prerendered and shareable — they exist so the template
 * can be reviewed. They are simply kept out of the index and the sitemap. Filtering
 * them out of params would 404 the very pages under review.
 */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return pageMetadata({
    title: `${cs.headline} — case study`,
    description: cs.summary,
    path: `/work/${cs.slug}`,
    noindex: cs.draft,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const others = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 3);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: cs.industry, href: `/work/${cs.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ScrollProgressBar />

      {/* First element in the document, above the hero — unmissable. */}
      {cs.draft ? <ReviewNotice kind="placeholder" /> : null}

      {/* Framed composition: the at-a-glance panel is held inside a bordered
          surface captioned as illustrative, so the metrics read as an artefact
          under review rather than as a published result. */}
      <HeroFramed
        eyebrow={cs.industry}
        title={cs.headline}
        sub={cs.summary}
        breadcrumbs={crumbs}
        primary={{ label: "Book a growth call", href: "/contact" }}
        secondary={{ label: "All work", href: "/work" }}
        atmosphere="neutral"
        frameLabel={
          cs.draft
            ? "Illustrative figures — not client results"
            : `${cs.client} · ${cs.marketplaces.join(" · ")}`
        }
        visual={
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-h1 font-extrabold tabular leading-none tracking-[-0.03em] text-fg/75">
                  {m.value}
                </p>
                <p className="mt-3 font-mono text-[0.64rem] uppercase leading-tight tracking-[0.14em] text-faint">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        }
      />

      {/* ── Challenge ── */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Reveal>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-3">
                The challenge
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-3xl font-display text-h2 font-bold leading-[1.2] tracking-[-0.02em] text-fg/90">
                {cs.challenge}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Approach as a sequence ── */}
      <Section className="border-t border-border/60">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow="What we did" title="The sequence of work" />
            </div>
            <Reveal delay={0.08}>
              <ol>
                {cs.approach.map((a, i) => (
                  <StepItem
                    key={i}
                    index={i}
                    title={`Phase ${i + 1}`}
                    body={a}
                    isLast={i === cs.approach.length - 1}
                  />
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Results ── */}
      <Section className="border-t border-border/60">
        <Container>
          <Reveal>
            <div className="glass inner-lip rounded-[28px] border border-border-strong/60 p-8 sm:p-12">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-3">
                The outcome
              </p>
              <p className="mt-5 max-w-3xl font-display text-h3 font-bold leading-snug tracking-tight">
                {cs.results}
              </p>
              {cs.draft ? (
                <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-signal/80">
                  This outcome is placeholder text written to exercise the layout.
                  It will be replaced with a client-approved result, a dated
                  measurement period, and the methodology behind each figure.
                </p>
              ) : null}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Next studies ── */}
      {others.length ? (
        <Section className="border-t border-border/60">
          <Container>
            <SectionHeading eyebrow="Keep reading" title="Other engagements" />
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/work/${o.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                      {o.industry}
                    </span>
                    {o.draft ? <DraftBadge label="Sample" /> : null}
                  </div>
                  <h3 className="mt-4 font-display text-[1rem] font-bold leading-snug tracking-tight">
                    {o.headline}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    Read
                    <ArrowUpRight aria-hidden className="size-3" />
                  </span>
                </Link>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <CTA
        eyebrow="Your turn"
        title="Want this run on your account?"
        body="Book a call and we will tell you honestly whether your channel mix has the headroom for it."
      />
    </>
  );
}
