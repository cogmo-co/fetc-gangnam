"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NewsPost } from "@/components/NewsGrid/NewsGrid";
import { useLike } from "@/hooks/useLike";
import { useCarousel } from "@/hooks/useCarousel";
import { sharePost } from "@/lib/share";
import { formatDate } from "@/lib/format";
import styles from "./NewsDetail.module.css";

interface Props {
  post: NewsPost;
}

export default function NewsDetail({ post }: Props) {
  const router = useRouter();
  const total = post.image_urls.length;
  const { current, setCurrent, prev, next, handleTouchStart, handleTouchMove, handleTouchEnd } = useCarousel(total);
  const { liked, likeCount, handleLike } = useLike(post.id, post.like_count);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const handleShare = () => sharePost(post.title, post.id);

  const dots =
    total > 1
      ? Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))
      : null;

  const dateStr = formatDate(post.created_at);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 이미지 영역 */}
        <div
          className={styles.imageArea}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {post.image_urls.map((url, i) => (
              <div key={i} className={styles.slide}>
                <Image
                  src={url}
                  alt={`${post.title} ${i + 1}`}
                  fill
                  sizes="(max-width:640px) 100vw, 480px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {current > 0 && (
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{transform:"rotate(-90deg)"}}>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"/>
              </svg>
            </button>
          )}
          {current < total - 1 && (
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{transform:"rotate(90deg)"}}>
                <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"/>
              </svg>
            </button>
          )}

          {dots && <div className={styles.dotsInner}>{dots}</div>}
        </div>

        {/* 텍스트 영역 */}
        <div className={styles.textArea}>
          {dots && <div className={styles.dotsOuter}>{dots}</div>}

          <div className={styles.actionRow}>
            <button className={styles.shareBtn} onClick={handleShare}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12V17C5 18.6569 6.34315 20 8 20H16C17.6569 20 19 18.6569 19 17V12M12 16V4M12 4L8 8M12 4L16 8"/>
              </svg>
            </button>
            <div className={styles.likeRow}>
              <button
                className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
                onClick={handleLike}
              >
                {liked ? "♥" : "♡"}
              </button>
              <span className={styles.likeCount}>{likeCount}</span>
            </div>
          </div>

          <div className={styles.titleArea}>
            <div className={styles.postTitle}>{post.title}</div>
          </div>
          <div className={styles.scrollArea}>
            {post.body && (
              <div className={styles.postBodyWrap}>
                <div className={`${styles.postBody} ${!expanded ? styles.postBodyClamped : ""}`}>
                  {post.body}
                </div>
                {post.body.length > 80 && (
                  <button
                    className={styles.moreBtn}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "접기" : "... 더보기"}
                  </button>
                )}
              </div>
            )}
            <div className={styles.postDate}>{dateStr}</div>
          </div>

          <div className={styles.likeRowPC}>
            <button className={styles.shareBtn} onClick={handleShare}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12V17C5 18.6569 6.34315 20 8 20H16C17.6569 20 19 18.6569 19 17V12M12 16V4M12 4L8 8M12 4L16 8"/>
              </svg>
            </button>
            <button
              className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
              onClick={handleLike}
            >
              {liked ? "♥" : "♡"}
            </button>
            <span className={styles.likeCount}>{likeCount}</span>
          </div>

          <button className={styles.backBtn} onClick={() => router.back()}>
            ← 목록으로
          </button>
        </div>
      </div>
    </div>
  );
}
