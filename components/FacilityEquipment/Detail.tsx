"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { Equipment } from "@/lib/equipment";
import { getEquipments, getEquipmentImage } from "@/lib/equipment";
import styles from "./Detail.module.css";

interface Props {
  equipment: Equipment;
}

export default function Detail({ equipment }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const prefix = locale === "ko" ? "" : `/${locale}`;
  const equipments = getEquipments(locale);
  const t = useTranslations("Facility");

  // 모바일에서 detail 진입/이전·다음 이동 시 항상 최상단부터 시작
  // (Next.js 기본 scroll-to-top이 일부 모바일 브라우저(S26 등)에서 누락되는 케이스 보정)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [equipment.id]);
  const currentIndex = equipments.findIndex((e) => e.id === equipment.id);
  const prev = currentIndex > 0 ? equipments[currentIndex - 1] : null;
  const next =
    currentIndex < equipments.length - 1
      ? equipments[currentIndex + 1]
      : null;

  function goTo(eq: Equipment) {
    router.push(`${prefix}/about/facility/${eq.id}`);
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
                  alt={t("detailAlt", { name: equipment.name })}
                  fill
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* prev / next 네비게이션 — 블로그 스타일 (좌우 분할, 라벨 + 풀네임) */}
        <nav className={styles.postNav} aria-label={t("equipNav")}>
          <button
            type="button"
            className={`${styles.navItem} ${styles.prev}`}
            disabled={!prev}
            onClick={() => prev && goTo(prev)}
            aria-label={prev ? t("prevEquip", { name: prev.fullName }) : t("noPrev")}
          >
            <span className={styles.navLabel}>{t("prev")}</span>
            <span className={styles.navTitle}>{prev?.name ?? ""}</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${styles.next}`}
            disabled={!next}
            onClick={() => next && goTo(next)}
            aria-label={next ? t("nextEquip", { name: next.fullName }) : t("noNext")}
          >
            <span className={styles.navLabel}>{t("next")}</span>
            <span className={styles.navTitle}>{next?.name ?? ""}</span>
          </button>
        </nav>

        {/* 목록으로 돌아가기 — 항상 /about/facility로 push (router.back은 prev/next 거치면 잘못된 목적지) */}
        <Link href="/about/facility" className={styles.listLink}>
          {t("backToList")}
        </Link>
      </div>
    </div>
  );
}