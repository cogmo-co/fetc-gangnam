import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CoachRow from "@/components/CoachRow/CoachRow";
import Detail from "@/components/CoachInfo/Detail";
import { COACHES, findCoach, getSingleCoachSchema } from "@/lib/coaches";

export function generateStaticParams() {
  return COACHES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const coach = findCoach(id, locale);

  if (!coach) return { title: "Coach" };

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const site = t("siteName");

  return {
    title: `${coach.name}${t("coachTitleSuffix")}`,
    description: `${site} ${coach.role} ${coach.name}. ${coach.spec[0] ?? ""}`,
    openGraph: {
      title: `${coach.name} - ${site}`,
      images: [`/images/about/coach/${coach.img}`],
      type: "profile",
    },
  };
}

export default async function CoachPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const coach = findCoach(id, locale);
  if (!coach) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSingleCoachSchema(coach)) }}
      />
      {/* PC: CoachRow에서 모달 자동 열기 (layout이 SubHero 처리) */}
      <div className="pc-only">
        <CoachRow autoOpenCoach={coach} />
      </div>

      {/* Mobile: Detail 풀페이지 (layout이 SubHero/SubNav 숨김) */}
      <div className="mobile-only">
        <Detail coach={coach} />
      </div>
    </>
  );
}