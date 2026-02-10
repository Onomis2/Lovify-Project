// BottomBar.jsx
export default function BottomBar({ style }) {
  return (
    <div className="bottomBar">
      <div>Now Playing: Song Name</div>
      <div>
        <button>Prev</button>
        <button>Play/Pause</button>
        <button>Next</button>
        <button>Shuffle</button>
      </div>
      <div>
        {/* Volume slider */}
      </div>
      <div>
        {/* Mini preview of current playing song and next song in queue */}
      </div>
      <div>
        <button>Queue</button>
      </div>
    </div>
  );
}
