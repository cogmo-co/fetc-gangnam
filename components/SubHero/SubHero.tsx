import Image from "next/image";
import styles from "./SubHero.module.css";

interface SubHeroProps {
  title: string;
  bgLabel?: string;
  image?: string;
}

export default function SubHero({ title, bgLabel, image }: SubHeroProps) {
  return (
    <div className={styles.subHero}>
      <div className={styles.bg}>
        {image ? (
          <Image src={image} alt={bgLabel || title} fill sizes="100vw" />
        ) : (
          <div className={styles.bgPh}>{bgLabel || title} IMAGE</div>
        )}
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.bgText}>{title}</div>
      </div>
    </div>
  );
}
