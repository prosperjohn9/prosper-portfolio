import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";
import { hero } from "@/content/home/hero";
import { howIWork } from "@/content/home/how-i-work";

export { contact } from "@/content/home/contact";
export { education } from "@/content/home/education";
export { hero } from "@/content/home/hero";
export { howIWork } from "@/content/home/how-i-work";
export { work } from "@/content/home/work";

/** The receipt-bearing blocks of the home page, top to bottom. */
export const homeBlocks = {
  hero: [hero.lede],
  decisions: [howIWork.decisions.intro],
} satisfies Record<string, readonly RichText<ReceiptId>[]>;

/** Every receipt-bearing text on the home page, in reading order. Receipt numbers follow it. */
export const homeProse: readonly RichText<ReceiptId>[] = Object.values(homeBlocks).flat();
