import type { Service } from "@/content/types";

export const cloud: Service = {
  slug: "cloud",
  pillar: "technology",
  name: "Cloud Infrastructure",
  navLabel: "Cloud Infrastructure",
  eyebrow: "Commerce infrastructure",
  h1: "Infrastructure that holds on sale day and does not eat the margin the rest of the year",
  problem:
    "Ecommerce load is not steady. A sale event, a marketplace campaign or one piece of coverage can multiply traffic in minutes, and infrastructure sized for that peak sits idle for the other eleven months while the invoice stays the same.",
  overview:
    "Cloud work for a commerce brand is a capacity and cost problem before it is a technology problem. The starting point is the demand shape — daily pattern, campaign spikes, sale events, marketplace order bursts — and the systems that have to survive it: storefront, checkout, order and inventory sync, reporting, and whatever feeds the marketplaces. From there the infrastructure is designed to scale on the components that actually move, kept flat on the ones that do not, and instrumented so an outage is visible before customers report it. Standard practice applies throughout: infrastructure defined as code so environments are reproducible, automated deployment with a rollback path, backups that have been restored at least once in a test, and a cost review that attributes spend to systems rather than presenting one aggregate bill.",
  overviewPoints: [
    "Capacity planned against real sale-event demand",
    "Infrastructure as code, with reproducible environments",
    "Monitoring and alerting on the order path first",
    "Cost attributed per system, reviewed on a cycle",
  ],
  platforms: [
    "AWS",
    "Google Cloud",
    "Microsoft Azure",
    "Vercel",
    "Cloudflare",
    "Docker",
    "Terraform",
    "PostgreSQL",
    "Redis",
    "GitHub Actions",
    "Grafana",
  ],
  benefits: [
    {
      title: "Capacity that follows demand",
      body: "Autoscaling, caching and CDN delivery are configured around the components that spike rather than the whole stack. Sale traffic is absorbed without provisioning peak capacity for a year to use it for a weekend.",
      icon: "server",
    },
    {
      title: "Spend you can attribute",
      body: "Resources are tagged and reported by system, so hosting, data transfer, storage and background processing can each be seen and questioned. Cloud bills grow quietly when nobody can tell which service is responsible.",
      icon: "trending",
    },
    {
      title: "Recovery that has been rehearsed",
      body: "Backups, replication and a documented restore procedure are tested rather than assumed. The difference between a tested restore and an untested one is only discovered at the worst possible moment.",
      icon: "refresh",
    },
  ],
  steps: [
    {
      title: "Infrastructure and demand review",
      body: "Inventory the current environments, dependencies and costs, and profile traffic and order volume including past sale peaks. Identify single points of failure on the order path.",
    },
    {
      title: "Target architecture and cost model",
      body: "Design the environment layout, networking, data stores, caching and scaling policy, with a projected cost at normal load and at peak so the trade-offs are explicit before anything is built.",
    },
    {
      title: "Provision and migrate",
      body: "Build the environment from version-controlled infrastructure definitions, migrate services in a planned sequence with data validated at each cut-over, and keep a rollback path available throughout.",
    },
    {
      title: "Observability and hardening",
      body: "Add metrics, logs, uptime checks and alert routing focused on checkout and order flow, apply access controls and secret management, then load test against the expected peak.",
    },
    {
      title: "Operating handover",
      body: "Document runbooks, escalation paths and the deployment process, and agree how ongoing monitoring, patching and cost review will be handled and by whom.",
    },
  ],
  deliverables: [
    {
      title: "Infrastructure audit and cost baseline",
      body: "Current-state inventory, risk list and a spend breakdown by service, with the load profile that capacity decisions are based on.",
      icon: "search",
    },
    {
      title: "Target architecture document",
      body: "Environment, network and data design with the scaling policy and projected cost at both normal and peak load.",
      icon: "cloud",
    },
    {
      title: "Infrastructure as code repository",
      body: "Version-controlled definitions for every environment so staging and production can be rebuilt from source.",
      icon: "code",
    },
    {
      title: "Deployment pipeline",
      body: "Automated build, test and release with staged rollout and a documented rollback procedure.",
      icon: "workflow",
    },
    {
      title: "Monitoring and alerting setup",
      body: "Dashboards, uptime checks and alert routing prioritised around the checkout and order-processing path.",
      icon: "gauge",
    },
    {
      title: "Backup and recovery plan",
      body: "Backup schedule, retention policy and a restore procedure that has been executed once as a test, with the result recorded.",
      icon: "database",
    },
  ],
  faqs: [
    {
      q: "Which cloud provider should we be on?",
      a: "For most commerce workloads the major providers are close enough on capability that the deciding factors are what your team can already operate, where your data has to sit for compliance, and committed-use pricing you may already have. The recommendation comes out of the audit stage. Provider choice matters far less than whether the architecture, monitoring and cost controls are right.",
    },
    {
      q: "Can you migrate without taking the store offline?",
      a: "Usually yes. Migrations are sequenced so traffic moves gradually with the old environment still available, and data is validated at each cut-over point before the previous system is retired. Some components — a primary database switch in particular — may need a short planned window, which is scheduled around your lowest-traffic period and agreed in advance.",
    },
    {
      q: "How do you keep cloud costs from drifting upward?",
      a: "Resources are tagged so spend can be attributed to a system, scaling policies have upper bounds, and non-production environments are shut down outside working hours. Beyond that it needs a review rhythm — an unexamined cloud account grows regardless of how well it was designed at the start.",
    },
    {
      q: "What happens during a sale event?",
      a: "Peak events are planned rather than absorbed. That means load testing against a target that exceeds the expected peak, pre-scaling ahead of the event where autoscaling would react too slowly, agreeing which non-essential background jobs can be paused, and having a named escalation path for the duration.",
    },
    {
      q: "Do you take over ongoing operations or hand it back to us?",
      a: "Both are workable and it is a commercial decision rather than a technical one. Either way the documentation, runbooks and infrastructure code are written so an in-house team can operate the environment without depending on the original builders.",
    },
  ],
  icon: "cloud",
  seo: {
    title: "Cloud Infrastructure for Ecommerce Operations",
    description:
      "Cloud hosting, data pipelines and monitoring for ecommerce brands — infrastructure sized for peak sale traffic and costed so it does not outgrow margin.",
  },
  status: "draft-unreviewed",
  reviewNote:
    "CrossBorder must confirm which cloud providers and tooling the team works with, whether migration and ongoing infrastructure operations are delivered in-house or through a partner, and what support cover and response commitments are actually offered, before this page is published.",
};
