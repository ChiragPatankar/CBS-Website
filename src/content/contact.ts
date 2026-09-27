/**
 * Contact page content — hero, form schema and post-submit expectations.
 *
 * `fields` is the single source for the form: the rendered inputs and any
 * server-side validation should both read from here so they cannot drift.
 * Copy from the Contact / Hire section of docs/08-copy-rewrite.md.
 */
import type { Seo } from "./types";

export type FieldType = "text" | "email" | "tel" | "textarea" | "select";

export type ContactField = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  autoComplete?: string;
  /** Pre-selected value, set by the contact hero's intent chooser. */
  defaultValue?: string;
};

export type NextStep = { n: string; title: string; body: string };

export type Contact = {
  eyebrow: string;
  h1: string;
  sub: string;
  formIntro: string;
  whatHappensNext: NextStep[];
  valueRecap: string[];
  fields: ContactField[];
  submitLabel: string;
  seo: Seo;
};

export const contact: Contact = {
  eyebrow: "Contact",
  h1: "Let's build profit-driven success together.",
  sub: "From mission-led startups to established retail brands going DTC, we help businesses grow by aligning purpose with profit. We're not a \"digital marketing\" agency — we're a purpose-driven ecommerce growth company with a systemic approach to scaling your business.",
  formIntro:
    "Tell us a little about your business and a team member will reach out within 24 hours.",

  whatHappensNext: [
    {
      n: "01",
      title: "We read it properly",
      body: "An ecommerce specialist reviews what you sent and takes a look at your storefront and marketplace presence before replying. You will hear from a person, within one business day.",
    },
    {
      n: "02",
      title: "A 30-minute growth call",
      body: "We ask about margins, channels and what has already been tried, then tell you where we think the constraint is. If the honest answer is that you do not need us yet, we will say so on the call.",
    },
    {
      n: "03",
      title: "A written plan and a price",
      body: "If it is a fit, you get a short scope with profit-first benchmarks, a sequence of work and clear commercials. No retainer starts before you have seen the numbers we intend to be judged on.",
    },
  ],

  valueRecap: [
    "100+ brands scaled worldwide",
    "4.3× average growth in ROAS",
    "15+ global marketplaces operated",
    "85% annual client retention",
  ],

  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Your full name",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Work email",
      type: "email",
      required: true,
      placeholder: "you@company.com",
      autoComplete: "email",
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      required: true,
      placeholder: "Brand or company name",
      autoComplete: "organization",
    },
    {
      name: "website",
      label: "Website",
      type: "text",
      required: false,
      placeholder: "yourbrand.com",
      autoComplete: "url",
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      required: false,
      placeholder: "Include country code",
      autoComplete: "tel",
    },
    {
      name: "interest",
      label: "What do you need help with?",
      type: "select",
      required: true,
      options: [
        "Marketplace Solutions",
        "Digital Commerce Growth",
        "Technology & AI",
        "Not sure yet",
      ],
    },
    {
      name: "message",
      label: "What are you trying to fix or grow?",
      type: "textarea",
      required: true,
      placeholder:
        "Channels you sell on, roughly where you are today, and what is in the way.",
    },
  ],

  submitLabel: "Get started",

  seo: {
    title: "Contact Us | Book a Growth Call",
    description:
      "Tell us about your brand and an ecommerce specialist replies within 24 hours. Mumbai-based, working with consumer brands across 8+ countries.",
  },
};
