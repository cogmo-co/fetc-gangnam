import type { Metadata } from "next";
import ContactView from "@/components/ContactView/ContactView";

export const metadata: Metadata = {
  title: "문의",
  description:
    "FE트레이닝센터 강남점 상담 예약 및 문의. 전화, 네이버 예약, 카카오톡 채널로 연락하세요.",
};

export default function ContactPage() {
  return (
    <div className="sub-page">
      <ContactView />
    </div>
  );
}
