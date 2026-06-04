import Image from "next/image";
import Link from "next/link";
import styles from "./EquipmentSection.module.css";

const EQUIPMENT = [
  { name: "VALD", label: "VALD", src: "/images/main/main_vald.jpg" },
  { name: "KEISER", label: "KEISER", src: "/images/main/main_keiser.jpg" },
  { name: "WINBACK", label: "WINBACK", src: "/images/main/main_winback.jpg" },
  { name: "Speediance", label: "Speediance", src: "/images/main/main_speediance.jpg" },
  { name: "Reaction Light", label: "Reaction\nLight", src: "/images/main/main_reaction_light.jpg" },
  { name: "matrix s-drive", label: "matrix s-drive", src: "/images/main/main_matrix_self_drive.jpg" },
];

export default function EquipmentSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={`${styles.title} sr`}>EQUIPMENT</h2>
          <Link href="/about/facility" className={`${styles.more} sr sr-d1`}>
            더보기
          </Link>
        </div>

        <div className={styles.grid}>
          {EQUIPMENT.map((item) => (
            <div key={item.name} className={styles.card}>
              <Image
                src={item.src}
                alt={`${item.name} - FETC 강남점 보유 장비`}
                fill
                sizes="(max-width:640px) 70vw, 16vw"
              />
              <div className={styles.overlay} />
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>

        <p className={styles.caption}>
          정밀한 평가부터 공압 저항 트레이닝, 고주파 회복까지.<br />
          NBA, EPL, PSG 등 세계 최상위 스포츠팀이 사용하는 6종의 시스템을 FETC 강남점에서 만나보세요.
        </p>
      </div>
    </section>
  );
}