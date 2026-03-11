import type { MetadataRoute } from "next";

const BASE_URL = "https://fetc.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/performance`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/training`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/rehabilitation`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
  ];
}
