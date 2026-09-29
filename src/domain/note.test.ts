import { describe, expect, it } from "vitest";
import { plainText } from "@/domain/note";

describe("plainText", () => {
  it("returns a plain paragraph as it is", () => {
    expect(plainText("Then the security questions begin.")).toBe(
      "Then the security questions begin.",
    );
  });

  it("keeps a link's words in place and drops its address", () => {
    expect(
      plainText([{ text: "Microsoft’s tooling", href: "https://example.com" }, " includes this."]),
    ).toBe("Microsoft’s tooling includes this.");
  });
});
