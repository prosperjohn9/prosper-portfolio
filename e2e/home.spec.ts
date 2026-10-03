import { expect, test } from "@playwright/test";
import { CASE_STUDY, ISI_LENS } from "./pages";

const SECTIONS = ["work", "how-i-work", "experience", "contact"];

test("the sections appear in order, each with a heading", async ({ page }) => {
  await page.goto("/");
  const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id));
  expect(ids).toEqual(SECTIONS);
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id} h2`)).toHaveCount(1);
  }
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("every in-page link lands on something", async ({ page }) => {
  await page.goto("/");
  const targets = await page
    .locator('a[href^="#"], a[href^="/#"]')
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")!.replace(/^\//, "")));
  expect(targets.length).toBeGreaterThan(0);
  for (const hash of new Set(targets)) {
    await expect(page.locator(hash), `link to ${hash}`).toHaveCount(1);
  }
});

test("every file and page on this site that the home page links to loads", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator('a[href^="/"]:not([href^="/#"])')
    .evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of new Set(hrefs)) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
  const cv = await request.get("/Prosper-Osaigbovo-CV.pdf");
  expect(cv.headers()["content-type"]).toContain("application/pdf");
});

test("every image loads and is described", async ({ page }) => {
  await page.goto("/");
  // Screenshots load lazily, so bring each into view first.
  for (const img of await page.locator("main img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute("alt", /\S{3,}/);
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true);
  }
});

test("Selected work leads to each case study and to each live site", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#work");
  for (const [project, path] of [
    ["The Trader's Hindsight", CASE_STUDY],
    ["Isi Lens", ISI_LENS],
  ] as const) {
    await expect(
      work
        .getByRole("article", { name: project })
        .getByRole("link", { name: "Read the case study" }),
    ).toHaveAttribute("href", path);
  }
  for (const site of ["tradershindsight.com", "isilens.co.uk"]) {
    await expect(work.getByRole("link", { name: site })).toHaveAttribute("href", `https://${site}`);
  }
});

test("the call request arrives with its subject", async ({ page }) => {
  await page.goto("/");
  // On phones the note holding this link is closed until its number is tapped.
  await expect(page.locator(".note a", { hasText: "Ask me how it is built" })).toHaveAttribute(
    "href",
    /^mailto:prosperjohn9@gmail\.com\?subject=How%20The%20Trader/,
  );
});
