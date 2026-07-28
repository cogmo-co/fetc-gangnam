"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import styles from "./LanguageSwitcher.module.css";

// 현재 로케일 라벨(KR/EN)을 표시하고, 클릭 시 반대 로케일로 전환.
// next-intl usePathname은 로케일 prefix가 제거된 경로를 반환 → 같은 페이지 유지.
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("A11y");
  const pathname = usePathname();
  const router = useRouter();

  const other = locale === "ko" ? "en" : "ko";
  const label = locale === "ko" ? "KR" : "EN";

  const switchLocale = () => {
    router.replace(pathname, { locale: other, scroll: false });
  };

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={switchLocale}
      aria-label={t("switchLanguage", { label })}
    >
      {label}
    </button>
  );
}
