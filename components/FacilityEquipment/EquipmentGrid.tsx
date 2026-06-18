"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  EQUIPMENTS,
  type Equipment,
  getEquipmentImage,
} from "@/lib/equipment";
import EquipmentDetail from "./EquipmentDetail";
import styles from "./EquipmentGrid.module.css";

// 모바일에서 detail 페이지로 navigation 시 scrollY 보관 (목록 복귀 시 복원용)
const SCROLL_KEY = "facility-scrollY";

interface Props {
  autoOpenEquipment?: Equipment;
  subtitle?: ReactNode;
}

export default function EquipmentGrid({
  autoOpenEquipment,
  subtitle,
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Equipment | null>(null);
  // detail 한 번이라도 열었으면 grid 복귀 시 카드 sr 애니메이션 skip
  // (AppShell observer setTimeout 타이밍 회피 — 카드 invisible 잔존 버그 방지)
  const [hasOpenedDetail, setHasOpenedDetail] = useState(false);

  // /about/facility/[id] 직접 접속 시 PC에서 모달 자동 열기
  useEffect(() => {
    if (autoOpenEquipment && window.innerWidth > 640) {
      setSelected(autoOpenEquipment);
    }
  }, [autoOpenEquipment]);

  // 브라우저 뒤로가기 시 모달 닫기
  useEffect(() => {
    function handlePopState() {
      setSelected(null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 모바일에서 detail → 「목록으로 돌아가기」 복귀 시 scrollY 복원
  // ⚠️ 목록 페이지(/about/facility)에서만 실행 — detail [id] 페이지도 EquipmentGrid를 (pc-only div로) mount하므로,
  // pathname 체크 없으면 detail 페이지가 중간 스크롤 위치에서 시작하는 버그 발생.
  useEffect(() => {
    if (window.location.pathname !== "/about/facility") return;
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      const y = parseInt(saved, 10);
      if (!Number.isNaN(y)) {
        requestAnimationFrame(() => window.scrollTo(0, y));
      }
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  function openEquipment(equipment: Equipment) {
    setHasOpenedDetail(true);
    if (window.innerWidth <= 640) {
      // 모바일은 페이지 navigation → 복귀 시 위치 복원용 scrollY 저장
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      router.push(`/about/facility/${equipment.id}`);
    } else {
      setSelected(equipment);
      // inlineDetail 플래그: useResetScrollOnRouteChange가 scroll-to-top skip하도록 마킹
      const currentState = window.history.state ?? {};
      history.pushState(
        { ...currentState, inlineDetail: true },
        "",
        `/about/facility/${equipment.id}`,
      );
    }
  }

  function closeEquipment() {
    setSelected(null);
    // autoOpenEquipment가 있으면 /about/facility/[id] 직접 접속 컨텍스트 → FACILITY 페이지로 네비게이션.
    // 없으면 inline detail 닫기 → URL만 복귀 (재렌더 없음 = scroll-reveal 깜빡임 방지).
    if (autoOpenEquipment) {
      router.push("/about/facility#equipments");
    } else {
      const currentState = window.history.state ?? {};
      history.pushState(
        { ...currentState, inlineDetail: true },
        "",
        "/about/facility",
      );
    }
  }

  return (
    <section id="equipments" className={styles.section}>
      <h2 className={`${styles.sectionTitle} sr`}>FACILITY</h2>
      {subtitle && (
        <p className={`${styles.subtitle} sr sr-d1`}>{subtitle}</p>
      )}

      {selected ? (
        <EquipmentDetail
          equipment={selected}
          onBack={closeEquipment}
          onSelect={openEquipment}
        />
      ) : (
        <div className={styles.grid}>
          {EQUIPMENTS.map((equipment, i) => (
            <div
              key={equipment.id}
              className={`${styles.card} ${hasOpenedDetail ? "" : `sr sr-d${i + 1}`}`}
              role="button"
              tabIndex={0}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => openEquipment(equipment)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openEquipment(equipment);
                }
              }}
              aria-label={`${equipment.name} 장비 상세 보기`}
            >
              {/* 단일 이미지 — 기본 grayscale, hover(PC)/visible(모바일) 시 컬러 */}
              <div className={styles.photo}>
                <Image
                  src={getEquipmentImage(equipment.img)}
                  alt={equipment.name}
                  fill
                  sizes="(max-width:640px) 50vw, 33vw"
                />
              </div>
              <div className={styles.label}>
                <span className={styles.labelText}>{equipment.name}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}