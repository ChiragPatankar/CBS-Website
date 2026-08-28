import type { Service } from "@/content/types";

export const webDevelopment: Service = {
  slug: "web-development",
  pillar: "technology",
  name: "Custom Web Development",
  navLabel: "Custom Web Development",
  eyebrow: "Storefront engineering",
  h1: "Storefronts built for speed, search and the sales you actually make",
  problem:
    "Most brand sites are assembled from themes and apps until the page weight, the checkout and the product data all work against each other. Traffic arrives, the page takes four seconds, and the media budget pays for the difference.",
  overview:
    "Custom web development here means building the commerce front end as engineered software rather than a stack of plugins. Work starts from the catalogue and the order path — how products, variants, prices, stock and promotions actually flow — and then builds a storefront on top that renders fast, is readable to search engines, and can be edited by a marketing team without a developer in the loop. Where a hosted platform already fits, the build extends it. Where it does not, a headless front end is put in front of the commerce and content services so the storefront, the marketplace listings and the internal systems all read from one product truth instead of three drifting copies.",
  overviewPoints: [
    "Custom and headless builds, not theme customisation",
    "Core Web Vitals treated as a build requirement",
    "One product and price source across every channel",
    "Content editing that does not need a deploy",
  ],
  platforms: [
    "Next.js",
    "React",
    "TypeScript",
    "Shopify",
    "Shopify Hydrogen",
    "WooCommerce",
    "Node.js",
    "GraphQL",
    "Sanity",
    "Contentful",
    "Vercel",
    "Stripe",
    "Razorpay",
  ],
  benefits: [
    {
      title: "Pages that load before attention leaves",
      body: "Front-end performance is scoped, measured and budgeted per template rather than fixed after launch. Faster rendering reduces the drop-off between an ad click and a product page that has finished painting.",
      icon: "gauge",
    },
    {
      title: "One catalogue, every surface",
      body: "Product, price and stock data is modelled once and read by the storefront, the feeds and the marketplace listings. Editing a title or a price stops being four separate jobs in four separate admin panels.",
      icon: "database",
    },
    {
      title: "A codebase your team can keep",
      body: "The build ships with typed components, documented content models and a repository you own outright. Handover is a working system with commit history, not a login and a hope that the agency stays reachable.",
      icon: "code",
    },
  ],
  steps: [
    {
      title: "Audit and commerce model",
      body: "Review the current site, analytics and product data. Map the catalogue structure, variant logic, tax and shipping rules, and the states the checkout has to handle before any interface work begins.",
    },
    {
      title: "Architecture and template plan",
      body: "Choose the platform and rendering approach, define the content model, and agree the template set — home, category, product, cart, checkout, content — with a performance budget attached to each.",
    },
    {
      title: "Design build and component library",
      body: "Convert the design into a reusable component library with responsive and accessibility behaviour defined once. Editors get the same components as building blocks for landing pages.",
    },
    {
      title: "Integration and data wiring",
      body: "Connect commerce, payments, shipping, analytics and any ERP or marketplace sync. Product and order data is reconciled against the existing system of record before go-live.",
    },
    {
      title: "Launch, migration and handover",
      body: "Redirect mapping, staged release, post-launch monitoring of rankings and conversion, then a documented handover with the repository, environments and release process transferred.",
    },
  ],
  deliverables: [
    {
      title: "Custom storefront build",
      body: "A production front end covering the agreed template set, deployed on infrastructure with preview environments and rollback.",
      icon: "store",
    },
    {
      title: "Component library",
      body: "Documented, reusable interface components so future pages match the design system without new front-end work.",
      icon: "boxes",
    },
    {
      title: "Content model and editor access",
      body: "A structured CMS setup with roles, so merchandising and campaign copy can change without a code release.",
      icon: "palette",
    },
    {
      title: "Commerce and payment integrations",
      body: "Cart, checkout, payment, shipping and tax flows connected and tested against real order scenarios.",
      icon: "cart",
    },
    {
      title: "Performance and SEO baseline",
      body: "Core Web Vitals measurements, structured data, sitemap and redirect map recorded before and after launch.",
      icon: "search",
    },
    {
      title: "Repository and technical documentation",
      body: "Source control, environment configuration and a runbook covering build, deploy and common maintenance tasks.",
      icon: "workflow",
    },
  ],
  faqs: [
    {
      q: "We are on Shopify. Does a custom build mean leaving it?",
      a: "Usually not. Shopify handles checkout, payments and order management well, and replacing that is rarely the problem. The common path is keeping Shopify as the commerce engine and building a custom or headless front end against its APIs, so the storefront is no longer limited by theme constraints. Replatforming is only worth proposing when the commerce layer itself is the constraint.",
    },
    {
      q: "How long does a build take?",
      a: "It depends almost entirely on catalogue complexity and how many systems the site has to talk to. A focused storefront with a clean catalogue is a materially different scope from a multi-country site with an ERP sync and localised pricing. Scope is set after the audit stage, so the timeline is based on the actual data model rather than a template estimate.",
    },
    {
      q: "Will we lose search rankings when we migrate?",
      a: "Migrations lose traffic when URLs, metadata and internal linking are not carried across deliberately. The build includes a redirect map from the existing URL set, structured data on the templates that need it, and rank and traffic monitoring for a defined period after launch so regressions are caught while they are still fixable.",
    },
    {
      q: "Who owns the code and can our own developers work on it?",
      a: "You own the repository. The stack is chosen from widely used, well-documented technologies specifically so the work is maintainable by any competent developer, and handover includes the documentation and environment access needed for an in-house team to take over.",
    },
    {
      q: "Can the site support more than one market?",
      a: "Multi-currency, multi-language and market-specific catalogues are all supportable, and are worth planning at the architecture stage rather than retrofitting. What is practical in the first release depends on how your pricing, tax and fulfilment differ by market.",
    },
  ],
  icon: "code",
  seo: {
    title: "Custom Web Development for Ecommerce Brands",
    description:
      "Headless and custom storefront builds for consumer brands — fast, search-visible commerce front ends wired into your catalogue, orders and marketplace data.",
  },
  status: "draft-unreviewed",
  reviewNote:
    "CrossBorder must confirm the frameworks and commerce platforms this team actually builds on, whether headless work is delivered in-house or with a partner, and the real engagement model — fixed-scope build, retained development, or team augmentation — before this page is published.",
};
