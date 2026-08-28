"use client";

import * as React from "react";

/**
 * Pauses ambient/looping animation when the tab is backgrounded or the element
 * has scrolled off-screen — the perf budget in docs/04 §8 requires both.
 *
 * Attach `ref` to the animating element and spread the returned `paused` flag
 * into its className as `[animation-play-state:paused]`. Keeping this in CSS
 * (rather than unmounting) means the GPU-composited keyframes simply stop
 * without a re-layout when they resume.
 */
export function useAmbientPause<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T>(null);
  const [tabVisible, setTabVisible] = React.useState(true);
  const [onScreen, setOnScreen] = React.useState(true);

  React.useEffect(() => {
    const sync = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => setOnScreen(entries[0]?.isIntersecting ?? true),
      // Resume slightly before it scrolls back in, so it's already running.
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, paused: !tabVisible || !onScreen };
}
