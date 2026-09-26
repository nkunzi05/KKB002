import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/reviews";
import { BRAND, SOURCE_OF_TRUTH } from "@/content/site";

export const dynamic = "force-dynamic";

/**
 * Reviews are never hard-coded. Live from Google when configured, otherwise an
 * explicit empty payload plus the one publicly published rating (Mr D).
 */
export async function GET() {
  const live = await fetchGoogleReviews();

  return NextResponse.json({
    ok: true,
    ...live,
    sourceHref: live.sourceHref || SOURCE_OF_TRUTH.ratingHref,
    fallbackRating: {
      value: SOURCE_OF_TRUTH.rating,
      source: SOURCE_OF_TRUTH.ratingSource,
      href: BRAND.mrD,
    },
  });
}
