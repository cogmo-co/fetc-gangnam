import { use } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import CardGrid from "@/components/CardGrid/CardGrid";
import RecommendedFor, { RecommendedItem } from "@/components/RecommendedFor/RecommendedFor";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("performanceTitle"), description: t("performanceDesc") };
}

export default function PerformancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("ProgramPerformance");

  const recommended: RecommendedItem[] = [
    { title: t("rec1Title"), caption: t("rec1Caption") },
    { title: t.rich("rec2", { br: () => <br /> }) },
    { title: t.rich("rec3", { br: () => <br /> }) },
    { title: t.rich("rec4", { br: () => <br /> }) },
  ];

  const cards = [
    { num: "01", title: "Pre-activation", body: t("card1") },
    { num: "02", title: "Dynamic Preparation", body: t("card2") },
    { num: "03", title: "Strength Integration", body: t("card3") },
    { num: "04", title: "Performance", body: t("card4") },
  ];

  return (
    <>
      {/* PERFORMANCE intro — 종목별 프로그램 개요 */}
      <section id="intro" className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>PERFORMANCE</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>{t.rich("intro1", { br: () => <br className="pc-br" /> })}</p>
          <p>{t.rich("intro2", { br: () => <br /> })}</p>
        </div>
      </section>

      {/* FLOWTICS METHOD */}
      <section className={`${styles.intro} ${styles.introAlt}`}>
        <h2 className={`${styles.bigTitle} sr`}>FLOWTICS METHOD</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>{t.rich("flowtics1", { br: () => <br className="pc-br" /> })}</p>
          <p>{t.rich("flowtics2", { br: () => <br /> })}</p>
        </div>
      </section>

      <RecommendedFor items={recommended} />

      <CardGrid cards={cards} />
    </>
  );
}
