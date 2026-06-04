"use client";

import { usePathname } from "next/navigation";
import SubHero from "@/components/SubHero/SubHero";
import AboutSubNav from "@/components/AboutSubNav/AboutSubNav";

type HeroEntry = {
  title: string;
  subtitle: string;
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
    subtitle: "강남 선수재활 ∙ 퍼포먼스 트레이닝 | FE트레이닝센터 강남점",
    image: "/images/about/fetc/hero.jpg",
    half: true,
  },
  "/about/coach": {
    title: "ABOUT FETC",
    subtitle: "강남 선수재활 ∙ 퍼포먼스 트레이닝 | FE트레이닝센터 강남점",
    image: "/images/about/fetc/why_fetc_01.jpg",
    half: true,
  },
  "/about/facility": {
    title: "ABOUT FETC",
    subtitle: "강남 선수재활 ∙ 퍼포먼스 트레이닝 | FE트레이닝센터 강남점",
    image: "/images/about/facility/hero.jpg",
    half: true,
  },
  // TODO: /about/location 추가 시 여기 등록
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hero = HERO[pathname];

  return (
    <div className="sub-page">
      {hero && (
        <>
          <SubHero
            title={hero.title}
            subtitle={hero.subtitle}
            image={hero.image}
            half={hero.half}
          />
          <AboutSubNav />
        </>
      )}
      {children}
    </div>
  );
}