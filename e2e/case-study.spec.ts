import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { CASE_STUDY, PAGES } from "./pages";

const SECTIONS = ["why", "demo", "firm-fit", "architecture", "delivery", "walkthrough"];

const panel = (page: Page) => page.getByRole("figure", { name: /What did these habits cost/ });
const total = (page: Page) =>
  panel(page)
    .getByText(/^[−+]?\$\d/)
    .first();
const takeOut = (page: Page, habit: string) =>
  panel(page).getByRole("button", { name: `Take out ${habit}` });

test("the home page leads to the case study", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Read the case study" }).first().click();
  await expect(page).toHaveURL(CASE_STUDY);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The Trader's Hindsight");
  await expect(page).toHaveTitle(/case study/);
});

test("the sections appear in order, each with a heading", async ({ page }) => {
  await page.goto(CASE_STUDY);
  const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id));
  expect(ids).toEqual(SECTIONS);
  for (const id of SECTIONS) await expect(page.locator(`#${id} h2`)).toHaveCount(1);
});

test.describe("the Hindsight demo", () => {
  test.use({ reducedMotion: "reduce" });

  test("says it runs on example data", async ({ page }) => {
    await page.goto(CASE_STUDY);
    await expect(panel(page)).toContainText("Example data: 15 made-up trades.");
  });

  test("replays the month without the habits taken out", async ({ page }) => {
    await page.goto(CASE_STUDY);
    await expect(total(page)).toHaveText("−$610");

    await takeOut(page, "revenge trades").click();
    await expect(total(page)).toHaveText("+$60");
    await expect(panel(page)).toContainText(
      "Without revenge trades, the month is $670 better. Win rate 50% on the 12 trades left.",
    );
    await expect(panel(page)).toContainText("As traded: −$610");

    await takeOut(page, "third trades after two losses").click();
    await expect(total(page)).toHaveText("+$240");
    await expect(panel(page)).toContainText("the month is $850 better");

    await panel(page).getByRole("button", { name: "Put all back" }).click();
    await expect(total(page)).toHaveText("−$610");
    await expect(panel(page).getByRole("button", { name: "Put all back" })).toBeDisabled();
  });

  test("tells a screen reader what changed", async ({ page }) => {
    await page.goto(CASE_STUDY);
    await takeOut(page, "sizing up after a loss").click();
    await expect(panel(page).locator("[aria-live]")).toHaveText(
      /June net P&L −\$110\. Without sizing up after a loss, the month is \$500 better\./,
    );
  });

  test("lists every trade, marking the ones taken out", async ({ page }) => {
    await page.goto(CASE_STUDY);
    await takeOut(page, "revenge trades").click();
    await panel(page).getByText("See the 15 trades").click();
    const rows = panel(page).locator("tbody tr");
    await expect(rows).toHaveCount(15);
    await expect(panel(page).locator("tbody tr[data-taken-out]")).toHaveCount(3);
  });
});

test("the counting lands on the exact figure with motion on", async ({ page }) => {
  await page.goto(CASE_STUDY);
  await takeOut(page, "revenge trades").click();
  await expect(total(page)).toHaveText("+$60");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the demo still shows the month, the costs and the trades, but no dead buttons", async ({
    page,
  }) => {
    await page.goto(CASE_STUDY);
    await expect(total(page)).toHaveText("−$610");
    await expect(panel(page)).toContainText("cost $670");
    await expect(panel(page)).toContainText("Habits are ranked by what each one cost.");
    await expect(panel(page).getByRole("button")).toHaveCount(0);
    await panel(page).getByText("See the 15 trades").click();
    await expect(panel(page).locator("tbody tr")).toHaveCount(15);
  });
});

test("the real report is shown after the demo", async ({ page }) => {
  await page.goto(CASE_STUDY);
  // On phones the note holding this link is closed until its number is tapped.
  await expect(page.locator(".note a", { hasText: "shown below" })).toHaveAttribute(
    "href",
    "#figure-d",
  );
  await expect(page.locator("#demo #figure-d img")).toHaveAttribute("alt", /Hindsight/);
});

test("the call request arrives with its subject", async ({ page }) => {
  await page.goto(CASE_STUDY);
  await expect(
    page.locator("#walkthrough").getByRole("link", { name: "Ask how it is built" }),
  ).toHaveAttribute("href", /^mailto:prosperjohn9@gmail\.com\?subject=How%20The%20Trader/);
});

// Words that would give the product's logic away. The list itself would, so it
// lives in a file git ignores, one term per line; without it the check is skipped.
const PRIVATE_TERMS = join(__dirname, "private-terms.local.txt");

test("no page names a private term of the product", async ({ page }) => {
  test.skip(!existsSync(PRIVATE_TERMS), "no local list of private terms");
  const terms = readFileSync(PRIVATE_TERMS, "utf8")
    .split("\n")
    .map((line) => line.trim().toLowerCase())
    .filter(Boolean);
  for (const path of PAGES) {
    await page.goto(path);
    const text = (await page.locator("main").innerText()).toLowerCase();
    expect(
      terms.filter((term) => text.includes(term)),
      path,
    ).toEqual([]);
  }
});
