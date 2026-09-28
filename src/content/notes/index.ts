import type { Note } from "@/domain/note";
import { aiWrittenCode } from "@/content/notes/ai-written-code";
import { howWillThisFail } from "@/content/notes/how-will-this-fail";
import { mcpAndAgentSafety } from "@/content/notes/mcp-and-agent-safety";
import { typesAreASharedLanguage } from "@/content/notes/types-are-a-shared-language";

export { aiWrittenCode } from "@/content/notes/ai-written-code";
export { howWillThisFail } from "@/content/notes/how-will-this-fail";
export { mcpAndAgentSafety } from "@/content/notes/mcp-and-agent-safety";
export { typesAreASharedLanguage } from "@/content/notes/types-are-a-shared-language";

/** Every note, newest first. */
export const notes: readonly Note[] = [
  howWillThisFail,
  typesAreASharedLanguage,
  aiWrittenCode,
  mcpAndAgentSafety,
];
