# content/ — CMS integration (Sanity)

Structured content so copy is **data, not markup** — the source-level cure for the
duplication (D3–D6) in the current site. Built in roadmap Phase 3.

- **schemas/** — document & object types from `docs/01-information-architecture.md` §5:
  `service, caseStudy, testimonial, client, stat, partner, pillar, global`.
- **queries/** — GROQ queries + typed fetchers consumed by templates.

Single sources: one `stat` collection feeds every `StatBand`; one `client` array
feeds every `LogoWall`. A number or logo changes in exactly one place.
Rewritten, de-duplicated copy to author: `docs/08-copy-rewrite.md`.
