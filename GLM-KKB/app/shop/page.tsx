import type { Metadata } from "next";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeed } from "@/db/seed";
import { BRAND, CATALOGUE } from "@/content/site";
import { Nav } from "@/components/nav";
import { Cursor, ScrollProgress } from "@/components/motion";
import { Catalogue, type CatalogueProduct } from "@/components/catalogue";
import { SiteFooter, RangeMarquee } from "@/components/sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Shop The Kerf — ${BRAND.fullName}`,
  description:
    "The full Kloof Kerf board: beef, geelvet, kudu, springbok, eland and gemsbok biltong, droëwors, stix, gift boxes and deli goods. Prices as published on our Mr D store.",
};

async function loadProducts(): Promise<CatalogueProduct[]> {
  try {
    await ensureSeed();
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length === 0) throw new Error("empty");
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      category: row.category,
      animal: row.animal,
      description: row.description,
      priceCents: row.priceCents,
      priceLabel: row.priceLabel,
      unitLabel: row.unitLabel,
      imageKey: row.imageKey,
      imageStatus: row.imageStatus,
      assetPath: row.assetPath,
      sourceRef: row.sourceRef,
    }));
  } catch {
    // Static fallback so the shop always renders, even without a database.
    return CATALOGUE.map((item, index) => ({
      id: index + 1,
      slug: item.slug,
      name: item.name,
      category: item.category,
      animal: item.animal,
      description: item.description,
      priceCents: item.priceCents,
      priceLabel: item.priceLabel,
      unitLabel: item.unitLabel,
      imageKey: item.imageKey,
      imageStatus: item.imageStatus,
      assetPath: item.assetPath,
      sourceRef: item.sourceRef,
    }));
  }
}

export default async function ShopPage() {
  const catalogue = await loadProducts();
  const priced = catalogue.filter((item) => item.priceCents !== null).length;

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />

      <main className="bg-ink">
        {/* Masthead */}
        <section className="relative px-5 pt-40 pb-14 md:px-10 md:pt-48 md:pb-20">
          <div className="mx-auto max-w-[1600px]">
            <p className="label mb-8 flex items-center gap-4 text-tan">
              <span className="h-px w-10 bg-tan/50" />
              Shop the kerf
            </p>

            <h1 className="display-fluid text-bone">
              <span className="block text-[clamp(2.8rem,12vw,11rem)]">THE FULL</span>
              <span className="block text-[clamp(2.8rem,12vw,11rem)] italic text-tan">
                BOARD.
              </span>
            </h1>

            <div className="mt-12 grid gap-10 border-t border-bone/12 pt-8 md:grid-cols-3">
              <p className="max-w-md text-[15px] leading-relaxed text-bone/65">
                Everything we cut, dry and pack on Kloof Street. Biltong is freshly sliced
                and best enjoyed within 2–3 days — vacuum sealing available if you&apos;re
                travelling.
              </p>

              <div>
                <p className="label mb-3 text-bone/35">Catalogue</p>
                <p className="font-grotesk text-sm text-bone">
                  {catalogue.length} products · {priced} with published prices
                </p>
              </div>

              <div>
                <p className="label mb-3 text-bone/35">Pricing</p>
                <p className="text-[13px] leading-relaxed text-bone/55">
                  We only publish prices that are live on our{" "}
                  <a
                    href={BRAND.mrD}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-draw text-tan"
                  >
                    Mr D store ↗
                  </a>
                  . Everything else is sold by weight in store.
                </p>
              </div>
            </div>
          </div>
        </section>

        <RangeMarquee />

        <section className="px-5 pt-14 pb-24 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <Catalogue products={catalogue} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
