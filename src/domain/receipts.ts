import { citedReceipts, type RichText } from "@/domain/rich-text";

/** Where the proof for a claim is. */
export interface Receipt {
  /** A short lead, such as "Live site." */
  title: string;
  /** Plain text and links; receipts do not cite other receipts. */
  body: RichText<never>;
}

export interface NumberedReceipt extends Receipt {
  id: string;
  number: number;
}

export interface ReceiptNumbering<Id extends string> {
  /** The number a claim shows next to it. */
  numberOf(id: Id): number;
  /**
   * The notes a block of the page shows: receipts first cited in that block,
   * in order. A receipt cited again later keeps its number and its one note.
   */
  notesFor(block: readonly RichText<Id>[]): NumberedReceipt[];
}

/**
 * Numbers receipts by where they are first cited on a page, so the numbers
 * always read 1, 2, 3 from top to bottom and can never drift from the text.
 */
export function numberReceipts<Id extends string>(
  book: Readonly<Record<Id, Receipt>>,
  page: readonly RichText<Id>[],
): ReceiptNumbering<Id> {
  const numbers = new Map(citedReceipts(page).map((id, index) => [id, index + 1]));
  // The text where each receipt is first cited: its note is shown with that text.
  const firstCitedIn = new Map<Id, RichText<Id>>();
  for (const text of page) {
    for (const id of citedReceipts([text])) {
      if (!firstCitedIn.has(id)) firstCitedIn.set(id, text);
    }
  }

  const numberOf = (id: Id) => {
    const number = numbers.get(id);
    if (number === undefined) throw new Error(`Receipt "${id}" is not cited on this page.`);
    return number;
  };

  return {
    numberOf,
    notesFor(block) {
      return citedReceipts(block)
        .filter((id) => block.includes(firstCitedIn.get(id) ?? []))
        .map((id) => ({ id, number: numberOf(id), ...book[id] }))
        .sort((a, b) => a.number - b.number);
    },
  };
}
