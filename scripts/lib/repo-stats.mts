import type { RepoStats } from "../../src/domain/repo-stats.ts";

/** Where things live in the counted repository. */
export interface RepoLayout {
  typescript: RegExp;
  test: RegExp;
  generated: RegExp;
  page: RegExp;
  apiRoute: RegExp;
  migration: RegExp;
  /** Migration files that consolidate earlier ones rather than add a change. */
  migrationBaseline: RegExp;
}

export type FileMetrics = Pick<
  RepoStats,
  "typescriptLines" | "pages" | "apiRoutes" | "sqlMigrations" | "testFiles" | "testLines"
>;

/**
 * Parses `git grep -c -e '' <rev> -- …` output, one `<rev>:<path>:<count>` per line.
 * Paths may contain colons, so the count is taken from the last one.
 */
export function parseLineCounts(output: string, rev: string): Map<string, number> {
  const counts = new Map<string, number>();
  const prefix = `${rev}:`;
  for (const line of output.split("\n")) {
    if (!line.startsWith(prefix)) continue;
    const rest = line.slice(prefix.length);
    const sep = rest.lastIndexOf(":");
    const count = Number(rest.slice(sep + 1));
    if (sep > 0 && Number.isInteger(count)) counts.set(rest.slice(0, sep), count);
  }
  return counts;
}

export function summarise(
  paths: readonly string[],
  lineCounts: ReadonlyMap<string, number>,
  layout: RepoLayout,
): FileMetrics {
  const lines = (path: string) => lineCounts.get(path) ?? 0;
  const tests = paths.filter((p) => layout.test.test(p));
  const source = paths.filter(
    (p) => layout.typescript.test(p) && !layout.test.test(p) && !layout.generated.test(p),
  );

  return {
    typescriptLines: sum(source.map(lines)),
    pages: paths.filter((p) => layout.page.test(p)).length,
    apiRoutes: paths.filter((p) => layout.apiRoute.test(p)).length,
    sqlMigrations: paths.filter(
      (p) => layout.migration.test(p) && !layout.migrationBaseline.test(p),
    ).length,
    testFiles: tests.length,
    testLines: sum(tests.map(lines)),
  };
}

const sum = (values: readonly number[]) => values.reduce((total, n) => total + n, 0);
