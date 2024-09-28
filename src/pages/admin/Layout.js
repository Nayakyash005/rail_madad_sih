import React from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { RiShoppingBag3Fill, RiDashboardFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import InvoiceListPage from "./ComplainList";

export default function Layout() {
  useNavigation();
  const path = document.location.pathname;

  console.log(path);

  return (
    <div className="lg:grid bg-gray-200 grid-cols-5 xl:grid-cols-6 min-h-screen">
      <div
        key={path}
        className="bg-white w-full lg:px-4 lg:py-4 shadow h-full"
      >
        <Link
          to="/"
          className="text-xl hidden h-12 lg:mb-2 relative font-bold hover:underline lg:flex gap-4 items-center"
        >
          <img
            className=" h-full aspect-square object-contain"
            src="/LOGO.jpg"
            alt=""
          />
          <span className="text-2xl text-rail-dark">RailMadad</span>
        </Link>
        <hr />

        {/* DASHBOARD */}
        {/* <h5 className="hidden lg:block text-lg p-2 font-bold">Dashboard</h5> */}
        <ul className="grid grid-cols-4 lg:flex lg:flex-col gap-1 py-2 lg:py-4 w-full lg:w-auto justify-around">
          <SidebarLink path={path} href="/admin">
            <RiDashboardFill />
            <span className="text-xs lg:text-base">Dashboard</span>
          </SidebarLink>

          <SidebarLink path={path} href="/admin/complaints">
            <RiShoppingBag3Fill />
            <span className="text-xs lg:text-base">Complaints</span>
          </SidebarLink>

          <SidebarLink path={path} href="/admin/users">
            <IoIosPeople />
            <span className="text-xs lg:text-base">Users</span>
          </SidebarLink>

          <SidebarLink path={path} href="/admin/testimonials">
            <AiFillFileText />
            <span className="text-xs lg:text-base">Testimonials</span>
          </SidebarLink>
        </ul>
      </div>

      <main className="col-span-4 xl:col-span-5 bg-zinc-100">
        <Outlet />
      </main>
    </div>
  );
}

const SidebarLink = ({ href, path, children }) => {
  return (
    <Link
      className={
        "flex lg:flex-row p-2 lg:border flex-col lg:gap-2 items-center lg:px-5 lg:py-3 rounded " +
        (path === href
          ? "bg-rail-light text-white border-rail-dark"
          : "text-black hover:border-rail-dark")
      }
      to={href}
    >
      {children}
    </Link>
  );
};
