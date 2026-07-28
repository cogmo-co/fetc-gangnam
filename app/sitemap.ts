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

  const now = new Date();

  // 각 경로에 ko(/) · en(/en) hreflang alternates 부착
  const entry = (
    path: string,
    priority: number,
    lastModified: Date = now,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    priority,
    alternates: {
      languages: {
        ko: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },
  });

  const staticPaths: [string, number][] = [
    ["", 1.0],
    // 회원 전환 CTA 페이지 — 최우선 SEO
    ["/reservation", 0.9],
    // About sub-pages
    ["/about/FETC", 0.8],
    ["/about/coach", 0.8],
    ["/about/facility", 0.8],
    ["/about/location", 0.8],
    // Program sub-pages
    ["/program/performance", 0.8],
    ["/program/training", 0.8],
    ["/program/rehabilitation", 0.8],
    // 부가 페이지
    ["/news", 0.8],
    ["/contact", 0.7],
  ];

  return [
    ...staticPaths.map(([path, priority]) => entry(path, priority)),
    ...COACHES.map((c) => entry(`/about/coach/${c.id}`, 0.7)),
    ...EQUIPMENTS.map((e) => entry(`/about/facility/${e.id}`, 0.6)),
    ...(posts ?? []).map((post) =>
      entry(`/news/${post.id}`, 0.6, new Date(post.updated_at)),
    ),
  ];
}
