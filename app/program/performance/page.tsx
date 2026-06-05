import type { Metadata } from "next";
import CardGrid from "@/components/CardGrid/CardGrid";
import RecommendedFor, { RecommendedItem } from "@/components/RecommendedFor/RecommendedFor";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "퍼포먼스 트레이닝",
  description:
    "올림픽 레벨 선수 훈련 기반 Flowtics method 4단계 프로그램. 최상의 퍼포먼스를 위한 전략적 트레이닝.",
};

const PERFORMANCE_RECOMMENDED: RecommendedItem[] = [
  {
    title: "시즌 전 ∙ 중 ∙ 후 컨디셔닝과 종목 특성을 고려한 맞춤 트레이닝이 필요한 프로, 세미프로 선수",
    caption: "야구 ∙ 축구 ∙ 골프 ∙ 테니스 ∙ 스노보드 ∙ 스키 등",
  },
  {
    title: (
      <>
        기록 단축, 비거리∙구속∙점프력 등 측정 가능한 퍼포먼스 지표를 끌어올리고자 하는 선수,
        <br />
        또는 수술, 통증으로 한 시즌 이상 비운 후 동일 부상 재발 없이 안전한 복귀를 준비하는 선수
      </>
    ),
  },
  {
    title: (
      <>
        골프 싱글, 풀코스 마라톤, 테니스 동호인 대회 및 복싱∙주짓수 등 격투기 시합, 보디빌딩 등
        <br />
        분명한 목표를 가진 진지한 아마추어 운동인
      </>
    ),
  },
  {
    title: (
      <>
        엘리트 체고∙실업팀∙프로진출을 준비하는 유소년∙청소년 학생 선수,
        <br />
        또는 표준화된 컨디셔닝 시스템이 필요한 선수단과 구단 및 동호회
      </>
    ),
  },
];

const PERFORMANCE_CARDS = [
  { num: "01", title: "Pre-activation", body: "마사지와 스트레칭을 통해 신체와 신경계를 깨워 움직임을 시작할 감각을 되살리는 단계입니다." },
  { num: "02", title: "Dynamic Preparation", body: "다양한 제약기반의 움직임과 리듬, 밸런스 훈련으로 움직임의 가능성을 탐색하고 퍼포먼스 모드로 전환합니다." },
  { num: "03", title: "Strength Integration", body: "강화된 힘을 움직임 속에 통합하여 기능적인 퍼포먼스로 연결하는 단계입니다." },
  { num: "04", title: "Performance", body: "준비된 신체와 움직임을 경기력, 생활의 활력으로 확장합니다. 훈련의 모든 과정이 실제 퍼포먼스로 이어집니다." },
];

export default function PerformancePage() {
  return (
    <>
      {/* PERFORMANCE intro — 종목별 프로그램 개요 */}
      <section id="intro" className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>PERFORMANCE</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>
            야구, 축구, 골프, 스노보드, 스키 등 종목별 특성에 맞춘 
            <br className="pc-br" />
            {" "}개인화된 퍼포먼스 프로그램을 제공합니다.
          </p>
          <p>
            평창동계올림픽 스노보드 국가대표팀,
            <br className="pc-br" />
            {" "}프리스타일 스키 국가대표 상비군부터 피겨스케이팅, 배구, 축구, 골프 등
            <br />
            다양한 종목의 국가대표 및 엘리트 선수들의 트레이닝 경험을 바탕으로
            <br className="pc-br" />
            {" "}선수 개인의 시즌 컨디션, 경기 일정, 부상 이력을 종합적으로 고려한 주기화 프로그램을 설계합니다.
          </p>
        </div>
      </section>

      {/* FLOWTICS METHOD */}
      <section className={`${styles.intro} ${styles.introAlt}`}>
        <h2 className={`${styles.bigTitle} sr`}>FLOWTICS METHOD</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>
            Flowtics method는 올림픽 레벨 선수들의
            <br className="pc-br" />
            {" "}실제 훈련과 관리방식을 바탕으로 만들어진 4단계 프로그램입니다.
          </p>
          <p>
            훈련 주기에 따라 몸을 깨우고 움직임을 준비하며,
            <br className="pc-br" />
            {" "}자신에게 맞는 움직임을 찾아 힘과 균형을 길러가는 과정입니다.
            <br />
            회복부터 경기력 향상까지 선수의 여정을 체계적으로 관리하도록 설계되었습니다.
          </p>
        </div>
      </section>

      <RecommendedFor items={PERFORMANCE_RECOMMENDED} />

      <CardGrid cards={PERFORMANCE_CARDS} />
    </>
  );
}