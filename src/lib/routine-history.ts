export type RoutineUsageEvent = {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  slot: "am" | "pm" | "both";
  usedDate: string;
  loggedAt: string;
};

const ROUTINE_HISTORY_KEY = "glowsync-routine-usage-history-v1";

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function isUsageEvent(value: unknown): value is RoutineUsageEvent {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.productId === "string" &&
    typeof item.productName === "string" &&
    typeof item.brand === "string" &&
    (item.slot === "am" || item.slot === "pm" || item.slot === "both") &&
    typeof item.usedDate === "string" &&
    typeof item.loggedAt === "string"
  );
}

export function loadRoutineUsageHistory(): RoutineUsageEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ROUTINE_HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isUsageEvent);
  } catch {
    return [];
  }
}

export function saveRoutineUsageHistory(events: RoutineUsageEvent[]): void {
  localStorage.setItem(ROUTINE_HISTORY_KEY, JSON.stringify(events));
}

export function logRoutineUsage(
  event: Omit<RoutineUsageEvent, "id" | "loggedAt">
): void {
  if (typeof window === "undefined") return;
  const current = loadRoutineUsageHistory();
  const duplicate = current.some(
    (item) =>
      item.productId === event.productId && item.usedDate === event.usedDate
  );
  if (duplicate) return;

  saveRoutineUsageHistory([
    {
      ...event,
      id: newEventId(),
      loggedAt: new Date().toISOString(),
    },
    ...current,
  ]);
}
