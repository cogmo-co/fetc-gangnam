"use client";

interface Props {
  placeId?: string;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_PLACE_ID = "1961624906";

export default function PlaceLink({ placeId, className, children }: Props) {
  const id = placeId || DEFAULT_PLACE_ID;
  const pcUrl = `https://map.naver.com/p/entry/place/${id}`;
  const mobileUrl = `https://m.place.naver.com/place/${id}`;

  return (
    <a
      href={pcUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          e.preventDefault();
          window.open(mobileUrl, "_blank");
        }
      }}
    >
      {children || "센터 위치"}
    </a>
  );
}
