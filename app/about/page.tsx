import type { Metadata } from "next";
import SubHero from "@/components/SubHero/SubHero";
import CoachRow from "@/components/CoachRow/CoachRow";
import LocationInfoSection from "@/components/LocationInfoSection/LocationInfoSection";
import BranchGrid from "@/components/BranchGrid/BranchGrid";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "소개",
  description:
    "FE트레이닝센터 강남점 소개. 퍼포먼스 향상을 위한 과학적 트레이닝을 설계합니다.",
};

export default function AboutPage() {
  return (
    <div className="sub-page">
      <SubHero title="ABOUT FETC" image="/images/about-hero.jpg" />

      <div className={styles.textSection}>
        <p className={`${styles.text} sr`}>
          우리가 트레이닝을 하는 이유,<br />
          결국 하나입니다. 퍼포먼스를 향상하기 위함입니다.<br /><br />
          더 빠르고, 더 강하고, 더 정확하게 움직일 수 있어야 합니다.<br />
          힘이 어떻게 발생하고, 어떤 구조를 통해 전달되며,<br />
          어떤 경로로 흘러야 하는지를 설계합니다.<br /><br />
          우리는 정해진 방법을 고집하지 않습니다.<br />
          의미 있는 변화를 만들기 위한 모든 방법을 동원해<br />
          맥락을 읽고, 선택하고, 설계합니다.
        </p>
      </div>

      <CoachRow />
      <div className={styles.spacer} />

      <LocationInfoSection />
      <BranchGrid />
    </div>
  );
}
