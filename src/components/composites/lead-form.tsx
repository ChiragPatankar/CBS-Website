"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactField } from "@/content/contact";
import { cn } from "@/lib/utils";

type State = "idle" | "submitting" | "ok" | "error";

/**
 * Accessible lead form.
 *
 * Validation runs on blur, never on keystroke — validating as someone types
 * tells them they are wrong before they have finished being right. Errors sit
 * next to their field, are announced via `role="alert"`, and the first invalid
 * field takes focus on a failed submit.
 */
export function LeadForm({
  fields,
  submitLabel,
  endpoint = "/api/contact",
  source,
}: {
  fields: ContactField[];
  submitLabel: string;
  endpoint?: string;
  source?: string;
}) {
  const [state, setState] = React.useState<State>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const validateField = (f: ContactField, value: string): string | null => {
    const v = value.trim();
    if (f.required && !v) return `${f.label} is required.`;
    if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return "Enter an email address we can reply to.";
    if (f.type === "tel" && v && v.replace(/\D/g, "").length < 7)
      return "Enter a phone number including country code.";
    return null;
  };

  const onBlur = (f: ContactField) => (e: React.FocusEvent<HTMLElement & { value: string }>) => {
    const msg = validateField(f, e.target.value ?? "");
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[f.name] = msg;
      else delete next[f.name];
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const found: Record<string, string> = {};
    for (const f of fields) {
      const msg = validateField(f, String(data.get(f.name) ?? ""));
      if (msg) found[f.name] = msg;
    }
    setErrors(found);

    if (Object.keys(found).length) {
      // Focus management: send the user straight to the first problem.
      const first = fields.find((f) => found[f.name]);
      if (first) form.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }

    setState("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), source }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("ok");
      form.reset();
    } catch {
      setState("error");
      setServerError(
        "We could not send that just now. Email support@cbbusinesssolution.com and we will pick it up."
      );
    }
  }

  if (state === "ok") {
    return (
      <div
        role="status"
        className="glass inner-lip rounded-2xl border border-profit/30 p-8 text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-profit/15 text-profit">
          <Check aria-hidden className="size-5" />
        </span>
        <h3 className="mt-5 font-display text-h3 font-bold tracking-tight">Got it — thank you.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          A specialist will read this properly and come back within one working
          day. If it is urgent, email support@cbbusinesssolution.com.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setState("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot. Real people never fill a field they cannot see. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company_url">Leave blank</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((f) => {
        const isWide = f.type === "textarea" || f.name === "interest";
        const err = errors[f.name];
        const errId = `${f.name}-error`;
        const base =
          "w-full rounded-md border bg-surface-2/70 px-3.5 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand";

        return (
          <div key={f.name} className={cn(isWide && "sm:col-span-2")}>
            <label
              htmlFor={f.name}
              className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-muted"
            >
              {f.label}
              {f.required ? (
                <span aria-hidden className="ml-1 text-brand">
                  *
                </span>
              ) : (
                <span className="ml-1.5 font-normal normal-case tracking-normal text-faint">
                  (optional)
                </span>
              )}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={f.name}
                name={f.name}
                rows={5}
                required={f.required}
                placeholder={f.placeholder}
                aria-invalid={!!err}
                aria-describedby={err ? errId : undefined}
                onBlur={onBlur(f)}
                className={cn(base, "min-h-32 resize-y py-3", err ? "border-error" : "border-border")}
              />
            ) : f.type === "select" ? (
              <select
                id={f.name}
                name={f.name}
                required={f.required}
                /* `key` forces a remount when the hero's intent changes —
                   React will not update an uncontrolled select's defaultValue. */
                key={f.defaultValue ?? "none"}
                defaultValue={f.defaultValue ?? ""}
                aria-invalid={!!err}
                aria-describedby={err ? errId : undefined}
                onBlur={onBlur(f)}
                className={cn(base, "h-12", err ? "border-error" : "border-border")}
              >
                <option value="" disabled>
                  Select one
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                defaultValue={f.defaultValue}
                aria-invalid={!!err}
                aria-describedby={err ? errId : undefined}
                onBlur={onBlur(f)}
                /* h-12 keeps every input above the 44px touch floor. */
                className={cn(base, "h-12", err ? "border-error" : "border-border")}
              />
            )}

            {err ? (
              <p id={errId} role="alert" className="mt-2 text-xs text-error">
                {err}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={state === "submitting"} className="w-full sm:w-auto">
          {state === "submitting" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>

        {serverError ? (
          <p role="alert" className="mt-3 text-xs text-error">
            {serverError}
          </p>
        ) : null}

        <p className="mt-4 text-xs leading-relaxed text-faint">
          We use this only to reply to you. No lists, no sharing — see our{" "}
          <a href="/privacy" className="text-muted underline underline-offset-2 hover:text-fg">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
