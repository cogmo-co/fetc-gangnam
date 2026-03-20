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

    fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: uid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(data.liked);
        setLikeCount((c) => (data.liked ? c + 1 : c - 1));
      })
      .catch(() => {});
  }

  return { liked, likeCount, handleLike };
}
