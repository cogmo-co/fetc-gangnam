import { supabase } from "@/lib/supabase";
import NewsPreviewClient from "./NewsPreviewClient";

const PREVIEW_COUNT = 4;

export default async function NewsPreviewSection() {
  // 메인 페이지 응답 슬림화 — 썸네일 표시에 필요한 최소 필드만
  // body·likes 등 무거운 필드는 PC 모달 열 때 /api/posts/[id]에서 단건 fetch
  // (모바일은 /news/[id] 페이지가 자체 server fetch로 full data 로드)
  const { data } = await supabase
    .from("posts")
    .select("id, title, image_urls")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(PREVIEW_COUNT);

  const posts = data ?? [];

  if (posts.length === 0) return null;

  return <NewsPreviewClient posts={posts} />;
}