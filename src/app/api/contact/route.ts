import { NextResponse } from "next/server";
import { contact } from "@/content/contact";

/**
 * Contact submissions.
 *
 * Validation is repeated here rather than trusted from the client: the browser
 * form is a convenience, not a security boundary, and this endpoint is publicly
 * callable.
 *
 * DELIVERY IS NOT WIRED. No email provider or CRM has been configured for this
 * project, so `deliver()` logs and returns. Submissions are therefore NOT reaching
 * anyone yet — a provider key is required before launch. It is isolated to one
 * function so that is a single, obvious change.
 */
type Payload = Record<string, unknown>;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** In-memory sliding window. Per-instance only — real protection needs a shared store. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function deliver(lead: Payload): Promise<void> {
  // TODO(launch): send to the client's inbox or CRM once credentials exist.
  console.info("[contact] lead received", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Return 200 so it learns nothing.
  if (typeof body.company_url === "string" && body.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  for (const f of contact.fields) {
    const raw = body[f.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (f.required && !value) errors[f.name] = `${f.label} is required.`;
    else if (f.type === "email" && value && !isEmail(value))
      errors[f.name] = "Invalid email address.";
    // Cap free text so a single request cannot post a novel.
    else if (value.length > 4000) errors[f.name] = "Too long.";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const lead: Payload = { source: body.source ?? "contact-page", ip };
  for (const f of contact.fields) lead[f.name] = body[f.name] ?? null;

  await deliver(lead);
  return NextResponse.json({ ok: true });
}
