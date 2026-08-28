/**
 * Route-change entrance for the marketing pages.
 *
 * `template.tsx` (not `layout.tsx`) because a template remounts on every
 * navigation, which is what re-triggers the CSS animation. Incoming-only and
 * CSS-only by design: App Router provides no hook to keep an outgoing tree
 * alive, so a true exit animation costs a deliberate blank frame, and wrapping
 * `<main>` in an animating element would create a stacking context and
 * containing block that breaks any `position: fixed` descendant.
 *
 * The header, footer and floating assistant stay in `layout.tsx` — anything
 * fixed or sticky must live outside this wrapper for that reason.
 */
export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
