import { useState } from "react";
import { Sparkles, Users, Calendar, MessageSquare } from "lucide-react";
import "./AuthScreen.css";

interface AuthScreenProps {
  onLogin: () => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-grid">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="brand-header">
              <div className="brand-logo-large">
                <div className="logo-icon-box">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="brand-title">TeamSync</h1>
              </div>
              <p className="brand-subtitle">
                AI 기반 협업 플랫폼으로
                <br />
                팀의 생산성을 극대화하세요
              </p>
            </div>

            <div className="feature-cards">
              <div className="glass-card feature-card">
                <div className="feature-content">
                  <div className="feature-icon-box bg-indigo-100">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="feature-text">
                    <h3>스마트 회의실</h3>
                    <p>채팅 중 일정을 자동 감지</p>
                  </div>
                </div>
              </div>

              <div className="glass-card feature-card">
                <div className="feature-content">
                  <div className="feature-icon-box bg-blue-100">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="feature-text">
                    <h3>AI 일정 생성</h3>
                    <p>자동으로 일정과 할 일 정리</p>
                  </div>
                </div>
              </div>

              <div className="glass-card feature-card">
                <div className="feature-content">
                  <div className="feature-icon-box bg-purple-100">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="feature-text">
                    <h3>팀 협업</h3>
                    <p>조직과 팀을 효율적으로 관리</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="glass-card auth-form-card">
          <div className="mobile-brand">
            <div className="mobile-brand-content">
              <div className="logo-icon-box-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="mobile-brand-title">TeamSync</h1>
            </div>
          </div>

          <div className="form-header">
            <h2 className="form-title">{isLogin ? "로그인" : "회원가입"}</h2>
            <p className="form-subtitle">
              {isLogin ? "계정으로 로그인하세요" : "새로운 계정을 만드세요"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="organization" className="form-label">
                  조직 이름
                </label>
                <input
                  id="organization"
                  type="text"
                  placeholder="회사 또는 팀 이름"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="form-input"
                  required={!isLogin}
                />
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? "로그인" : "조직 생성하기"}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line">
              <div className="divider-border"></div>
            </div>
            <div className="divider-text-wrapper">
              <span className="divider-text">또는</span>
            </div>
          </div>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-auth-button"
          >
            {isLogin ? (
              <>
                계정이 없으신가요?{" "}
                <span className="text-highlight">회원가입</span>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{" "}
                <span className="text-highlight">로그인</span>
              </>
            )}
          </button>

          {isLogin && (
            <button className="guest-login-button">기존 조직 참여하기 →</button>
          )}
        </div>
      </div>
    </div>
  );
}
