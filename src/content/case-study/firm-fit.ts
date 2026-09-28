import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";

export const firmFit = {
  title: "Firm Fit: the odds before paying for a challenge",
  text: [
    "Firm Fit estimates a trader's chance of passing each prop firm's challenge from their own trading history, before they pay for one. On the public page, ",
    {
      claim: "the statement is read in the browser and never uploaded",
      receipt: "firm-fit-page",
    },
    ".",
  ] satisfies RichText<ReceiptId>,
};
