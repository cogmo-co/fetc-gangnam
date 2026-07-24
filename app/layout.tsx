import type { Metadata } from "next";
import Script from "next/script";
import { Oswald } from "next/font/google";
// import { Noto_Sans_KR } from "next/font/google"; // 미사용 (Pretendard로 한글 커버)
import localFont from "next/font/local";
import AppShell from "@/components/AppShell/AppShell";
import Footer from "@/components/Footer/Footer";
import NaverBookingFloat from "@/components/NaverBookingFloat/NaverBookingFloat";
import { BASE_URL } from "@/lib/constants";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FE트레이닝센터",
  alternateName: "FETC",
  url: BASE_URL,
  logo: `${BASE_URL}/images/meta-image.jpg`,
  sameAs: [
    "https://www.youtube.com/@FETC_gangnam",
    "https://www.instagram.com/fetc_gangnam/",
    "https://fetc-gangnam.tistory.com",
    "https://blog.naver.com/fetraining_gangnam",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-10-3375-9911",
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: ["Korean"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "FE트레이닝센터 강남점",
  image: `${BASE_URL}/images/meta-image.jpg`,
  url: BASE_URL,
  telephone: "+82-10-3375-9911",
  address: {
    "@type": "PostalAddress",
    streetAddress: "도곡로7길 6, 한은빌딩 4층",
    addressLocality: "강남구",
    addressRegion: "서울특별시",
    postalCode: "06255",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "37.491108",
    longitude: "127.035126",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    "https://www.youtube.com/@FETC_gangnam",
    "https://www.instagram.com/fetc_gangnam/",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "FE트레이닝센터",
    url: BASE_URL,
  },
};

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// 미사용 (Pretendard로 한글 커버)
// const notoSansKR = Noto_Sans_KR({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
//   variable: "--font-noto-sans-kr",
//   display: "swap",
// });

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
    default: "FE트레이닝센터 강남점",
    template: "%s | FE트레이닝센터 강남점",
  },
  description: "국가대표 선수가 선택한 FE트레이닝센터 강남점은 수술 후 재활PT, 스포츠재활, 퍼포먼스트레이닝을 체계적으로 제공합니다.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "FE트레이닝센터 강남점",
    title: "FE트레이닝센터 강남점",
    description: "국가대표 선수가 선택한 FE트레이닝센터 강남점은 수술 후 재활PT, 스포츠재활, 퍼포먼스트레이닝을 체계적으로 제공합니다.",
    images: [{ url: "/images/meta-image.jpg", width: 2060, height: 1159, alt: "FE트레이닝센터 강남점" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FE트레이닝센터 강남점",
    description: "국가대표 선수가 선택한 FE트레이닝센터 강남점은 수술 후 재활PT, 스포츠재활, 퍼포먼스트레이닝을 체계적으로 제공합니다.",
    images: ["/images/meta-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 외부 이미지 도메인 사전 연결 — viewport 진입 시 DNS/TLS 비용 제거 */}
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://img1.daumcdn.net" />
        <link rel="dns-prefetch" href="https://blog.kakaocdn.net" />
        <link rel="preconnect" href="https://e7anpn4ttmde7uib.public.blob.vercel-storage.com" crossOrigin="" />
      </head>
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
        className={`${oswald.variable} ${pretendard.variable}`}
      >
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
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
        <NaverBookingFloat />
      </body>
    </html>
  );
}
