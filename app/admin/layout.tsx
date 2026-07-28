import type { Metadata } from "next";
import { oswald, pretendard } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

// 로케일 무관 내부 전용 root layout (한국어 고정)
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className={`${oswald.variable} ${pretendard.variable}`}>
        {children}
      </body>
    </html>
  );
}
