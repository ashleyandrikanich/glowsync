"use client";

import { useMemo, useState } from "react";
import { PRODUCT_CATALOG, type CatalogProduct } from "@/src/lib/product-catalog";

const selectClass =
  "w-full rounded-xl border border-sand/90 bg-linen/75 px-4 py-2.5 text-offblack shadow-sm outline-none transition hover:border-blossom/35 hover:bg-linen/90 focus:border-sage focus:ring-2 focus:ring-sage/25";

function productLabel(product: CatalogProduct): string {
  return `${product.brand} - ${product.name}`;
}

function retailerLabel(product: CatalogProduct): string {
  if (!product.retailers?.length) return "Not listed";
  return product.retailers.map((item) => item.toUpperCase()).join(", ");
}

function productRole(product: CatalogProduct): string {
  const text = [...product.keyActives, ...product.mainIngredients]
    .join(" ")
    .toLowerCase();
  if (text.includes("spf") || text.includes("sunscreen") || text.includes("zinc")) {
    return "Sun protection";
  }
  if (text.includes("retinol") || text.includes("tretinoin")) return "Retinoid";
  if (text.includes("glycolic") || text.includes("lactic")) return "Exfoliant";
  if (text.includes("salicylic")) return "BHA treatment";
  if (text.includes("vitamin c") || text.includes("ascorbic")) {
    return "Antioxidant";
  }
  if (text.includes("ceramide") || text.includes("moisturizer")) {
    return "Barrier support";
  }
  return "General care";
}

export function ProductCompareClient() {
  const sortedProducts = useMemo(
    () => [...PRODUCT_CATALOG].sort((a, b) => productLabel(a).localeCompare(productLabel(b))),
    []
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([
    sortedProducts[0]?.id ?? "",
    sortedProducts[1]?.id ?? "",
    sortedProducts[2]?.id ?? "",
  ]);

  const selectedProducts = selectedIds
    .map((id) => PRODUCT_CATALOG.find((product) => product.id === id))
    .filter((product): product is CatalogProduct => Boolean(product));

  function updateSelection(index: number, id: string) {
    setSelectedIds((current) =>
      current.map((selectedId, currentIndex) =>
        currentIndex === index ? id : selectedId
      )
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/30 p-5 shadow-sm">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Choose products
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-offblack/65">
          Compare up to three catalog products by likely role, key actives,
          main ingredients, and listed retailers.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <label key={index} className="space-y-2">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-earth/80">
                Product {index + 1}
              </span>
              <select
                value={selectedIds[index]}
                onChange={(e) => updateSelection(index, e.target.value)}
                className={selectClass}
              >
                {sortedProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {productLabel(product)}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {selectedProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-sand/70 bg-linen/65 p-5 shadow-sm"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
              {product.brand}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-offblack">
              {product.name}
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-offblack">Likely role</dt>
                <dd className="mt-1 text-offblack/65">{productRole(product)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-offblack">Key actives</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {product.keyActives.map((active) => (
                    <span
                      key={active}
                      className="rounded-full border border-dawn/65 bg-blush/50 px-2.5 py-1 text-xs text-offblack/75"
                    >
                      {active}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-offblack">Main ingredients</dt>
                <dd className="mt-1 text-offblack/65">
                  {product.mainIngredients.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-offblack">Retailers</dt>
                <dd className="mt-1 text-offblack/65">{retailerLabel(product)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
