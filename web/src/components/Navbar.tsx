import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const linkClass =
    "hover:text-gray-200 transition-colors duration-200";

  const activeClass = "underline font-semibold";

  return (
    <nav className="bg-purple-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold flex items-baseline gap-1">
        <NavLink to="/">DeckRoyale</NavLink>
        <span className="text-xs bg-purple-800 text-white px-1.5 py-0.5 rounded">
            v1
        </span>
      </div>
      <div className="flex gap-6">
        <NavLink
          to="/deck-builder"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Deck Builder
        </NavLink>
        <NavLink
          to="/deck-reviewer"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Deck Reviewer
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
