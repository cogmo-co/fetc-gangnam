"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./CenterCarousel.module.css";

const PHOTOS = [
  { file: "g_panoramic_view.jpg", key: "photo1" },
  { file: "g_consultation_zone.jpg", key: "photo2" },
  { file: "g_cardio_zone.jpg", key: "photo3" },
  { file: "g_care_zone.jpg", key: "photo4" },
  { file: "g_weight_zone.jpg", key: "photo5" },
  { file: "g_workout_zone.jpg", key: "photo6" },
];

const IMAGE_BASE = "/images/about/facility";
const AUTO_PLAY_INTERVAL = 5000; // 5초

export default function CenterCarousel() {
  const t = useTranslations();
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
      <h2 className={`${styles.title} sr`}>{t("Carousel.title")}</h2>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {PHOTOS.map((photo, i) => (
            <div key={photo.file} className={styles.slide}>
              <Image
                src={`${IMAGE_BASE}/${photo.file}`}
                alt={`${t("Carousel.altPrefix")} ${t(`Carousel.${photo.key}`)}`}
                fill
                sizes="(max-width:1024px) 100vw, 80vw"
                priority={i === 0}
              />
              <div className={styles.caption}>{t(`Carousel.${photo.key}`)}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={prev}
          aria-label={t("Facility.prevPhoto")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={next}
          aria-label={t("Facility.nextPhoto")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label={t("Carousel.selectPhoto")}>
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.file}
            type="button"
            role="tab"
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={t("Carousel.goTo", { caption: t(`Carousel.${photo.key}`) })}
            aria-selected={i === index}
          />
        ))}
      </div>
    </section>
  );
}