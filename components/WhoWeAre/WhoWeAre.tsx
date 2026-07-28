import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./WhoWeAre.module.css";

export default function WhoWeAre() {
  const t = useTranslations("WhoWeAre");
  const c = useTranslations("Common");
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={`${styles.title} sr`}>WHO WE ARE?</h2>
          <Link href="/about/FETC" className={`${styles.more} sr sr-d1`}>
            {c("more")}
          </Link>
        </div>

        <h3 className={styles.headline}>{t("headline")}</h3>

        <div className={styles.body}>
          <p>{t.rich("body1", { br: () => <br className="pc-br" /> })}</p>
          <p>{t.rich("body2", { br: () => <br className="pc-br" /> })}</p>
        </div>
      </div>
    </section>
  );
}