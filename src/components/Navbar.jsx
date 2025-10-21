import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Course", path: "/course" },
    { name: "Contact", path: "/contact" },
  ];

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-1 w-[98%] justify-self-center bg-white/65 shadow-2xl rounded-3xl z-50 transition-all duration-500 `}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo with enhanced design */}
        <Link
          to="/"
          className="flex items-center group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative">
            <img
              src="/logoRemovedbg.png"
              alt="Logo"
              className="h-12 w-auto "
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
          </div>
        </Link>

        {/* Desktop Menu - Enhanced */}
        <div className="hidden md:flex space-x-1 bg-white/50 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg shadow-blue-500/5 border border-white/60">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-6 py-2.5 font-semibold text-sm transition-all duration-300 rounded-xl ${isActive
                  ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25"
                  : "text-gray-600 hover:text-blue-600 hover:bg-white/80"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons - Enhanced */}
        <div className="hidden md:flex gap-3 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2.5 font-semibold text-blue-600 border border-blue-200 rounded-xl 
                hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 
                backdrop-blur-sm bg-white/60 shadow-sm hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r 
                from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 
                transition-all duration-300 hover:scale-105 transform"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="px-6 py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r 
                from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 
                shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 
                hover:scale-105 transform flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r 
                from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 
                shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all duration-300 
                hover:scale-105 transform"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Enhanced Mobile Menu Button */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-6">
            <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-2"
              }`}></span>
            <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
              }`}></span>
            <span className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-2"
              }`}></span>
          </div>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ${menuOpen
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-4 invisible"
        }`}>
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-500/20 border-t border-white/20 mx-4 mt-2 rounded-2xl overflow-hidden">
          <div className="flex flex-col py-4 space-y-1 px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3.5 font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 flex items-center group"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-2 pt-3">
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2 px-3">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3.5 font-semibold text-blue-600 text-center border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3.5 font-semibold text-white text-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3.5 font-semibold text-white text-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transition-all duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="px-4 py-3.5 font-semibold text-white text-center rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;