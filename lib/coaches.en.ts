import type { Coach, CoachGroup } from "./coaches";

// 영어 로케일 코치 데이터. 구조는 coaches.ts(한국어)와 동일, 텍스트만 영어.
// 이미 영어인 고유명사(대회·대학·자격명 등)는 그대로 유지.

export const COACH_GROUPS_EN: CoachGroup[] = [
  { key: "head", tag: "HEAD COACH" },
  {
    key: "rehab",
    tag: "REHABILITATION",
    en: "Recover & Rebuild",
    desc: "Pain · injury recovery · return to function",
  },
  {
    key: "perf",
    tag: "PERFORMANCE",
    en: "Strengthen & Perform",
    desc: "Strength · power · performance",
  },
];

export const COACHES_EN: Coach[] = [
  {
    id: "seokkyu-han",
    name: "Seokkyu Han",
    role: "Head Coach",
    group: "head",
    img: "coach-seokkyu-han.png",
    spec: [
      "Head Coach, FE Training Center Gangnam",
      "President, FEARA (Functional Exercise Rehabilitation Association)",
      "PhD candidate, Sports Medical Science, Inha University",
      "International referee, Korea Ski & Snowboard Association",
      "Former trainer, National Modern Pentathlon Team",
      "Former trainer, National Snowboard Team",
      "Trainer, National Snowboard Team, 2018 PyeongChang Winter Olympics",
      "Former adjunct professor, Health Exercise & Rehabilitation, Yeoju University",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/2",
    sections: [
      {
        type: "timeline",
        title: "Education",
        items: [
          {
            badge: "PhD candidate",
            title: "Inha University, Sports Medical Science (interdisciplinary)",
          },
          {
            badge: "Master's",
            title: "Hanseo University Graduate School, Physical Therapy",
            subtitle: "Biomechanics / Gait",
          },
        ],
      },
      {
        type: "timeline",
        title: "Career",
        items: [
          {
            period: "2014 — 2018",
            title: "Trainer, National Freestyle Snowboard Team",
            subtitle:
              "Accompanied the team through every FIS World Cup season, a 2016 Youth Winter Olympics bronze medal, and the 2018 PyeongChang Winter Olympics.",
            bullets: [
              "2015 New Zealand World Cup · spring camp",
              "15/16 U.S. Grand Prix · Copper Mountain · Mammoth · Park City · Sapporo World Cup",
              "2016 Youth Winter Olympics — Yurim Jeong, bronze medal",
              "2018 PyeongChang Winter Olympics — dedicated to Minsik Lee (slopestyle · big air)",
            ],
          },
          {
            period: "2014",
            title: "Trainer, National Modern Pentathlon Team",
            bullets: [
              "Athlete management, Incheon Asian Games trials",
              "Athlete management, World Championship trials",
            ],
          },
          {
            badge: "Clinical experience",
            title: "Manual therapy · sports rehab · center operation",
            bullets: [
              "Haneul Hospital Sports Injury Center — rehab for national, pro, and youth athletes",
              "Baroseon Clinic, manual therapy room",
              "Team lead, Wirye Madihue Rehabilitation Medicine manual-rehab center — care for winter national athletes and youth figure skaters",
              "Manual-therapy center director & exercise-center team lead, Yongin S Korean-Medicine Hospital — post-surgery inpatient and athlete rehab",
              "Set up numerous manual-therapy rooms at clinics and hospitals",
            ],
          },
          {
            period: "2021 — 2023",
            title: "Adjunct professor, Health Exercise & Rehabilitation, Yeoju University",
          },
          {
            badge: "Int'l competition medical support",
            title: "Asian Games · Winter Olympics",
            bullets: [
              "2024 Gangwon Youth Winter Olympics — specialist operations staff",
              "2025 Harbin Asian Winter Games — base camp physical therapist",
              "2017 · 2022 · 2023 international referee seminars",
            ],
          },
          {
            badge: "Artist care",
            title: "Entertainment · concert medical support",
            bullets: [
              "Artist conditioning for OnOne Entertainment · Kids Planet",
              "Medical support for THE BOYZ · NCT · NCT DREAM · NCT127 · Taeyeon · SHINee concerts",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "minku-kang",
    name: "Minku Kang",
    role: "PCC",
    group: "perf",
    img: "coach-minku-kang.png",
    spec: [
      "Master's, College of Sports Science, Inha University",
      "Researcher, Inha University Sports Rehabilitation Institute",
      "Instructor, FEARA (Functional Exercise Rehabilitation Association)",
      "Instructor, KRIEE (Korea Elderly Physical Assessment Association)",
      "NSCA Certified Personal Trainer",
      "Forrest Yoga Instructor",
      "P-DTR (neural reflex approach) Master Class",
      "Certified spinal manipulation therapist, Korean Academy of Spinal Manipulation Manual Physical Therapy",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/3",
    sections: [
      {
        type: "timeline",
        title: "Education",
        items: [
          {
            badge: "Master's candidate",
            title: "College of Sports Science, Inha University",
          },
        ],
      },
      {
        type: "timeline",
        title: "Affiliations & Activities",
        items: [
          { title: "Inha University Sports Rehabilitation Institute", subtitle: "Researcher" },
          { title: "FEARA (Functional Exercise Rehabilitation Association)", subtitle: "Instructor" },
          { title: "KRIEE (Korea Elderly Physical Assessment Association)", subtitle: "Instructor" },
          { title: "KAPF (Korea Athletic Physiotherapist Federation)", subtitle: "Working committee member" },
          {
            period: "2024",
            title: "National team · int'l competition deployments",
            bullets: [
              "Deployed to national freestyle ski youth & reserve summer camp",
              "Gangwon Youth Winter Olympics — national technical official",
              "KIMES ACPR presenter",
            ],
          },
          { period: "2023", title: "Deployed to national snowboard youth winter camp" },
          {
            title: "Artist care",
            bullets: [
              "Artist care for OnOne Entertainment · Kids Planet",
              "Artist care for 4M/4F Label",
            ],
          },
        ],
      },
      {
        type: "certifications",
        title: "Certifications & Training",
        items: [
          { label: "Cert.", title: "NSCA Certified Personal Trainer" },
          { label: "Cert.", title: "Forrest Yoga Instructor" },
          { label: "Neuro", title: "P-DTR (neural reflex approach)\nMaster Class completed" },
          { label: "Neuro", title: "Neurokinetic Therapy\ncompleted" },
          { label: "Spine", title: "Korean Academy of Spinal Manipulation Manual PT\nCertified spinal manipulation therapist" },
          { label: "Spine", title: "Korean Academy of Spinal Manipulation Manual PT\nPIC · research course completed" },
          { label: "Rehab", title: "Spinal Stabilization Institute — Spinal Rehabilitation · SMT · NMT completed" },
        ],
      },
    ],
  },
  {
    id: "woonsang-lim",
    name: "Woonsang Lim",
    role: "PCC",
    group: "perf",
    img: "coach-woonsang-lim.jpg",
    spec: [
      "Sports performance coach, Louisiana Tech University",
      "Sports performance coach, University of South Dakota",
      "Intern sports performance coach, California State University, Sacramento",
      "Outside event educator, Lululemon",
      "Intern strength coach, Taereung National Training Center",
      "CrossFit coach, Reebok CrossFit Sentinel",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/8",
    sections: [
      {
        type: "timeline",
        title: "Education",
        items: [
          {
            period: "2021.06 — 2023.01",
            badge: "Master's",
            title: "University of South Dakota",
            subtitle: "Master's degree · Kinesiology",
          },
          {
            period: "2017.10 — 2021.05",
            badge: "Bachelor's",
            title: "California State University, Sacramento",
            subtitle: "Bachelor's degree · Kinesiology: Exercise Kinesiology",
          },
        ],
      },
      {
        type: "timeline",
        title: "Career",
        items: [
          {
            period: "2024.07 — Present",
            title: "FE Training Center Gangnam",
            subtitle: "Sports performance coach — performance training for national/pro athletes and the general public",
          },
          {
            period: "2023.02 — 2023.07",
            title: "Louisiana Tech University",
            subtitle: "Sports Performance Coach (full-time)",
          },
          {
            period: "2021.12 — 2023.01",
            title: "University of South Dakota",
            subtitle: "Sports Performance Coach (full-time)",
          },
          {
            period: "During studies",
            title: "California State University, Sacramento",
            subtitle: "Intern Sports Performance Coach",
          },
          {
            period: "2015",
            title: "Taereung National Training Center (KSOC)",
            subtitle: "Intern strength coach",
          },
          {
            title: "Other experience",
            bullets: [
              "Personal Trainer, H Core Fitness",
              "Outside Event Educator, Lululemon",
              "CrossFit coach, Reebok CrossFit Sentinel",
              "Youth training, BE Academy Mongolia",
              "Performance training for Mongolia Sports Council instructors",
              "Instructor (physiology · sprint performance), FEARA",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "doohee-park",
    name: "Doohee Park",
    role: "PCC",
    group: "rehab",
    img: "coach-doohee-park.jpg",
    spec: [
      "Former Haneul Hospital Conditioning Center: care for volleyball, handball, ice hockey, swimming, youth soccer and baseball athletes",
      "Youth training, BE Academy Mongolia",
      "Performance training for Mongolia Sports Council instructors",
      "Former trainer, National Freestyle Snowboard Team",
      "  - 22/23 FIS Nor-Am Cup, World Championships, European Cup, World Cup",
      "  - 23/24 FIS World Cup, Gangwon Youth Olympic Winter Games",
      "  - 24/25 FIS World Cup, Asian Winter Games",
      "  - 26 Milano Olympic Winter Games",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/49",
    sections: [
      {
        type: "timeline",
        title: "Experience",
        items: [
          {
            period: "2020 — 2022",
            title: "Haneul Hospital Conditioning Center",
            subtitle: "Built field experience caring for pro (semi-pro) teams across multiple sports and youth athletes.",
            bullets: [
              "Care for many pro-team athletes (volleyball, handball, ice hockey, swimming)",
              "Care for many youth athletes (soccer, baseball)",
            ],
          },
          {
            period: "2022 — 2026",
            title: "Korea National Freestyle Snowboard Team",
            subtitle: "Served four years as the team's dedicated physical therapist through domestic and international training and competitions.",
          },
        ],
      },
      {
        type: "highlights",
        title: "Competition Highlights",
        items: [
          {
            season: "25 / 26 season",
            events: ["🥉 Milan Winter Olympics — National Snowboard Team trainer"],
            emphasis: true,
          },
          {
            season: "24 / 25 season",
            events: ["FIS World Cup", "Asian Winter Games"],
          },
          {
            season: "23 / 24 season",
            events: ["FIS World Cup", "Gangwon Youth Olympic", "Winter Games"],
          },
          {
            season: "22 / 23 season",
            events: ["FIS Nor-Am Cup", "World Championships", "European Cup · World Cup"],
          },
        ],
      },
    ],
  },
  {
    id: "suwoong-choi",
    name: "Suwoong Choi",
    role: "PCC",
    group: "rehab",
    img: "coach-suwoong-choi.jpg",
    spec: [
      "Physical therapist",
      "Former Mirae Neurosurgery / Songdo Sports Orthopedics",
      "Medical trainer, Korea National Alpine Snowboard Team",
      "  - 24/25 FIS World Cup, World Championships",
      "  - 26 Milano-Cortina Winter Olympics (PGS silver medal)",
      "Executive director, KAPF (Korea Athletic Physiotherapist Federation)",
      "Assistant instructor, FEARA (Functional Exercise Rehabilitation Association)",
      "Dynamic Taping Tutor",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/84",
    sections: [
      {
        type: "timeline",
        title: "Career",
        items: [
          {
            period: "2022 — 2024",
            title: "Mirae Neurosurgery / Songdo Sports Orthopedics",
            subtitle: "Handled exercise and manual therapy, building experience caring for national athletes across various sports.",
            bullets: [
              "Care for many national athletes across sports — U.S. national badminton, taekwondo, triathlon and tennis athletes and more",
            ],
          },
          {
            period: "2024 — 2026",
            title: "Medical trainer, Korea National Alpine Snowboard Team",
            subtitle: "As the team's dedicated medical trainer, accompanied domestic/international training, the World Cup tour, World Championships, and the Milano-Cortina Winter Olympics.",
          },
        ],
      },
      {
        type: "highlights",
        title: "Competition Highlights & Results",
        items: [
          {
            season: "25 / 26 season · key result",
            events: [
              "🥈 2026 Milano-Cortina Winter Olympics",
              "Medical trainer, National Alpine Snowboard Team (PGS silver)",
            ],
            emphasis: true,
          },
          {
            season: "25 / 26 season",
            events: [
              "🥇 Rogla, Slovenia FIS World Cup\n— PGS champion (1st)",
              "🥇 Winterberg, Germany FIS World Cup\n— PSL champion (1st)",
              "🥈 Krynica, Poland FIS World Cup\n— PGS runner-up (2nd)",
            ],
          },
          {
            season: "24 / 25 season",
            events: [
              "🥈 Mylin, China · Krynica, Poland FIS World Cup\n— PGS runner-up (2nd)",
              "🥉 St. Moritz, Switzerland World Championships\n— PGS 3rd",
            ],
          },
          {
            season: "23 / 24 season",
            events: ["2024 Gangwon Youth Winter Olympics", "National Technical Official (NTO) deployment"],
          },
        ],
      },
      {
        type: "timeline",
        title: "Sports Events & On-site Support",
        items: [
          { period: "2025", title: "Incheon International Marathon — elite athlete conditioning" },
          {
            period: "2025 — 2026",
            title: "On-site medical/conditioning support at various sports events including badminton tournaments",
          },
        ],
      },
      {
        type: "timeline",
        title: "External Activities & Academics",
        items: [
          { title: "Dynamic Taping Tutor" },
          { title: "KAPF (Korea Athletic Physiotherapist Federation)", subtitle: "Executive director" },
          { title: "FEARA (Functional Exercise Rehabilitation Association)", subtitle: "Assistant instructor" },
        ],
      },
    ],
  },
  {
    id: "woochan-lim",
    name: "Woochan Lim",
    role: "PCC",
    group: "perf",
    img: "coach-woochan-lim.png",
    spec: [
      "Physical therapist",
      "Coach, FE Training Center Gangnam",
      "Assistant instructor, FEARA (Functional Exercise Rehabilitation Association)",
      "Artist care, OnOne Entertainment / Kids Planet",
      "Posture-correction class for J Actors senior models",
      "2024 Gangwon Youth Winter Olympics technical official",
      "2024 national freestyle ski reserve fitness training",
      "2024 Korea national surfing team fitness testing support",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/9",
    sections: [
      {
        type: "timeline",
        title: "Career & Activities",
        items: [
          {
            period: "2025",
            title: "Physical therapist, KVA U19 National Team",
            bullets: [
              "Handled conditioning for ~2 months before the World Championships",
              "Accompanied the team to the World Championships in Uzbekistan",
            ],
          },
          {
            period: "2024",
            title: "National team · int'l competition deployments",
            bullets: [
              "Gangwon Youth Winter Olympics technical official",
              "Deployed to national freestyle ski reserve fitness training",
              "Korea national surfing team fitness testing",
            ],
          },
          {
            title: "Medical trainer, youth snowboard team",
            bullets: ["Handled athlete care and conditioning in PyeongChang for 3 months"],
          },
          {
            title: "Artist care · guest classes",
            bullets: [
              "Artist care for OnOne Entertainment/Kids Planet · 4M/4F Label",
              "Led posture-correction classes for J Actors senior models",
            ],
          },
          {
            title: "FEARA (Functional Exercise Rehabilitation Association)",
            subtitle: "Assistant instructor",
          },
        ],
      },
      {
        type: "program",
        title: "Programs at FETC Gangnam",
        items: [
          "Athlete conditioning & performance training",
          "Specialized training for sports-college entrance exams",
          "PyeongChang one-day class — sports taping · warm-up/cool-down program\n(youth athletes · coaches · enthusiasts)",
          "Health-management exercise for general members",
        ],
      },
    ],
  },
  {
    id: "nayeon-kang",
    name: "Nayeon Kang",
    role: "PCC",
    group: "rehab",
    img: "coach-nayeon-kang.jpg",
    spec: [
      "Trainer, 2025 World Lacrosse Men's U20 Championship",
      "Trainer, APLU U16 Championship",
      "Trainer, APLU U14 & U12 Festival",
      "National team trainer, 2025 Lacrosse Asia-Pacific Championship",
      "Physical trainer & athlete conditioning, national snowboard/alpine ski reserve summer & winter camps",
      "2025/26 Triple H Ski Team AT",
      "2024/25 Nexen Snowboard pro team AT",
      "2023/24 Alpensia Ski School instructor",
    ],
    tistoryUrl: "https://fetc-gangnam.tistory.com/50",
    sections: [
      {
        type: "timeline",
        title: "Education",
        items: [
          {
            badge: "Bachelor's",
            title: "Dept. of Sports Medicine, CHA University",
          },
        ],
      },
      {
        type: "timeline",
        title: "Career",
        items: [
          {
            period: "2025",
            title: "International lacrosse competition medical support",
            subtitle: "Covered three international competitions back-to-back in a single year, building global field experience.",
            bullets: [
              "World Lacrosse Men's U20 Championship",
              "APLU U16 Championship / (Australia Women's Team)",
              "APLU U14 & U12 Festival",
              "Lacrosse Asia-Pacific Championship / national team trainer",
            ],
          },
          { period: "2025/26", title: "Triple-H Ski Team AT" },
          { period: "2024/25", title: "Nexen Snowboard pro team AT" },
          {
            period: "Ongoing",
            title: "National reserve summer & winter training camps",
            bullets: [
              "Physical trainer, snowboard · alpine ski",
              "Athlete conditioning management",
            ],
          },
          { period: "2023/24", title: "Alpensia Ski School — ski instructor" },
        ],
      },
      {
        type: "certifications",
        title: "Certifications & Training",
        items: [
          { label: "2025", title: "CARPE Functional Rehabilitation Training Foundation" },
          { label: "2025", title: "KCA strength coach certification" },
          { label: "2024", title: "Sports Taping Trainer\nKorean Sports Rehabilitation Medicine Association" },
          { label: "2024", title: "Ski Level 1 · Teaching 1\nKorea Ski Instructors Association" },
          { label: "2023", title: "Sports Massage Level 2 / KATA" },
          { label: "2023", title: "Sports Taping Trainer / KATA" },
          { label: "2023", title: "I.A.T Athletic Training Course\nKorea University Athletic Trainers Association" },
          { label: "2023", title: "SIPT Athletic Medical Trainer Level 3" },
          { label: "2023", title: "Cadaver Anatomy Course\nCan Tho Univ. of Medicine & Pharmacy" },
          { label: "2022", title: "Winback TECAR Therapy Training" },
        ],
      },
    ],
  },
];
