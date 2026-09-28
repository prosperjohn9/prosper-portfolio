import type { ProductRule } from "@/domain/portfolio";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";

export const howIWork = {
  title: "How I work",
  positions: {
    title: "What I write about",
    items: [
      {
        rule: "I own what ships, even when AI wrote it",
        reason: [
          "I use AI to explore, scaffold, test and debug, then slow down for architecture, security, data handling and failure modes. The skill is knowing what to verify.",
        ],
      },
      {
        rule: "Types are a shared language",
        reason: [
          "Between the API, the interface and the engineers changing both. I want types that state the business rules and rule out invalid states, not clever ones. The goal is fewer surprises in production.",
        ],
      },
      {
        rule: "Connecting an agent is the easy part",
        reason: [
          "The real work is around it: what it may touch, checks on what it does, a record of every action, and approval before anything destructive. Every tool it gets widens what can go wrong.",
        ],
      },
      {
        rule: "Ask how it will fail before it ships",
        reason: [
          "What will we measure? Can we roll it back? What if traffic is ten times higher? I learned to ask on systems serving 250,000+ users, and I ask it on new products too.",
        ],
      },
    ] satisfies ProductRule[],
    more: "Read my posts on LinkedIn",
  },
  decisions: {
    title: "Decisions I make on every product",
    intro: [
      "Each one is in the code of The Trader's Hindsight.",
      { cite: "in-the-code" },
    ] satisfies RichText<ReceiptId>,
    items: [
      {
        rule: "Each part holds only the keys it needs",
        reason: [
          "A process that talks to outside services gets the secrets for that job and no others, so a leak in one part does not open the rest.",
        ],
      },
      {
        rule: "Every figure has one definition",
        reason: [
          "Money is worked out in one place, net of fees, so the dashboard, the reports and the AI never quote two different results for the same trade.",
        ],
      },
      {
        rule: "Days follow the user's clock",
        reason: [
          "A trade opened at 8:30 on a Monday morning in Sydney counts as Monday, although it is still Sunday in UTC.",
        ],
      },
      {
        rule: "Errors carry a reference, not a cause",
        reason: [
          "People see a plain sentence and a short reference. The cause goes to the logs and to Sentry under that reference, never to the browser.",
        ],
      },
      {
        rule: "A payment is claimed before anything is granted",
        reason: [
          "Each payment is recorded once before a plan is granted, so a webhook that arrives twice cannot grant a plan twice. Card amounts are checked to the cent.",
        ],
      },
      {
        rule: "Spending limits are reserved before the call",
        reason: [
          "Each capped AI request reserves its place first, then settles or releases it, so two requests at the same moment cannot go past a plan's limit.",
        ],
      },
    ] satisfies ProductRule[],
  },
};
