"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Equipment } from "@/lib/equipment";
import { EQUIPMENTS, getEquipmentImage } from "@/lib/equipment";
import styles from "./EquipmentDetail.module.css";

interface Props {
  equipment: Equipment;
  onBack: () => void;
  onSelect: (eq: Equipment) => void;
}

export default function EquipmentDetail({
  equipment,
  onBack,
  onSelect,
}: Props) {
  // 갤러리 이미지 — 메인 + 상세 이미지 (총 3장)
  const images = [equipment.img, ...equipment.detailImgs];
  const [activeIndex, setActiveIndex] = useState(0);

  // 장비 바뀌면 첫 이미지로 리셋
  useEffect(() => {
    setActiveIndex(0);
  }, [equipment.id]);

  function selectImage(i: number) {
    setActiveIndex(((i % images.length) + images.length) % images.length);
  }
  function nextImage() {
    selectImage(activeIndex + 1);
  }
  function prevImage() {
    selectImage(activeIndex - 1);
  }

  return (
    <div className={styles.detail}>
      {/* 상단 바: 좌측 ← 돌아가기, 우측 6 장비 nav */}
      <div className={styles.topBar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="장비 목록으로 돌아가기"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>돌아가기</span>
        </button>

        <nav className={styles.equipNav} aria-label="장비 목록">
          {EQUIPMENTS.map((eq) => {
            const active = eq.id === equipment.id;
            return (
              <button
                key={eq.id}
                type="button"
                className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                onClick={() => onSelect(eq)}
                aria-current={active}
              >
                {eq.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className={styles.content}>
        {/* 좌측: 메인 이미지 1장 (좌우 화살표로 전환) */}
        <div className={styles.mainImageWrap}>
          <Image
            src={getEquipmentImage(images[activeIndex])}
            alt={`${equipment.name} ${activeIndex + 1}/${images.length}`}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.navArrow} ${styles.navPrev}`}
                onClick={prevImage}
                aria-label="이전 사진"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.navArrow} ${styles.navNext}`}
                onClick={nextImage}
                aria-label="다음 사진"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className={styles.imageCounter} aria-live="polite">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* 우측: 제목 + 본문 */}
        <div className={styles.textArea}>
          <h3 className={styles.title}>
            {equipment.fullName} | {equipment.tagline}
          </h3>
          <p className={styles.body}>{equipment.body}</p>
        </div>
      </div>
    </div>
  );
}