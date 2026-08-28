import * as React from "react";
import { cn } from "@/lib/utils";

/** Mono, uppercase, tracked section kicker with an aurora dot. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-muted",
        className
      )}
    >
      <span className="aurora-gradient size-1.5 rounded-full" aria-hidden />
      {children}
    </span>
  );
}
