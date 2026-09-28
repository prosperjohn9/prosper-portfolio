import type { HabitId } from "@/domain/hindsight";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { demoMonth, demoTrades } from "@/content/case-study/demo-trades";
import { screenshots } from "@/content/screenshots";

/** How the demo names each habit: the names on the product's public landing page. */
interface HabitCopy {
  /** One letter, shown under the trades the habit produced. */
  key: string;
  name: string;
  /** The name inside a sentence: "Without revenge trades, …". */
  phrase: string;
}

export const demo = {
  title: "The core idea, working",
  intro: [
    "Hindsight replays a trader's month without each costly habit and ",
    { claim: "ranks the habits by the dollars they cost", receipt: "screenshot-hindsight" },
    ". The panel below shows the idea on made-up trades that come labelled with their habits. Take a habit out to see the month without it.",
  ] satisfies RichText<ReceiptId>,
  panel: {
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
    /** {habits} and {amount} are filled in by the demo. */
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
      tilt: {
        key: "T",
        name: "Third trade after two losses",
        phrase: "third trades after two losses",
      },
    } satisfies Record<HabitId, HabitCopy>,
  },
  /** The real report, shown after the demo. */
  figure: screenshots.hindsight,
};
