// src/guards/protected-route.jsx
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked, loading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Only hit /auth/me if we haven't verified the session yet this mount cycle.
    // After login() sets authChecked=true, this is skipped — no double request.
    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked]);

  // Still waiting for /auth/me to come back — render nothing (or a spinner)
  if (!authChecked || loading) {
    return null;
  }

  // Session confirmed invalid — send to login, preserve the intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;