import { use } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import SubHero from "@/components/SubHero/SubHero";
import BookingLink from "@/components/BookingLink/BookingLink";
import { NaverBookingIcon, KakaoChannelIcon } from "@/components/Icons";
import { PHONE } from "@/lib/constants";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: "RESERVATION", description: t("reservationDesc") };
}

const STEPS = [{ num: "01" }, { num: "02" }, { num: "03" }, { num: "04" }, { num: "05" }];

export default function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Reservation");
  const c = useTranslations("Common");
  return (
    <div className="sub-page">
      <SubHero
        title="RESERVATION"
        subtitle={t("subtitle")}
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
                <div className={styles.phoneLabel}>{t("phoneLabel")}</div>
                <a href={`tel:${PHONE}`} className={styles.phoneNumber}>
                  {PHONE.replace(/-/g, " - ")}
                </a>
              </div>
              <div className={styles.hoursBlock}>
                <div className={styles.hoursLabel}>{t("hoursLabel")}</div>
                <div className={styles.hoursGrid}>
                  <span>{t("weekdays")}</span>
                  <span>10:00 - 22:00</span>
                  <span>{t("saturday")}</span>
                  <span>10:00 - 17:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 네이버예약 */}
          <div className={`${styles.contactCard} sr sr-d1`}>
            <div className={styles.cardEyebrow}>{t("naverEyebrow")}</div>
            <h2 className={styles.cardTitle}>{t("naverTitle")}</h2>
            <div className={styles.cardSpacer} />
            <BookingLink className={`${styles.ctaBtn} ${styles.ctaNaver}`} aria-label={t("naverCta")}>
              {t("naverCta")}
              <NaverBookingIcon width={22} height={22} />
            </BookingLink>
            <p className={styles.cardNote}>
              {t("naverNote")}
            </p>
          </div>

          {/* Card 3: 카카오톡 */}
          <div className={`${styles.contactCard} sr sr-d2`}>
            <div className={styles.cardEyebrow}>{t("kakaoEyebrow")}</div>
            <h2 className={styles.cardTitle}>{t("kakaoTitle")}</h2>
            <div className={styles.cardSpacer} />
            <a
              href="http://pf.kakao.com/_xkzxfbn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtn} ${styles.ctaKakao}`}
              aria-label={t("kakaoCta")}
            >
              {t("kakaoCta")}
              <KakaoChannelIcon />
            </a>
            <p className={styles.cardNote}>
              {t("kakaoNote")}
            </p>
          </div>
        </div>
      </section>

      {/* 5-step 프로세스 */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <header className={styles.processHeader}>
            <div className={`${styles.processEyebrow} sr`}>{c("brandFull")}</div>
            <h2 className={`${styles.processTitle} sr sr-d1`}>{t("processTitle")}</h2>
          </header>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.num} className={`${styles.step} sr sr-d${i + 1}`}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{t(`step${i + 1}Title`)}</h3>
                  <p className={styles.stepBody}>{t(`step${i + 1}Body`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}