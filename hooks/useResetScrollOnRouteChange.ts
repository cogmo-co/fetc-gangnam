"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * pathname 변경 시 hash가 없으면 최상단으로 스크롤.
 *
 * - hash 있는 경우 (예: SubNav 탭 `/about/FETC#intro`) → 브라우저의 anchor scroll에 맡김
 * - hash 없는 경우 (예: MenuOverlay 전체 메뉴 진입) → 최상단부터 시작
 *
 * Next.js 기본 scroll-to-top이 일부 모바일 브라우저(S26 등)에서 누락되는 케이스 보정.
 */
export function useResetScrollOnRouteChange() {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
}