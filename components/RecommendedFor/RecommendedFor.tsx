import { ReactNode } from "react";
import styles from "./RecommendedFor.module.css";

export interface RecommendedItem {
  title: ReactNode;
  caption?: string;
}

interface RecommendedForProps {
  items: RecommendedItem[];
}

export default function RecommendedFor({ items }: RecommendedForProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.eyebrow} sr`}>RECOMMENDED FOR</h2>
        <ul className={styles.list}>
          {items.map((item, i) => (
            <li key={i} className={`${styles.item} sr sr-d${i + 1}`}>
              <span className={styles.check} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className={styles.text}>
                <div className={styles.title}>{item.title}</div>
                {item.caption && <div className={styles.caption}>{item.caption}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}