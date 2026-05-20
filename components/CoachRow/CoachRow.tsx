"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { COACHES, type Coach } from "@/lib/coaches";
import Modal from "@/components/CoachInfo/Modal";
import styles from "./CoachRow.module.css";

interface Props {
  autoOpenCoach?: Coach;
}

const coachesJsonLd = {
  "@context": "https://schema.org",
  "@graph": COACHES.map((coach) => ({
    "@type": "Person",
    name: coach.name,
    jobTitle: coach.role,
    image: `https://fetc.co.kr/images/${coach.img}`,
    url: `https://fetc.co.kr/coach/${coach.id}`,
    sameAs: [coach.tistoryUrl],
    worksFor: {
      "@type": "Organization",
      name: "FE트레이닝센터 강남점",
      url: "https://fetc.co.kr",
    },
    knowsAbout: coach.spec,
  })),
};

export default function CoachRow({ autoOpenCoach }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Coach | null>(null);

  // /coach/[id] 직접 접속 시 PC에서 모달 자동 열기
  useEffect(() => {
    if (autoOpenCoach && window.innerWidth > 640) {
      setSelected(autoOpenCoach);
    }
  }, [autoOpenCoach]);

  // 브라우저 뒤로가기 시 모달 닫기
  useEffect(() => {
    function handlePopState() {
      setSelected(null);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function openCoach(coach: Coach) {
    if (window.innerWidth <= 640) {
      router.push(`/coach/${coach.id}`);
    } else {
      setSelected(coach);
      history.pushState(null, "", `/coach/${coach.id}`);
    }
  }

  function closeCoach() {
    setSelected(null);
    history.pushState(null, "", "/about");
  }

  return (
    <>
      <Script
        id="ld-coaches"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coachesJsonLd) }}
      />
      <div className={styles.section}>
        <h2 className={`${styles.sectionTitle} sr`}>COACH</h2>
        <div className={styles.row}>
          {COACHES.map((coach, i) => (
            <div
              key={coach.id}
              className={`${styles.card} sr sr-d${i + 1}`}
              onClick={() => openCoach(coach)}
            >
              <div className={styles.photo}>
                <Image src={`/images/${coach.img}`} alt={coach.name} width={360} height={460} />
              </div>
              <div className={styles.info}>
                <div className={styles.role}>{coach.role}</div>
                <h3 className={styles.name}>{coach.name}</h3>
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
      {selected && <Modal coach={selected} onClose={closeCoach} />}
    </>
  );
}