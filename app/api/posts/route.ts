import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** 공개 게시물 목록 (published만, 좋아요 수 포함) */
export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }

  const posts = data.map((post) => ({
    ...post,
    like_count: post.likes?.[0]?.count ?? 0,
    likes: undefined,
  }));

  return NextResponse.json(posts);
}
