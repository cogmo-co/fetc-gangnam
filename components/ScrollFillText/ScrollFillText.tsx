"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./ScrollFillText.module.css";

interface ScrollFillTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollFillText({ children, className }: ScrollFillTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 요소가 뷰포트 하단 80% 지점에 진입하면 시작, 40% 지점에서 완료
      const start = vh * 0.8;
      const end = vh * 0.4;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setFill(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span
      ref={ref}
      className={`${styles.fillText} ${className ?? ""}`}
      style={{ backgroundPosition: `0 ${100 - fill * 100}%` }}
    >
      {children}
    </span>
  );
}
