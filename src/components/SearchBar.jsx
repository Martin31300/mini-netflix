import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = text.trim();
    navigate(query ? `/?query=${encodeURIComponent(query)}` : "/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Rechercher un film..."
        className="w-64 rounded bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500"
      />
      <button
        type="submit"
        className="rounded bg-red-600 px-4 py-2 font-semibold text-white"
      >
        Chercher
      </button>
    </form>
  );
}
