import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import FeedPage from "./Pages/FeedPage.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute.jsx";
import PostDetails from "./Pages/PostDetails.jsx";
import Profile from "./Pages/Profile.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import AuthProtectedRoute from "./ProtectedRoutes/AuthProtectedRoute.jsx";
import { Toaster } from 'react-hot-toast';



const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-details/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthProtectedRoute>
            <Register />
          </AuthProtectedRoute>
        ),
      },
      
    ],
  },
]);

export default function App() {
  return <>
  <RouterProvider router={routers}></RouterProvider>;
  <Toaster position="top-center" reverseOrder={false} />
  </>
}
