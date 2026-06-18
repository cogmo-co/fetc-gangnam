"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileDrawer.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

type MenuLeaf = { label: string; href: string };
type MenuGroup = { label: string; href: string; children: MenuLeaf[] };
type MenuItem = MenuLeaf | MenuGroup;

// 1depth 라벨 클릭 시 첫 sub로 navigate.
// 우측 ▼ 버튼 클릭 시 토글만 (navigation X).
const MENU_ITEMS: MenuItem[] = [
  {
    label: "ABOUT",
    href: "/about/FETC",
    children: [
      { label: "FE TRAINING CENTER", href: "/about/FETC" },
      { label: "COACH", href: "/about/coach" },
      { label: "FACILITY", href: "/about/facility" },
      { label: "LOCATION", href: "/about/location" },
    ],
  },
  {
    label: "PROGRAM",
    href: "/program/performance",
    children: [
      { label: "PERFORMANCE", href: "/program/performance" },
      { label: "TRAINING", href: "/program/training" },
      { label: "REHABILITATION", href: "/program/rehabilitation" },
    ],
  },
  { label: "NEWS", href: "/news" },
  { label: "RESERVATION", href: "/reservation" },
  { label: "CONTACT", href: "/contact" },
];

function isGroup(item: MenuItem): item is MenuGroup {
  return (item as MenuGroup).children !== undefined;
}

export default function MobileDrawer({ open, onClose }: Props) {
  const pathname = usePathname();
  // 다중 펼침 허용 — 1depth 그룹별 독립 토글
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // 현재 페이지와 매칭되는 href (정확 또는 sub-route 포함)
  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const toggleGroup = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  // 페이지 이동 시 현재 페이지를 포함한 그룹만 펼치고 나머지 닫기
  // (drawer 열린 채 수동 토글은 그대로 보존 — pathname이 안 바뀌므로 이 effect 미발동)
  useEffect(() => {
    const activeGroup = MENU_ITEMS.find(
      (item) =>
        isGroup(item) &&
        item.children.some(
          (child) =>
            pathname === child.href || pathname.startsWith(`${child.href}/`),
        ),
    );
    if (activeGroup && isGroup(activeGroup)) {
      setExpanded(new Set([activeGroup.label]));
    } else {
      // leaf 페이지(/news, /contact 등) → 모든 그룹 닫기
      setExpanded(new Set());
    }
  }, [pathname]);

  // ESC 키로 닫기 + 열렸을 때 body 스크롤 잠금
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="모바일 메뉴"
        aria-hidden={!open}
      >
        <nav className={styles.nav}>
          {MENU_ITEMS.map((item) => {
            if (isGroup(item)) {
              const isExpanded = expanded.has(item.label);
              return (
                <div key={item.label} className={styles.group}>
                  <div className={styles.groupRow}>
                    <Link
                      href={item.href}
                      className={styles.parentLabel}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className={styles.toggleBtn}
                      onClick={() => toggleGroup(item.label)}
                      aria-label={`${item.label} 메뉴 ${isExpanded ? "접기" : "펼치기"}`}
                      aria-expanded={isExpanded}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`${styles.submenu} ${isExpanded ? styles.submenuOpen : ""}`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`${styles.subLink} ${isActive(child.href) ? styles.subLinkActive : ""}`}
                        onClick={onClose}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            // Leaf (NEWS, CONTACT)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.parentLabel} ${isActive(item.href) ? styles.parentLabelActive : ""}`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}