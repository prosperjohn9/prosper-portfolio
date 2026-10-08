import { describe, expect, it } from "vitest";
import { type Degree, degreeMilestone, degreeName } from "@/domain/degree";

const msc: Degree = {
  award: "M.Sc.",
  level: "Master's degree",
  field: "Cyber Security",
  school: "Üsküdar University",
  completed: "2026-02",
  detail: "Thesis: AI in cybersecurity.",
};

describe("degrees", () => {
  it("are named by award and field", () => {
    expect(degreeName(msc)).toBe("M.Sc. Cyber Security");
  });

  it("read on the timeline as the month completed, the degree and the school", () => {
    expect(degreeMilestone(msc)).toEqual({
      period: "Feb 2026",
      title: "M.Sc. Cyber Security, Üsküdar University",
      detail: "Thesis: AI in cybersecurity.",
    });
  });

  it("leave the detail out when there is none", () => {
    expect(degreeMilestone({ ...msc, detail: undefined })).not.toHaveProperty("detail");
  });
});
