import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Challenges from "../pages/Challenges";
import RootLayout from "../layouts/RootLayout";

// ⚠️ Note: React Router v6 এ `element:` ব্যবহার হয়, `Component:` নয়

const router = createBrowserRouter([
  {
    path: "/",
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
]);

export default router;
