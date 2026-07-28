import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { MeetingIcon, WritingIcon, PlanningIcon } from "@/components/Icons";
import TeamMethodDisclosure from "./TeamMethodDisclosure";
import styles from "./AboutCoaching.module.css";

// PROCESS 카드·WHY 라벨은 로케일 무관 영문 고정 → 하드코딩. 설명 문구만 i18n.
const PROCESS = [
  { step: "PROCESS 01", title: "SESSION RECORD" },
  { step: "PROCESS 02", title: "TEAM REVIEW" },
  { step: "PROCESS 03", title: "NEXT PLAN" },
];
const WHY = ["TEAM INSIGHT", "CONTINUOUS CARE", "ADAPTIVE PLANNING"];

export default function AboutCoaching() {
  const t = useTranslations("AboutCoaching");
  return (
    <section id="team-coaching" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.heading} sr`}>
          FETC TEAM<br />COACHING SYSTEM
        </h2>

        <p className={`${styles.subtitle} sr`}>
          {t.rich("subtitle", { br: () => <br />, b: (c) => <b>{c}</b> })}
        </p>

        <p className={`${styles.intro} sr`}>
          {t.rich("intro", { br: () => <br /> })}
        </p>

        <div className={`${styles.processGrid} sr`}>
          {PROCESS.map((p, i) => (
            <Fragment key={p.step}>
              {i > 0 && (
                <span className={styles.connector} aria-hidden="true">
                  <svg width="60" height="60" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              <div className={styles.processCard}>
                <div className={styles.processStep}>{p.step}</div>
                {p.title === "SESSION RECORD" && (
                  <span className={styles.processIcon} aria-hidden="true">
                    <WritingIcon />
                  </span>
                )}
                {p.title === "TEAM REVIEW" && (
                  <span className={`${styles.processIcon} ${styles.iconMeeting}`} aria-hidden="true">
                    <MeetingIcon />
                  </span>
                )}
                {p.title === "NEXT PLAN" && (
                  <span className={styles.processIcon} aria-hidden="true">
                    <PlanningIcon />
                  </span>
                )}
                <div className={styles.processTitle}>{p.title}</div>
                <span className={styles.processLine} />
                <p className={styles.processDesc}>
                  {t.rich(`process${i + 1}`, { br: () => <br /> })}
                </p>
              </div>
            </Fragment>
          ))}
        </div>

        <TeamMethodDisclosure trigger={t("whyQuestion")} note={t("teamMethodNote")} />

        <div className={`${styles.whyBlock} sr`}>
          <div className={styles.whyLabel}>
            <svg
              className={styles.whyBubble}
              viewBox="0 0 320 140"
              preserveAspectRatio="none"
              overflow="visible"
              aria-hidden="true"
            >
              <path
                d="M34 2 H282 Q314 2 314 34 V58 L346 70 L314 82 V106 Q314 138 282 138 H34 Q2 138 2 106 V34 Q2 2 34 2 Z"
                fill="rgba(255,255,255,0.05)"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className={styles.whyLabelLine}>WHY</span>
            <span className={styles.whyLabelLine}>TEAM COACHING?</span>
          </div>
          <ul className={styles.whyList}>
            {WHY.map((title, i) => (
              <li key={title} className={styles.whyItem}>
                <span className={styles.whyTitle}>{title}</span>
                <span className={styles.whyDesc}>{t(`why${i + 1}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={`${styles.caption} sr`}>
          {t.rich("caption", { b: (c) => <b>{c}</b> })}
        </p>
      </div>
    </section>
  );
}
