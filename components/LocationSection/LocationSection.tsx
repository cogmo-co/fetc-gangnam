// TODO: LocationInfoSection으로 완전 교체 후 승인받으면 이 컴포넌트 삭제 예정
import Image from "next/image";
import styles from "./LocationSection.module.css";

export default function LocationSection() {
  return (
    <div className={styles.section}>
      <div className={styles.bg}>
        <Image src="/images/location.jpg" alt="센터 위치" fill sizes="100vw" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${styles.addr} sr`}>서울 강남구 도곡로7길 6, 한은빌딩 4층</div>
        <div className={`${styles.sub} sr sr-d1`}>FE Training Center Gangnam · 강남점</div>
      </div>
    </div>
  );
}
