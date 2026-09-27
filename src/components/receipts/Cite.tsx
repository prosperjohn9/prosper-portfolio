import { noteId } from "@/components/receipts/anchors";

/**
 * A receipt number. A plain link to its note, so it works without JavaScript;
 * on phones the head script turns it into a toggle that opens the note in place.
 */
export function Cite({ receiptId, number }: { receiptId: string; number: number }) {
  return (
    <a
      className="cite"
      href={`#${noteId(receiptId)}`}
      aria-label={`Receipt ${number}`}
      data-cite=""
    >
      {number}
    </a>
  );
}
