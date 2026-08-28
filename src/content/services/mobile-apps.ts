import type { Service } from "@/content/types";

export const mobileApps: Service = {
  slug: "mobile-apps",
  pillar: "technology",
  name: "Mobile App Development",
  navLabel: "Mobile App Development",
  eyebrow: "Owned mobile commerce",
  h1: "A commerce app your repeat buyers open without being paid for twice",
  problem:
    "Repeat customers are the cheapest revenue a brand has, and most brands still reach them through rented channels — an ad auction, an inbox, a marketplace's own app. An owned app is the only place where a returning buyer costs nothing to reach again.",
  overview:
    "Mobile work is scoped around a single question: what does a returning customer do often enough to justify installing something. In practice that is reorder, browse a saved list, track an order, redeem an offer, and check availability — so the app is built around those paths first and the full catalogue second. Delivery covers both native and cross-platform routes, chosen on the basis of what the app has to do rather than preference. The build shares the same product, price and order services as the storefront, so stock and pricing cannot disagree between web and app. Release work includes the parts brands usually discover late: store listing assets, review guidelines, payment and consent requirements, push permission flows, and a versioning approach that keeps older installs working.",
  overviewPoints: [
    "Reorder, tracking and saved lists before feature breadth",
    "Native or cross-platform chosen by requirement, not habit",
    "Same catalogue and order data as the storefront",
  ],
  platforms: [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Expo",
    "Firebase",
    "Shopify Storefront API",
    "Apple App Store",
    "Google Play",
    "Stripe",
    "Razorpay",
  ],
  benefits: [
    {
      title: "A direct line to existing customers",
      body: "Push and in-app messaging reach installed users without buying the impression again. That changes the economics of retention campaigns for brands whose repeat rate already carries the business.",
      icon: "smartphone",
    },
    {
      title: "Reorder in fewer taps than a browser allows",
      body: "Saved addresses, stored payment methods and past-order shortcuts remove most of the friction from a repeat purchase. For consumables and replenishment categories that friction is the main reason a reorder does not happen.",
      icon: "refresh",
    },
    {
      title: "Behavioural data you own",
      body: "In-app events show what customers browse, save and abandon at a level of detail rented channels do not report back. That data feeds the same customer models used across retention and forecasting work.",
      icon: "line-chart",
    },
  ],
  steps: [
    {
      title: "Use-case definition",
      body: "Work out which journeys justify an install by looking at repeat rate, order frequency and category behaviour. Anything that does not earn its place in the first release is deliberately deferred.",
    },
    {
      title: "Platform decision and technical design",
      body: "Choose native or cross-platform against the actual requirements — offline behaviour, device features, animation demands, team maintenance capacity — then design the API surface the app will consume.",
    },
    {
      title: "Build and internal release cycles",
      body: "Develop in short cycles with builds distributed to the client team through the standard test channels, so merchandising and operations see the app on real devices before it is public.",
    },
    {
      title: "Store submission and launch",
      body: "Prepare listing copy, screenshots, privacy disclosures and consent flows, submit to both stores, and handle review feedback through to approval and staged rollout.",
    },
    {
      title: "Post-launch iteration",
      body: "Monitor crash rates, funnel drop-off and install-to-first-order conversion, then ship maintenance and improvement releases against what the data shows.",
    },
  ],
  deliverables: [
    {
      title: "iOS and Android applications",
      body: "Production builds for both platforms covering the agreed journeys, signed and submitted under your developer accounts.",
      icon: "smartphone",
    },
    {
      title: "Commerce API integration",
      body: "Catalogue, cart, checkout and order-status endpoints connected to the same services the storefront uses.",
      icon: "package",
    },
    {
      title: "Push and messaging setup",
      body: "Notification infrastructure, permission prompts and segmentation hooks ready for the retention team to use.",
      icon: "message",
    },
    {
      title: "Store listing assets",
      body: "Titles, descriptions, keyword sets, screenshots and privacy declarations prepared for both app stores.",
      icon: "badge-check",
    },
    {
      title: "Analytics and event schema",
      body: "A documented in-app event taxonomy wired to your analytics stack so funnels are comparable with web.",
      icon: "bar-chart",
    },
    {
      title: "Release and maintenance runbook",
      body: "Build pipeline, signing credentials process, version support policy and a documented path for future releases.",
      icon: "workflow",
    },
  ],
  faqs: [
    {
      q: "Does our brand need an app at all?",
      a: "Many do not. An app makes sense when a meaningful share of revenue is repeat purchase, when order frequency is high enough that customers will keep the app installed, or when the category involves subscriptions, replenishment or loyalty mechanics. If most orders are one-off acquisitions, the same budget usually does more in conversion and retention work on the web storefront. That assessment is part of the first stage rather than an assumption.",
    },
    {
      q: "Native or cross-platform?",
      a: "Cross-platform frameworks are a reasonable default for commerce apps because the interface is largely lists, product detail and checkout, and one codebase halves ongoing maintenance. Native becomes the better choice when the app depends heavily on device capabilities, complex animation or platform-specific integrations. The decision is made against your requirements at the technical design stage.",
    },
    {
      q: "Will the app and the website show the same prices and stock?",
      a: "That is the intent of building against shared commerce APIs rather than a separate app back end. Price, stock and promotion logic stay in the commerce layer, so the app reads the same values as the storefront instead of maintaining its own copy that drifts.",
    },
    {
      q: "Who handles app store approval?",
      a: "Submission, listing assets, privacy disclosures and review correspondence are handled as part of the release stage. The apps are published under your own Apple and Google developer accounts so ownership of the listings, reviews and install base stays with the brand.",
    },
  ],
  icon: "smartphone",
  seo: {
    title: "Mobile App Development for Commerce Brands",
    description:
      "Native and cross-platform commerce apps for consumer brands: app-store release, push and offer messaging, and one catalogue shared with your storefront.",
  },
  status: "draft-unreviewed",
  reviewNote:
    "CrossBorder must confirm which mobile frameworks the team builds in, whether iOS and Android delivery is in-house or partnered, who owns app-store submission and ongoing maintenance releases, and how post-launch support is contracted, before this page is published.",
};
