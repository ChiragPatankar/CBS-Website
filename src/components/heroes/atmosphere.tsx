import { cn } from "@/lib/utils";

/**
 * Per-pillar background atmospheres.
 *
 * One brand, four temperatures. Every variant keeps the near-black ground, the
 * grid and the warm accent — what shifts is where the light comes from and how
 * cool the secondary note is. That is enough for a reader to feel they have moved
 * between sections of a site without ever feeling they have left it.
 *
 * All gradients, never `filter: blur()` — a large blur radius is the most
 * expensive raster operation on a mobile GPU and these sit under every hero.
 */
export type Atmosphere = "amber" | "ember" | "cool" | "violet" | "neutral";

const LAYERS: Record<Atmosphere, { primary: string; secondary: string; gridOpacity: string }> = {
  /** Marketplace — warm amber, light from high right. Goods, shelves, catalogue. */
  amber: {
    primary:
      "radial-gradient(115% 80% at 78% -5%, color-mix(in oklab, #e8b06a 22%, transparent) 0%, transparent 60%)",
    secondary:
      "radial-gradient(85% 60% at 8% 100%, color-mix(in oklab, #d9773f 16%, transparent) 0%, transparent 64%)",
    gridOpacity: "opacity-30",
  },
  /** Digital commerce growth — hotter, more energy, light lower and closer. */
  ember: {
    primary:
      "radial-gradient(105% 75% at 62% 8%, color-mix(in oklab, #f0562d 26%, transparent) 0%, transparent 58%)",
    secondary:
      "radial-gradient(75% 60% at 96% 88%, color-mix(in oklab, #f0562d 14%, transparent) 0%, transparent 62%)",
    gridOpacity: "opacity-40",
  },
  /** Technology — cooler and flatter, brand warmth pulled back to a rim. */
  cool: {
    primary:
      "radial-gradient(120% 85% at 50% -10%, color-mix(in oklab, #8a8f9c 13%, transparent) 0%, transparent 62%)",
    secondary:
      "radial-gradient(70% 55% at 88% 92%, color-mix(in oklab, #d9773f 13%, transparent) 0%, transparent 60%)",
    gridOpacity: "opacity-50",
  },
  /** AI — the one place a cool accent is allowed to read as intelligence. */
  violet: {
    primary:
      "radial-gradient(110% 80% at 70% 0%, color-mix(in oklab, #f0562d 18%, transparent) 0%, transparent 58%)",
    secondary:
      "radial-gradient(80% 65% at 18% 95%, color-mix(in oklab, #7c5cff 16%, transparent) 0%, transparent 64%)",
    gridOpacity: "opacity-45",
  },
  /** Company pages — quiet, editorial, almost no colour event. */
  neutral: {
    primary:
      "radial-gradient(120% 70% at 50% -8%, color-mix(in oklab, #d9773f 14%, transparent) 0%, transparent 58%)",
    secondary:
      "radial-gradient(60% 50% at 90% 100%, color-mix(in oklab, #e8b06a 9%, transparent) 0%, transparent 62%)",
    gridOpacity: "opacity-25",
  },
};

export function HeroAtmosphere({
  variant = "ember",
  /** Adds slow drift. Off for text-dense heroes where movement behind copy distracts. */
  animate = true,
  className,
}: {
  variant?: Atmosphere;
  animate?: boolean;
  className?: string;
}) {
  const l = LAYERS[variant];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn("absolute inset-0", animate && "animate-[atm-drift-a_38s_ease-in-out_infinite_alternate]")}
        style={{ background: l.primary }}
      />
      <div
        className={cn("absolute inset-0", animate && "animate-[atm-drift-b_52s_ease-in-out_infinite_alternate]")}
        style={{ background: l.secondary }}
      />
      <div className={cn("absolute inset-0 grid-bg", l.gridOpacity)} />
      {/* Vignette last, over every light source, so heroes end cleanly at the fold. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 85% at 50% 40%, transparent 45%, var(--color-bg) 98%)",
        }}
      />
    </div>
  );
}

/** Maps a pillar slug to its atmosphere so pages cannot drift apart. */
export function atmosphereForPillar(pillar: string): Atmosphere {
  if (pillar === "marketplace") return "amber";
  if (pillar === "growth") return "ember";
  if (pillar === "technology") return "cool";
  return "neutral";
}
