import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import SessionProvider from "./context/Session";
import "react-toastify/dist/ReactToastify.css";
import { getComplaint } from "./requests/complaint";

const AdminLayout = lazy(() => import("./pages/admin/Layout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminComplaint = lazy(() => import("./pages/admin/ComplainList"));
const ComplaintSection = lazy(() => import("./pages/admin/Complaint"));
const AdminUsers = lazy(() => import("./pages/admin/Users/Users"));

const Home = lazy(() => import("./pages/home"));
const HomeLayout = lazy(() => import("./pages/home/Layout"));
const GetStartedPage = lazy(() => import("./components/GetStarted"));
const Signup = lazy(() => import("./pages/home/auth/Signup"));
const Signin = lazy(() => import("./pages/home/auth/Signin"));
const MyComplaintsPage = lazy(() => import("./pages/home/MyComplaints/page"));
const ComplaintDetails = lazy(() => import("./pages/home/MyComplaints/[id]/Complaint"));
const Complaint = lazy(() => import("./pages/home/Complaint"));

const EveryComplaint = lazy(() => import("./pages/admin/EveryComplaint"));
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
        path: "my-complaints",
        element: <MyComplaintsPage />,
      },
      {
        path: "my-complaints/:id",
        element: <ComplaintDetails />,
        loader: ({ params }) => ({ complaintPromise: getComplaint(params.id) }),
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
    path: "/admin",
    element: <AdminLayout />,

    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "/admin/complaints",
        element: <AdminComplaint />,
      },
      {
        path: "/admin/complaint-section/:id",
        element: <EveryComplaint />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
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
