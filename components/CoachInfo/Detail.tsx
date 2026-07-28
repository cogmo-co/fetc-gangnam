import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import type { Coach } from "@/lib/coaches";
import Body from "./Body";
import BackButton from "./BackButton";
import styles from "./Detail.module.css";

interface Props {
  coach: Coach;
}

export default function Detail({ coach }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === "ko" ? "" : `/${locale}`;
  return (
    <div className={styles.page}>
      <div className={styles.imageArea}>
        <Image
          src={`/images/about/coach/${coach.img}`}
          alt={coach.name}
          fill
          sizes="100vw"
          priority
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.role}>{coach.role}</div>
          <h1 className={styles.name}>{coach.name}</h1>
        </div>

        <Body coach={coach} />

        <div className={styles.actions}>
          <BackButton
            className={styles.backBtn}
            label={t("Coach.backToList")}
            fallbackUrl={`${prefix}/about/coach`}
          />
          <a
            href={coach.tistoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.moreBtn}
          >
            {t("Common.more")}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}