"use client";

import { useEffect, useState } from "react";
import styles from "../Hero/Hero.module.css";

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handler = () => setHidden(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={styles.scrollDown}
      aria-hidden="true"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.4s" }}
    >
      <span className={styles.scrollPill}>
        <span className={styles.scrollDot} />
      </span>
    </div>
  );
}
