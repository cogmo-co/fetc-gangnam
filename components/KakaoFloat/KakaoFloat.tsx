import styles from "./KakaoFloat.module.css";

export default function KakaoFloat() {
  return (
    <a
      href="http://pf.kakao.com/_xkzxfbn/chat"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="카카오톡 문의"
    >
      <svg viewBox="0 0 24 24" fill="#3C1E1E">
        <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.41-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.81C22 6.58 17.52 3 12 3z" />
      </svg>
    </a>
  );
}
