import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { verifyToken, checkCsrf } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/webp", "image/png", "image/jpeg"],
        maximumSizeInBytes: 5 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (e) {
    console.error("업로드 토큰 발급 실패:", e);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}
