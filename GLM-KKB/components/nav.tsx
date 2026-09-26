"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/content/site";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "The Range", href: "/#the-range" },
  { label: "Our Story", href: "/#our-story" },
  { label: "Gifts", href: "/#gifts" },
  { label: "Visit", href: "/#visit" },
];

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding,border-color] duration-[900ms] ${
          compact
            ? "border-b border-bone/10 bg-ink/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 md:px-10">
          {/* Wordmark */}
          <a
            href="/"
            className="group flex shrink-0 items-baseline leading-none"
            aria-label={`${BRAND.fullName} — home`}
          >
            <span className="font-grotesk text-[15px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors duration-500 md:text-[17px]">
              Kloof <span className="text-tan">Ker</span>
              <span className="relative inline-block">
                f<span aria-hidden className="kerf-cut" />
              </span>
            </span>
          </a>

          {/* Centre links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="label link-draw text-bone/70 transition-colors duration-500 hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href={BRAND.mrD}
              target="_blank"
              rel="noreferrer noopener"
              className="label group hidden items-center gap-2 border border-bone/25 px-5 py-3 text-bone transition-colors duration-500 hover:border-tan hover:bg-tan hover:text-ink sm:inline-flex"
            >
              Order now
              <span className="cta-arrow">↗</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <span
                className={`block h-px bg-bone transition-all duration-500 ${open ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"}`}
              />
              <span
                className={`block h-px bg-bone transition-all duration-500 ${open ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / tablet overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pt-28 pb-10 transition-all duration-[900ms] lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <ul className="space-y-1">
          {LINKS.map((link, i) => (
            <li key={link.href} className="border-b border-bone/10">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-fluid block py-5 text-[13vw] text-bone capitalize"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <a
            href={BRAND.mrD}
            target="_blank"
            rel="noreferrer noopener"
            className="label flex items-center justify-center gap-2 bg-bone px-6 py-5 text-ink"
          >
            Order now <span className="cta-arrow">↗</span>
          </a>
          <div className="flex flex-col gap-1 pt-2">
            <a href={BRAND.whatsapp} className="label text-bone/50">
              WhatsApp {BRAND.phoneDisplay}
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="label text-bone/50"
            >
              {BRAND.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
