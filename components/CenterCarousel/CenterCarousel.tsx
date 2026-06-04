"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CenterCarousel.module.css";

const PHOTOS = [
  { file: "g_panoramic_view.jpg", caption: "전경" },
  { file: "g_consultation_zone.jpg", caption: "상담 공간" },
  { file: "g_cardio_zone.jpg", caption: "유산소 존" },
  { file: "g_care_zone.jpg", caption: "케어 존" },
  { file: "g_weight_zone.jpg", caption: "웨이트 존" },
  { file: "g_workout_zone.jpg", caption: "트레이닝 존" },
];

const IMAGE_BASE = "/images/about/facility";
const AUTO_PLAY_INTERVAL = 5000; // 5초

export default function CenterCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  function goTo(i: number) {
    // 순환 처리 (음수도 안전)
    setIndex(((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length);
  }
  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  // 자동 재생 — paused 상태이면 정지
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className={`${styles.title} sr`}>FE트레이닝센터 전경</h2>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {PHOTOS.map((photo, i) => (
            <div key={photo.file} className={styles.slide}>
              <Image
                src={`${IMAGE_BASE}/${photo.file}`}
                alt={`FE트레이닝센터 ${photo.caption}`}
                fill
                sizes="(max-width:1024px) 100vw, 80vw"
                priority={i === 0}
              />
              <div className={styles.caption}>{photo.caption}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={prev}
          aria-label="이전 사진"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={next}
          aria-label="다음 사진"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="센터 사진 선택">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.file}
            type="button"
            role="tab"
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`${photo.caption}로 이동`}
            aria-selected={i === index}
          />
        ))}
      </div>
    </section>
  );
}