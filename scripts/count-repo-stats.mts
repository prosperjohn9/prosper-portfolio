/**
 * Counts a private product repository and writes only the numbers.
 *
 *   npm run stats:count -- --repo <path> [--rev <commit>]
 *
 * Reads files at the given commit (default HEAD) straight from git, so uncommitted
 * changes never leak into the figures. Writes src/content/stats.json.
 *
 * Which files count as pages, API routes, tests and migrations is described in
 * scripts/repo-layout.local.mts, which git ignores, so the product's folder layout
 * stays private. Copy scripts/repo-layout.example.mts to start one.
 */
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import type { RepoStats } from "../src/domain/repo-stats.ts";
import { parseLineCounts, summarise, type RepoLayout } from "./lib/repo-stats.mts";

const layoutFile = new URL("./repo-layout.local.mts", import.meta.url);
if (!existsSync(layoutFile)) {
  console.error("Missing scripts/repo-layout.local.mts: copy repo-layout.example.mts and edit it.");
  process.exit(1);
}
const { layout } = (await import(layoutFile.href)) as { layout: RepoLayout };

const { values } = parseArgs({
  options: {
    repo: { type: "string" },
    rev: { type: "string", default: "HEAD" },
    out: { type: "string", default: "src/content/stats.json" },
  },
});

if (!values.repo) {
  console.error("Usage: npm run stats:count -- --repo <path> [--rev <commit>]");
  process.exit(1);
}

const repo = resolve(values.repo);
const git = (...args: string[]) =>
  execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const commit = git("rev-parse", "--short=7", `${values.rev}^{commit}`).trim();
const paths = git("ls-tree", "-r", "--name-only", commit).split("\n").filter(Boolean);
const lineCounts = parseLineCounts(git("grep", "-c", "-e", "", commit, "--", "."), commit);

const stats: RepoStats = {
  countedOn: new Date().toISOString().slice(0, 10),
  commit,
  commitDate: git("show", "-s", "--format=%cs", commit).trim(),
  commits: Number(git("rev-list", "--count", commit).trim()),
  ...summarise(paths, lineCounts, layout),
};

writeFileSync(values.out, `${JSON.stringify(stats, null, 2)}\n`);
console.log(`Counted ${commit}:`, stats);
