import styles from "./TeamCoachingSystem.module.css";

const CARDS = [
  { title: "SESSION RECORD", desc: "세션별 평가·운동 기록" },
  { title: "TEAM REVIEW", desc: "FE 코치팀 공동 검토" },
  { title: "NEXT PLAN", desc: "다음 운동 프로그램 설계" },
];

export default function TeamCoachingSystem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.badge} sr`}>TEAM COACHING SYSTEM</span>

        <p className={`${styles.subtitle} sr`}>
          수업은 한 명의 코치가,
          <br />관리는 FETC코치팀이 함께합니다.
        </p>

        <div className={styles.cards}>
          {CARDS.map((card, i) => (
            <div key={card.title} className={`${styles.card} sr sr-d${i + 1}`}>
              <div className={styles.cardTitle}>{card.title}</div>
              <div className={styles.cardDesc}>{card.desc}</div>
            </div>
          ))}
        </div>

        <p className={`${styles.caption} sr`}>
          담당 코치가 세션을 기록하고,
          <br className={styles.mobileBr} /> FE코치진이 함께 검토해 다음 운동 방향을 결정합니다.
        </p>
      </div>
    </section>
  );
}
