import { supabase } from "@/lib/supabase";
import NewsPreviewClient from "./NewsPreviewClient";

const PREVIEW_COUNT = 4;

export default async function NewsPreviewSection() {
  const { data } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(PREVIEW_COUNT);

  const posts = (data ?? []).map((post) => ({
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    likes: undefined,
  }));

  if (posts.length === 0) return null;

  return <NewsPreviewClient posts={posts} />;
}
