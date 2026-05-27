import type { SkinPhotoAnalysis, SkinScanMime } from "./skin-photo-analysis";
import { analyzeSkinPhotoWithGemini } from "./skin-photo-gemini";
import { analyzeSkinPhotoWithVision, SkinVisionError } from "./skin-photo-vision";

/**
 * Prefer Gemini (free tier via Google AI Studio) when GEMINI_API_KEY is set.
 * Falls back to OpenAI when only OPENAI_API_KEY is set.
 */
export async function analyzeSkinPhoto(
  imageBase64: string,
  mimeType: SkinScanMime
): Promise<SkinPhotoAnalysis> {
  const gemini = process.env.GEMINI_API_KEY?.trim();
  const openai = process.env.OPENAI_API_KEY?.trim();

  if (gemini) {
    return analyzeSkinPhotoWithGemini(imageBase64, mimeType);
  }
  if (openai) {
    return analyzeSkinPhotoWithVision(imageBase64, mimeType);
  }

  throw new SkinVisionError(
    "Skin scan needs an AI key. For free: set GEMINI_API_KEY from aistudio.google.com/apikey. Or set OPENAI_API_KEY (paid billing required).",
    "missing_key"
  );
}
