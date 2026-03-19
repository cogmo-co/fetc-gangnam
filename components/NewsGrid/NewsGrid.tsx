"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NewsModal from "@/components/NewsModal/NewsModal";
import styles from "./NewsGrid.module.css";

export interface NewsPost {
  id: string;
  title: string;
  body?: string;
  image_urls: string[];
  created_at: string;
  like_count: number;
}

interface Props {
  initialPosts: NewsPost[];
  initialCursor: string | null;
}

export default function NewsGrid({ initialPosts, initialCursor }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState<NewsPost[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<NewsPost | null>(null);

  async function loadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/posts?cursor=${encodeURIComponent(cursor)}`);
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setCursor(data.nextCursor);
    } catch {
      // 조용히 실패
    } finally {
      setLoadingMore(false);
    }
  }

  function openPost(post: NewsPost) {
    if (window.innerWidth <= 640) {
      router.push(`/news/${post.id}`);
    } else {
      setSelected(post);
      history.pushState(null, "", `/news/${post.id}`);
    }
  }

  const closePost = useCallback(() => {
    setSelected(null);
    history.pushState(null, "", "/news");
  }, []);

  // 브라우저 뒤로가기 시 모달 닫기
  useEffect(() => {
    function handlePopState() {
      setSelected(null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (posts.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.empty}>소식이 없습니다</div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={styles.cell}
            onClick={() => openPost(post)}
          >
            <Image
              src={post.image_urls[0]}
              alt={post.title}
              fill
              sizes="(max-width:640px) 33vw, 320px"
            />
            {post.image_urls.length > 1 && (
              <span className={styles.multiIcon}>
                <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor">
                  <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"/>
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      {cursor && (
        <button
          className={styles.loadMore}
          onClick={loadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "불러오는 중..." : "+ 더보기"}
        </button>
      )}

      {selected && (
        <NewsModal post={selected} onClose={closePost} />
      )}
    </section>
  );
}
