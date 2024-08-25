import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="shadow">
      <div className="bg-white mx-auto h-full w-full flex items-center justify-between p-4 max-w-6xl">
        <Link to="/">Logo.</Link>

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
      </div>
    </nav>
  );
}
