import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { COACHES } from "@/lib/coaches";
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
    url: `${BASE_URL}/coach/${c.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/performance`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/training`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/rehabilitation`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
    ...coachEntries,
    ...newsEntries,
  ];
}
