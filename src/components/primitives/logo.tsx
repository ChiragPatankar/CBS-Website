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
 * The supplied file was 1536×1024 with the lockup occupying a band in the middle —
 * 80% of the canvas was empty alpha. Since the intrinsic box is what `height`
 * scales, that padding would have shrunk the visible mark to roughly a fifth of
 * its intended size. The asset in `public/` is cropped to the inked bounding box,
 * hence the 1432×224 dimensions below: they must stay in step with the file or
 * the aspect ratio breaks.
 */
export function Logo({
  className,
  /** Rendered height in px. Width follows the asset's 1432×224 ratio (≈6.39:1). */
  height = 30,
  priority = false,
}: {
  className?: string;
  height?: number;
  priority?: boolean;
}) {
  // Width is derived rather than guessed so `sizes` stays truthful when a caller
  // changes `height`. Without a `sizes` hint next/image falls back to the device
  // breakpoints and ships a variant several times wider than the 192px this
  // actually paints at.
  const width = Math.round((height * 1432) / 224);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logos/brand/crossborder.webp"
        alt="CrossBorder Business Solution"
        width={1432}
        height={224}
        sizes={`${width}px`}
        priority={priority}
        style={{ height, width: "auto" }}
        className="block"
      />
    </span>
  );
}
