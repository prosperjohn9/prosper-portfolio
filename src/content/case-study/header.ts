import type { Fact } from "@/domain/portfolio";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";

export const header = {
  title: "The Trader's Hindsight",
  lede: [
    "A trading journal that shows forex and prop-firm traders, in money, what their habits cost them. ",
    { claim: "I designed, built and run it on my own", receipt: "git-history" },
    ", from the first commit on 28 December 2025 to ",
    { claim: "a live subscription product", receipt: "live-site" },
    ".",
  ] satisfies RichText<ReceiptId>,
  facts: [
    { term: "Role", detail: "Founder and only engineer" },
    { term: "Built", detail: "December 2025 to now" },
    { term: "Price", detail: "From $12 a month" },
    {
      term: "Stack",
      detail: "Next.js 16, React 19, TypeScript, Supabase (PostgreSQL), Node.js",
    },
  ] satisfies Fact[],
};

export const why = {
  title: "Why I built it",
  text: [
    "From June 2025 to September 2026 I took 20 prop-firm challenges across four firms and ",
    { claim: "ended $4,428 down after refunds", receipt: "founder-story" },
    ". A journal shows what happened. It does not say what each habit cost, or whether the month would have been positive without it. That is the question the product answers.",
  ] satisfies RichText<ReceiptId>,
};
