import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import iyagiLogo from "../../image/iyagi-logo.png";
import "../../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("이메일을 입력해주세요.");
    if (!validateEmail(email)) return setError("올바른 이메일 형식이 아닙니다.");
    if (!password.trim()) return setError("비밀번호를 입력해주세요.");
    if (password.length < 6) return setError("비밀번호는 6자 이상이어야 합니다.");

    localStorage.setItem("auth", "true");
    alert("로그인되었습니다!");
    navigate("/main");
  };

  return (
    <div
      className="login-container"
      role="region"
      aria-label="로그인 화면"
      aria-live="polite"
    >
      <div className="login-box" role="form" aria-labelledby="login-title">
        <img
          src={iyagiLogo}
          alt="이약이 로고"
          className="login-logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          aria-label="홈으로 이동"
        />

        <h2 id="login-title" className="login-title" tabIndex={0}>
          로그인
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email-input" className="visually-hidden">
            이메일
          </label>
          <input
            id="email-input"
            type="email"
            className="login-input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="이메일 입력"
          />

          <label htmlFor="password-input" className="visually-hidden">
            비밀번호
          </label>
          <input
            id="password-input"
            type="password"
            className="login-input"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="비밀번호 입력"
          />

          {error && (
            <div
              className="login-error"
              role="alert"
              aria-live="assertive"
              tabIndex={0}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            aria-label="로그인 버튼"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
