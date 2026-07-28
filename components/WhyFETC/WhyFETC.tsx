import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./WhyFETC.module.css";

const ITEMS = [
  { num: "01", key: "item1", img: "/images/about/fetc/why_fetc_01.jpg" },
  { num: "02", key: "item2", img: "/images/about/fetc/why_fetc_02.jpg" },
  { num: "03", key: "item3", img: "/images/about/fetc/why_fetc_03.jpg" },
  { num: "04", key: "item4", img: "/images/about/fetc/why_fetc_04.jpg" },
];

export default function WhyFETC() {
  const t = useTranslations("WhyFETC");
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {ITEMS.map((item) => (
          <article key={item.num} className={styles.item}>
            <div className={styles.content}>
              <div className={styles.label}>WHY FETC? {item.num}</div>
              <h2 className={styles.title}>
                {t.rich(`${item.key}.title`, { br: () => <br /> })}
              </h2>
              <p className={styles.body}>{t(`${item.key}.body`)}</p>
            </div>
            <div className={styles.imageWrap}>
              <Image
                src={item.img}
                alt={t(`${item.key}.alt`)}
                fill
                sizes="(max-width:640px) 100vw, 40vw"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}