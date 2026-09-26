import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { giftEnquiries, type EnquiryItem } from "@/db/schema";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set(["gift-boxes", "corporate", "custom"]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  enquiryType?: unknown;
  message?: unknown;
  items?: unknown;
};

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 160);
  const phone = str(body.phone, 48);
  const company = str(body.company, 160);
  const message = str(body.message, 4000);
  const enquiryTypeRaw = str(body.enquiryType, 48);
  const enquiryType = ALLOWED_TYPES.has(enquiryTypeRaw) ? enquiryTypeRaw : "gift-boxes";

  if (!name) {
    return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please add a valid email address." },
      { status: 400 },
    );
  }

  let items: EnquiryItem[] = [];
  if (Array.isArray(body.items)) {
    items = body.items
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .map((item) => ({
        slug: str(item.slug, 96),
        name: str(item.name, 120),
        quantity: Number.isFinite(Number(item.quantity)) ? Math.max(1, Number(item.quantity)) : 1,
      }))
      .filter((item) => item.slug.length > 0)
      .slice(0, 60);
  }

  try {
    const [row] = await db
      .insert(giftEnquiries)
      .values({ name, email, phone, company, enquiryType, message, items })
      .returning({ id: giftEnquiries.id, createdAt: giftEnquiries.createdAt });

    return NextResponse.json({ ok: true, enquiry: row }, { status: 201 });
  } catch (error) {
    console.error("[api/gift-enquiries]", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your enquiry. Please WhatsApp the shop." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const rows = await db
      .select({
        id: giftEnquiries.id,
        name: giftEnquiries.name,
        enquiryType: giftEnquiries.enquiryType,
        company: giftEnquiries.company,
        createdAt: giftEnquiries.createdAt,
      })
      .from(giftEnquiries)
      .orderBy(desc(giftEnquiries.createdAt))
      .limit(50);

    return NextResponse.json({ ok: true, count: rows.length, enquiries: rows });
  } catch (error) {
    console.error("[api/gift-enquiries GET]", error);
    return NextResponse.json({ ok: false, error: "Could not load enquiries." }, { status: 500 });
  }
}
