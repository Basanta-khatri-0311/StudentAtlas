import { useEffect, useState } from "react";
import API from "../services/api";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import AIChat from "../components/AIChat";
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
  Home,
  Compass,
  Bell,
  Settings,
  Plus
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
        borderRadius: size * 0.35,
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 40) % 360}, 70%, 50%))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: "0 4px 10px -2px hsla(" + hue + ", 60%, 50%, 0.3)",
        border: "2px solid var(--panel-bg)",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Settings Modal ──────────────────────────
function SettingsModal({ isOpen, onClose, user, onUpdate }) {
  const [profile, setProfile] = useState({
    country: user?.profile?.country || "",
    city: user?.profile?.city || "",
    university: user?.profile?.university || "",
    intake: user?.profile?.intake || "",
    budget: user?.profile?.budget || "",
    status: user?.profile?.status || "Moving soon",
    skills: user?.profile?.skills?.join(", ") || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
       const skillsArray = profile.skills.split(",").map(s => s.trim()).filter(s => s !== "");
       const res = await API.put("/users/profile", { ...profile, skills: skillsArray });
       onUpdate(res.data.user);
       onClose();
    } catch (err) {
       alert("Failed to update profile");
    } finally {
       setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyCenter: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
       <div className="panel animate-fade-up" style={{ width: "100%", maxWidth: 600, padding: 32, maxHeight: "90vh", overflowY: "auto", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
             <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 850, fontSize: "1.5rem" }}>Update Profile</h2>
             <button onClick={onClose} className="btn-icon" style={{ border: "none" }}>✕</button>
          </div>

          <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>Country</label>
                <input className="input-field" value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})} />
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>City</label>
                <input className="input-field" value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} />
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>University</label>
                <input className="input-field" value={profile.university} onChange={e => setProfile({...profile, university: e.target.value})} />
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>Intake Year</label>
                <input className="input-field" value={profile.intake} onChange={e => setProfile({...profile, intake: e.target.value})} />
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>Monthly Budget ($)</label>
                <input className="input-field" type="number" value={profile.budget} onChange={e => setProfile({...profile, budget: e.target.value})} />
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>Current Status</label>
                <select className="input-field" value={profile.status} onChange={e => setProfile({...profile, status: e.target.value})}>
                   <option>Moving soon</option>
                   <option>Arrived</option>
                   <option>Studying</option>
                   <option>Working</option>
                </select>
             </div>
             <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>Key Skills (comma separated)</label>
                <input className="input-field" placeholder="Coding, Cooking, Driving..." value={profile.skills} onChange={e => setProfile({...profile, skills: e.target.value})} />
             </div>

             <div style={{ gridColumn: "span 2", marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={isLoading} className="btn-primary">
                   {isLoading ? "Saving..." : "Save Changes"}
                </button>
             </div>
          </form>
       </div>
    </div>
  );
}

// ─── Profile Progress bar ──────────────────────
function ProfileProgress({ score }) {
  const getLevel = (s) => s >= 80 ? "Full Access" : s >= 50 ? "Limited Access" : "Locked Content";
  const getColor = (s) => s >= 80 ? "var(--green)" : s >= 50 ? "var(--accent)" : "#f43f5e";

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
         <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Profile Completion</span>
         <span style={{ fontSize: "0.75rem", fontWeight: 850, color: getColor(score) }}>{score}%</span>
      </div>
      <div style={{ width: "100%", height: 6, background: "var(--bg-tertiary)", borderRadius: 10, overflow: "hidden" }}>
         <div style={{ width: `${score}%`, height: "100%", background: getColor(score), transition: "width 1s ease-out" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
         <div style={{ width: 6, height: 6, borderRadius: "50%", background: getColor(score) }} />
         <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)" }}>Status: {getLevel(score)}</span>
      </div>
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
  });

  return (
    <div className="panel panel-hover animate-fade-up" style={{ padding: 24, marginBottom: 16 }}>
       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar name={name} size={40} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
              {name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.75rem", marginTop: 2 }}>
              <span>{date}</span>
              {post.country && <><span style={{ opacity: 0.5 }}>•</span><span style={{ color: "var(--accent)", fontWeight: 700 }}>{post.country}</span></>}
            </div>
          </div>
        </div>
        <button className="btn-icon" style={{ border: "none", background: "transparent", width: 32, height: 32 }}>
          <MoreHorizontal size={18} />
        </button>
      </div>

       <p style={{ 
        color: "var(--text-primary)", 
        fontSize: "0.95rem", 
        lineHeight: 1.6, 
        whiteSpace: "pre-wrap",
        marginBottom: 20
      }}>
        {post.content}
      </p>

       {post.university && (
        <div style={{ 
          marginBottom: 20, 
          padding: "6px 14px", 
          borderRadius: 20, 
          background: "var(--bg-tertiary)", 
          display: "inline-flex", 
          alignItems: "center", 
          gap: 6,
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--text-secondary)",
          border: "1px solid var(--border-color)"
        }}>
          <Globe size={12} />
          {post.university}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
         <button
          onClick={handleLike}
          className="btn-secondary"
          style={{ padding: "8px 16px", borderRadius: 12, fontSize: "0.85rem", border: "none", background: liked ? "var(--accent-soft)" : "transparent", color: liked ? "var(--accent)" : "var(--text-secondary)" }}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount}
        </button>
        <button
          className="btn-secondary"
          style={{ padding: "8px 16px", borderRadius: 12, fontSize: "0.85rem", border: "none", background: "transparent" }}
        >
          <MessageSquare size={16} /> Reply
        </button>
      </div>
    </div>
  );
}

// ─── Feed Page ─────────────────────────────────
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
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

  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh", color: "var(--text-primary)" }}>
      
      {/* ── Sidebar (Desktop) ──────────────────── */}
      <aside style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: 280,
        background: "var(--panel-bg)",
        borderRight: "1px solid var(--border-color)",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        zIndex: 100
      }} className="hidden lg:flex">
         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 10, display: "flex", alignItems: "center", justifyCenter: "center" }}>
               <Globe size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 850, fontSize: "1.2rem", letterSpacing: "-0.04em" }}>
              StudentAtlas
            </span>
         </div>

         <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: <Home size={20} />, label: "Community Feed", active: true },
              { icon: <Compass size={20} />, label: "Discover" },
              { icon: <Bell size={20} />, label: "Notifications" },
              { icon: <MessageSquare size={20} />, label: "Messages" },
              { icon: <Settings size={20} />, label: "Profile Settings", onClick: () => setIsSettingsOpen(true) }
            ].map((item, i) => (
              <button key={i} onClick={item.onClick} style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                borderRadius: 14,
                border: "none",
                background: item.active ? "var(--accent-soft)" : "transparent",
                color: item.active ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>
                {item.icon} {item.label}
              </button>
            ))}
         </nav>

         <ProfileProgress score={user?.profileScore || 0} />

         <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid var(--border-color)" }}>
           {user && (
             <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <Avatar name={user.name} size={40} />
                <div style={{ minWidth: 0 }}>
                   <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                   <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{user.email?.split("@")[0]}</div>
                </div>
             </div>
           )}
           <button onClick={logout} className="btn-secondary" style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }}>
             <LogOut size={16} /> Sign out
           </button>
         </div>
      </aside>

      {/* ── Main Content ────────────────────────── */}
      <main style={{ marginLeft: 280, padding: "40px" }} className="feed-layout">
        <header style={{ 
          maxWidth: 900, 
          margin: "0 auto", 
          marginBottom: 32, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between" 
        }}>
           <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 850, fontSize: "1.6rem", letterSpacing: "-0.04em" }}>
             Community Feed
           </h1>
           <div style={{ display: "flex", gap: 12 }}>
              <button onClick={toggleTheme} className="btn-icon">
                {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.85rem", borderRadius: 14 }}>
                <Plus size={18} /> New Post
              </button>
           </div>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }} className="feed-grid">
           
           {/* Feed Column */}
           <div style={{ minWidth: 0 }}>
              <div className="panel" style={{ padding: 24, marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <Avatar name={user?.name} size={40} />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share something with your community..."
                    style={{ flex: 1, border: "none", background: "transparent", outline: "none", resize: "none", fontSize: "1rem", paddingTop: 8 }}
                    rows={3}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
                   <button onClick={createPost} disabled={isPosting || !content.trim()} className="btn-primary" style={{ padding: "8px 24px" }}>
                      {isPosting ? <Loader2 size={18} className="animate-spin" /> : "Post"}
                   </button>
                </div>
              </div>

              {posts.map(post => <PostCard key={post._id} post={post} />)}
           </div>

           {/* Sidebar Column */}
           <aside>
             <AIChat />
             
             <div className="panel" style={{ padding: 24, marginTop: 24 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", marginBottom: 20 }}>Suggested Communities</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                   {["UK Students", "Housing in Berlin", "Canada Visas"].map((tag, i) => (
                     <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                           <div style={{ width: 36, height: 36, background: "var(--bg-tertiary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Compass size={18} />
                           </div>
                           <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>{tag}</span>
                        </div>
                        <button style={{ color: "var(--accent)", fontWeight: 750, fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer" }}>Join</button>
                     </div>
                   ))}
                </div>
             </div>
           </aside>
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        user={user}
        onUpdate={(updatedUser) => setUser(updatedUser)}
      />

      <style>{`
        @media (max-width: 1024px) {
          aside.hidden { display: none !important; }
          main { marginLeft: 0 !important; padding: 24px !important; }
          .feed-grid { gridTemplateColumns: 1fr !important; }
          .feed-layout { marginLeft: 0 !important; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}