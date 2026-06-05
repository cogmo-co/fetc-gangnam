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