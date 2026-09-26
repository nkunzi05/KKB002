"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, IMAGES } from "@/content/site";
import { onScrollFrame } from "@/components/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  // Scroll-linked: image scales slowly, copy drifts at a different speed.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const unsub = onScrollFrame(() => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, y / vh));

      if (imgWrapRef.current) {
        imgWrapRef.current.style.transform = `scale(${(1 + p * 0.16).toFixed(4)}) translateY(${(p * 6).toFixed(2)}%)`;
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${(p * -90).toFixed(1)}px, 0)`;
        copyRef.current.style.opacity = `${Math.max(0, 1 - p * 1.5).toFixed(3)}`;
      }
      if (sectionRef.current) {
        sectionRef.current.style.opacity = `${Math.max(0, 1 - p * 0.55).toFixed(3)}`;
      }
    });

    return unsub;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Kloof Kerf Biltong"
    >
      {/* Photograph, edge to edge */}
      <div ref={imgWrapRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 42%" }}
          />
        </div>
      </div>

      {/* Cinematic scrims */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,15,0.95) 0%, rgba(17,17,15,0.62) 26%, rgba(17,17,15,0.18) 55%, rgba(17,17,15,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 grain-overlay opacity-[0.09] mix-blend-overlay"
      />

      {/* Copy */}
      <div
        ref={copyRef}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-28 md:px-10 md:pb-24"
      >
        <p
          className="label anim-fade-up mb-6 text-tan/90"
          style={{ animationDelay: "1.85s" }}
        >
          Gardens · Cape Town · Est. {BRAND.established}
        </p>

        <h1 className="display-fluid text-bone">
          <span
            className="anim-fade-up block text-[clamp(3.4rem,13.5vw,13rem)] font-medium"
            style={{ animationDelay: "1.7s" }}
          >
            KLOOF KERF
          </span>
          <span
            className="anim-fade-up mt-1 block text-[clamp(1.6rem,5.6vw,5.2rem)] italic text-bone/92 md:mt-2"
            style={{ animationDelay: "1.9s" }}
          >
            Biltong, cut different.
          </span>
        </h1>

        <div className="mt-9 flex flex-col gap-8 border-t border-bone/15 pt-7 md:flex-row md:items-end md:justify-between">
          <p
            className="anim-fade-up max-w-md text-[15px] leading-relaxed text-bone/75 md:text-base"
            style={{ animationDelay: "2.05s" }}
          >
            Handcrafted biltong, droëwors and South African game meats from the heart of
            Cape Town.
          </p>

          <div
            className="anim-fade-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: "2.15s" }}
          >
            <a
              href="/shop"
              className="label group inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors duration-500 hover:bg-tan"
            >
              Shop the kerf <span className="cta-arrow">→</span>
            </a>
            <a
              href="#the-brand"
              className="label group inline-flex items-center gap-3 border border-bone/30 px-7 py-4 text-bone transition-colors duration-500 hover:border-bone hover:bg-bone/5"
            >
              Explore <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="anim-fade absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        style={{ animationDelay: "2.4s" }}
      >
        <div className="scroll-hint flex flex-col items-center gap-3">
          <span className="label text-bone/45">Scroll to explore</span>
          <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
            <span className="absolute inset-x-0 top-0 block h-1/2 bg-tan" />
          </span>
        </div>
      </div>

      {/* Load sequence curtain */}
      {!mounted ? (
        <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ink anim-curtain">
          <div className="anim-fade text-center" style={{ animationDelay: "0.25s" }}>
            <p className="font-grotesk text-[13px] font-semibold tracking-[0.42em] text-bone uppercase">
              Kloo<span className="text-meat-2">f</span> Kerf
            </p>
            <p className="label anim-fade mt-4 text-bone/40" style={{ animationDelay: "0.6s" }}>
              Biltong · Est. {BRAND.established}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
