import React, { Suspense } from "react";
import { lazy } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SessionProvider from "./context/Session";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const LoadingSpinner = lazy(() => import("./components/LoadingSpinner"));
const HomeLayout = lazy(() => import("./pages/home/Layout"));
const AdminLayout = lazy(() => import("./pages/admin/Layout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const Home = lazy(() => import("./pages/home"));
const GetStartedPage = lazy(() => import("./components/GetStarted"));
const Signin = lazy(() => import("./pages/home/auth/Signin"));
const Signup = lazy(() => import("./pages/home/auth/Signup"));
const Complaint = lazy(() => import("./pages/home/Complaint"));
const Users = lazy(() => import("./pages/admin/Users/Users"));
const AdminComplaint = lazy(() => import("./pages/admin/ComplainList"));
const ComplaintSection = lazy(() => import("./pages/admin/Complaint"));
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
      {
        path: "/admin/complaints",
        element: <AdminComplaint />,
      },
      {
        path: "/admin/complaint-section",
        element: <ComplaintSection />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      // {
      //   path: "/admin/complaints",
      //   element: <AdminComplaint />,
      // },
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
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </SessionProvider>
  );
}
