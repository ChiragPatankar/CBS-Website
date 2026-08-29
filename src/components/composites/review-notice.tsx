import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "draft-unreviewed" | "placeholder" | "legal-review";

const COPY: Record<Kind, { label: string; body: string }> = {
  // Nothing renders this kind any more — the four `draft-unreviewed` service
  // pages dropped their banner by decision of the site owner. Kept so the
  // banner can be restored with a one-line change, and because those pages are
  // still `noindex` on the same `status` field. Not dead by accident.
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
 *
 * The top padding is header clearance, not taste. This always renders first in
 * the page flow, and the site header is `fixed` with a transparent background
 * until you scroll — the marketing layout is a bare `<main>{children}</main>`
 * and every *section* pays for the header itself with its own `pt-32`. Without
 * the offset the banner rendered underneath the header, so the notice and the
 * nav overlapped into an unreadable pile at the top of the page.
 *
 * 4rem is the header's `h-16`; the rest is the banner's own breathing room.
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
        "border-y border-signal/25 bg-signal/[0.07] px-5 pb-3.5 pt-[calc(4rem+0.875rem)] sm:px-6",
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
