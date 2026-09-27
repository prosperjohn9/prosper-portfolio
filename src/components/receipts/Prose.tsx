import { Claim } from "@/components/receipts/Claim";
import { isClaim, isLink, type RichText } from "@/domain/rich-text";

interface ProseProps<Id extends string> {
  text: RichText<Id>;
  /** Required when the text contains claims. */
  numberOf?: (id: Id) => number;
  /** Claims in this text take part in the one-time marker sweep. */
  sweep?: boolean;
}

/** Renders rich text: plain text, links and claims with their receipt numbers. */
export function Prose<Id extends string>({ text, numberOf, sweep = false }: ProseProps<Id>) {
  let claimIndex = 0;
  return text.map((segment, index) => {
    if (typeof segment === "string") return segment;
    if (isLink(segment)) {
      return (
        <a key={index} href={segment.href}>
          {segment.text}
        </a>
      );
    }
    if (isClaim(segment)) {
      if (!numberOf) throw new Error("Prose with claims needs numberOf.");
      return (
        <Claim
          key={index}
          receiptId={segment.receipt}
          number={numberOf(segment.receipt)}
          sweepOrder={sweep ? claimIndex++ : undefined}
        >
          {segment.claim}
        </Claim>
      );
    }
    return null;
  });
}
