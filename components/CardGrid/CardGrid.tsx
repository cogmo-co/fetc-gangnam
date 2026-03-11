import styles from "./CardGrid.module.css";

interface CardItem {
  num: string;
  title: string;
  body: React.ReactNode;
}

interface CardGridProps {
  eyebrow?: string;
  sectionTitle?: string;
  cards: CardItem[];
  dividerColor?: string;
}

export default function CardGrid({ eyebrow, sectionTitle, cards, dividerColor = "#13264B" }: CardGridProps) {
  return (
    <div className={styles.wrapper}>
      {eyebrow && <div className={`${styles.eyebrow} sr`}>{eyebrow}</div>}
      {sectionTitle && <div className={`${styles.title} sr`}>{sectionTitle}</div>}
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div key={card.num} className={`${styles.card} sr sr-d${i + 1}`}>
            <div className={styles.cardNum}>{card.num}</div>
            <div className={styles.cardTitle}>{card.title}</div>
            <div className={styles.divider} style={{ background: dividerColor }} />
            <p className={styles.cardBody}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
