
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = !!token;

  console.log("🔒 [ProtectedRoute] Auth check:", {
    hasToken: !!token,
    isAuthenticated
  });

  if (!isAuthenticated) {
    console.log("🚫 [ProtectedRoute] Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ [ProtectedRoute] Authenticated, allowing access");
  return <>{children}</>;
};

export default ProtectedRoute;
