export type SkinJournalEntry = {
  id: string;
  date: string;
  skinFeel: string;
  breakoutLevel: string;
  irritationLevel: string;
  notes: string;
};

export const SKIN_JOURNAL_KEY = "glowsync-skin-journal-v1";

function newEntryId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function isSkinJournalEntry(value: unknown): value is SkinJournalEntry {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.date === "string" &&
    typeof item.skinFeel === "string" &&
    typeof item.breakoutLevel === "string" &&
    typeof item.irritationLevel === "string" &&
    typeof item.notes === "string"
  );
}

export function loadSkinJournalEntries(): SkinJournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SKIN_JOURNAL_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSkinJournalEntry);
  } catch {
    return [];
  }
}

export function saveSkinJournalEntries(entries: SkinJournalEntry[]): void {
  localStorage.setItem(SKIN_JOURNAL_KEY, JSON.stringify(entries));
}

export function createSkinJournalEntry(
  entry: Omit<SkinJournalEntry, "id">
): SkinJournalEntry {
  return { id: newEntryId(), ...entry };
}
