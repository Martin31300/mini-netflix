import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const count = useSelector((state) => state.favorites.items.length);

  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-red-600">
          MINI NETFLIX
        </Link>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-red-500"
              : "text-white hover:text-red-400"
          }
        >
          Favoris ({count})
        </NavLink>
      </div>
      <SearchBar />
    </nav>
  );
}
