"use client";

import type { Post } from "./types";
import styles from "./admin.module.css";

interface Props {
  posts: Post[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export default function PostList({
  posts,
  loading,
  currentPage,
  totalPages,
  onPageChange,
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
        {!loading && posts.length === 0 && (
          <div className={styles.empty}>게시물이 없습니다</div>
        )}
        <div className={styles.postList}>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`${styles.postItem} ${styles.skeleton}`}>
                  <div className={`${styles.postThumb} ${styles.skeletonBox}`} />
                  <div className={styles.postInfo}>
                    <div className={`${styles.skeletonText} ${styles.skeletonBox}`} />
                    <div className={`${styles.skeletonTextShort} ${styles.skeletonBox}`} />
                  </div>
                </div>
              ))
            : posts.map((post) => (
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

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageBtn} ${page === currentPage ? styles.pageBtnActive : ""}`}
                onClick={() => onPageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
