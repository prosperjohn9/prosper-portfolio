import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";

export const why = {
  id: "why",
  title: "The question it answers",
  blocks: [
    {
      kind: "intro",
      text: [
        "A journal shows what happened. It does not say what each habit cost, or whether the month would have been positive without it. The Trader's Hindsight answers that.",
      ],
    },
  ],
} satisfies CaseStudySection<ReceiptId>;
