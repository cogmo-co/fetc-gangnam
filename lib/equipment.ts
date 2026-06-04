import { BASE_URL } from "@/lib/constants";

export interface Equipment {
  id: string; // slug for URL — /about/facility/[id]
  name: string; // 카드 라벨 (예: "VALD")
  fullName: string; // 영문 풀네임 (예: "VALD PERFORMANCE")
  tagline: string; // 한글 부제 (예: "정밀 근력∙움직임 평가")
  body: string; // 상세 카피 (모달/상세 페이지 본문, 줄바꿈 보존 — white-space: pre-line)
  img: string; // 페이지 카드용 이미지 파일명
  detailImgs: string[]; // 모달/상세 페이지용 추가 이미지 파일명
}

const IMAGE_BASE = "/images/about/facility";

export const EQUIPMENTS: Equipment[] = [
  {
    id: "vald",
    name: "VALD",
    fullName: "VALD PERFORMANCE",
    tagline: "정밀 근력∙움직임 평가",
    body: `잉글랜드 프리미어리그(EPL), NBA, NFL, MLB, AFL 등 세계 최상위 스포츠 리그와 영국 국가대표 스포츠 기관 등에서 사용하는 정밀 평가 플랫폼입니다.
Force Decks(점프∙근력 비대칭), Dynamo(관절 가동성∙근력) 등을 통해 부상 위험과 퍼포먼스 변화를 객관적 수치로 측정합니다.
프로 구단이 선수의 운동능력을 평가하는 기준 그대로 측정∙관리되기 때문에 엘리트 선수 수준의 퍼포먼스를 목표로 한다면 반드시 거쳐야 할 평가 시스템입니다.`,
    img: "a_vald.jpg",
    detailImgs: ["a_vald_1.jpg", "a_vald_2.jpg"],
  },
  {
    id: "keiser",
    name: "KEISER",
    fullName: "KEISER PNEUMATIC RESISTANCE",
    tagline: "공기압 저항 트레이닝",
    body: `NBA, NHL, NFL팀의 약 2/3, MLB 29개 팀이 사용하는 공기압 저항 트레이닝 장비입니다.
NFL combine, 올림픽, MLB 스프링 트레이닝 준비시설로 유명한 EXOS, 그리고 미 해군 Navy SEALs가 사용하며 공기압 기반의 저항으로 관절에 무리 없이 폭발적인 파워, 속도 트레이닝이 가능합니다. 재활 단계부터 시즌 퍼포먼스까지 단계별 적용이 가능한 시스템입니다.
관절에 무리 없이 폭발력∙파워∙민첩성을 끌어올려야 하는 선수, 그리고 재활 후 안전하게 트레이닝 강도를 올려가야 하는 분에게 반드시 필요한 트레이닝입니다.`,
    img: "b_keiser.jpg",
    detailImgs: ["b_keiser_1.jpg", "b_keiser_2.jpg"],
  },
  {
    id: "speediance",
    name: "SPEEDIANCE",
    fullName: "SPEEDIANCE",
    tagline: "스마트 디지털 트레이닝",
    body: `케이블 기반의 디지털 저항 시스템으로, 운동 데이터(속도∙거리∙각도∙파워)를 실시간 측정하면서 0.1kg 단위로 저항을 정밀 조절하는 차세대 스마트 트레이닝 장비입니다.
좌우 비대칭 교정, 동작별 최적 강도 자동설정, 매 세션의 운동 이력 데이터 누적 관리를 통해 본인의 신체 변화를 객관적인 수치로 추적할 수 있습니다.
숫자로 자신의 성장을 추적하고 일관성을 유지하고 싶은 분, 그리고 짧은 시간에 정밀하게 트레이닝하고자 하는 분에게 권장되는 차세대 트레이닝 시스템입니다.`,
    img: "c_speediance.jpg",
    detailImgs: ["c_speediance_1.jpg", "c_speediance_2.jpg"],
  },
  {
    id: "winback",
    name: "WINBACK",
    fullName: "WINBACK Tecar Therapy",
    tagline: "고주파 회복∙재활",
    body: `파리 생제르맹(PSG), FC바르셀로나, Stade Toulousain(럭비), 클리블랜드 캐벌리어스(NBA), 뉴욕 양키스(MLB) 등 350개 이상의 프로 스포츠팀이 사용하는 고주파(Tecar) 회복 시스템입니다.
근육 통증 완화∙조직 재생 촉진∙부상 후 회복 가속에 사용되며, 영국 다이빙 국가대표 선수가 4개 올림픽에서 6개 메달을 획득하는 과정에서도 회복 장비로 활용되었습니다.
부상 후 빠른 일상 복귀, 시즌 중 컨디션 유지 및 강도 높은 훈련 후 회복이 필요한 분에게 반드시 거쳐야 할 회복 시스템입니다.`,
    img: "d_winback.jpg",
    detailImgs: ["d_winback_1.jpg", "d_winback_2.jpg"],
  },
  {
    id: "reaction-light",
    name: "REACTION LIGHT",
    fullName: "Reaction Light Training",
    tagline: "반응속도 ∙ 인지 훈련",
    body: `농구∙격투기∙축구∙테니스∙복싱 등 빠른 판단과 반응속도가 경기력을 좌우하는 종목의 트레이닝에서 표준적으로 사용되는 시각 반응 시스템입니다.
불빛이나 색상에 대한 즉각적 반응 훈련을 통해 인지-운동 통합 능력, 의사결정 속도, 양측 협응을 객관적 수치로 측정하고 향상시킵니다.
순간의 반응속도와 인지능력이 경기력을 결정짓는 종목 선수, 그리고 부상이나 노화로 떨어진 인지 및 반응능력을 회복하고자 하는 분에게 필요한 트레이닝 장비입니다.`,
    img: "e_reaction_light.jpg",
    detailImgs: ["e_reaction_light_1.jpg", "e_reaction_light_2.jpg"],
  },
  {
    id: "matrix-s-drive",
    name: "MATRIX S-DRIVE",
    fullName: "MATRIX S-DRIVE",
    tagline: "무동력 트레드밀",
    body: `NFL combine, NBA트레이닝캠프, 미국 특수부대 등의 훈련에 사용되는 무동력(self-powered) 트레드밀입니다.
모터 없이 사용자의 발만으로 벨트가 움직이며, 일반 트레드밀 대비 약 30% 더 많은 칼로리를 소모합니다. 자연스러운 러닝 자세를 유도하면서 햄스트링∙둔근 등 후면 사슬근육을 강하게 활성화하고, 스프린트∙인터벌∙썰매 푸시 등 다양한 고강도 트레이닝이 가능합니다.
스프린트∙러닝 퍼포먼스를 끌어올려야 하는 종목의 선수, 그리고 관절 부담 없이 폭발적인 심폐∙하체 강화가 필요한 분에게 필요한 트레이닝 장비입니다.`,
    img: "f_matrix_self_drive.jpg",
    detailImgs: ["f_matrix_self_drive_1.jpg", "f_matrix_self_drive_2.jpg"],
  },
];

export function findEquipment(id: string): Equipment | undefined {
  return EQUIPMENTS.find((e) => e.id === id);
}

export function getEquipmentImage(filename: string): string {
  return `${IMAGE_BASE}/${filename}`;
}

/** /about/facility/[id] 페이지용 — 단일 장비 Product schema (선택적 SEO 강화) */
export function getEquipmentSchema(equipment: Equipment) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: equipment.fullName,
    description: equipment.tagline,
    image: `${BASE_URL}${getEquipmentImage(equipment.img)}`,
    url: `${BASE_URL}/about/facility/${equipment.id}`,
    brand: {
      "@type": "Brand",
      name: equipment.name,
    },
  };
}