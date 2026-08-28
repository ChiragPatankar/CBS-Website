# 05 — User Journeys

## 1. Personas

| Persona | Who | Primary goal | Key question | Entry |
|---------|-----|--------------|--------------|-------|
| **Priya — Startup Founder** (Launch & Growth) | 0→1 DTC/consumer brand, small team | Get first traction across marketplaces + DTC | "Can they launch me profitably without burning cash?" | Google, Instagram, referral |
| **Rahul — Growth/Ecommerce Lead** (Scale & Optimize) | Established brand doing ₹X cr, plateauing | Improve ROAS, cut CAC, expand channels | "Do they have proof they can scale *my* category?" | Search, case-study share, LinkedIn |
| **Meera — Brand/Marketing Director** (Enterprise) | Multi-market brand (Lenovo/Reebok tier) | Cross-border expansion, reliable partner | "Are they credible and structured enough for us?" | Referral, RFP research |
| **Sam — Skeptical Evaluator** | Comparing 3–4 agencies | De-risk the decision | "What exactly do I get, and does it work?" | Direct, mid-funnel |

## 2. Conversion architecture

- **Primary conversion:** *Book a growth call* (`/contact`) — high intent.
- **Secondary conversion:** *Get an AI Growth Audit* (`/ai-audit`) — lower friction, captures earlier-stage leads and feeds them into the call.
- **Micro-conversions:** newsletter opt-in, case-study read, WhatsApp chat, service-page CTA.
- Every template ends in a `CTASection`; the AI audit is the recurring low-commitment on-ramp.

## 3. Journey maps

### J1 — Priya (Founder, Launch & Growth)
```
Instagram ad → Home
  Hero: "Smart ecommerce growth, built on profit-first principles"
  → TwoMotionSelector → picks "Launch & Growth" (2.3× ROI, 1.8× retention)
  → SolutionsOverview → Marketplace + Shopify catch her eye
  → unsure where to start → AI Growth Audit teaser
  → /ai-audit (answers: stage, category, channels, revenue)
  → Result: "Start with Cataloging + Meta Ads; projected path…" + book CTA
  → /contact prefilled from audit → Books call ✅
```
**Design implications:** motion selector must default-detect intent; AI audit must feel effortless (≤ 2 min, 5–6 questions); audit result deep-links to relevant services and prefills the form.

### J2 — Rahul (Growth Lead, Scale & Optimize)
```
Search "amazon growth agency india" → Solutions/Marketplace pillar
  → scans outcomes (−40% CAC, 3.1× LTV)
  → Growth & Management service → Deliverables + How it works
  → "Related case studies" → /work/[same category]
  → reads real metrics + testimonial
  → CTASection → Book a call ✅
```
**Design implications:** proof-per-service (related case studies on every service page) is non-negotiable; case studies must be filterable by category/marketplace so he finds a lookalike fast.

### J3 — Meera (Enterprise, cross-border)
```
Referral → About
  → Purpose + differentiators + capabilities + 9 yrs / 8 countries
  → Approach (profit-first method, structured, tooling/AI)
  → Work → filters Enterprise/Global
  → Contact (enterprise-qualified: revenue band, markets)
  → Books call ✅ (routed to senior contact)
```
**Design implications:** About + Approach carry credibility weight; form qualification (revenue band, markets) routes enterprise leads differently; cross-border map reinforces global capability.

### J4 — Sam (Evaluator)
```
Direct → Solutions Hub → compares pillars
  → 2–3 Service pages: reads Deliverables + FAQ (real answers)
  → Work: verifies outcomes across categories
  → Pricing/qualification clarity via AI audit
  → Contact ✅  (or newsletter if not ready → nurtured)
```
**Design implications:** FAQs must answer real objections (timeline, scope, platforms, pricing model); deliverables must be concrete and distinct (fixes the repeated-placeholder defect); provide a "not ready" exit (newsletter) so the lead isn't lost.

## 4. AI-first touchpoints

| Touchpoint | What it does | Journey value |
|------------|--------------|---------------|
| **AI Growth Audit** (`/ai-audit`) | 5–6 conversational Qs → personalized service mix + projected metric ranges + recommended next step | Converts undecided visitors; qualifies leads; personalizes |
| **"Find your fit"** (Solutions hub) | Mini recommender: stage + goal → surfaces the right pillar/service | Reduces choice paralysis |
| **FloatingAssistant** | AI chat + WhatsApp handoff to Vinayak | Instant answers, human escalation |
| **Personalized CTAs** | After audit/return visits, CTA reflects detected motion (Launch vs Scale) | Relevance lifts conversion |
| **Case-study matcher** | "Show me results like my business" filters Work by inferred profile | Proof tailored to the visitor |

Guardrails: AI is assistive, transparent ("estimated ranges, not guarantees"), always offers a human path, and never blocks core content behind interaction.

## 5. Funnel & measurement

```
Awareness   → Home / Pillar / Work impressions, scroll depth
Interest    → Service-page views, case-study reads, audit starts
Consideration → Audit completion, FAQ opens, WhatsApp opens
Intent      → Contact form starts
Conversion  → Call booked / form submit
Retention   → Newsletter, return visits
```
Track: audit start→complete rate, service→case-study→contact path, CTA CTR by section, form abandonment fields, motion-selector choice distribution. Feed learnings back into copy and layout.

## 6. Edge cases & inclusivity

- Reduced-motion, keyboard-only, and screen-reader journeys must reach *Book a call* with equal ease.
- Slow-connection: content-first, motion/charts progressively enhanced.
- Undecided/not-ready users get a graceful secondary path (audit, newsletter, WhatsApp) instead of a dead end.
- Form errors are recoverable and clearly explained; success states are unambiguous.
