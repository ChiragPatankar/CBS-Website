# 06 — SEO Plan

## 1. Strategy

CBBS should own **profit-first ecommerce growth** and **cross-border / marketplace growth** intent, for India-first but globally-relevant queries. The redesign fixes real SEO liabilities (duplicate content, broken links, thin/placeholder pages, empty case studies) and adds depth (case studies, resources) that earns rankings.

**Pillars → topic clusters** mirror the IA: each service page is a cluster leaf; each pillar page is a hub; case studies and resources are supporting content that internally links back.

## 2. Keyword map

| Page | Primary keyword | Secondary / long-tail |
|------|-----------------|-----------------------|
| Home | ecommerce growth agency | profit-first ecommerce, DTC growth partner, marketplace growth agency India |
| Solutions hub | ecommerce growth services | marketplace + DTC growth solutions |
| Marketplace pillar | marketplace management agency | Amazon/Flipkart/Walmart growth agency |
| Cataloging & Creative | product listing optimization | A+ content, marketplace catalog services, ecommerce product photography |
| Global Selling | cross-border ecommerce selling | international marketplace expansion, global selling services |
| Growth & Management | Amazon growth agency | marketplace account management, seller growth services |
| Expansion | new marketplace expansion | sell on Walmart/eBay/Noon, multi-marketplace onboarding |
| Growth pillar | performance marketing agency | ecommerce paid media agency |
| Meta Ads | Meta ads agency | Facebook & Instagram ads for ecommerce, performance branding |
| Google Ads | Google Ads agency ecommerce | Shopping ads, PPC for DTC, demand capture |
| Shopify | Shopify design agency | Shopify CRO, conversion-optimized Shopify store |
| Retention | retention marketing agency | email SMS WhatsApp marketing, Klaviyo agency |
| Technology/AI | ecommerce technology & AI | AI for ecommerce growth, custom ecommerce development |
| Work | ecommerce case studies | marketplace growth results, ROAS case study |
| About | profit-first growth partner | purpose-driven ecommerce agency |
| AI Audit | free ecommerce growth audit | AI growth audit, ROAS calculator |

**Intent balance:** commercial (service pages), informational (resources — future), transactional (contact/audit), navigational (brand).

## 3. On-page standards (every page)

- **One H1** matching primary intent; logical H2/H3 outline.
- **Title tag:** `Primary Keyword | CrossBorder` ≤ 60 chars; unique per page.
- **Meta description:** benefit + proof + CTA, 140–160 chars; unique.
- **URL:** short, lowercase, hyphenated (see IA migration map).
- **Internal linking:** pillar ↔ services ↔ related case studies; contextual, descriptive anchors.
- **Content depth:** service pages get real Overview/Benefits/Deliverables/FAQ (fixes thin/placeholder pages); case studies are substantial, unique, metric-rich.
- **Media:** descriptive `alt` on every image (fixes the meaningless repeated alts like "vinod" for unrelated logos); real filenames.
- **Freshness:** dated case studies and resources.

## 4. Fix the current SEO liabilities

| Issue found in audit | SEO impact | Fix |
|----------------------|-----------|-----|
| Homepage duplicated; content repeated across pages (D1–D10) | Duplicate content dilution | Canonical single source; component-driven content |
| Broken/doubled footer links (`/work-with-us/work-with-us/…`, C5) | Crawl waste, 404s, lost equity | Correct links + 301s |
| Placeholder deliverables/FAQ (D6, C7) | Thin content | Unique, useful copy |
| Empty Work page (D8) | No proof, no rankable depth | Full case-study system |
| "Al & Machine Learning" typo (C3) | Brand/quality signal | Correct to "AI" |
| Generic duplicate `alt` text | Missed image SEO | Descriptive alts |
| Missing `/contact-us/` referenced in Privacy (C8) | Broken link | Fix to `/contact` |

## 5. Technical SEO

- **Rendering:** SSR/SSG (Next.js) so content is crawlable without JS; ISR for case studies/resources.
- **Core Web Vitals targets:** LCP < 2.0s, INP < 200ms, CLS < 0.05. (Hero motion must not delay LCP; reserve space to prevent CLS.)
- **`sitemap.xml`** auto-generated; **`robots.txt`** allowing crawl, pointing to sitemap.
- **Canonical tags** on every page; self-referencing.
- **301 redirects** for all old URLs (IA migration map).
- **hreflang** if/when localized (India + international variants).
- **Image optimization:** AVIF/WebP, responsive `srcset`, lazy-load below the fold, priority hint on LCP image.
- **Clean semantic HTML**, breadcrumbs, no orphan pages.
- **HTTPS**, HTTP/2+, sensible caching/CDN.

## 6. Structured data (JSON-LD)

| Type | Where |
|------|-------|
| `Organization` + `LocalBusiness` | Global (name, logo, Mumbai address, contact, sameAs socials) |
| `WebSite` + `SearchAction` | Global |
| `Service` | Each service page |
| `BreadcrumbList` | All nested pages |
| `FAQPage` | Service pages (real FAQs) |
| `Article` | Resources (future) |
| `Review`/`AggregateRating` | Case studies / testimonials (if verifiable) |
| `Person` | Team members (About) |

## 7. Off-page & authority

- Case studies as linkable assets (pitch to client PR, marketplace partner directories).
- Partner/badge pages (Amazon/Shopify/Meta partner status) → authoritative backlinks.
- Thought-leadership resources (playbooks on profit-first growth, cross-border selling) for informational rankings and links.
- Consistent NAP (name/address/phone) across directories; Google Business Profile.

## 8. Measurement

- GSC (coverage, queries, CTR, position), GA4 (funnels from doc 05), Core Web Vitals field data (CrUX).
- Rank tracking for the keyword map; monitor 301s and 404s post-migration.
- Content KPIs: organic sessions to service pages, case-study assisted conversions, audit starts from organic.
