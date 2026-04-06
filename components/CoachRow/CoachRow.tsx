import Image from "next/image";
import styles from "./CoachRow.module.css";

const COACHES = [
  {
    role: "Head Coach",
    name: "한석규",
    img: "coach-한석규.png",
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
    img: "coach-강민구.png",
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
    name: "임운상",
    img: "coach-임운상.jpg",
    spec: [
      "Sports performance coach, Louisiana Tech University",
      "Sports performance coach, University South Dakota",
      "Intern sports performance coach, California State University: Sacramento",
      "Outside event educator, Lululemon",
      "인턴체력코치, 태릉선수촌",
      "크로스핏 코치, Reebok Crossfit Sentinel"
    ],
  },
  {
    role: "PCC",
    name: "박두희",
    img: "coach-박두희.jpg",
    spec: [
      "前 하늘병원 컨디셔닝센터: 배구, 핸드볼, 아이스하키, 수영, 유소년 축구, 야구선수 케어",
      "몽골 BE Academy 유소년 트레이닝",
      "몽골 체육회 체육지도자 퍼포먼스 트레이닝",
      "前 스노보드 프리스타일 국가대표팀 트레이너",
      "\u00A0\u00A0- 22/23 FIS Nor-Am Cup, World Championships, European Cup, World Cup",
      "\u00A0\u00A0- 23/24 FIS World Cup, 강원 Youth Olympic Winter Games",
      "\u00A0\u00A0- 24/25 FIS World Cup, Asian Winter Games",
      "\u00A0\u00A0- 26 Milano Olympic Winter Games",
    ],
  },
  {
    role: "PCC",
    name: "임우찬",
    img: "coach-임우찬.png",
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
  {
    role: "PCC",
    name: "강나연",
    img: "coach-강나연.jpg",
    spec: [
      "2025 World Lacrosse Men’s U20 Championship 트레이너",
      "APLU U16 Championship 트레이너",
      "APLU U14 & U12 Festival 트레이너",
      "2025 Lacrosse Asia-Pacific Championship 국가대표팀 트레이너", 
      "스노보드, 알파인스키 국가대표 상비군 하계∙동계 합숙훈련 피지컬 트레이너, 선수 컨디셔닝",
      "2025/26 Triple H 스키팀 AT", 
      "2024/25 넥센 스노보드 실업팀 AT", 
      "2023/24 알펜시아 스키학교 강사",
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
              <Image src={`/images/${coach.img}`} alt={coach.name} width={360} height={460} />
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
