import type { ProductRule } from "@/domain/portfolio";
import type { ReceiptId } from "@/content/receipts";

export const architecture = {
  title: "How it is built",
  intro:
    "Next.js 16, React 19 and TypeScript on Supabase (PostgreSQL). These are the decisions that shaped it. None of them is about trading; I would make them on any product.",
  decisions: [
    {
      rule: "Each part holds only the keys it needs",
      reason: [
        "A process that talks to outside services gets the secrets for that job and no others, so a leak in one part does not open the rest.",
        { cite: "in-the-code" },
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
  ] satisfies ProductRule<ReceiptId>[],
};
