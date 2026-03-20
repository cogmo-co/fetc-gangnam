"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./LocationInfoSection.module.css";

const MAP_CENTER = { lat: 37.491134, lng: 127.035130 };
const NAVER_PLACE_URL = "https://map.naver.com/p/entry/place/1961624906";
const DIRECTIONS_PC = "https://map.naver.com/index.nhn?elng=127.035130&elat=37.491134&etext=FE%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0%EA%B0%95%EB%82%A8%EC%A0%90&menu=route";
const DIRECTIONS_MOBILE = "https://m.map.naver.com/route.nhn?ename=FE%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0%EA%B0%95%EB%82%A8%EC%A0%90&ex=127.035130&ey=37.491134&pathType=0&showMap=true";
const BOOKING_URL = "https://booking.naver.com/booking/6/bizes/718599";
const PHONE = "010-3375-9911";

export default function LocationInfoSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const naver = (window as any).naver;
    if (!naver?.maps) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng),
      zoom: 15,
      zoomControl: false,
      scaleControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
      mapDataControl: false,
    });

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng),
      map,
      icon: {
        content: `
          <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
            <img src="/images/marker.png" width="46" height="59" alt="marker" />
            <span style="margin-top:4px;font-size:12px;font-weight:700;color:#333;text-align:center;line-height:1.4;">FE트레이닝센터<br/>강남점</span>
          </div>
        `,
        anchor: new naver.maps.Point(23, 59),
      },
    });

    naver.maps.Event.addListener(marker, "click", () => {
      window.open(NAVER_PLACE_URL, "_blank");
    });

    // 하단 CTA 오버레이
    const overlayContent = document.createElement("div");
    overlayContent.className = styles.mapOverlay;
    overlayContent.innerHTML = `
      <div class="${styles.mapOverlayBtns}">
        <a href="#" onclick="event.preventDefault();window.open(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)?'${DIRECTIONS_MOBILE}':'${DIRECTIONS_PC}','_blank')" class="${styles.mapBtn}">
          <svg width="18" height="18" viewBox="5 4 18 18" fill="#03c75a"><path d="M21.467 5.268L6.524 10.25a1.001 1.001 0 00-.142 1.838l5.722 2.947c.37.191.671.492.862.862l2.947 5.722a1 1 0 001.837-.142l4.982-14.943a1.001 1.001 0 00-1.265-1.265z"/></svg>
          길찾기
        </a>
        <a href="tel:${PHONE}" class="${styles.mapBtn}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#03c75a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          전화
        </a>
        <a href="${BOOKING_URL}" target="_blank" rel="noopener noreferrer" class="${styles.mapBtn} ${styles.mapBtnPrimary}">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="#fff"><path d="M14,1.5h-2.5V0.8c0-0.3-0.2-0.5-0.5-0.5h-0.2c-0.3,0-0.5,0.2-0.5,0.5v0.7H5.7V0.8c0-0.3-0.2-0.5-0.5-0.5H5c-0.3,0-0.5,0.2-0.5,0.5v0.7H2c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1v-12C15,1.9,14.6,1.5,14,1.5z M13.8,14.3H2.2V4h11.6V14.3z M6.9,12H5V6h1.8l2.3,3.2V6H11v6H9.2L6.9,8.8V12z"/></svg>
          예약
        </a>
      </div>
    `;

    mapRef.current.style.position = "relative";
    overlayContent.style.position = "absolute";
    overlayContent.style.bottom = "0";
    overlayContent.style.left = "0";
    overlayContent.style.right = "0";
    overlayContent.style.zIndex = "10";
    mapRef.current.appendChild(overlayContent);
  }, [mapLoaded]);

  return (
    <section className={styles.section}>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onLoad={() => setMapLoaded(true)}
        strategy="afterInteractive"
      />

      {/* 배경 이미지 */}
      <div className={styles.bg}>
        <Image src="/images/location.jpg" alt="센터 위치" fill sizes="100vw" />
      </div>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <h2 className={styles.title}>LOCATION</h2>
        <div className={styles.container}>
          {/* 왼쪽: 지도 + 내부 CTA */}
          <div className={styles.mapArea} ref={mapRef} />

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
