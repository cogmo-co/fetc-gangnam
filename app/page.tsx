import { Suspense } from "react";
import { headers } from "next/headers";
import Hero from "@/components/Hero/Hero";
import TistorySection from "@/components/TistorySection/TistorySection";
import MediaSection from "@/components/MediaSection/MediaSection";
import LocationInfoSection from "@/components/LocationInfoSection/LocationInfoSection";
import BranchGrid from "@/components/BranchGrid/BranchGrid";
import NewsPreviewSection from "@/components/NewsPreviewSection/NewsPreviewSection";
import NewsPreviewSkeleton from "@/components/NewsPreviewSection/NewsPreviewSkeleton";
import WhoWeAre from "@/components/WhoWeAre/WhoWeAre";
import FlowticsMethod from "@/components/FlowticsMethod/FlowticsMethod";
import TeamCoachingSystem from "@/components/TeamCoachingSystem/TeamCoachingSystem";
import EquipmentSection from "@/components/EquipmentSection/EquipmentSection";
import { isMobileUA } from "@/lib/device";

// Next.js segment config는 리터럴만 허용 (lib/constants.ts REVALIDATE_INTERVAL과 동기화)
export const revalidate = 3600;

export default async function Home() {
  const ua = (await headers()).get("user-agent") ?? "";
  const isMobile = isMobileUA(ua);
  return (
    <>
      <Hero />
      <Suspense fallback={<NewsPreviewSkeleton />}>
        <NewsPreviewSection />
      </Suspense>

      <WhoWeAre />

      <FlowticsMethod />

      <TeamCoachingSystem />

      <EquipmentSection />

      <TistorySection />
      <MediaSection />
      <LocationInfoSection isMobile={isMobile} />
      <BranchGrid />
    </>
  );
}
