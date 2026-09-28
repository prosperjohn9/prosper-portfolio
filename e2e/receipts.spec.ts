import { expect, test, type Page } from "@playwright/test";
import stats from "../src/content/stats.json";
import { CASE_STUDY, PAGES } from "./pages";

const cites = (page: Page) => page.locator("[data-cite]");

/** The note a receipt number points at. */
async function noteFor(page: Page, index: number) {
  const href = await cites(page).nth(index).getAttribute("href");
  expect(href).toMatch(/^#receipt-/);
  return page.locator(href!);
}

test("the hero's figures come from the counted repository", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toContainText(`${stats.testFiles} automated test files`);
  await expect(page.locator("main")).toContainText(`commit ${stats.commit}`);
});

for (const path of PAGES) {
  test(`${path}: receipt numbers first appear as 1, 2, 3 in order, each with exactly one note`, async ({
    page,
  }) => {
    await page.goto(path);
    const numbers = await cites(page).allTextContents();
    const firstAppearances = [...new Set(numbers)];
    expect(firstAppearances.length).toBeGreaterThan(0);
    expect(firstAppearances).toEqual(firstAppearances.map((_, i) => String(i + 1)));
    for (let i = 0; i < numbers.length; i++) {
      const note = await noteFor(page, i);
      await expect(note).toHaveCount(1);
      await expect(note).toContainText(`Receipt ${numbers[i]}:`);
    }
  });

  test(`${path}: on wide screens every receipt sits in the margin beside the text`, async ({
    page,
  }, info) => {
    test.skip(info.project.name === "phone", "wide screens only");
    await page.goto(path);
    for (let i = 0; i < (await cites(page).count()); i++) {
      const cite = cites(page).nth(i);
      // The block of text the number sits in: a paragraph or a definition.
      const text = await cite.evaluate((el) => {
        const box = el.closest("p, dd")!.getBoundingClientRect();
        return { right: box.right + window.scrollX };
      });
      const note = await noteFor(page, i);
      await expect(note).toBeVisible();
      expect((await note.boundingBox())!.x).toBeGreaterThan(text.right);
    }
  });

  test(`${path}: on phones a receipt opens in place when its number is tapped`, async ({
    page,
  }, info) => {
    test.skip(info.project.name !== "phone", "phones only");
    await page.goto(path);
    const cite = cites(page).first();
    const note = await noteFor(page, 0);
    await expect(note).toBeHidden();
    await cite.click();
    await expect(note).toBeVisible();
    await expect(cite).toHaveAttribute("aria-expanded", "true");
    await cite.click();
    await expect(note).toBeHidden();
    await expect(cite).toHaveAttribute("aria-expanded", "false");
  });

  test.describe(`${path} without JavaScript`, () => {
    test.use({ javaScriptEnabled: false });

    test("every receipt is visible", async ({ page }) => {
      await page.goto(path);
      const count = await cites(page).count();
      for (let i = 0; i < count; i++) await expect(await noteFor(page, i)).toBeVisible();
    });
  });
}

test("on phones a receipt cited again further down jumps up to its note", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "phone", "phones only");
  await page.goto(CASE_STUDY);
  const numbers = await cites(page).allTextContents();
  const repeat = numbers.findIndex((n, i) => numbers.indexOf(n) !== i);
  expect(repeat).toBeGreaterThan(-1);
  const note = await noteFor(page, repeat);
  await cites(page).nth(repeat).click();
  await expect(page).toHaveURL(new RegExp(`#${await note.getAttribute("id")}$`));
  await expect(note).toBeVisible();
  await expect(note).toBeInViewport();
});

test.describe("the marker sweep", () => {
  const classesAtFirstPaint = async (page: Page) => {
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        (window as unknown as { __classes: string }).__classes = document.documentElement.className;
      });
    });
  };
  const swept = (page: Page) =>
    page.evaluate(() => (window as unknown as { __classes: string }).__classes.includes("sweep"));

  test("plays on the first view of a visit, not on the next", async ({ page }) => {
    await classesAtFirstPaint(page);
    await page.goto("/");
    expect(await swept(page)).toBe(true);
    await page.reload();
    expect(await swept(page)).toBe(false);
  });

  test("never plays with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await classesAtFirstPaint(page);
    await page.goto("/");
    expect(await swept(page)).toBe(false);
  });
});
