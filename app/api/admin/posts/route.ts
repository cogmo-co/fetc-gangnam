import { NextResponse } from "next/server";
import sharp from "sharp";
import { verifyToken, checkCsrf } from "@/lib/auth";
import { uploadImage } from "@/lib/blob";
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
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const body = (formData.get("body") as string) || "";
    const published = formData.get("published") === "true";
    const files = formData.getAll("images") as File[];

    if (!title || files.length === 0) {
      return NextResponse.json(
        { error: "제목과 이미지는 필수입니다" },
        { status: 400 }
      );
    }

    // ID 생성: YYYYMMDD-timestamp
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const postId = `${dateStr}-${Date.now()}`;

    // 이미지 처리 + 업로드
    const imageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const webp = await sharp(buffer)
        .resize(1080, 1350, { fit: "cover" })
        .webp({ quality: 80 })
        .toBuffer();

      const index = String(i + 1).padStart(2, "0");
      const url = await uploadImage(`images/${postId}/${index}.webp`, webp);
      imageUrls.push(url);
    }

    // Supabase에 저장
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        body,
        image_urls: imageUrls,
        published,
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
