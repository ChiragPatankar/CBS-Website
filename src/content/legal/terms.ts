/**
 * Terms of Service — FIRST DRAFT, NOT LEGALLY REVIEWED.
 *
 * No terms existed on the live site, so this is a standard services-agency
 * baseline drafted to be structurally complete and honest about what CrossBorder
 * actually does. `reviewRequired: true` renders a visible notice; keep it true
 * until an Indian-qualified lawyer has signed off.
 *
 * Known items for that review: whether the entity is a sole proprietorship or a
 * registered company, GST treatment and invoicing terms, the liability cap
 * figure, notice periods, data-processing terms for platform account access, and
 * whether disputes go to arbitration or straight to the Mumbai courts.
 */
import type { LegalDoc } from "../types";

export const terms: LegalDoc = {
  title: "Terms of Service",
  updated: "2026-08-07",
  intro:
    "These terms govern your use of this website and any services provided by CrossBorder Business Solution (\"CrossBorder\", \"we\", \"us\"). Where we have signed a separate proposal, statement of work or master services agreement with you, that document governs the engagement and these terms fill any gaps.",
  reviewRequired: true,
  sections: [
    {
      id: "scope-of-services",
      heading: "Scope of services",
      body: [
        "CrossBorder provides ecommerce growth services to businesses, including marketplace cataloging and account management, cross-border marketplace enablement, performance advertising, conversion and storefront work, retention marketing, and technology and AI development.",
        "The specific services, deliverables, timelines and fees for any engagement are set out in a written proposal or statement of work. Nothing on this website is an offer to provide services, and no engagement begins until both parties have accepted a written scope.",
        "Services are advisory and operational. We do not guarantee any particular commercial result, including revenue, ranking, return on ad spend, traffic or conversion outcomes. Any figures shown on this website are historical or illustrative and are not a forecast of your results.",
      ],
    },
    {
      id: "engagement-and-fees",
      heading: "Engagement and fees",
      body: [
        "Fees, billing frequency and payment terms are stated in the applicable scope. Unless stated otherwise, fees are invoiced in advance for retainers and on milestone completion for project work, and are payable within the period stated on the invoice.",
        "Fees are exclusive of applicable taxes, which are charged in addition where required by law. Third-party costs — including media spend, platform fees, subscriptions, licences and production costs — are your responsibility and are not included in our fees unless expressly stated.",
        "We do not hold or fund media budgets unless a scope says so. Where advertising accounts are billed directly to you by the platform, you remain responsible for those charges. Overdue amounts may lead to suspension of services after written notice.",
        "Work outside the agreed scope is quoted and approved in writing before it starts.",
      ],
    },
    {
      id: "client-responsibilities",
      heading: "Your responsibilities",
      body: [
        "Our work depends on your input. You agree to provide timely access to the accounts, platforms, analytics, product data, brand assets and approvals the engagement requires, and to nominate a decision-maker who can give and receive approvals.",
        "You are responsible for the accuracy and legality of the material you supply, including product claims, pricing, ingredient and compliance information, imagery and any third-party content, and for holding the rights needed for us to use it.",
        "You are responsible for your products, order fulfilment, customer service, returns, taxes and regulatory compliance in every market you sell in.",
        "Delays in access, approvals or materials will move timelines. Where a delay leaves resourced work idle, we may re-plan the schedule and any resulting cost impact will be discussed with you in writing.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      body: [
        "You retain all rights in your brand assets, trademarks, product data, customer data and any materials you supply to us.",
        "On full payment of the fees due for the relevant work, we assign or licence to you the rights in the final deliverables produced specifically for you under a scope — including creative assets, listing content, custom code and documentation — as set out in that scope.",
        "We retain ownership of our pre-existing and background materials: our methods, frameworks, benchmarks, templates, internal tooling, dashboards, libraries and know-how, along with anything we develop independently of your engagement. Where a deliverable incorporates these, you receive a perpetual, non-exclusive licence to use them as part of that deliverable.",
        "Third-party components, including open-source software, fonts, stock assets and platform APIs, remain subject to their own licences, which you agree to observe.",
        "We may describe the general nature of the work in our portfolio and marketing. We will not publish your name, logo, results or any figure from your accounts without your prior written approval.",
      ],
    },
    {
      id: "confidentiality",
      heading: "Confidentiality",
      body: [
        "Each party will keep the other's confidential information confidential, use it only for the engagement, and protect it with at least reasonable care. Confidential information includes commercial terms, margins, account data, roadmaps, customer data and anything identified as confidential or which is obviously so.",
        "This does not apply to information that is already public through no breach of these terms, was already lawfully known to the recipient, is independently developed, or must be disclosed by law or a competent authority. Where disclosure is legally required, the disclosing party will give notice where it is lawful to do so.",
        "Where we process personal data on your behalf — for example customer lists used in advertising platforms — each party will comply with applicable data protection law, and we will process that data only on your instructions and for the purposes of the engagement.",
        "Confidentiality obligations continue for three years after the engagement ends, and indefinitely for anything that qualifies as a trade secret.",
      ],
    },
    {
      id: "third-party-platforms",
      heading: "Third-party platforms",
      body: [
        "Our services are delivered on and through platforms we do not control, including marketplaces, advertising networks, ecommerce and messaging platforms, analytics tools and cloud providers.",
        "Those platforms set their own policies, fees, algorithms, approval processes and enforcement actions, and can change them without notice. We are not responsible for platform outages, account suspensions, listing or ad rejections, policy changes, data loss on the platform side, or changes in performance caused by them, except to the extent directly caused by our own failure to exercise reasonable care.",
        "You are responsible for complying with the terms of the platforms you sell and advertise on. Where you ask us to act inside your platform accounts, you confirm that you are authorised to grant that access.",
        "We will follow platform policy as we understand it and will tell you promptly if we believe an instruction risks breaching one.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      body: [
        "Services are provided with reasonable skill and care. To the extent permitted by law, we give no other warranties, express or implied, including any implied warranty of merchantability or fitness for a particular purpose.",
        "Neither party is liable for indirect, incidental, special or consequential loss, or for loss of profit, revenue, goodwill, data or anticipated savings, however arising.",
        "Our total aggregate liability arising out of or in connection with an engagement is limited to the total fees paid by you to us for that engagement in the three months immediately before the event giving rise to the claim, excluding media spend and third-party costs passed through to you.",
        "Nothing in these terms limits liability that cannot be limited by law, including liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence, or wilful misconduct.",
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      body: [
        "Either party may terminate a retainer engagement by giving 30 days' written notice, unless the applicable scope states a different notice period or a minimum term.",
        "Either party may terminate immediately on written notice if the other commits a material breach and fails to remedy it within 15 days of being notified, or becomes insolvent or subject to winding-up proceedings.",
        "On termination you will pay for all services performed and third-party costs committed up to the termination date, including any non-cancellable commitments made with your approval. Fees for completed work are non-refundable.",
        "We will hand over the deliverables paid for, transfer or remove our access to your accounts as you direct, and return or delete your confidential information on request. Sections covering intellectual property, confidentiality, limitation of liability and governing law survive termination.",
      ],
    },
    {
      id: "website-use",
      heading: "Use of this website",
      body: [
        "This website is provided for information. Content may change without notice and we do not warrant that it is complete, current or error-free.",
        "You may not use this site to attempt unauthorised access, interfere with its operation, scrape it at a volume that degrades service for others, or reproduce substantial parts of its content without permission.",
        "All content on this site, including text, design, code and graphics, is owned by CrossBorder or its licensors, except for third-party trademarks and logos, which remain the property of their respective owners and appear only to identify those parties.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law and jurisdiction",
      body: [
        "These terms and any engagement are governed by the laws of India.",
        "The courts at Mumbai, Maharashtra have exclusive jurisdiction over any dispute arising out of or in connection with these terms, and both parties submit to that jurisdiction.",
        "Before starting proceedings, the parties will attempt in good faith to resolve the dispute through discussion between senior representatives for at least 30 days.",
      ],
    },
    {
      id: "changes-and-contact",
      heading: "Changes and contact",
      body: [
        "We may update these terms from time to time. The version published on this page at the time an engagement is signed applies to that engagement; changes to website terms take effect when published.",
        "Questions about these terms can be sent to support@cbbusinesssolution.com, or by post to CrossBorder Business Solution, Kandivali-West, Mumbai 400067, India.",
      ],
    },
  ],
  seo: {
    title: "Terms of Service",
    description:
      "The terms for CrossBorder engagements: scope, fees, client responsibilities, intellectual property, confidentiality, liability and jurisdiction.",
  },
};
