"use client";

import { useState } from "react";
import styles from "./AboutCoaching.module.css";

// Flowtics 4단계는 로케일 무관 영문 고정 → 하드코딩.
const STAGES = ["Pre-Activation", "Dynamic Preparation", "Strength Integration", "Performance"];

interface Props {
  /** 트리거 문구 ("어떤 기준으로 관리하나요?") */
  trigger: string;
  /** 펼침 패널 하단 설명 */
  note: string;
}

// "어떤 기준으로 관리하나요?" 클릭 → TEAM METHOD 패널 인라인 펼침.
// 번역 문자열은 props로 주입받아 별도 ClientProvider 없이 동작.
export default function TeamMethodDisclosure({ trigger, note }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.disclosure}>
      <button
        type="button"
        className={`${styles.whyQuestion} ${open ? styles.whyQuestionOpen : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{trigger}</span>
        <svg
          className={styles.whyChevron}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`${styles.panelWrap} ${open ? styles.panelWrapOpen : ""}`}>
        <div className={styles.panelInner}>
          <div className={styles.tmPanel}>
            <div className={styles.tmLabel}>TEAM METHOD</div>
            <div className={styles.tmTitle}>ALL STAGES, ONE TEAM STANDARD</div>
            <div className={styles.tmFlow}>
              {STAGES.map((s, i) => (
                <span key={s} className={styles.tmStageWrap}>
                  {i > 0 && <span className={styles.tmArrow}>→</span>}
                  <span className={styles.tmStage}>{s}</span>
                </span>
              ))}
            </div>
            <p className={styles.tmNote}>{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
