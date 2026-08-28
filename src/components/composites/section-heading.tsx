import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  /** Sits opposite the title on wide screens — use for a section-level link. */
  aside?: React.ReactNode;
  link?: { label: string; href: string };
  className?: string;
};

/**
 * The eyebrow + heading + lede block, which was hand-rolled in eight different
 * sections with slightly different margins each time. One implementation keeps
 * the vertical rhythm identical everywhere.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  aside,
  link,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "grid gap-6",
        centered ? "mx-auto max-w-2xl text-center" : "lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10",
        className
      )}
    >
      <Reveal>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn(
            "mt-4 font-display font-extrabold tracking-[-0.025em]",
            centered ? "text-h1" : "max-w-2xl text-h1"
          )}
        >
          {title}
        </h2>
        {body ? (
          <p className={cn("mt-4 text-body-lg text-muted", centered ? "" : "max-w-xl")}>{body}</p>
        ) : null}
      </Reveal>

      {aside ? <Reveal delay={0.1}>{aside}</Reveal> : null}

      {link && !aside ? (
        <Reveal delay={0.1}>
          <Link
            href={link.href}
            className="inline-flex items-center gap-1.5 text-sm text-brand transition-colors hover:text-brand-3"
          >
            <span className="link-underline pb-0.5">{link.label}</span>
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Section + Container + heading, the shape almost every section starts with. */
export function SectionIntro(props: SectionHeadingProps & { id?: string }) {
  const { id, ...heading } = props;
  return (
    <Container>
      <SectionHeading {...heading} />
      {id ? <span id={id} className="sr-only" /> : null}
    </Container>
  );
}
