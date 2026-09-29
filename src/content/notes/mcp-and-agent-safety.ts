import type { Note } from "@/domain/note";

export const mcpAndAgentSafety: Note = {
  slug: "mcp-and-agent-safety",
  title: "MCP is exciting until the agent can delete something",
  published: "2026-08-03",
  source: {
    text: "LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7489968339230978048/",
  },
  paragraphs: [
    "Connecting an AI agent to tools can feel impressive. It can search files, query databases, call internal APIs, create issues and even trigger deployments.",
    "Then the security questions begin.",
    "What can the agent access? Can it read secrets, expose sensitive data or perform destructive actions without approval? Can every action be traced afterward?",
    "This is why Model Context Protocol discussions should go beyond connectivity. Connecting an agent is the easy part. The real challenge is building the authorisation, validation, auditing and approval systems around it.",
    [
      {
        text: "Microsoft’s .NET governance tooling for MCP",
        href: "https://devblogs.microsoft.com/dotnet/announcing-agent-governance-toolkit-mcp-extensions-for-dotnet/",
      },
      " includes capabilities such as policy enforcement, tool scanning and response sanitisation.",
    ],
    "Every tool given to an agent expands what it can accomplish, but it also increases the potential risk.",
    "MCP adoption should therefore be measured not only by what an agent can do, but also by how safely, transparently and responsibly it can do it.",
  ],
};
