import { BRAND, IMAGES, PHOTO_WALL } from "@/content/site";
import { BrandImage } from "@/components/brand-image";
import { Reveal } from "@/components/motion";

export function InstagramWall() {
  return (
    <section id="instagram" className="relative bg-ink px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal className="label mb-8 flex items-center gap-4 text-tan">
              <span className="h-px w-10 bg-tan/50" />
              Instagram
            </Reveal>

            <h2 className="display-fluid text-bone">
              <Reveal as="span" axis="mask" className="block text-[clamp(2.6rem,9vw,8rem)]">
                FOLLOW THE
              </Reveal>
              <Reveal
                as="span"
                axis="mask"
                delay={110}
                className="block text-[clamp(2.6rem,9vw,8rem)] italic text-tan"
              >
                KERF.
              </Reveal>
            </h2>
          </div>

          <Reveal delay={160} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-bone/60">
              Real boxes, real boards, real cuts — straight off the counter on Kloof
              Street. No studio, no styling tricks.
            </p>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="label group mt-7 inline-flex items-center gap-3 border border-bone/25 px-6 py-4 text-bone transition-colors duration-500 hover:border-tan hover:bg-tan hover:text-ink"
            >
              {BRAND.instagramHandle} <span className="cta-arrow">↗</span>
            </a>
          </Reveal>
        </div>

        {/* Editorial image wall */}
        <div className="mt-16 grid auto-rows-[22vw] grid-cols-2 gap-3 md:auto-rows-[15vw] md:grid-cols-4 md:gap-4 lg:grid-cols-6">
          {PHOTO_WALL.map((key, i) => {
            const image = IMAGES[key];
            // Deliberately uneven rhythm — a few tiles pull double width/height.
            const big = i === 1 || i === 5;
            const tall = i === 3 || i === 7;

            return (
              <Reveal
                key={key}
                axis="mask"
                delay={(i % 3) * 90}
                className={`group relative overflow-hidden bg-ink-3 ${
                  big ? "col-span-2 row-span-2" : ""
                } ${tall ? "row-span-2" : ""}`}
                data-cursor
              >
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute inset-0 block"
                >
                  <BrandImage
                    image={image}
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/35" />
                  <span className="label absolute bottom-3 left-3 translate-y-2 text-bone opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    {image.caption}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-bone/30">
            Imagery © {BRAND.fullName} · sourced from the brand&apos;s own listings
          </p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="label link-draw text-bone/60"
          >
            See the full feed ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
