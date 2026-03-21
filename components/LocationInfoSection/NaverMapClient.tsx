"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { PHONE } from "@/lib/constants";
import styles from "./LocationInfoSection.module.css";

const MAP_CENTER = { lat: 37.491092, lng: 127.035055 };
const NAVER_PLACE_URL = "https://map.naver.com/p/entry/place/1961624906";
const DIRECTIONS_PC = "https://map.naver.com/index.nhn?elng=127.035130&elat=37.491134&etext=FE%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0%EA%B0%95%EB%82%A8%EC%A0%90&menu=route";
const DIRECTIONS_MOBILE = "https://m.map.naver.com/route.nhn?ename=FE%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%EC%84%BC%ED%84%B0%EA%B0%95%EB%82%A8%EC%A0%90&ex=127.035130&ey=37.491134&pathType=0&showMap=true";
const BOOKING_PC = "https://booking.naver.com/booking/6/bizes/718599";
const BOOKING_MOBILE = "https://m.booking.naver.com/booking/6/bizes/718599";

interface Props {
  isMobile: boolean;
}

export default function NaverMapClient({ isMobile }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const directionsUrl = isMobile ? DIRECTIONS_MOBILE : DIRECTIONS_PC;
  const bookingUrl = isMobile ? BOOKING_MOBILE : BOOKING_PC;

  // 스크립트가 이미 로드되어 있으면 바로 초기화
  useEffect(() => {
    if ((window as any).naver?.maps) {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const naver = (window as any).naver;
    if (!naver?.maps) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng),
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
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
        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="${styles.mapBtn}">
          <svg width="18" height="18" viewBox="5 4 18 18" fill="#03c75a"><path d="M21.467 5.268L6.524 10.25a1.001 1.001 0 00-.142 1.838l5.722 2.947c.37.191.671.492.862.862l2.947 5.722a1 1 0 001.837-.142l4.982-14.943a1.001 1.001 0 00-1.265-1.265z"/></svg>
          길찾기
        </a>
        <a href="tel:${PHONE}" class="${styles.mapBtn}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#03c75a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          전화
        </a>
        <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" class="${styles.mapBtn} ${styles.mapBtnPrimary}">
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
  }, [mapLoaded, directionsUrl, bookingUrl]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onLoad={() => setMapLoaded(true)}
        strategy="afterInteractive"
      />
      <div className={styles.mapArea} ref={mapRef} />
    </>
  );
}
