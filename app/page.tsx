import Hero from "@/components/Hero/Hero";
import FullSection from "@/components/FullSection/FullSection";
import TistorySection from "@/components/TistorySection/TistorySection";
import MediaSection from "@/components/MediaSection/MediaSection";
import LocationSection from "@/components/LocationSection/LocationSection";
import BranchGrid from "@/components/BranchGrid/BranchGrid";

export default function Home() {
  return (
    <>
      <Hero />

      <FullSection
        bgColor="#1c1c1c"
        bgLabel="PERFORMANCE"
        text="PERFORMANCE"
        body={
          <>
            선수의 운동능력, 단계에 맞춰 프로그램을 설계합니다.<br />
            기초 컨디셔닝부터 경기력 준비까지,<br className="mobile-br" />{" "}
            최고의 퍼포먼스를 발휘할 수 있도록<br />
            각 시기에 필요한 훈련과 관리를 체계적으로 제공합니다.
          </>
        }
        href="/performance"
      />

      <FullSection
        bgColor="#181818"
        bgLabel="TRAINING"
        text="TRAINING"
        body={
          <>
            FETC만의 Flowtics method를 통해<br className="mobile-br" />{" "}
            트레이닝의 시작과 끝을 연결합니다.<br />
            평가 기반의 체계적인 훈련으로 진짜 변화를 만들어갑니다.
          </>
        }
        href="/training"
      />

      <FullSection
        bgColor="#141414"
        bgLabel="REHABILITATION"
        text="REHABILITATION"
        body={
          <>
            단계별 맞춤 재활 프로그램을 통해<br className="mobile-br" />{" "}
            통증 조절부터 기능 회복까지 체계적으로 관리합니다.<br />
            개인의 신체에 최적화된 회복 솔루션을 통해<br className="mobile-br" />{" "}
            일상생활 및 현장으로의 완전한 복귀를 완성합니다.
          </>
        }
        href="/rehabilitation"
      />

      <TistorySection />
      <MediaSection />
      <LocationSection />
      <BranchGrid />
    </>
  );
}
