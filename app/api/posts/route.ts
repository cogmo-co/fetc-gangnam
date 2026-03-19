import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { NEWS_PAGE_SIZE } from "@/lib/constants";

/** 공개 게시물 목록 (published만, 좋아요 수 포함, 더보기 방식) */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = NEWS_PAGE_SIZE;
  const cursor = searchParams.get("cursor");

  let query = supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }

  const hasMore = data.length > limit;
  const posts = (hasMore ? data.slice(0, limit) : data).map((post) => ({
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    likes: undefined,
  }));

  return NextResponse.json({
    posts,
    nextCursor: hasMore ? posts[posts.length - 1].created_at : null,
  });
}
