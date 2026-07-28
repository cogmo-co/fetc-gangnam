import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import CoachRow from "@/components/CoachRow/CoachRow";
import { getAllCoachesSchema } from "@/lib/coaches";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: "COACH", description: t("coachDesc") };
}

export default function CoachPage() {
  const t = useTranslations("Coach");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getAllCoachesSchema()),
        }}
      />
      <CoachRow subtitle={t.rich("subtitle", { br: () => <br /> })} />
    </>
  );
}