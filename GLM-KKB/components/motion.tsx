"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Single rAF scroll loop shared by every scroll-linked component            */
/* -------------------------------------------------------------------------- */

const frameSubs = new Set<() => void>();
let frameRunning = false;

function tick() {
  frameSubs.forEach((fn) => fn());
  if (frameSubs.size > 0) {
    requestAnimationFrame(tick);
  } else {
    frameRunning = false;
  }
}

export function onScrollFrame(fn: () => void) {
  frameSubs.add(fn);
  if (!frameRunning) {
    frameRunning = true;
    requestAnimationFrame(tick);
  }
  return () => {
    frameSubs.delete(fn);
  };
}

/** Progress of an element through the viewport: 0 = entering, 1 = leaving. */
export function useElementProgress(
  ref: React.RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
) {
  useEffect(() => {
    let latest = 0;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const p = total > 0 ? (vh - rect.top) / total : 0;
      latest = Math.min(1, Math.max(0, p));
    };

    const unsub = onScrollFrame(() => {
      measure();
      onProgress(latest);
    });

    return unsub;
  }, [ref, onProgress]);
}

/* -------------------------------------------------------------------------- */
/*  Reveal — IntersectionObserver driven entrance                             */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  axis?: "up" | "left" | "right" | "mask";
  once?: boolean;
  threshold?: number;
  [key: string]: unknown;
};

export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  axis = "up",
  once = true,
  threshold = 0.15,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  return createElement(
    as,
    {
      ref,
      className: `reveal img-zoom ${className}`,
      "data-axis": axis,
      style: { ["--reveal-delay" as string]: `${delay}ms` },
      ...rest,
    },
    children,
  );
}

/* -------------------------------------------------------------------------- */
/*  Parallax wrapper                                                          */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  speed = 0.12,
  scale = 0,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  speed?: number;
  scale?: number;
  className?: string;
  innerClassName?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = host.firstElementChild as HTMLElement | null;
    if (!target) return;

    const unsub = onScrollFrame(() => {
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const centre = rect.top + rect.height / 2 - vh / 2;
      const shift = -centre * speed;
      const zoom = 1 + scale * (1 - Math.min(1, Math.abs(centre) / vh));
      target.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${zoom.toFixed(4)})`;
    });

    return unsub;
  }, [speed, scale]);

  return (
    <div ref={hostRef} className={className}>
      <div className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scroll progress bar                                                       */
/* -------------------------------------------------------------------------- */

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onScrollFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
    });
    return unsub;
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
    >
      <div
        ref={barRef}
        className="h-px origin-left bg-meat"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cursor — a quiet tan ring that widens over interactive elements           */
/* -------------------------------------------------------------------------- */

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let target = 1;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const el = e.target as HTMLElement | null;
      target = el?.closest("a,button,[data-cursor]") ? 2.4 : 1;
    };

    const unsub = onScrollFrame(() => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (target - scale) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale.toFixed(3)})`;
    });

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      unsub();
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-tan"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 h-8 w-8 rounded-full border border-tan/50 mix-blend-difference"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-5 select-none">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="label flex shrink-0 items-center gap-8 px-8 text-bone/55"
          >
            {item}
            <span className="text-meat-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
