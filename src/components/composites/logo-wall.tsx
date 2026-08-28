"use client";

import { cn } from "@/lib/utils";
import { useAmbientPause } from "@/hooks/use-ambient-pause";

/**
 * Infinite marquee logo wall. Fed by ONE array; the second copy is visual only
 * (duplicated in markup for a seamless loop, not in data) — the fix for the
 * old site's doubled logo DOM. Text wordmarks stand in for SVG logos.
 *
 * The loop is CSS-driven and pauses on hover, when scrolled off-screen, and
 * when the tab is backgrounded — the perf budget in docs/04 §8 requires the
 * last two.
 */
export function LogoWall({
  logos,
  reverse = false,
  className,
}: {
  logos: readonly string[];
  reverse?: boolean;
  className?: string;
}) {
  const { ref, paused } = useAmbientPause<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-[marquee-reverse_42s_linear_infinite]" : "animate-[marquee_42s_linear_infinite]",
          "group-hover:[animation-play-state:paused]",
          paused && "[animation-play-state:paused]"
        )}
      >
        {[...logos, ...logos].map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= logos.length}
            className="select-none whitespace-nowrap font-display text-xl font-semibold text-faint transition-colors duration-300 hover:text-fg"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
