import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
