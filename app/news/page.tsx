import SubHero from "@/components/SubHero/SubHero";
import NewsGrid from "@/components/NewsGrid/NewsGrid";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function NewsPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const formatted = (posts ?? []).map((post) => ({
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    likes: undefined,
  }));

  return (
    <div className="sub-page">
      <SubHero title="FETC NEWS" image="/images/news-hero.png" />
      <NewsGrid posts={formatted} />
    </div>
  );
}
