import { useState, useRef } from "react";

export default function RightSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [width, setwidth] = useState(20);
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);

  // Mouse move handler for resizing
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const viewportWidth = window.innerWidth;
    const widthPx = viewportWidth - e.clientX;
    const width = (widthPx / viewportWidth) * 100;

    if (width >= 1 && width <= 50) {
      setwidth(width);
    }
  };


  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {isVisible && (
        <div ref={sidebarRef}className="rightSidebar"style={{ width: `${width}vw`}}>
          <div>
            <h4>Length</h4>
            <p>Slider 00:15|-*=====*---|15:00</p>
          </div>
          <div>
            <h4>Whitelisted Tags</h4>
          </div>
          <div>
            <h4>Blacklisted Tags</h4>
          </div>
          <div>
            <h4>Available Tags</h4>
          </div>

          {/* Resize handle */}
          <div
            className="resize-handle"
            onMouseDown={startResizing}
          />
        </div>
      )}

      {/* Toggle visibility button */}
      <button
        className="rightSidebarToggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"} Sidebar
      </button>
    </>
  );
}
