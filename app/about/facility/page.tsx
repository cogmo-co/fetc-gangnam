import type { Metadata } from "next";
import EquipmentGrid from "@/components/FacilityEquipment/EquipmentGrid";
import CenterCarousel from "@/components/CenterCarousel/CenterCarousel";

export const metadata: Metadata = {
  title: "FACILITY",
  description:
    "FE트레이닝센터 강남점 시설 — VALD, KEISER, WINBACK, Speediance, Reaction Light, MATRIX S-DRIVE 등 국제 수준의 트레이닝 장비와 전용 공간.",
};

export default function FacilityPage() {
  return (
    <>
      <EquipmentGrid
        subtitle="FEA시스템 정밀 평가와 1:1 트레이닝을 위한 전용 공간"
      />
      <CenterCarousel />
    </>
  );
}