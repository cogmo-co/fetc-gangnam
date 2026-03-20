"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import SlidesNav from "@/components/SlidesNav/SlidesNav";
import NewsModal from "@/components/NewsModal/NewsModal";
import type { NewsPost } from "@/components/NewsGrid/NewsGrid";
import styles from "./NewsPreviewSection.module.css";

interface Props {
  posts: NewsPost[];
}

export default function NewsPreviewClient({ posts }: Props) {
  const [selected, setSelected] = useState<NewsPost | null>(null);

  function openPost(post: NewsPost) {
    if (window.innerWidth <= 640) {
      window.location.href = `/news/${post.id}`;
    } else {
      setSelected(post);
      history.pushState(null, "", `/news/${post.id}`);
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

      {selected && (
        <NewsModal post={selected} onClose={closePost} />
      )}
    </section>
  );
}
