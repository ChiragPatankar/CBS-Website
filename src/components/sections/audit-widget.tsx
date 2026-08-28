"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Icon } from "@/components/primitives/icon";
import { DUR, EASE } from "@/lib/motion/tokens";
import { scoreAudit } from "@/lib/audit";
import { auditQuestions, auditCopy, motionCopy } from "@/content/audit";
import { pillars } from "@/content/pillars";
import { services, serviceHref } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Multi-step audit.
 *
 * Answers live in one state object keyed by question id, so going back never
 * loses anything and the score can be recomputed from scratch at any point.
 * The recommendation comes from `scoreAudit` — a pure function — so there is no
 * LLM, no API key, and no possibility of the page inventing a claim.
 */
export function AuditWidget() {
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [done, setDone] = React.useState(false);
  const liveRef = React.useRef<HTMLParagraphElement>(null);

  const total = auditQuestions.length;
  const q = auditQuestions[step];
  const progress = done ? 1 : step / total;

  const choose = (optionId: string) => {
    const next = { ...answers, [q.id]: optionId };
    setAnswers(next);
    // Small delay so the selected state is visible before advancing.
    window.setTimeout(() => {
      if (step + 1 >= total) setDone(true);
      else setStep(step + 1);
    }, reduce ? 0 : 180);
  };

  const back = () => {
    if (done) setDone(false);
    else if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  const result = React.useMemo(() => scoreAudit(answers, auditQuestions), [answers]);
  const recommended = result.services
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => !!s);
  const topPillar = pillars.find((p) => p.slug === result.pillars[0]);
  const motionInfo = motionCopy[result.motion];

  const slide = (dir: 1 | -1) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
      : {
          initial: { opacity: 0, x: 28 * dir },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -28 * dir },
        };

  return (
    <Container className="pb-24">
      <div className="mx-auto max-w-3xl">
        {/* Progress. A real meter, exposed to assistive tech. */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done ? total : step}
          aria-label="Audit progress"
          className="h-px w-full overflow-hidden bg-border"
        >
          <motion.div
            className="h-full origin-left ember-gradient"
            initial={false}
            animate={{ scaleX: progress || 0.02 }}
            transition={{ duration: DUR.base, ease: EASE.out }}
            style={{ width: "100%" }}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
            {done ? "Result" : `Question ${step + 1} of ${total}`}
          </span>
          {step > 0 || done ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex min-h-11 items-center gap-1.5 text-xs text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              Back
            </button>
          ) : null}
        </div>

        {/* aria-live so screen readers hear the step change without focus moving. */}
        <p ref={liveRef} aria-live="polite" className="sr-only">
          {done ? "Your audit result is ready." : `Question ${step + 1} of ${total}: ${q.prompt}`}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {!done ? (
            <motion.div
              key={q.id}
              {...slide(1)}
              transition={{ duration: DUR.base, ease: EASE.out }}
              className="mt-8"
            >
              <h2 className="font-display text-h2 font-extrabold tracking-[-0.025em]">
                {q.prompt}
              </h2>
              {q.help ? <p className="mt-3 text-sm text-muted">{q.help}</p> : null}

              <div className="mt-8 grid gap-3">
                {q.options.map((o) => {
                  const selected = answers[q.id] === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => choose(o.id)}
                      aria-pressed={selected}
                      className={cn(
                        "group flex min-h-16 w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200",
                        selected
                          ? "border-brand bg-brand/10"
                          : "border-border bg-surface-1 hover:-translate-y-0.5 hover:border-brand/40"
                      )}
                    >
                      <span>
                        <span className="block text-sm font-medium text-fg">{o.label}</span>
                        {o.hint ? (
                          <span className="mt-1 block text-xs text-muted">{o.hint}</span>
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
                          selected
                            ? "border-brand bg-brand text-white"
                            : "border-border-strong text-transparent group-hover:border-brand/60"
                        )}
                      >
                        <Check aria-hidden className="size-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              {...slide(1)}
              transition={{ duration: DUR.slow, ease: EASE.out }}
              className="mt-8"
            >
              <Eyebrow>{auditCopy.resultEyebrow}</Eyebrow>

              {/* Motion verdict */}
              <div className="mt-5 glass inner-lip rounded-2xl border border-border-strong/60 p-7">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand">
                  {motionInfo.when}
                </span>
                <h2 className="mt-3 font-display text-h2 font-extrabold tracking-[-0.025em]">
                  You are in {motionInfo.title}
                </h2>
                <p className="mt-4 text-body-lg text-muted">{motionInfo.body}</p>
              </div>

              {/* Pillar */}
              {topPillar ? (
                <div className="mt-4 rounded-2xl border border-border bg-surface-1 p-7">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                    Start with this pillar
                  </p>
                  <h3 className="mt-3 font-display text-h3 font-bold tracking-tight">
                    {topPillar.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{topPillar.tension}</p>
                  <Link
                    href={`/solutions/${topPillar.slug}`}
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-brand transition-colors hover:text-brand-3"
                  >
                    <span className="link-underline pb-0.5">Read the pillar</span>
                    <ArrowRight aria-hidden className="size-3.5" />
                  </Link>
                </div>
              ) : null}

              {/* Services */}
              {recommended.length ? (
                <div className="mt-4">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                    Where we would look first
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {recommended.map((s) => (
                      <Link
                        key={s.slug}
                        href={serviceHref(s)}
                        className="group flex h-full flex-col rounded-xl border border-border bg-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                      >
                        <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface-2 text-brand-3 transition-colors group-hover:text-brand">
                          <Icon name={s.icon} className="size-4" />
                        </span>
                        <h4 className="mt-3.5 font-display text-sm font-bold leading-snug tracking-tight">
                          {s.navLabel}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mt-7 border-t border-border pt-6 text-xs leading-relaxed text-faint">
                {auditCopy.disclaimer}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="cta-shimmer">
                  <Link href="/contact">
                    Talk it through with us
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" onClick={restart}>
                  <RotateCcw className="size-4" />
                  Start again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}
