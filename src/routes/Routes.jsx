import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Challenges from "../pages/Challenges";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";

// ⚠️ Note: React Router v6 এ `element:` ব্যবহার হয়, `Component:` নয়

const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPage></ErrorPage>,
    element: <RootLayout />, // ✅ Component নয়, element হবে
    children: [
      {
        index: true,
        element: <Home />, // ✅ element
      },
      {
        path: "challenges", // ✅ path spelling ঠিক করো
        element: <Challenges />, // ✅ element
      },
    ],
  },
   {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element:<Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "forgot-password", element: <ForgetPassword></ForgetPassword> },
    ],
  },
]);

export default router;
