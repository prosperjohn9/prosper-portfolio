import type { Note } from "@/domain/note";

export const howWillThisFail: Note = {
  slug: "how-will-this-fail",
  title: "Ask how it will fail before it ships",
  published: "2026-09-02",
  source: {
    text: "LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7500851264335872000/",
  },
  paragraphs: [
    "Working on systems serving more than 250,000 active users changed my definition of a ‘small’ engineering decision.",
    "At scale, a slow query is not just a slow query. It becomes infrastructure cost. A vague error message becomes a support burden. A missing retry strategy becomes lost trust.",
    "I learned to ask earlier: How will this fail? What will we measure? Can we roll it back? What happens when traffic is ten times higher?",
    "Scale does not always require a complicated architecture. It requires deliberate decisions, useful observability and respect for the operational life of the code after deployment.",
    "That is the mindset I now bring even to zero-to-one products.",
  ],
};
