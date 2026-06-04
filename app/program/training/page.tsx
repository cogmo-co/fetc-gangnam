import type { Metadata } from "next";
import CardGrid from "@/components/CardGrid/CardGrid";
import RecommendedFor, { RecommendedItem } from "@/components/RecommendedFor/RecommendedFor";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "기능성 트레이닝",
  description:
    "FETC 강남점 기능성 트레이닝 — FEA 평가로 움직임 제한을 파악하고 Flowtics method 4단계로 단계적 기능 강화.",
};

const TRAINING_RECOMMENDED: RecommendedItem[] = [
  {
    title: (
      <>
        여러 헬스장과 PT를 거쳤지만 자세가 무너졌거나 같은 부위의 통증이 반복되어
        <br />
        정확한 평가로 본인의 신체 상태를 객관적으로 파악하고 운동을 다시 시작하고 싶으신 분
      </>
    ),
  },
  {
    title: (
      <>
        장시간 좌식 근무로 거북목∙라운드숄더∙골반 비대칭∙일자목 등이 진행된 직장인,
        <br />
        체형 교정과 기초 체력을 동시에 끌어올리고 싶으신 분
      </>
    ),
  },
  {
    title: (
      <>
        출산 후 코어와 골반 회복이 필요한 산모,
        <br />
        또는 갱년기 이후 근력 및 균형감각, 체력 저하를 관리하고 싶으신 분
      </>
    ),
  },
  {
    title: (
      <>
        운동 경험이 거의 없거나 부상 이력이 있어 무리 없는 강도부터 단계별로 시작하고 싶은 초보자,
        <br />
        그리고 골프∙러닝 등 취미 스포츠를 위한 베이스 체력이 필요한 분
      </>
    ),
  },
];

const TRAINING_CARDS = [
  {
    num: "01",
    title: "Pre-activation",
    body: "마사지와 스트레칭을 통해 신체와 신경계를 깨워 움직임을 시작할 감각을 되살리는 단계입니다.",
  },
  {
    num: "02",
    title: "Dynamic Preparation",
    body: "다양한 제약기반의 움직임과 리듬, 밸런스 훈련으로 움직임의 가능성을 탐색하고 퍼포먼스 모드로 전환합니다.",
  },
  {
    num: "03",
    title: "Strength Integration",
    body: "강화된 힘을 움직임 속에 통합하여 기능적인 퍼포먼스로 연결하는 단계입니다.",
  },
  {
    num: "04",
    title: "Performance",
    body: "준비된 신체와 움직임을 경기력, 생활의 활력으로 확장합니다. 훈련의 모든 과정이 실제 퍼포먼스로 이어집니다.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <section id="intro" className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>TRAINING</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>
            기능성 트레이닝(Functional Training)은 단순 근력 강화 이상으로
            <br className="pc-br" />
            {" "}신체의 움직임 패턴, 관절 가동성, 신경계 협응을 종합적으로 회복시키는 운동입니다.
          </p>
          <p>
            FETC만의 FEA 평가로 개인의 움직임 제한 요소를 파악한 뒤,
            <br className="pc-br" />
            {" "}Flowtics method 4단계를 통해 일상생활부터 스포츠 퍼포먼스까지
            <br className="pc-br" />
            {" "}필요한 기능을 단계적으로 강화합니다.
          </p>
        </div>
      </section>

      <RecommendedFor items={TRAINING_RECOMMENDED} />

      <CardGrid cards={TRAINING_CARDS} />
    </>
  );
}