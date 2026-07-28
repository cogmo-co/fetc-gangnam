import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./FlowticsMethod.module.css";

const STAGES = [
  { no: "01", name: "Pre-Activation" },
  { no: "02", name: "Dynamic Preparation" },
  { no: "03", name: "Strength Integration" },
  { no: "04", name: "Performance" },
];

const PROGRAMS = [
  { label: "PERFORMANCE", href: "/program/performance" },
  { label: "TRAINING", href: "/program/training" },
  { label: "REHABILITATION", href: "/program/rehabilitation" },
];

export default function FlowticsMethod() {
  const t = useTranslations("FlowticsMethod");
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.badge} sr`}>FE TRAINING SYSTEM</span>

        <h2 className={`${styles.title} sr`}>Flowtics Method</h2>

        <p className={`${styles.subtitle} sr`}>
          {t.rich("subtitle", { br: () => <br /> })}
        </p>

        <div className={`${styles.description} sr`}>
          <p>{t.rich("desc1", { br: () => <br /> })}</p>
          <p>
            {t.rich("desc2", {
              br: () => <br />,
              brm: () => <br className={styles.mobileBr} />,
            })}
          </p>
        </div>

        <div className={styles.stages}>
          {STAGES.map((stage, i) => (
            <div key={stage.name} className={`${styles.stage} sr sr-d${i + 1}`}>
              <div className={styles.stageNo}>{stage.no}</div>
              <div className={styles.stageName}>{stage.name}</div>
              <div className={styles.stageDesc}>{t(`stage${i + 1}`)}</div>
            </div>
          ))}
        </div>

        <div className={styles.programLink}>
          <p className={styles.programIntro}>{t("programIntro")}</p>
          <div className={styles.programButtons}>
            {PROGRAMS.map((p, i) => (
              <Link
                key={p.label}
                href={p.href}
                className={`${styles.programBtn} sr sr-d${i + 1}`}
              >
                {p.label}
              </Link>
            ))}
          </div>
          <p className={styles.programOutro}>{t("programOutro")}</p>
        </div>
      </div>
    </section>
  );
}