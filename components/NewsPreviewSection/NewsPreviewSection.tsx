import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import SlidesNav from "@/components/SlidesNav/SlidesNav";
import styles from "./NewsPreviewSection.module.css";

const PREVIEW_COUNT = 4;

export default async function NewsPreviewSection() {
  const { data } = await supabase
    .from("posts")
    .select("id, title, image_urls")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(PREVIEW_COUNT);

  const posts = data ?? [];
  if (posts.length === 0) return null;

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
          <Link key={post.id} href={`/news/${post.id}`} className={styles.cell}>
            {post.image_urls?.[0] && (
              <Image
                src={post.image_urls[0]}
                alt={post.title}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
              />
            )}
          </Link>
        ))}
      </SlidesNav>
    </section>
  );
}
