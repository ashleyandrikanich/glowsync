"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createSkinJournalEntry,
  loadSkinJournalEntries,
  saveSkinJournalEntries,
  type SkinJournalEntry,
} from "@/src/lib/skin-journal";

const fieldClass =
  "w-full rounded-xl border border-sand/90 bg-linen/65 px-4 py-2.5 text-offblack shadow-sm outline-none transition placeholder:text-offblack/35 hover:border-blossom/35 hover:bg-linen/85 focus:border-sage focus:ring-2 focus:ring-sage/25";

const labelClass =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-earth/80";

const skinFeelOptions = ["Balanced", "Dry", "Oily", "Tight", "Sensitive"];
const levelOptions = ["None", "Mild", "Moderate", "High"];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function SkinJournalClient() {
  const [hydrated, setHydrated] = useState(false);
  const [entries, setEntries] = useState<SkinJournalEntry[]>([]);
  const [date, setDate] = useState(todayIso);
  const [skinFeel, setSkinFeel] = useState(skinFeelOptions[0]);
  const [breakoutLevel, setBreakoutLevel] = useState(levelOptions[0]);
  const [irritationLevel, setIrritationLevel] = useState(levelOptions[0]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setEntries(loadSkinJournalEntries());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSkinJournalEntries(entries);
  }, [entries, hydrated]);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  function addEntry(e: React.FormEvent) {
    e.preventDefault();
    const trimmedNotes = notes.trim();
    if (!trimmedNotes && breakoutLevel === "None" && irritationLevel === "None") {
      return;
    }

    const entry = createSkinJournalEntry({
      date,
      skinFeel,
      breakoutLevel,
      irritationLevel,
      notes: trimmedNotes,
    });

    setEntries((current) => [entry, ...current]);
    setNotes("");
  }

  function removeEntry(id: string) {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        onSubmit={addEntry}
        className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/80 to-blush/30 p-5 shadow-sm"
      >
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Add a check-in
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-offblack/65">
          Track how your skin feels alongside breakouts, irritation, and quick
          notes. Entries are stored on this device.
        </p>

        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <label htmlFor="journal-date" className={labelClass}>
              Date
            </label>
            <input
              id="journal-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="journal-feel" className={labelClass}>
                Skin feel
              </label>
              <select
                id="journal-feel"
                value={skinFeel}
                onChange={(e) => setSkinFeel(e.target.value)}
                className={fieldClass}
              >
                {skinFeelOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="journal-breakouts" className={labelClass}>
                Breakouts
              </label>
              <select
                id="journal-breakouts"
                value={breakoutLevel}
                onChange={(e) => setBreakoutLevel(e.target.value)}
                className={fieldClass}
              >
                {levelOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="journal-irritation" className={labelClass}>
                Irritation
              </label>
              <select
                id="journal-irritation"
                value={irritationLevel}
                onChange={(e) => setIrritationLevel(e.target.value)}
                className={fieldClass}
              >
                {levelOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="journal-notes" className={labelClass}>
              Notes
            </label>
            <textarea
              id="journal-notes"
              rows={5}
              maxLength={600}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={fieldClass}
              placeholder="What changed today? New product, dryness, redness, better texture..."
            />
            <p className="text-xs text-offblack/45">{notes.length}/600</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
        >
          Save Entry
        </button>
      </form>

      <section className="rounded-2xl border border-sand/70 bg-linen/60 p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
              Journal
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-offblack">
              Recent skin notes
            </h2>
          </div>
          <p className="text-sm text-offblack/55">
            {entries.length} entr{entries.length === 1 ? "y" : "ies"}
          </p>
        </div>

        <ul className="mt-5 space-y-3">
          {sortedEntries.length === 0 ? (
            <li className="rounded-xl border border-dashed border-sand/80 bg-linen/60 px-4 py-6 text-sm text-offblack/60">
              No journal entries yet. Add one after your routine or whenever
              your skin feels different.
            </li>
          ) : (
            sortedEntries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-sand/70 bg-gradient-to-br from-linen/85 to-blush/30 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg font-medium text-offblack">
                      {entry.date}
                    </p>
                    <p className="mt-1 text-xs text-offblack/55">
                      {entry.skinFeel} skin • {entry.breakoutLevel} breakouts •{" "}
                      {entry.irritationLevel} irritation
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="text-xs font-semibold text-earth underline decoration-sand underline-offset-4 hover:decoration-earth"
                  >
                    Remove
                  </button>
                </div>
                {entry.notes ? (
                  <p className="mt-3 text-sm leading-relaxed text-offblack/70">
                    {entry.notes}
                  </p>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
