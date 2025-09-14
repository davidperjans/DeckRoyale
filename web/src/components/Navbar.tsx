import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = "hover:text-gray-200 transition-colors duration-200";
  const activeClass = "underline font-semibold";

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold flex items-baseline gap-1">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            DeckRoyale
          </NavLink>
          <span className="text-xs bg-purple-800 text-white px-1.5 py-0.5 rounded">
            v1
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
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
          <NavLink
            to="/popular-decks"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Popular Decks
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-purple-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 px-2 pb-3">
          <NavLink
            to="/deck-builder"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${linkClass} ${
                isActive ? activeClass : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Deck Builder
          </NavLink>
          <NavLink
            to="/deck-reviewer"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${linkClass} ${
                isActive ? activeClass : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Deck Reviewer
          </NavLink>
          <NavLink
            to="/popular-decks"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${linkClass} ${
                isActive ? activeClass : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Popular Decks
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
