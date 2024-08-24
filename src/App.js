import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LoadingSpinner from "./components/LoadingSpinner";
import HomeLayout from "./pages/home/Layout";
import Home from "./pages/home";

import AdminLayout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <LoadingSpinner />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
    ],
  },
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
