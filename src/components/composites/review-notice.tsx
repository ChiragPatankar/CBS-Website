import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "draft-unreviewed" | "placeholder" | "legal-review";

const COPY: Record<Kind, { label: string; body: string }> = {
  "draft-unreviewed": {
    label: "Draft copy",
    body: "This page describes industry-standard practice and has not yet been checked against what CrossBorder actually delivers.",
  },
  placeholder: {
    label: "Sample content",
    body: "Structure and design are final. The client, narrative and figures on this page are placeholders pending approval — they are not real results.",
  },
  "legal-review": {
    label: "Awaiting legal review",
    body: "This document is a working draft and has not been reviewed by a legal professional. It is not yet binding.",
  },
};

/**
 * Full-width, non-dismissible honesty banner.
 *
 * Deliberately hard to miss: it is the mechanism that keeps unverified copy and
 * placeholder case studies from reading as fact, so a subtle treatment would
 * defeat the purpose. Paired with `robots: noindex` on the same pages.
 */
export function ReviewNotice({
  kind,
  note,
  className,
}: {
  kind: Kind;
  note?: string;
  className?: string;
}) {
  const { label, body } = COPY[kind];

  return (
    <aside
      className={cn(
        "border-y border-signal/25 bg-signal/[0.07] px-5 py-3.5 sm:px-6",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-start gap-3">
        <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-signal" />
        <p className="text-xs leading-relaxed text-muted">
          <span className="font-mono uppercase tracking-[0.14em] text-signal">{label}</span>
          <span className="mx-2 text-faint">·</span>
          {note ?? body}
        </p>
      </div>
    </aside>
  );
}

/** Compact inline variant for cards and list rows. */
export function DraftBadge({ label = "Draft", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-signal/35 bg-signal/10 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal",
        className
      )}
    >
      {label}
    </span>
  );
}
