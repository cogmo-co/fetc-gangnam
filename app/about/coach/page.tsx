import type { Metadata } from "next";
import CoachRow from "@/components/CoachRow/CoachRow";
import { getAllCoachesSchema } from "@/lib/coaches";

export const metadata: Metadata = {
  title: "COACH",
  description:
    "FE트레이닝센터 강남점 코치진 — 물리치료사 및 국가대표 트레이너 출신, FEARA 인증 PCC 코치진의 1:1 트레이닝.",
};

export default function CoachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getAllCoachesSchema()),
        }}
      />
      <CoachRow
        subtitle={
          <>
            물리치료사 및 국가대표 트레이너 출신,
            <br />
            FEARA 인증 PCC 코치진의 1:1 트레이닝
          </>
        }
      />
    </>
  );
}