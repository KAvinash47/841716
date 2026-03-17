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

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium hover:text-blue-600 ${
              isActive ? "text-blue-600" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>

      {user?.role === "patient" && (
        <li>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `font-medium hover:text-blue-600 ${
                isActive ? "text-blue-600" : ""
              }`
            }
          >
            My Bookings
          </NavLink>
        </li>
      )}

      {user?.role === "doctor" && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-medium hover:text-blue-600 ${
                isActive ? "text-blue-600" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `font-medium hover:text-blue-600 ${
              isActive ? "text-blue-600" : ""
            }`
          }
        >
          Blogs
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-medium hover:text-blue-600 ${
              isActive ? "text-blue-600" : ""
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow-sm">
      <div className="navbar w-11/12 mx-auto py-3">

        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://i.postimg.cc/1XmpxyVH/logo.png"
              alt="logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">DocTalk</span>
          </div>
        </div>

        {/* CENTER (DESKTOP MENU) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 px-1">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {!user ? (
            <NavLink
              to="/login"
              className="btn bg-blue-600 text-white px-6 rounded-full hover:bg-blue-700"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="btn bg-red-500 text-white px-6 rounded-full hover:bg-red-600"
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