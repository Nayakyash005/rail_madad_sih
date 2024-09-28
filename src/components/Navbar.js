import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../context/Session";
import LogoutBtn from "./LogoutBtn";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@material-tailwind/react";
import { Button } from "./ui/Button";
import { FaUserCircle } from "react-icons/fa";

function NavMenu({ children }) {
  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuContent>
        <Link
          to="/admin"
          className="text-gray-700 hover:text-black"
        >
          <MenuItem>Admin</MenuItem>
        </Link>
        <Link
          to="/complaints"
          className="text-gray-700 hover:text-black"
        >
          <MenuItem>Track Complaint</MenuItem>
        </Link>
        <hr className="my-3" />
        <div className="px-3 py-1.5">
            <LogoutBtn>logout</LogoutBtn>
        </div>
      </MenuContent>
    </Menu>
  );
}

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useContext(SessionContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow bg-white sticky top-0">
      <div className="mx-auto h-full w-full flex items-center justify-between p-2 max-w-6xl">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl h-14 relative font-bold hover:underline flex gap-4 items-center"
        >
          <img
            className=" h-full aspect-square object-contain"
            src="/LOGO.jpg"
            alt=""
          />
          <span className="text-3xl hidden md:inline text-rail-dark">RailMadad</span>
        </Link>

        {session.user ? (
          <NavMenu>
            <div className="p-2 bg-rail-light text-white rounded-full">
              <FaUserCircle size={28} />
            </div>
          </NavMenu>
        ) : (
          <p className="space-x-2">
            <Link
              to="/auth/signin"
              className="text-gray-700 hover:text-black"
            >
              <Button variant="outline">Login</Button>
            </Link>
            <span>or</span>
            <Link
              to="/auth/signup"
              className="text-gray-700 hover:text-black"
            >
              <Button variant="outline">Signup</Button>
            </Link>
          </p>
        )}
      </div>
    </nav>
  );
}
