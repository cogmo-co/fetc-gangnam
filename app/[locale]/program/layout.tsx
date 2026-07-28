"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SubHero from "@/components/SubHero/SubHero";
import ProgramSubNav from "@/components/ProgramSubNav/ProgramSubNav";
import { useResetScrollOnRouteChange } from "@/hooks/useResetScrollOnRouteChange";

type HeroEntry = {
  title: string;
  subtitleKey: string;
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
    subtitleKey: "SubHero.programPerformance",
    image: "/images/program/performance/hero.jpg",
    half: true,
  },
  "/program/training": {
    title: "PROGRAM",
    subtitleKey: "SubHero.programTraining",
    image: "/images/program/training/hero.jpg",
    half: true,
  },
  "/program/rehabilitation": {
    title: "PROGRAM",
    subtitleKey: "SubHero.programRehab",
    image: "/images/program/rehabilitation/hero.jpg",
    half: true,
  },
};

export default function ProgramLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();
  const hero = HERO[pathname];

  useResetScrollOnRouteChange();

  return (
    <div className="sub-page">
      {hero && (
        <>
          <SubHero
            title={hero.title}
            subtitle={t(hero.subtitleKey)}
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