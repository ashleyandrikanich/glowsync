import type { SkinPhotoAnalysis } from "./skin-photo-analysis";
import { mapAnalysisToQuizAnswers } from "./skin-photo-analysis";
import {
  MAX_QUIZ_PRIORITIES,
  type QuizAnswers,
  type QuizSkinProfile,
} from "./skin-quiz";

export const SKIN_PROFILE_STORAGE_KEY = "glowsync-skin-profile-v1";

export type SkinProfileSource = "quiz" | "scan" | "combined";

export type SavedSkinProfile = {
  answers: QuizAnswers;
  scanObservations: string[];
  scanConfidence: string | null;
  quizCompleted?: boolean;
  scanCompleted?: boolean;
  source: SkinProfileSource;
  updatedAt: string;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function isQuizAnswersComplete(answers: QuizAnswers): boolean {
  return Boolean(
    answers.skinProfile &&
      answers.concerns.length > 0 &&
      answers.sensitivity &&
      answers.spfHabit
  );
}

function normalizeProfile(raw: SavedSkinProfile): SavedSkinProfile {
  const inferredQuiz =
    raw.source !== "scan" && isQuizAnswersComplete(raw.answers);
  return {
    ...raw,
    quizCompleted: raw.quizCompleted ?? inferredQuiz,
    scanCompleted: raw.scanCompleted ?? Boolean(raw.scanObservations?.length),
  };
}

export function loadSkinProfile(): SavedSkinProfile | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SKIN_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedSkinProfile;
    if (!parsed?.answers || typeof parsed.updatedAt !== "string") return null;
    return normalizeProfile(parsed);
  } catch {
    return null;
  }
}

export function saveSkinProfile(profile: SavedSkinProfile): void {
  if (!isBrowser()) return;
  localStorage.setItem(SKIN_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function saveSkinProfileFromQuiz(answers: QuizAnswers): void {
  const existing = loadSkinProfile();
  saveSkinProfile({
    answers,
    scanObservations: existing?.scanObservations ?? [],
    scanConfidence: existing?.scanConfidence ?? null,
    source: existing?.scanObservations.length ? "combined" : "quiz",
    updatedAt: new Date().toISOString(),
  });
}

export function saveSkinProfileFromScan(
  analysis: SkinPhotoAnalysis,
  answers: QuizAnswers
): void {
  const existing = loadSkinProfile();
  const merged = existing?.answers
    ? mergeQuizAndScan(existing.answers, analysis)
    : answers;

  const hadQuiz = Boolean(existing && isQuizAnswersComplete(existing.answers));
  const quizCompleted =
    isQuizAnswersComplete(merged) || Boolean(existing?.quizCompleted);

  saveSkinProfile({
    answers: merged,
    scanObservations: analysis.observations,
    scanConfidence: analysis.confidence,
    quizCompleted,
    scanCompleted: true,
    source: quizCompleted ? "combined" : "scan",
    updatedAt: new Date().toISOString(),
  });
}

/** Photo refines visible skin type/concerns; quiz keeps SPF, sensitivity, and brands when set. */
export function mergeQuizAndScan(
  quiz: QuizAnswers,
  scan: SkinPhotoAnalysis
): QuizAnswers {
  const fromScan = mapAnalysisToQuizAnswers(scan);
  const concerns = [
    ...new Set([...quiz.concerns, ...fromScan.concerns]),
  ].slice(0, MAX_QUIZ_PRIORITIES);

  return {
    skinProfile: fromScan.skinProfile ?? quiz.skinProfile,
    concerns: concerns.length > 0 ? concerns : fromScan.concerns,
    sensitivity: quiz.sensitivity ?? fromScan.sensitivity,
    spfHabit: quiz.spfHabit ?? fromScan.spfHabit,
    favoriteBrands: quiz.favoriteBrands,
  };
}

export function profileHasQuizData(profile: SavedSkinProfile | null): boolean {
  if (!profile) return false;
  return (
    profile.quizCompleted === true ||
    profile.source === "quiz" ||
    profile.source === "combined" ||
    isQuizAnswersComplete(profile.answers)
  );
}

export function profileHasScanData(profile: SavedSkinProfile | null): boolean {
  return profile?.scanCompleted === true || Boolean(profile?.scanObservations.length);
}

export function isQuizComplete(profile: SavedSkinProfile | null): boolean {
  return profile?.quizCompleted === true;
}

export function isScanComplete(profile: SavedSkinProfile | null): boolean {
  return profile?.scanCompleted === true;
}

export function isReadyForRecommendations(profile: SavedSkinProfile | null): boolean {
  return isQuizComplete(profile) && isScanComplete(profile);
}

export function describeProfileBlend(profile: SavedSkinProfile | null): string | null {
  if (!profile) return null;
  if (profile.source === "combined") {
    return "Combined your Skin Quiz answers with your latest photo scan.";
  }
  if (profile.source === "scan") {
    return "Based on your photo scan. Add quiz steps to refine SPF and favorite brands.";
  }
  return "Based on your Skin Quiz. Add a photo scan to refine visible concerns.";
}

export function firstIncompleteQuizStep(answers: QuizAnswers): number {
  if (!answers.skinProfile) return 0;
  if (answers.concerns.length === 0) return 1;
  if (!answers.sensitivity) return 2;
  if (!answers.spfHabit) return 3;
  return 4;
}

export function quizAnswersFromProfile(
  profile: SavedSkinProfile | null
): QuizAnswers | null {
  if (!profile) return null;
  return profile.answers;
}

export type { QuizSkinProfile };
