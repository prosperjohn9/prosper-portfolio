import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { evidence } from "@/content/home/evidence";
import { hero } from "@/content/home/hero";
import { security } from "@/content/home/security";

export { contact } from "@/content/home/contact";
export { evidence } from "@/content/home/evidence";
export { experience } from "@/content/home/experience";
export { hero } from "@/content/home/hero";
export { ledger } from "@/content/home/ledger";
export { security } from "@/content/home/security";
export { studio } from "@/content/home/studio";
export { writing } from "@/content/home/writing";

/** The receipt-bearing blocks of the home page, top to bottom. */
export const homeBlocks = {
  hero: [hero.lede],
  story: [evidence.story],
  features: evidence.features.map((f) => f.description),
  security: [security.intro, ...security.rules.map((r) => r.reason)],
} satisfies Record<string, readonly RichText<ReceiptId>[]>;

/** Every receipt-bearing text on the home page, in reading order. Receipt numbers follow it. */
export const homeProse: readonly RichText<ReceiptId>[] = Object.values(homeBlocks).flat();
