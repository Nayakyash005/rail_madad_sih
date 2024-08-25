import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LoadingSpinner from "./components/LoadingSpinner";
import HomeLayout from "./pages/home/Layout";
import Home from "./pages/home";

import AdminLayout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import RandomNumber from "./pages/home/random";
import { wait } from "./lib/utils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "loading",
        element: <LoadingSpinner />,
      },
      {
        path: "random-number/",
        element: <RandomNumber />,
        loader: ({ params, request }) => {
          console.log({params, request});
          return {response: wait(1000, Math.random() * 100)};
        },
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
