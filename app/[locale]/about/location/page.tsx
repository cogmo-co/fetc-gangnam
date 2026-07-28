import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import LocationInfoSection from "@/components/LocationInfoSection/LocationInfoSection";
import BranchGrid from "@/components/BranchGrid/BranchGrid";
import { isMobileUA } from "@/lib/device";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: "LOCATION", description: t("locationDesc") };
}

export default async function LocationPage() {
  const ua = (await headers()).get("user-agent") ?? "";
  const isMobile = isMobileUA(ua);
  return (
    <>
      <LocationInfoSection isMobile={isMobile} centerTitle plain />
      <BranchGrid variant="location"/>
    </>
  );
}