import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubHero from "@/components/SubHero/SubHero";
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
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const equipment = findEquipment(id);

  if (!equipment) return { title: "Equipment" };

  return {
    title: `${equipment.fullName} | FACILITY`,
    description: `FE트레이닝센터 강남점 ${equipment.fullName} — ${equipment.tagline}.`,
    openGraph: {
      title: `${equipment.fullName} - FE트레이닝센터 강남점`,
      images: [`/images/about/facility/${equipment.img}`],
    },
  };
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipment = findEquipment(id);
  if (!equipment) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getEquipmentSchema(equipment)),
        }}
      />
      {/* PC: facility 컨텍스트 + 모달 자동 열기 */}
      <div className="pc-only">
        <SubHero
          title="ABOUT FETC"
          subtitle="강남 선수재활 ∙ 퍼포먼스 트레이닝 | FE트레이닝센터 강남점"
          image="/images/about/facility/hero.jpg"
          half
        />
        <EquipmentGrid autoOpenEquipment={equipment} />
      </div>

      {/* Mobile: Detail 풀페이지 */}
      <div className="mobile-only">
        <Detail equipment={equipment} />
      </div>
    </>
  );
}