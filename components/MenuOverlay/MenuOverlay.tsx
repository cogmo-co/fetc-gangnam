"use client";

import Link from "next/link";
import styles from "./MenuOverlay.module.css";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: "ABOUT", href: "/about" },
  { label: "PERFORMANCE", href: "/performance" },
  { label: "TRAINING", href: "/training" },
  { label: "REHABILITATION", href: "/rehabilitation" },
  { label: "CONTACT", href: "/contact" },
];

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <nav className={`${styles.overlay} ${open ? styles.open : ""}`}>
      <div className={styles.nav}>
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.navLink}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
