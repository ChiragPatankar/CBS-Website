/**
 * Cross-border trade, tax and compliance services — the /cross-border-services page.
 *
 * Copy is the client's own service list, kept close to verbatim (spelling fixes
 * only). Unlike the twelve pillar services these have no detail pages yet, so
 * the list lives here as plain data rather than as `Service` records.
 */
import type { IconName } from "@/lib/icons";
import type { Seo } from "./types";

export type CoreService = { title: string; body: string; icon: IconName };

export type RegionServices = {
  /** Anchor id on the page. */
  id: string;
  name: string;
  items: string[];
};

export const crossBorderServices = {
  eyebrow: "Cross-Border Services",
  h1: "Trade, tax and compliance for selling anywhere",
  sub: "Market entry, tax registration, importer of record, compliance, logistics and warehousing, handled by one team in every market you sell into.",

  core: [
    {
      title: "International Market Expansion Consultancy Services",
      body: "Let us expand now when marketplaces are offering the option of global selling, why not test the market through our network and expand your online presence to go retail as well eventually in new geographies?",
      icon: "globe",
    },
    {
      title: "Tax Registration, Return Filing and Consultancy Services",
      body: "Our expert tax consultants can empower you with compliant strategies and solutions to do business cost effectively in any part of the world.",
      icon: "file-text",
    },
    {
      title: "Global Importer of Record (IOR) and Exporter of Record (EOR) Services",
      body: "Go to your target market through us, let us import for you, for you to get rid of associated challenges. We will deal with customs, compliance authorities and ministries for you.",
      icon: "package",
    },
    {
      title: "Global Trade Compliance, Customs Compliance and Product Compliance",
      body: "Let us get the compliance met for you and all your customers for you to expand seamlessly. Compliance is yet another piece of cake for our experts.",
      icon: "badge-check",
    },
    {
      title: "International Logistics",
      body: "Visit the world on our air, sea and land global freight forwarding and courier network. We can take you door to door.",
      icon: "truck",
    },
    {
      title: "Warehousing and Distribution Services for B2B and B2C Sectors",
      body: "Ship bulk and save your logistics cost per piece. We are all ready to store and distribute your cargo in both ambient and temperature-controlled environments for your customers.",
      icon: "warehouse",
    },
  ] satisfies CoreService[],

  regions: [
    {
      id: "usa",
      name: "USA",
      items: [
        "USA LLC Setup",
        "USA Tax Filing & ITIN",
        "FDA/MOCRA Registration",
        "Label Review Service",
        "USA IOR/Prior Notice",
        "CPSC Compliance",
        "Sales Tax Registration & Filing",
        "Trademark Registration",
      ],
    },
    {
      id: "eu",
      name: "European Union",
      items: [
        "VAT Registration & Return Filing",
        "Importer-on-Record Services",
        "Germany EPR Compliance",
        "Company Incorporation Services",
        "CPNP Registration",
        "Label Review",
        "Authorized Representative / GPSR",
        "Trademark Registration",
      ],
    },
    {
      id: "mid-east",
      name: "Mid-East",
      items: [
        "Importer-on-Record Services in UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain",
        "Company Incorporation Services in UAE & Saudi Arabia",
        "UAE Corporate Tax Registration & Filing",
        "Trademark Registration in UAE & Saudi Arabia",
        "VAT Registration in UAE & Saudi Arabia",
        "Return Filing in UAE & Saudi Arabia",
        "Warehousing, Distribution and Returns Management in UAE & Saudi Arabia",
      ],
    },
    {
      id: "uk",
      name: "UK",
      items: [
        "VAT Registration & Return Filing",
        "Authorized Representative",
        "Company Incorporation Services",
        "FSA Registration",
        "Label Review Service",
        "SCPN Registration",
        "Trademark Registration",
      ],
    },
    {
      id: "canada",
      name: "Canada",
      items: [
        "CBN/GST Registration",
        "GST Return Filing",
        "Company Incorporation Services",
        "CFIA & Health Canada Compliance for Food & Cosmetic Products & Label Compliance",
        "Trademark Registration",
      ],
    },
    {
      id: "australia",
      name: "Australia",
      items: ["ABN/GST Registration", "Return Filing", "Book Keeping", "Trademark Registration"],
    },
  ] satisfies RegionServices[],

  other: {
    id: "other",
    name: "Other Miscellaneous Services",
    items: [
      "Entity Formations, Annual Filings and Statutory Compliances",
      "GST Registration, Filing & Other GST Compliances",
      "IEC/LUT/AD Code Registration",
      "Indian FSSAI Compliance",
      "Spices Board of India Compliance",
      "Tea Board of India Compliance",
      "Coffee Board of India Compliance",
      "APEDA Compliance",
      "Payment & Shipping Bill Reconciliation",
      "FEMA (Foreign Exchange Management Act) Compliance",
      "Book-Keeping Services for E-Commerce Sellers",
      "GST Refunds for Exporters",
      "Direct & Indirect Taxation Advisory",
      "LEI Registration (Legal Entity Identifier)",
      "SOFTEX Filing",
    ],
  } satisfies RegionServices,

  seo: {
    title: "Cross-Border Services: IOR, Tax & Compliance",
    description:
      "Importer of record, VAT, sales tax, product compliance, incorporation, logistics and warehousing for sellers in the USA, EU, UK, Mid-East, Canada and Australia.",
  } satisfies Seo,
};
