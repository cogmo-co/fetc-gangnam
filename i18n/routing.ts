import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  // 기본 로케일(ko)은 prefix 없음(`/`), 영어만 `/en` 접두
  localePrefix: "as-needed",
});