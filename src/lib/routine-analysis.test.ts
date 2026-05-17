import { describe, expect, it } from "vitest";
import { buildRoutineScorecard } from "./routine-analysis";
import type { RoutineProduct } from "./routine";

describe("buildRoutineScorecard", () => {
  it("flags routines that stack too many strong actives in one session", () => {
    const products: RoutineProduct[] = [
      {
        id: "retinol",
        name: "Retinol serum",
        brand: "Test",
        notes: "Retinol treatment",
        slot: "pm",
        frequency: "daily",
      },
      {
        id: "bha",
        name: "BHA exfoliant",
        brand: "Test",
        notes: "Salicylic acid 2%",
        slot: "pm",
        frequency: "daily",
      },
      {
        id: "aha",
        name: "AHA toner",
        brand: "Test",
        notes: "Glycolic acid",
        slot: "pm",
        frequency: "every_other_day",
      },
    ];

    const scorecard = buildRoutineScorecard(products);

    expect(scorecard.insights.activeLoad).toHaveLength(1);
    expect(scorecard.insights.activeLoad[0]?.slot).toBe("pm");
    expect(scorecard.insights.scoreFactors).toContain(
      "Strong-active load looks high (−12)"
    );
  });
});
