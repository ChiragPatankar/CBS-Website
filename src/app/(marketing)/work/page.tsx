import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { WorkHero } from "@/components/heroes/work-hero";
import { SectionHeading } from "@/components/composites/section-heading";
import { ReviewNotice, DraftBadge } from "@/components/composites/review-notice";
import { ClientWall } from "@/components/sections/client-wall";
import { StatsBand } from "@/components/sections/stats-band";
import { CTA } from "@/components/sections/cta";
import { caseStudies, hasPublishedCaseStudies } from "@/content/work";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work — client outcomes and case studies",
  description:
    "How CrossBorder operates marketplace and DTC channels for consumer brands. Case studies in preparation; verified portfolio results available today.",
  path: "/work",
  // The index stays out of search until at least one study is real.
  noindex: !hasPublishedCaseStudies,
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
];

export default function WorkIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      {!hasPublishedCaseStudies ? <ReviewNotice kind="placeholder" /> : null}

      {/* Layered composition: case-study cards drift behind oversized type on a
          parallax offset. The work reads as texture, the statement reads first. */}
      <WorkHero studies={caseStudies} />

      {/* ── Verified proof leads, because it is the only real evidence here. Putting
             the placeholder grid first would imply the studies are the substance. ── */}
      <StatsBand
        eyebrow="Verified"
        title="What is true across the portfolio"
        body="These aggregates cover every brand and channel we have operated. They are the numbers we are willing to put in writing today."
      />

      <ClientWall />

      {/* ── Case-study grid. Every card is visibly marked, so a screenshot of any
             one of them still cannot be mistaken for a real client result. ── */}
      <Section id="studies" className="border-t border-border/60">
        <Container>
          <SectionHeading
            eyebrow="In preparation"
            title="Case studies, structured and awaiting approval"
            body="The layouts below are final. Client names, narratives and figures are placeholders — nothing here is a real result."
          />

          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                {/* Accent wash keyed to the study, so the grid reads as distinct
                    entries rather than six identical tiles. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-52 rounded-full opacity-[0.13] transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: `radial-gradient(closest-side, ${cs.accent}, transparent)` }}
                />

                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                    {cs.industry}
                  </span>
                  {cs.draft ? <DraftBadge label="Sample" /> : null}
                </div>

                <h3 className="mt-5 font-display text-h3 font-bold leading-snug tracking-tight">
                  {cs.headline}
                </h3>
                <p className="mt-2.5 text-sm text-muted">{cs.client}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{cs.summary}</p>

                <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-border pt-5">
                  {cs.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <dd className="font-display text-lg font-bold tabular text-fg/70">
                        {m.value}
                      </dd>
                      <dt className="mt-1 text-[0.68rem] leading-tight text-faint">{m.label}</dt>
                    </div>
                  ))}
                </dl>

                {cs.draft ? (
                  <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-signal/80">
                    Illustrative figures — not client results
                  </p>
                ) : null}

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read the structure
                  <ArrowUpRight aria-hidden className="size-3" />
                </span>
              </Link>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Honest framing of what a real study will contain ── */}
      <Section className="border-t border-border/60">
        <Container>
          <Reveal>
            <div className="glass inner-lip rounded-[28px] border border-border-strong/60 p-8 sm:p-12">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-3">
                What a published study will include
              </p>
              <p className="mt-5 max-w-2xl font-display text-h3 font-bold leading-snug tracking-tight">
                Named client, dated period, the baseline we inherited, what we
                changed, and the figures with their methodology stated.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                If a number is blended, we will say so. If a result was seasonal,
                we will say so. Anything we cannot evidence does not go on the page
                — which is why this section is currently short.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTA
        eyebrow="Due diligence"
        title="Want references before you commit?"
        body="Ask on the call. We will connect you with current clients in your category who agreed to speak to prospects."
      />
    </>
  );
}
