import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./TeamCoachingSystem.module.css";

const CARDS = [
  { title: "SESSION RECORD" },
  { title: "TEAM REVIEW" },
  { title: "NEXT PLAN" },
];

export default function TeamCoachingSystem() {
  const t = useTranslations("TeamCoaching");
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.badge} sr`}>TEAM COACHING SYSTEM</span>

        <p className={`${styles.subtitle} sr`}>
          {t.rich("subtitle", { br: () => <br /> })}
        </p>

        <div className={styles.cards}>
          {CARDS.map((card, i) => (
            <div key={card.title} className={`${styles.card} sr sr-d${i + 1}`}>
              <div className={styles.cardTitle}>{card.title}</div>
              <div className={styles.cardDesc}>{t(`card${i + 1}`)}</div>
            </div>
          ))}
        </div>

        <p className={`${styles.caption} sr`}>
          {t.rich("caption", { br: () => <br /> })}
        </p>

        <Link href="/about/FETC#team-coaching" className={`${styles.detailBtn} sr`}>
          <span className={styles.detailBtnTitle}>TEAM COACHING SYSTEM</span>
          <span className={styles.detailBtnLabel}>{t("detailLink")}</span>
          <svg className={styles.detailBtnArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
