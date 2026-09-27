import { Cite } from "@/components/receipts/Cite";
import { Claim } from "@/components/receipts/Claim";
import { isCite, isClaim, isLink, type RichText } from "@/domain/rich-text";

interface ProseProps<Id extends string> {
  text: RichText<Id>;
  /** Required when the text cites receipts. */
  numberOf?: (id: Id) => number;
  /** Claims in this text take part in the one-time marker sweep. */
  sweep?: boolean;
}

/** Renders rich text: plain text, links, highlighted claims and receipt numbers. */
export function Prose<Id extends string>({ text, numberOf, sweep = false }: ProseProps<Id>) {
  const number = (id: Id) => {
    if (!numberOf) throw new Error("Prose that cites receipts needs numberOf.");
    return numberOf(id);
  };
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
      return (
        <Claim
          key={index}
          receiptId={segment.receipt}
          number={number(segment.receipt)}
          sweepOrder={sweep ? claimIndex++ : undefined}
        >
          {segment.claim}
        </Claim>
      );
    }
    if (isCite(segment)) {
      return <Cite key={index} receiptId={segment.cite} number={number(segment.cite)} />;
    }
    return null;
  });
}
