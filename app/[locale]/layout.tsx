import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { pickMessages } from "@/i18n/pick";
import { oswald, pretendard } from "@/lib/fonts";
import AppShell from "@/components/AppShell/AppShell";
import Footer from "@/components/Footer/Footer";
import NaverBookingFloat from "@/components/NaverBookingFloat/NaverBookingFloat";
import { BASE_URL } from "@/lib/constants";
import "../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("defaultTitle");
  const description = t("defaultDescription");
  return {
    title: { default: title, template: t("titleTemplate") },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { languages: { ko: "/", en: "/en" } },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "ko_KR",
      siteName: t("siteName"),
      title,
      description,
      images: [{ url: "/images/meta-image.jpg", width: 2060, height: 1159, alt: t("siteName") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/meta-image.jpg"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
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
      <body className={`${oswald.variable} ${pretendard.variable}`}>
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
        <NextIntlClientProvider
          messages={pickMessages(messages, ["Common", "Topbar", "A11y", "SubHero"])}
        >
          <AppShell>{children}</AppShell>
          <Footer />
          <NaverBookingFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
