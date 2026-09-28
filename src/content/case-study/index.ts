import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { screenshots } from "@/content/screenshots";
import { delivery } from "@/content/case-study/delivery";
import { demo } from "@/content/case-study/demo";
import { features } from "@/content/case-study/features";
import { firmFit } from "@/content/case-study/firm-fit";
import { header, why } from "@/content/case-study/header";
import { security } from "@/content/case-study/security";

export { delivery } from "@/content/case-study/delivery";
export { demo } from "@/content/case-study/demo";
export { demoMonth, demoTrades } from "@/content/case-study/demo-trades";
export { features } from "@/content/case-study/features";
export { firmFit } from "@/content/case-study/firm-fit";
export { header, why } from "@/content/case-study/header";
export { ledger } from "@/content/case-study/ledger";
export { security } from "@/content/case-study/security";
export { walkthrough } from "@/content/case-study/walkthrough";

/** The receipt-bearing blocks of the case study, top to bottom. */
export const caseStudyBlocks = {
  header: [header.lede],
  why: [why.text],
  features: features.items.map((f) => f.description),
  demo: [demo.intro],
  firmFit: [firmFit.text],
  security: [security.intro, ...security.rules.map((r) => r.reason)],
  delivery: [delivery.intro, delivery.after],
} satisfies Record<string, readonly RichText<ReceiptId>[]>;

/** The screenshots the case study shows, in page order. */
export const caseStudyFigures = [
  screenshots.dashboard,
  screenshots.foresight,
  screenshots.equity,
  demo.figure,
];

/** Every receipt-bearing text on the case study, in reading order. Receipt numbers follow it. */
export const caseStudyProse: readonly RichText<ReceiptId>[] = Object.values(caseStudyBlocks).flat();
