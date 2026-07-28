import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
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
  return { title: t("rehabTitle"), description: t("rehabDesc") };
}

const TRACK_IMAGES = [
  "/images/program/rehabilitation/post_op_rehab.jpg",
  "/images/program/rehabilitation/chronic_pain_rehab.jpg",
  "/images/program/rehabilitation/non_op_rehab.jpg",
];

export default function RehabilitationPage() {
  const t = useTranslations("ProgramRehab");

  const tracks = [
    { badge: t("track1Badge"), image: TRACK_IMAGES[0], body: t.rich("track1Body", { br: () => <br /> }) },
    { badge: t("track2Badge"), image: TRACK_IMAGES[1], body: t.rich("track2Body", { br: () => <br /> }) },
    { badge: t("track3Badge"), image: TRACK_IMAGES[2], body: t.rich("track3Body", { br: () => <br /> }) },
  ];

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
        <h2 className={`${styles.bigTitle} sr`}>REHABILITATION</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>{t.rich("intro", { br: () => <br className="pc-br" /> })}</p>
        </div>
      </section>

      <section className={styles.tracks}>
        <div className={styles.tracksGrid}>
          {tracks.map((track, i) => (
            <div key={i} className={`${styles.track} sr sr-d${i + 1}`}>
              <div className={styles.trackBadge}>{track.badge}</div>
              <div className={styles.trackImage}>
                <Image
                  src={track.image}
                  alt={track.badge}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className={styles.trackBody}>{track.body}</p>
            </div>
          ))}
        </div>
      </section>

      <RecommendedFor items={recommended} />

      <CardGrid cards={cards} />
    </>
  );
}
