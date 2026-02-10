import { useState, useRef } from "react";

// Import logo asset
import Logo from "../components/Logo.jsx";

// Export the sidebar
export default function LeftSidebar({ user, onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
      // Contain within div to style using css
      <div className="leftSidebar">
        <p onClick={() => onNavigate("home")}><Logo width="64px" height="64px" /></p>
        {user && <p>Welcome, {user.username}!</p>}
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("addSong")}>Add Song</button>
        <button onClick={() => onNavigate("browse")}>Browse</button>
        {/* Add button to navigate to admin page with check if user is admin later */}
      </div>
      )}

      {/* Toggle visibility button */}
      <button
        className="leftSidebarToggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"} Sidebar
      </button>
    </>
  );
}
