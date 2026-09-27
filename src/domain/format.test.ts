import { describe, expect, it } from "vitest";
import { approximately, formatCount, formatDate } from "@/domain/format";

describe("formatCount", () => {
  it("groups thousands with commas", () => {
    expect(formatCount(116641)).toBe("116,641");
    expect(formatCount(97)).toBe("97");
  });
});

describe("approximately", () => {
  it("rounds to the nearest step", () => {
    expect(approximately(50465, 500)).toBe(50500);
    expect(approximately(50240, 500)).toBe(50000);
  });
});

describe("formatDate", () => {
  it("prints day, short month and year", () => {
    expect(formatDate("2026-09-27")).toBe("27 Sep 2026");
    expect(formatDate("2026-01-05")).toBe("5 Jan 2026");
  });

  it("does not shift the day with the time zone", () => {
    expect(formatDate("2026-12-31")).toBe("31 Dec 2026");
  });

  it("rejects anything that is not a calendar date", () => {
    expect(() => formatDate("27/09/2026")).toThrow();
    expect(() => formatDate("2026-13-01")).toThrow();
  });
});
