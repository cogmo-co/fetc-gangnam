"use client";

import { useState, useRef, useCallback } from "react";

export function useCarousel(total: number) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(total - 1, c + 1)),
    [total]
  );

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (touchDeltaX.current > 50) prev();
    else if (touchDeltaX.current < -50) next();
  }

  return {
    current,
    setCurrent,
    prev,
    next,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
