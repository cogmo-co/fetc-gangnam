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
      </div>
    </section>
  );
}
