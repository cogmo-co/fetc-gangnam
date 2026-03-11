import type { Metadata } from "next";
import SubHero from "@/components/SubHero/SubHero";
import CardGrid from "@/components/CardGrid/CardGrid";
import styles from "./performance.module.css";

export const metadata: Metadata = {
  title: "퍼포먼스 트레이닝",
  description:
    "올림픽 레벨 선수 훈련 기반 Flowtics method 4단계 프로그램. 최상의 퍼포먼스를 위한 전략적 트레이닝.",
};

const PERFORMANCE_CARDS = [
  { num: "01", title: "Pre-activation", body: "마사지와 스트레칭을 통해 신체와 신경계를 깨워 움직임을 시작할 감각을 되살리는 단계입니다." },
  { num: "02", title: "Dynamic Preparation", body: "다양한 제약기반의 움직임과 리듬, 밸런스 훈련으로 움직임의 가능성을 탐색하고 퍼포먼스 모드로 전환합니다." },
  { num: "03", title: "Strength Integration", body: "강화된 힘을 움직임 속에 통합하여 기능적인 퍼포먼스로 연결하는 단계입니다." },
  { num: "04", title: "Performance", body: "준비된 신체와 움직임을 경기력, 생활의 활력으로 확장합니다. 훈련의 모든 과정이 실제 퍼포먼스로 이어집니다." },
];

export default function PerformancePage() {
  return (
    <div className="sub-page">
      <SubHero title="PERFORMANCE" image="/images/performance-hero.jpg" />

      <div className={styles.textSection}>
        <div className={`${styles.methodTitle} sr`}>FLOWTICS METHOD</div>
        <p className={`${styles.methodBody} sr sr-d1`}>
          Flowtics method는 올림픽 레벨 선수들의<br />
          실제 훈련과 관리방식을 바탕으로 만들어진 4단계 프로그램입니다.<br /><br />
          훈련 주기에 따라 몸을 깨우고 움직임을 준비하며,<br />
          자신에게 맞는 움직임을 찾아 힘과 균형을 길러가는 과정입니다.<br />
          회복부터 경기력 향상까지<br />
          선수의 여정을 체계적으로 관리하도록 설계되었습니다.
        </p>
      </div>

      <CardGrid cards={PERFORMANCE_CARDS} />
    </div>
  );
}
