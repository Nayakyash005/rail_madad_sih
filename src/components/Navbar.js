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
import { MdLogout } from "react-icons/md";

const NavMenu = ({user}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="p-2 bg-primary text-white rounded-full">
      <FaUserCircle size={24} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{user.firstName} {user.lastName}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link to="/admin">
        <DropdownMenuItem className="space-x-2">
          <RiAdminFill />
          <span>Admin</span>
        </DropdownMenuItem>
      </Link>
      <Link to="/complaints">
        <DropdownMenuItem className="space-x-2">
          <FaClipboardList />
          <span>Track Complaint</span>
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
          <span className="text-3xl hidden md:inline text-primary">
            RailMadad
          </span>
        </Link>

        {session.user ? (
          <NavMenu user={session.user} />
        ) : (
          <p className="space-x-2">
            <Link to="/auth/signin" className="text-gray-700 hover:text-black">
              <Button variant="outline">Login</Button>
            </Link>
            <span>or</span>
            <Link to="/auth/signup" className="text-gray-700 hover:text-black">
              <Button variant="outline">Signup</Button>
            </Link>
          </p>
        )}
      </div>
    </nav>
  );
}
