import type { Project } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { profile } from "@/content/profile";
import { call } from "@/content/projects/traders-hindsight/call";
import { delivery } from "@/content/projects/traders-hindsight/delivery";
import { demo } from "@/content/projects/traders-hindsight/demo";
import { features } from "@/content/projects/traders-hindsight/features";
import { firmFit } from "@/content/projects/traders-hindsight/firm-fit";
import { numbers } from "@/content/projects/traders-hindsight/numbers";
import { security } from "@/content/projects/traders-hindsight/security";
import { why } from "@/content/projects/traders-hindsight/why";

export const tradersHindsight = {
  slug: "traders-hindsight",
  name: "The Trader's Hindsight",
  period: "Dec 2025 to now",
  summary:
    "A trading journal that shows forex and prop-firm traders what their habits cost them, in money. Live, with plans from $12 a month.",
  role: "Founder and only engineer",
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase (PostgreSQL)", "Node.js"],
  site: { text: "tradershindsight.com", href: profile.links.product },
  caseStudy: {
    description:
      "How I designed, built and run a live SaaS for forex and prop-firm traders: what it does, a working demo of its core idea, how it is secured and how it ships. Every claim links to its proof.",
    lede: [
      "A trading journal that shows forex and prop-firm traders, in money, what their habits cost them. ",
      { claim: "I designed, built and run it on my own", receipt: "git-history" },
      ". ",
      { claim: "It is a live subscription product", receipt: "live-site" },
      ".",
    ],
    facts: [{ term: "Price", detail: "From $12 a month" }],
    sections: [why, features, demo, firmFit, security, delivery, numbers, call],
  },
} satisfies Project<ReceiptId>;
