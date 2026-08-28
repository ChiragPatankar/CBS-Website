import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/primitives/container";
import { Reveal } from "@/components/primitives/reveal";
import { site } from "@/config/site";

type Action = { label: string; href: string };

type CTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: Action;
  /** Pass `null` to render a single-action CTA. */
  secondary?: Action | null;
};

/**
 * Every prop is optional and falls back to the homepage closer, so the existing
 * zero-prop call sites keep rendering identically while twenty other pages can
 * each end on their own words. React always passes an object, so all-optional
 * props need no default parameter.
 */
export function CTA({ eyebrow, title, body, primary, secondary }: CTAProps) {
  const head = title ?? "Ready to grow smarter, faster, and more profitably?";
  const copy =
    body ??
    "Book a growth call and an ecommerce specialist will map your next steps — or get an AI-generated audit in two minutes.";
  const one = primary ?? { label: site.cta.primary, href: "/contact" };
  const two = secondary === null ? null : (secondary ?? { label: site.cta.secondary, href: "/ai-audit" });

  return (
    <Section className="border-t border-border/60">
      <Container>
        <Reveal
          y={20}
          className="glass glow-brand inner-lip relative overflow-hidden rounded-[28px] px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute left-1/2 top-[-40%] h-[420px] w-[720px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, #f0562d 30%, transparent), transparent 72%)",
              }}
            />
            <div className="absolute inset-0 grid-bg opacity-25" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/70 px-3 py-1 text-xs text-muted">
            <span className="ember-gradient size-1.5 rounded-full" />
            {eyebrow ?? "Let’s build profit-driven success together"}
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl font-display text-h1 font-extrabold tracking-[-0.025em]">
            {head}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted">{copy}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="cta-shimmer">
              <Link href={one.href}>
                {one.label} <ArrowRight className="size-4" />
              </Link>
            </Button>
            {two ? (
              <Button asChild size="lg" variant="secondary">
                <Link href={two.href}>{two.label}</Link>
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
