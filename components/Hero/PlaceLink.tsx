"use client";

const PC_URL = "https://map.naver.com/p/entry/place/1961624906";
const MOBILE_URL = "https://m.place.naver.com/place/1961624906";

export default function PlaceLink({ className }: { className?: string }) {
  return (
    <a
      href={PC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          e.preventDefault();
          window.open(MOBILE_URL, "_blank");
        }
      }}
    >
      센터 위치
    </a>
  );
}
