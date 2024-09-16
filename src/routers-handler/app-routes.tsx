import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UnauthenticatedRoute from "./unauthenticated-route";
import ProtectedRoute from "./protected-routes";

// Lazy load the pages
const Home = lazy(() => import("../pages/home"));
const About = lazy(() => import("../pages/about"));
const Contact = lazy(() => import("../pages/contact"));
const Details = lazy(() => import("../pages/details"));
const Login = lazy(() => import("../pages/login"));

// Protected Pages
const Profile = lazy(() => import("../protected-pages/profile"));
const Dashboard = lazy(() => import("../protected-pages/dashboard"));

//Routes based on auth status
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Unauthenticated Routes */}
      <Route element={<UnauthenticatedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Catch-all: Redirect to appropriate route based on auth status */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
