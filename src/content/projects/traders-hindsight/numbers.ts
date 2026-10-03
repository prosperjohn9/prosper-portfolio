import { formatCount, formatDate } from "@/domain/format";
import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { profile } from "@/content/profile";
import { stats } from "@/content/stats";

const repository = ["Private repository"];
const site = { text: "tradershindsight.com", href: profile.links.product };

export const numbers = {
  id: "numbers",
  title: "The numbers, and where they come from",
  blocks: [
    {
      kind: "intro",
      text: [
        "Every figure about the product, with its source. The repository figures are counted by a script from the private code.",
      ],
    },
    {
      kind: "ledger",
      caption: `Repository figures counted on ${formatDate(stats.countedOn)}, at commit ${stats.commit}.`,
      rows: [
        {
          what: "Lines of TypeScript, not counting tests",
          figure: formatCount(stats.typescriptLines),
          source: repository,
        },
        { what: "Pages", figure: formatCount(stats.pages), source: repository },
        { what: "API routes", figure: formatCount(stats.apiRoutes), source: repository },
        { what: "Automated test files", figure: formatCount(stats.testFiles), source: repository },
        { what: "Lines of tests", figure: formatCount(stats.testLines), source: repository },
        {
          what: "Commits since December 2025",
          figure: formatCount(stats.commits),
          source: repository,
        },
        { what: "Price", figure: "$12 a month", source: [site] },
      ],
    },
  ],
} satisfies CaseStudySection<ReceiptId>;
