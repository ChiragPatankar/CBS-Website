"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/primitives/icon";
import { SPRING_HOVER } from "@/lib/motion/tokens";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * The one card in the system. Every grid of "thing with an icon, a title and a
 * sentence" routes through this rather than each section re-deriving its own
 * padding, radius, border and hover — which is how a site starts looking like a
 * component-library demo.
 */
export function FeatureCard({
  icon,
  title,
  body,
  /** Rendered top-right — a tag, a step number, a metric. */
  marker,
  className,
}: {
  icon?: IconName;
  title: string;
  body: string;
  marker?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={SPRING_HOVER}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 transition-colors hover:border-border-strong",
        className
      )}
    >
      {/* Hover bloom. Opacity-only, so it composites without repainting. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-brand/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        {icon ? (
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
            <Icon name={icon} />
          </span>
        ) : null}
        {marker}
      </div>

      <h3 className="mt-5 font-display text-h3 font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </motion.article>
  );
}

/** Numbered process step. The number is the structural device, so it is typeset
 *  as data (mono, tabular) rather than decorated. */
export function StepItem({
  index,
  title,
  body,
  isLast,
}: {
  index: number;
  title: string;
  body: string;
  isLast?: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 pb-10 last:pb-0">
      {/* Connector, drawn as a border so it costs no extra element. */}
      {!isLast ? (
        <span
          aria-hidden
          className="absolute left-[22px] top-12 bottom-2 w-px bg-gradient-to-b from-border-strong to-transparent"
        />
      ) : null}
      <span className="grid size-11 place-items-center rounded-full border border-border-strong bg-surface-1 font-mono text-xs tabular text-brand">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="pt-2.5">
        <h3 className="font-display text-h3 font-bold tracking-tight">{title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </li>
  );
}
