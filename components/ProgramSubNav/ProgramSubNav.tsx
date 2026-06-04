"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ProgramSubNav.module.css";

const TABS = [
  { label: "PERFORMANCE", href: "/program/performance" },
  { label: "TRAINING", href: "/program/training" },
  { label: "REHAB", href: "/program/rehabilitation" },
];

export default function ProgramSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Program sub navigation">
      <div className={styles.inner}>
        {TABS.map((tab) => {
          // sub-route 포함: /program/performance/xxx 도 PERFORMANCE 탭 active
          const active =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
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