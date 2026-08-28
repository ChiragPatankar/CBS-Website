import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { StatCounter } from "@/components/composites/stat-counter";
import { stats, type Stat } from "@/content/home";

type StatsBandProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  items?: Stat[];
  /** Hide the heading block when the section above already framed the numbers. */
  showHeading?: boolean;
};

/**
 * All props optional, defaulting to the verified portfolio aggregates — the only
 * numbers on this site that are substantiated. Pages may re-frame them but the
 * figures themselves come from one place.
 */
export function StatsBand({
  eyebrow = "By the numbers",
  title = "Outcomes that compound",
  body = "A decade of profit-first growth, measured where it matters — the P&L.",
  items,
  showHeading = true,
}: StatsBandProps) {
  const figures = items ?? stats;

  return (
    <Section className="border-t border-border/60">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40" />
      <Container>
        {showHeading ? (
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-h1 font-extrabold tracking-[-0.025em]">
                {title}
              </h2>
              <p className="mt-4 text-body-lg text-muted">{body}</p>
            </Reveal>
          </div>
        ) : null}

        {/* Staggered per counter rather than one reveal for the whole band, so the
            numbers arrive in sequence instead of as a single block. */}
        <RevealGroup
          delay={showHeading ? 0.1 : 0}
          className={`grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 ${
            showHeading ? "mt-14" : ""
          }`}
        >
          {figures.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              label={s.label}
            />
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
