# app/ — Next.js App Router

Routes only. Pages compose templates from `src/components/templates` and fetch
data via `src/content/queries`. **Not built until roadmap Phase 4.**
Route structure mirrors `docs/01-information-architecture.md`.

```
(marketing)/                     public marketing site (route group)
  solutions/
    marketplace/{cataloging-creative, global-selling, growth-management, expansion}/
    growth/{meta-ads, google-ads, shopify, retention}/
    technology/{web-development, mobile-apps, cloud, ai-ml}/
  work/[slug]/                   case-study detail (dynamic)
  approach/  about/  ai-audit/  contact/  privacy/  terms/
api/
  ai-audit/  contact/  newsletter/   route handlers (Phase 6)
```

Old `/work-with-us/*` and `/hire` URLs 301-redirect here (see IA migration map).
Default to Server Components; add `'use client'` only for interactive nodes.
