"use client";

interface BookingLinkProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export default function BookingLink({ children, className, style, "aria-label": ariaLabel }: BookingLinkProps) {
  const today = new Date().toISOString().slice(0, 10);
  const href = `https://booking.naver.com/booking/6/bizes/718599/items/4501143?area=ple&lang=ko&startDate=${today}&theme=place`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
