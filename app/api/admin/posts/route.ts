import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyToken, checkCsrf } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { ADMIN_PAGE_SIZE, MAX_IMAGES_PER_POST } from "@/lib/constants";

/** 게시물 목록 (페이징) */
export async function GET(req: Request) {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = ADMIN_PAGE_SIZE;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: "목록 조회 실패" }, { status: 500 });
  }

  return NextResponse.json({ posts: data, total: count, page, limit });
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

    if (image_urls.length > MAX_IMAGES_PER_POST) {
      return NextResponse.json(
        { error: `이미지는 최대 ${MAX_IMAGES_PER_POST}장까지 가능합니다` },
        { status: 400 }
      );
    }

    // Vercel Blob URL만 허용
    const isValidUrl = (url: string) => {
      try {
        const { hostname } = new URL(url);
        return hostname.endsWith(".public.blob.vercel-storage.com");
      } catch {
        return false;
      }
    };
    if (!image_urls.every(isValidUrl)) {
      return NextResponse.json(
        { error: "허용되지 않는 이미지 URL입니다" },
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

    revalidatePath("/sitemap.xml");
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error("게시물 생성 실패:", e);
    return NextResponse.json({ error: "게시물 생성 실패" }, { status: 500 });
  }
}
