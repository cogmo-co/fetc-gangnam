import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { NEWS_PAGE_SIZE } from "@/lib/constants";
import SubHero from "@/components/SubHero/SubHero";
import NewsGrid from "@/components/NewsGrid/NewsGrid";
import NewsDetail from "@/components/NewsDetail/NewsDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("title, image_urls")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!post) return { title: "FETC NEWS" };

  return {
    title: `${post.title} | FETC NEWS`,
    openGraph: {
      title: post.title,
      images: post.image_urls?.[0] ? [post.image_urls[0]] : [],
      type: "article",
    },
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const formatted = {
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    likes: undefined,
  };

  // 목록도 조회 (PC에서 모달 + 그리드 표시용)
  const LIMIT = NEWS_PAGE_SIZE;
  const { data: listData } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(LIMIT + 1);

  const listPosts = listData ?? [];
  const hasMore = listPosts.length > LIMIT;
  const formattedList = (hasMore ? listPosts.slice(0, LIMIT) : listPosts).map((p) => ({
    ...p,
    like_count: p.likes?.[0]?.count ?? 0,
    likes: undefined,
  }));

  return (
    <>
      {/* PC: 그리드 + 모달 자동 열기 */}
      <div className="sub-page pc-only">
        <SubHero title="FETC NEWS" image="/images/news-hero.png" />
        <NewsGrid
          initialPosts={formattedList}
          initialCursor={hasMore ? formattedList[formattedList.length - 1].created_at : null}
          autoOpenPost={formatted}
        />
      </div>

      {/* Mobile: 상세 페이지 */}
      <div className="mobile-only">
        <NewsDetail post={formatted} />
      </div>
    </>
  );
}
