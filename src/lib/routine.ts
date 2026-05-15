export type RoutineSlot = "am" | "pm" | "both";

export type RoutineProduct = {
  id: string;
  name: string;
  brand: string;
  notes: string;
  slot: RoutineSlot;
};

export const ROUTINE_STORAGE_KEY = "glowsync-routine-products-v1";

function isRoutineSlot(x: unknown): x is RoutineSlot {
  return x === "am" || x === "pm" || x === "both";
}

function isRoutineProduct(x: unknown): x is RoutineProduct {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.brand === "string" &&
    typeof o.notes === "string" &&
    isRoutineSlot(o.slot)
  );
}

export function loadRoutineProducts(): RoutineProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ROUTINE_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRoutineProduct);
  } catch {
    return [];
  }
}

export function saveRoutineProducts(products: RoutineProduct[]): void {
  localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(products));
}

export function newProductId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Remove saved routine from localStorage (browser only). */
export function clearRoutineStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ROUTINE_STORAGE_KEY);
}

/**
 * Parse exported JSON into routine rows. Returns null if JSON is invalid or
 * nothing looks like a routine product list.
 */
export function parseRoutineProductsJson(text: string): RoutineProduct[] | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!Array.isArray(parsed)) return null;
    const arr = parsed.filter(isRoutineProduct);
    if (arr.length === 0) return null;
    return arr;
  } catch {
    return null;
  }
}
