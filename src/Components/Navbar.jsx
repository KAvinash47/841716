import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `relative font-medium transition duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const navLinks = (
    <>
      <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>

      {user?.role === "patient" && (
        <li><NavLink to="/my-bookings" className={linkStyle}>My Bookings</NavLink></li>
      )}

      {user?.role === "doctor" && (
        <li><NavLink to="/dashboard" className={linkStyle}>Dashboard</NavLink></li>
      )}

      <li><NavLink to="/blogs" className={linkStyle}>Blogs</NavLink></li>
      <li><NavLink to="/contact" className={linkStyle}>Contact</NavLink></li>
    </>
  );

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="navbar w-11/12 mx-auto py-3">

        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>

            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-xl w-52 space-y-2">
              {navLinks}
            </ul>
          </div>

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <a className="flex items-center gap-2 text-xl font-bold cursor-pointer">
                <img src="https://i.postimg.cc/1XmpxyVH/logo.png" alt="Phudu Logo" className="w-8 h-8" /><span>DocTalk</span>
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8 px-1">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {!user ? (
            <NavLink
              to="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition duration-300"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;