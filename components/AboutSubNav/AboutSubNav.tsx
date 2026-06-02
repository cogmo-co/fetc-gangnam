"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AboutSubNav.module.css";

const TABS = [
  { label: "FETC", href: "/about/FETC" },
  { label: "COACH", href: "/about/coach" },
  { label: "FACILITY", href: "/about/facility" },
  { label: "LOCATION", href: "/about/location" },
];

export default function AboutSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="About sub navigation">
      <div className={styles.inner}>
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`${styles.tab} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}