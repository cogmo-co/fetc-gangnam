"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface BookingLinkProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

const BOOKING_BASE = "https://booking.naver.com/booking/6/bizes/718599/items/4501143?area=ple&theme=place";

export default function BookingLink({ children, className, style, "aria-label": ariaLabel }: BookingLinkProps) {
  // lang: 현재 로케일(ko/en)에 맞춰 네이버 예약 UI 언어 전달
  const locale = useLocale();

  // startDate: SSR(기존) → Client
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const href = `${BOOKING_BASE}&lang=${locale}${today ? `&startDate=${today}` : ""}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
