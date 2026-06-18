"use client";

import Link from "next/link";
import styles from "./MenuOverlay.module.css";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

type MenuLeaf = { label: string; href: string };
type MenuGroup = { label: string; href: string; children: MenuLeaf[] };
type MenuItem = MenuLeaf | MenuGroup;

// 1depth 라벨 클릭 시 첫 sub로 navigate (mobile drawer와 동일).
// PC는 hover로 submenu 노출 (CSS).
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

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <nav className={`${styles.overlay} ${open ? styles.open : ""}`}>
      <div className={styles.nav}>
        {MENU_ITEMS.map((item) =>
          isGroup(item) ? (
            <div key={item.label} className={styles.group}>
              <Link
                href={item.href}
                className={styles.navLink}
                onClick={onClose}
              >
                {item.label}
              </Link>
              <div className={styles.submenu}>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={styles.subLink}
                    onClick={onClose}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={onClose}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}