"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Coach } from "@/lib/coaches";
import Body from "./Body";
import styles from "./Modal.module.css";

interface Props {
  coach: Coach;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Modal({ coach, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ESC 닫기 + Tab focus trap
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // body scroll lock + 진입 시 첫 focusable로 focus 이동, 종료 시 이전 focus 복귀
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusables = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables?.[0]?.focus();

    return () => {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modalWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coach-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="닫기">
          ×
        </button>
        <div className={styles.modal}>
          <div className={styles.imageArea}>
            <Image
              src={`/images/${coach.img}`}
              alt={coach.name}
              fill
              sizes="(max-width:640px) 90vw, 400px"
            />
          </div>

          <div className={styles.textArea}>
            <div className={styles.header}>
              <div className={styles.role}>{coach.role}</div>
              <h2 id="coach-modal-title" className={styles.name}>{coach.name}</h2>
            </div>
            <div className={styles.scrollArea}>
              <Body coach={coach} />
            </div>
            <div className={styles.footer}>
              <a
                href={coach.tistoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.moreBtn}
              >
                더보기
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}