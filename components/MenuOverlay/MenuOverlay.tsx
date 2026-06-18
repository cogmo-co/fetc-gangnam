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
        <Link href="/reservation" className={styles.cta} onClick={onClose}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 22H5a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7v2zm10.13-5.01.71-.71a.996.996 0 0 0 0-1.41l-.71-.71a.996.996 0 0 0-1.41 0l-.71.71 2.12 2.12zm-.71.71-5.3 5.3H14v-2.12l5.3-5.3 2.12 2.12z" />
          </svg>
          RESERVATION
        </Link>
      </div>
    </nav>
  );
}