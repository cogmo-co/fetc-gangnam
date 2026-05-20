import Image from "next/image";
import Link from "next/link";
import type { Coach } from "@/lib/coaches";
import Body from "./Body";
import styles from "./Detail.module.css";

interface Props {
  coach: Coach;
}

export default function Detail({ coach }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.imageArea}>
        <Image
          src={`/images/${coach.img}`}
          alt={coach.name}
          fill
          sizes="100vw"
          priority
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.role}>{coach.role}</div>
          <h1 className={styles.name}>{coach.name}</h1>
        </div>

        <Body coach={coach} />

        <div className={styles.actions}>
          <Link href="/about" className={styles.backBtn}>
            ← 목록으로
          </Link>
          <a
            href={coach.tistoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.moreBtn}
          >
            더보기
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}