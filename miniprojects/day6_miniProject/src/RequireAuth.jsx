import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading auth state...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

RequireAuth.propTypes = { children: PropTypes.node.isRequired };
