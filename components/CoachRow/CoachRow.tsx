"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COACHES, type Coach } from "@/lib/coaches";
import Modal from "@/components/CoachInfo/Modal";
import styles from "./CoachRow.module.css";

interface Props {
  autoOpenCoach?: Coach;
}

export default function CoachRow({ autoOpenCoach }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Coach | null>(null);

  // /coach/[id] 직접 접속 시 PC에서 모달 자동 열기
  useEffect(() => {
    if (autoOpenCoach && window.innerWidth > 640) {
      setSelected(autoOpenCoach);
    }
  }, [autoOpenCoach]);

  // 브라우저 뒤로가기 시 모달 닫기
  useEffect(() => {
    function handlePopState() {
      setSelected(null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function openCoach(coach: Coach) {
    if (window.innerWidth <= 640) {
      router.push(`/coach/${coach.id}`);
    } else {
      setSelected(coach);
      history.pushState(null, "", `/coach/${coach.id}`);
    }
  }

  function closeCoach() {
    setSelected(null);
    // autoOpenCoach가 있으면 /coach/[id] 직접 접속 컨텍스트 → About 페이지의 coach 섹션으로 네비게이션.
    // 없으면 About 페이지에서 모달 연 케이스 → URL만 복귀(재렌더 없음 = scroll-reveal 깜빡임 방지).
    if (autoOpenCoach) {
      router.push("/about#coaches");
    } else {
      history.pushState(null, "", "/about");
    }
  }

  return (
    <>
      <div id="coaches" className={styles.section}>
        <h2 className={`${styles.sectionTitle} sr`}>COACH</h2>
        <div className={styles.row}>
          {COACHES.map((coach, i) => (
            <div
              key={coach.id}
              className={`${styles.card} sr sr-d${i + 1}`}
              role="button"
              tabIndex={0}
              onClick={() => openCoach(coach)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openCoach(coach);
                }
              }}
              aria-label={`${coach.name} 코치 상세 보기`}
            >
              <div className={styles.photo}>
                <Image src={`/images/${coach.img}`} alt={coach.name} width={360} height={460} />
              </div>
              <div className={styles.info}>
                <div className={styles.infoText}>
                  <div className={styles.role}>{coach.role}</div>
                  <h3 className={styles.name}>{coach.name}</h3>
                </div>
                <div className={styles.arrow} aria-hidden="true">
                  <svg width="44" height="44" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M210.7 147.6c7.5-7.5 19.8-7.5 27.3 0l95.4 95.7c7.3 7.3 7.5 19.1.6 26.6l-94 94.3c-3.8 3.8-8.7 5.7-13.7 5.7-4.9 0-9.9-1.9-13.6-5.6-7.5-7.5-7.6-19.7 0-27.3l79.9-81.1-81.9-81.1c-7.6-7.4-7.6-19.6 0-27.2z" />
                    <path d="M48 256c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48 48 141.1 48 256zm32 0c0-47 18.3-91.2 51.6-124.4C164.8 98.3 209 80 256 80s91.2 18.3 124.4 51.6C413.7 164.8 432 209 432 256s-18.3 91.2-51.6 124.4C347.2 413.7 303 432 256 432s-91.2-18.3-124.4-51.6C98.3 347.2 80 303 80 256z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && <Modal coach={selected} onClose={closeCoach} />}
    </>
  );
}