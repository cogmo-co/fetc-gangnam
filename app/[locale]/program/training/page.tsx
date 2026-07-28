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
  return { title: t("trainingTitle"), description: t("trainingDesc") };
}

export default function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("ProgramTraining");

  const recommended: RecommendedItem[] = [
    { title: t.rich("rec1", { br: () => <br /> }) },
    { title: t.rich("rec2", { br: () => <br /> }) },
    { title: t.rich("rec3", { br: () => <br /> }) },
    { title: t.rich("rec4", { br: () => <br /> }) },
  ];

  const cards = [
    { num: "01", title: t("card1Title"), body: t("card1Body") },
    { num: "02", title: t("card2Title"), body: t("card2Body") },
    { num: "03", title: t("card3Title"), body: t("card3Body") },
    { num: "04", title: t("card4Title"), body: t("card4Body") },
  ];

  return (
    <>
      <section id="intro" className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>TRAINING</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>{t.rich("intro1", { br: () => <br className="pc-br" /> })}</p>
          <p>{t.rich("intro2", { br: () => <br className="pc-br" /> })}</p>
        </div>
      </section>

      <RecommendedFor items={recommended} />

      <CardGrid cards={cards} />
    </>
  );
}
