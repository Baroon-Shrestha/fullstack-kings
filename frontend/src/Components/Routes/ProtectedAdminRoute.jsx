// src/ProtectedRoutes/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth();

  if (!user && user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Admin access granted
  return children;
}
