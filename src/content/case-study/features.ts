import type { Feature } from "@/domain/portfolio";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";

export const evidence = {
  title: "The Trader's Hindsight",
  story: [
    "From June 2025 to September 2026 I took 20 prop-firm challenges across four firms. ",
    { claim: "I ended $4,428 down after refunds and was never funded", receipt: "founder-story" },
    ". So I built the tool I wished I had: a trading journal that shows traders which habits cost them money, and what they saved by stopping.",
  ] satisfies RichText<ReceiptId>,
  features: [
    {
      name: "Hindsight",
      description: [
        "Replays a month as if each costly habit never happened, then ranks the habits by the dollars they cost.",
        { cite: "screenshot-hindsight" },
      ],
    },
    {
      name: "Foresight",
      description: [
        "A read-only co-pilot. It sends a risk check to Telegram as each trade opens, then grades its own warnings A to F against how the trades closed.",
        { cite: "screenshot-foresight" },
      ],
    },
    {
      name: "Firm Fit",
      description: [
        "Replays a trader's real trades against each prop firm's rule book to estimate the chance of passing.",
        { cite: "firm-fit-page" },
      ],
    },
    {
      name: "Rule tracking",
      description: [
        "Tracks the rules of FTMO, FundingPips, FundedNext, The5ers and Alpha Capital, and disconnects an account automatically when it breaches one.",
      ],
    },
    {
      name: "Insight",
      description: ["An AI coach on the Anthropic Claude API that reads a trader's full history."],
    },
    {
      name: "Trade sync and import",
      description: [
        "Read-only sync from cTrader (Open API) and MetaTrader, and CSV or Excel import from five platforms.",
      ],
    },
    {
      name: "Billing",
      description: [
        "Cards through Flutterwave and crypto through NOWPayments, both confirmed by webhooks.",
      ],
    },
  ] satisfies Feature<ReceiptId>[],
  stack: "Built with Next.js 16, React 19, TypeScript and Supabase (PostgreSQL).",
};
