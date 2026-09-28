import { expect, test, type Page } from "@playwright/test";
import { NOTES, PAGES } from "./pages";

// Absolute addresses point at the production domain, so compare paths only and
// fetch them from the server under test.
const pathOf = (url: string) => {
  const { pathname, search } = new URL(url);
  return pathname + search;
};

const meta = (page: Page, key: string) =>
  page.locator(`meta[property="${key}"], meta[name="${key}"]`).getAttribute("content");

/** Width and height from a PNG's header. */
const pngSize = (bytes: Buffer) => ({
  width: bytes.readUInt32BE(16),
  height: bytes.readUInt32BE(20),
});

for (const path of PAGES) {
  test(`${path} names itself as the canonical address`, async ({ page }) => {
    await page.goto(path);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical ?? "").pathname).toBe(path);
    expect(pathOf((await meta(page, "og:url")) ?? "")).toBe(path);
  });

  test(`${path} has a share preview with its own image`, async ({ page, request }) => {
    await page.goto(path);
    expect(await meta(page, "og:title")).toBeTruthy();
    expect(await meta(page, "og:description")).toBeTruthy();
    expect(await meta(page, "og:image:alt")).toBeTruthy();
    expect(await meta(page, "twitter:card")).toBe("summary_large_image");

    const image = await request.get(pathOf((await meta(page, "og:image")) ?? ""));
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toBe("image/png");
    expect(pngSize(await image.body())).toEqual({ width: 1200, height: 630 });
  });
}

test("notes are shared as articles with their publication date", async ({ page }) => {
  for (const path of NOTES) {
    await page.goto(path);
    expect(await meta(page, "og:type")).toBe("article");
    expect(await meta(page, "article:published_time")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});

test("the sitemap lists every page, and only those", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const listed = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => pathOf(url ?? ""));
  expect(listed.sort()).toEqual([...PAGES].sort());
});

test("robots.txt lets crawlers in and points them at the sitemap", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Allow: /");
  expect(robots).not.toContain("Disallow");
  expect(robots).toMatch(/^Sitemap: .*\/sitemap\.xml$/m);
});

test("the home page tells search engines who the site is about", async ({ page }) => {
  await page.goto("/");
  const person = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(person).toMatchObject({ "@type": "Person", name: "Prosper Chukwuemeke Osaigbovo" });
  expect(person.sameAs).toContain("https://www.linkedin.com/in/prosperosaigbovo");
});

test("every icon the head links to exists", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page
    .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
  expect(hrefs.length).toBe(3);
  for (const href of hrefs) expect((await request.get(href)).status()).toBe(200);
});
