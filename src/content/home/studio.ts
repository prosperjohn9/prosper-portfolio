import type { ClientProject } from "@/domain/portfolio";

export const studio = {
  title: "HTA Studio, for small businesses",
  intro: "HTA Studio is my web arm. It builds sites for small businesses.",
  projects: [
    {
      name: "GoldenCrest",
      href: "https://goldencrestservices.com",
      description:
        "Business site for an AI film and imagery studio, with a self-serve admin panel. Next.js 16 and Supabase.",
    },
    {
      name: "Isi Lens",
      href: "https://isilens.co.uk",
      description:
        "Photography portfolio with a 3D gallery you walk through like a museum, built with react-three-fiber.",
    },
  ] satisfies ClientProject[],
  enquiry: { label: "Email me about a site", subject: "A website for my business" },
};
