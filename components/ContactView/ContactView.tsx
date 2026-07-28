import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SubHero from "@/components/SubHero/SubHero";
import { PHONE } from "@/lib/constants";
import styles from "./ContactView.module.css";

const STEPS = [{ num: "01" }, { num: "02" }, { num: "03" }, { num: "04" }, { num: "05" }];

export default function ContactView() {
  const t = useTranslations("Contact");
  const c = useTranslations("Common");
  return (
    <>
      <SubHero
        title="CONTACT"
        subtitle={t("subtitle")}
        image="/images/contact/hero.jpg"
        half
      />

      {/* 비즈니스 문의 채널 */}
      <section className={styles.channelSection}>
        <header className={styles.channelHeader}>
          <h2 className={`${styles.channelTitle} sr`}>{t("channelTitle")}</h2>
          <p className={`${styles.channelSubtitle} sr sr-d1`}>
            {t("channelSubtitle")}
          </p>
          <p className={`${styles.channelRedirect} sr sr-d1`}>
            {t.rich("channelRedirect", {
              link: (chunks) => (
                <Link href="/reservation" className={styles.channelRedirectLink}>
                  {chunks}
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
                </Link>
              ),
            })}
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
                {t("emailNote")}
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
                {t("phoneNote")}
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
              {c("brandFull")}
            </div>
            <h2 className={`${styles.processTitle} sr sr-d1`}>{t("processTitle")}</h2>
          </header>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`${styles.step} sr sr-d${i + 1}`}
              >
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

      {/* 정보 카드 (RESPONSE + MEETING) */}
      <section className={styles.infoSection}>
        <div className={styles.infoInner}>
          <div className={styles.infoGrid}>
            <div className={`${styles.infoCard} sr`}>
              <h3 className={styles.infoEyebrow}>RESPONSE</h3>
              <p className={styles.infoBody}>
                {t.rich("responseBody", {
                  b: (chunks) => <strong>{chunks}</strong>,
                  br: () => <br />,
                })}
              </p>
            </div>
            <div className={`${styles.infoCard} sr sr-d1`}>
              <h3 className={styles.infoEyebrow}>MEETING</h3>
              <p className={styles.infoBody}>
                {t.rich("meetingBody", { br: () => <br /> })}
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}