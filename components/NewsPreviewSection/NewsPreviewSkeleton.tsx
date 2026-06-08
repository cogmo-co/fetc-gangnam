import Link from "next/link";
import styles from "./NewsPreviewSection.module.css";

/** Suspense fallback — 동일 레이아웃의 4-cell placeholder.
 *  Supabase 응답 대기 동안 layout shift 방지 + shimmer 애니메이션. */
export default function NewsPreviewSkeleton() {
  return (
    <section className={styles.section} aria-busy="true" aria-label="FETC NEWS 로딩 중">
      <div className={styles.header}>
        <h2 className={styles.title}>FETC NEWS</h2>
        <Link href="/news" className={styles.more}>
          더보기
        </Link>
      </div>
      <div className={styles.skeletonGrid}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.cellSkeleton} aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}