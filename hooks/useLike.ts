"use client";

import { useState, useEffect } from "react";

export function useLike(postId: string, initialCount: number) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("uid", uid);
    }

    fetch(`/api/posts/${postId}/like?user_id=${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.liked !== undefined) setLiked(data.liked);
        if (data.count !== undefined) setLikeCount(data.count);
      })
      .catch(() => {});
  }, [postId]);

  function handleLike() {
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    // 낙관적 업데이트: 즉시 UI 반영
    const prevLiked = liked;
    const prevCount = likeCount;
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(newLiked ? prevCount + 1 : prevCount - 1);

    fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        // 서버 결과가 다르면 보정
        if (data.liked !== newLiked) {
          setLiked(data.liked);
          setLikeCount(data.liked ? prevCount + 1 : prevCount - 1);
        }
      })
      .catch(() => {
        // 실패 시 되돌림
        setLiked(prevLiked);
        setLikeCount(prevCount);
      });
  }

  return { liked, likeCount, handleLike };
}
