import { describe, expect, it } from "vitest";
import { numberReceipts, type Receipt } from "@/domain/receipts";
import { citedReceipts, type RichText } from "@/domain/rich-text";

type Id = "site" | "repo" | "cv";
const receipt = (title: string): Receipt => ({ title, body: [] });
const book: Record<Id, Receipt> = {
  site: receipt("Live site."),
  repo: receipt("Counted from the repository."),
  cv: receipt("On the CV."),
};

const hero: RichText<Id> = [
  "I built ",
  { claim: "a product", receipt: "repo" },
  " that is ",
  { claim: "live", receipt: "site" },
  ".",
];
const story: RichText<Id> = [
  "It is ",
  { claim: "still live", receipt: "site" },
  " and on ",
  { claim: "my CV", receipt: "cv" },
];

describe("citedReceipts", () => {
  it("lists receipts once, in the order they are first cited", () => {
    expect(citedReceipts([hero, story])).toEqual(["repo", "site", "cv"]);
  });

  it("ignores plain text and links", () => {
    expect(citedReceipts([["plain", { text: "a link", href: "/" }]])).toEqual([]);
  });

  it("counts a bare citation the same as a highlighted claim", () => {
    const cited: RichText<Id> = ["Proof lives here.", { cite: "cv" }];
    expect(citedReceipts([cited, hero])).toEqual(["cv", "repo", "site"]);
  });
});

describe("numberReceipts", () => {
  it("numbers receipts by first citation, top to bottom", () => {
    const numbering = numberReceipts(book, [hero, story]);
    expect(numbering.numberOf("repo")).toBe(1);
    expect(numbering.numberOf("site")).toBe(2);
    expect(numbering.numberOf("cv")).toBe(3);
  });

  it("gives each block the notes first cited in it, in number order", () => {
    const numbering = numberReceipts(book, [hero, story]);
    expect(numbering.notesFor([hero]).map((n) => [n.number, n.title])).toEqual([
      [1, "Counted from the repository."],
      [2, "Live site."],
    ]);
  });

  it("keeps one note per receipt, with the block that cites it first", () => {
    const numbering = numberReceipts(book, [hero, story]);
    expect(numbering.notesFor([story]).map((n) => n.id)).toEqual(["cv"]);
    expect(numbering.notesFor([hero]).map((n) => n.id)).toEqual(["repo", "site"]);
  });

  it("refuses to number a receipt the page never cites", () => {
    const numbering = numberReceipts(book, [hero]);
    expect(() => numbering.numberOf("cv")).toThrow(/not cited/);
  });
});
