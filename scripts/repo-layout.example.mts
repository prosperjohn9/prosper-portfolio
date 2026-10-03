import type { RepoLayout } from "./lib/repo-stats.mts";

/**
 * Where things live in the counted repository. Copy this file to
 * repo-layout.local.mts, which git ignores, and change the patterns to match.
 */
export const layout: RepoLayout = {
  typescript: /\.(ts|tsx)$/,
  test: /\.(test|spec)\.(ts|tsx)$/,
  generated: /\.d\.ts$/,
  page: /^src\/app\/(.+\/)?page\.tsx$/,
  apiRoute: /^src\/app\/api\/(.+\/)?route\.ts$/,
};
