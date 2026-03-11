import type { Metadata } from "next";
import SubHero from "@/components/SubHero/SubHero";
import CardGrid from "@/components/CardGrid/CardGrid";
import styles from "./rehabilitation.module.css";

export const metadata: Metadata = {
  title: "재활 프로그램",
  description:
    "통증의 근본 원인 해결부터 건강한 일상 복귀까지. 단계별 맞춤 재활 프로그램을 제공합니다.",
};

const REHAB_CARDS = [
  { num: "01", title: "정밀 평가 및 원인 분석", body: "정밀한 평가를 바탕으로 통증의 원인, 일상 속 움직임 제한을 분석합니다. 개인의 신체 상태에 맞춘 안전한 재활 로드맵의 첫 단계입니다." },
  { num: "02", title: "가동성 및 감각 회복", body: "통증 부위의 안정화를 바탕으로 정상적인 관절 가동범위를 확보합니다. 굳어있는 근육과 신경계를 깨워 바른 자세와 움직임 감각을 안전하게 복원하는 데 집중합니다." },
  { num: "03", title: "기능 통합", body: "확보된 가동범위 내에서 Flowtics method를 적용하여 기초 체력과 코어의 협응력을 강화합니다. 바른 움직임 패턴을 몸에 인지시켜 일상생활의 기능적 안정성을 구축합니다." },
  { num: "04", title: "일상기능 및 퍼포먼스 복귀", body: "기능운동재활협회 인증 PCC 코치들의 지도 하에 일상과 업무 환경에서 요구되는 다양한 움직임을 훈련합니다. 통증에 대한 두려움 없이 활력 있는 삶으로의 완전한 복귀를 완성합니다." },
];

export default function RehabilitationPage() {
  return (
    <div className="sub-page">
      <SubHero title="REHABILITATION" image="/images/rehabilitation-hero.jpg" />

      <div className={styles.textSection}>
        <p className={`${styles.title} sr`}>
          통증의 근본 원인 해결부터 건강한 일상 복귀까지.<br />
          완벽한 회복을 위한 체계적인 재활을 제공합니다.
        </p>
        <p className={`${styles.body} sr sr-d1`}>
          FE트레이닝센터의 재활 프로그램은 일시적인 통증 완화를 넘어<br />
          신체의 정상적인 기능 회복을 목표로 합니다.<br />
          과학적인 평가 시스템과 단계별 맞춤 훈련을 통해<br />
          재발을 방지하고 안전한 일상 복귀 여정을 설계합니다.
        </p>
      </div>

      <CardGrid cards={REHAB_CARDS} />
    </div>
  );
}
