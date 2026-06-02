import type { Metadata } from "next";
import WhyFETC from "@/components/WhyFETC/WhyFETC";
import FAQSection from "@/components/FAQSection/FAQSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FE TRAINING CENTER",
  description:
    "FE트레이닝센터 강남점 — 평가 기반의 체계적인 트레이닝으로 퍼포먼스를 향상시키는 공간. 국가대표 트레이너 출신 코치진, FEARA 인증 PCC, Flowtics method.",
};

export default function FETCPage() {
  return (
    <>
      <section className={styles.intro}>
        <h2 className={`${styles.bigTitle} sr`}>FE TRAINING CENTER</h2>
        <div className={`${styles.story} sr sr-d1`}>
          <p>
            우리가 트레이닝을 하는 이유, 결국 하나입니다.
            <br />
            퍼포먼스를 향상하기 위함입니다.
          </p>
          <p>
            더 빠르고, 더 강하고, 더 정확하게 움직일 수 있어야 합니다.
            <br />
            힘이 어떻게 발생하고, 어떤 구조를 통해 전달되며,
            <br />
            어떤 경로로 흘러야 하는지를 설계합니다.
          </p>
          <p>
            우리는 정해진 방법을 고집하지 않습니다.
            <br />
            의미 있는 변화를 만들기 위한 모든 방법을 동원해
            <br />
            맥락을 읽고, 선택하고, 설계합니다.
          </p>
        </div>
      </section>

      <WhyFETC />

      <FAQSection />
    </>
  );
}
