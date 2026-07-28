import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactView from "@/components/ContactView/ContactView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: "CONTACT", description: t("contactDesc") };
}

export default function ContactPage() {
  return (
    <div className="sub-page">
      <ContactView />
    </div>
  );
}
