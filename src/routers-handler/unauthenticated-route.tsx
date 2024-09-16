import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// Wrapper component for unauthenticated routes
const UnauthenticatedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If the user is not authenticated, render the requested route. Otherwise, redirect to profile or dashboard.
  return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
};

export default UnauthenticatedRoute;
