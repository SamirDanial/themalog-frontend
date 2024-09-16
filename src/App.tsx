import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UnAuthenticatedNavbar } from "./components/un-authenticated-navbar";
import { AuthenticatedNavbar } from "./components/authenticated-navbar"; // New navbar for authenticated users
import { useAuthStore } from "./store/useAuthStore"; // Import Zustand auth store
import AppRoutes from "./routers-handler/app-routes";
import ErrorBoundary from "./components/error-boundary";

import "./App.css";
import "chart.js/auto";

const queryClient = new QueryClient();

// Navbar component based on auth status
const Navbar: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <AuthenticatedNavbar /> : <UnAuthenticatedNavbar />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
