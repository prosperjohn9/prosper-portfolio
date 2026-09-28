import type { Project } from "@/domain/portfolio";

export const isiLens = {
  slug: "isi-lens",
  name: "Isi Lens",
  period: "2026",
  summary:
    "A photography portfolio with a 3D gallery you walk through like a museum, and the brand identity and logo to go with it.",
  role: "Designer and developer, through HTA Studio",
  stack: ["Next.js", "Tailwind CSS", "react-three-fiber"],
  site: { text: "isilens.co.uk", href: "https://isilens.co.uk" },
} satisfies Project;
