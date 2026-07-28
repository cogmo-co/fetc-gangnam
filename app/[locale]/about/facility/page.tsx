import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import EquipmentGrid from "@/components/FacilityEquipment/EquipmentGrid";
import CenterCarousel from "@/components/CenterCarousel/CenterCarousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: "FACILITY", description: t("facilityDesc") };
}

export default function FacilityPage() {
  const t = useTranslations("Facility");
  return (
    <>
      <EquipmentGrid subtitle={t("subtitle")} />
      <CenterCarousel />
    </>
  );
}