import { describe, expect, it } from "vitest";
import { parseLineCounts, summarise, type RepoLayout } from "./repo-stats.mts";

const layout: RepoLayout = {
  typescript: /\.(ts|tsx)$/,
  test: /\.(test|spec)\.(ts|tsx|js|mjs)$/,
  generated: /\.d\.ts$/,
  page: /^src\/app\/(.+\/)?page\.tsx$/,
  apiRoute: /^src\/app\/api\/(.+\/)?route\.ts$/,
};

describe("parseLineCounts", () => {
  it("reads one count per file for the given revision", () => {
    const output = "abc123:src/a.ts:12\nabc123:src/b.tsx:30\n";
    expect(parseLineCounts(output, "abc123")).toEqual(
      new Map([
        ["src/a.ts", 12],
        ["src/b.tsx", 30],
      ]),
    );
  });

  it("keeps colons that are part of the path", () => {
    expect(parseLineCounts("abc123:docs/a:b.ts:7", "abc123").get("docs/a:b.ts")).toBe(7);
  });

  it("ignores lines that are not counts", () => {
    expect(parseLineCounts("\nwarning: something\n", "abc123").size).toBe(0);
  });
});

describe("summarise", () => {
  const paths = [
    "src/app/page.tsx",
    "src/app/orders/page.tsx",
    "src/app/api/orders/route.ts",
    "src/app/api/checkout/route.ts",
    "src/lib/money.ts",
    "src/lib/money.test.ts",
    "src/types/database.d.ts",
    "jobs/src/sync.ts",
    "scripts/audit.mjs",
  ];
  const lines = new Map([
    ["src/app/page.tsx", 100],
    ["src/app/orders/page.tsx", 50],
    ["src/app/api/orders/route.ts", 40],
    ["src/app/api/checkout/route.ts", 60],
    ["src/lib/money.ts", 200],
    ["src/lib/money.test.ts", 90],
    ["src/types/database.d.ts", 5000],
    ["jobs/src/sync.ts", 30],
    ["scripts/audit.mjs", 70],
  ]);
  const stats = summarise(paths, lines, layout);

  it("counts TypeScript source lines without tests, declaration files or JavaScript", () => {
    expect(stats.typescriptLines).toBe(100 + 50 + 40 + 60 + 200 + 30);
  });

  it("counts pages and API routes only where the app keeps them", () => {
    expect(stats.pages).toBe(2);
    expect(stats.apiRoutes).toBe(2);
  });

  it("counts test files and their lines", () => {
    expect(stats.testFiles).toBe(1);
    expect(stats.testLines).toBe(90);
  });
});
