import Image from "next/image";
import type { Equipment } from "@/lib/equipment";
import { getEquipmentImage } from "@/lib/equipment";
import BackButton from "@/components/CoachInfo/BackButton";
import styles from "./Detail.module.css";

interface Props {
  equipment: Equipment;
}

export default function Detail({ equipment }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.imageArea}>
        <Image
          src={getEquipmentImage(equipment.img)}
          alt={equipment.name}
          fill
          sizes="100vw"
          priority
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.fullName}>{equipment.fullName}</h1>
          <p className={styles.tagline}>{equipment.tagline}</p>
        </div>

        <p className={styles.body}>{equipment.body}</p>

        {equipment.detailImgs.length > 0 && (
          <div className={styles.detailImages}>
            {equipment.detailImgs.map((img) => (
              <div key={img} className={styles.detailImage}>
                <Image
                  src={getEquipmentImage(img)}
                  alt={`${equipment.name} 상세`}
                  fill
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <BackButton className={styles.backBtn} fallbackUrl="/about/facility" />
        </div>
      </div>
    </div>
  );
}