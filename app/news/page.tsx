import SubHero from "@/components/SubHero/SubHero";
import NewsGrid from "@/components/NewsGrid/NewsGrid";
import { supabase } from "@/lib/supabase";
import { NEWS_PAGE_SIZE } from "@/lib/constants";

export const revalidate = 60;

const LIMIT = NEWS_PAGE_SIZE;

export default async function NewsPage() {
  const { data } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(LIMIT + 1);

  const posts = data ?? [];
  const hasMore = posts.length > LIMIT;
  const formatted = (hasMore ? posts.slice(0, LIMIT) : posts).map((post) => ({
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    likes: undefined,
  }));

  return (
    <div className="sub-page">
      <SubHero title="FETC NEWS" image="/images/news-hero.png" />
      <NewsGrid
        initialPosts={formatted}
        initialCursor={hasMore ? formatted[formatted.length - 1].created_at : null}
      />
    </div>
  );
}
