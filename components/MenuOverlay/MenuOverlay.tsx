"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MenuOverlay.module.css";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

type MenuLeaf = { label: string; href: string };
type MenuGroup = { label: string; children: MenuLeaf[] };
type MenuItem = MenuLeaf | MenuGroup;

const MENU_ITEMS: MenuItem[] = [
  {
    label: "ABOUT",
    children: [
      { label: "FE TRAINING CENTER", href: "/about/FETC" },
      { label: "COACH", href: "/about/coach" },
      { label: "FACILITY", href: "/about/facility" },
      { label: "LOCATION", href: "/about/location" },
    ],
  },
  {
    label: "PROGRAM",
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
  // 펼친 group (한 번에 1개만, null이면 모두 접힘 — PC는 hover로 별도 펼침)
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleParentClick = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <nav className={`${styles.overlay} ${open ? styles.open : ""}`}>
      <div className={styles.nav}>
        {MENU_ITEMS.map((item) =>
          isGroup(item) ? (
            <div
              key={item.label}
              className={`${styles.group} ${expanded === item.label ? styles.expanded : ""}`}
            >
              <button
                type="button"
                className={styles.navLink}
                onClick={() => handleParentClick(item.label)}
                aria-expanded={expanded === item.label}
              >
                {item.label}
              </button>
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