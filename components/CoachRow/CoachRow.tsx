import Image from "next/image";
import styles from "./CoachRow.module.css";

const COACHES = [
  {
    role: "Head Coach",
    name: "한석규",
    spec: [
      "FE트레이닝센터 강남점 헤드코치",
      "기능운동재활협회 FEARA 대표",
      "인하대학교 스포츠의과학 융합과정 박사과정",
      "대한스키스노보드협회 국제심판",
      "前 근대5종 국가대표팀 트레이너",
      "前 스노보드 국가대표팀 트레이너",
      "2018 평창동계올림픽 스노보드 국가대표팀 트레이너",
      "前 여주대학교 건강운동재활과 겸임교수",
    ],
  },
  {
    role: "PCC / MANAGER",
    name: "강민구",
    spec: [
      "인하대학교 스포츠과학대학 석사",
      "인하대학교 스포츠재활연구소 연구원",
      "기능운동재활협회 FEARA 교육강사",
      "한국노인체육평가협회 KRIEE 교육강사",
      "NSCA Certified Personal Trainer",
      "Forrest Yoga Instructor",
      "P-DTR 신경반사접근법 Master Class",
      "대한척추교정도수물리치료학회 척추교정전문치료사",
    ],
  },
  {
    role: "PCC",
    name: "임우찬",
    spec: [
      "물리치료사",
      "FE트레이닝센터 강남점 코치",
      "기능운동재활협회 FEARA 보조강사",
      "온원엔터테인먼트 키즈플래닛, 아티스트 케어",
      "제이액터스 시니어모델 체형교정 클래스",
      "2024 강원청소년동계올림픽 기술임원",
      "2024 프리스타일 스키 국가대표 상비군 체력훈련",
      "2024 대한서핑국가대표 체력측정 지원",
    ],
  },
];

export default function CoachRow() {
  return (
    <div className={styles.section}>
      <div className={`${styles.sectionTitle} sr`}>COACH</div>
      <div className={styles.row}>
        {COACHES.map((coach, i) => (
          <div key={coach.name} className={`${styles.card} sr sr-d${i + 1}`}>
            <div className={styles.photo}>
              <Image src={`/images/coach-${coach.name}.png`} alt={coach.name} width={360} height={460} />
            </div>
            <div className={styles.info}>
              <div className={styles.role}>{coach.role}</div>
              <div className={styles.name}>{coach.name}</div>
              <div className={styles.divider} />
              <div className={styles.spec}>
                {coach.spec.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < coach.spec.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
