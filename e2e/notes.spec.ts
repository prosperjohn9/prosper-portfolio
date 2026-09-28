import { expect, test } from "@playwright/test";
import { NOTES } from "./pages";

test("How I work links to every note", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("#how-i-work").getByRole("link", { name: "Read the note" });
  await expect(links).toHaveCount(NOTES.length);
  const hrefs = await links.evaluateAll((els) => els.map((a) => a.getAttribute("href")));
  expect([...hrefs].sort()).toEqual([...NOTES].sort());
});

test("a note says when and where it was first posted, and leads to the others", async ({
  page,
}) => {
  await page.goto(NOTES[1]);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Types are a shared language");
  await expect(page).toHaveTitle(/a note by Prosper Osaigbovo/);
  await expect(page.locator("article time")).toHaveAttribute("datetime", "2026-08-31");
  await expect(page.locator("article").getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    /^https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:activity:\d+\/$/,
  );
  const others = page.locator("#more-notes").getByRole("link");
  await expect(others).toHaveCount(NOTES.length - 1);
  await others.first().click();
  await expect(page).toHaveURL(NOTES[0]);
});

test("an unknown note is a 404", async ({ request }) => {
  expect((await request.get("/notes/no-such-note")).status()).toBe(404);
});
