import Link from "next/link";
import Image from "next/image";
import ScrollFillText from "../ScrollFillText/ScrollFillText";
import styles from "./FullSection.module.css";

interface FullSectionProps {
  bgColor: string;
  bgLabel: string;
  text: string;
  body: React.ReactNode;
  href: string;
}

export default function FullSection({ bgColor, bgLabel, text, body, href }: FullSectionProps) {
  return (
    <Link href={href} className={styles.section} style={{ background: bgColor }}>
      <div className={styles.bg}>
        <Image src={`/images/${bgLabel.toLowerCase()}.jpg`} alt={bgLabel} fill sizes="100vw" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${styles.bgText} sr`}>
          <ScrollFillText className={styles.bgTextSpan}>{text}</ScrollFillText>
        </div>
        <p className={`${styles.body} sr sr-d1`}>{body}</p>
      </div>
    </Link>
  );
}
