import { useNavigate } from "react-router-dom";
import { Globe, ArrowRight, Zap, Shield, Users, MessageSquare, Sparkles, Star } from "lucide-react";
import useThemeStore from "../store/themeStore";
import { Sun, Moon } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeStore();

  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* ── Navbar ──────────────────────────────── */}
      <nav className="glass" style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: 1100,
        height: 64,
        borderRadius: 20,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            background: "var(--accent)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px var(--accent-glow)",
          }}>
            <Globe size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.04em" }}>
            Student<span className="gradient-text">Atlas</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button 
            onClick={toggleTheme}
            className="btn-icon"
            style={{ border: "none", background: "transparent" }}
          >
            {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => navigate("/login")}
            style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", cursor: "pointer", background: "none", border: "none" }}
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="btn-primary"
            style={{ padding: "8px 20px", fontSize: "0.85rem", borderRadius: 14 }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────── */}
      <section style={{ 
        paddingTop: 180, 
        paddingBottom: 100, 
        textAlign: "center",
        position: "relative"
      }}>
        {/* Background Gradients */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "600px",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: -1,
          opacity: 0.6
        }} />

        <div className="container">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
             <div style={{ 
               display: "inline-flex", 
               alignItems: "center", 
               gap: 8, 
               padding: "6px 16px", 
               background: "var(--accent-soft)", 
               borderRadius: 20, 
               color: "var(--accent)",
               fontSize: "0.75rem",
               fontWeight: 800,
               textTransform: "uppercase",
               letterSpacing: "1px",
               marginBottom: 24,
               border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)"
             }}>
               <Sparkles size={14} /> New: AI Travel Assistant
             </div>
          </div>

          <h1 className="animate-fade-up" style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "clamp(3rem, 7vw, 5rem)", 
            fontWeight: 850, 
            lineHeight: 1, 
            letterSpacing: "-0.06em",
            marginBottom: 24,
            animationDelay: "0.2s"
          }}>
            Explore your <span className="font-serif italic" style={{ fontWeight: 400 }}>educational</span> <br />
            journey <span className="gradient-text">globally.</span>
          </h1>
          
          <p className="animate-fade-up" style={{ 
            fontSize: "1.2rem", 
            color: "var(--text-secondary)", 
            maxWidth: 600, 
            margin: "0 auto 40px",
            lineHeight: 1.6,
            animationDelay: "0.3s"
          }}>
            Connect with verified international students. Find housing, reviews, and community support — all powered by our intelligent AI assistant.
          </p>

          <div className="animate-fade-up" style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 16,
            animationDelay: "0.4s"
          }}>
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Join the Community <ArrowRight size={20} />
            </button>
            <button className="btn-secondary">
              See Stories
            </button>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-up" style={{ marginTop: 60, animationDelay: "0.5s" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Star size={16} fill="var(--green)" color="var(--green)" /> 4.9/5 Rating
              </div>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border-color)" }} />
              <div>50k+ Active Students</div>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border-color)" }} />
              <div>120+ Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ────────────────────── */}
      <section style={{ padding: "100px 0", background: "var(--bg-secondary)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.04em", marginBottom: 60 }}>
            Everything you need to <span className="gradient-text">succeed.</span>
          </h2>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: 24 
          }}>
            {[
              {
                icon: <Zap size={24} color="var(--accent)" />,
                title: "AI Assistant",
                desc: "Our integrated AI helps you find the right documents, flights, and accommodation tips instantly."
              },
              {
                icon: <Users size={24} color="var(--accent)" />,
                title: "Social Feed",
                desc: "Real-time updates from students currently on the ground in your destination city."
              },
              {
                icon: <Shield size={24} color="var(--accent)" />,
                title: "Verified Reviews",
                desc: "No bots, no fake news. Every review is from a verified student with a valid university email."
              }
            ].map((f, i) => (
              <div key={i} className="panel panel-hover" style={{ padding: 40, textAlign: "left" }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: 16, 
                  background: "var(--accent-soft)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: 24
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", marginBottom: 12 }}>
                  {f.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{ padding: "60px 0", borderTop: "1px solid var(--border-color)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 24, height: 24, background: "var(--accent)", borderRadius: 6, display: "flex", alignItems: "center", justifyCenter: "center" }}>
               <Globe size={14} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>StudentAtlas</span>
           </div>
           
           <div style={{ display: "flex", gap: 24, color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
             <a href="#">Privacy</a>
             <a href="#">Terms</a>
             <a href="#">Twitter</a>
           </div>

           <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
             © 2026 StudentAtlas. All rights reserved.
           </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          h1 { font-size: 2.8rem !important; }
          nav { width: 95% !important; padding: 0 16px !important; }
          .container { padding: 0 20px !important; }
        }
      `}</style>
    </div>
  );
}
