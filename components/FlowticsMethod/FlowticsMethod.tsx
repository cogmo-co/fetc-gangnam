import Link from "next/link";
import styles from "./FlowticsMethod.module.css";

const STAGES = [
  { name: "Pre-activation", desc: "신체 · 신경계 활성화" },
  { name: "Dynamic preparation", desc: "움직임 가능성 탐색" },
  { name: "Strength Integration", desc: "힘과 움직임의 통합" },
  { name: "Performance", desc: "경기력 · 일상 활력" },
];

// TODO: /program/* 라우팅 신설 시 href 교체
const PROGRAMS = [
  { label: "PERFORMANCE", href: "/performance" },
  { label: "TRAINING", href: "/training" },
  { label: "REHABILITATION", href: "/rehabilitation" },
];

export default function FlowticsMethod() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.title} sr`}>Flowtics Method</h2>

        <div className={styles.stages}>
          {STAGES.map((stage, i) => (
            <div key={stage.name} className={`${styles.stage} sr sr-d${i + 1}`}>
              <div className={styles.stageName}>{stage.name}</div>
              <div className={styles.stageDesc}>{stage.desc}</div>
            </div>
          ))}
        </div>

        <div className={styles.description}>
          <p>
            Flowtics method는 올림픽 레벨 선수의 훈련, 관리 방식을 바탕으로 설계된 4단계 프로그램입니다.
          </p>
          <p>
            회복부터 경기력 향상까지, 회원님의 여정을 체계적으로 관리하도록 설계되었습니다.
          </p>
        </div>

        <div className={styles.programLink}>
          <p className={styles.programIntro}>FE트레이닝센터의 Flowtics method는</p>
          <div className={styles.programButtons}>
            {PROGRAMS.map((p, i) => (
              <Link
                key={p.label}
                href={p.href}
                className={`${styles.programBtn} sr sr-d${i + 1}`}
              >
                <span className={styles.hash}>#</span>
                {p.label}
              </Link>
            ))}
          </div>
          <p className={styles.programOutro}>3가지 프로그램에 적용됩니다.</p>
        </div>
      </div>
    </section>
  );
}