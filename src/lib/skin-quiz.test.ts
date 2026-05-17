import { describe, expect, it } from "vitest";
import { buildQuizResult, type QuizAnswers } from "./skin-quiz";

const completeAnswers: QuizAnswers = {
  skinProfile: "oily_tzone",
  concerns: ["breakouts", "tone", "dehydration"],
  sensitivity: "usually_fine",
  spfHabit: "sometimes",
  favoriteBrands: ["CeraVe"],
};

describe("buildQuizResult", () => {
  it("builds actionable result cards from complete answers", () => {
    const result = buildQuizResult(completeAnswers);

    expect(result).not.toBeNull();
    expect(result?.actionCards).toHaveLength(3);
    expect(result?.actionCards.map((card) => card.title)).toEqual([
      "What We Heard",
      "Start Here",
      "Go Slow With",
    ]);
    expect(result?.catalogPicks.length).toBeGreaterThan(0);
  });

  it("keeps sun protection out of evening routine steps", () => {
    const result = buildQuizResult(completeAnswers);

    expect(result).not.toBeNull();
    const eveningSteps = result!.routineSteps.filter((step) => step.session === "pm");

    expect(eveningSteps.length).toBeGreaterThan(0);
    expect(eveningSteps.every((step) => step.kind !== "protect")).toBe(true);
    expect(
      eveningSteps.every((step) => !step.title.toLowerCase().includes("sun protection"))
    ).toBe(true);
  });

  it("dedupes assigned routine products when enough products are available", () => {
    const result = buildQuizResult(completeAnswers);

    expect(result).not.toBeNull();
    const productIds = result!.routineSteps.map((step) => step.productId);

    expect(new Set(productIds).size).toBe(productIds.length);
  });
});
