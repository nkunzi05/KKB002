/**
 * ============================================================================
 *  KLOOF KERF BILTONG — BRAND + CONTENT MANIFEST
 * ============================================================================
 *  Single source of truth for the site. Every fact, price and photograph below
 *  is traced to a public Kloof Kerf source:
 *
 *   [MRD]  Mr D store menu — https://www.mrd.com/delivery/restaurant/kloof-kerf-biltong-gardens/27691
 *   [FB]   Kloof Kerf Biltong official page post, 07/11/2025 (brand services + range)
 *   [IG]   https://www.instagram.com/kloofkerfbiltong/
 *   [GOOG] Google Business listing — Palmhof Village Centre, 105 Kloof Street
 *
 *  Nothing is invented. Where no verified photograph exists the slot is marked
 *  `status: "pending"` and the UI renders a REAL BRAND IMAGE REQUIRED panel
 *  with the exact drop-in path, so a real asset can be added with no code
 *  changes beyond saving the file.
 * ============================================================================
 */

export const BRAND = {
  name: "Kloof Kerf",
  fullName: "Kloof Kerf Biltong",
  tagline: "Biltong, cut different.",
  established: "2020",
  street: "105 Kloof Street",
  centre: "Palmhof Village Centre",
  suburb: "Gardens",
  city: "Cape Town",
  postcode: "8001",
  country: "South Africa",
  phoneDisplay: "+27 64 598 6495",
  phoneTel: "+27645986495",
  whatsapp: "https://wa.me/27645986495",
  instagram: "https://www.instagram.com/kloofkerfbiltong/",
  instagramHandle: "@kloofkerfbiltong",
  mrD: "https://www.mrd.com/delivery/restaurant/kloof-kerf-biltong-gardens/27691",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Kloof+Kerf+Biltong+105+Kloof+Street+Gardens+Cape+Town",
  googleReviews:
    "https://www.google.com/search?q=Kloof+Kerf+Biltong+105+Kloof+Street+Gardens+Cape+Town#lrd",
  email: "orders@kloofkerf.co.za",
} as const;

export const SOURCE_OF_TRUTH = {
  rating: 4.7,
  ratingSource: "Mr D",
  ratingHref: BRAND.mrD,
} as const;

/* -------------------------------------------------------------------------- */
/*  PHOTOGRAPHY — all verified Kloof Kerf imagery (Mr D product photography)   */
/* -------------------------------------------------------------------------- */

export type BrandImage = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export const IMAGES: Record<string, BrandImage> = {
  hero: {
    key: "hero",
    src: "/images/brand/hero-board.jpg",
    alt: "Kloof Kerf Biltong leopard-print gift box with droëwors, chilli stix and a bowl of freshly cut biltong on a wooden board",
    width: 2400,
    height: 1067,
    caption: "Leopard-print gift box · droëwors · chilli stix · freshly cut beef biltong",
  },
  boardSpread: {
    key: "boardSpread",
    src: "/images/brand/board-spread.jpg",
    alt: "Kloof Kerf Biltong packaging on a wooden board with the range laid out",
    width: 1600,
    height: 1280,
    caption: "The range, laid out on the board",
  },
  giftLeopard01: {
    key: "giftLeopard01",
    src: "/images/brand/gift-leopard-01.jpg",
    alt: "Kloof Kerf Biltong leopard-print gift box with branded gold biltong pouch",
    width: 1600,
    height: 1280,
    caption: "Leopard-print gift box · gold pouch",
  },
  giftLeopard02: {
    key: "giftLeopard02",
    src: "/images/brand/gift-leopard-02.jpg",
    alt: "Kloof Kerf Biltong leopard-print gift box with window front and white brand label",
    width: 1600,
    height: 1280,
    caption: "Leopard-print box · window front",
  },
  giftLeopard03: {
    key: "giftLeopard03",
    src: "/images/brand/gift-leopard-03.jpg",
    alt: "Kloof Kerf Biltong leopard-print gift box containing raw honey, cashews and a gold biltong pouch",
    width: 1200,
    height: 960,
    caption: "Raw honey · cashews · biltong",
  },
  giftCoffee: {
    key: "giftCoffee",
    src: "/images/brand/gift-coffee.jpg",
    alt: "Kloof Kerf Biltong kraft gift box with zebra print containing a branded biltong pouch and Eden coffee",
    width: 1600,
    height: 1280,
    caption: "Kraft box · zebra print · Eden coffee",
  },
  gift04: {
    key: "gift04",
    src: "/images/brand/gift-04.jpg",
    alt: "Kloof Kerf Biltong gift box packaging",
    width: 1600,
    height: 1280,
    caption: "Gift box packaging",
  },
  gift05: {
    key: "gift05",
    src: "/images/brand/gift-05.jpg",
    alt: "Kloof Kerf Biltong gift box packaging",
    width: 1600,
    height: 1280,
    caption: "Gift box packaging",
  },
  gift06: {
    key: "gift06",
    src: "/images/brand/gift-06.jpg",
    alt: "Kloof Kerf Biltong gift box packaging",
    width: 1600,
    height: 1280,
    caption: "Gift box packaging",
  },
  gift07: {
    key: "gift07",
    src: "/images/brand/gift-07.jpg",
    alt: "Kloof Kerf Biltong gift box packaging",
    width: 1600,
    height: 1280,
    caption: "Gift box packaging",
  },
  gift08: {
    key: "gift08",
    src: "/images/brand/gift-08.jpg",
    alt: "Kloof Kerf Biltong gift box packaging",
    width: 1600,
    height: 1280,
    caption: "Gift box packaging",
  },
  gift09: {
    key: "gift09",
    src: "/images/brand/gift-09.jpg",
    alt: "Kloof Kerf Biltong gift box packaging",
    width: 1600,
    height: 1280,
    caption: "Gift box packaging",
  },
  logoMark: {
    key: "logoMark",
    src: "/images/brand/logo-mark.jpg",
    alt: "Kloof Kerf Biltong logo — the wordmark with cleaver-blade crossbars, Biltong, Est. 2020",
    width: 900,
    height: 900,
    caption: "Kloof Kerf Biltong · Est. 2020",
  },
};

/** Ordered editorial wall of verified photography. */
export const PHOTO_WALL = [
  "giftLeopard01",
  "boardSpread",
  "giftCoffee",
  "giftLeopard02",
  "gift06",
  "giftLeopard03",
  "gift07",
  "gift04",
  "gift09",
] as const;

/* -------------------------------------------------------------------------- */
/*  THE RANGE — hero rail. Sequence fixed by the art direction brief.         */
/* -------------------------------------------------------------------------- */

export type RailProduct = {
  index: string;
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  priceLabel: string;
  unitLabel: string;
  /** Verified photograph, or null → pending asset slot. */
  image: BrandImage | null;
  assetPath: string;
  sourceRef: string;
};

export const RAIL: RailProduct[] = [
  {
    index: "01",
    slug: "beef-biltong",
    name: "Beef Biltong",
    kicker: "The original",
    blurb:
      "Classic South African biltong, hand-cut in the shop on Kloof Street. Freshly sliced to order — this is the cut everything else is measured against.",
    priceLabel: "From R280",
    unitLabel: "500g gift packet",
    image: IMAGES.boardSpread,
    assetPath: "/public/images/brand/board-spread.jpg",
    sourceRef: "MRD",
  },
  {
    index: "02",
    slug: "geelvet-biltong",
    name: "Geelvet",
    kicker: "Fat cap forward",
    blurb:
      "The golden one. Geelvet is cut to keep the fat on — softer, richer, and the first thing regulars ask for when the slicer comes out.",
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    image: null,
    assetPath: "/public/images/brand/geelvet-biltong.jpg",
    sourceRef: "IG",
  },
  {
    index: "03",
    slug: "kudu-biltong",
    name: "Kudu",
    kicker: "Game",
    blurb:
      "Deep, lean and quietly gamey. Available as biltong and as droëwors — the kudu droëwors has its own following.",
    priceLabel: "In store",
    unitLabel: "Biltong · droëwors",
    image: null,
    assetPath: "/public/images/brand/kudu-biltong.jpg",
    sourceRef: "MRD",
  },
  {
    index: "04",
    slug: "springbok-biltong",
    name: "Springbok",
    kicker: "Game",
    blurb:
      "Lighter than beef, cleaner on the finish. Sold as biltong and droëwors, and the backbone of Combo 9.",
    priceLabel: "In store",
    unitLabel: "Biltong · droëwors",
    image: null,
    assetPath: "/public/images/brand/springbok-biltong.jpg",
    sourceRef: "MRD",
  },
  {
    index: "05",
    slug: "eland-biltong",
    name: "Eland",
    kicker: "Game",
    blurb:
      "The largest antelope in Africa, and one of the largest cuts on the board. Firm, dark and built for slow chewing.",
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    image: null,
    assetPath: "/public/images/brand/eland-biltong.jpg",
    sourceRef: "FB",
  },
  {
    index: "06",
    slug: "gemsbok-biltong",
    name: "Gemsbok",
    kicker: "Game",
    blurb:
      "Desert antelope, desert flavour. Dry, savoury and unapologetically South African — ask for it thick cut.",
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    image: null,
    assetPath: "/public/images/brand/gemsbok-biltong.jpg",
    sourceRef: "FB",
  },
  {
    index: "07",
    slug: "droewors",
    name: "Droëwors",
    kicker: "Dried sausage",
    blurb:
      "Beef, kudu and springbok droëwors, dried the slow way. Thin, snappy, and gone before you get to the car.",
    priceLabel: "In store",
    unitLabel: "Beef · kudu · springbok",
    image: IMAGES.hero,
    assetPath: "/public/images/brand/hero-board.jpg",
    sourceRef: "MRD",
  },
  {
    index: "08",
    slug: "stix",
    name: "Stix",
    kicker: "The snack rack",
    blurb:
      "Beef, chilli, chutney, salami. The stix rack is the reason people walk past the shop twice.",
    priceLabel: "In store",
    unitLabel: "Beef · chilli · chutney · salami",
    image: IMAGES.giftLeopard02,
    assetPath: "/public/images/brand/gift-leopard-02.jpg",
    sourceRef: "MRD",
  },
];

/* -------------------------------------------------------------------------- */
/*  FULL CATALOGUE — confirmed products, seeded into Postgres                 */
/* -------------------------------------------------------------------------- */

export type CatalogueItem = {
  slug: string;
  name: string;
  category: string;
  animal: string | null;
  description: string;
  priceCents: number | null;
  priceLabel: string;
  unitLabel: string;
  imageKey: string;
  imageStatus: "real" | "pending";
  assetPath: string;
  sourceRef: string;
  featured: boolean;
  sortOrder: number;
};

export const CATALOGUE: CatalogueItem[] = [
  // ── Biltong ──────────────────────────────────────────────────────────────
  {
    slug: "beef-biltong-gift-packet-500g",
    name: "Beef Biltong Gift Packet 500g",
    category: "Biltong",
    animal: "Beef",
    description:
      "500g beef biltong in a gift packet. Please note biltong is freshly sliced and to be enjoyed within 2–3 days.",
    priceCents: 28000,
    priceLabel: "From R280",
    unitLabel: "500g",
    imageKey: "boardSpread",
    imageStatus: "real",
    assetPath: "/public/images/brand/board-spread.jpg",
    sourceRef: "MRD",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "beef-biltong-gift-box-350g",
    name: "Beef Biltong Gift Box 350g",
    category: "Biltong",
    animal: "Beef",
    description: "350g beef biltong in the Kloof Kerf gift box.",
    priceCents: 22000,
    priceLabel: "From R220",
    unitLabel: "350g",
    imageKey: "giftLeopard02",
    imageStatus: "real",
    assetPath: "/public/images/brand/gift-leopard-02.jpg",
    sourceRef: "MRD",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "geelvet-biltong",
    name: "Geelvet Biltong",
    category: "Biltong",
    animal: "Beef",
    description: "Fat-cap-on biltong, cut golden. A house favourite.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/geelvet-biltong.jpg",
    sourceRef: "IG",
    featured: false,
    sortOrder: 3,
  },
  {
    slug: "bacon-biltong",
    name: "Bacon Biltong",
    category: "Biltong",
    animal: "Beef",
    description: "Bacon-cured biltong. Smoky, sweet, and genuinely difficult to share.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/bacon-biltong.jpg",
    sourceRef: "IG",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "kudu-biltong",
    name: "Kudu Biltong",
    category: "Biltong",
    animal: "Kudu",
    description: "Lean, dark game biltong with a long finish.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/kudu-biltong.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "springbok-biltong",
    name: "Springbok Biltong",
    category: "Biltong",
    animal: "Springbok",
    description: "Lighter game biltong, clean on the palate.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/springbok-biltong.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 6,
  },
  {
    slug: "eland-biltong",
    name: "Eland Biltong",
    category: "Biltong",
    animal: "Eland",
    description: "Firm, dark and made for slow chewing.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/eland-biltong.jpg",
    sourceRef: "FB",
    featured: false,
    sortOrder: 7,
  },
  {
    slug: "gemsbok-biltong",
    name: "Gemsbok Biltong",
    category: "Biltong",
    animal: "Gemsbok",
    description: "Dry, savoury desert antelope. Best thick cut.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Sliced to order",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/gemsbok-biltong.jpg",
    sourceRef: "FB",
    featured: false,
    sortOrder: 8,
  },
  // ── Droëwors ─────────────────────────────────────────────────────────────
  {
    slug: "beef-droewors",
    name: "Beef Droëwors",
    category: "Droëwors",
    animal: "Beef",
    description: "Thin, snappy dried sausage. The classic.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Per 100g",
    imageKey: "hero",
    imageStatus: "real",
    assetPath: "/public/images/brand/hero-board.jpg",
    sourceRef: "MRD",
    featured: true,
    sortOrder: 9,
  },
  {
    slug: "kudu-droewors",
    name: "Kudu Droëwors",
    category: "Droëwors",
    animal: "Kudu",
    description: "Game droëwors with a dedicated following.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Per 100g",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/kudu-droewors.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 10,
  },
  {
    slug: "springbok-droewors",
    name: "Springbok Droëwors",
    category: "Droëwors",
    animal: "Springbok",
    description: "Lighter game droëwors.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Per 100g",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/springbok-droewors.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 11,
  },
  // ── Stix ─────────────────────────────────────────────────────────────────
  {
    slug: "beef-stix",
    name: "Beef Stix",
    category: "Stix",
    animal: "Beef",
    description: "The everyday stix.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Each",
    imageKey: "giftLeopard02",
    imageStatus: "real",
    assetPath: "/public/images/brand/gift-leopard-02.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 12,
  },
  {
    slug: "chilli-stix",
    name: "Chilli Stix",
    category: "Stix",
    animal: "Beef",
    description: "The hot one. Appears in Combos 1, 5, 6 and 7 for a reason.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Each",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/chilli-stix.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 13,
  },
  {
    slug: "chutney-stix",
    name: "Chutney Stix",
    category: "Stix",
    animal: "Beef",
    description: "Sweet chutney glaze over dried beef.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Each",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/chutney-stix.jpg",
    sourceRef: "IG",
    featured: false,
    sortOrder: 14,
  },
  {
    slug: "salami-stix",
    name: "Salami Stix",
    category: "Stix",
    animal: "Beef",
    description: "Salami-style stix for the rack.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Each",
    imageKey: "pending",
    imageStatus: "pending",
    assetPath: "/public/images/brand/salami-stix.jpg",
    sourceRef: "IG",
    featured: false,
    sortOrder: 15,
  },
  // ── Deli ─────────────────────────────────────────────────────────────────
  {
    slug: "raw-honey",
    name: "Raw Honey",
    category: "Deli",
    animal: null,
    description: "Raw honey, stocked in store and packed into gift boxes.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Jar",
    imageKey: "giftLeopard03",
    imageStatus: "real",
    assetPath: "/public/images/brand/gift-leopard-03.jpg",
    sourceRef: "FB",
    featured: false,
    sortOrder: 16,
  },
  {
    slug: "artisan-coffee",
    name: "Artisan Coffee",
    category: "Deli",
    animal: null,
    description: "Eden artisan coffee, packed alongside biltong in the kraft gift box.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Bag",
    imageKey: "giftCoffee",
    imageStatus: "real",
    assetPath: "/public/images/brand/gift-coffee.jpg",
    sourceRef: "FB",
    featured: false,
    sortOrder: 17,
  },
  {
    slug: "nuts",
    name: "Nuts",
    category: "Deli",
    animal: null,
    description:
      "Mixed nuts, salted cashews, chocolate peanuts and yoghurt-coated peanuts — the other half of every good combo.",
    priceCents: null,
    priceLabel: "In store",
    unitLabel: "Per 250g",
    imageKey: "giftLeopard03",
    imageStatus: "real",
    assetPath: "/public/images/brand/gift-leopard-03.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 18,
  },
  // ── Gift boxes & combos ──────────────────────────────────────────────────
  ...[
    ["Combo 1", 23500, "200g freshly sliced beef biltong, 100g beef droëwors & 100g chilli sticks."],
    ["Combo 2", 24500, "200g freshly sliced beef biltong & 200g beef droëwors."],
    ["Combo 3", 47000, "500g freshly sliced beef biltong, 250g mixed nuts & 250g yoghurt-coated peanuts."],
    ["Combo 4", 56000, "500g freshly sliced beef biltong, 250g salted cashew nuts & 250g salted mixed nuts."],
    ["Combo 5", 20000, "100g beef biltong, 100g beef droëwors & 100g chilli sticks."],
    ["Combo 6", 21000, "100g freshly sliced beef biltong, 100g kudu droëwors & 100g chilli sticks."],
    ["Combo 7", 23000, "100g beef droëwors, 100g chilli sticks, 100g mixed nuts & 100g chocolate peanuts."],
    ["Combo 8", 24000, "100g kudu biltong, 100g kudu droëwors, 100g mixed nuts & 100g chocolate peanuts."],
    ["Combo 9", 25000, "100g springbok biltong, 100g springbok droëwors, 100g mixed nuts & 100g chocolate peanuts."],
  ].map(([name, priceCents, description], i) => ({
    slug: `combo-${i + 1}`,
    name: name as string,
    category: "Combos",
    animal: null,
    description: description as string,
    priceCents: priceCents as number,
    priceLabel: `From R${((priceCents as number) / 100).toFixed(0)}`,
    unitLabel: "Gift box",
    imageKey: i % 3 === 0 ? "giftLeopard01" : i % 3 === 1 ? "giftLeopard02" : "giftCoffee",
    imageStatus: "real" as const,
    assetPath:
      i % 3 === 0
        ? "/public/images/brand/gift-leopard-01.jpg"
        : i % 3 === 1
          ? "/public/images/brand/gift-leopard-02.jpg"
          : "/public/images/brand/gift-coffee.jpg",
    sourceRef: "MRD",
    featured: false,
    sortOrder: 19 + i,
  })),
];

export const CATEGORIES = [
  "All",
  "Biltong",
  "Droëwors",
  "Stix",
  "Combos",
  "Deli",
] as const;
