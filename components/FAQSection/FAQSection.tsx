"use client";

import { useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import styles from "./FAQSection.module.css";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = FAQ_KEYS.map((k) => ({ q: t(`${k}.q`), a: t(`${k}.a`) }));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  return (
    <>
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className={styles.section}>
        <h2 className={styles.title}>Q&amp;A</h2>
        <div className={styles.list}>
          {faqs.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
                <button
                  type="button"
                  className={styles.q}
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    <span className={styles.toggleBar} />
                    <span className={`${styles.toggleBar} ${styles.toggleBarV}`} />
                  </span>
                </button>
                {open && <div className={styles.a}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}