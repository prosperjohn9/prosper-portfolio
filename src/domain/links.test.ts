import { describe, expect, it } from "vitest";
import { isSitePage, mailto } from "@/domain/links";

describe("mailto", () => {
  it("links to the address alone when there is no subject", () => {
    expect(mailto("me@example.com")).toBe("mailto:me@example.com");
  });

  it("encodes the subject", () => {
    expect(mailto("me@example.com", "Code walkthrough: The Trader's Hindsight & more")).toBe(
      "mailto:me@example.com?subject=Code%20walkthrough%3A%20The%20Trader's%20Hindsight%20%26%20more",
    );
  });
});

describe("isSitePage", () => {
  it.each(["/", "/work/the-traders-hindsight"])("treats %s as a page", (href) => {
    expect(isSitePage(href)).toBe(true);
  });

  it.each([
    "/Prosper-Osaigbovo-CV.pdf",
    "#evidence",
    "mailto:me@example.com",
    "https://example.com",
    "//example.com",
  ])("treats %s as something else", (href) => {
    expect(isSitePage(href)).toBe(false);
  });
});
