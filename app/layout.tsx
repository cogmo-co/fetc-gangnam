import type { Metadata } from "next";
import { Oswald, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import AppShell from "@/components/AppShell/AppShell";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-Light.woff2", weight: "300" },
    { path: "../public/fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Pretendard-Bold.woff2", weight: "700" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FE Training Center 강남점",
    template: "%s | FE Training Center 강남점",
  },
  description: "TRAIN BEYOND LIMITS — FE트레이닝센터 강남점",
  metadataBase: new URL("https://fetc.co.kr"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "FE Training Center 강남점",
    title: "FE Training Center 강남점",
    description: "TRAIN BEYOND LIMITS — FE트레이닝센터 강남점",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "FE Training Center 강남점" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FE Training Center 강남점",
    description: "TRAIN BEYOND LIMITS — FE트레이닝센터 강남점",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${oswald.variable} ${notoSansKR.variable} ${pretendard.variable}`}
      >
        <AppShell>{children}</AppShell>
        <Footer />
      </body>
    </html>
  );
}
