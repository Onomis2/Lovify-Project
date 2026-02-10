import { useState } from "react";

export default function AddSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("Unknown");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/songs/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form className="songSubmitForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="Song title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload Song</button>
    </form>
  );
}
