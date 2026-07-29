export const ADMIN_PAGE_SIZE = 10;
export const NEWS_PAGE_SIZE = 12;
export const MAX_IMAGES_PER_POST = 12;
// Next.js segment config는 리터럴만 허용하므로 이 값을 직접 사용할 수 없음
// app/news/page.tsx의 revalidate와 동기화 필요
export const REVALIDATE_INTERVAL = 3600;

export const PHONE = "010-3375-9911";

export const BASE_URL = "https://fetc.co.kr";

// Google 지도 공유 단축링크 (영구·업체 상세로 열림) — Footer 오시는 길
export const GOOGLE_MAP_URL = "https://maps.app.goo.gl/QUytV9E7bsvXQrf58";

// 카카오맵 업체 상세 페이지 (정식 place URL) — Location 지도 링크
export const KAKAO_MAP_URL = "https://place.map.kakao.com/100150217";
