import { expect, test } from "@playwright/test";
import { CASE_STUDY } from "./pages";

test.describe("on phones", () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name !== "phone", "phones only");
  });

  test("the first screen offers the CV and a way to email", async ({ page }) => {
    await page.goto("/");
    const viewport = page.viewportSize()!;
    for (const name of ["Download CV (PDF)", "Email me"]) {
      const box = (await page.getByRole("link", { name }).first().boundingBox())!;
      expect(box.y + box.height, name).toBeLessThanOrEqual(viewport.height);
    }
  });

  test("long lists fold under their headings, and a heading opens its row", async ({ page }) => {
    await page.goto("/");
    const list = page.locator("#how-i-work");
    await expect(list.getByRole("link", { name: "Read the note" })).toHaveCount(0);
    await list.locator("summary").first().click();
    await expect(list.getByRole("link", { name: "Read the note" })).toHaveCount(1);
  });

  test("a hint says the yellow numbers open the receipts", async ({ page }) => {
    for (const path of ["/", CASE_STUDY]) {
      await page.goto(path);
      await expect(page.getByText(/^Tap a yellow number/), path).toBeVisible();
    }
  });

  test("each screenshot says it opens at full size", async ({ page }) => {
    await page.goto(CASE_STUDY);
    // Screenshots are the figures that link to their full-size image.
    const screenshots = page.locator("figure:has(a[href*='/_next/static/media/'])");
    const labels = screenshots.getByText("Open full size");
    expect(await screenshots.count()).toBeGreaterThan(0);
    await expect(labels).toHaveCount(await screenshots.count());
    for (const label of await labels.all()) await expect(label).toBeVisible();
  });

  test.describe("without JavaScript", () => {
    test.use({ javaScriptEnabled: false });

    test("every list shows in full, and no hint is needed", async ({ page }) => {
      await page.goto("/");
      await expect(
        page.locator("#how-i-work").getByRole("link", { name: "Read the note" }),
      ).toHaveCount(4);
      await expect(page.getByText(/^Tap a yellow number/)).toBeHidden();
    });
  });
});

test.describe("on wide screens", () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name !== "desktop", "wide screens only");
  });

  test("lists show in full, with no phone hints", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("#how-i-work").getByRole("link", { name: "Read the note" }),
    ).toHaveCount(4);
    await expect(page.getByText(/^Tap a yellow number/)).toBeHidden();
    await page.goto(CASE_STUDY);
    await expect(page.getByText("Open full size").first()).toBeHidden();
  });
});
