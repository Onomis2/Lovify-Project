import { useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const minWidth = 50;
  const maxWidth = 400;

  const handleDrag = (e) => {
    const newWidth = e.clientX; // how far from left edge
    if (newWidth > minWidth && newWidth < maxWidth) {
      setSidebarWidth(newWidth);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarWidth,
          background: "#111",
          color: "#fff",
          padding: "20px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          userSelect: "none"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Lovify</h2>

        <Link to="/" style={{ color: "#fff" }}>Home</Link>
        <Link to="/songs" style={{ color: "#fff" }}>Songs</Link>
        <Link to="/playlists" style={{ color: "#fff" }}>Playlists</Link>
        <Link to="/upload" style={{ color: "#fff" }}>Add Song</Link>
        <Link to="/profile" style={{ color: "#fff" }}>Profile</Link>
        <Link to="/settings" style={{ color: "#fff" }}>Settings</Link>

        {/* Resize Handle */}
        <div
          onMouseDown={() => {
            window.addEventListener("mousemove", handleDrag);
            window.addEventListener("mouseup", () => {
              window.removeEventListener("mousemove", handleDrag);
            }, { once: true });
          }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "6px",
            height: "100%",
            cursor: "ew-resize",
            background: "rgba(255,255,255,0.15)"
          }}
        />
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "30px", overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
