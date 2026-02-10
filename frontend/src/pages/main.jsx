// React
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Pages
import AddSong from "./addSong";
import Home from "./home";
import Browse from "./browse";

// Components
import LeftSidebar from "../components/LeftSidebar.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function AppLayout() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // home | addSong | search | etc.

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("http://localhost:4000/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  // If no user, redirect to login page.
  if (!user) return ;

  return (
    <div>
      {/* Left Sidebar */}
      <LeftSidebar user={user} onNavigate={setCurrentPage}/>

      {/* Main content + Right sidebar */}
      <div>
        {currentPage === "home" && <Home/>}
        {currentPage === "addSong" && <AddSong/>}
        {currentPage === "browse" && <Browse/>}
      </div>

      {/* Right Sidebar */}
      <RightSidebar/>

      {/* Bottom bar */}
      <BottomBar/>
    </div>
  );
}
