import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/content/site";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const TITLE = "Kloof Kerf Biltong — Biltong, Cut Different. | Gardens, Cape Town";
const DESCRIPTION =
  "Handcrafted biltong, droëwors and South African game meats from the heart of Cape Town. Beef, kudu, springbok, eland and gemsbok, freshly sliced to order at 105 Kloof Street, Gardens.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kloofkerf.co.za"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: BRAND.fullName,
  keywords: [
    "biltong",
    "Cape Town biltong",
    "Kloof Street",
    "Gardens",
    "droëwors",
    "kudu biltong",
    "springbok biltong",
    "game meat",
    "South African biltong",
    "gift boxes",
  ],
  authors: [{ name: BRAND.fullName }],
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    siteName: BRAND.fullName,
    locale: "en_ZA",
    images: [
      {
        url: "/images/brand/hero-board.jpg",
        width: 2400,
        height: 1067,
        alt: "Kloof Kerf Biltong leopard-print gift box with droëwors, chilli stix and freshly cut biltong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/brand/hero-board.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#11110f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${bodoni.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
