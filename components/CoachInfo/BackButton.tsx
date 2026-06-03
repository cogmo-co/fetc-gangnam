"use client";

import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function BackButton({ className }: Props) {
  const router = useRouter();

  function handleBack() {
    // 내부 사이트에서 온 경우 router.back → 브라우저 native 스크롤 복원
    // 직접 URL 접속이면 /about/coach 푸시 (fallback)
    // startsWith(origin)로 정확한 origin 매칭 (서브도메인/유사 도메인 false positive 차단)
    if (
      typeof window !== "undefined" &&
      document.referrer &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
    } else {
      router.push("/about/coach");
    }
  }

  return (
    <button type="button" onClick={handleBack} className={className}>
      ← 목록으로
    </button>
  );
}