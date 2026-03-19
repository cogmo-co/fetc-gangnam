import { NextResponse } from "next/server";
import { verifyToken, checkCsrf } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

/** 게시물 목록 */
export async function GET() {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "목록 조회 실패" }, { status: 500 });
  }

  return NextResponse.json(data);
}

/** 게시물 생성 */
export async function POST(req: Request) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  try {
    const { title, body: postBody, published, image_urls } = await req.json();

    if (!title || !image_urls || image_urls.length === 0) {
      return NextResponse.json(
        { error: "제목과 이미지는 필수입니다" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        body: postBody || "",
        image_urls,
        published: published ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "게시물 저장 실패" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error("게시물 생성 실패:", e);
    return NextResponse.json({ error: "게시물 생성 실패" }, { status: 500 });
  }
}
