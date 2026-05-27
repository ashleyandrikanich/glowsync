import { NextResponse } from "next/server";
import {
  SKIN_SCAN_MAX_BYTES,
  buildScanQuizResult,
  isAllowedSkinScanMime,
  mapAnalysisToQuizAnswers,
} from "@/src/lib/skin-photo-analysis";
import { analyzeSkinPhoto } from "@/src/lib/skin-photo-provider";
import { SkinVisionError } from "@/src/lib/skin-photo-vision";
import {
  rateLimit,
  readLimitedJson,
  sameOriginGuard,
} from "@/src/lib/request-security";

const BODY_MAX = 6_000_000;

type ScanBody = {
  imageBase64?: string;
  mimeType?: string;
};

function estimateBase64Bytes(b64: string): number {
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.floor((b64.length * 3) / 4) - padding;
}

export async function POST(req: Request) {
  try {
    const originBlocked = sameOriginGuard(req);
    if (originBlocked) return originBlocked;

    const limited = rateLimit(req, "skin-scan", 10, 60 * 60 * 1000);
    if (limited) return limited;

    const body = await readLimitedJson<ScanBody>(req, BODY_MAX);
    if (!body?.imageBase64 || !body.mimeType) {
      return NextResponse.json(
        { error: "Photo and mimeType are required." },
        { status: 400 }
      );
    }

    if (!isAllowedSkinScanMime(body.mimeType)) {
      return NextResponse.json(
        { error: "Use a JPEG, PNG, or WebP photo." },
        { status: 400 }
      );
    }

    const b64 = body.imageBase64.replace(/\s/g, "");
    if (!/^[\d+/A-Za-z]+=*$/.test(b64)) {
      return NextResponse.json({ error: "Invalid image data." }, { status: 400 });
    }

    const bytes = estimateBase64Bytes(b64);
    if (bytes > SKIN_SCAN_MAX_BYTES) {
      return NextResponse.json(
        { error: "Photo is too large. Please use an image under 4 MB." },
        { status: 400 }
      );
    }

    const analysis = await analyzeSkinPhoto(b64, body.mimeType);
    const quizAnswers = mapAnalysisToQuizAnswers(analysis);
    const result = buildScanQuizResult(analysis);

    if (!result) {
      return NextResponse.json(
        { error: "Could not build recommendations from this analysis." },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis, quizAnswers, result });
  } catch (err) {
    if (err instanceof SkinVisionError) {
      const status =
        err.code === "missing_key"
          ? 503
          : err.code === "quota_exceeded"
            ? 402
            : 502;
      return NextResponse.json({ error: err.message, code: err.code }, { status });
    }
    console.error("[skin-analyze]", err);
    return NextResponse.json(
      { error: "Something went wrong analyzing your photo." },
      { status: 500 }
    );
  }
}
