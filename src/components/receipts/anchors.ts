/** The element id of a receipt's note, so every number that cites it can link there. */
export const noteId = (receiptId: string) => `receipt-${receiptId}`;
