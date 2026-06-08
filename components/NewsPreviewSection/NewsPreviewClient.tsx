"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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

  async function openPost(post: NewsPreviewPost) {
    // 모바일: full page 이동 — /news/[id]에서 자체 server fetch
    if (window.innerWidth <= 640) {
      window.location.href = `/news/${post.id}`;
      return;
    }

    // PC: 모달용 단건 fetch
    if (loadingId) return; // 중복 클릭 방지
    setLoadingId(post.id);
    try {
      const res = await fetch(`/api/posts/${post.id}`);
      if (!res.ok) throw new Error("fetch failed");
      const { post: full }: { post: NewsPost } = await res.json();
      setSelected(full);
      history.pushState(null, "", `/news/${post.id}`);
    } catch {
      // fallback: full page 이동
      window.location.href = `/news/${post.id}`;
    } finally {
      setLoadingId(null);
    }
  }

  const closePost = useCallback(() => {
    setSelected(null);
    history.pushState(null, "", "/");
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>FETC NEWS</h2>
        <Link href="/news" className={styles.more}>
          더보기
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
              />
            )}
          </div>
        ))}
      </SlidesNav>

      {selected && <NewsModal post={selected} onClose={closePost} />}
    </section>
  );
}