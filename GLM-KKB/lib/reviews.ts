/**
 * Social proof, handled honestly.
 *
 * The brief is explicit: do not fabricate reviews and do not manufacture a
 * rating. So this module only ever returns text that came back live from
 * Google. If `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` are configured we hit
 * the Places API; otherwise we return an empty payload and the UI renders a
 * graceful "live reviews" state with a link through to Google.
 */

export type LiveReview = {
  author: string;
  text: string;
  rating: number | null;
  relativeTime: string | null;
  authorUrl: string | null;
};

export type ReviewsPayload = {
  status: "live" | "unconfigured" | "error";
  reviews: LiveReview[];
  rating: number | null;
  total: number | null;
  source: string;
  sourceHref: string;
};

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";

type PlacesPlace = {
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    authorAttribution?: { displayName?: string; uri?: string };
    rating?: number;
    relativePublishStatusDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
  }>;
};

export async function fetchGoogleReviews(): Promise<ReviewsPayload> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return {
      status: "unconfigured",
      reviews: [],
      rating: null,
      total: null,
      source: "Google Reviews",
      sourceHref: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? "",
    };
  }

  try {
    const res = await fetch(`${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews.rating,reviews.text,reviews.originalText,reviews.relativePublishStatusDescription,reviews.authorAttribution",
      },
      next: { revalidate: 900 },
    });

    if (!res.ok) throw new Error(`Places API responded ${res.status}`);

    const data = (await res.json()) as PlacesPlace;

    const reviews: LiveReview[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        rating: typeof r.rating === "number" ? r.rating : null,
        relativeTime: r.relativePublishStatusDescription ?? null,
        authorUrl: r.authorAttribution?.uri ?? null,
      }))
      .filter((r) => r.text.length > 0);

    return {
      status: "live",
      reviews,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      source: "Google Reviews",
      sourceHref: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? "",
    };
  } catch {
    return {
      status: "error",
      reviews: [],
      rating: null,
      total: null,
      source: "Google Reviews",
      sourceHref: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? "",
    };
  }
}
