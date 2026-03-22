import { useState } from "react";
import API from "../services/api";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import { setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Globe, Lock, Mail, Moon, Sun, ArrowRight, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const { mode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      setAuth(res.data.user, res.data.token);
      setAuthToken(res.data.token);
      navigate("/feed");
    } catch (err) {
      alert("Invalid credentials, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ── Left Panel: Branding ───────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] p-12 relative overflow-hidden"
        style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border-color)" }}
      >
        {/* Decorative orb */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "radial-gradient(circle, color-mix(in srgb, var(--green) 14%, transparent), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Globe size={20} color="#fff" />
          </div>
          <span
            className="font-display text-lg font-700"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Student<span className="gradient-text">Atlas</span>
          </span>
        </div>

        {/* Center copy */}
        <div style={{ animation: "fadeUp 0.6s ease forwards" }}>
          <div
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              border: "1px solid var(--accent-muted)",
            }}
          >
            <Sparkles size={12} />
            Community-powered insights
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "2.6rem",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              marginBottom: "1.2rem",
            }}
          >
            Navigate your
            <br />
            student journey
            <br />
            <span className="gradient-text">with confidence.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 340, lineHeight: 1.7 }}>
            Real insights from real students who've been where you're going. Find housing, universities, and local
            knowledge — all in one place.
          </p>
        </div>

        {/* Stat pills */}
        <div className="flex gap-4">
          {[
            { val: "12k+", label: "Students" },
            { val: "80+", label: "Countries" },
            { val: "4.9★", label: "Rated" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="panel"
              style={{ padding: "12px 18px", borderRadius: 12, textAlign: "center" }}
            >
              <div
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}
              >
                {val}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel: Form ──────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            padding: "8px",
            borderRadius: "50%",
            border: "1px solid var(--border-color)",
            background: "var(--panel-bg)",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          {mode === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <Globe size={22} style={{ color: "var(--accent)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.03em" }}>
            Student<span className="gradient-text">Atlas</span>
          </span>
        </div>

        <div style={{ width: "100%", maxWidth: 400, animation: "fadeUp 0.45s ease forwards" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.9rem",
              letterSpacing: "-0.04em",
              marginBottom: "0.4rem",
            }}
          >
            Welcome back
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Sign in to access your community feed.
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: "0.9rem", position: "relative" }}>
              <Mail
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 40 }}
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem", position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ paddingLeft: 40, fontFamily: "monospace" }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
          </div>

          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            No account yet?{" "}
            <span
              style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Create one — it's free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}