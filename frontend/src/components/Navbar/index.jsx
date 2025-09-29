// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuroraText from "../Commontext/AuroraText";
import "./style.css";
import {
  FaHome,
  FaServicestack,
  FaBookOpen,
  FaEnvelope,
  FaBrain,
  FaUsers,
  FaImages,
  FaVideo,
  FaSignInAlt,
  FaSignOutAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaUserGraduate,
} from "react-icons/fa";

import { getToken, clearTokens } from "../../api/authApi";
import { API_BASE } from "../../api/config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // ================= Auth Check =================
  useEffect(() => {
    const checkLogin = () => {
      const token = getToken();
      setIsLoggedIn(!!token);
    };

    checkLogin(); // run once on mount
    window.addEventListener("storage", checkLogin); // listen for login/logout

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    navigate("/login");
  };

  // ================= API Call for Search =================
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/courses/?search=${searchTerm}`);
      const data = await res.json();

      // Backend might return { results: [...] } or just an array
      const courses = Array.isArray(data) ? data : data.results || [];
      setSuggestions(courses);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions(query);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg transition-colors duration-300 bg-gray-900 text-white">
      {/* ================= Top Bar ================= */}
      <div className="navbar-top flex items-center justify-between px-4 py-3">
        {/* Left: Logo + Headline */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="inline-flex items-center gap-2"
          >
            <img
              src="/images/logo.jpg"
              alt="Brand Logo"
              className="w-10 h-10 object-contain"
            />
            <AuroraText />
          </NavLink>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 flex justify-center mx-2 relative w-full md:max-w-md">
          <div className="colorful-input-wrapper relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input w-full px-3 py-2 rounded-md text-black"
            />
            {loading && (
              <div className="absolute right-2 top-2 text-gray-500 text-sm">
                Loading...
              </div>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white text-black rounded-md mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      navigate(`/courses/${item.id}`);
                      setQuery("");
                      setSuggestions([]);
                    }}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="search-button ml-2 hidden sm:flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">
            <FaSearch /> Search
          </button>
        </div>

        {/* Right: Login / Logout (Desktop) */}
        <div className="ml-4 hidden lg:block">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md"
            >
              <FaSignInAlt /> Login
            </NavLink>
          )}
        </div>

        {/* Hamburger (Mobile & Tablet) */}
        <div className="lg:hidden ml-3 flex-shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ================= Links + Mobile Login ================= */}
      <div
        className={`navbar-bottom ${
          isOpen ? "block" : "hidden"
        } lg:flex lg:justify-center lg:items-center px-4 py-2 bg-gray-800`}
      >
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <NavLink to="/" onClick={handleLinkClick} className="nav-btn">
            <FaHome /> Home
          </NavLink>
          <NavLink to="/expertise" onClick={handleLinkClick} className="nav-btn">
            <FaBrain /> Our Expertise
          </NavLink>
          <NavLink
            to="/successstory"
            onClick={handleLinkClick}
            className="nav-btn"
          >
            <FaUsers /> Success Stories
          </NavLink>
          <NavLink to="/courses" onClick={handleLinkClick} className="nav-btn">
            <FaBookOpen /> All Courses
          </NavLink>
          <NavLink
            to="/student/dashboard"
            onClick={handleLinkClick}
            className="nav-btn"
          >
            <FaUserGraduate /> Student Dashboard
          </NavLink>
          <NavLink to="/events" onClick={handleLinkClick} className="nav-btn">
            <FaCalendarAlt /> Events
          </NavLink>
          <NavLink
            to="/ourservices"
            onClick={handleLinkClick}
            className="nav-btn"
          >
            <FaServicestack /> Our Services
          </NavLink>
          <NavLink to="/media" onClick={handleLinkClick} className="nav-btn">
            <FaVideo /> Media
          </NavLink>
          <NavLink to="/gallery" onClick={handleLinkClick} className="nav-btn">
            <FaImages /> Gallery
          </NavLink>
          <NavLink to="/contact" onClick={handleLinkClick} className="nav-btn">
            <FaEnvelope /> Contact
          </NavLink>

          {/* Mobile Login/Logout */}
          <div className="mt-2 lg:hidden flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  handleLinkClick();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md w-full justify-center"
              >
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md w-full justify-center"
              >
                <FaSignInAlt /> Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
