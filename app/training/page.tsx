import type { Metadata } from "next";
import SubHero from "@/components/SubHero/SubHero";
import CardGrid from "@/components/CardGrid/CardGrid";
import styles from "./training.module.css";

export const metadata: Metadata = {
  title: "트레이닝",
  description:
    "근거 기반 평가와 기능 중심 트레이닝. FETC만의 Flowtics method로 체계적인 변화를 만들어갑니다.",
};

const TRAINING_CARDS = [
  {
    num: "01",
    title: "근거 기반의 평가",
    body: (
      <>
        모든 트레이닝은 정확한 평가에서 시작됩니다.<br />
        FEARA의 FEA시스템을 통해 움직임과 기능을<br />
        과학적으로 분석하고, 개인의 현재 상태에 맞는<br />
        맞춤 로드맵을 설계합니다.
      </>
    ),
  },
  {
    num: "02",
    title: "기능 중심의 트레이닝",
    body: (
      <>
        단순한 근력 향상이 아닌, 움직임의 질을 높이고<br />
        신체의 기능적 연결을 회복하는 데 초점을 둡니다.<br />
        Flowtics method를 통해 퍼포먼스와<br />
        회복을 함께 다룹니다.
      </>
    ),
  },
  {
    num: "03",
    title: "주기화된 성장 여정",
    body: (
      <>
        훈련은 반복이 아니라 과정입니다.<br />
        구분된 주기화 프로그램을 통해 회복기부터<br />
        시즌 퍼포먼스까지 체계적인 변화를<br />
        이끌어갑니다.
      </>
    ),
  },
  {
    num: "04",
    title: "표준화된 코칭 네트워크",
    body: (
      <>
        FEARA 인증 PCC코치들이 이끄는 FE Training은<br />
        어디서나 동일한 평가기준과 코칭 품질을 제공합니다.<br />
        신뢰할 수 있는 시스템이 곧 실력을 만듭니다.
      </>
    ),
  },
];

export default function TrainingPage() {
  return (
    <div className="sub-page">
      <SubHero title="TRAINING" image="/images/training-hero.jpg" />

      <div className={styles.textSection}>
        <p className={`${styles.text} sr`}>
          더 강하게, 더 빠르게, 더 정확하게<br />
          움직이기 위한 트레이닝을 제공합니다.
        </p>
      </div>

      <CardGrid cards={TRAINING_CARDS} dividerColor="#971C1F" />
    </div>
  );
}
