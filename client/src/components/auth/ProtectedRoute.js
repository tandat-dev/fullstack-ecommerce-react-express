import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  const token = localStorage.getItem("authToken");
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/account/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
