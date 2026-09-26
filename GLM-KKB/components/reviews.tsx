import { BRAND } from "@/content/site";
import { SOURCE_OF_TRUTH } from "@/content/site";
import type { ReviewsPayload } from "@/lib/reviews";
import { Reveal } from "@/components/motion";

export function Reviews({ payload }: { payload: ReviewsPayload }) {
  const hasLive = payload.status === "live" && payload.reviews.length > 0;

  return (
    <section id="reviews" className="relative bg-bone px-5 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="label mb-12 flex items-center gap-4 text-meat">
          <span className="h-px w-10 bg-meat/40" />
          Social proof
        </Reveal>

        <h2 className="display-fluid text-ink">
          <Reveal as="span" axis="mask" className="block text-[clamp(2.2rem,7.8vw,7rem)]">
            DON&apos;T TAKE OUR
          </Reveal>
          <Reveal
            as="span"
            axis="mask"
            delay={110}
            className="block text-[clamp(2.2rem,7.8vw,7rem)] italic"
          >
            WORD FOR IT.
          </Reveal>
        </h2>

        {/* Sourced rating — attributed, never manufactured */}
        <Reveal delay={160} className="mt-14 grid gap-8 border-t border-ink/15 pt-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none text-ink">
              {SOURCE_OF_TRUTH.rating.toFixed(1)}
            </p>
            <p className="label mt-4 text-ink/45">
              Rating · {SOURCE_OF_TRUTH.ratingSource} listing
            </p>
            <a
              href={SOURCE_OF_TRUTH.ratingHref}
              target="_blank"
              rel="noreferrer noopener"
              className="label link-draw mt-3 inline-block text-meat"
            >
              View the listing ↗
            </a>
          </div>

          <div className="sm:col-span-2">
            <p className="max-w-xl text-[15px] leading-relaxed text-ink/70">
              We don&apos;t write our own reviews. Everything below is pulled live from
              Google when the Places integration is connected — and nothing is added
              here by hand.
            </p>

            {hasLive ? (
              <ul className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2">
                {payload.reviews.slice(0, 6).map((review, i) => (
                  <li key={`${review.author}-${i}`} className="bg-bone p-6">
                    {review.rating ? (
                      <p className="font-display text-sm text-meat">
                        {"★".repeat(Math.round(review.rating))}
                      </p>
                    ) : null}
                    <blockquote className="mt-4 font-display text-[1.05rem] leading-snug text-ink italic">
                      “{review.text.length > 260 ? `${review.text.slice(0, 260)}…` : review.text}”
                    </blockquote>
                    <p className="label mt-5 text-ink/40">
                      {review.author}
                      {review.relativeTime ? ` · ${review.relativeTime}` : ""}
                    </p>
                    <p className="label mt-1 text-ink/25">Google review</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 border border-ink/20 bg-ink/[0.03] p-8">
                <p className="label text-meat">Live Google reviews</p>
                <p className="display-fluid mt-5 text-[clamp(1.5rem,2.6vw,2.2rem)] text-ink">
                  {payload.status === "unconfigured"
                    ? "Connected module, awaiting key."
                    : "Google is not responding right now."}
                </p>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/60">
                  Rather than paste quotes in, we leave this space for the real thing.
                  Add <code className="font-mono text-xs">GOOGLE_PLACES_API_KEY</code> and{" "}
                  <code className="font-mono text-xs">GOOGLE_PLACE_ID</code> and verified
                  customer reviews render here automatically.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={BRAND.googleReviews}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label group inline-flex items-center gap-3 bg-ink px-7 py-4 text-bone transition-colors duration-500 hover:bg-meat"
                  >
                    Read reviews on Google <span className="cta-arrow">↗</span>
                  </a>
                  <a
                    href={BRAND.mrD}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label group inline-flex items-center gap-3 border border-ink/25 px-7 py-4 text-ink transition-colors duration-500 hover:border-ink"
                  >
                    See the Mr D listing <span className="cta-arrow">↗</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
