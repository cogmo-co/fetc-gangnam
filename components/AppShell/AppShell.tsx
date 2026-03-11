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

      document.querySelectorAll(".sr").forEach((el) => {
        el.classList.remove("visible");
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
