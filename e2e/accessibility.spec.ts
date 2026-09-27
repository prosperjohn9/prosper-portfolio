import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Every public page, checked in both themes against WCAG 2.2 A and AA.
const pages = ["/"];
const themes = ["light", "dark"] as const;
const wcag = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const path of pages) {
  for (const theme of themes) {
    test(`${path} meets WCAG 2.2 AA in the ${theme} theme`, async ({ page }) => {
      await page.goto(`${path}?theme=${theme}`);
      const { violations } = await new AxeBuilder({ page }).withTags(wcag).analyze();
      const summary = violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);
      expect(summary).toEqual([]);
    });
  }
}
