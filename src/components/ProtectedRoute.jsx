import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("auth_token");
  const userRole = parseInt(localStorage.getItem("role")); 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired !== undefined && userRole !== roleRequired) {
    return <Navigate to="/" replace />; 
  }

  return children;
}


export default ProtectedRoute