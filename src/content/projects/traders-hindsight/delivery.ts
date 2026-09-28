import { approximately, formatCount } from "@/domain/format";
import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { stats } from "@/content/stats";

export const delivery = {
  id: "delivery",
  title: "Tested, then shipped by the pipeline",
  blocks: [
    {
      kind: "intro",
      text: [
        "The repository has ",
        {
          claim: `${formatCount(stats.testFiles)} automated test files, about ${formatCount(approximately(stats.testLines, 500))} lines`,
          receipt: "repo-count",
        },
        ". A push to main puts the web app live only after these steps pass, in this order.",
      ],
    },
    {
      kind: "steps",
      steps: [
        { name: "Secret scan", detail: "Every tracked file" },
        { name: "Lint", detail: "Including rules that keep server code out of the browser" },
        { name: "Type check" },
        { name: "Tests", detail: "Every test file, on every push" },
        { name: "Production build" },
        { name: "Deploy", detail: "The web app, from main only" },
      ],
    },
    {
      kind: "text",
      text: [
        "A weekly audit reports dependencies with known vulnerabilities.",
        { cite: "in-the-code" },
      ],
    },
  ],
} satisfies CaseStudySection<ReceiptId>;
