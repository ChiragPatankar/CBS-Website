import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { HeroAtmosphere, type Atmosphere } from "@/components/heroes/atmosphere";
import { cn } from "@/lib/utils";

/**
 * Six hero COMPOSITIONS — deliberately not one parameterised template.
 *
 * The previous `PageHero` took title/sub/icon/aside and produced the same
 * breadcrumb-eyebrow-huge-left-heading-glass-card-right on every inner page.
 * Technically clean, visually identical: the exact failure this replaces.
 *
 * These six differ in *structure*, not just content — where the visual sits, how
 * wide the measure is, whether copy is centred or offset, whether the visual is
 * contained or full-bleed. A page picks the composition that suits its story, so
 * two adjacent pages read as different designs from one studio.
 */

type Action = { label: string; href: string };
type Crumb = { label: string; href: string };

type Common = {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  primary?: Action;
  secondary?: Action;
  breadcrumbs?: Crumb[];
  atmosphere?: Atmosphere;
  className?: string;
};

/** Breadcrumbs, rendered small and quiet. Shared because orientation should not
 *  be re-invented per page — only the composition around it changes. */
function Crumbs({ items }: { items?: Crumb[] }) {
  if (!items?.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-7">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            <Link href={c.href} className="transition-colors hover:text-fg">
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Actions({ primary, secondary, className }: { primary?: Action; secondary?: Action; className?: string }) {
  if (!primary && !secondary) return null;
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {primary ? (
        <Button asChild size="lg" className="cta-shimmer">
          <Link href={primary.href}>
            {primary.label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      ) : null}
      {secondary ? (
        <Button asChild size="lg" variant="secondary">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   A · EDITORIAL
   Typography-first. Oversized headline at a wide measure, no visual column at
   all — the visual, if any, sits behind as atmosphere. For company pages where
   the claim is the content.
   ────────────────────────────────────────────────────────────────────────── */
export function HeroEditorial({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  breadcrumbs,
  atmosphere = "neutral",
  /** Small facts set as a rule beneath the copy, mono and tabular. */
  facts,
  className,
}: Common & { facts?: { label: string; value: string }[] }) {
  return (
    <section className={cn("relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24", className)}>
      <HeroAtmosphere variant={atmosphere} animate={false} />
      <Container>
        <Crumbs items={breadcrumbs} />
        <Reveal>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {/* Wider measure than the split shells, because there is no second
              column competing for width. */}
          <h1 className="mt-6 max-w-5xl font-display text-display font-extrabold leading-[0.98] tracking-[-0.035em]">
            {title}
          </h1>
        </Reveal>
        {sub ? (
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-body-lg leading-relaxed text-muted">{sub}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.14}>
          <Actions primary={primary} secondary={secondary} className="mt-10" />
        </Reveal>
        {facts?.length ? (
          <Reveal delay={0.2}>
            <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dd className="font-display text-h2 font-extrabold tabular tracking-[-0.02em]">
                    {f.value}
                  </dd>
                  <dt className="mt-2 font-mono text-[0.66rem] uppercase leading-tight tracking-[0.14em] text-faint">
                    {f.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   B · FULL-BLEED
   Visual spans the full width and carries the section; copy overlays the lower
   left. For geographic and topological stories that need horizontal room.
   ────────────────────────────────────────────────────────────────────────── */
export function HeroFullBleed({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  breadcrumbs,
  atmosphere = "amber",
  visual,
  className,
}: Common & { visual: React.ReactNode }) {
  return (
    <section className={cn("relative overflow-hidden pt-28 pb-16 sm:pt-32", className)}>
      <HeroAtmosphere variant={atmosphere} />

      <Container className="relative">
        <Crumbs items={breadcrumbs} />

        {/*
          The visual is capped by WIDTH, and that cap is the load-bearing part.
          These visuals author a ~600×340 viewBox with hairline strokes and 12px
          labels sized for roughly that scale. An earlier version let it fill a
          1500px column, which rendered 850px tall — it overran the reserved space,
          buried the headline below the fold, and scaled every stroke 2.5× into fat
          ribbons with 30px labels. Capping width caps height and stroke weight
          together, because an SVG scales uniformly.
        */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
          {/* Copy first in the DOM so it is what a screen reader and a crawler
              meet first, and what paints first on mobile. */}
          <div className="lg:order-1">
            <Reveal>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h1 className="mt-5 font-display text-h1 font-extrabold leading-[1.03] tracking-[-0.03em]">
                {title}
              </h1>
            </Reveal>
            {sub ? (
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-xl text-body-lg text-muted">{sub}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.14}>
              <Actions primary={primary} secondary={secondary} className="mt-9" />
            </Reveal>
          </div>

          <Reveal delay={0.16} className="lg:order-2">
            {/* Bleeds toward the viewport edge on wide screens without ever
                exceeding the width the visual was drawn for. */}
            <div className="mx-auto w-full max-w-[620px] lg:mx-0 lg:-mr-10 lg:max-w-[680px] xl:-mr-20">
              {visual}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   C · STACKED CENTRE
   Centred copy at a tight measure, visual below at full container width. For
   process and transformation stories that read left-to-right.
   ────────────────────────────────────────────────────────────────────────── */
export function HeroStacked({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  breadcrumbs,
  atmosphere = "amber",
  visual,
  className,
}: Common & { visual: React.ReactNode }) {
  return (
    <section className={cn("relative overflow-hidden pt-32 pb-16 sm:pt-36", className)}>
      <HeroAtmosphere variant={atmosphere} />
      <Container>
        <div className="flex justify-center">
          <Crumbs items={breadcrumbs} />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="mt-5 font-display text-h1 font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-display">
              {title}
            </h1>
          </Reveal>
          {sub ? (
            <Reveal delay={0.08}>
              <p className="mx-auto mt-6 max-w-xl text-body-lg text-muted">{sub}</p>
            </Reveal>
          ) : null}
          <Reveal delay={0.14}>
            <Actions primary={primary} secondary={secondary} className="mt-9 justify-center" />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16">{visual}</div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   D · OFFSET SPLIT
   Copy in a narrow left column, visual larger and bleeding right, vertically
   offset rather than centre-aligned. Asymmetric on purpose.
   ────────────────────────────────────────────────────────────────────────── */
export function HeroOffsetSplit({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  breadcrumbs,
  atmosphere = "ember",
  visual,
  className,
}: Common & { visual: React.ReactNode }) {
  return (
    <section className={cn("relative overflow-hidden pt-28 pb-16 sm:pt-32", className)}>
      <HeroAtmosphere variant={atmosphere} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12">
          {/* Copy sits high; the visual hangs lower. The mismatch is the point. */}
          <div className="lg:pt-6">
            <Crumbs items={breadcrumbs} />
            <Reveal>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h1 className="mt-5 font-display text-h1 font-extrabold leading-[1.04] tracking-[-0.03em]">
                {title}
              </h1>
            </Reveal>
            {sub ? (
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-md text-body-lg text-muted">{sub}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.14}>
              <Actions primary={primary} secondary={secondary} className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.16} className="lg:pt-24">
            {/* Negative right margin lets the visual run toward the viewport edge. */}
            <div className="lg:-mr-16 xl:-mr-24">{visual}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   E · FRAMED PANEL
   Visual held inside a bordered surface that reads as a product artefact, copy
   above it at a tight measure. For interface and device stories.
   ────────────────────────────────────────────────────────────────────────── */
export function HeroFramed({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  breadcrumbs,
  atmosphere = "cool",
  visual,
  /** Mono caption strip along the bottom of the frame. */
  frameLabel,
  className,
}: Common & { visual: React.ReactNode; frameLabel?: string }) {
  return (
    <section className={cn("relative overflow-hidden pt-32 pb-16 sm:pt-36", className)}>
      <HeroAtmosphere variant={atmosphere} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <Crumbs items={breadcrumbs} />
            <Reveal>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h1 className="mt-5 font-display text-h1 font-extrabold leading-[1.03] tracking-[-0.03em]">
                {title}
              </h1>
            </Reveal>
            {sub ? (
              <Reveal delay={0.08}>
                <p className="mt-6 text-body-lg text-muted">{sub}</p>
              </Reveal>
            ) : null}
          </div>
          <Reveal delay={0.12}>
            <Actions primary={primary} secondary={secondary} />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 overflow-hidden rounded-[24px] border border-border-strong/60 bg-surface-1/40 inner-lip">
            <div className="p-4 sm:p-8">{visual}</div>
            {frameLabel ? (
              <div className="border-t border-border/70 bg-surface-2/30 px-5 py-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                  {frameLabel}
                </span>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   F · DIAGRAM LED
   Visual dominates the upper two-thirds; copy is compact underneath in a
   three-column technical footer. For architecture stories where the diagram IS
   the explanation.
   ────────────────────────────────────────────────────────────────────────── */
export function HeroDiagram({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
  breadcrumbs,
  atmosphere = "cool",
  visual,
  /** Short technical notes set as a mono row under the diagram. */
  notes,
  className,
}: Common & { visual: React.ReactNode; notes?: { label: string; value: string }[] }) {
  return (
    <section className={cn("relative overflow-hidden pt-28 pb-16 sm:pt-32", className)}>
      <HeroAtmosphere variant={atmosphere} />
      <Container>
        <Crumbs items={breadcrumbs} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              {/* Smaller headline than the other shells — here the diagram leads. */}
              <h1 className="mt-4 font-display text-h1 font-extrabold leading-[1.06] tracking-[-0.028em]">
                {title}
              </h1>
            </Reveal>
            {sub ? (
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-md text-body-lg text-muted">{sub}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.14}>
              <Actions primary={primary} secondary={secondary} className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.18}>{visual}</Reveal>
        </div>

        {notes?.length ? (
          <Reveal delay={0.24}>
            <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-border pt-7 sm:grid-cols-3">
              {notes.map((n) => (
                <div key={n.label}>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-3">
                    {n.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{n.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
