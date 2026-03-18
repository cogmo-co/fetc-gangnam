import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/auth";

export async function POST() {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  revalidatePath("/news");
  return NextResponse.json({ revalidated: true });
}
