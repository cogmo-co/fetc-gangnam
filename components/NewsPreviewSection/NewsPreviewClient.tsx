"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import SlidesNav from "@/components/SlidesNav/SlidesNav";
import NewsModal from "@/components/NewsModal/NewsModal";
import type { NewsPost } from "@/components/NewsGrid/NewsGrid";
import styles from "./NewsPreviewSection.module.css";

/** Preview용 슬림 타입 — 썸네일 + 접근성에 필요한 최소 필드만.
 *  모달 열 때 /api/posts/[id]로 full NewsPost fetch. */
export interface NewsPreviewPost {
  id: string;
  title: string;
  image_urls: string[];
}

interface Props {
  posts: NewsPreviewPost[];
}

export default function NewsPreviewClient({ posts }: Props) {
  const [selected, setSelected] = useState<NewsPost | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  // in-flight fetch 추적 — 새 클릭/모달 닫기/언마운트 시 abort
  const abortRef = useRef<AbortController | null>(null);
  const c = useTranslations("Common");
  const locale = useLocale();
  const prefix = locale === "ko" ? "" : `/${locale}`;

  // unmount 시 in-flight fetch 정리
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function openPost(post: NewsPreviewPost) {
    // 모바일: full page 이동 — /news/[id]에서 자체 server fetch
    if (window.innerWidth <= 640) {
      window.location.href = `${prefix}/news/${post.id}`;
      return;
    }

    // PC: 모달용 단건 fetch — 이전 in-flight 있으면 취소하고 새로 시작
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoadingId(post.id);
    try {
      const res = await fetch(`/api/posts/${post.id}`, { signal: ctrl.signal });
      if (!res.ok) throw new Error("fetch failed");
      const { post: full }: { post: NewsPost } = await res.json();
      // 취소 후 도착한 응답 무시
      if (ctrl.signal.aborted) return;
      setSelected(full);
      history.pushState(null, "", `${prefix}/news/${post.id}`);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      // fallback: full page 이동
      window.location.href = `${prefix}/news/${post.id}`;
    } finally {
      // 현재 fetch가 최신인 경우만 loading 상태 정리 (새 클릭으로 교체됐다면 그쪽 loading 보존)
      if (abortRef.current === ctrl) {
        setLoadingId(null);
        abortRef.current = null;
      }
    }
  }

  const closePost = useCallback(() => {
    // 닫을 때 in-flight fetch도 abort
    abortRef.current?.abort();
    setSelected(null);
    history.pushState(null, "", `${prefix}/`);
  }, [prefix]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>FETC NEWS</h2>
        <Link href="/news" className={styles.more}>
          {c("more")}
        </Link>
      </div>
      <SlidesNav bgColor="#181818">
        {posts.map((post) => (
          <div
            key={post.id}
            className={styles.cell}
            onClick={() => openPost(post)}
            aria-busy={loadingId === post.id}
          >
            {post.image_urls?.[0] && (
              <Image
                src={post.image_urls[0]}
                alt={post.title}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        ))}
      </SlidesNav>

      {selected && <NewsModal post={selected} onClose={closePost} />}
    </section>
  );
}