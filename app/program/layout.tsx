"use client";

import { usePathname } from "next/navigation";
import SubHero from "@/components/SubHero/SubHero";
import ProgramSubNav from "@/components/ProgramSubNav/ProgramSubNav";

type HeroEntry = {
  title: string;
  subtitle: string;
  image: string;
  half?: boolean;
};

// 3 sub-page별 SubHero 콘텐츠.
// 새 sub-page 추가 시 이 맵에 한 줄 추가.
// title은 3 sub-page 공통 "PROGRAM" — 시각적 브랜드 앵커.
// subtitle/image는 페이지별로 다르게 → 페이지 정체성·SEO unique.
const HERO: Record<string, HeroEntry> = {
  "/program/performance": {
    title: "PROGRAM",
    subtitle: "선수 트레이닝의 기준, Flowtics method | FE트레이닝센터 강남점",
    image: "/images/program/performance/hero.jpg",
    half: true,
  },
  "/program/training": {
    title: "PROGRAM",
    subtitle: "FEA 평가 기반 기능성 트레이닝 | FE트레이닝센터 강남점",
    image: "/images/program/training/hero.jpg",
    half: true,
  },
  "/program/rehabilitation": {
    title: "PROGRAM",
    subtitle: "수술 후 재활 ∙ 만성 통증 ∙ 자세교정 재활 | FE트레이닝센터 강남점",
    image: "/images/program/rehabilitation/hero.jpg",
    half: true,
  },
};

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
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
          <ProgramSubNav />
        </>
      )}
      {children}
    </div>
  );
}