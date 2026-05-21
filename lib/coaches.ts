import { BASE_URL } from "./constants";


// ===============================
// Schema
// ===============================

export interface TimelineItem {
  period?: string;     // "2021.06 — 2023.01" / "2024" / "재학 중"
  badge?: string;      // "석사 졸업" / "박사과정 재학"
  title: string;
  subtitle?: string;
  bullets?: string[];
}

export interface CertItem {
  label?: string;      // "2025" / "자격" / "신경계" 등 좌상단 회색 라벨
  title: string;       // multi-line 가능 (개행은 \n)
}

export interface HighlightItem {
  season: string;      // "22 / 23 시즌"
  events: string[];
  emphasis?: boolean;  // 올림픽 등 강조
}

export type CoachSection =
  | { type: "timeline"; title: string; items: TimelineItem[] }
  | { type: "certifications"; title: string; items: CertItem[] }
  | { type: "highlights"; title: string; items: HighlightItem[] }
  | { type: "program"; title: string; items: string[] };

export interface Coach {
  id: string;            // 슬러그 'woonsang-lim'
  name: string;
  role: string;
  img: string;
  spec: string[];        // 카드용 단축
  tistoryUrl: string;
  sections: CoachSection[];
}


// ===============================
// Data
// ===============================

export const COACHES: Coach[] = [
  {
    id: "seokkyu-han",
    name: "한석규",
    role: "Head Coach",
    img: "coach-seokkyu-han.png",
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
    tistoryUrl: "https://fetc-gangnam.tistory.com/2",
    sections: [
      {
        type: "timeline",
        title: "학력",
        items: [
          {
            badge: "박사과정 재학",
            title: "인하대학교 스포츠의과학 융합전공",
          },
          {
            badge: "석사 졸업",
            title: "한서대학교 일반대학원 물리치료학",
            subtitle: "Biomechanics / Gait",
          },
        ],
      },
      {
        type: "timeline",
        title: "주요 경력",
        items: [
          {
            period: "2014 — 2018",
            title: "프리스타일 스노보드 국가대표팀 트레이너",
            subtitle: "FIS 월드컵 전 시즌을 선수단과 함께하며, 2016 유스동계올림픽 동메달, 2018 평창동계올림픽까지 동행했습니다.",
            bullets: [
              "2015 뉴질랜드 월드컵 · 스프링캠프",
              "15/16 미국 그랑프리 · 카퍼마운틴 · 맘모스 · 파크시티 · 삿포로 월드컵",
              "2016 유스동계올림픽 정유림 동메달",
              "2018 평창동계올림픽 슬로프스타일 · 빅에어 이민식 전담",
            ],
          },
          {
            period: "2014",
            title: "근대5종 국가대표팀 트레이너",
            bullets: [
              "인천아시아게임 선발전 선수 관리",
              "세계선수권 선발선수 관리",
            ],
          },
          {
            badge: "병원 임상 경력",
            title: "도수치료 · 스포츠재활 · 센터 운영",
            bullets: [
              "하늘병원 스포츠상해센터 — 국가대표·프로·유소년 선수재활",
              "바로선의원 도수치료실",
              "위례 마디휴재활의학과 도수재활운동센터 팀장 — 동계 대표선수·피겨스케이팅 꿈나무선수 케어",
              "용인S한방병원 도수치료센터장·운동센터팀장 — 수술 후 입원환자·선수 재활",
              "의원 및 병원급 도수치료실 오픈 세팅 다수",
            ],
          },
          {
            period: "2021 — 2023",
            title: "여주대학교 건강운동재활과 겸임교수",
          },
          {
            badge: "국제 대회 의료지원",
            title: "아시안게임 · 동계올림픽",
            bullets: [
              "2024 강원청소년동계올림픽 전문운영인력",
              "2025 하얼빈 도예아시안게임 베이스캠프 물리치료사",
              "2017 · 2022 · 2023 국제심판 세미나",
            ],
          },
          {
            badge: "아티스트 케어",
            title: "엔터테인먼트 · 콘서트 의무지원",
            bullets: [
              "온원엔터테인먼트 · 키즈플래닛 아티스트 컨디셔닝",
              "THE BOYZ · NCT · NCT DREAM · NCT127 · 태연 · 샤이니 콘서트 의무지원",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "minku-kang",
    name: "강민구",
    role: "PCC / MANAGER",
    img: "coach-minku-kang.png",
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
    tistoryUrl: "https://fetc-gangnam.tistory.com/3",
    sections: [
      {
        type: "timeline",
        title: "학력",
        items: [
          {
            badge: "석사 졸업",
            title: "인하대학교 스포츠과학대학",
          },
        ],
      },
      {
        type: "timeline",
        title: "소속 및 활동",
        items: [
          { title: "인하대학교 스포츠재활연구소", subtitle: "연구원" },
          { title: "FEARA 기능운동재활협회", subtitle: "교육강사" },
          { title: "KRIEE 한국노인체육평가협회", subtitle: "교육강사" },
          { title: "KAPF 대한선수물리치료사연맹", subtitle: "실무위원" },
          {
            period: "2024",
            title: "국가대표 · 국제 대회 파견",
            bullets: [
              "프리스타일 스키 국가대표 유소년·상비군 하계캠프 파견",
              "강원 동계청소년올림픽 국내기술임원",
              "KIMES ACPR Presentor",
            ],
          },
          { period: "2023", title: "스노보드 국가대표 유소년 동계캠프 파견" },
          {
            title: "아티스트 케어",
            bullets: [
              "온원엔터테인먼트 · 키즈플래닛 아티스트 케어",
              "4M/4F Label 아티스트 케어",
            ],
          },
        ],
      },
      {
        type: "certifications",
        title: "자격증 및 교육 이수",
        items: [
          { label: "자격", title: "NSCA Certified Personal Trainer" },
          { label: "자격", title: "Forrest Yoga Instructor" },
          { label: "신경계", title: "P-DTR 신경반사접근법\nMaster Class 이수" },
          { label: "신경계", title: "Neurokinetic Therapy\n신경운동치료 접근 이수" },
          { label: "척추", title: "대한척추교정도수물리치료학회\n척추교정전문치료사" },
          { label: "척추", title: "대한척추교정도수물리치료학회\nPIC · 연구과정 이수" },
          { label: "재활", title: "척추안정화연구소 Spinal Rehabilitation · SMT · NMT 이수" },
        ],
      },
    ],
  },
  {
    id: "woonsang-lim",
    name: "임운상",
    role: "PCC",
    img: "coach-woonsang-lim.jpg",
    spec: [
      "Sports performance coach, Louisiana Tech University",
      "Sports performance coach, University South Dakota",
      "Intern sports performance coach, California State University: Sacramento",
      "Outside event educator, Lululemon",
      "인턴체력코치, 태릉선수촌",
      "크로스핏 코치, Reebok Crossfit Sentinel",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/8",
    sections: [
      {
        type: "timeline",
        title: "학력",
        items: [
          {
            period: "2021.06 — 2023.01",
            badge: "석사 졸업",
            title: "University of South Dakota",
            subtitle: "Master's degree · Kinesiology",
          },
          {
            period: "2017.10 — 2021.05",
            badge: "학부 졸업",
            title: "California State University, Sacramento",
            subtitle: "Bachelor's degree · Kinesiology: Exercise Kinesiology",
          },
        ],
      },
      {
        type: "timeline",
        title: "주요 경력",
        items: [
          {
            period: "2024.07 — 현재",
            title: "FE 트레이닝센터 강남점",
            subtitle: "스포츠 퍼포먼스 코치 — 국가대표·프로선수 및 일반인 퍼포먼스 트레이닝",
          },
          {
            period: "2023.02 — 2023.07",
            title: "Louisiana Tech University",
            subtitle: "Sports Performance Coach (풀타임)",
          },
          {
            period: "2021.12 — 2023.01",
            title: "University of South Dakota",
            subtitle: "Sports Performance Coach (풀타임)",
          },
          {
            period: "재학 중",
            title: "California State University, Sacramento",
            subtitle: "Intern Sports Performance Coach",
          },
          {
            period: "2015",
            title: "대한체육회 태릉선수촌",
            subtitle: "인턴 체력코치",
          },
          {
            title: "기타 경력",
            bullets: [
              "Personal Trainer, H Core Fitness",
              "Outside Event Educator, Lululemon",
              "크로스핏 코치, Reebok Crossfit Sentinel",
              "몽골 BE Academy 유소년 트레이닝",
              "몽골 체육회 체육지도자 퍼포먼스 트레이닝",
              "FEARA 기능운동재활협회 생리학·스프린트 퍼포먼스 교육강사",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "doohee-park",
    name: "박두희",
    role: "PCC",
    img: "coach-doohee-park.jpg",
    spec: [
      "前 하늘병원 컨디셔닝센터: 배구, 핸드볼, 아이스하키, 수영, 유소년 축구, 야구선수 케어",
      "몽골 BE Academy 유소년 트레이닝",
      "몽골 체육회 체육지도자 퍼포먼스 트레이닝",
      "前 스노보드 프리스타일 국가대표팀 트레이너",
      "  - 22/23 FIS Nor-Am Cup, World Championships, European Cup, World Cup",
      "  - 23/24 FIS World Cup, 강원 Youth Olympic Winter Games",
      "  - 24/25 FIS World Cup, Asian Winter Games",
      "  - 26 Milano Olympic Winter Games",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/49",
    sections: [
      {
        type: "timeline",
        title: "경력",
        items: [
          {
            period: "2020 — 2022",
            title: "하늘병원 컨디셔닝센터",
            subtitle: "다종목 실업팀 및 유소년 선수 케어를 담당하며 현장 경험을 다졌습니다.",
            bullets: [
              "실업팀(배구, 핸드볼, 아이스하키, 수영) 선수 케어 다수",
              "유소년(축구, 야구) 선수 케어 다수",
            ],
          },
          {
            period: "2022 — 2026",
            title: "대한민국 스노보드 프리스타일 국가대표팀",
            subtitle: "4년간 국가대표 선수단의 전담 물리치료사로 국내외 훈련 및 대회를 함께했습니다.",
          },
        ],
      },
      {
        type: "highlights",
        title: "대회 하이라이트",
        items: [
          {
            season: "22 / 23 시즌",
            events: ["FIS Nor-Am Cup", "World Championships", "European Cup · World Cup"],
          },
          {
            season: "23 / 24 시즌",
            events: ["FIS World Cup", "강원 Youth Olympic", "Winter Games"],
          },
          {
            season: "24 / 25 시즌",
            events: ["FIS World Cup", "Asian Winter Games"],
          },
          {
            season: "25 / 26 시즌",
            events: ["🥇 밀라노 동계올림픽 — 스노보드 국가대표팀 트레이너"],
            emphasis: true,
          },
        ],
      },
    ],
  },
  {
    id: "woochan-lim",
    name: "임우찬",
    role: "PCC",
    img: "coach-woochan-lim.png",
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
    tistoryUrl: "https://fetc-gangnam.tistory.com/9",
    sections: [
      {
        type: "timeline",
        title: "주요 경력 및 활동",
        items: [
          {
            period: "2025",
            title: "대한배구연맹 U19 국가대표팀 물리치료사",
            bullets: [
              "세계선수권대회 출전 전 약 2개월간 컨디셔닝 담당",
              "우즈베키스탄 세계선수권대회 선수단 동행",
            ],
          },
          {
            period: "2024",
            title: "국가대표 · 국제 대회 파견",
            bullets: [
              "강원청소년동계올림픽 기술임원",
              "프리스타일 스키 국가대표 상비군 체력훈련 파견",
              "대한 서핑 국가대표 체력측정",
            ],
          },
          {
            title: "스노보드 국가대표팀 의무트레이너",
            bullets: ["평창 3개월간 선수 케어 및 컨디셔닝 담당"],
          },
          {
            title: "아티스트 케어 · 출강 클래스",
            bullets: [
              "온원엔터테인먼트 키즈플래닛 · 4M/4F Label 아티스트 케어",
              "제이액터스 시니어 모델 체형교정 클래스 담당",
            ],
          },
          {
            title: "FEARA 기능운동재활협회",
            subtitle: "보조강사",
          },
        ],
      },
      {
        type: "program",
        title: "FETC 강남점 담당 프로그램",
        items: [
          "선수 컨디셔닝 및 퍼포먼스 트레이닝",
          "체대입시 전문 트레이닝",
          "평창 원데이클래스 — 스포츠 테이핑 · 웜업/쿨다운 프로그램 (유소년 선수 · 지도자 · 동호인)",
          "일반 회원 건강관리 운동",
        ],
      },
    ],
  },
  {
    id: "nayeon-kang",
    name: "강나연",
    role: "PCC",
    img: "coach-nayeon-kang.jpg",
    spec: [
      "2025 World Lacrosse Men's U20 Championship 트레이너",
      "APLU U16 Championship 트레이너",
      "APLU U14 & U12 Festival 트레이너",
      "2025 Lacrosse Asia-Pacific Championship 국가대표팀 트레이너",
      "스노보드, 알파인스키 국가대표 상비군 하계∙동계 합숙훈련 피지컬 트레이너, 선수 컨디셔닝",
      "2025/26 Triple H 스키팀 AT",
      "2024/25 넥센 스노보드 실업팀 AT",
      "2023/24 알펜시아 스키학교 강사",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/50",
    sections: [
      {
        type: "timeline",
        title: "학력",
        items: [
          {
            badge: "학사 졸업",
            title: "차의과학대학교 스포츠의학과",
          },
        ],
      },
      {
        type: "timeline",
        title: "주요 경력",
        items: [
          {
            period: "2025",
            title: "국제 라크로스 대회 의료지원",
            subtitle: "단일 연도에 3개 국제 대회를 연속으로 커버하며 글로벌 현장 경험을 쌓았습니다.",
            bullets: [
              "World Lacrosse Men's U20 Championship / Event Physio",
              "APLU U16 Championship / Team Physio (Australia Women's Team)",
              "APLU U14 & U12 Festival / Event Physio",
              "Lacrosse Asia-Pacific Championship / 국가대표 팀 트레이너",
            ],
          },
          { period: "2025/26", title: "Triple-H 스키팀 AT" },
          { period: "2024/25", title: "넥센 스노보드 실업팀 AT" },
          {
            period: "상시",
            title: "국가대표 상비군 하계·동계 합숙훈련",
            bullets: [
              "스노보드·알파인 스키 피지컬 트레이너",
              "선수 컨디셔닝 관리",
            ],
          },
          { period: "2023/24", title: "알펜시아 스키학교 스키 강사" },
        ],
      },
      {
        type: "certifications",
        title: "자격증 및 교육",
        items: [
          { label: "2025", title: "CARPE Functional Rehabilitation Training Foundation" },
          { label: "2025", title: "KCA 체력코치 자격증" },
          { label: "2024", title: "Sports Taping Trainer\n대한스포츠재활의학협회" },
          { label: "2024", title: "Ski Level 1 · Teaching 1\n대한스키지도자연맹" },
          { label: "2023", title: "Sports Massage 2급 / KATA" },
          { label: "2023", title: "Sports Taping Trainer / KATA" },
          { label: "2023", title: "I.A.T Athletic Training Course\n한국대학선수트레이너연맹" },
          { label: "2023", title: "SIPT Athletic Medical Trainer Level 3" },
          { label: "2023", title: "Cadaver Anatomy Course\nCan Tho Univ. of Medicine & Pharmacy" },
          { label: "2022", title: "Winback TECAR Therapy Training" },
        ],
      },
    ],
  },
];

export function findCoach(id: string): Coach | undefined {
  return COACHES.find((c) => c.id === id);
}


// ===============================
// JSON-LD (Person schema)
// ===============================

export function getPersonSchema(coach: Coach) {
  return {
    "@type": "Person",
    name: coach.name,
    jobTitle: coach.role,
    image: `${BASE_URL}/images/${coach.img}`,
    url: `${BASE_URL}/coach/${coach.id}`,
    sameAs: [coach.tistoryUrl],
    worksFor: {
      "@type": "Organization",
      name: "FE트레이닝센터 강남점",
      url: BASE_URL,
    },
    knowsAbout: coach.spec,
  };
}

/** About 페이지용 — 6명 코치를 @graph로 묶은 schema */
export function getAllCoachesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": COACHES.map(getPersonSchema),
  };
}

/** /coach/[id] 페이지용 — 단일 코치 schema */
export function getSingleCoachSchema(coach: Coach) {
  return {
    "@context": "https://schema.org",
    ...getPersonSchema(coach),
  };
}