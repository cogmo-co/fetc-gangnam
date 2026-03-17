import type { Metadata } from "next";
import Script from "next/script";
import { Oswald, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import AppShell from "@/components/AppShell/AppShell";
import Footer from "@/components/Footer/Footer";
import KakaoFloat from "@/components/KakaoFloat/KakaoFloat";
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
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KC4N5LM8');`}
      </Script>
      {/* Microsoft Clarity */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","vv0e6snlxl");`}
      </Script>
      <body
        className={`${oswald.variable} ${notoSansKR.variable} ${pretendard.variable}`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KC4N5LM8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AppShell>{children}</AppShell>
        <Footer />
        <KakaoFloat />
      </body>
    </html>
  );
}
