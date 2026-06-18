import type { Metadata } from "next";
import ContactView from "@/components/ContactView/ContactView";

export const metadata: Metadata = {
  title: "CONTACT",
  description:
    "FE트레이닝센터 강남점 기관 ∙ 단체 ∙ 기업 협업 문의 — 협업·제휴·미디어·채용·교육 협력 전용 페이지.",
};

export default function ContactPage() {
  return (
    <div className="sub-page">
      <ContactView />
    </div>
  );
}
