/** Element ids that link a claim's number to its note and back. */
export const noteId = (receiptId: string) => `receipt-${receiptId}`;
export const citeId = (receiptId: string) => `cites-${receiptId}`;
