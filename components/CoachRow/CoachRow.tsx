"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COACHES, COACH_GROUPS, type Coach } from "@/lib/coaches";
import Modal from "@/components/CoachInfo/Modal";
import styles from "./CoachRow.module.css";

interface Props {
  autoOpenCoach?: Coach;
  subtitle?: ReactNode;
}

export default function CoachRow({ autoOpenCoach, subtitle }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Coach | null>(null);
  // 마지막 클릭한 카드 — 모달 닫을 때 이 카드 bottom을 viewport 하단에 맞춰 스크롤
  const lastClickedCardRef = useRef<HTMLElement | null>(null);

  // /about/coach/[id] 직접 접속 시 PC에서 모달 자동 열기
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
      router.push(`/about/coach/${coach.id}`);
    } else {
      setSelected(coach);
      // inlineDetail 플래그: useResetScrollOnRouteChange가 scroll-to-top skip하도록 마킹
      const currentState = window.history.state ?? {};
      history.pushState(
        { ...currentState, inlineDetail: true },
        "",
        `/about/coach/${coach.id}`,
      );
    }
  }

  function closeCoach() {
    setSelected(null);
    // autoOpenCoach가 있으면 /about/coach/[id] 직접 접속 컨텍스트 → COACH 페이지로 네비게이션.
    // 없으면 COACH 페이지에서 모달 연 케이스 → URL만 복귀(재렌더 없음 = scroll-reveal 깜빡임 방지).
    if (autoOpenCoach) {
      router.push("/about/coach#coaches");
    } else {
      const currentState = window.history.state ?? {};
      history.pushState(
        { ...currentState, inlineDetail: true },
        "",
        "/about/coach",
      );
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
      <div id="coaches" className={styles.section}>
        <h2 className={`${styles.sectionTitle} sr`}>COACH</h2>
        {subtitle && (
          <p className={`${styles.subtitle} sr sr-d1`}>{subtitle}</p>
        )}
        <div className={styles.inner}>
          {COACH_GROUPS.map((group) => (
            <div key={group.key} className={styles.group}>
              {group.key !== "head" && <div className={styles.divider} />}
              <div className={`${styles.groupHead} sr`}>
                <span className={[styles.tag, styles[group.key]].filter(Boolean).join(" ")}>{group.tag}</span>
                {(group.en || group.desc) && (
                  <span className={styles.tagSub}>
                    {group.en && <span className={styles.tagEn}>{group.en}</span>}
                    {group.desc && <span className={styles.tagDesc}>{group.desc}</span>}
                  </span>
                )}
              </div>
              <div className={styles.grid}>
                {COACHES.filter((c) => c.group === group.key).map((coach, i) => (
                  <div
                    key={coach.id}
                    className={`${styles.card} sr sr-d${i + 1}`}
                    role="button"
                    tabIndex={0}
                    // mousedown preventDefault: 클릭 시 카드로 focus 이동 → 브라우저 scroll-into-view 차단
                    // (키보드 Tab 포커스는 onKeyDown으로 처리되므로 영향 없음)
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      lastClickedCardRef.current = e.currentTarget;
                      openCoach(coach);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        lastClickedCardRef.current = e.currentTarget;
                        openCoach(coach);
                      }
                    }}
                    aria-label={`${coach.name} 코치 상세 보기`}
                  >
                    <div className={styles.photo}>
                      <Image
                        src={`/images/about/coach/${coach.img}`}
                        alt={coach.name}
                        fill
                        sizes="(max-width:900px) 50vw, 380px"
                      />
                    </div>
                    <div className={styles.meta}>
                      <div className={styles.infoText}>
                        <div className={styles.role}>{coach.role}</div>
                        <h3 className={styles.name}>{coach.name}</h3>
                      </div>
                      <span className={styles.go} aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && <Modal coach={selected} onClose={closeCoach} />}
    </>
  );
}