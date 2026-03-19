"use client";

import styles from "./admin.module.css";

interface Props {
  loginId: string;
  loginPw: string;
  loading: boolean;
  error: string;
  onIdChange: (v: string) => void;
  onPwChange: (v: string) => void;
  onLogin: () => void;
}

export default function LoginForm({
  loginId,
  loginPw,
  loading,
  error,
  onIdChange,
  onPwChange,
  onLogin,
}: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>관리자 로그인</div>
        <div className={styles.field}>
          <label>ID</label>
          <input
            value={loginId}
            onChange={(e) => onIdChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
          />
        </div>
        <div className={styles.field}>
          <label>비밀번호</label>
          <input
            type="password"
            value={loginPw}
            onChange={(e) => onPwChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLogin()}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button
          className={styles.btnPrimary}
          onClick={onLogin}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}
