import type { CSSProperties, ReactNode } from "react";
import { citeId, noteId } from "@/components/receipts/anchors";

interface ClaimProps {
  receiptId: string;
  number: number;
  /** Position in the marker sweep; omitted when the claim does not sweep. */
  sweepOrder?: number;
  children: ReactNode;
}

// The marker reaches each claim in turn, one pen stroke after the other.
const SWEEP_START_S = 0.35;
const SWEEP_GAP_S = 0.7;

/**
 * A highlighted claim and the number of its receipt. The number is a plain link
 * to the note, so it works without JavaScript; on phones a script turns it into
 * a toggle that opens the note in place.
 */
export function Claim({ receiptId, number, sweepOrder, children }: ClaimProps) {
  const sweepStyle =
    sweepOrder === undefined
      ? undefined
      : ({ "--sweep-delay": `${SWEEP_START_S + sweepOrder * SWEEP_GAP_S}s` } as CSSProperties);

  return (
    <>
      <mark
        className="claim"
        data-sweep={sweepOrder === undefined ? undefined : ""}
        style={sweepStyle}
      >
        {children}
      </mark>
      <a
        className="cite"
        href={`#${noteId(receiptId)}`}
        id={citeId(receiptId)}
        aria-label={`Receipt ${number}`}
        data-cite=""
      >
        {number}
      </a>
    </>
  );
}
