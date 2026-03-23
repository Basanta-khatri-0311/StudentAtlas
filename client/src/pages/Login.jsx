import { useState } from "react";
import API from "../services/api";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Globe, Lock, Mail, Moon, Sun, ArrowRight, Sparkles, User, UserPlus } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const { mode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const res = await API.post(endpoint, payload);
      setAuth(res.data.user, res.data.token);
      setAuthToken(res.data.token);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ 
      background: "var(--bg-primary)", 
      color: "var(--text-primary)", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      position: "relative",
      padding: 20
    }}>
      {/* Decorative Orbs */}
      <div style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0
      }} />

      <button
        onClick={toggleTheme}
        className="btn-icon"
        style={{ position: "fixed", top: 32, right: 32, zIndex: 10 }}
      >
        {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="panel animate-fade-up" style={{ 
        width: "100%", 
        maxWidth: 440, 
        padding: "48px 40px", 
        background: "var(--panel-bg)", 
        position: "relative", 
        zIndex: 1,
        boxShadow: "var(--shadow-xl)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ 
            width: 48, 
            height: 48, 
            background: "var(--accent)", 
            borderRadius: 14, 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginBottom: 20,
            boxShadow: "0 8px 20px var(--accent-glow)"
          }}>
            <Globe size={24} color="#fff" />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 850, fontSize: "1.8rem", letterSpacing: "-0.05em", marginBottom: 8 }}>
            {isLogin ? "Welcome Back" : "Start Journey"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            {isLogin ? "Sign in to access your dashboard" : "Join our community of global students"}
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: "12px 16px", 
            background: "var(--bg-tertiary)", 
            border: "1px solid #ef444430", 
            borderRadius: 12, 
            color: "#ef4444", 
            fontSize: "0.85rem", 
            fontWeight: 600, 
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {!isLogin && (
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Full Name"
                className="input-field"
                style={{ paddingLeft: 48 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div style={{ position: "relative" }}>
            <Mail size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
              style={{ paddingLeft: 48 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              style={{ paddingLeft: 48 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary" style={{ width: "100%", marginTop: 8 }}>
            {isLoading ? (
              <div style={{ width: 20, height: 20, border: "2px solid #fff3", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            ) : (
              <> {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} /> </>
            )}
          </button>
        </form>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 700, marginLeft: 6, cursor: "pointer" }}
            >
              {isLogin ? "Join now" : "Log in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}