import Image from "next/image";
import NaverMapClient from "./NaverMapClient";
import { PHONE } from "@/lib/constants";
import styles from "./LocationInfoSection.module.css";

interface Props {
  isMobile: boolean;
}

export default function LocationInfoSection({ isMobile }: Props) {
  return (
    <section className={styles.section}>
      {/* 배경 이미지 */}
      <div className={styles.bg}>
        <Image src="/images/location.jpg" alt="센터 위치" fill sizes="100vw" />
      </div>
      <div className={styles.overlay} />

      <h2 className={styles.title}>LOCATION</h2>
      <div className={styles.inner}>
        <div className={styles.container}>
          {/* 왼쪽: 지도 + 내부 CTA */}
          <NaverMapClient isMobile={isMobile} />

          {/* 오른쪽: 정보 카드 */}
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <svg className={styles.infoIcon} width="18" height="18" viewBox="0 0 384 512" fill="currentColor"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>
              <div>
                <div>서울 강남구 도곡로7길 6, 한은빌딩 4층</div>
                <div className={styles.subInfo}>
                  <span className={styles.line2}>2</span>
                  <span className={styles.lineShin}>신분당</span>
                  강남역 4번 출구에서 도보 약 15분
                </div>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.infoRow}>
              <svg className={styles.infoIcon} width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
              <a href={`tel:${PHONE}`} className={styles.phoneLink}>{PHONE}</a>
            </div>
            <div className={styles.divider} />
            <div className={styles.infoRow}>
              <svg className={styles.infoIcon} width="18" height="18" viewBox="0 0 512 512" fill="currentColor"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
              <div>
                <div className={styles.scheduleGrid}>
                  <span>평일</span><span>07:00 - 22:00</span>
                  <span>토</span><span>07:00 - 15:00</span>
                </div>
                <div>일요일, 공휴일 휴무</div>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.infoRow}>
              <svg className={styles.infoIcon} width="18" height="18" viewBox="3 1 19 21" fill="currentColor"><path d="M4 18.0001H9.5V19.2501C9.5 20.7688 8.26878 22.0001 6.75 22.0001C5.23122 22.0001 4 20.7688 4 19.2501V18.0001ZM8 6.12067C10 6.12067 11 9.00006 11 11.0001C11 12.0001 10.5 13.0001 10 14.5001L9.5 16.0001H4C4 15.0001 3.5 13.5001 3.5 11.0001C3.5 8.50006 5.49783 6.12067 8 6.12067ZM20.054 14.0984L19.8369 15.3294C19.5732 16.8251 18.1468 17.8238 16.6511 17.5601C15.1554 17.2964 14.1567 15.87 14.4205 14.3743L14.6375 13.1433L20.054 14.0984ZM18.1776 1.70488C20.6417 2.13938 22.196 4.82954 21.7619 7.29156C21.3278 9.75358 20.5749 11.144 20.4013 12.1288L14.9848 11.1737L14.7529 9.60967C14.5209 8.04564 14.2022 6.974 14.3758 5.9892C14.7231 4.01958 16.2079 1.35759 18.1776 1.70488Z"/></svg>
              <div>
                <div>바디프렌드 역삼타워 뒷편</div>
                <div>뱅뱅사거리 도보 5분</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
