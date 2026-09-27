/** A link inside a sentence. */
export interface LinkSegment {
  text: string;
  href: string;
}

/** A claim that is highlighted and backed by a receipt. */
export interface ClaimSegment<Id extends string = string> {
  claim: string;
  receipt: Id;
}

export type Segment<Id extends string = string> = string | LinkSegment | ClaimSegment<Id>;

/**
 * Prose kept as plain data: text, links and claims in reading order. Content
 * modules write it; components decide how it looks.
 */
export type RichText<Id extends string = string> = readonly Segment<Id>[];

export const isLink = (segment: Segment): segment is LinkSegment =>
  typeof segment === "object" && "href" in segment;

export const isClaim = <Id extends string>(segment: Segment<Id>): segment is ClaimSegment<Id> =>
  typeof segment === "object" && "receipt" in segment;

/** Receipt ids in the order they are first cited across the given texts. */
export function citedReceipts<Id extends string>(texts: readonly RichText<Id>[]): Id[] {
  const seen = new Set<Id>();
  for (const text of texts) {
    for (const segment of text) {
      if (isClaim(segment)) seen.add(segment.receipt);
    }
  }
  return [...seen];
}
