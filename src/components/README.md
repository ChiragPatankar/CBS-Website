# components/

Design system, in atomic layers. Dependencies flow one way:
`templates → sections → composites → primitives → tokens`.
See `docs/foundation/03-component-library.md` for contracts.

- **primitives/** — atoms: Button, Link, Heading, Text, Eyebrow, Icon, BrandMark, Badge, Input, Textarea, Select, Avatar, Divider, GradientText, Tag/Chip
- **composites/** — molecules: StatCounter, MetricDelta, ServiceCard, CaseStudyCard, TestimonialCard, FeatureCard, StepItem, FAQItem, LogoWall, PillarColumn, CTAButtonGroup, FilterBar, StatBand, ThemeToggle
- **sections/** — organisms: SiteHeader, MegaMenu, SiteFooter, Hero, TwoMotionSelector, SolutionsOverview, FeaturedWork, WorkGrid, CaseStudyBody, DeliverablesGrid, HowItWorks, PartnersStrip, ProofBand, PurposeBlock, FAQSection, CTASection, AIAuditWidget, FloatingAssistant, LeadForm, NewsletterForm, LegalLayout
- **templates/** — page compositions: Home, SolutionsHub, Pillar, ServiceDetail, WorkIndex, CaseStudy, About, Approach, AIAudit, Contact, Legal
- **providers/** — ThemeProvider, AnalyticsProvider

Per-component file layout: `Name/Name.tsx · Name.variants.ts · Name.stories.tsx · Name.test.tsx · index.ts`.
No component hard-codes a style value — always a token (`docs/foundation/04-design-tokens.md`).
