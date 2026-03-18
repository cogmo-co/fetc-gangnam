import { NextResponse } from "next/server";
import { verifyToken, checkCsrf } from "@/lib/auth";
import { deleteByPrefix } from "@/lib/blob";
import { supabase } from "@/lib/supabase";

/** 게시물 수정 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { title, body, published, image_urls } = await req.json();

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (title !== undefined) updates.title = title;
    if (body !== undefined) updates.body = body;
    if (published !== undefined) updates.published = published;
    if (image_urls !== undefined) updates.image_urls = image_urls;

    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "게시물 없음" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

/** 게시물 삭제 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // 게시물 조회 (이미지 경로 확인)
    const { data: post } = await supabase
      .from("posts")
      .select("image_urls")
      .eq("id", id)
      .single();

    if (!post) {
      return NextResponse.json({ error: "게시물 없음" }, { status: 404 });
    }

    // Blob 이미지 삭제
    if (post.image_urls?.length > 0) {
      const firstUrl = post.image_urls[0];
      const match = firstUrl.match(/images\/[^/]+\//);
      if (match) {
        await deleteByPrefix(match[0]);
      }
    }

    // DB 삭제 (likes도 CASCADE로 자동 삭제)
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
