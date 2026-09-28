import type { Project } from "@/domain/portfolio";
import { profile } from "@/content/profile";

export const tradersHindsight = {
  slug: "traders-hindsight",
  name: "The Trader's Hindsight",
  period: "Dec 2025 to now",
  summary:
    "A trading journal that shows forex and prop-firm traders what their habits cost them, in money. Live, with plans from $12 a month.",
  role: "Founder and only engineer",
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase (PostgreSQL)", "Node.js"],
  caseStudy: true,
  site: { text: "tradershindsight.com", href: profile.links.product },
} satisfies Project;
