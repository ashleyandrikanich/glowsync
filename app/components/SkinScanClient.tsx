"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { QuizRoutinePlanner } from "./QuizRoutinePlanner";
import {
  formatProductNotes,
  getCatalogProductById,
} from "@/src/lib/product-catalog";
import type { SkinPhotoAnalysis } from "@/src/lib/skin-photo-analysis";
import { SKIN_SCAN_MAX_BYTES } from "@/src/lib/skin-photo-analysis";
import {
  describeProfileBlend,
  loadSkinProfile,
  mergeQuizAndScan,
  saveSkinProfileFromScan,
} from "@/src/lib/skin-profile";
import { SkinProfileBridge } from "./SkinProfileBridge";
import { buildQuizResult, type QuizAnswers, type QuizResult } from "@/src/lib/skin-quiz";

type ScanResponse = {
  analysis: SkinPhotoAnalysis;
  quizAnswers: QuizAnswers;
  result: QuizResult;
};

async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  const mimeType = file.type || "image/jpeg";
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return { base64: btoa(binary), mimeType };
}

type SkinScanClientProps = {
  hub?: boolean;
  onScanComplete?: () => void;
};

export function SkinScanClient({ hub = false, onScanComplete }: SkinScanClientProps = {}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scan, setScan] = useState<ScanResponse | null>(null);
  const [plannerKey, setPlannerKey] = useState(0);

  const clearPhoto = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileMeta(null);
    setPendingFile(null);
    setScan(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [previewUrl]);

  const onPickFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      setError(null);
      setScan(null);

      if (!file.type.startsWith("image/")) {
        setError("Please choose a JPEG, PNG, or WebP image.");
        return;
      }
      if (file.size > SKIN_SCAN_MAX_BYTES) {
        setError("Photo must be under 4 MB. Try a smaller image or lower resolution.");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      setPendingFile(file);
      setFileMeta({ name: file.name, size: file.size });
    },
    [previewUrl]
  );

  const analyze = useCallback(async () => {
    if (!pendingFile) {
      setError("Add a photo first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { base64, mimeType } = await fileToBase64(pendingFile);
      const res = await fetch("/api/skin-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      });
      const data = (await res.json()) as ScanResponse & { error?: string; code?: string };
      if (!res.ok) {
        setError(data.error ?? "Analysis failed. Please try again.");
        return;
      }

      const saved = loadSkinProfile();
      const mergedAnswers = saved
        ? mergeQuizAndScan(saved.answers, data.analysis)
        : data.quizAnswers;

      const mergedResult = buildQuizResult(mergedAnswers);
      if (!mergedResult) {
        setError("Could not build recommendations from this analysis.");
        return;
      }

      saveSkinProfileFromScan(data.analysis, mergedAnswers);

      if (hub) {
        setScan({
          analysis: data.analysis,
          quizAnswers: mergedAnswers,
          result: mergedResult,
        });
        onScanComplete?.();
        return;
      }

      setScan({
        analysis: data.analysis,
        quizAnswers: mergedAnswers,
        result: mergedResult,
      });
      setPlannerKey((k) => k + 1);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [hub, onScanComplete, pendingFile]);

  const visiblePicks = useMemo(() => scan?.result.catalogPicks ?? [], [scan]);
  const blendNote = describeProfileBlend(loadSkinProfile());

  return (
    <div className="space-y-8">
      {!hub ? <SkinProfileBridge mode="scan" /> : null}

      <div className="rounded-2xl border border-earth/30 bg-blush/70 px-4 py-3 text-sm leading-relaxed text-offblack/90">
        <strong className="font-semibold">Educational only.</strong> This tool is not
        medical advice, diagnosis, or treatment. AI reads visible patterns in a single
        photo; lighting, makeup, and camera quality affect results. Patch test new
        products and see a clinician for persistent or painful skin issues.
      </div>

      {!scan ? (
        <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/88 via-blush/28 to-dawn/18 p-6 sm:p-8">
          <h2 className="font-serif text-xl font-medium text-offblack sm:text-2xl">
            Add a face photo
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-offblack/70">
            Use your camera or upload a clear, well-lit photo without heavy filters.
            We analyze it once, then discard it from the server. If you already took
            the Skin Quiz, we will merge those answers with what the photo shows.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex min-h-[12rem] flex-1 items-center justify-center overflow-hidden rounded-xl border border-dashed border-sand/90 bg-linen/50">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Your selected skin photo preview"
                  className="max-h-72 w-full object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-offblack/50">
                  No photo yet
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:w-52">
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="user"
                className="sr-only"
                onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-xl bg-earth px-4 py-3 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
              >
                Take or upload photo
              </button>
              {fileMeta ? (
                <p className="text-xs text-offblack/55">
                  {fileMeta.name} ({Math.round(fileMeta.size / 1024)} KB)
                </p>
              ) : null}
              {previewUrl ? (
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="rounded-xl border border-sand/90 px-4 py-2.5 text-sm font-medium text-earth transition hover:border-earth/40 hover:bg-linen/80"
                >
                  Remove photo
                </button>
              ) : null}
              <button
                type="button"
                disabled={!pendingFile || loading}
                onClick={analyze}
                className="rounded-xl border border-earth/35 bg-dawn/40 px-4 py-3 text-sm font-semibold text-offblack transition hover:border-earth/50 hover:bg-dawn/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing…" : "Analyze & recommend"}
              </button>
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-xl border border-earth/30 bg-blush/75 px-4 py-3 text-sm text-offblack/88">
              {error}
            </p>
          ) : null}
        </section>
      ) : null}

      {scan && hub ? (
        <div className="rounded-2xl border border-earth/25 bg-dawn/20 px-4 py-5 sm:px-6">
          <p className="text-sm font-semibold text-offblack">Photo scan complete</p>
          <p className="mt-2 text-sm text-offblack/75">
            Your photo was analyzed and saved with your quiz answers. Opening your
            combined recommendations…
          </p>
          {scan.analysis.observations.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-offblack/72">
              {scan.analysis.observations.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            onClick={clearPhoto}
            className="mt-4 rounded-xl border border-sand/90 px-4 py-2 text-sm font-medium text-earth transition hover:border-earth/40 hover:bg-linen/80"
          >
            Scan another photo
          </button>
        </div>
      ) : null}

      {scan && !hub ? (
        <div className="space-y-10">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearPhoto}
              className="rounded-xl border border-sand/90 px-4 py-2.5 text-sm font-medium text-earth transition hover:border-earth/40 hover:bg-linen/80"
            >
              Scan another photo
            </button>
            <Link
              href="/skin-quiz?from=scan"
              className="rounded-xl bg-earth px-4 py-2.5 text-sm font-medium text-linen transition hover:bg-offblack"
            >
              Refine in Quiz tab
            </Link>
          </div>

          {blendNote ? (
            <p className="rounded-xl border border-earth/20 bg-dawn/25 px-4 py-3 text-sm text-offblack/80">
              {blendNote}
            </p>
          ) : null}

          <div className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/88 via-blush/32 to-dawn/22 p-6 sm:p-8">
            <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/85">
              AI snapshot · confidence: {scan.analysis.confidence}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-offblack sm:text-3xl">
              {scan.result.profileTitle}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-offblack/75">
              {scan.result.profileBody}
            </p>
            {scan.analysis.observations.length > 0 ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-offblack/72">
                {scan.analysis.observations.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <section className="grid gap-4 md:grid-cols-3" aria-label="Suggested next steps">
            {scan.result.actionCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-dawn/45 bg-gradient-to-br from-linen/82 via-blush/25 to-dawn/18 p-5"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/80">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-offblack/72">
                  {card.body}
                </p>
              </article>
            ))}
          </section>

          <QuizRoutinePlanner key={plannerKey} steps={scan.result.routineSteps} />

          <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/82 via-blush/30 to-dawn/20 p-6 sm:p-8">
            <h3 className="font-serif text-xl font-medium text-offblack">
              Catalog picks from your scan
            </h3>
            <p className="mt-2 text-sm text-offblack/65">
              Matched to visible patterns and our catalog rules. Patch test, introduce
              one product at a time, and confirm prescriptions or allergies with a
              clinician.
            </p>
            <ul className="mt-6 space-y-4">
              {visiblePicks.map((pick) => {
                const p = getCatalogProductById(pick.productId);
                if (!p) return null;
                return (
                  <li
                    key={pick.productId}
                    className="rounded-xl border border-sand/80 bg-gradient-to-br from-linen/75 to-blush/25 px-4 py-3"
                  >
                    <p className="font-medium text-offblack">
                      {p.brand}: {p.name}
                    </p>
                    <p className="mt-1 text-xs text-earth/90">
                      {p.keyActives.join(" · ")}
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-offblack/75">
                      {pick.reasons.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs font-medium text-earth">
                        Sample routine notes
                      </summary>
                      <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-offblack/70">
                        {formatProductNotes(p)}
                      </pre>
                    </details>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      ) : null}
    </div>
  );
}
