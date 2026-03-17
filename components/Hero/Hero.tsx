import Image from "next/image";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import BookingLink from "@/components/BookingLink/BookingLink";
import PlaceLink from "./PlaceLink";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/hero.jpg" alt="FETC 강남점" fill sizes="100vw" priority />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={`${styles.bgTextWrap} sr`}>
          <span className={styles.bgTextSpan}>TRAIN</span>{" "}
          <br className={styles.mobileBreak} />
          <span className={`${styles.bgTextSpan} ${styles.bgTextD1}`}>BEYOND</span>{" "}
          <br className={styles.mobileBreak} />
          <span className={`${styles.bgTextSpan} ${styles.bgTextD2}`}>LIMITS</span>
        </span>
        <div className={styles.btns}>
          <PlaceLink className={`${styles.btnSub} sr sr-d1`} />
          <BookingLink
            className={`${styles.btnSub} sr sr-d2`}
          >
            상담 예약
          </BookingLink>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}
