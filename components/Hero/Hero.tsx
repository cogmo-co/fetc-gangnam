import Image from "next/image";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import BookingLink from "@/components/BookingLink/BookingLink";
import PlaceLink from "./PlaceLink";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.css";

export default function Hero() {
  const t = useTranslations();
  return (
    <div className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/hero.jpg" alt={t("A11y.heroAlt")} fill sizes="100vw" priority />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={`${styles.subtitle} sr`}>{t("Hero.heading")}<span className={styles.mobileHide}> | </span><br className={styles.mobileBreak} />{t("Hero.brand")}</h1>
        <span className={`${styles.bgTextWrap} sr`}>
          <span className={styles.bgTextSpan}>TRAIN</span>{" "}
          <br className={styles.mobileBreak} />
          <span className={`${styles.bgTextSpan} ${styles.bgTextD1}`}>BEYOND</span>{" "}
          <br className={styles.mobileBreak} />
          <span className={`${styles.bgTextSpan} ${styles.bgTextD2}`}>LIMITS</span>
        </span>
        <div className={styles.btns}>
          <PlaceLink className={`${styles.btnSub} sr sr-d1`}>{t("Common.findUs")}</PlaceLink>
          <BookingLink
            className={`${styles.btnSub} sr sr-d2`}
          >
            {t("Common.booking")}
          </BookingLink>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}
