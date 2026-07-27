import Image from "next/image";
import styles from "./WhyFETC.module.css";

const ITEMS = [
  {
    num: "01",
    title: (
      <>
        국가대표 의무 트레이너, 물리치료사 출신
        <br />
        전 직원 FEARA 인증 PCC
      </>
    ),
    body: "2018 평창 동계올림픽 스노보드 국가대표팀 트레이너를 비롯, 다수의 국가대표팀 및 엘리트 선수들을 트레이닝한 경험과 병원에서 환자들을 케어한 경험을 갖춘 코치팀이 1:1로 지도합니다.",
    img: "/images/about/fetc/why_fetc_01.jpg",
    alt: "FETC 코치팀 단체사진",
  },
  {
    num: "02",
    title: (
      <>
        FEA 시스템 및 VALD 등을 이용한
        <br />
        정밀 평가로 시작하는 근거 기반의 트레이닝
      </>
    ),
    body: "모든 회원은 FEA 평가를 기반으로 프로그램을 시작합니다. 움직임 패턴, 관절 가동성, 근력 비대칭, 자세 및 신경계 협응을 과학적으로 분석해 통증·부상의 진짜 원인을 파악하고, 맞춤 로드맵을 설계합니다.",
    img: "/images/about/fetc/why_fetc_02.jpg",
    alt: "FEA 정밀 평가 시스템",
  },
  {
    num: "03",
    title: (
      <>
        Flowtics method,
        <br />
        회복부터 퍼포먼스까지 잇는 4단계 프로그램
      </>
    ),
    body: "올림픽 레벨 선수의 훈련·관리 방식을 바탕으로 설계된 FETC 고유의 4단계 프로그램입니다. Pre-activation → Dynamic Preparation → Strength Integration → Performance 단계를 통해 신체를 깨우고, 움직임을 준비하고, 힘을 통합하며 경기력으로 확장합니다.",
    img: "/images/about/fetc/why_fetc_03.jpg",
    alt: "Flowtics method 4단계 프로그램",
  },
  {
    num: "04",
    title: (
      <>
        통증 재활부터 경기력 향상까지,
        <br />
        시즌 단위의 주기화 관리
      </>
    ),
    body: "단순 통증 완화나 단기 근력강화에서 멈추지 않습니다. 부상 회복부터 일상 기능 복귀, 스포츠 퍼포먼스로 이어지는 주기화 프로그램을 통해 회복기·시즌 전·중·후 각 단계에 맞춘 체계적인 변화를 만듭니다.",
    img: "/images/about/fetc/why_fetc_04.jpg",
    alt: "시즌 단위 주기화 관리",
  },
];

export default function WhyFETC() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {ITEMS.map((item) => (
          <article key={item.num} className={styles.item}>
            <div className={styles.content}>
              <div className={styles.label}>WHY FETC? {item.num}</div>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.body}>{item.body}</p>
            </div>
            <div className={styles.imageWrap}>
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="(max-width:640px) 100vw, 40vw"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}