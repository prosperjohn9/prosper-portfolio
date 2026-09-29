import { receiptHint } from "@/content/site";

/** Tells phone readers the numbers open the receipts, which start closed there. */
export function ReceiptHint() {
  return <p className="receipt-hint">{receiptHint}</p>;
}
