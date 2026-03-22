import { useEffect, useState } from "react";
import API from "../services/api";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import {
  MessageSquare,
  Heart,
  Send,
  Zap,
  Search,
  Moon,
  Sun,
  User as UserIcon,
  Globe,
  LogOut,
  Loader2,
  MoreHorizontal,
} from "lucide-react";

// ─── Avatar initials helper ────────────────────
function Avatar({ name, size = 36 }) {
  const initials = name
    ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const hue = name ? [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360 : 200;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `hsl(${hue}, 60%, 55%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: size * 0.35,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Post Card ─────────────────────────────────
function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const name = post.userId?.name || "Anonymous";
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="panel panel-hover"
      style={{
        padding: "20px 24px",
        animation: "fadeUp 0.4s ease forwards",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={name} size={38} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.02em" }}>
              {name}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: 1 }}>{date}</div>
          </div>
        </div>
        <button
          style={{
            padding: "4px 6px",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <p style={{ color: "var(--text-primary)", fontSize: "0.93rem", lineHeight: 1.7, opacity: 0.85 }}>
        {post.content}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 16 }}>
        <button
          onClick={handleLike}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            background: liked ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
            color: liked ? "var(--accent)" : "var(--text-muted)",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <Heart size={15} fill={liked ? "currentColor" : "none"} />
          {likeCount}
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <MessageSquare size={15} />
          Reply
        </button>
      </div>
    </div>
  );
}

// ─── Feed Page ─────────────────────────────────
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { mode, toggleTheme } = useThemeStore();

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await API.get("/posts/feed");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch feed");
    }
  };

  const createPost = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    try {
      await API.post("/posts", {
        content,
        country: user?.profile?.country,
        university: user?.profile?.university,
      });
      setContent("");
      fetchFeed();
    } catch (err) {
      alert("Error creating post");
    } finally {
      setIsPosting(false);
    }
  };

  const askAI = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiAnswer("");
    try {
      const res = await API.post("/ai/ask", { question: aiQuestion });
      setAiAnswer(res.data.answer);
    } catch (err) {
      setAiAnswer("Failed to get AI answer.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const charCount = content.length;
  const charLimit = 500;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

      {/* ── Navbar ──────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "color-mix(in srgb, var(--bg-primary) 80%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-color)",
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Globe size={16} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.05rem",
              letterSpacing: "-0.03em",
            }}
          >
            Student<span className="gradient-text">Atlas</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={toggleTheme}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-secondary)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar name={user.name} size={32} />
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                {user.name?.split(" ")[0]}
              </span>
            </div>
          )}

          <button
            onClick={logout}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid var(--border-color)",
              background: "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.78rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--text-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </nav>

      {/* ── Main Layout ─────────────────────────── */}
      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 20px",
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 28,
        }}
        className="feed-grid"
      >
        {/* ── Feed Column ─────────────────────── */}
        <div style={{ minWidth: 0 }}>

          {/* Create Post */}
          <div className="panel" style={{ padding: "20px 24px", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <Avatar name={user?.name} size={36} />
              <div style={{ flex: 1 }}>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, charLimit))}
                  placeholder="Share an experience, tip, or question with the community…"
                  rows={3}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    fontSize: "0.93rem",
                    lineHeight: 1.6,
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <span style={{ fontSize: "0.75rem", color: charCount > charLimit * 0.9 ? "var(--accent)" : "var(--text-muted)" }}>
                {charCount}/{charLimit}
              </span>
              <button
                onClick={createPost}
                disabled={isPosting || !content.trim()}
                className="btn-primary"
                style={{
                  padding: "8px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  opacity: !content.trim() ? 0.5 : 1,
                  cursor: !content.trim() ? "not-allowed" : "pointer",
                }}
              >
                {isPosting ? <Loader2 size={14} className="animate-spin-slow" /> : <Send size={14} />}
                {isPosting ? "Posting…" : "Post"}
              </button>
            </div>
          </div>

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              Community Feed
            </h2>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                background: "var(--bg-secondary)",
                padding: "3px 10px",
                borderRadius: 99,
                border: "1px solid var(--border-color)",
              }}
            >
              {posts.length} posts
            </span>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div
              className="panel"
              style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}
            >
              <UserIcon size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p style={{ fontSize: "0.9rem" }}>No posts yet. Be the first to share!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ─────────────────────────── */}
        <aside>
          {/* User profile chip */}
          {user && (
            <div className="panel" style={{ padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={user.name} size={40} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name}
                </div>
                {user.profile?.country && (
                  <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: 2 }}>
                    📍 {user.profile.country}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Assistant */}
          <div
            className="panel"
            style={{
              padding: "22px",
              position: "sticky",
              top: 76,
              borderLeft: "3px solid var(--green)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "var(--green-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={14} style={{ color: "var(--green)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.02em",
                }}
              >
                AI Assistant
              </h3>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.6, marginBottom: 18 }}>
              Ask anything about relocating to{" "}
              <span style={{ color: "var(--green)", fontWeight: 600 }}>
                {user?.profile?.country || "your destination"}
              </span>
              .
            </p>

            <div style={{ position: "relative", marginBottom: 10 }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askAI()}
                placeholder="Ask a question…"
                className="input-field"
                style={{ paddingLeft: 36, fontSize: "0.83rem" }}
              />
            </div>

            <button
              onClick={askAI}
              disabled={isAiLoading || !aiQuestion.trim()}
              className="btn-green"
              style={{
                width: "100%",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: "0.82rem",
              }}
            >
              {isAiLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin-slow" />
                  Thinking…
                </>
              ) : (
                <>
                  <Zap size={14} />
                  Ask AI
                </>
              )}
            </button>

            {aiAnswer && (
              <div
                style={{
                  marginTop: 16,
                  padding: "14px 16px",
                  borderRadius: 10,
                  background: "var(--green-subtle)",
                  border: "1px solid color-mix(in srgb, var(--green) 20%, transparent)",
                  animation: "fadeUp 0.3s ease forwards",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--green)",
                    marginBottom: 8,
                  }}
                >
                  Response
                </div>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                  {aiAnswer}
                </p>
              </div>
            )}
          </div>
        </aside>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .feed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}