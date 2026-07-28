import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// 로케일 인지 네비게이션 — 기존 next/link, next/navigation 대신 사용
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
