import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./pages/home";
import Dashboard from "./pages/admin/Dashboard";
import Layout from "./pages/admin/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

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
    element: <Layout />,

    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
