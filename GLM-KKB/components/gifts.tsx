import { BRAND, IMAGES } from "@/content/site";
import { BrandImage } from "@/components/brand-image";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/motion";

const SERVICES = [
  {
    title: "Gift boxes",
    body: "Leopard-print and kraft boxes, built by hand with whatever you choose from the board.",
  },
  {
    title: "Corporate gifts",
    body: "Bulk and branded orders for clients and teams. Customisable contents, welcome volume.",
  },
  {
    title: "Custom orders",
    body: "Choose your meat, personalise the contents, and add vacuum sealing for travel.",
  },
];

export function Gifts() {
  return (
    <section id="gifts" className="relative bg-ink-2 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="label mb-12 flex items-center gap-4 text-tan">
          <span className="h-px w-10 bg-tan/50" />
          Gifts
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left — headline + services + photography */}
          <div className="lg:col-span-6">
            <h2 className="display-fluid text-bone">
              <Reveal as="span" axis="mask" className="block text-[clamp(2.6rem,8.6vw,7.6rem)]">
                SEND SOME
              </Reveal>
              <Reveal
                as="span"
                axis="mask"
                delay={110}
                className="block text-[clamp(2.6rem,8.6vw,7.6rem)] italic text-tan"
              >
                BILTONG.
              </Reveal>
            </h2>

            <Reveal delay={180}>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-bone/65">
                Good meat is better shared.
              </p>
            </Reveal>

            <div className="mt-14 space-y-0">
              {SERVICES.map((service, i) => (
                <Reveal
                  key={service.title}
                  delay={i * 90}
                  className="group border-t border-bone/12 py-7 last:border-b"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] text-bone transition-colors duration-700 group-hover:text-tan">
                      {service.title}
                    </h3>
                    <span className="font-display text-sm italic text-bone/25">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/55">
                    {service.body}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-5">
              <Reveal axis="mask" className="relative aspect-[4/5] overflow-hidden bg-ink-3">
                <BrandImage
                  image={IMAGES.giftLeopard03}
                  sizes="(max-width: 1024px) 45vw, 22vw"
                />
                <span className="label absolute bottom-4 left-4 text-bone/85">
                  Honey · cashews · biltong
                </span>
              </Reveal>
              <Reveal
                axis="mask"
                delay={120}
                className="relative aspect-[4/5] overflow-hidden bg-ink-3"
              >
                <BrandImage image={IMAGES.giftLeopard01} sizes="(max-width: 1024px) 45vw, 22vw" />
              </Reveal>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-6">
            <Reveal axis="mask" className="relative aspect-[16/10] overflow-hidden bg-ink-3">
              <BrandImage
                image={IMAGES.giftCoffee}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <span className="label absolute bottom-4 left-4 text-bone/85">
                Kraft box · Eden coffee
              </span>
            </Reveal>

            <Reveal delay={140} className="mt-10">
              <p className="label mb-8 text-bone/40">
                Enquire · gift boxes, corporate &amp; custom
              </p>
              <EnquiryForm />
            </Reveal>

            <Reveal delay={200} className="mt-10 border-t border-bone/12 pt-8">
              <p className="text-[13px] leading-relaxed text-bone/45">
                Prefer to talk it through? WhatsApp{" "}
                <a href={BRAND.whatsapp} className="link-draw text-bone">
                  {BRAND.phoneDisplay}
                </a>
                . Vacuum sealing available for travellers. Corporate and bulk orders
                welcome.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
