import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "../data/authService";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  if (!AuthService.isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}