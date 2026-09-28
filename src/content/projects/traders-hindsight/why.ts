import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";

export const why = {
  id: "why",
  title: "Why I built it",
  blocks: [
    {
      kind: "intro",
      text: [
        "Between June 2025 and its launch in September 2026, I took 20 prop-firm challenges across four firms and ",
        { claim: "ended $4,428 down after refunds", receipt: "founder-story" },
        ". A journal shows what happened. It does not say what each habit cost, or whether the month would have been positive without it. That is the question the product answers.",
      ],
    },
  ],
} satisfies CaseStudySection<ReceiptId>;
