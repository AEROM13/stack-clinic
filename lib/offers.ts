export type Severity = "critical" | "warn" | "pass";

export interface Offer {
  id: string;
  index: string;
  name: string;
  codename: string;
  severity: Severity;
  tag: string;
  price: string;
  priceNote: string;
  promise: string;
  audience: string;
  checks: string[];
  deliverable: string;
  options: string[];
  cta: string;
}

/** Source of truth for the three operations (see offers.md). */
export const OFFERS: Offer[] = [
  {
    id: "cold-email",
    index: "01",
    name: "Cold Email Setup",
    codename: "Outbound-in-a-Box",
    severity: "pass",
    tag: "5-day build",
    price: "£750",
    priceNote: "fixed · live in 5 working days",
    promise: "Your cold email system, built and live in 5 working days.",
    audience:
      "For B2B founders and agencies who know they should be doing outbound but don’t want to spend three weeks learning DNS and deliverability.",
    checks: [
      "2–3 secondary sending domains bought & configured — your main domain never touches cold email",
      "6–9 mailboxes set up and warmed",
      "Full authentication — SPF, DKIM, DMARC — so inbox providers trust you",
      "Sending tool configured: schedules, reply detection, sequences loaded",
      "500+ verified leads matched to your exact customer profile",
      "A 3-step email sequence written for your offer",
      "Handover video + 1-page SOP so you run it yourself from day 6",
    ],
    deliverable:
      "Proof: this is the exact system behind my own SaaS’s acquisition — the email that reached your primary inbox from a young domain is the product working.",
    options: ["Keep-it-fed retainer — £250/mo: fresh leads, iteration, deliverability monitoring"],
    cta: "Build my outbound",
  },
  {
    id: "security-audit",
    index: "02",
    name: "SaaS Security Audit",
    codename: "Find the holes first",
    severity: "critical",
    tag: "3-day audit",
    price: "£500",
    priceNote: "fixed · report in 3 working days",
    promise: "I’ll find the holes in your SaaS before someone else does.",
    audience:
      "For founders running Next.js / Supabase / Vercel products with real users and real data — especially if “we’ll sort security later” is still on the list.",
    checks: [
      "Every API route for missing or broken auth",
      "Supabase Row Level Security policies — the #1 silent failure in indie SaaS",
      "Exposed keys, env handling, and service-role leakage",
      "Rate limiting and abuse vectors",
      "IDOR — can user A see user B’s data?",
      "Stripe webhook and payment-flow security",
    ],
    deliverable:
      "A severity-ranked report (Critical → Low) with reproduction steps and a code-level fix checklist, delivered on a 30-minute walkthrough call.",
    options: [
      "Want it fixed, not just found? Audit + implementation from £1,000",
      "Launching this week? 72-hour priority audit — £750",
    ],
    cta: "Audit my SaaS",
  },
  {
    id: "cost-audit",
    index: "03",
    name: "Infrastructure Cost Audit",
    codename: "Stop the leak",
    severity: "warn",
    tag: "fix or refund",
    price: "£600",
    priceNote: "fixed · or pay from savings",
    promise: "I’ll cut your Supabase / Vercel / API bills — or you don’t pay.",
    audience:
      "For founders whose infrastructure and API costs are scaling faster than revenue. AI bills, Google API bills, database and bandwidth bills creep — most of the creep is waste.",
    checks: [
      "External API spend (Google, OpenAI/Anthropic, enrichment) — caching that takes repeat-call costs to near zero",
      "Supabase: query patterns, indexes, egress, storage",
      "Vercel: function duration, cold starts, image & bandwidth optimisation",
      "Email/sending costs and third-party subscriptions you’re double-paying",
    ],
    deliverable:
      "The changes implemented — not just recommended — plus a before/after cost report.",
    options: [
      "£600 fixed — full refund if savings don’t beat my fee over 12 months",
      "No upfront — 30% of your first-year savings. I only win if you save.",
    ],
    cta: "Cut my bills",
  },
];
