import {
  VISION_ANALYSIS_PROMPT,
  validateSkinPhotoAnalysis,
  type SkinPhotoAnalysis,
  type SkinScanMime,
} from "./skin-photo-analysis";
import { SkinVisionError } from "./skin-photo-vision";

/** Stable on free tier first; newer models tried if available. */
const GEMINI_MODEL_FALLBACKS = [
  "gemini-1.5-flash",
  "gemini-2.0-flash-001",
  "gemini-2.5-flash",
] as const;

const RETRYABLE = new Set([500, 502, 503, 504]);
const MAX_ATTEMPTS = 3;

function geminiModelsToTry(): string[] {
  const override = process.env.GEMINI_MODEL?.trim();
  if (override) return [override];
  return [...GEMINI_MODEL_FALLBACKS];
}

function geminiUrl(apiVersion: "v1" | "v1beta", model: string) {
  return `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function messageFromGeminiError(status: number, detail: string): SkinVisionError {
  const lower = detail.toLowerCase();
  if (
    status === 429 ||
    lower.includes("quota") ||
    lower.includes("resource_exhausted")
  ) {
    return new SkinVisionError(
      "Gemini free-tier limit reached. Wait a few minutes or try again tomorrow. See Google AI Studio usage limits.",
      "quota_exceeded"
    );
  }
  if (status === 404 || lower.includes("not found")) {
    return new SkinVisionError(
      "Gemini model not available for this API key. Set GEMINI_MODEL in .env (try gemini-1.5-flash).",
      "api_error"
    );
  }
  if (status === 403 || lower.includes("api key") || lower.includes("permission")) {
    return new SkinVisionError(
      "Gemini rejected the API key. Create a key at aistudio.google.com/apikey (starts with AIza) and set GEMINI_API_KEY in .env.",
      "api_error"
    );
  }
  if (status === 503 || lower.includes("unavailable")) {
    return new SkinVisionError(
      "Google Gemini is temporarily overloaded. Wait 30–60 seconds and try again, or use the Skin Quiz for recommendations without a photo.",
      "api_error"
    );
  }
  return new SkinVisionError(
    `Gemini vision failed (${status}). Check your API key at aistudio.google.com/apikey and try again.`,
    "api_error"
  );
}

function warnIfKeyFormatUnusual(apiKey: string) {
  if (!apiKey.startsWith("AIza")) {
    console.warn(
      "[skin-scan] GEMINI_API_KEY does not start with AIza. Use a key from https://aistudio.google.com/apikey (not Vertex or OAuth)."
    );
  }
}

function buildBody(
  imageBase64: string,
  mimeType: SkinScanMime,
  jsonMode: boolean
) {
  return {
    contents: [
      {
        parts: [
          { text: VISION_ANALYSIS_PROMPT },
          { inline_data: { mime_type: mimeType, data: imageBase64 } },
        ],
      },
    ],
    generationConfig: jsonMode
      ? { temperature: 0.2, responseMimeType: "application/json" }
      : { temperature: 0.2 },
  };
}

async function requestGeminiOnce(
  apiVersion: "v1" | "v1beta",
  model: string,
  apiKey: string,
  imageBase64: string,
  mimeType: SkinScanMime,
  jsonMode: boolean
): Promise<{ ok: true; analysis: SkinPhotoAnalysis } | { ok: false; status: number; detail: string }> {
  const body = buildBody(imageBase64, mimeType, jsonMode);

  const res = await fetch(geminiUrl(apiVersion, model), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, status: res.status, detail };
  }

  const payload = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const content = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    return { ok: false, status: 502, detail: "empty response" };
  }

  let parsed: unknown;
  try {
    const trimmed = content.trim();
    const jsonStart = trimmed.indexOf("{");
    const jsonEnd = trimmed.lastIndexOf("}");
    const slice =
      jsonStart >= 0 && jsonEnd > jsonStart
        ? trimmed.slice(jsonStart, jsonEnd + 1)
        : trimmed;
    parsed = JSON.parse(slice);
  } catch {
    return { ok: false, status: 502, detail: "invalid json" };
  }

  const analysis = validateSkinPhotoAnalysis(parsed);
  if (!analysis) {
    return { ok: false, status: 502, detail: "invalid schema" };
  }

  return { ok: true, analysis };
}

async function requestGeminiWithRetries(
  model: string,
  apiKey: string,
  imageBase64: string,
  mimeType: SkinScanMime
): Promise<{ ok: true; analysis: SkinPhotoAnalysis } | { ok: false; status: number; detail: string }> {
  const attempts: Array<{ apiVersion: "v1" | "v1beta"; jsonMode: boolean }> = [
    { apiVersion: "v1beta", jsonMode: true },
    { apiVersion: "v1beta", jsonMode: false },
    { apiVersion: "v1", jsonMode: true },
  ];

  let lastStatus = 503;
  let lastDetail = "";

  for (const { apiVersion, jsonMode } of attempts) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      const result = await requestGeminiOnce(
        apiVersion,
        model,
        apiKey,
        imageBase64,
        mimeType,
        jsonMode
      );
      if (result.ok) return result;

      lastStatus = result.status;
      lastDetail = result.detail;

      if (result.status === 404) return result;
      if (result.status === 403 || result.status === 429) return result;

      if (RETRYABLE.has(result.status) && attempt < MAX_ATTEMPTS - 1) {
        await sleep(800 * (attempt + 1));
        continue;
      }

      if (!RETRYABLE.has(result.status)) break;
    }
  }

  return { ok: false, status: lastStatus, detail: lastDetail };
}

export async function analyzeSkinPhotoWithGemini(
  imageBase64: string,
  mimeType: SkinScanMime
): Promise<SkinPhotoAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new SkinVisionError(
      "Add GEMINI_API_KEY for free skin scan (get one at aistudio.google.com/apikey).",
      "missing_key"
    );
  }

  warnIfKeyFormatUnusual(apiKey);

  const models = geminiModelsToTry();
  let lastStatus = 0;
  let lastDetail = "";

  for (const model of models) {
    const result = await requestGeminiWithRetries(
      model,
      apiKey,
      imageBase64,
      mimeType
    );
    if (result.ok) return result.analysis;

    lastStatus = result.status;
    lastDetail = result.detail;

    if (result.status === 404) continue;
    if (RETRYABLE.has(result.status)) continue;
    throw messageFromGeminiError(result.status, result.detail);
  }

  throw messageFromGeminiError(lastStatus || 503, lastDetail);
}
