import React from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { RiShoppingBag3Fill, RiDashboardFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";

export default function Layout() {
  useNavigation();
  const path = document.location.pathname;

  console.log(path);

  return (
    <div className="lg:grid grid-cols-5 xl:grid-cols-6 min-h-screen">
      <main className="col-span-4 lg:order-2 xl:col-span-5 bg-zinc-100 p-4">
        <Outlet />
      </main>

      <div key={path} className="bg-white lg:order-1 w-full lg:w-full lg:px-4 py-1.5 col-span-1 shadow lg:h-full fixed lg:sticky lg:top-14 bottom-0 lg:z-0 h-14">
        {/* DASHBOARD */}
        <h5 className="hidden lg:block text-xl p-2">Dashboard</h5>
        <ul className="flex lg:flex-col gap-1 w-full lg:w-auto justify-around">
          <SidebarLink path={path} href="/admin">
            <RiDashboardFill />
            <span className="text-[2.5vw] sm:text-base">Dashboard</span>
          </SidebarLink>

          <SidebarLink path={path} href="/admin/products">
            <RiShoppingBag3Fill />
            <span className="text-[2.5vw] sm:text-base">Products</span>
          </SidebarLink>

          <SidebarLink path={path} href="/admin/customers">
            <IoIosPeople />
            <span className="text-[2.5vw] sm:text-base">Customers</span>
          </SidebarLink>

          <SidebarLink path={path} href="/admin/transactions">
            <AiFillFileText />
            <span className="text-[2.5vw] sm:text-base">Transactions</span>
          </SidebarLink>
        </ul>
      </div>
    </div>
  );
}

const SidebarLink = ({ href, path, children }) => {
  return (
    <Link
      className={
        "flex lg:flex-row p-2 lg:border flex-col lg:gap-2 items-center lg:px-5 lg:py-3 rounded " +
        (path === href
          ? "bg-blue-100 border-blue-400"
          : "hover:border-blue-400")
      }
      to={href}
    >
      {children}
    </Link>
  );
};
