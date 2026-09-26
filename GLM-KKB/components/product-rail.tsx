"use client";

import { useEffect, useRef, useState } from "react";
import { RAIL, type RailProduct } from "@/content/site";
import { BrandImage } from "@/components/brand-image";
import { onScrollFrame } from "@/components/motion";

/* ------------------------------------------------------------------ panel */

function Panel({
  product,
  className = "",
  sizes = "60vw",
}: {
  product: RailProduct;
  className?: string;
  sizes?: string;
}) {
  return (
    <article
      className={`group flex h-full shrink-0 flex-col justify-center ${className}`}
      data-cursor
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm italic text-tan">{product.index}</span>
        <span className="label text-bone/40">{product.kicker}</span>
      </div>

      <h3 className="display-fluid mt-4 text-[clamp(2.6rem,6.4vw,6rem)] text-bone">
        {product.name}
      </h3>

      <div className="mt-7 grid gap-6 sm:grid-cols-[1.35fr_1fr] sm:items-end">
        <div className="relative aspect-[16/11] overflow-hidden bg-ink-3">
          <BrandImage
            image={product.image}
            assetPath={product.assetPath}
            pendingLabel={product.name}
            sizes={sizes}
          />
        </div>

        <div className="flex h-full flex-col justify-between gap-6">
          <p className="max-w-sm text-[14px] leading-relaxed text-bone/65">
            {product.blurb}
          </p>

          <div className="hairline space-y-3 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-bone/40">Price</span>
              <span className="font-grotesk text-sm text-bone">{product.priceLabel}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-bone/40">Format</span>
              <span className="font-grotesk text-sm text-bone/70">{product.unitLabel}</span>
            </div>
          </div>

          <a
            href={`/shop#${product.slug}`}
            className="label group/link inline-flex items-center gap-3 border border-bone/25 px-5 py-3.5 text-bone transition-colors duration-500 hover:border-tan hover:bg-tan hover:text-ink"
          >
            View product <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ intro */

function IntroPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full shrink-0 flex-col justify-center ${className}`}>
      <span className="label text-tan">The range</span>
      <h3 className="display-fluid mt-5 text-[clamp(3rem,10vw,9.5rem)] text-bone">
        THE KERF.
      </h3>
      <p className="mt-8 max-w-md text-[15px] leading-relaxed text-bone/60">
        A specialist biltong shop with a deliberately broad board — beef and geelvet, then
        kudu, springbok, eland and gemsbok. Plus droëwors in three meats, a rack of stix,
        and gift boxes built to order.
      </p>
      <p className="label mt-10 flex items-center gap-3 text-bone/35">
        Scroll
        <span className="h-px w-16 bg-bone/25" />
        to move through the board
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------- rail */

export function ProductRail() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const unsub = onScrollFrame(() => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track || distance <= 0) return;

      const scrollable = wrap.offsetHeight - window.innerHeight;
      const p =
        scrollable > 0 ? Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / scrollable)) : 0;

      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      if (countRef.current) {
        const shown = Math.min(RAIL.length, Math.floor(p * (RAIL.length - 1)) + 1);
        countRef.current.textContent = String(shown).padStart(2, "0");
      }
    });
    return unsub;
  }, [distance]);

  const total = RAIL.length + 1;

  return (
    <section id="the-range" className="relative bg-ink">
      {/* ---------------------------------------------------- desktop rail */}
      <div className="hidden lg:block">
        <div ref={wrapRef} style={{ height: `calc(100svh + ${distance}px)` }}>
          <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
            {/* persistent header */}
            <div className="flex shrink-0 items-center justify-between px-10 pt-28 pb-4">
              <span className="label text-bone/35">The board · 08 cuts</span>
              <span className="font-display text-sm text-bone/45">
                <span ref={countRef}>01</span>
                <span className="text-bone/25"> / {String(RAIL.length).padStart(2, "0")}</span>
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              <div
                ref={trackRef}
                className="flex h-full will-change-transform"
                style={{ transition: "transform 90ms linear" }}
              >
                <IntroPanel className="w-[46vw] px-10" />
                {RAIL.map((product) => (
                  <Panel
                    key={product.slug}
                    product={product}
                    className="w-[72vw] px-10"
                    sizes="52vw"
                  />
                ))}
                <div className="w-[10vw] shrink-0" />
              </div>
            </div>

            <div className="shrink-0 px-10 pb-8">
              <div className="h-px w-full bg-bone/12">
                <div ref={barRef} className="h-px origin-left bg-tan" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------- mobile swipe */}
      <div className="lg:hidden">
        <div className="px-5 pt-24 pb-8">
          <IntroPanel className="w-full" />
        </div>

        <div className="no-bar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10">
          {RAIL.map((product) => (
            <div key={product.slug} className="w-[84vw] shrink-0 snap-center">
              <Panel product={product} className="w-full" sizes="84vw" />
            </div>
          ))}
        </div>

        <p className="label px-5 pb-16 text-bone/30">Swipe · momentum scroll</p>
      </div>

      {/* a11y list for the full confirmed range */}
      <ul className="sr-only">
        {RAIL.map((p) => (
          <li key={p.slug}>
            {p.name} — {p.blurb} {p.priceLabel}
          </li>
        ))}
      </ul>
    </section>
  );
}
