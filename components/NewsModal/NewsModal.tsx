"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { NewsPost } from "@/components/NewsGrid/NewsGrid";
import styles from "./NewsModal.module.css";

interface Props {
  post: NewsPost;
  onClose: () => void;
}

export default function NewsModal({ post, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [expanded, setExpanded] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const total = post.image_urls.length;

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(total - 1, c + 1)),
    [total]
  );

  // UUID 가져오기 + 좋아요 상태 확인
  useEffect(() => {
    let uid = localStorage.getItem("uid");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("uid", uid);
    }

    fetch(`/api/posts/${post.id}/like?user_id=${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.liked !== undefined) setLiked(data.liked);
        if (data.count !== undefined) setLikeCount(data.count);
      })
      .catch(() => {});
  }, [post.id]);

  // 키보드
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (touchDeltaX.current > 50) prev();
    else if (touchDeltaX.current < -50) next();
  }

  async function handleLike() {
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    try {
      const res = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: uid }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount((c) => (data.liked ? c + 1 : c - 1));
    } catch {}
  }

  async function handleShare() {
    const url = `${window.location.origin}/news/${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다");
    }
  }

  const dots = total > 1 ? (
    Array.from({ length: total }, (_, i) => (
      <button
        key={i}
        className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
        onClick={() => setCurrent(i)}
      />
    ))
  ) : null;

  const dateStr = new Date(post.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalWrap} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>
        <div className={styles.modal}>
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

          {/* PC 화살표 */}
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

          {/* PC dot (이미지 내부 하단) */}
          {dots && <div className={styles.dotsInner}>{dots}</div>}
        </div>

        {/* 텍스트 영역 */}
        <div className={styles.textArea}>
          {/* Mobile: 인디케이터 */}
          {dots && <div className={styles.dotsOuter}>{dots}</div>}

          {/* Mobile: 공유 | 좋아요 (오른쪽 끝) */}
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

          {/* 제목 (상단 고정) */}
          <div className={styles.titleArea}>
            <div className={styles.postTitle}>{post.title}</div>
          </div>

          {/* 본문 (스크롤) */}
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
          </div>

          {/* PC: 아이콘 + 날짜 (하단 고정) */}
          <div className={styles.bottomFixed}>
            <div className={styles.bottomActions}>
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
            <div className={styles.postDate}>{dateStr}</div>
          </div>

          {/* Mobile: 날짜 */}
          <div className={styles.mobileDateRow}>
            <div className={styles.postDate}>{dateStr}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
