import Image from "next/image";
import BookingLink from "@/components/BookingLink/BookingLink";
import { PHONE } from "@/lib/constants";
import styles from "./ContactView.module.css";

export default function ContactView() {
  return (
    <div className={styles.contact}>
      <div className={styles.bg}>
        <Image src="/images/contact.jpg" alt="Contact" fill sizes="100vw" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.bgText}>CONTACT</div>
      <div className={`${styles.title} sr`}>CONTACT</div>
      <div className={styles.btns}>
        <a href={`tel:${PHONE}`} className={`${styles.btn} sr sr-d1`}>
          <span className={styles.icon}>📞</span>전화 문의 · {PHONE}
        </a>
        <BookingLink className={`${styles.btn} sr sr-d2`}>
          <span className={styles.icon}>📆</span>네이버 상담예약
        </BookingLink>
        <a
          href="http://pf.kakao.com/_xkzxfbn/chat"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} sr sr-d3`}
        >
          <span className={styles.icon}>💬</span>카카오톡 채널 문의
        </a>
        <a
          href="mailto:official@feara.co.kr"
          className={`${styles.btn} sr sr-d4`}
        >
          <span className={styles.icon}>🖥️</span>협업 문의
        </a>
      </div>
    </div>
  );
}
