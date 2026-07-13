import type { Metadata } from "next";
import Image from "next/image";
import SubHero from "@/components/SubHero/SubHero";
import BookingLink from "@/components/BookingLink/BookingLink";
import { NaverBookingIcon, KakaoChannelIcon } from "@/components/Icons";
import { PHONE } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "RESERVATION",
  description:
    "FE트레이닝센터 강남점 상담·예약 안내. 전화·네이버예약·카카오톡으로 신청하고, FEA 평가 기반 맞춤 트레이닝을 시작하세요.",
};

const STEPS = [
  {
    num: "01",
    title: "상담예약",
    body: "네이버 예약, 전화나 문자(010-3375-9911) 또는 카카오톡 채널을 통해 상담을 신청해주세요. 상담 시 약 50분이 소요됩니다.",
  },
  {
    num: "02",
    title: "FEA를 통한 정밀 평가",
    body: "FE트레이닝센터만의 FEA시스템을 통해 움직임 패턴, 관절 가동성 및 자세 등을 정밀하게 측정하고, 필요에 따라 VALD 등 국제 수준의 평가장비를 이용하여 통증과 부상의 근본 원인을 객관적으로 파악합니다.",
  },
  {
    num: "03",
    title: "맞춤형 프로그램 설계",
    body: "평가결과를 바탕으로 FE트레이닝센터 고유의 4단계 프로세스에 따라, 회원의 목표(퍼포먼스 향상 ∙ 재활 ∙ 기능성 트레이닝)와 시즌, 일정을 고려한 맞춤 프로그램을 설계합니다.",
  },
  {
    num: "04",
    title: "1:1 트레이닝 진행",
    body: "FEARA 인증 PCC 코치진이 회원의 신체 상태 및 컨디션에 따라 1:1로 트레이닝을 지도합니다. 회복기 ∙ 기초체력 ∙ 시즌 퍼포먼스 등 단계에 맞춘 주기화 프로그램으로 안전하게 진행됩니다.",
  },
  {
    num: "05",
    title: "회차 진행 및 변화 추적",
    body: "트레이닝 일정은 담당 코치와 조율하며, 주기적인 재평가를 통해 본인의 신체 변화와 퍼포먼스 지표를 객관적인 수치로 추적합니다. 데이터 기반의 변화 관리로 일관성 있는 성장을 만들어갑니다.",
  },
];

export default function ReservationPage() {
  return (
    <div className="sub-page">
      <SubHero
        title="RESERVATION"
        subtitle="FETC만의 평가와 맞춤 상담으로 시작하는 첫 방문 | FE트레이닝센터 강남점"
        image="/images/reservation/hero.jpg"
        half
      />

      {/* 상단 contact 3-card */}
      <section className={styles.contact}>
        <div className={styles.contactGrid}>
          {/* Card 1: 전화상담 — full width, [icon] | [phoneBlock 위 / hoursBlock 아래] */}
          <div className={`${styles.contactCard} ${styles.phoneCard} sr`}>
            <div className={styles.phoneIcon} aria-hidden="true">
              <Image
                src="/images/reservation/call_icon.png"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className={styles.phoneRight}>
              <div className={styles.phoneBlock}>
                <div className={styles.phoneLabel}>전화상담</div>
                <a href={`tel:${PHONE}`} className={styles.phoneNumber}>
                  {PHONE.replace(/-/g, " - ")}
                </a>
              </div>
              <div className={styles.hoursBlock}>
                <div className={styles.hoursLabel}>상담시간</div>
                <div className={styles.hoursGrid}>
                  <span>평일</span>
                  <span>10:00 - 22:00</span>
                  <span>토요일</span>
                  <span>10:00 - 17:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 네이버예약 */}
          <div className={`${styles.contactCard} sr sr-d1`}>
            <div className={styles.cardEyebrow}>FE트레이닝센터 강남점 예약하기</div>
            <h2 className={styles.cardTitle}>네이버 예약</h2>
            <div className={styles.cardSpacer} />
            <BookingLink className={`${styles.ctaBtn} ${styles.ctaNaver}`} aria-label="네이버 예약 바로가기">
              네이버 예약 바로가기
              <NaverBookingIcon width={22} height={22} />
            </BookingLink>
            <p className={styles.cardNote}>
              담당자가 확인 후, 예약을 확정하기 위해 연락드립니다.
            </p>
          </div>

          {/* Card 3: 카카오톡 */}
          <div className={`${styles.contactCard} sr sr-d2`}>
            <div className={styles.cardEyebrow}>FE트레이닝센터 강남점 문의하기</div>
            <h2 className={styles.cardTitle}>카카오톡 채널 상담</h2>
            <div className={styles.cardSpacer} />
            <a
              href="http://pf.kakao.com/_xkzxfbn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtn} ${styles.ctaKakao}`}
              aria-label="카카오톡 상담 바로가기"
            >
              카카오톡 상담 바로가기
              <KakaoChannelIcon />
            </a>
            <p className={styles.cardNote}>
              담당자가 확인 후, 순차적으로 답변 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 5-step 프로세스 */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <header className={styles.processHeader}>
            <div className={`${styles.processEyebrow} sr`}>FE트레이닝센터 강남점</div>
            <h2 className={`${styles.processTitle} sr sr-d1`}>예약문의</h2>
          </header>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.num} className={`${styles.step} sr sr-d${i + 1}`}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}