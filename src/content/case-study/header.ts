import type { Fact } from "@/domain/portfolio";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { tradersHindsight } from "@/content/projects";

export const header = {
  title: tradersHindsight.name,
  lede: [
    "A trading journal that shows forex and prop-firm traders, in money, what their habits cost them. ",
    { claim: "I designed, built and run it on my own", receipt: "git-history" },
    ", from the first commit on 28 December 2025 to ",
    { claim: "a live subscription product", receipt: "live-site" },
    ".",
  ] satisfies RichText<ReceiptId>,
  facts: [
    { term: "Role", detail: tradersHindsight.role },
    { term: "Built", detail: tradersHindsight.period },
    { term: "Price", detail: "From $12 a month" },
    { term: "Stack", detail: tradersHindsight.stack.join(", ") },
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
