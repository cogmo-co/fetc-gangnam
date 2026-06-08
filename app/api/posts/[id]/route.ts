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

  if (error) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const post = {
    ...data,
    like_count: data.likes?.[0]?.count ?? 0,
    likes: undefined,
  };

  // 게시물 변경 빈도 낮음 → CDN/edge 캐시로 단건 fetch 반복 비용 절감
  return NextResponse.json(
    { post },
    {
      headers: {
        "Cache-Control":
          "s-maxage=300, stale-while-revalidate=3600",
      },
    },
  );
}