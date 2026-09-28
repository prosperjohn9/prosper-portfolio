import { describe, expect, it } from "vitest";
import { isSitePage, mailto, notePath, workPath } from "@/domain/links";

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

describe("workPath", () => {
  it("puts a project's page under /work", () => {
    expect(workPath("traders-hindsight")).toBe("/work/traders-hindsight");
    expect(isSitePage(workPath("traders-hindsight"))).toBe(true);
  });
});

describe("notePath", () => {
  it("puts a note under /notes", () => {
    expect(notePath("types-are-a-shared-language")).toBe("/notes/types-are-a-shared-language");
    expect(isSitePage(notePath("types-are-a-shared-language"))).toBe(true);
  });
});
