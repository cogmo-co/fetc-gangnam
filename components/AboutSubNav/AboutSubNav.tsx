"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AboutSubNav.module.css";

// hash 앵커로 sticky bar 아래에 title이 오도록 스크롤 (CSS scroll-padding-top과 연동)
const TABS = [
  { label: "FETC", href: "/about/FETC#intro" },
  { label: "COACH", href: "/about/coach#coaches" },
  { label: "FACILITY", href: "/about/facility#equipments" },
  { label: "LOCATION", href: "/about/location#location" },
];

export default function AboutSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="About sub navigation">
      <div className={styles.inner}>
        {TABS.map((tab) => {
          // hash 부분 제거하고 pathname과 비교 (sub-route 포함: /about/facility/vald 도 FACILITY 탭 active)
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