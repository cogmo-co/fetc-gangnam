import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** 공개 게시물 단건 (NewsPreview 모달 lazy fetch용) */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, body, image_urls, created_at, likes(count)")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "조회 실패" }, { status: 404 });
  }

  const post = {
    ...data,
    like_count: data.likes?.[0]?.count ?? 0,
    likes: undefined,
  };

  return NextResponse.json({ post });
}