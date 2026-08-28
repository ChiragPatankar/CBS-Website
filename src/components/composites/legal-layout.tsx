"use client";

import * as React from "react";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { ScrollProgressBar } from "@/components/primitives/scroll-progress-bar";
import { ReviewNotice } from "@/components/composites/review-notice";
import type { LegalDoc } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Prose layout with a sticky table of contents.
 *
 * The active-section highlight uses an IntersectionObserver rather than a scroll
 * handler: one observer for the whole document beats a listener recomputing
 * every heading's offset on every frame.
 *
 * Only the `<h2>` blocks reveal on scroll, never the paragraphs — long prose
 * that fades in as you read it is actively irritating.
 */
export function LegalLayout({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = React.useState(doc.sections[0]?.id ?? "");

  React.useEffect(() => {
    const headings = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Top-weighted band: the heading nearest the top of the reading area wins.
      { rootMargin: "-96px 0px -68% 0px" }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [doc.sections]);

  return (
    <>
      <ScrollProgressBar />

      {doc.reviewRequired ? <ReviewNotice kind="legal-review" /> : null}

      <section className="relative overflow-hidden border-b border-border/50 pt-32 pb-14 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 70% at 50% 0%, color-mix(in oklab, #f0562d 14%, transparent) 0%, transparent 62%)",
            }}
          />
        </div>
        <Container>
          <Reveal>
            <h1 className="font-display text-h1 font-extrabold tracking-[-0.03em]">{doc.title}</h1>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">
              Last updated {doc.updated}
            </p>
            {doc.intro ? (
              <p className="mt-6 max-w-2xl text-body-lg text-muted">{doc.intro}</p>
            ) : null}
          </Reveal>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky ToC — desktop only. On mobile it would push the actual
              document a screen and a half down the page. */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                On this page
              </p>
              <ul className="mt-4 space-y-1 border-l border-border">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={active === s.id ? "true" : undefined}
                      className={cn(
                        "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                        active === s.id
                          ? "border-brand text-fg"
                          : "border-transparent text-muted hover:border-border-strong hover:text-fg"
                      )}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="max-w-2xl">
            {doc.sections.map((s) => (
              <section key={s.id} className="mb-12 last:mb-0">
                {/* scroll-mt clears the fixed header when jumped to from the ToC. */}
                <Reveal>
                  <h2
                    id={s.id}
                    className="scroll-mt-28 font-display text-h3 font-bold tracking-tight"
                  >
                    {s.heading}
                  </h2>
                </Reveal>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
