# FETC 강남점 홈페이지

FE Training Center 강남점 공식 홈페이지
https://fetc.co.kr

## 페이지 구성

- **홈** — 메인 화면
- **소개** — 센터 소개
- **퍼포먼스 트레이닝** — Flowtics Method 프로그램
- **종목별 트레이닝** — 종목별 맞춤 훈련
- **재활 트레이닝** — 부상 재활 프로그램
- **오시는 길** — 위치 및 연락처

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules

## 프로젝트 구조

```
app/
  page.tsx              # 홈
  about/page.tsx        # 소개
  performance/page.tsx  # 퍼포먼스 트레이닝
  training/page.tsx     # 종목별 트레이닝
  rehabilitation/page.tsx # 재활 트레이닝
  contact/page.tsx      # 오시는 길
  sitemap.ts            # 검색엔진용 사이트 지도
  robots.ts             # 검색엔진 접근 설정
components/             # 화면 구성 요소
public/
  fonts/                # Pretendard 폰트
  images/               # 이미지 파일
```

## 실행 방법

```bash
npm install     # 처음 한 번만
npm run dev     # 개발 서버 실행 → http://localhost:3000
```

## 배포용 빌드

```bash
npm run build   # 빌드
npm start       # 실행
```
