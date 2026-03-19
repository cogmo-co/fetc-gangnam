"use client";

import type { Post } from "./types";
import styles from "./admin.module.css";

interface Props {
  posts: Post[];
  loading: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export default function PostList({
  posts,
  loading,
  onEdit,
  onDelete,
  onCreate,
}: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.toolbar}>
          <div className={styles.title}>NEWS 관리</div>
          <button className={styles.btnNew} onClick={onCreate}>
            새 게시물
          </button>
        </div>
        {loading && <div className={styles.loading}>불러오는 중...</div>}
        {!loading && posts.length === 0 && (
          <div className={styles.empty}>게시물이 없습니다</div>
        )}
        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              {post.image_urls?.[0] && (
                <img
                  src={post.image_urls[0]}
                  alt=""
                  className={styles.postThumb}
                />
              )}
              <div className={styles.postInfo}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postDate}>
                  {new Date(post.created_at).toLocaleDateString("ko-KR")} ·{" "}
                  이미지 {post.image_urls?.length ?? 0}장
                </div>
              </div>
              <span
                className={`${styles.postBadge} ${
                  post.published ? styles.published : styles.draft
                }`}
              >
                {post.published ? "공개" : "비공개"}
              </span>
              <div className={styles.postActions}>
                <button className={styles.btnEdit} onClick={() => onEdit(post)}>
                  수정
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => onDelete(post.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
