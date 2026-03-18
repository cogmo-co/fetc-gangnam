import { NextResponse } from "next/server";
import { validateCredentials, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();

    if (!validateCredentials(id, password)) {
      return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }

    const token = await createToken();
    const res = NextResponse.json({ success: true });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8시간
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
}
