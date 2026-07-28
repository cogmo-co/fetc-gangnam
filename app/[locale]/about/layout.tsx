"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SubHero from "@/components/SubHero/SubHero";
import AboutSubNav from "@/components/AboutSubNav/AboutSubNav";
import { useResetScrollOnRouteChange } from "@/hooks/useResetScrollOnRouteChange";
import styles from "./layout.module.css";

type HeroEntry = {
  title: string;
  image: string;
  half?: boolean;
};

// 4 sub-page별 SubHero 콘텐츠.
// 새 sub-page 추가 시 이 맵에 한 줄 추가.
// title은 4 sub-page 공통 "ABOUT" — 시각적 브랜드 앵커.
// subtitle/image는 페이지별로 다르게 → 페이지 정체성·SEO unique.
const HERO: Record<string, HeroEntry> = {
  "/about/FETC": {
    title: "ABOUT FETC",
    image: "/images/about/fetc/hero.jpg",
    half: true,
  },
  "/about/coach": {
    title: "ABOUT FETC",
    image: "/images/about/fetc/why_fetc_01.jpg",
    half: true,
  },
  "/about/facility": {
    title: "ABOUT FETC",
    image: "/images/about/facility/hero.jpg",
    half: true,
  },
  "/about/location": {
    title: "ABOUT FETC",
    image: "/images/about/location/hero.jpg",
    half: true,
  },
};

/**
 * pathname에서 HERO entry 찾기.
 * 정확 매칭 우선, 없으면 부모 섹션 경로로 fallback (`/about/facility/vald` → `/about/facility`).
 */
function findHero(pathname: string): HeroEntry | undefined {
  if (HERO[pathname]) return HERO[pathname];
  // /about/{section}/[...] → /about/{section} fallback
  const segments = pathname.split("/");
  if (segments.length >= 3) {
    const parent = segments.slice(0, 3).join("/");
    return HERO[parent];
  }
  return undefined;
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();
  const hero = findHero(pathname);
  // detail 페이지 (e.g., /about/facility/vald, /about/coach/[id]) — depth 4+
  // 모바일에선 SubHero·SubNav 숨김 (focused detail 뷰), PC는 유지
  const isDetailPage = pathname.split("/").length > 3;

  useResetScrollOnRouteChange();

  return (
    <div className="sub-page">
      {hero && (
        <div
          className={`${styles.heroWrap} ${isDetailPage ? styles.heroWrapDetailHide : ""}`}
        >
          <SubHero
            title={hero.title}
            subtitle={t("SubHero.about")}
            image={hero.image}
            half={hero.half}
          />
          <AboutSubNav />
        </div>
      )}
      {children}
    </div>
  );
}