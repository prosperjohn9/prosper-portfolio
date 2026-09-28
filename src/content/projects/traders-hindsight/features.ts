import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { screenshots } from "@/content/projects/traders-hindsight/screenshots";

export const features = {
  id: "features",
  title: "What it does",
  blocks: [
    { kind: "figure", shot: screenshots.dashboard },
    {
      kind: "features",
      items: [
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
            "Tracks the rules of any prop firm, with ready-made presets for FTMO, FundingPips, FundedNext, The5ers and Alpha Capital. It disconnects an account automatically when it breaches one.",
          ],
        },
        {
          name: "Insight",
          description: [
            "An AI coach on the Anthropic Claude API that reads a trader's full history.",
          ],
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
      ],
    },
    { kind: "figure-pair", shots: [screenshots.foresight, screenshots.equity] },
  ],
} satisfies CaseStudySection<ReceiptId>;
