import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LoadingSpinner from "./components/LoadingSpinner";
import HomeLayout from "./pages/home/Layout";
import Home from "./pages/home";

import AdminLayout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import RandomNumber from "./pages/home/random";
import { wait } from "./lib/utils";

import GetStartedPage from "./components/GetStarted";
import Signin from "./pages/home/auth/Signin";
import Signup from "./pages/home/auth/Signup";
import { ToastContainer } from "react-toastify";
import SessionProvider from "./context/Session";
import Complaint from "./pages/home/Complaint";

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
        path: "complaint/:id",
        element: <Complaint />,
        loader: ({ params }) => params.id,
      },
      {
        path: "loading",
        element: <LoadingSpinner />,
      },
      {
        path: "get-started",
        element: <GetStartedPage />,
      },
      {
        path: "random-number/",
        element: <RandomNumber />,
        loader: ({ params, request }) => {
          console.log({ params, request });
          return { response: wait(1000, Math.random() * 100) };
        },
      },
    ],
  },
  {
    path: "auth/signin",
    element: <Signin />,
  },
  {
    path: "auth/signup",
    element: <Signup />,
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
  return (
    <SessionProvider>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        rtl={false}
        draggable
      />
      <RouterProvider router={router} />
    </SessionProvider>
  );
}
