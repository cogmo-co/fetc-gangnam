"use client";

import { Link, usePathname } from "@/i18n/navigation";
import styles from "./ProgramSubNav.module.css";

// hash 앵커로 sticky bar 아래에 title이 오도록 스크롤 (CSS scroll-padding-top과 연동)
const TABS = [
  { label: "PERFORMANCE", href: "/program/performance#intro" },
  { label: "TRAINING", href: "/program/training#intro" },
  { label: "REHAB", href: "/program/rehabilitation#intro" },
];

export default function ProgramSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Program sub navigation">
      <div className={styles.inner}>
        {TABS.map((tab) => {
          // hash 부분 제거하고 pathname과 비교 (sub-route 포함: /program/performance/xxx 도 PERFORMANCE 탭 active)
          const basePath = tab.href.split("#")[0];
          const active =
            pathname === basePath || pathname.startsWith(`${basePath}/`);
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