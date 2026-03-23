import { useState } from "react";
import API from "../services/api";
import { Zap, Search, Loader2, MessageSquare, Send } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  const askAI = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer("");
    try {
      const res = await API.post("/ai/ask", {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("I'm sorry, I couldn't process your request. Please try again later.");
      console.error("AI Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel" style={{ 
      padding: 24, 
      borderLeft: "4px solid var(--green)", 
      background: "linear-gradient(to bottom, var(--panel-bg), var(--bg-secondary))" 
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ 
          width: 36, 
          height: 36, 
          background: "var(--green-soft)", 
          borderRadius: 12, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "var(--green)",
          boxShadow: "0 4px 12px var(--green-soft)"
        }}>
          <Zap size={20} fill="currentColor" />
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.03em" }}>
            AI Assistant
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 600 }}>Powered by StudentAtlas</p>
        </div>
      </div>
      
      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 20 }}>
        Ask me anything about relocating to{" "}
        <span style={{ color: "var(--green)", fontWeight: 800 }}>
          {user?.profile?.country || "your destination"}
        </span>.
      </p>

      <div style={{ position: "relative", marginBottom: 12 }}>
        <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
          placeholder="Ask a question..."
          className="input-field"
          style={{ paddingLeft: 44, height: 48, fontSize: "0.9rem" }}
        />
      </div>

      <button
        onClick={askAI}
        disabled={isLoading || !question.trim()}
        className="btn-primary"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 14,
          background: "var(--green)",
          boxShadow: "0 8px 20px color-mix(in srgb, var(--green) 30%, transparent)",
          border: "none",
          color: "#fff",
          fontWeight: 800,
          fontSize: "0.85rem"
        }}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <> <Send size={16} /> Ask AI </>
        )}
      </button>

      {answer && (
        <div className="animate-fade-up" style={{ 
          marginTop: 24, 
          padding: 20, 
          borderRadius: 16, 
          background: "var(--panel-bg)", 
          border: "1px solid var(--border-color)", 
          boxShadow: "var(--shadow-md)"
        }}>
          <div style={{ 
            fontSize: "0.7rem", 
            fontWeight: 850, 
            letterSpacing: "1px", 
            textTransform: "uppercase", 
            color: "var(--green)", 
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--green)" }} />
            Assistant Response
          </div>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary)", opacity: 0.9 }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
