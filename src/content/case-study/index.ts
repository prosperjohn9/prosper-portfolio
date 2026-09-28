import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { architecture } from "@/content/case-study/architecture";
import { delivery } from "@/content/case-study/delivery";
import { demo } from "@/content/case-study/demo";
import { firmFit } from "@/content/case-study/firm-fit";
import { header, why } from "@/content/case-study/header";

export { architecture } from "@/content/case-study/architecture";
export { delivery } from "@/content/case-study/delivery";
export { demo } from "@/content/case-study/demo";
export { demoMonth, demoTrades } from "@/content/case-study/demo-trades";
export { firmFit } from "@/content/case-study/firm-fit";
export { header, why } from "@/content/case-study/header";
export { walkthrough } from "@/content/case-study/walkthrough";

/** The receipt-bearing blocks of the case study, top to bottom. */
export const caseStudyBlocks = {
  header: [header.lede],
  why: [why.text],
  demo: [demo.intro],
  firmFit: [firmFit.text],
  decisions: architecture.decisions.map((d) => d.reason),
  delivery: [delivery.intro, delivery.after],
} satisfies Record<string, readonly RichText<ReceiptId>[]>;

/** The screenshots the case study shows. */
export const caseStudyFigures = [demo.figure];

/** Every receipt-bearing text on the case study, in reading order. Receipt numbers follow it. */
export const caseStudyProse: readonly RichText<ReceiptId>[] = Object.values(caseStudyBlocks).flat();
