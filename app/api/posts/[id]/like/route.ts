import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** 좋아요 상태 확인 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: post_id } = await params;
    const user_id = req.nextUrl.searchParams.get("user_id");

    // 좋아요 수
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post_id);

    // 내 좋아요 여부
    let liked = false;
    if (user_id) {
      const { data } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", post_id)
        .eq("user_id", user_id)
        .single();
      liked = !!data;
    }

    return NextResponse.json({ liked, count: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

/** 좋아요 토글 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: post_id } = await params;
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: "user_id 필요" }, { status: 400 });
    }

    // 기존 좋아요 확인
    const { data: existing } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", post_id)
      .eq("user_id", user_id)
      .single();

    if (existing) {
      // 이미 있으면 삭제 (좋아요 취소)
      await supabase.from("likes").delete().eq("id", existing.id);
      return NextResponse.json({ liked: false });
    } else {
      // 없으면 추가 (좋아요)
      await supabase.from("likes").insert({ post_id, user_id });
      return NextResponse.json({ liked: true });
    }
  } catch {
    return NextResponse.json({ error: "좋아요 처리 실패" }, { status: 500 });
  }
}
