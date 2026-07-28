import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import EquipmentGrid from "@/components/FacilityEquipment/EquipmentGrid";
import Detail from "@/components/FacilityEquipment/Detail";
import {
  EQUIPMENTS,
  findEquipment,
  getEquipmentSchema,
} from "@/lib/equipment";

export function generateStaticParams() {
  return EQUIPMENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const equipment = findEquipment(id, locale);

  if (!equipment) return { title: "Equipment" };

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const site = t("siteName");

  return {
    title: `${equipment.fullName} | FACILITY`,
    description: `${site} ${equipment.fullName} — ${equipment.tagline}.`,
    openGraph: {
      title: `${equipment.fullName} - ${site}`,
      images: [`/images/about/facility/${equipment.img}`],
    },
  };
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  setRequestLocale(locale);
  const equipment = findEquipment(id, locale);
  if (!equipment) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getEquipmentSchema(equipment)),
        }}
      />
      {/* PC: SubHero+SubNav은 layout이 자동 처리 (HERO 부모 fallback). EquipmentGrid가 autoOpen으로 detail 렌더 */}
      <div className="pc-only">
        <EquipmentGrid autoOpenEquipment={equipment} />
      </div>

      {/* Mobile: Detail 풀페이지 */}
      <div className="mobile-only">
        <Detail equipment={equipment} />
      </div>
    </>
  );
}