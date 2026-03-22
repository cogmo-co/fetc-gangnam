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
          <span className={`${styles.icon} ${styles.iconPhone}`}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="#fff"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
          </span>전화 · {PHONE}
        </a>
        <BookingLink className={`${styles.btn} sr sr-d2`}>
          <span className={`${styles.icon} ${styles.iconBooking}`}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="#fff"><path d="M14,1.5h-2.5V0.8c0-0.3-0.2-0.5-0.5-0.5h-0.2c-0.3,0-0.5,0.2-0.5,0.5v0.7H5.7V0.8c0-0.3-0.2-0.5-0.5-0.5H5 c-0.3,0-0.5,0.2-0.5,0.5v0.7H2c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1v-12C15,1.9,14.6,1.5,14,1.5z M13.8,14.3H2.2 V4h11.6V14.3z M6.9,12H5V6h1.8l2.3,3.2V6H11v6H9.2L6.9,8.8V12z"/></svg>
          </span>네이버 상담예약
        </BookingLink>
        <a
          href="http://pf.kakao.com/_xkzxfbn/chat"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} sr sr-d3`}
        >
          <span className={`${styles.icon} ${styles.iconKakao}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#3C1E1E"><path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.41-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.81C22 6.58 17.52 3 12 3z"/></svg>
          </span>카카오톡 채널 문의
        </a>
        <a
          href="mailto:official@feara.co.kr"
          className={`${styles.btn} sr sr-d4`}
        >
          <span className={`${styles.icon} ${styles.iconEmail}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </span>협업 문의
        </a>
      </div>
    </div>
  );
}
