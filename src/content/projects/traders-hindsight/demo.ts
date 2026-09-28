import type { HindsightDemoCopy } from "@/domain/hindsight";
import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { demoMonth, demoTrades } from "@/content/projects/traders-hindsight/demo-trades";
import { screenshots } from "@/content/projects/traders-hindsight/screenshots";

/** The demo's words. Habits carry the names used on the product's public landing page. */
export const demoCopy = {
  title: "What did these habits cost this month?",
  exampleLabel: `Example data: ${demoTrades.length} made-up trades.`,
  totalLabel: `${demoMonth.name} net P&L`,
  prompt: "Take a habit out to replay the month without it.",
  noScriptPrompt: "Habits are ranked by what each one cost.",
  asTraded: "As traded:",
  footnote:
    "Each habit's cost is worked out on its own. With two taken out, a trade that matches both is taken out once.",
  takeOut: "Take out",
  putBack: "Put back",
  reset: "Put all back",
  better: "Without {habits}, the month is {amount} better.",
  winRate: "Win rate {rate} on the {count} trades left.",
  and: "and",
  tradesSummary: `See the ${demoTrades.length} trades`,
  table: {
    day: "Day",
    pair: "Pair",
    habits: "Habits",
    pnl: "P&L",
    replayed: "Replayed",
    none: "None",
    removed: "Taken out",
  },
  chartCaption: `Trades by day of ${demoMonth.name}. Letters mark the habits behind a trade; dashed outlines are trades taken out.`,
  habits: {
    revenge: { key: "R", name: "Revenge trades after a loss", phrase: "revenge trades" },
    sizing: { key: "S", name: "Sizing up after a loss", phrase: "sizing up after a loss" },
    tilt: { key: "T", name: "Tilt", phrase: "trades on tilt" },
  },
} satisfies HindsightDemoCopy;

export const demo = {
  id: "demo",
  title: "The core idea, working",
  blocks: [
    {
      kind: "intro",
      text: [
        "Hindsight replays a trader's month without each costly habit and ",
        { claim: "ranks the habits by the dollars they cost", receipt: "screenshot-hindsight" },
        ". The panel below shows the idea on made-up trades that come labelled with their habits. Take a habit out to see the month without it.",
      ],
    },
    { kind: "hindsight-demo", trades: demoTrades, copy: demoCopy },
    // The real report, after the demo.
    { kind: "figure", shot: screenshots.hindsight },
  ],
} satisfies CaseStudySection<ReceiptId>;
