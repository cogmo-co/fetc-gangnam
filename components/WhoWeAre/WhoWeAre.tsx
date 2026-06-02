import Link from "next/link";
import styles from "./WhoWeAre.module.css";

export default function WhoWeAre() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={`${styles.title} sr`}>WHO WE ARE?</h2>
          <Link href="/about" className={`${styles.more} sr sr-d1`}>
            더보기
          </Link>
        </div>

        <h3 className={styles.headline}>평가에서 시작되는 변화를 만듭니다.</h3>

        <div className={styles.body}>
          <p>
            FE트레이닝센터는 단순히 운동하는 공간이 아닌, 평가에서 시작되는 체계적인 트레이닝을 통해 <br className="pc-br" />
            회원의 신체 기능과 퍼포먼스를 회복·향상시키는 공간입니다.
          </p>
          <p>
            국가대표 트레이너 출신·물리치료사 자격 보유 코치를 포함한 FEARA 인증 PCC 코치진이 <br className="pc-br" />
            FETC만의 Flowtics method 4단계 프로세스로 1:1 맞춤 트레이닝을 진행합니다.
          </p>
        </div>
      </div>
    </section>
  );
}