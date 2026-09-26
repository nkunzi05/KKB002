import { sql } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { CATALOGUE } from "@/content/site";

let seeded = false;

/**
 * Idempotently pushes the confirmed Kloof Kerf catalogue into Postgres.
 * Safe to call on every request: it upserts by slug and never duplicates.
 */
export async function ensureSeed(): Promise<void> {
  if (seeded) return;

  await db
    .insert(products)
    .values(
      CATALOGUE.map((item) => ({
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
        featured: item.featured,
        sortOrder: item.sortOrder,
      })),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        name: sql`excluded.name`,
        category: sql`excluded.category`,
        animal: sql`excluded.animal`,
        description: sql`excluded.description`,
        priceCents: sql`excluded.price_cents`,
        priceLabel: sql`excluded.price_label`,
        unitLabel: sql`excluded.unit_label`,
        imageKey: sql`excluded.image_key`,
        imageStatus: sql`excluded.image_status`,
        assetPath: sql`excluded.asset_path`,
        sourceRef: sql`excluded.source_ref`,
        featured: sql`excluded.featured`,
        sortOrder: sql`excluded.sort_order`,
      },
    });

  seeded = true;
}
