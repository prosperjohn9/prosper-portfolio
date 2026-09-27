/**
 * Size figures for The Trader's Hindsight, counted from its private repository by
 * scripts/count-repo-stats.ts. Only these numbers leave the repository.
 * "Lines" are physical lines in files tracked at the counted commit.
 */
export interface RepoStats {
  /** The day the count ran, YYYY-MM-DD. */
  countedOn: string;
  /** Short SHA of the commit that was counted. */
  commit: string;
  /** Commit date of that commit, YYYY-MM-DD. */
  commitDate: string;
  /** Commits up to and including the counted commit. */
  commits: number;
  /** TypeScript source lines, excluding tests and generated declaration files. */
  typescriptLines: number;
  /** App Router pages. */
  pages: number;
  /** API route handlers. */
  apiRoutes: number;
  /** SQL migrations written, not counting the file that later consolidated them. */
  sqlMigrations: number;
  testFiles: number;
  testLines: number;
}
