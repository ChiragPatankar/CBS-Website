import type { AuditQuestion } from "@/content/audit";
import type { PillarSlug } from "@/content/types";

export type AuditResult = {
  motion: "launch" | "scale";
  /** Pillars ordered strongest first. */
  pillars: PillarSlug[];
  /** Up to three recommended service slugs, strongest first. */
  services: string[];
};

/**
 * Pure, deterministic scorer. Same answers in, same result out — no randomness,
 * no clock, no network. Kept out of the component so it stays trivially testable
 * and so the recommendation logic can be audited without reading JSX.
 *
 * `answers` maps question id → chosen option id. Unanswered questions are simply
 * skipped, so a partial run still produces a sensible read.
 */
export function scoreAudit(
  answers: Record<string, string>,
  questions: AuditQuestion[]
): AuditResult {
  let motion = 0;
  const pillarScore: Record<PillarSlug, number> = {
    marketplace: 0,
    growth: 0,
    technology: 0,
  };
  const serviceScore: Record<string, number> = {};

  for (const q of questions) {
    const chosen = answers[q.id];
    if (!chosen) continue;
    const opt = q.options.find((o) => o.id === chosen);
    if (!opt) continue;

    motion += opt.motionWeight;

    for (const [p, w] of Object.entries(opt.pillarWeights)) {
      pillarScore[p as PillarSlug] += w ?? 0;
    }
    for (const [s, w] of Object.entries(opt.serviceWeights ?? {})) {
      serviceScore[s] = (serviceScore[s] ?? 0) + w;
    }
  }

  const pillars = (Object.keys(pillarScore) as PillarSlug[])
    .filter((p) => pillarScore[p] > 0)
    .sort((a, b) => pillarScore[b] - pillarScore[a]);

  const services = Object.entries(serviceScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slug]) => slug);

  return {
    // Ties resolve to `scale`: an established brand mis-labelled as launching is
    // a more useful error than the reverse, which would recommend re-doing work
    // they have already done.
    motion: motion >= 0 ? "scale" : "launch",
    pillars: pillars.length ? pillars : ["marketplace"],
    services,
  };
}
