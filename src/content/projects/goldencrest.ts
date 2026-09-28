import type { Project } from "@/domain/portfolio";

export const goldenCrest = {
  slug: "goldencrest",
  name: "GoldenCrest",
  period: "2026",
  summary:
    "The website of an AI film and imagery studio: its work, services, two talk shows and a shop for books and classes, with an admin panel the studio runs itself.",
  role: "Developer, through HTA Studio",
  stack: ["Next.js 16", "TypeScript", "Supabase"],
  site: { text: "goldencrestservices.com", href: "https://goldencrestservices.com" },
} satisfies Project;
