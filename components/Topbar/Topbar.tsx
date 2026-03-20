"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PHONE } from "@/lib/constants";
import BookingLink from "@/components/BookingLink/BookingLink";
import styles from "./Topbar.module.css";

interface TopbarProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Topbar({ menuOpen, onToggleMenu }: TopbarProps) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const alwaysSolid = pathname.startsWith("/admin");

  useEffect(() => {
    if (alwaysSolid) return;
    const handler = () => setSolid(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [alwaysSolid]);

  return (
    <header className={`${styles.topbar} ${alwaysSolid || solid ? styles.solid : ""}`}>
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
        <a href={`tel:${PHONE}`} className={`${styles.btn} ${styles.callText}`}>
          전화 문의
        </a>
        <a href={`tel:${PHONE}`} className={styles.callIcon} aria-label="전화 문의">
          <svg fill="currentColor" viewBox="0 0 512 512" width="22" height="22"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"/></svg>
        </a>
        <BookingLink className={`${styles.btn} ${styles.callText}`}>상담 예약</BookingLink>
        <BookingLink className={styles.callIcon} aria-label="상담 예약">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor"><path d="M14,1.5h-2.5V0.8c0-0.3-0.2-0.5-0.5-0.5h-0.2c-0.3,0-0.5,0.2-0.5,0.5v0.7H5.7V0.8c0-0.3-0.2-0.5-0.5-0.5H5 c-0.3,0-0.5,0.2-0.5,0.5v0.7H2c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1v-12C15,1.9,14.6,1.5,14,1.5z M13.8,14.3H2.2 V4h11.6V14.3z M6.9,12H5V6h1.8l2.3,3.2V6H11v6H9.2L6.9,8.8V12z"/></svg>
        </BookingLink>
        <a href="https://fetc.mycafe24.com/AMS.html" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.callText}`}>
          AMS
        </a>
        <a href="https://fetc.mycafe24.com/AMS.html" target="_blank" rel="noopener noreferrer" className={styles.callIcon} aria-label="AMS">
          <svg fill="currentColor" viewBox="0 0 512 512" width="22" height="22"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
        </a>
      </div>
    </header>
  );
}
