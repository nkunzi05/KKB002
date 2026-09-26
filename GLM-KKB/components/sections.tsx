import { BRAND, IMAGES } from "@/content/site";
import { BrandImage } from "@/components/brand-image";
import { Marquee, Parallax, Reveal } from "@/components/motion";

/* -------------------------------------------------------------------------- */
/*  THE BRAND                                                                 */
/* -------------------------------------------------------------------------- */

const LINES = [
  { word: "It's the cut.", meta: "Hand-sliced, never machine-stacked" },
  { word: "The spice.", meta: "Coriander, black pepper, sea salt" },
  { word: "The texture.", meta: "Dry outside, alive inside" },
  { word: "The patience.", meta: "Cured slowly, in Cape air" },
  { word: "The kerf.", meta: "The notch the blade leaves behind" },
];

export function BrandStatement() {
  return (
    <section id="the-brand" className="relative bg-ink px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="label mb-10 flex items-center gap-4 text-tan">
          <span className="h-px w-10 bg-tan/50" />
          The brand
        </Reveal>

        <h2 className="display-fluid text-bone">
          <Reveal
            as="span"
            axis="mask"
            className="block text-[clamp(2.9rem,12.5vw,12rem)] font-medium tracking-[-0.03em]"
          >
            NOT JUST BILTONG.
          </Reveal>
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* Statement lines */}
          <div className="md:col-span-7">
            {LINES.map((line, i) => (
              <Reveal
                key={line.word}
                delay={i * 90}
                className="group flex items-baseline justify-between gap-6 border-t border-bone/12 py-6 first:border-t-0 first:pt-0 md:py-7"
              >
                <span
                  className="display-fluid text-[clamp(1.9rem,5.2vw,4.4rem)] text-bone transition-colors duration-700 group-hover:text-tan"
                  style={{ fontStyle: i === 4 ? "italic" : "normal" }}
                >
                  {line.word}
                </span>
                <span className="label hidden max-w-[16rem] text-right text-bone/35 transition-colors duration-700 group-hover:text-bone/60 sm:block">
                  {line.meta}
                </span>
              </Reveal>
            ))}
          </div>

          {/* Photography */}
          <div className="flex flex-col gap-5 md:col-span-5">
            <Reveal axis="mask" className="relative aspect-[4/3] overflow-hidden bg-ink-3">
              <BrandImage
                image={IMAGES.giftCoffee}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-center"
              />
              <span className="label absolute bottom-4 left-4 text-bone/80">
                Kraft box · zebra print
              </span>
            </Reveal>

            <div className="grid grid-cols-2 gap-5">
              <Reveal
                axis="mask"
                delay={120}
                className="relative aspect-square overflow-hidden bg-ink-3"
              >
                <BrandImage image={IMAGES.giftLeopard01} sizes="20vw" />
              </Reveal>
              <Reveal
                axis="mask"
                delay={220}
                className="relative aspect-square overflow-hidden bg-ink-3"
              >
                <BrandImage image={IMAGES.boardSpread} sizes="20vw" />
              </Reveal>
            </div>

            <Reveal delay={280} className="pt-2">
              <p className="text-[15px] leading-relaxed text-bone/60">
                A specialist biltong shop on Kloof Street. Beef, and a wide run of South
                African game. Everything sliced in front of you, everything sold the day
                it&apos;s cut.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CINEMATIC PHOTO BREAK                                                     */
/* -------------------------------------------------------------------------- */

export function CinematicPhoto({
  imageKey,
  caption,
  line,
}: {
  imageKey: keyof typeof IMAGES;
  caption: string;
  line: string;
}) {
  const image = IMAGES[imageKey];

  return (
    <section className="relative h-[85svh] w-full overflow-hidden bg-ink md:h-[100svh]">
      <Parallax speed={0.09} scale={0.06} className="absolute inset-[-10%]">
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
        </div>
      </Parallax>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,17,15,0.55) 0%, rgba(17,17,15,0.15) 40%, rgba(17,17,15,0.88) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal axis="mask">
            <p
              className="display-fluid text-[clamp(2.6rem,10vw,9rem)] text-bone"
              style={{ fontStyle: "italic" }}
            >
              {line}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="label mt-6 max-w-lg text-bone/60">{caption}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  OUR STORY                                                                 */
/* -------------------------------------------------------------------------- */

const FACTS = [
  { k: "Est.", v: BRAND.established },
  { k: "Where", v: `${BRAND.centre}, ${BRAND.street}` },
  { k: "Suburb", v: `${BRAND.suburb}, ${BRAND.city}` },
  { k: "Phone", v: BRAND.phoneDisplay },
];

export function Story() {
  return (
    <section id="our-story" className="relative bg-bone px-5 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal className="label mb-10 flex items-center gap-4 text-meat">
              <span className="h-px w-10 bg-meat/40" />
              Our story
            </Reveal>

            <h2 className="display-fluid text-ink">
              <Reveal as="span" axis="mask" className="block text-[clamp(2.4rem,7.4vw,6.6rem)]">
                A small shop on
              </Reveal>
              <Reveal
                as="span"
                axis="mask"
                delay={110}
                className="block text-[clamp(2.4rem,7.4vw,6.6rem)] italic"
              >
                Kloof Street.
              </Reveal>
            </h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <Reveal delay={120}>
                <p className="text-[15px] leading-relaxed text-ink/75">
                  Kloof Kerf started the way most good biltong does — with a recipe, a
                  slicer and a stubborn opinion about how thick is thick enough. We set up
                  in Palmhof Village Centre on Kloof Street and kept the range tight enough
                  to do properly.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-[15px] leading-relaxed text-ink/75">
                  Today the board runs from beef and geelvet through kudu, springbok, eland
                  and gemsbok, with droëwors drying slowly out back and a stix rack that
                  never quite lasts the week. We also stock raw honey, artisan coffee and
                  nuts — the things that belong next to good biltong.
                </p>
              </Reveal>
              <Reveal delay={260} className="sm:col-span-2">
                <p className="text-[15px] leading-relaxed text-ink/75">
                  Everything is vacuum-sealable for travel, and we build corporate and bulk
                  orders to order. Ask for it thick cut. We&apos;ll ask you twice, just to
                  be sure.
                </p>
              </Reveal>
            </div>

            <Reveal delay={320} className="mt-12 flex flex-wrap gap-3">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="label group inline-flex items-center gap-3 bg-ink px-7 py-4 text-bone transition-colors duration-500 hover:bg-meat"
              >
                WhatsApp the shop <span className="cta-arrow">→</span>
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="label group inline-flex items-center gap-3 border border-ink/25 px-7 py-4 text-ink transition-colors duration-500 hover:border-ink"
              >
                {BRAND.instagramHandle} <span className="cta-arrow">↗</span>
              </a>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal axis="mask" className="relative aspect-[4/5] overflow-hidden bg-ink-3">
              <BrandImage image={IMAGES.gift05} sizes="(max-width: 768px) 100vw, 40vw" />
            </Reveal>

            <dl className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
              {FACTS.map((fact, i) => (
                <Reveal
                  key={fact.k}
                  delay={i * 70}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="label text-ink/45">{fact.k}</dt>
                  <dd className="font-grotesk text-sm text-ink">{fact.v}</dd>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={200} className="relative mt-8 aspect-[5/4] overflow-hidden bg-ink-3">
              <BrandImage image={IMAGES.logoMark} sizes="40vw" className="object-contain" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  VISIT                                                                     */
/* -------------------------------------------------------------------------- */

export function Visit() {
  return (
    <section id="visit" className="relative bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="label mb-12 flex items-center gap-4 text-tan">
          <span className="h-px w-10 bg-tan/50" />
          Visit
        </Reveal>

        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="display-fluid text-bone">
              <Reveal as="span" axis="mask" className="block text-[clamp(2.4rem,8vw,7rem)]">
                Come and
              </Reveal>
              <Reveal
                as="span"
                axis="mask"
                delay={100}
                className="block text-[clamp(2.4rem,8vw,7rem)] italic text-tan"
              >
                get it cut.
              </Reveal>
            </h2>

            <address className="mt-12 not-italic">
              <Reveal delay={120} className="border-t border-bone/12 py-6">
                <p className="label mb-2 text-bone/40">Address</p>
                <p className="font-grotesk text-lg leading-snug text-bone">
                  {BRAND.centre}
                  <br />
                  {BRAND.street}
                  <br />
                  {BRAND.suburb}, {BRAND.city} {BRAND.postcode}
                </p>
              </Reveal>

              <Reveal delay={180} className="border-t border-bone/12 py-6">
                <p className="label mb-2 text-bone/40">Phone / WhatsApp</p>
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="link-draw font-grotesk text-lg text-bone"
                >
                  {BRAND.phoneDisplay}
                </a>
              </Reveal>

              <Reveal delay={240} className="border-y border-bone/12 py-6">
                <p className="label mb-2 text-bone/40">Delivery</p>
                <a
                  href={BRAND.mrD}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label group inline-flex items-center gap-2 text-bone"
                >
                  Order on Mr D <span className="cta-arrow">↗</span>
                </a>
              </Reveal>
            </address>

            <Reveal delay={300} className="mt-8">
              <p className="text-[13px] leading-relaxed text-bone/45">
                Biltong is freshly sliced and best enjoyed within 2–3 days. Travelling?
                Ask for vacuum sealing.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <Reveal axis="mask" className="relative aspect-[4/3] overflow-hidden bg-ink-3">
              <BrandImage image={IMAGES.gift08} sizes="(max-width: 768px) 100vw, 50vw" />
              <span className="label absolute bottom-4 left-4 text-bone/80">
                {BRAND.centre}
              </span>
            </Reveal>

            <div className="mt-5 grid grid-cols-2 gap-5">
              <Reveal axis="mask" delay={120} className="relative aspect-square overflow-hidden bg-ink-3">
                <BrandImage image={IMAGES.gift06} sizes="25vw" />
              </Reveal>
              <Reveal axis="mask" delay={200} className="relative aspect-square overflow-hidden bg-ink-3">
                <BrandImage image={IMAGES.gift09} sizes="25vw" />
              </Reveal>
            </div>

            <Reveal delay={260} className="mt-8">
              <a
                href={BRAND.googleMaps}
                target="_blank"
                rel="noreferrer noopener"
                className="label group inline-flex items-center gap-3 border border-bone/25 px-7 py-4 text-bone transition-colors duration-500 hover:border-tan hover:text-tan"
              >
                Open in Google Maps <span className="cta-arrow">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FOOTER                                                                    */
/* -------------------------------------------------------------------------- */

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-2 px-5 pt-24 pb-10 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-bone/12 pb-12">
          <h2 className="display-fluid text-[clamp(2.2rem,9vw,8rem)] text-bone/90">
            <Reveal as="span" axis="mask" className="block">
              KLOOF KERF
            </Reveal>
          </h2>
          <Reveal delay={120} className="max-w-xs">
            <p className="text-[13px] leading-relaxed text-bone/45">
              Biltong, droëwors and South African game meats. Handmade in Gardens, Cape
              Town.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="label mb-5 text-bone/35">Shop</p>
            <ul className="space-y-3">
              {[
                ["The range", "/#the-range"],
                ["Full catalogue", "/shop"],
                ["Gifts", "/#gifts"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="link-draw text-sm text-bone/70">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-5 text-bone/35">Order</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={BRAND.mrD}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw text-sm text-bone/70"
                >
                  Mr D ↗
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw text-sm text-bone/70"
                >
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a href={`tel:${BRAND.phoneTel}`} className="link-draw text-sm text-bone/70">
                  {BRAND.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label mb-5 text-bone/35">Find us</p>
            <p className="text-sm leading-relaxed text-bone/70">
              {BRAND.centre}
              <br />
              {BRAND.street}
              <br />
              {BRAND.suburb}, {BRAND.city}
            </p>
          </div>

          <div>
            <p className="label mb-5 text-bone/35">Follow</p>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw text-sm text-bone/70"
            >
              {BRAND.instagramHandle} ↗
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-bone/12 pt-8">
          <p className="label text-bone/30">
            © {new Date().getFullYear()} {BRAND.fullName} · Est. {BRAND.established}
          </p>
          <p className="label text-bone/30">
            Photography © {BRAND.fullName} · Sources: Mr D · Instagram · Google
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  MARQUEE STRIP                                                             */
/* -------------------------------------------------------------------------- */

export function RangeMarquee() {
  return (
    <Marquee
      items={[
        "Beef biltong",
        "Geelvet",
        "Kudu",
        "Springbok",
        "Eland",
        "Gemsbok",
        "Droëwors",
        "Stix",
        "Gift boxes",
        "Vacuum sealed",
      ]}
    />
  );
}
