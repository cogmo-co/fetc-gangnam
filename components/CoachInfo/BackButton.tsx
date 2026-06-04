"use client";

import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  /** 직접 URL 접속(internal referrer 없음) 시 fallback push 경로. 기본: /about/coach */
  fallbackUrl?: string;
  /** 버튼 라벨. 기본: "← 목록으로" */
  label?: string;
}

export default function BackButton({
  className,
  fallbackUrl = "/about/coach",
  label = "← 목록으로",
}: Props) {
  const router = useRouter();

  function handleBack() {
    // 내부 사이트에서 온 경우 router.back → 브라우저 native 스크롤 복원
    // 직접 URL 접속이면 fallbackUrl 푸시
    // startsWith(origin)로 정확한 origin 매칭 (서브도메인/유사 도메인 false positive 차단)
    if (
      typeof window !== "undefined" &&
      document.referrer &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  }

  return (
    <button type="button" onClick={handleBack} className={className}>
      {label}
    </button>
  );
}