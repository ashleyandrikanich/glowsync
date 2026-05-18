export type WishlistItem = {
  productId: string;
  savedAt: string;
};

export const WISHLIST_KEY = "glowsync-product-wishlist-v1";

function isWishlistItem(value: unknown): value is WishlistItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.productId === "string" && typeof item.savedAt === "string";
}

export function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isWishlistItem);
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]): void {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}
