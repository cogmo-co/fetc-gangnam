import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { COACHES } from "@/lib/coaches";
import { EQUIPMENTS } from "@/lib/equipment";
import { BASE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const newsEntries: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/news/${post.id}`,
    lastModified: new Date(post.updated_at),
    priority: 0.6,
  }));

  const coachEntries: MetadataRoute.Sitemap = COACHES.map((c) => ({
    url: `${BASE_URL}/about/coach/${c.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const equipmentEntries: MetadataRoute.Sitemap = EQUIPMENTS.map((e) => ({
    url: `${BASE_URL}/about/facility/${e.id}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    // 회원 전환 CTA 페이지 — 최우선 SEO
    { url: `${BASE_URL}/reservation`, lastModified: new Date(), priority: 0.9 },
    // About sub-pages
    { url: `${BASE_URL}/about/FETC`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about/coach`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about/facility`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about/location`, lastModified: new Date(), priority: 0.8 },
    // Program sub-pages
    { url: `${BASE_URL}/program/performance`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/program/training`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/program/rehabilitation`, lastModified: new Date(), priority: 0.8 },
    // 부가 페이지
    { url: `${BASE_URL}/news`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
    // 동적 entries
    ...coachEntries,
    ...equipmentEntries,
    ...newsEntries,
  ];
}
