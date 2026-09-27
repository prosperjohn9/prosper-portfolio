import type { CSSProperties, ReactNode } from "react";
import { Cite } from "@/components/receipts/Cite";

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

/** A highlighted claim followed by the number of its receipt. */
export function Claim({ receiptId, number, sweepOrder, children }: ClaimProps) {
  const sweeps = sweepOrder !== undefined;
  const sweepStyle = sweeps
    ? ({ "--sweep-delay": `${SWEEP_START_S + sweepOrder * SWEEP_GAP_S}s` } as CSSProperties)
    : undefined;

  return (
    <>
      <mark className="claim" data-sweep={sweeps ? "" : undefined} style={sweepStyle}>
        {children}
      </mark>
      <Cite receiptId={receiptId} number={number} />
    </>
  );
}
