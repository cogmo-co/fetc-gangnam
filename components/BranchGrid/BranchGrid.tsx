import { useTranslations } from "next-intl";
import styles from "./BranchGrid.module.css";
import PlaceLink from "@/components/Hero/PlaceLink";

// 송파·공릉은 각 지점 사이트로 이동 (기존 네이버 placeId는 주석 보존). 나머지는 네이버 지도.
const BRANCHES: { key: string; current: boolean; placeId?: string; siteUrl?: string }[] = [
  { key: "gangnam", current: true, placeId: "1961624906" },
  { key: "songpa", current: false, /* placeId: "1961789868" */ siteUrl: `https://fetc.kr/${encodeURIComponent("송파점")}/` },
  { key: "gongneung", current: false, /* placeId: "1216111320" */ siteUrl: `https://fetc.kr/${encodeURIComponent("공릉점")}/` },
  { key: "cheonan", current: false, placeId: "1149284242" },
];

interface Props {
  /** "location" → /about/location 페이지 전용 (가운데 정렬 + max-width 1000px) */
  variant?: "default" | "location";
}

export default function BranchGrid({ variant = "default" }: Props) {
  const t = useTranslations("Branches");
  const isLocation = variant === "location";
  return (
    <div className={`${styles.wrapper} ${isLocation ? styles.wrapperLocation : ""}`}>
      <div className={`${styles.eyebrow} ${isLocation ? styles.eyebrowLocation : ""}`}>
        {t("eyebrow")}
      </div>
      <div className={`${styles.grid} ${isLocation ? styles.gridLocation : ""}`}>
        {BRANCHES.map((branch, i) => {
          const address = t(`${branch.key}.address`);
          const lines = address.split("\n");
          const className = `${styles.item} ${branch.current ? styles.current : ""} sr sr-d${i + 1}`;
          const inner = (
            <>
              {branch.current && (
                <span className={styles.currentBadge}>{t("current")}</span>
              )}
              <h3 className={styles.name}>{t(`${branch.key}.name`)}</h3>
              <div className={styles.tag}>
                {lines.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < lines.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <svg className={styles.arrow} width="25" height="25" viewBox="0 0 512 512" fill="currentColor"><path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"/></svg>
            </>
          );
          // 송파·공릉은 지점 사이트로, 그 외는 네이버 지도(PlaceLink)
          return branch.siteUrl ? (
            <a
              key={branch.key}
              href={branch.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <PlaceLink key={branch.key} placeId={branch.placeId} className={className}>
              {inner}
            </PlaceLink>
          );
        })}
      </div>
    </div>
  );
}
