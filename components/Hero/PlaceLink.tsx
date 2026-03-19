import { headers } from "next/headers";

interface Props {
  placeId?: string;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_PLACE_ID = "1961624906";

export default async function PlaceLink({ placeId, className, children }: Props) {
  const id = placeId || DEFAULT_PLACE_ID;
  const pcUrl = `https://map.naver.com/p/entry/place/${id}`;
  const mobileUrl = `https://m.place.naver.com/place/${id}`;

  const ua = (await headers()).get("user-agent") ?? "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  return (
    <a
      href={isMobile ? mobileUrl : pcUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children || "센터 위치"}
    </a>
  );
}
