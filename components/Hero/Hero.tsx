import Image from "next/image";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";
import BookingLink from "@/components/BookingLink/BookingLink";
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
          <a
            href="https://map.naver.com/p/search/fe%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0%20%EA%B0%95%EB%82%A8/place/1961624906"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btnSub} sr sr-d1`}
          >
            센터 위치 찾기
          </a>
          <BookingLink
            className={`${styles.btnSub} sr sr-d2`}
          >
            상담 예약하기
          </BookingLink>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}
