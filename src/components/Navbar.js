import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow">
      <div className="bg-white mx-auto h-full w-full flex items-center justify-between p-4 max-w-6xl">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Logo.
        </Link>

        <div className="flex gap-4">
          <Link to="/loading" className="hover:underline">
            Loading
          </Link>
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
          <Link to="/random-number" className="hover:underline">
            Random
          </Link>
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
            {/* Additional mobile links can go here */}
          </div>
        </div>
      )}
    </nav>
  );
}
