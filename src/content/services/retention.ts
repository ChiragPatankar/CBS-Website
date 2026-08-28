/**
 * Retention Marketing — Email, SMS & WhatsApp. Digital Commerce Growth pillar.
 * Source copy: content/work-with-us_retention-marketing.md.
 */
import type { Service } from "@/content/types";

export const retention: Service = {
  slug: "retention",
  pillar: "growth",
  name: "Retention Marketing — Email, SMS & WhatsApp",
  navLabel: "Retention",
  eyebrow: "Retention Marketing — Email, SMS & WhatsApp",
  h1: "Drive repeat sales with retention journeys that engage and convert",
  problem:
    "Acquisition costs keep climbing, and a brand that only sells once has to keep paying that price. Most stores already have the list, the purchase history and the WhatsApp opt-ins, and are using none of it beyond an occasional discount blast.",
  overview:
    "From welcome flows to reactivation campaigns, we build personalized customer journeys across the channels you own, so lifetime value does the work your ad budget is currently doing. Email, SMS and WhatsApp are planned as one journey rather than three separate calendars.",
  overviewPoints: [
    "Automated flows first, campaigns second",
    "Segments built on behaviour and RFM, not on one big list",
    "Opt-in and template compliance handled per channel",
  ],
  platforms: ["Klaviyo", "Twilio", "WhatsApp Business API", "Shopify", "Amazon"],
  benefits: [
    {
      title: "Multi-channel journeys",
      body: "One journey decides which channel carries which message, so a reminder goes to WhatsApp and the story goes to email instead of all three firing at once. Frequency caps stop the fatigue and unsubscribes that undo retention gains.",
      icon: "message",
    },
    {
      title: "Segmentation and personalization",
      body: "Contacts are grouped by purchase behaviour, RFM score, category affinity and lifecycle stage, then messaged with content that matches where they are. First-time buyers, repeat buyers and lapsed customers stop receiving identical emails.",
      icon: "users",
    },
    {
      title: "Conversion and LTV growth",
      body: "Flows are built around the moments that decide repeat purchase: the first 30 days, the replenishment window and the point of lapse. Revenue is attributed per flow, so you can see which journeys are compounding lifetime value.",
      icon: "trending",
    },
  ],
  steps: [
    {
      title: "Data and channel audit",
      body: "We review list health, opt-in status, existing flows and platform setup, then quantify how much revenue your owned channels currently produce.",
    },
    {
      title: "Lifecycle map",
      body: "Customer journeys are mapped from first visit to lapse, and each stage is assigned a channel, a message and a measurable job.",
    },
    {
      title: "Build the core flows",
      body: "Welcome, browse and cart abandonment, post-purchase, replenishment and win-back are built first, because automation earns while the calendar sleeps.",
    },
    {
      title: "Layer in campaigns",
      body: "A campaign calendar runs on top of the flows, segmented rather than blasted, with WhatsApp and SMS reserved for messages that justify the interruption.",
    },
    {
      title: "Test and compound",
      body: "Subject lines, timing, offers and segments are tested continuously, and reporting ties open, click and conversion rates back to LTV impact.",
    },
  ],
  deliverables: [
    {
      title: "Email automations",
      body: "Welcome, cart abandonment, post-purchase and win-back flows, built and maintained. Each flow has its own revenue target and testing queue.",
      icon: "mail",
    },
    {
      title: "WhatsApp campaigns",
      body: "Broadcasts and flows that respect opt-in and template rules, used where immediacy earns the message. Delivery and block rates are monitored so the channel stays usable.",
      icon: "message",
    },
    {
      title: "SMS marketing",
      body: "Short, timely messages for reminders, offers and order updates. Volume is capped deliberately, because SMS fatigue is expensive and hard to reverse.",
      icon: "smartphone",
    },
    {
      title: "Audience segmentation",
      body: "Contacts grouped by behaviour, RFM score and preference, with segments maintained as customers move between stages. Suppression rules keep messaging relevant.",
      icon: "users",
    },
    {
      title: "Platform setup",
      body: "Full configuration of Klaviyo, Twilio or your existing stack, including data sync, events and deliverability records. Authentication and warm-up are handled properly.",
      icon: "workflow",
    },
    {
      title: "Retention analytics",
      body: "Reporting on open rate, click-through, conversion and LTV impact, split by flow and campaign. Repeat purchase rate is the headline number, not list size.",
      icon: "line-chart",
    },
  ],
  faqs: [
    {
      q: "Which platforms do you use?",
      a: "Commonly Klaviyo for email and Twilio for SMS, with WhatsApp run through the official Business API, connected to Shopify or your marketplace order data. If you already run a different stack, we work inside it rather than forcing a migration you did not ask for.",
    },
    {
      q: "How do you handle opt-in compliance?",
      a: "Consent is collected and recorded per channel, and WhatsApp messaging stays inside approved template categories and session windows. We also maintain suppression and frequency rules, because a blocked sender or a damaged domain reputation is far more costly than a missed send.",
    },
    {
      q: "Can you integrate with my CRM?",
      a: "Yes. We connect your store, CRM and support tools so segments reflect real order and service history rather than email engagement alone. Where a native integration does not exist, we sync the required events through the platform APIs.",
    },
    {
      q: "How soon does retention work show up in revenue?",
      a: "Automated flows start earning as soon as they are live, since they trigger on behaviour that is already happening. The larger gains in repeat purchase rate and lifetime value build over the following months as segments mature and testing compounds.",
    },
  ],
  icon: "mail",
  seo: {
    title: "Retention Marketing: Email, SMS & WhatsApp",
    description:
      "Owned-channel journeys that lift repeat purchase rate: welcome, abandonment, post-purchase and win-back flows across email, SMS and WhatsApp. Segmented by RFM.",
  },
  status: "published",
};
