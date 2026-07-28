import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import WhyFETC from "@/components/WhyFETC/WhyFETC";
import FAQSection from "@/components/FAQSection/FAQSection";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: "FE TRAINING CENTER", description: t("aboutFETCDesc") };
}

export default function FETCPage() {
  const t = useTranslations("AboutFETC");
  return (
    <>
      <section id="intro" className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>FE TRAINING CENTER</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>{t.rich("intro1", { br: () => <br /> })}</p>
          <p>{t.rich("intro2", { br: () => <br /> })}</p>
          <p>{t.rich("intro3", { br: () => <br /> })}</p>
        </div>
      </section>

      <WhyFETC />

      <FAQSection />
    </>
  );
}
