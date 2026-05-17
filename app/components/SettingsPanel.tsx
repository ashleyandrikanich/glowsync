"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  clearRoutineStorage,
  loadRoutineProducts,
  parseRoutineProductsJson,
  saveRoutineProducts,
} from "@/src/lib/routine";

export function SettingsPanel() {
  const [routineCount, setRoutineCount] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const refreshCount = useCallback(() => {
    setRoutineCount(loadRoutineProducts().length);
  }, []);

  useEffect(() => {
    queueMicrotask(refreshCount);
  }, [refreshCount]);

  const exportRoutine = useCallback(() => {
    const products = loadRoutineProducts();
    const blob = new Blob([JSON.stringify(products, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `glowsync-routine-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus(
      products.length === 0
        ? "Exported an empty list — you can still keep the file as a template."
        : `Exported ${products.length} product row(s).`
    );
  }, []);

  const clearRoutine = useCallback(() => {
    if (routineCount === 0) {
      setStatus("Nothing to clear.");
      return;
    }
    const ok = window.confirm(
      "Remove every product from My routine on this device? This cannot be undone."
    );
    if (!ok) return;
    clearRoutineStorage();
    setRoutineCount(0);
    setStatus("Routine cleared. Open My routine to confirm, or refresh if another tab is open.");
  }, [routineCount]);

  const onImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === "string" ? reader.result : "";
        const parsed = parseRoutineProductsJson(text);
        if (!parsed) {
          setStatus("Could not read that file — use JSON exported from GlowSync.");
          return;
        }
        const ok = window.confirm(
          `Replace your current routine (${routineCount} row(s)) with ${parsed.length} imported row(s)?`
        );
        if (!ok) return;
        saveRoutineProducts(parsed);
        setRoutineCount(parsed.length);
        setStatus(`Imported ${parsed.length} row(s). Open My routine to see them.`);
      };
      reader.readAsText(file);
    },
    [routineCount]
  );

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-dawn/50 bg-gradient-to-br from-blush/35 via-linen/75 to-dawn/25 px-5 py-6 sm:px-7 sm:py-7">
        <h2 className="font-serif text-xl font-medium text-offblack sm:text-2xl">
          Your Data Stays Here
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-offblack/75 sm:text-[0.9375rem]">
          GlowSync routines and quiz-style answers live in{" "}
          <strong className="font-medium text-offblack">this browser only</strong>
          . Nothing is uploaded to our servers. Clearing site data in the
          browser will remove it — use export below if you want a backup.
        </p>
      </section>

      <section className="rounded-2xl border border-sand/80 bg-gradient-to-br from-linen/85 to-blush/30 px-5 py-6 sm:px-6">
        <h2 className="font-serif text-lg font-medium text-offblack">
          My Routine Backup
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-offblack/70">
          Current rows on this device:{" "}
          <span className="font-semibold text-earth">{routineCount}</span>.{" "}
          <Link
            href="/routine"
            className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            Open My Routine
          </Link>
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportRoutine}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-earth/35 bg-linen/80 px-5 py-2.5 text-sm font-semibold text-earth transition hover:border-earth/55 hover:bg-linen"
          >
            Import JSON…
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={onImportFile}
          />
          <button
            type="button"
            onClick={clearRoutine}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-blossom/45 bg-blossom/10 px-5 py-2.5 text-sm font-semibold text-earth transition hover:border-blossom/70 hover:bg-blossom/20"
          >
            Clear Routine
          </button>
        </div>
        {status ? (
          <p
            className="mt-4 rounded-lg border border-sage/35 bg-sage/10 px-3 py-2 text-sm text-offblack/80"
            role="status"
          >
            {status}
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-sand/80 bg-linen/60 px-5 py-6 sm:px-6">
        <h2 className="font-serif text-lg font-medium text-offblack">
          Education & Safety
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-offblack/75">
          <li>
            <Link
              href="/about"
              className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
            >
              About GlowSync
            </Link>{" "}
            — what the app does and does not promise.
          </li>
          <li>
            <Link
              href="/actives"
              className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
            >
              Actives Library
            </Link>{" "}
            — look up common ingredients when labels confuse you.
          </li>
          <li>
            <Link
              href="/guide"
              className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
            >
              Routine Guide
            </Link>{" "}
            — layering habits by skin feel.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-dashed border-sand/90 bg-linen/40 px-5 py-5 sm:px-6">
        <h2 className="font-serif text-lg font-medium text-offblack">Appearance</h2>
        <p className="mt-2 text-sm leading-relaxed text-offblack/65">
          Only the warm light theme is available right now — built to match the
          apricot wash across the app. If you would like a dark mode later, we
          can add it from here.
        </p>
      </section>
    </div>
  );
}
