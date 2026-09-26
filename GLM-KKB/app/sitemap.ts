import type { MetadataRoute } from "next";

const BASE = "https://kloofkerf.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/#the-range`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/#gifts`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/#our-story`, lastModified: now, priority: 0.6 },
    { url: `${BASE}/#visit`, lastModified: now, priority: 0.6 },
    { url: `${BASE}/#reviews`, lastModified: now, priority: 0.5 },
  ];
}
