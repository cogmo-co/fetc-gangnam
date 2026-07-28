import { Oswald } from "next/font/google";
import localFont from "next/font/local";

// 두 root layout(app/[locale], app/admin)이 공유하는 폰트 선언
export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-Light.woff2", weight: "300" },
    { path: "../public/fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Pretendard-Bold.woff2", weight: "700" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
