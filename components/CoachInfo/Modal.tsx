"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Coach } from "@/lib/coaches";
import Body from "./Body";
import styles from "./Modal.module.css";

interface Props {
  coach: Coach;
  onClose: () => void;
}

export default function Modal({ coach, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalWrap} onClick={(e) => e.stopPropagation()}>
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
              <h2 className={styles.name}>{coach.name}</h2>
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