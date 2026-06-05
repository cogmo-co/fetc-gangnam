import type { Metadata } from "next";
import Image from "next/image";
import CardGrid from "@/components/CardGrid/CardGrid";
import RecommendedFor, { RecommendedItem } from "@/components/RecommendedFor/RecommendedFor";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "재활 프로그램",
  description:
    "FETC 강남점 재활 프로그램 — 수술 후, 만성 통증, 자세교정까지. FEA 평가 + Flowtics method 4단계로 일상 복귀까지 체계적 관리.",
};

const REHAB_TRACKS = [
  {
    badge: "수술 후 재활",
    image: "/images/program/rehabilitation/post_op_rehab.jpg",
    body: (
      <>
        회전근개 ∙ 전방십자인대(ACL) ∙ 반월상연골 ∙ 아킬레스건 등 수술 후 단계별
        <br className="pc-br" />
        {" "}가동성 회복과 기능 통합 프로그램
      </>
    ),
  },
  {
    badge: "만성 관절 ∙ 통증 재활",
    image: "/images/program/rehabilitation/chronic_pain_rehab.jpg",
    body: (
      <>
        어깨∙허리∙무릎∙발목 등 반복되는 통증의 원인을 평가하고 일상 동작까지
        <br className="pc-br" />
        {" "}안전하게 복귀시키는 프로그램
      </>
    ),
  },
  {
    badge: "자세교정 ∙ 비수술 재활",
    image: "/images/program/rehabilitation/non_op_rehab.jpg",
    body: (
      <>
        거북목∙라운드숄더∙골반 비대칭 등
        <br className="pc-br" />
        {" "}자세 기인 통증을 움직임 패턴
        <br className="pc-br" />
        {" "}교정으로 해결
      </>
    ),
  },
];

const REHAB_RECOMMENDED: RecommendedItem[] = [
  {
    title: (
      <>
        회전근개∙전방십자인대(ACL)∙반월상연골∙아킬레스건∙고관절 등
        <br />
        정형외과 수술 후 단계별 가동성 회복과 일상∙스포츠 복귀가 필요하신 분
      </>
    ),
  },
  {
    title: (
      <>
        어깨∙허리∙무릎∙발목∙고관절의 만성 통증이 6개월 이상 지속되거나,
        <br />
        허리디스크∙척추관협착증∙오십견∙회전근개 충돌증후군∙골퍼엘보∙테니스엘보 등
        <br />
        진단을 받고 수술 대신 운동 재활을 선택하시는 분
      </>
    ),
  },
  {
    title: (
      <>
        거북목∙라운드숄더∙골반 비대칭∙척추측만 등 자세 기인 통증으로 물리치료∙도수치료를 받았지만
        <br />
        같은 부위가 반복적으로 아프거나, 운동을 다시 시작하면 통증이 재발하는 분
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

const REHAB_CARDS = [
  { num: "01", title: "정밀 평가 및 원인 분석", body: "정밀한 평가를 바탕으로 통증의 원인, 일상 속 움직임 제한을 분석합니다. 개인의 신체 상태에 맞춘 안전한 재활 로드맵의 첫 단계입니다." },
  { num: "02", title: "가동성 및 감각 회복", body: "통증 부위의 안정화를 바탕으로 정상적인 관절 가동범위를 확보합니다. 굳어있는 근육과 신경계를 깨워 바른 자세와 움직임 감각을 안전하게 복원하는 데 집중합니다." },
  { num: "03", title: "기능 통합", body: "확보된 가동범위 내에서 Flowtics method를 적용하여 기초 체력과 코어의 협응력을 강화합니다. 바른 움직임 패턴을 몸에 인지시켜 일상생활의 기능적 안정성을 구축합니다." },
  { num: "04", title: "일상기능 및 퍼포먼스 복귀", body: "기능운동재활협회 인증 PCC 코치들의 지도 하에 일상과 업무 환경에서 요구되는 다양한 움직임을 훈련합니다. 통증에 대한 두려움 없이 활력 있는 삶으로의 완전한 복귀를 완성합니다." },
];

export default function RehabilitationPage() {
  return (
    <>
      <section id="intro" className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>REHABILITATION</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>
            운동 재활은 수술이나 통증 이후 단순 휴식이나 일시적 처치로 끝나지 않고
            <br className="pc-br" />
            {" "}신체의 기능과 움직임을 단계적으로 회복시켜 일상과 스포츠로 안전하게 복귀하도록
            <br className="pc-br" />
            {" "}설계된 운동입니다. FE트레이닝센터는 정형외과 수술 후 재활, 만성∙관절 통증의 비수술 재활,
            <br className="pc-br" />
            {" "}자세 기인 통증의 교정 재활을 모두 다루며, FE트레이닝센터만의 정확한 FEA 평가와
            <br className="pc-br" />
            {" "}Flowtics method 4단계 프로세스로 통증 완화부터 완전한 일상 복귀까지를 체계적으로 관리합니다.
          </p>
        </div>
      </section>

      <section className={styles.tracks}>
        <div className={styles.tracksGrid}>
          {REHAB_TRACKS.map((track, i) => (
            <div key={track.badge} className={`${styles.track} sr sr-d${i + 1}`}>
              <div className={styles.trackBadge}>{track.badge}</div>
              <div className={styles.trackImage}>
                <Image
                  src={track.image}
                  alt={track.badge}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className={styles.trackBody}>{track.body}</p>
            </div>
          ))}
        </div>
      </section>

      <RecommendedFor items={REHAB_RECOMMENDED} />

      <CardGrid cards={REHAB_CARDS} />
    </>
  );
}