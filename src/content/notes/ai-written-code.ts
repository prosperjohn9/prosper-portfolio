import type { Note } from "@/domain/note";

export const aiWrittenCode: Note = {
  slug: "ai-written-code",
  title: "I own what ships, even when AI wrote it",
  published: "2026-08-30",
  source: {
    text: "LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7499752576263892993/",
  },
  paragraphs: [
    "AI can produce code in seconds. The harder question is whether that code belongs in production.",
    "My rule is simple: use AI to accelerate exploration, scaffolding, tests and debugging – then slow down for architecture, security, data handling and failure modes.",
    "The best AI-assisted engineers are not the ones who accept the most suggestions. They are the ones who know what to verify.",
    "In my workflow, I ask: What assumption did the model make? What happens when the dependency fails? Is the output observable? Can another engineer maintain it six months from now?",
    "AI changes how fast we can build. It does not remove our responsibility for the outcome.",
  ],
};
