import { describe, expect, it } from "vitest";
import { approximately, formatCount, formatDate, formatMoney, formatMonth } from "@/domain/format";

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

describe("formatMonth", () => {
  it("prints short month and year", () => {
    expect(formatMonth("2026-02")).toBe("Feb 2026");
    expect(formatMonth("2017-07")).toBe("Jul 2017");
  });

  it("rejects anything that is not a calendar month", () => {
    expect(() => formatMonth("2026-13")).toThrow();
    expect(() => formatMonth("Feb 2026")).toThrow();
  });
});

describe("formatMoney", () => {
  it("uses a true minus sign and groups thousands", () => {
    expect(formatMoney(-4428)).toBe("\u2212$4,428");
    expect(formatMoney(670)).toBe("$670");
  });

  it("adds a plus sign to gains when asked", () => {
    expect(formatMoney(60, { signed: true })).toBe("+$60");
    expect(formatMoney(0, { signed: true })).toBe("$0");
  });

  it("shows cents only when there are some", () => {
    expect(formatMoney(-33.33)).toBe("\u2212$33.33");
    expect(formatMoney(12.5)).toBe("$12.50");
  });
});
