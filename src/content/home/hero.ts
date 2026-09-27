import { formatCount } from "@/domain/format";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { stats } from "@/content/stats";

/** The largest whole hundred thousand the counted lines exceed, so the claim stays true. */
const linesFloor = Math.floor(stats.typescriptLines / 100_000) * 100_000;

export const hero = {
  lede: [
    "I designed, built and run The Trader's Hindsight, ",
    { claim: "a live subscription SaaS for forex and prop-firm traders", receipt: "live-site" },
    ". It is ",
    {
      claim: `over ${formatCount(linesFloor)} lines of TypeScript with ${formatCount(stats.testFiles)} automated test files`,
      receipt: "repo-count",
    },
    ". Before that, I spent almost four years building ",
    {
      claim: "REST APIs and payment integrations for a London e‑commerce platform",
      receipt: "mtrendz",
    },
    ", remotely.",
  ] satisfies RichText<ReceiptId>,
  availability: {
    headline: "Open to full stack, backend and product engineering roles.",
    detail: "Remote, in Abuja or Lagos, or abroad with visa sponsorship.",
  },
  portraitAlt: "Portrait of Prosper Osaigbovo",
};
