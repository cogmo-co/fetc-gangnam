import { use } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations, useMessages, NextIntlClientProvider } from "next-intl";
import { pickMessages } from "@/i18n/pick";
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

export default function FacilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Facility");
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={pickMessages(messages, ["Facility", "Carousel"])}>
        <EquipmentGrid subtitle={t("subtitle")} />
        <CenterCarousel />
      </NextIntlClientProvider>
    </>
  );
}