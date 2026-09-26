import { BRAND } from "@/content/site";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Cursor, ScrollProgress } from "@/components/motion";
import {
  BrandStatement,
  CinematicPhoto,
  RangeMarquee,
  SiteFooter,
  Story,
  Visit,
} from "@/components/sections";
import { ProductRail } from "@/components/product-rail";
import { Gifts } from "@/components/gifts";
import { Reviews } from "@/components/reviews";
import { InstagramWall } from "@/components/instagram-wall";
import { fetchGoogleReviews } from "@/lib/reviews";

export const dynamic = "force-dynamic";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: BRAND.fullName,
  alternateName: "Kloof Kerf",
  description:
    "Specialist biltong shop in Gardens, Cape Town. Beef, kudu, springbok, eland and gemsbok biltong, droëwors, stix, gift boxes and deli goods.",
  image: "https://kloofkerf.co.za/images/brand/hero-board.jpg",
  telephone: BRAND.phoneTel,
  priceRange: "R200–R560",
  foundingDate: BRAND.established,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BRAND.centre}, ${BRAND.street}`,
    addressLocality: BRAND.suburb,
    addressRegion: "Western Cape",
    postalCode: BRAND.postcode,
    addressCountry: "ZA",
  },
  geo: { "@type": "GeoCoordinates", latitude: -33.9335, longitude: 18.4105 },
  sameAs: [BRAND.instagram, BRAND.mrD],
  makesOffer: [
    "Beef Biltong",
    "Geelvet Biltong",
    "Kudu Biltong",
    "Springbok Biltong",
    "Eland Biltong",
    "Gemsbok Biltong",
    "Beef Droëwors",
    "Kudu Droëwors",
    "Springbok Droëwors",
    "Beef Stix",
    "Chilli Stix",
    "Chutney Stix",
    "Salami Stix",
    "Bacon Biltong",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name },
  })),
};

export default async function HomePage() {
  const reviews = await fetchGoogleReviews();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <ScrollProgress />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <RangeMarquee />
        <BrandStatement />
        <ProductRail />
        <CinematicPhoto
          imageKey="giftLeopard01"
          line="THE KERF."
          caption="Leopard-print gift box, gold pouch, cut to order. Kloof Kerf Biltong, Palmhof Village Centre, 105 Kloof Street, Gardens."
        />
        <Story />
        <Gifts />
        <Reviews payload={reviews} />
        <InstagramWall />
        <Visit />
      </main>

      <SiteFooter />
    </>
  );
}
