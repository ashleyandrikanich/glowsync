import {
  VISION_ANALYSIS_PROMPT,
  validateSkinPhotoAnalysis,
  type SkinPhotoAnalysis,
  type SkinScanMime,
} from "./skin-photo-analysis";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

export class SkinVisionError extends Error {
  constructor(
    message: string,
    readonly code:
      | "missing_key"
      | "quota_exceeded"
      | "api_error"
      | "invalid_response"
  ) {
    super(message);
    this.name = "SkinVisionError";
  }
}

function messageFromOpenAiError(status: number, detail: string): SkinVisionError {
  const lower = detail.toLowerCase();
  if (
    status === 429 ||
    lower.includes("quota") ||
    lower.includes("billing") ||
    lower.includes("insufficient")
  ) {
    return new SkinVisionError(
      "OpenAI billing or usage limit reached. Add a payment method and credits at platform.openai.com (Settings → Billing), then try again. New accounts often need billing enabled before the API works.",
      "quota_exceeded"
    );
  }
  if (status === 401) {
    return new SkinVisionError(
      "OpenAI rejected the API key. Check OPENAI_API_KEY in .env or create a new key at platform.openai.com/api-keys.",
      "api_error"
    );
  }
  return new SkinVisionError(
    `Vision API failed (${status}). Try again in a few minutes.`,
    "api_error"
  );
}

export async function analyzeSkinPhotoWithVision(
  imageBase64: string,
  mimeType: SkinScanMime
): Promise<SkinPhotoAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new SkinVisionError(
      "Skin scan is not configured on the server. Add OPENAI_API_KEY to enable AI analysis.",
      "missing_key"
    );
  }

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      max_tokens: 900,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: VISION_ANALYSIS_PROMPT },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
                detail: "low",
              },
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw messageFromOpenAiError(res.status, detail);
  }

  const payload = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new SkinVisionError("Vision API returned an empty response.", "invalid_response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new SkinVisionError("Vision API returned invalid JSON.", "invalid_response");
  }

  const analysis = validateSkinPhotoAnalysis(parsed);
  if (!analysis) {
    throw new SkinVisionError(
      "Vision API response did not match the expected format.",
      "invalid_response"
    );
  }

  return analysis;
}
