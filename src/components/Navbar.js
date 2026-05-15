import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../context/Session";
import LogoutBtn from "./LogoutBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropDownMenu";
import { Button } from "./ui/Button";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Avatar } from "@mui/material";

const NavMenu = ({ user }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="bg-primary text-white rounded-full">
      <Avatar sx={{ bgcolor: "#9e2452", padding: 3 }}>
        {(user.firstName[0] + user?.lastName[0]).toUpperCase()}
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>
        {user.firstName} {user.lastName}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link to="/admin">
        <DropdownMenuItem className="space-x-2">
          <RiAdminFill />
          <span>Admin</span>
        </DropdownMenuItem>
      </Link>
      <Link to="/my-complaints">
        <DropdownMenuItem className="space-x-2">
          <FaClipboardList />
          <span>My Complaints</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuSeparator />

      <LogoutBtn className="w-full h-full">
        <DropdownMenuItem className="flex items-center space-x-2">
          <MdLogout />
          <span>logout</span>
        </DropdownMenuItem>
      </LogoutBtn>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useContext(SessionContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow bg-white sticky top-0 z-50">
      <div className="mx-auto w-full flex items-center justify-between p-2 max-w-6xl gap-2">
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
          <span className="text-2xl hidden sm:inline text-primary">
            RailMadad
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          <div className="bg-[#E28B3E] text-white px-4 py-2 rounded-md flex items-center font-semibold text-2xl">
            <FaPhoneAlt className="text-xl" />
            <span>139</span>
          </div>

          <p className="text-gray-700 text-lg">
            for Security/Medical Assistance
          </p>
        </div>

        {session.user ? (
          <NavMenu user={session.user} />
        ) : (
          // <p className="space-x-2">
          //   <Link to="/auth/signin" className="text-gray-700 hover:text-black">
          //     <Button variant="outline">Login</Button>
          //   </Link>
          //   <span>or</span>
          //   <Link to="/auth/signup" className="text-gray-700 hover:text-black">
          //     <Button variant="outline">Signup</Button>
          //   </Link>
          // </p>
          <div className="flex items-center gap-3">
            <Link to="/auth/signin">
              <Button
                variant="outline"
                className="rounded-md border-0 px-3 sm:px-6 text-sm sm:text-base border-[#d8d3e8] bg-[#f3f0ff] text-gray-800 hover:bg-[#7a183c] hover:text-white"
              >
                Log In
              </Button>
            </Link>

            <Link to="/auth/signup">
              <Button
                variant="outline"
                className="rounded-md border-0 px-3 sm:px-6 text-sm sm:text-base border-[#eadfe0] bg-[#f3ebed] text-gray-800 hover:bg-[#7a183c] hover:text-white"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
