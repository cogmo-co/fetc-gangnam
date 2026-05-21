"use client";

import { useState } from "react";
import Script from "next/script";
import styles from "./FAQSection.module.css";

const FAQS = [
  {
    q: "FE트레이닝센터는 어떤 곳인가요?",
    a: "FE트레이닝센터(FETC)는 국가대표·프로 선수들이 신뢰하는 재활 및 퍼포먼스 트레이닝 센터입니다. 기능운동재활협회(FEARA)가 인증한 PCC 코치들이 자체 개발한 Flowtics method를 적용하여, 단순한 운동이 아닌 움직임의 질과 신체 기능을 회복시키는 4단계 맞춤 프로그램을 제공합니다. 강남점을 비롯해 송파·공릉·천안 4개 지점을 운영 중이며, 2018 평창동계올림픽 스노보드 국가대표팀, 근대5종 국가대표팀 등 다양한 종목의 국가대표 트레이너 출신, 물리치료사 출신 코치진이 직접 지도합니다.",
  },
  {
    q: "일반인도 이용할 수 있나요?",
    a: "물론입니다. FETC의 회원 중 다수는 일반인이며, 일상 속 통증 재활, 자세 교정, 수술 후 회복, 체형 개선, 골프·러닝 등 취미 스포츠의 체력 향상을 목표로 방문하십니다. 첫 방문 시 FEA시스템 기반 정밀 평가를 통해 현재 신체 상태와 움직임 패턴을 분석한 뒤, 선수에게 적용하는 동일한 과학적 방법론을 일반인의 라이프스타일과 목표에 맞게 적용한 맞춤 프로그램을 설계해 드립니다. 운동 경험이 없는 분, 부상 회복 중인 분, 만성 통증이 있는 분도 안전하게 시작할 수 있도록 단계별로 강도와 운동 종류를 조절합니다.",
  },
  {
    q: "일반 헬스장 PT와 무엇이 다른가요?",
    a: "일반 PT가 근력 강화와 체형 변화를 1차 목표로 한다면, FETC는 '근거 기반 평가 → 기능 회복 → 퍼포먼스 통합'의 체계적인 과정을 거칩니다. 모든 트레이닝은 FEA시스템 평가에서 시작해 움직임의 제한 요소를 파악하고, 회복기·기초 체력·시즌 퍼포먼스 등 목적에 따른 주기화(periodization) 프로그램을 운영합니다. 또한 모든 코치가 기능운동재활협회(FEARA) 인증 PCC 자격을 보유해 어느 지점에서나 동일한 평가 기준과 코칭 품질을 제공하며, 단순 운동 처방이 아닌 통증·재활·퍼포먼스를 통합적으로 관리합니다. 결과적으로 운동 후 '단기 근육통'이 아닌 '장기적인 움직임 능력 개선'을 경험하실 수 있습니다.",
  },
  {
    q: "첫 방문 시 어떻게 진행되나요?",
    a: "모든 회원님들의 운동은 상담 후 진행됩니다. FE트레이닝센터만의 운동기능 평가 및 코치와의 1:1 인터뷰가 함께 진행됩니다.\n회원님의 운동 목적과 목표에 따른 프로그램을 설계합니다. 상담은 약 50분 진행됩니다.\n상담 후 회원님의 운동 프로그램 및 회차, 스케줄을 안내해드립니다.\n\n원활한 상담을 위해 상담은 사전 예약으로 진행하고 있습니다.",
  },
  {
    q: "재활 프로그램은 몇 회로 구성되나요?",
    a: "재활 프로그램은 부상 정도, 수술 여부, 회복 단계에 따라 회차가 달라지며, 짧게는 8회 내외부터 길게는 수개월의 장기 프로그램까지 다양하게 구성됩니다.\n모든 프로그램은 ① 정밀 평가 및 원인 분석 → ② 가동성 및 감각 회복 → ③ 기능 통합 → ④ 일상기능 및 퍼포먼스 복귀의 4단계 프로세스를 따르며, 각 단계의 완료 여부를 평가로 확인한 뒤 다음 단계로 진행합니다.\n\n첫 상담 시 평가 결과를 바탕으로 개인에게 필요한 회차와 진행 일정을 구체적으로 안내해 드리며, 진행 중에도 회복 속도에 맞춰 프로그램이 유연하게 조정됩니다.",
  },
  {
    q: "강남점은 어디에 있고 주차는 가능한가요?",
    a: "강남점은 서울 강남구 도곡로7길 6 한은빌딩 4층, 바디프렌드 역삼타워 뒷편에 있습니다.\n뱅뱅사거리에서 도보 약 5분, 신분당선·2호선 강남역 4번 출구에서 도보 약 15분 거리입니다.\n주차는 가능하지만 공간이 제한적일 수 있으므로 가능하시면 대중교통 이용을 권장드립니다.",
  },
  {
    q: "운영 시간이 어떻게 되나요?",
    a: "FE트레이닝센터 강남점은 평일(월~금) 오전 7시부터 밤 10시까지, 토요일은 오전 7시부터 오후 3시까지 운영합니다. 일요일과 공휴일은 휴무이며, 모든 수업은 사전 예약제로 진행됩니다. 첫 방문 시에는 평가와 상담 시간을 포함해 약 50분이 소요되므로, 네이버 예약 또는 010-3375-9911(전화·카카오톡 채널)로 사전 예약 후 방문 부탁드립니다. 또한 상담 시 간단한 운동 및 평가가 진행될 수 있어 운동복을 지참하여 방문하시면 보다 원활한 상담이 가능합니다.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    },
  })),
};

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className={styles.section}>
        <h2 className={styles.title}>Q&amp;A</h2>
        <div className={styles.list}>
          {FAQS.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
                <button
                  type="button"
                  className={styles.q}
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    <span className={styles.toggleBar} />
                    <span className={`${styles.toggleBar} ${styles.toggleBarV}`} />
                  </span>
                </button>
                {open && <div className={styles.a}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}