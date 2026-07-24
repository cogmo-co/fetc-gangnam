import Link from "next/link";
import styles from "./FlowticsMethod.module.css";

const STAGES = [
  { no: "01", name: "Pre-Activation", desc: "신체·신경계 활성화" },
  { no: "02", name: "Dynamic Preparation", desc: "움직임 가능성 탐색" },
  { no: "03", name: "Strength Integration", desc: "힘과 움직임의 통합" },
  { no: "04", name: "Performance", desc: "경기력·일상 활력" },
];

const PROGRAMS = [
  { label: "PERFORMANCE", href: "/program/performance" },
  { label: "TRAINING", href: "/program/training" },
  { label: "REHABILITATION", href: "/program/rehabilitation" },
];

export default function FlowticsMethod() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.badge} sr`}>FE TRAINING SYSTEM</span>

        <h2 className={`${styles.title} sr`}>Flowtics Method</h2>

        <p className={`${styles.subtitle} sr`}>
          회복부터 퍼포먼스까지,
          <br />한 팀의 기준으로 설계합니다.
        </p>

        <div className={`${styles.description} sr`}>
          <p>
            Flowtics Methods는 올림픽 레벨 선수의 훈련·관리 방식을
            <br />바탕으로 만든 FETC의 4단계 트레이닝 시스템입니다.
          </p>
          <p>
            매주 코치진이 회원의 평가와 운동 기록을 함께 검토합니다.
            <br />검토한 내용과 현재 상태와 변화를 바탕으로
            <br className={styles.mobileBr} /> 가장 적합한 다음 단계를 결정합니다.
          </p>
        </div>

        <div className={styles.stages}>
          {STAGES.map((stage, i) => (
            <div key={stage.name} className={`${styles.stage} sr sr-d${i + 1}`}>
              <div className={styles.stageNo}>{stage.no}</div>
              <div className={styles.stageName}>{stage.name}</div>
              <div className={styles.stageDesc}>{stage.desc}</div>
            </div>
          ))}
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