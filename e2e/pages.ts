export const CASE_STUDY = "/work/traders-hindsight";

export const NOTES = [
  "/notes/how-will-this-fail",
  "/notes/types-are-a-shared-language",
  "/notes/ai-written-code",
  "/notes/mcp-and-agent-safety",
] as const;

/** Every public page, for the checks that apply to all of them. */
export const PAGES = ["/", CASE_STUDY, ...NOTES] as const;

/** The pages that cite receipts. */
export const PAGES_WITH_RECEIPTS = ["/", CASE_STUDY] as const;
