"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * pathname 변경 시 최상단으로 스크롤. 다음 케이스는 skip:
 *
 * 1. hash 있음 (예: SubNav 탭 `/about/FETC#intro`) → 브라우저의 anchor scroll에 맡김
 * 2. `history.state.inlineDetail === true` → PC 인라인 detail navigation (예: facility 모니터 chip, coach 모달)
 *    스크롤 위치 보존
 *
 * Next.js 15+부터 `usePathname`이 `history.pushState`에도 반응하므로
 * 인라인 패턴(pushState로 URL만 갱신)에서도 hook이 발동. 플래그로 구분.
 */
export function useResetScrollOnRouteChange() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    if (window.history.state?.inlineDetail) return;
    window.scrollTo(0, 0);
  }, [pathname]);
}