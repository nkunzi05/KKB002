"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, IMAGES } from "@/content/site";
import { BrandImage } from "@/components/brand-image";

export type CatalogueProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  animal: string | null;
  description: string;
  priceCents: number | null;
  priceLabel: string;
  unitLabel: string;
  imageKey: string;
  imageStatus: string;
  assetPath: string;
  sourceRef: string;
};

/** Derived from the verified brand photography manifest. */
const IMAGE_BY_KEY: Record<string, { src: string; alt: string }> = Object.fromEntries(
  Object.values(IMAGES).map((image) => [image.key, { src: image.src, alt: image.alt }]),
);

export function Catalogue({ products }: { products: CatalogueProduct[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [basket, setBasket] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchCat = category === "All" || product.category === category;
      const matchQuery =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        (product.animal ?? "").toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [products, category, query]);

  const basketCount = Object.values(basket).reduce((sum, n) => sum + n, 0);

  function add(slug: string) {
    setBasket((prev) => ({ ...prev, [slug]: (prev[slug] ?? 0) + 1 }));
  }
  function remove(slug: string) {
    setBasket((prev) => {
      const next = { ...prev };
      if (!next[slug]) return prev;
      next[slug] -= 1;
      if (next[slug] <= 0) delete next[slug];
      return next;
    });
  }

  const grouped = useMemo(() => {
    const map = new Map<string, string[]>();
    Object.entries(basket).forEach(([slug, qty]) => {
      const product = products.find((p) => p.slug === slug);
      if (!product) return;
      const list = map.get(product.category) ?? [];
      list.push(`${qty} × ${product.name}`);
      map.set(product.category, list);
    });
    return [...map.entries()];
  }, [basket, products]);

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-[62px] z-30 -mx-5 mb-12 border-y border-bone/10 bg-ink/90 px-5 py-4 backdrop-blur-xl md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`label border px-4 py-2.5 transition-colors duration-500 ${
                category === cat
                  ? "border-tan bg-tan text-ink"
                  : "border-bone/20 text-bone/60 hover:border-bone/50 hover:text-bone"
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-4">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the board…"
              aria-label="Search products"
              className="w-40 border border-bone/20 bg-transparent px-4 py-2.5 font-grotesk text-xs text-bone outline-none transition-colors duration-500 placeholder:text-bone/30 focus:border-tan md:w-56"
            />
            {basketCount > 0 ? (
              <span className="label border border-tan px-4 py-2.5 text-tan">
                {basketCount} selected
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Grid */}
      <ul className="grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => {
          const quantity = basket[product.slug] ?? 0;
          return (
            <li
              key={product.slug}
              id={product.slug}
              className="group relative flex scroll-mt-32 flex-col bg-ink"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                {product.imageStatus === "real" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={IMAGE_BY_KEY[product.imageKey]?.src ?? "/images/brand/gift-04.jpg"}
                    alt={IMAGE_BY_KEY[product.imageKey]?.alt ?? product.name}
                    loading={i < 6 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                ) : (
                  <BrandImage
                    image={null}
                    assetPath={product.assetPath}
                    pendingLabel={product.name}
                  />
                )}
                <span className="label absolute top-3 left-3 border border-bone/25 bg-ink/70 px-2.5 py-1.5 text-bone/80 backdrop-blur">
                  {product.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.4rem] leading-tight text-bone">
                    {product.name}
                  </h3>
                  <span className="label shrink-0 text-tan">{product.priceLabel}</span>
                </div>

                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-bone/55">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-bone/12 pt-4">
                  <span className="label text-bone/35">{product.unitLabel}</span>

                  {quantity > 0 ? (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        aria-label={`Remove one ${product.name}`}
                        className="label flex h-8 w-8 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-tan hover:text-tan"
                      >
                        −
                      </button>
                      <span className="label w-4 text-center text-tan">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => add(product.slug)}
                        aria-label={`Add one ${product.name}`}
                        className="label flex h-8 w-8 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-tan hover:text-tan"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => add(product.slug)}
                      className="label link-draw text-bone/70 transition-colors hover:text-tan"
                    >
                      Add to enquiry +
                    </button>
                  )}
                </div>

                <p className="label mt-3 text-bone/20">Source · {product.sourceRef}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-bone/45">
          Nothing on the board matches that. Try &ldquo;kudu&rdquo; or &ldquo;stix&rdquo;.
        </p>
      ) : null}

      {/* Enquiry basket */}
      {basketCount > 0 ? (
        <div className="sticky bottom-0 z-30 -mx-5 mt-12 border-t border-tan/40 bg-ink-2/95 px-5 py-6 backdrop-blur-xl md:-mx-10 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="label text-tan">Your enquiry</p>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-bone/60">
                {grouped
                  .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
                  .join(" · ")}
              </p>
            </div>
            <a
              href="/#gifts"
              className="label group inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors duration-500 hover:bg-tan"
            >
              Send to the shop <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
