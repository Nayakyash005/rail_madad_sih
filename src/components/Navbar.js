import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../context/Session";
import LogoutBtn from "./LogoutBtn";

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useContext(SessionContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow bg-white sticky top-0">
      <div className="mx-auto h-full w-full flex items-center justify-between p-4 max-w-6xl">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:underline">
          Logo.
        </Link>

        <div className="hidden sm:flex gap-4">
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
          <Link to="/random-number" className="hover:underline">
            Random
          </Link>
          {session.user ? (
            <p className="space-x-1.5">
            <Link to="/profile">{session.user.firstName}</Link>
            <LogoutBtn>logout</LogoutBtn>
            </p>
          ) : (
            <p className="space-x-1.5">
              <Link to="/auth/signin" className="hover:underline">
                Login
              </Link>
              <span>or</span>
              <Link to="/auth/signup" className="hover:underline">
                Signup
              </Link>
            </p>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="flex flex-col justify-center items-center md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="bg-white shadow-md rounded-md p-4">
            <Link
              to="/home"
              className="block px-4 py-2 hover:underline"
              onClick={() => setIsMenuOpen(false)} // Close menu when a link is clicked
            >
              Home
            </Link>
            <p className="px-4 py-2 space-x-1.5">
              <Link to="/auth/signin" className="hover:underline">
                Login
              </Link>
              <span>or</span>
              <Link to="/auth/signup" className="hover:underline">
                Signup
              </Link>
            </p>
            {/* Additional mobile links can go here */}
          </div>
        </div>
      )}
    </nav>
  );
}
