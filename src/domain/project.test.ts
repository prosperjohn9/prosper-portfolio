import { describe, expect, it } from "vitest";
import {
  caseStudyFigures,
  caseStudyProse,
  runsOf,
  type Block,
  type CaseStudy,
} from "@/domain/project";
import type { Screenshot } from "@/domain/screenshot";

const shot = (letter: string): Screenshot => ({
  letter,
  image: { src: `/${letter}.png`, width: 10, height: 10 },
  alt: letter,
  title: letter,
  caption: letter,
});

const intro: Block = { kind: "intro", text: ["Intro"] };
const rules: Block = { kind: "rules", rules: [{ rule: "A rule", reason: ["Why"] }] };
const figure: Block = { kind: "figure", shot: shot("A") };
const steps: Block = { kind: "steps", steps: [{ name: "Build" }] };

describe("runsOf", () => {
  it("keeps text blocks that follow each other in one column", () => {
    expect(runsOf([intro, rules])).toEqual([{ kind: "column", blocks: [intro, rules] }]);
  });

  it("lets a wide block split the column", () => {
    expect(runsOf([intro, figure, rules, steps]).map((run) => run.kind)).toEqual([
      "column",
      "wide",
      "column",
      "wide",
    ]);
  });
});

describe("a case study", () => {
  const caseStudy: CaseStudy = {
    description: "",
    lede: ["Lede"],
    sections: [
      {
        id: "one",
        title: "One",
        blocks: [
          intro,
          { kind: "figure-pair", shots: [shot("B"), shot("C")] },
          { kind: "features", items: [{ name: "F", description: ["Feature"] }] },
        ],
      },
      { id: "two", title: "Two", blocks: [figure, rules, steps] },
    ],
  };

  it("lists its citing texts from the lede down", () => {
    expect(caseStudyProse(caseStudy)).toEqual([["Lede"], ["Intro"], ["Feature"], ["Why"]]);
  });

  it("lists its screenshots in page order", () => {
    expect(caseStudyFigures(caseStudy).map((s) => s.letter)).toEqual(["B", "C", "A"]);
  });
});
