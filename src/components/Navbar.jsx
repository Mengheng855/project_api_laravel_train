import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md  shadow-lg bg-gradient-to-br from-white/35 to-blue-400" >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logoRemovedbg.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="relative font-medium text-gray-700 hover:text-primary-color transition group"
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-primary-color transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 font-semibold text-sky-600 border border-sky-500 rounded-full 
                hover:bg-sky-500 hover:text-white transition duration-300 shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 font-semibold text-white rounded-full bg-gradient-to-r 
                from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="px-6 py-2 font-semibold text-white rounded-full bg-gradient-to-r 
                from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-md hover:shadow-lg transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 font-semibold text-white rounded-full bg-red-500 
                hover:bg-red-600 shadow-md hover:shadow-lg transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-lg backdrop-blur-md">
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-primary-color transition"
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary-color text-white px-6 py-2 rounded-full shadow-md hover:bg-primary-dark transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
