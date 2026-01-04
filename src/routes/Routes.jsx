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
import Details from "../pages/Details";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import PrivateRoute from "../componenets/PrivateRoute";


import AddChallenge from "../pages/AddChallenge";
import MyActivities from "../pages/MyActivities";
import MyActivitiesDetails from "../pages/MyActivitiesDetails";
import JoinChallenge from "../pages/JoinChalleng";
import TermsPrivacy from "../pages/TermsPrivacy";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "challenges", element: <Challenges /> },
      { path: "challenges/:id", element: <Details /> },
      {
        path:"about",
        element:<About></About>
      },
      {
        path:"terms",
        element:<TermsPrivacy></TermsPrivacy>
      }
,
     
      {
        path: "challenges/add",
        element: (
          <PrivateRoute>
           <AddChallenge></AddChallenge>
          </PrivateRoute>
        ),
      },

     
      {
        path: "challenges/join/:id",
        element: (
          <PrivateRoute>
           <JoinChallenge></JoinChallenge>
          </PrivateRoute>
        ),
      },

      { path: "profile", element: <Profile /> },
      { path: "profile/update", element: <UpdateProfile /> },

     
      {
        path: "my-activities",
        element: (
          <PrivateRoute>
            <MyActivities />
          </PrivateRoute>
        ),
      },
      {
        path: "my-activities/:id",
        element: (
          <PrivateRoute>
            <MyActivitiesDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgetPassword /> },
    ],
  },
]);

export default router;
