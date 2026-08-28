import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Renders an icon from its registry name. No `"use client"` — it works in both
 * environments, which is the point: content files carry serialisable names and
 * the component boundary stays crossable.
 */
export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Glyph = icons[name] ?? icons.sparkles;
  return <Glyph aria-hidden className={cn("size-5", className)} />;
}
