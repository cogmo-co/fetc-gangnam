"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Equipment } from "@/lib/equipment";
import { EQUIPMENTS, getEquipmentImage } from "@/lib/equipment";
import styles from "./Detail.module.css";

interface Props {
  equipment: Equipment;
}

export default function Detail({ equipment }: Props) {
  const router = useRouter();
  const currentIndex = EQUIPMENTS.findIndex((e) => e.id === equipment.id);
  const prev = currentIndex > 0 ? EQUIPMENTS[currentIndex - 1] : null;
  const next =
    currentIndex < EQUIPMENTS.length - 1
      ? EQUIPMENTS[currentIndex + 1]
      : null;

  function goTo(eq: Equipment) {
    router.push(`/about/facility/${eq.id}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.imageArea}>
        <Image
          src={getEquipmentImage(equipment.img)}
          alt={equipment.name}
          fill
          sizes="100vw"
          priority
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.fullName}>{equipment.fullName}</h1>
          <p className={styles.tagline}>{equipment.tagline}</p>
        </div>

        <p className={styles.body}>{equipment.body}</p>

        {equipment.detailImgs.length > 0 && (
          <div className={styles.detailImages}>
            {equipment.detailImgs.map((img) => (
              <div key={img} className={styles.detailImage}>
                <Image
                  src={getEquipmentImage(img)}
                  alt={`${equipment.name} 상세`}
                  fill
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* prev / next 네비게이션 — 블로그 스타일 (좌우 분할, 라벨 + 풀네임) */}
        <nav className={styles.postNav} aria-label="장비 네비게이션">
          <button
            type="button"
            className={`${styles.navItem} ${styles.prev}`}
            disabled={!prev}
            onClick={() => prev && goTo(prev)}
            aria-label={prev ? `이전 장비: ${prev.fullName}` : "이전 장비 없음"}
          >
            <span className={styles.navLabel}>← 이전</span>
            <span className={styles.navTitle}>{prev?.name ?? ""}</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${styles.next}`}
            disabled={!next}
            onClick={() => next && goTo(next)}
            aria-label={next ? `다음 장비: ${next.fullName}` : "다음 장비 없음"}
          >
            <span className={styles.navLabel}>다음 →</span>
            <span className={styles.navTitle}>{next?.name ?? ""}</span>
          </button>
        </nav>

        {/* 목록으로 돌아가기 — 항상 /about/facility로 push (router.back은 prev/next 거치면 잘못된 목적지) */}
        <Link href="/about/facility" className={styles.listLink}>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}