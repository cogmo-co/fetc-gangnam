"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./SlidesNav.module.css";

interface SlidesNavProps {
  children: React.ReactNode;
  bgColor?: string;
}

export default function SlidesNav({ children, bgColor = "#1c1c1c" }: SlidesNavProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const check = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check, { passive: true });
    return () => el.removeEventListener("scroll", check);
  }, [check]);

  const scroll = (dir: number) => {
    const el = rowRef.current;
    if (!el) return;
    const distance = dir * el.clientWidth * 0.7;
    const start = el.scrollLeft;
    const duration = 500;
    let startTime: number | null = null;

    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      el.scrollLeft = start + distance * ease(progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className={styles.slidesWrap}>
      {canLeft && (
        <button
          className={`${styles.navZone} ${styles.navLeft}`}
          style={{ background: `linear-gradient(to right, ${bgColor} 0%, transparent 100%)` }}
          onClick={() => scroll(-1)}
          aria-label="이전"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      <div ref={rowRef} className={styles.slidesRow}>
        {children}
      </div>
      {canRight && (
        <button
          className={`${styles.navZone} ${styles.navRight}`}
          style={{ background: `linear-gradient(to left, ${bgColor} 0%, transparent 100%)` }}
          onClick={() => scroll(1)}
          aria-label="다음"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
    </div>
  );
}
