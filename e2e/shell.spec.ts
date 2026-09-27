import { expect, test, type Page } from "@playwright/test";

const NIGHT = "rgb(15, 26, 46)";
const PAPER = "rgb(244, 246, 243)";

const bodyBackground = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test("home shows his full name as the page heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Prosper\s*Chukwuemeke\s*Osaigbovo/);
  await expect(page).toHaveTitle(/Prosper Osaigbovo/);
});

test("the header always offers a way to make contact", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });
  await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Prosper Osaigbovo" })).toBeVisible();
});

test("section links show on desktop and fold away on phones", async ({ page }, info) => {
  await page.goto("/");
  const product = page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name: "Product" });
  if (info.project.name === "phone") await expect(product).toBeHidden();
  else await expect(product).toBeVisible();
});

test("theme follows the device setting when nothing was picked", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  expect(await bodyBackground(page)).toBe(NIGHT);
  await page.emulateMedia({ colorScheme: "light" });
  expect(await bodyBackground(page)).toBe(PAPER);
});

test("?theme= forces a theme before first paint, without saving it", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  // Read the attribute as soon as the document exists, before hydration runs.
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      (window as unknown as { __themeAtParse: string | null }).__themeAtParse =
        document.documentElement.getAttribute("data-theme");
    });
  });
  await page.goto("/?theme=dark");
  expect(await page.evaluate(() => (window as unknown as { __themeAtParse: string | null }).__themeAtParse)).toBe("dark");
  expect(await bodyBackground(page)).toBe(NIGHT);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
});

test("the toggle switches theme, names the next theme, and remembers it", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Dark theme" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  expect(await bodyBackground(page)).toBe(NIGHT);
  await expect(page.getByRole("button", { name: "Light theme" })).toBeVisible();
  await page.reload();
  expect(await bodyBackground(page)).toBe(NIGHT);
  await page.getByRole("button", { name: "Light theme" }).click();
  expect(await bodyBackground(page)).toBe(PAPER);
});

test("keyboard users can skip straight to the content", async ({ page }, info) => {
  test.skip(info.project.name === "phone", "no keyboard on the phone profile");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
});

test("nothing scrolls sideways at 360px, and the header stays on one line", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const toggle = page.getByRole("button", { name: "Dark theme" });
  const box = await toggle.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
  expect(box!.height).toBeLessThan(48); // one line, not wrapped
});

test("the page loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/?theme=dark");
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});
