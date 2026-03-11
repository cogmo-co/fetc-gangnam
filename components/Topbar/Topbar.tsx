"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookingLink from "@/components/BookingLink/BookingLink";
import styles from "./Topbar.module.css";

interface TopbarProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Topbar({ menuOpen, onToggleMenu }: TopbarProps) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`${styles.topbar} ${solid ? styles.solid : ""}`}>
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
        aria-label="메뉴"
        onClick={onToggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <Link href="/" className={styles.logo}>
        <div className={styles.logoImg}>FETC</div>
        <div className={styles.logoSub}>Gangnam</div>
      </Link>

      <div className={styles.right}>
        <a href="tel:010-3375-9911" className={`${styles.btn} hide-mobile`}>
          전화 문의
        </a>
        <BookingLink className={styles.btn}>상담 예약</BookingLink>
      </div>
    </header>
  );
}
