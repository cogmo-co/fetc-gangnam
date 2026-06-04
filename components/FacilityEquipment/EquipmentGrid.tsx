"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  EQUIPMENTS,
  type Equipment,
  getEquipmentImage,
} from "@/lib/equipment";
import Modal from "./Modal";
import styles from "./EquipmentGrid.module.css";

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
  // 마지막 클릭한 카드 — 모달 닫을 때 이 카드 bottom을 viewport 하단에 맞춰 스크롤
  const lastClickedCardRef = useRef<HTMLElement | null>(null);

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

  function openEquipment(equipment: Equipment) {
    if (window.innerWidth <= 640) {
      router.push(`/about/facility/${equipment.id}`);
    } else {
      setSelected(equipment);
      history.pushState(null, "", `/about/facility/${equipment.id}`);
    }
  }

  function closeEquipment() {
    setSelected(null);
    // autoOpenEquipment가 있으면 /about/facility/[id] 직접 접속 컨텍스트 → FACILITY 페이지로 네비게이션.
    // 없으면 FACILITY 페이지에서 모달 연 케이스 → URL만 복귀.
    if (autoOpenEquipment) {
      router.push("/about/facility#equipments");
    } else {
      history.pushState(null, "", "/about/facility");
    }
    // 클릭한 카드의 bottom이 viewport 하단에 오도록 스크롤 (Modal cleanup 후 실행)
    requestAnimationFrame(() => {
      lastClickedCardRef.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    });
  }

  return (
    <>
      <section id="equipments" className={styles.section}>
        <h2 className={`${styles.sectionTitle} sr`}>FACILITY</h2>
        {subtitle && (
          <p className={`${styles.subtitle} sr sr-d1`}>{subtitle}</p>
        )}
        <div className={styles.grid}>
          {EQUIPMENTS.map((equipment, i) => (
            <div
              key={equipment.id}
              className={`${styles.card} sr sr-d${i + 1}`}
              role="button"
              tabIndex={0}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                lastClickedCardRef.current = e.currentTarget;
                openEquipment(equipment);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  lastClickedCardRef.current = e.currentTarget;
                  openEquipment(equipment);
                }
              }}
              aria-label={`${equipment.name} 장비 상세 보기`}
            >
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
      </section>
      {selected && <Modal equipment={selected} onClose={closeEquipment} />}
    </>
  );
}