import type { Metadata } from "next";
import { headers } from "next/headers";
import LocationInfoSection from "@/components/LocationInfoSection/LocationInfoSection";
import BranchGrid from "@/components/BranchGrid/BranchGrid";
import { isMobileUA } from "@/lib/device";

export const metadata: Metadata = {
  title: "LOCATION",
  description:
    "FE트레이닝센터 강남점 위치 — 서울 강남구 도곡로7길 6, 한은빌딩 4층. 강남역 4번 출구 도보 약 15분.",
};

export default async function LocationPage() {
  const ua = (await headers()).get("user-agent") ?? "";
  const isMobile = isMobileUA(ua);
  return (
    <>
      <LocationInfoSection isMobile={isMobile} centerTitle plain />
      <BranchGrid />
    </>
  );
}