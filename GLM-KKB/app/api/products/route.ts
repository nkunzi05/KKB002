import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeed } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeed();
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    return NextResponse.json({ ok: true, count: rows.length, products: rows });
  } catch (error) {
    console.error("[api/products]", error);
    return NextResponse.json(
      { ok: false, error: "Could not load the catalogue." },
      { status: 500 },
    );
  }
}
