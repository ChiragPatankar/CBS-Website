import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand lockup.
 *
 * This is the reversed (knockout) variant: pure-white wordmark, ember mark,
 * transparent ground. It replaced a navy version that measured **1.75:1** against
 * this site's near-black ground (#0a0908) — far under the 3:1 floor for large text
 * and logos — and therefore had to sit on a light plate to be legible at all.
 *
 * The white wordmark measures 19.9:1 and the mark 5.14:1 on the same ground, so
 * the plate is gone. The lockup now sits directly on the page, which is what it
 * was drawn for.
 *
 * ── Why the asset is 576×90 ─────────────────────────────────────────────────
 * The supplied file was 1536×1024 with the lockup occupying a band in the middle:
 * 80% of the canvas was empty alpha. Since the intrinsic box is what `height`
 * scales, that padding would have shrunk the visible mark to roughly a fifth of
 * its intended size, so `public/` holds a version cropped to the inked bounding
 * box and then resized.
 *
 * 576×90 is exactly 3× the 192×30 this paints at, which covers dpr-3 screens.
 * The size matters more than usual here: the Cloudflare Workers target runs with
 * `images.unoptimized`, so there is no `/_next/image` resizing at request time —
 * the browser downloads this file verbatim. Shipping the 1432px master would have
 * cost 58 kB for a 192px logo.
 *
 * These dimensions must stay in step with the file or the aspect ratio breaks.
 */
const ASSET_W = 576;
const ASSET_H = 90;

export function Logo({
  className,
  /** Rendered height in px. Width follows the asset's 576×90 ratio (6.4:1). */
  height = 30,
  priority = false,
}: {
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  // Derived rather than hardcoded so this stays correct if a caller changes
  // `height`. It also keeps the `sizes` hint truthful, which still matters on
  // any target where the optimizer IS active.
  const width = Math.round((height * ASSET_W) / ASSET_H);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logos/brand/crossborder.webp"
        alt="CrossBorder Business Solution"
        width={ASSET_W}
        height={ASSET_H}
        sizes={`${width}px`}
        priority={priority}
        style={{ height, width: "auto" }}
        className="block"
      />
    </span>
  );
}
