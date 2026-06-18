import Link from "next/link";
import SubHero from "@/components/SubHero/SubHero";
import { PHONE } from "@/lib/constants";
import styles from "./ContactView.module.css";

const STEPS = [
  {
    num: "01",
    title: "기관 ∙ 단체 협력",
    body: "선수단 ∙ 구단 ∙ 협회 ∙ 학교의 평가, 트레이닝 및 재활 협력 프로그램 운영을 제안하실 수 있습니다.",
  },
  {
    num: "02",
    title: "기업 복지 ∙ 사내 트레이닝",
    body: "임직원 자세교정, 체력 증진, 부상 예방을 위한 맞춤형 사내 프로그램을 설계해드립니다.",
  },
  {
    num: "03",
    title: "미디어 ∙ 언론 문의",
    body: "인터뷰, 취재, 자료 요청 등 미디어 관련 문의를 받습니다. 사전 협의 후 일정을 조율합니다.",
  },
  {
    num: "04",
    title: "코치 채용 ∙ 강사 초빙",
    body: "FEARA 인증 PCC 코치 채용 및 외부강의, 워크숍 초빙 의뢰를 받습니다.",
  },
  {
    num: "05",
    title: "교육 협력 ∙ 강의 의뢰",
    body: "트레이너 교육, 세미나, 학회 ∙ 아카데미 협력 강의 의뢰를 받습니다.",
  },
];

export default function ContactView() {
  return (
    <>
      <SubHero
        title="CONTACT"
        subtitle="기관 ∙ 단체 ∙ 기업의 협업 문의 | FE트레이닝센터 강남점"
        image="/images/contact/hero.jpg"
        half
      />

      {/* 비즈니스 문의 채널 */}
      <section className={styles.channelSection}>
        <header className={styles.channelHeader}>
          <h2 className={`${styles.channelTitle} sr`}>비즈니스 문의 채널</h2>
          <p className={`${styles.channelSubtitle} sr sr-d1`}>
            협업 ∙ 제휴 ∙ 미디어 ∙ 채용 등 기관 문의 전용 페이지입니다.
          </p>
          <p className={`${styles.channelRedirect} sr sr-d1`}>
            회원 예약·상담은{" "}
            <Link href="/reservation" className={styles.channelRedirectLink}>
              RESERVATION
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>{" "}
            페이지를 이용해 주세요.
          </p>
        </header>
        <div className={styles.channelGrid}>
          {/* EMAIL */}
          <div className={`${styles.channelCard} sr sr-d1`}>
            <div className={styles.channelIcon} aria-hidden="true">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 9h8" />
                <path d="M8 13h6" />
                <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
              </svg>
            </div>
            <div className={styles.channelText}>
              <div className={styles.channelEyebrow}>EMAIL</div>
              <a
                href="mailto:official@feara.co.kr"
                className={styles.channelValue}
              >
                official@feara.co.kr
              </a>
              <p className={styles.channelNote}>
                협업∙제휴∙미디어∙채용 전용 문의 권장채널
              </p>
            </div>
          </div>

          {/* PHONE */}
          <div className={`${styles.channelCard} sr sr-d2`}>
            <div className={styles.channelIcon} aria-hidden="true">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className={styles.channelText}>
              <div className={styles.channelEyebrow}>PHONE</div>
              <a href={`tel:${PHONE}`} className={styles.channelValue}>
                {PHONE.replace(/-/g, " - ")}
              </a>
              <p className={styles.channelNote}>
                평일 10:00 - 22:00 ∙ 토 10:00 - 16:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 협업 문의 5-step (reservation 패턴 동일) */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <header className={styles.processHeader}>
            <div className={`${styles.processEyebrow} sr`}>
              FE트레이닝센터 강남점
            </div>
            <h2 className={`${styles.processTitle} sr sr-d1`}>협업 문의</h2>
          </header>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`${styles.step} sr sr-d${i + 1}`}
              >
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

      {/* 정보 카드 (RESPONSE + MEETING) */}
      <section className={styles.infoSection}>
        <div className={styles.infoInner}>
          <div className={styles.infoGrid}>
            <div className={`${styles.infoCard} sr`}>
              <h3 className={styles.infoEyebrow}>RESPONSE</h3>
              <p className={styles.infoBody}>
                영업일 기준 <strong>2-3일 이내</strong> 회신드립니다.
                <br />
                긴급한 사안은 전화 문의를 권장드립니다.
              </p>
            </div>
            <div className={`${styles.infoCard} sr sr-d1`}>
              <h3 className={styles.infoEyebrow}>MEETING</h3>
              <p className={styles.infoBody}>
                1차 상담 후, 미팅일정을 조율합니다.
                <br />
                온라인미팅 또는 강남점 방문 미팅으로 진행됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}