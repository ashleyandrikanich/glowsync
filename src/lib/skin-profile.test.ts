import { describe, expect, it } from "vitest";
import {
  isQuizAnswersComplete,
  isQuizComplete,
  isReadyForRecommendations,
  isScanComplete,
  mergeQuizAndScan,
} from "./skin-profile";
import type { SavedSkinProfile } from "./skin-profile";
import type { SkinPhotoAnalysis } from "./skin-photo-analysis";

const scan: SkinPhotoAnalysis = {
  skinProfile: "oily_tzone",
  concerns: ["texture", "pores"],
  sensitivity: "mixed",
  spfHabit: "sometimes",
  observations: ["T-zone shine"],
  confidence: "medium",
};

describe("mergeQuizAndScan", () => {
  it("keeps quiz SPF and brands while applying scan skin profile", () => {
    const merged = mergeQuizAndScan(
      {
        skinProfile: "dry_tight",
        concerns: ["barrier"],
        sensitivity: "often_stings",
        spfHabit: "always",
        favoriteBrands: ["CeraVe"],
      },
      scan
    );

    expect(merged.skinProfile).toBe("oily_tzone");
    expect(merged.sensitivity).toBe("often_stings");
    expect(merged.spfHabit).toBe("always");
    expect(merged.favoriteBrands).toEqual(["CeraVe"]);
    expect(merged.concerns).toContain("barrier");
    expect(merged.concerns).toContain("texture");
  });
});

describe("profile completion flags", () => {
  const completeAnswers = {
    skinProfile: "balanced" as const,
    concerns: ["texture" as const],
    sensitivity: "rarely_stings" as const,
    spfHabit: "sometimes" as const,
    favoriteBrands: [],
  };

  it("requires both quiz and scan for recommendations", () => {
    const quizOnly: SavedSkinProfile = {
      answers: completeAnswers,
      scanObservations: [],
      scanConfidence: null,
      quizCompleted: true,
      scanCompleted: false,
      source: "quiz",
      updatedAt: new Date().toISOString(),
    };
    expect(isQuizComplete(quizOnly)).toBe(true);
    expect(isScanComplete(quizOnly)).toBe(false);
    expect(isReadyForRecommendations(quizOnly)).toBe(false);

    const both: SavedSkinProfile = {
      ...quizOnly,
      scanObservations: ["T-zone shine"],
      scanCompleted: true,
      source: "combined",
    };
    expect(isReadyForRecommendations(both)).toBe(true);
  });

  it("infers quiz complete from answers when flag missing", () => {
    expect(isQuizAnswersComplete(completeAnswers)).toBe(true);
  });
});
