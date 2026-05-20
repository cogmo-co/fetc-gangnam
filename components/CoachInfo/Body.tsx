import type { Coach, CoachSection } from "@/lib/coaches";
import styles from "./Body.module.css";

interface Props {
  coach: Coach;
}

export default function Body({ coach }: Props) {
  return (
    <div className={styles.root}>
      {coach.sections.map((section, i) => renderSection(section, i))}
    </div>
  );
}

function renderSection(section: CoachSection, key: number) {
  switch (section.type) {
    case "timeline":
      return (
        <section key={key} className={styles.section}>
          <span className={styles.sectionLabel}>{section.title}</span>
          <div className={styles.timeline}>
            {section.items.map((item, j) => (
              <div key={j} className={styles.timelineItem}>
                {(item.period || item.badge) && (
                  <div className={styles.timelinePeriod}>
                    {item.period}
                    {item.period && item.badge && " · "}
                    {item.badge}
                  </div>
                )}
                <div className={styles.timelineTitle}>{item.title}</div>
                {item.subtitle && (
                  <div className={styles.timelineSubtitle}>{item.subtitle}</div>
                )}
                {item.bullets && (
                  <ul className={styles.timelineBullets}>
                    {item.bullets.map((b, k) => (
                      <li key={k}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );

    case "certifications":
      return (
        <section key={key} className={styles.section}>
          <span className={styles.sectionLabel}>{section.title}</span>
          <div className={styles.certGrid}>
            {section.items.map((item, j) => (
              <div key={j} className={styles.certCard}>
                {item.label && <div className={styles.certLabel}>{item.label}</div>}
                <div className={styles.certTitle}>{item.title}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case "highlights":
      return (
        <section key={key} className={styles.section}>
          <span className={styles.sectionLabel}>{section.title}</span>
          <div className={styles.highlightGrid}>
            {section.items.map((item, j) => (
              <div
                key={j}
                className={`${styles.highlightItem} ${item.emphasis ? styles.highlightItemEmphasis : ""}`}
              >
                <div className={styles.highlightSeason}>{item.season}</div>
                <div className={styles.highlightEvents}>
                  {item.events.map((e, k) => (
                    <span key={k}>
                      {e}
                      {k < item.events.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "program":
      return (
        <section key={key} className={styles.program}>
          <div className={styles.programLabel}>{section.title}</div>
          <ul className={styles.programList}>
            {section.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </section>
      );
  }
}