"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PRODUCT_CATALOG,
  searchCatalog,
  type CatalogProduct,
} from "@/src/lib/product-catalog";
import { loadWishlist, saveWishlist, type WishlistItem } from "@/src/lib/wishlist";

const inputClass =
  "w-full rounded-xl border border-sand/90 bg-linen/65 px-4 py-2.5 text-offblack shadow-sm outline-none transition placeholder:text-offblack/35 hover:border-blossom/35 hover:bg-linen/85 focus:border-sage focus:ring-2 focus:ring-sage/25";

function label(product: CatalogProduct): string {
  return `${product.brand} ${product.name}`;
}

export function WishlistClient() {
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(loadWishlist());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveWishlist(items);
  }, [items, hydrated]);

  const savedProducts = useMemo(
    () =>
      items
        .map((item) => ({
          savedAt: item.savedAt,
          product: PRODUCT_CATALOG.find((product) => product.id === item.productId),
        }))
        .filter(
          (item): item is { savedAt: string; product: CatalogProduct } =>
            Boolean(item.product)
        ),
    [items]
  );

  const results = useMemo(() => {
    if (query.trim().length === 0) return PRODUCT_CATALOG.slice(0, 8);
    return searchCatalog(query, 8);
  }, [query]);

  function saveProduct(product: CatalogProduct) {
    setItems((current) => {
      if (current.some((item) => item.productId === product.id)) return current;
      return [{ productId: product.id, savedAt: new Date().toISOString() }, ...current];
    });
  }

  function removeProduct(productId: string) {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <section className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/30 p-5 shadow-sm">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Find products
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-offblack/65">
          Search by product, brand, active, or retailer, then save products you
          want to research or try later.
        </p>
        <label className="mt-5 block space-y-2">
          <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-earth/80">
            Search catalog
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={inputClass}
            placeholder="Try retinol, CeraVe, SPF, Ulta..."
          />
        </label>

        <ul className="mt-5 space-y-3">
          {results.map((product) => {
            const saved = items.some((item) => item.productId === product.id);
            return (
              <li
                key={product.id}
                className="rounded-xl border border-sand/70 bg-linen/65 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-offblack">{label(product)}</p>
                    <p className="mt-1 text-xs text-offblack/55">
                      {product.keyActives.slice(0, 3).join(" • ")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => saveProduct(product)}
                    disabled={saved}
                    className="rounded-lg bg-earth px-3 py-1.5 text-xs font-semibold text-linen transition hover:bg-offblack disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-sand/70 bg-linen/60 p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
              Wishlist
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-offblack">
              Saved products
            </h2>
          </div>
          <p className="text-sm text-offblack/55">
            {savedProducts.length} saved
          </p>
        </div>

        <ul className="mt-5 space-y-3">
          {savedProducts.length === 0 ? (
            <li className="rounded-xl border border-dashed border-sand/80 bg-linen/60 px-4 py-6 text-sm text-offblack/60">
              No saved products yet. Search the catalog and save anything you
              want to compare, research, or try later.
            </li>
          ) : (
            savedProducts.map(({ product, savedAt }) => (
              <li
                key={product.id}
                className="rounded-xl border border-sand/70 bg-gradient-to-br from-linen/85 to-blush/25 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-offblack">{label(product)}</p>
                    <p className="mt-1 text-xs text-offblack/55">
                      Saved {new Date(savedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="text-xs font-semibold text-earth underline decoration-sand underline-offset-4 hover:decoration-earth"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-offblack/65">
                  {product.keyActives.join(", ")}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
