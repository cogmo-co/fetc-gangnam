import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./EquipmentSection.module.css";

const EQUIPMENT = [
  { name: "VALD", label: "VALD", src: "/images/main/main_vald.jpg" },
  { name: "KEISER", label: "KEISER", src: "/images/main/main_keiser.jpg" },
  { name: "WINBACK", label: "WINBACK", src: "/images/main/main_winback.jpg" },
  { name: "Speediance", label: "Speediance", src: "/images/main/main_speediance.jpg" },
  { name: "Reaction Light", label: "Reaction\nLight", src: "/images/main/main_reaction_light.jpg" },
  { name: "matrix s-drive", label: "matrix s-drive", src: "/images/main/main_matrix_self_drive.jpg" },
];

export default function EquipmentSection() {
  const t = useTranslations("Equipment");
  const c = useTranslations("Common");
  const a = useTranslations("A11y");
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={`${styles.title} sr`}>EQUIPMENT</h2>
          <Link href="/about/facility" className={`${styles.more} sr sr-d1`}>
            {c("more")}
          </Link>
        </div>

        <div className={styles.grid}>
          {EQUIPMENT.map((item) => (
            <div key={item.name} className={styles.card}>
              <Image
                src={item.src}
                alt={a("equipmentAlt", { name: item.name })}
                fill
                sizes="(max-width:640px) 70vw, 16vw"
              />
              <div className={styles.overlay} />
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>

        <p className={styles.caption}>
          {t.rich("caption", { br: () => <br /> })}
        </p>
      </div>
    </section>
  );
}