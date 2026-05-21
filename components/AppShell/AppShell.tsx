"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Topbar from "@/components/Topbar/Topbar";
import MenuOverlay from "@/components/MenuOverlay/MenuOverlay";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll reveal: re-initialize on route change
  useEffect(() => {
    observerRef.current?.disconnect();

    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      // 이미 visible된 요소는 건드리지 않음 — pushState 등으로 effect가 재실행돼도 깜빡임 방지.
      // 신규 라우트의 .sr 요소만 관찰 대상이 됨.
      document.querySelectorAll(".sr:not(.visible)").forEach((el) => {
        observerRef.current?.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <Topbar menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      {children}
    </>
  );
}
