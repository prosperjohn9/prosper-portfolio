import type { Note } from "@/domain/note";

export const typesAreASharedLanguage: Note = {
  slug: "types-are-a-shared-language",
  title: "Types are a shared language",
  published: "2026-08-31",
  source: {
    text: "LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7500126514341052416/",
  },
  paragraphs: [
    "TypeScript is often described as JavaScript with types. I think that undersells it.",
    "In a growing product, types become a shared language between the API, UI and the engineers changing both. They expose unclear contracts early, make refactoring safer and reduce the number of assumptions hidden in a codebase.",
    "That matters even more in the AI era. Generated code is fast, but explicit types make intent easier for humans and tools to verify.",
    "My preference is not to chase perfect type-level cleverness. I want types that clarify business rules, narrow invalid states and make the next engineer faster.",
    "The goal is not more types. The goal is fewer surprises in production.",
  ],
};
