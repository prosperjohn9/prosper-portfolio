import { expect, test } from "@playwright/test";
import { CASE_STUDY, NOTES } from "./pages";

type LayoutShift = PerformanceEntry & { value: number; hadRecentInput: boolean };

test("titles keep their place while the font loads", async ({ page }) => {
  test.skip(!!process.env.CI, "The stand-in font is Arial, which the Linux CI runner lacks.");
  // Hold the font back, so each page first paints with the stand-in.
  await page.route("**/*.woff2", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await route.continue();
  });

  for (const path of [CASE_STUDY, NOTES[0]]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const shift = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as LayoutShift[]) {
              if (!entry.hadRecentInput) total += entry.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve(total), 200);
        }),
    );
    expect(shift, path).toBeLessThan(0.005);
  }
});
