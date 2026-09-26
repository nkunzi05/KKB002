import Image from "next/image";
import type { BrandImage } from "@/content/site";

type Props = {
  image: BrandImage | null;
  /** Where a real asset should be dropped in. */
  assetPath?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  /** Pending panels show this so the art-direction intent is explicit. */
  pendingLabel?: string;
};

/**
 * Renders verified Kloof Kerf photography.
 *
 * When no verified photograph exists for a subject we do NOT substitute stock
 * imagery or generate a photo. Instead we render an explicitly labelled
 * REAL BRAND IMAGE REQUIRED panel naming the exact path, so a real asset can be
 * dropped into /public and appear immediately with no code changes.
 */
export function BrandImage({
  image,
  assetPath = "",
  className = "",
  sizes = "100vw",
  priority = false,
  objectPosition = "center",
  pendingLabel = "Product photography",
}: Props) {
  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink-3 p-5 ${className}`}
      aria-label={`${pendingLabel} — real brand image required`}
      role="img"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 20% 0%, rgba(179,139,98,0.20), transparent 60%), radial-gradient(90% 70% at 90% 100%, rgba(122,36,27,0.28), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grain-overlay opacity-[0.10] mix-blend-overlay"
      />
      <div className="relative flex items-start justify-between">
        <span className="label text-tan/80">Real brand image required</span>
        <span className="label text-bone/25">◆</span>
      </div>

      <div className="relative">
        <p
          className="display-fluid text-[clamp(2rem,4vw,3.4rem)] text-bone/12"
          style={{ fontStyle: "italic" }}
        >
          {pendingLabel}
        </p>
        {assetPath ? (
          <code className="mt-3 block truncate font-mono text-[10px] tracking-wide text-bone/30">
            {assetPath}
          </code>
        ) : null}
      </div>

      <p className="relative label text-bone/25">
        Drop asset in /public · no code change
      </p>
    </div>
  );
}
