import { describe, expect, it } from "vitest";
import {
  buildScanQuizResult,
  mapAnalysisToQuizAnswers,
  validateSkinPhotoAnalysis,
} from "./skin-photo-analysis";

const sample = {
  skinProfile: "combo_classic",
  concerns: ["texture", "pores"],
  sensitivity: "mixed",
  spfHabit: "sometimes",
  observations: ["Visible shine in T-zone", "Cheeks look drier"],
  confidence: "medium",
} as const;

describe("validateSkinPhotoAnalysis", () => {
  it("accepts a valid payload", () => {
    expect(validateSkinPhotoAnalysis(sample)).toEqual(sample);
  });

  it("rejects empty concerns", () => {
    expect(
      validateSkinPhotoAnalysis({ ...sample, concerns: [] })
    ).toBeNull();
  });
});

describe("mapAnalysisToQuizAnswers", () => {
  it("feeds buildQuizResult", () => {
    const answers = mapAnalysisToQuizAnswers(sample);
    const result = buildScanQuizResult(sample);
    expect(answers.skinProfile).toBe("combo_classic");
    expect(result?.catalogPicks.length).toBeGreaterThan(0);
    expect(result?.routineSteps.length).toBeGreaterThan(0);
  });
});
