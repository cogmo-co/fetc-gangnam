import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
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

  return <NewsDetail post={formatted} />;
}
