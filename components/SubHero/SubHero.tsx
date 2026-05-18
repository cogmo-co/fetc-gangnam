import Image from "next/image";
import styles from "./SubHero.module.css";

interface SubHeroProps {
  title: string;
  subtitle?: string;
  bgLabel?: string;
  image?: string;
  half?: boolean;
}

export default function SubHero({ title, subtitle, bgLabel, image, half }: SubHeroProps) {
  return (
    <div className={`${styles.subHero} ${half ? styles.half : ""}`}>
      <div className={styles.bg}>
        {image ? (
          <Image src={image} alt={bgLabel || title} fill sizes="100vw" />
        ) : (
          <div className={styles.bgPh}>{bgLabel || title} IMAGE</div>
        )}
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        {subtitle && <h1 className={styles.subtitle}>{subtitle}</h1>}
        <div className={styles.bgText} aria-hidden="true">{title}</div>
      </div>
    </div>
  );
}
